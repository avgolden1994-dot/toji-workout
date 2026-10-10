"""CSS keyframe generators for crossfade (N poses) and transform tweens."""

EASE_OUT_OF_EXTREME = 'cubic-bezier(.4,0,.7,.55)'
EASE_INTO_EXTREME = 'cubic-bezier(.3,.45,.6,1)'
EASE_IO = 'cubic-bezier(.45,0,.55,1)'


def fmt(v, p=3):
    s = f'{v:.{p}f}'.rstrip('0').rstrip('.')
    return s if s not in ('-0', '') else '0'


def crossfade_times(n, hold=3.0, half=50.0):
    """Key times (percent) of the forward half for n poses, baseline scheme:
    START hold [0,hold], END hold [half-hold, half+hold]; transitions touching an extreme last 1.5u, inner 1u."""
    span = half - 2 * hold
    units = 2 * 1.5 + (n - 3) * 1.0
    u = span / units
    t = [hold]
    for k in range(1, n):
        t.append(t[-1] + (1.5 * u if k in (1, n - 1) else u))
    return t  # t[0]=hold ... t[n-1]=half-hold


def crossfade_css(ids, hold=3.0, dur=5.4, cls='fr', prefix='k'):
    """Complementary-opacity crossfade among len(ids) poses, START->END->START."""
    n = len(ids)
    tf = crossfade_times(n, hold)
    tb = [100 - x for x in tf]          # mirrored (backward) times
    # global boundary list with pose index visible at each boundary
    pts = [(0, 0)] + [(tf[k], k) for k in range(n)] + [(100 - tf[n - 1], n - 1)] + \
          [(tb[k], k) for k in range(n - 2, -1, -1)] + [(100, 0)]
    # segment timing functions (segment starts at pts[i])
    def seg_tf(i):
        a, b = pts[i][1], pts[i + 1][1]
        if a == b:
            return None
        if a == 0 or a == n - 1:
            return EASE_OUT_OF_EXTREME
        if b == 0 or b == n - 1:
            return EASE_INTO_EXTREME
        return None
    css = [f'.{cls}{{animation:{dur}s linear infinite}}']
    css.append(' '.join(f'#{gid}{{animation-name:{prefix}{j}}}' for j, gid in enumerate(ids)))
    for j in range(n):
        kfs = []
        for i, (tm, vis) in enumerate(pts):
            op = 1 if vis == j else 0
            tfn = seg_tf(i) if i < len(pts) - 1 else None
            kfs.append((tm, op, tfn))
        # merge consecutive keyframes with same opacity & no timing function differences for compactness
        out = []
        for tm, op, tfn in kfs:
            body = f'opacity:{op}' + (f';animation-timing-function:{tfn}' if tfn else '')
            out.append(f'{fmt(tm)}%{{{body}}}')
        css.append(f'@keyframes {prefix}{j}{{' + ''.join(out) + '}')
    hide = ','.join(f'#{g}' for g in ids[1:])
    css.append(f'@media (prefers-reduced-motion:reduce){{.{cls}{{animation:none!important}}{hide}{{opacity:0}}}}')
    return '\n'.join(css)


def rot_tf(px, py, a, tx=0.0, ty=0.0):
    t = f'translate({fmt(px + tx)}px,{fmt(py + ty)}px) rotate({fmt(a, 2)}deg) translate({fmt(-px)}px,{fmt(-py)}px)'
    return t


def keyframes(name, keys):
    """keys: list of (percent, css-declarations, timing-function or None). Equal consecutive bodies are merged."""
    parts = []
    i = 0
    while i < len(keys):
        tm, body, tfn = keys[i]
        group = [tm]
        while i + 1 < len(keys) and keys[i + 1][1] == body and keys[i + 1][2] == tfn and False:
            i += 1
            group.append(keys[i][0])
        sel = ','.join(f'{fmt(g)}%' for g in group)
        parts.append(f'{sel}{{{body}' + (f';animation-timing-function:{tfn}' if tfn else '') + '}')
        i += 1
    return f'@keyframes {name}{{' + ''.join(parts) + '}'


def cubic_bezier(x1, y1, x2, y2):
    """returns f(x)->y for CSS cubic-bezier easing."""
    def bx(u): return 3 * x1 * u * (1 - u) ** 2 + 3 * x2 * u ** 2 * (1 - u) + u ** 3
    def by(u): return 3 * y1 * u * (1 - u) ** 2 + 3 * y2 * u ** 2 * (1 - u) + u ** 3
    def f(x):
        lo, hi = 0.0, 1.0
        for _ in range(60):
            mid = (lo + hi) / 2
            if bx(mid) < x: lo = mid
            else: hi = mid
        return by((lo + hi) / 2)
    return f


def eval_keys(keys, pct, easing_funcs):
    """keys: [(pct, value, tf-string|None)], tf applies to the segment starting at that key."""
    for i in range(len(keys) - 1):
        t0, v0, tf = keys[i]; t1, v1, _ = keys[i + 1]
        if t0 <= pct <= t1:
            if t1 == t0: return v1
            x = (pct - t0) / (t1 - t0)
            y = easing_funcs[tf](x) if tf else x
            return v0 + (v1 - v0) * y
    return keys[-1][1]


def ease_segments(x1, y1, x2, y2, n):
    """Split the CSS easing cubic-bezier(x1,y1,x2,y2) into n segments of equal PROGRESS.
    Returns list of (x_k, p_k, tf_k): normalised time x_k of key k, progress p_k, and the CSS
    cubic-bezier string of segment k (exact sub-curve, de Casteljau), tf of last key = None."""
    P = [(0.0, 0.0), (x1, y1), (x2, y2), (1.0, 1.0)]
    def bez(u):
        a = (1 - u) ** 3; b = 3 * u * (1 - u) ** 2; c = 3 * u * u * (1 - u); d = u ** 3
        return (a * P[0][0] + b * P[1][0] + c * P[2][0] + d * P[3][0], a * P[0][1] + b * P[1][1] + c * P[2][1] + d * P[3][1])
    def u_for_p(p):
        lo, hi = 0.0, 1.0
        for _ in range(80):
            m = (lo + hi) / 2
            if bez(m)[1] < p: lo = m
            else: hi = m
        return (lo + hi) / 2
    def sub(ua, ub):
        # de Casteljau: segment [ua,ub] of the cubic
        def split(pts, t):
            p01 = [(1 - t) * pts[0][i] + t * pts[1][i] for i in (0, 1)]
            p12 = [(1 - t) * pts[1][i] + t * pts[2][i] for i in (0, 1)]
            p23 = [(1 - t) * pts[2][i] + t * pts[3][i] for i in (0, 1)]
            p012 = [(1 - t) * p01[i] + t * p12[i] for i in (0, 1)]
            p123 = [(1 - t) * p12[i] + t * p23[i] for i in (0, 1)]
            p0123 = [(1 - t) * p012[i] + t * p123[i] for i in (0, 1)]
            return [pts[0], p01, p012, p0123], [p0123, p123, p23, pts[3]]
        _, right = split(P, ua)
        t2 = (ub - ua) / (1 - ua) if ua < 1 else 0
        left, _ = split(right, t2)
        (X0, Y0), (X1, Y1), (X2, Y2), (X3, Y3) = left
        dx, dy = X3 - X0, Y3 - Y0
        nx1, ny1 = (X1 - X0) / dx, (Y1 - Y0) / dy
        nx2, ny2 = (X2 - X0) / dx, (Y2 - Y0) / dy
        nx1 = min(1, max(0, nx1)); nx2 = min(1, max(0, nx2))
        return f'cubic-bezier({fmt(nx1)},{fmt(ny1)},{fmt(nx2)},{fmt(ny2)})'
    us = [0.0] + [u_for_p(k / n) for k in range(1, n)] + [1.0]
    out = []
    for k in range(n + 1):
        x, p = bez(us[k])
        tf = sub(us[k], us[k + 1]) if k < n else None
        out.append((x, k / n, tf))
    return out
