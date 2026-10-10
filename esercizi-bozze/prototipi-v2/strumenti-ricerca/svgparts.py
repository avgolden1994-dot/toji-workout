"""Helpers: extract elements per animated group from the shipped 5-pose SVGs,
sample outlines, Procrustes/similarity fits, pivot estimation, path normalisation."""
import re, math
import numpy as np
from svgelements import SVG, Path, Shape, Group, Ellipse, Rect, Circle, Matrix

GROUPS = ['f-giu', 'f-q1', 'f-mid', 'f-q3', 'f-su']


def load_parts(fname):
    """Return dict group_id -> list of dict(kind, fill, path(Path absolute), raw).
    Coordinates are absolute user units of the file (viewBox stripped before parsing)."""
    import io
    txt = open(fname).read()
    txt = re.sub(r'\sviewBox="[^"]*"', ' width="3000" height="3000"', txt, count=1)
    svg = SVG.parse(io.StringIO(txt), reify=True)
    out = {}
    def walk(node, gid):
        for ch in node:
            if isinstance(ch, Group):
                walk(ch, ch.id if ch.id in GROUPS else gid)
            elif isinstance(ch, Shape):
                p = Path(ch)
                p.reify()
                fill = ch.fill.hexrgb if ch.fill is not None and ch.fill.value is not None else None
                out.setdefault(gid, []).append(dict(kind=type(ch).__name__, fill=fill, path=p,
                                                    opacity=ch.values.get('opacity'),
                                                    fop=ch.values.get('fill-opacity')))
    walk(svg, 'static')
    return out


def sample_path(p, n=400, dense=4000):
    """Arc-length resampling of a closed (single subpath) outline -> (n,2)."""
    ts = np.linspace(0, 1, dense)
    pts = np.array([[pt.x, pt.y] for pt in (p.point(t) for t in ts)])
    seg = np.linalg.norm(np.diff(pts, axis=0), axis=1)
    cum = np.concatenate([[0], np.cumsum(seg)])
    L = cum[-1]
    s = np.linspace(0, L, n, endpoint=False)
    x = np.interp(s, cum, pts[:, 0]); y = np.interp(s, cum, pts[:, 1])
    return np.stack([x, y], 1)


def poly_area(P):
    x, y = P[:, 0], P[:, 1]
    return 0.5 * (np.dot(x, np.roll(y, -1)) - np.dot(y, np.roll(x, -1)))


def orient_ccw(P):
    return P if poly_area(P) > 0 else P[::-1].copy()


def similarity_fit(A, B, allow_scale=True):
    """Find s,R,t minimising |s R A + t - B| (rows are points). Returns (s, theta, t, rms)."""
    ma, mb = A.mean(0), B.mean(0)
    A0, B0 = A - ma, B - mb
    H = A0.T @ B0
    U, S, Vt = np.linalg.svd(H)
    d = np.sign(np.linalg.det(Vt.T @ U.T))
    D = np.diag([1, d])
    R = Vt.T @ D @ U.T
    s = (S * np.diag(D)).sum() / (A0 ** 2).sum() if allow_scale else 1.0
    t = mb - s * R @ ma
    res = (s * (R @ A.T)).T + t - B
    rms = math.sqrt((res ** 2).sum(1).mean())
    theta = math.degrees(math.atan2(R[1, 0], R[0, 0]))
    return s, theta, t, rms, R


def best_correspondence(A, B, allow_scale=True):
    """A,B closed outlines with same n (ccw). Find cyclic shift of B minimising similarity residual."""
    n = len(A)
    best = None
    for k in range(0, n, max(1, n // 200)):
        Bk = np.roll(B, -k, axis=0)
        s, th, t, rms, R = similarity_fit(A, Bk, allow_scale)
        if best is None or rms < best[0]:
            best = (rms, k, s, th, t, R)
    # refine
    rms, k0, *_ = best
    for k in range(k0 - n // 200 - 1, k0 + n // 200 + 2):
        Bk = np.roll(B, -(k % n), axis=0)
        s, th, t, rms, R = similarity_fit(A, Bk, allow_scale)
        if rms < best[0]:
            best = (rms, k % n, s, th, t, R)
    return best


def fixed_point(s, R, t):
    """Fixed point of x -> sRx + t (pivot of the motion)."""
    M = np.eye(2) - s * R
    try:
        return np.linalg.solve(M, t)
    except np.linalg.LinAlgError:
        return np.array([np.nan, np.nan])


def seg_signature(d):
    """Command letters of a raw path d string."""
    return re.findall(r'[MmLlHhVvCcSsQqTtAaZz]', d)


def catmull_rom_path(P, closed=True, prec=2):
    """Closed Catmull-Rom spline through points P -> path d with one C per point (same structure for same n)."""
    n = len(P)
    f = lambda v: f"{v:.{prec}f}".rstrip('0').rstrip('.') if '.' in f"{v:.{prec}f}" else f"{v:.{prec}f}"
    d = [f"M{f(P[0,0])} {f(P[0,1])}"]
    for i in range(n if closed else n - 1):
        p0 = P[(i - 1) % n]; p1 = P[i]; p2 = P[(i + 1) % n]; p3 = P[(i + 2) % n]
        c1 = p1 + (p2 - p0) / 6.0
        c2 = p2 - (p3 - p1) / 6.0
        d.append(f"C{f(c1[0])} {f(c1[1])} {f(c2[0])} {f(c2[1])} {f(p2[0])} {f(p2[1])}")
    d.append('Z')
    return ''.join(d)
