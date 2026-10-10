"""Objective animation metrics on rendered frame sequences.
usage: python3 metrics.py NAME FRAMES_DIR STATIC_PNG PALETTE_JSON OUT_JSON [--limb RRGGBB] [--pivots x,y;x,y] [--px-per-unit k] [--vb x,y]
- temporal smoothness: per-frame mean abs difference (MAD) over the union moving region, jerk index, spike ratio
- ghost: share of interior moving-part pixels whose colour is not in the clean key-pose palette
- geometric consistency: solid limb-colour area and limb length (farthest solid pixel from pivot) vs START
"""
import sys, json, os
import numpy as np
from PIL import Image
from scipy import ndimage

name, fdir, static_png, pal_json, out_json = sys.argv[1:6]
opts = sys.argv[6:]
def opt(k, d=None):
    return opts[opts.index(k) + 1] if k in opts else d
limb = opt('--limb', 'fdba8c')
limb_rgb = np.array([int(limb[i:i + 2], 16) for i in (0, 2, 4)])
pivots = [tuple(map(float, p.split(','))) for p in opt('--pivots', '').split(';') if p]
ppu = float(opt('--px-per-unit', '1'))
vb0 = tuple(map(float, opt('--vb', '0,0').split(',')))
axis = float(opt('--axis', 'nan'))

meta = json.load(open(os.path.join(fdir, 'frames.json')))
frames = meta['frames']

def load(p):
    im = Image.open(p).convert('RGB')
    return np.asarray(im).astype(np.int16)

static = load(static_png)
palette = np.array(json.load(open(pal_json)), dtype=np.int16)  # (P,3)

H, W, _ = static.shape
# quantised lookup for palette membership (tolerance 4 per channel)
TOL = 4
def in_palette(rgb):  # rgb (n,3)
    if len(rgb) == 0:
        return np.zeros(0, bool)
    d = np.abs(rgb[:, None, :] - palette[None, :, :]).max(2)
    return (d <= TOL).any(1)

def ghost_aa_robust(im, inner):
    """share of interior moving px whose colour is neither a palette colour nor a 2-colour mix
    of palette colours present in the 5x5 neighbourhood (= anti-aliasing)."""
    Hh, Ww, _ = im.shape
    flat = im.reshape(-1, 3)
    d = np.full(flat.shape[0], 999, np.int16)
    idx = np.full(flat.shape[0], -1, np.int32)
    for k, c in enumerate(palette):
        dk = np.abs(flat - c).max(1)
        better = dk < d
        d[better] = dk[better]; idx[better] = k
    ispal = (d <= TOL).reshape(Hh, Ww)
    pidx = np.where(ispal, idx.reshape(Hh, Ww), -1)
    bad = inner & ~ispal
    npal = ndimage.uniform_filter(ispal.astype(np.float32), size=5) * 25
    ghost_px = bad & (npal < 1.5)
    cand = np.argwhere(bad & (npal >= 1.5))
    pal_f = palette.astype(np.float32)
    for (y, x) in cand:
        win = pidx[max(0, y - 2):y + 3, max(0, x - 2):x + 3].ravel()
        u = np.unique(win[win >= 0])
        p = im[y, x].astype(np.float32)
        ok = False
        for a in range(len(u)):
            ca = pal_f[u[a]]
            for b in range(a + 1, len(u)):
                cb = pal_f[u[b]]
                v = cb - ca; L2 = float(v @ v)
                t = 0.0 if L2 == 0 else min(1.0, max(0.0, float((p - ca) @ v) / L2))
                if np.abs(ca + t * v - p).max() <= 6:
                    ok = True; break
            if ok: break
        if not ok:
            ghost_px[y, x] = True
    return ghost_px.sum() / max(1, inner.sum())

imgs = [load(f['file']) for f in frames]
n = len(imgs)
union = np.zeros((H, W), bool)
for im in imgs:
    union |= (np.abs(im - static).max(2) > 3)
U = union.sum()

mad = []
for i in range(n):
    a, b = imgs[i], imgs[(i + 1) % n]
    d = np.abs(a - b).mean(2)
    mad.append(float(d[union].mean()) if U else 0.0)
mad = np.array(mad)

yy, xx = np.mgrid[0:H, 0:W]

def per_frame(i):
    im = imgs[i]
    m = np.abs(im - static).max(2) > 3
    inner = ndimage.binary_erosion(m, structure=np.ones((3, 3)))
    g = ghost_aa_robust(im, inner) if i % 2 == 0 else np.nan
    lm = np.abs(im - limb_rgb).max(2) <= TOL
    ls = []
    for (x, y) in pivots:
        X = (x - vb0[0]) * ppu; Y = (y - vb0[1]) * ppu
        AXp = (axis - vb0[0]) * ppu
        side = (xx < AXp) if x < axis else (xx >= AXp)
        sel = lm & side
        ls.append(float(np.sqrt((xx[sel] - X) ** 2 + (yy[sel] - Y) ** 2).max() / ppu) if sel.any() else 0.0)
    return float(g), int(lm.sum()), ls

from multiprocessing import Pool
with Pool(4) as pool:
    resl = pool.map(per_frame, range(n))
ghost = [r[0] for r in resl]
solid = [r[1] for r in resl]
lengths = [r[2] for r in resl]
gtmp = np.array(ghost)
idx_ok = np.where(~np.isnan(gtmp))[0]
ghost = np.interp(np.arange(n), idx_ok, gtmp[idx_ok]).tolist()
ghost = np.array(ghost); solid = np.array(solid, float); lengths = np.array(lengths)

moving = mad > 0.05 * mad.max() if mad.max() > 0 else mad > 0
dm = np.abs(np.diff(mad))
res = dict(
    name=name, frames=n, union_px=int(U),
    mad_mean=float(mad[moving].mean()) if moving.any() else 0.0,
    mad_max=float(mad.max()),
    mad_cv=float(mad[moving].std() / mad[moving].mean()) if moving.any() else 0.0,
    jerk_index=float(dm.mean() / mad[moving].mean()) if moving.any() else 0.0,
    jerk_max=float(dm.max() / mad[moving].mean()) if moving.any() else 0.0,
    ghost_mean=float(ghost.mean()), ghost_max=float(ghost.max()),
    ghost_p95=float(np.percentile(ghost, 95)),
    solid_min=float(solid.min() / solid[0]) if solid[0] else 0.0,
    solid_max=float(solid.max() / solid[0]) if solid[0] else 0.0,
    length_min=[float(v) for v in (lengths.min(0) / np.maximum(lengths[0], 1e-6))] if len(pivots) else [],
    length_max=[float(v) for v in (lengths.max(0) / np.maximum(lengths[0], 1e-6))] if len(pivots) else [],
    series=dict(mad=mad.round(4).tolist(), ghost=ghost.round(4).tolist(),
                solid=(solid / max(solid[0], 1)).round(4).tolist(),
                length=lengths.round(3).tolist(), t=[f['t'] for f in frames]),
)
json.dump(res, open(out_json, 'w'))
print(f"{name:28s} MADmean {res['mad_mean']:.2f} max {res['mad_max']:.2f} CV {res['mad_cv']:.2f} jerk {res['jerk_index']:.3f} jmax {res['jerk_max']:.2f} | ghost mean {res['ghost_mean']*100:.1f}% p95 {res['ghost_p95']*100:.1f}% max {res['ghost_max']*100:.1f}% | solid {res['solid_min']:.2f}-{res['solid_max']:.2f} | len {res['length_min']}-{res['length_max']}")
