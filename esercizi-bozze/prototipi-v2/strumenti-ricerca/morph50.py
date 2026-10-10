"""Aligned outlines (same point count, consistent start/orientation) of ex-50 moving parts across the 5 drawn poses."""
import sys, json
sys.path.insert(0, '.')
import numpy as np
from svgparts import load_parts, sample_path, orient_ccw, best_correspondence, GROUPS

SRC = '/home/user/toji-workout/esercizi/ex-50-alzate-laterali.svg'
N = 480
AX = 877.5


def get():
    parts = load_parts(SRC)
    out = {}
    for g in GROUPS:
        els = parts[g]
        arms = [e for e in els if e['kind'] == 'Path' and e['fill'] == '#fdba8c']
        dels = [e for e in els if e['kind'] == 'Path' and e['fill'] == '#fb8b3c']
        rects = [e for e in els if e['kind'] == 'Rect']
        def side(lst):
            lst = sorted(lst, key=lambda e: e['path'].bbox()[0])
            return lst[0], lst[1]
        aL, aR = side(arms); dL, dR = side(dels)
        rL, rR = side(rects)
        cen = lambda e: [(e['path'].bbox()[0] + e['path'].bbox()[2]) / 2, (e['path'].bbox()[1] + e['path'].bbox()[3]) / 2]
        out[g] = dict(armL=orient_ccw(sample_path(aL['path'], N)), armR=orient_ccw(sample_path(aR['path'], N)),
                      delL=orient_ccw(sample_path(dL['path'], N)), delR=orient_ccw(sample_path(dR['path'], N)),
                      dbL=np.array(cen(rL)), dbR=np.array(cen(rR)))
    # chain alignment START->...->END
    for part in ('armL', 'armR', 'delL', 'delR'):
        for a, b in zip(GROUPS[:-1], GROUPS[1:]):
            A, B = out[a][part], out[b][part]
            rms, k, s, th, t, R = best_correspondence(A, B)
            out[b][part] = np.roll(B, -k, axis=0)
    return out


if __name__ == '__main__':
    o = get()
    for g in GROUPS:
        print(g, 'dbL', o[g]['dbL'].round(2), 'dbR', o[g]['dbR'].round(2))
