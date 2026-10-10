# Legge misure/misure.json (da misura_bozze.js) e scrive misure/analisi.json; la cartella misure/ e' accanto a questo script.
import json, re, sys, os
import numpy as np
from PIL import Image
QUI = os.path.dirname(os.path.abspath(__file__))
R = json.load(open(os.path.join(QUI, 'misure', 'misure.json')))
rows = []
for r in R:
    W, H = r['W'], r['H']
    u = r['union']
    if not u:
        continue
    im = np.array(Image.open(r['mask']).convert('RGBA'))
    a = im[:, :, 3] > 20
    # mask px -> units
    ph, pw = a.shape
    kx, ky = W / pw, H / ph
    vbx = float(r['vb'].split()[0]); vby = float(r['vb'].split()[1])
    cols = a.any(axis=0)
    # segments separated by >= 3 px gap
    segs = []
    inseg = False
    gap = 0
    for x in range(pw):
        if cols[x]:
            if not inseg:
                segs.append([x, x]); inseg = True
            segs[-1][1] = x; gap = 0
        else:
            if inseg:
                gap += 1
                if gap >= 3:
                    inseg = False
    segd = []
    for s0, s1 in segs:
        sub = a[:, s0:s1+1]
        ys = np.where(sub.any(axis=1))[0]
        w = (s1 - s0 + 1) * kx
        if w < 4:  # ignore specks
            continue
        segd.append({'x0': round(vbx + s0*kx,1), 'x1': round(vbx + (s1+1)*kx,1), 'w': round(w,1), 'y0': round(vby + ys.min()*ky,1), 'y1': round(vby + (ys.max()+1)*ky,1), 'h': round((ys.max()-ys.min()+1)*ky,1)})
    # central square
    sq0 = vbx + (W - min(W,H)) / 2 if W > H else vbx
    sq1 = sq0 + min(W, H)
    outside = u['x0'] < sq0 - 2 or u['x1'] > sq1 + 2
    m = re.match(r'ex-(\d+)', r['file'])
    n = int(m.group(1)) if m else 0
    rows.append(dict(file=r['file'], n=n, vb=r['vb'], W=W, H=H, sq=(round(sq0,1), round(sq1,1)), u=u, outside=outside, nseg=len(segd), segs=segd,
                     bg=r['bgs'], nshadow=len(r['shadows']), counts=r['counts'], matrix=r['matrix'], grad=r['hasGradient'], filt=r['hasFilter'], clip=r['hasClip'], ntext=r['nText']))
json.dump(rows, open(os.path.join(QUI, 'misure', 'analisi.json'), 'w'), indent=1)
for x in rows:
    u = x['u']
    hs = [s['h'] for s in x['segs'] if s['h'] > 30]
    print(f"{x['file'][:42]:42s} vb={x['vb']:16s} bg={[ (b['x'],b['w'],b['h']) for b in x['bg']][:2]} U=x[{u['x0']},{u['x1']}] y[{u['y0']},{u['y1']}] {u['w']}x{u['h']} out={x['outside']} segs={x['nseg']} segH={hs[:6]} sh={x['nshadow']} txt={x['ntext']} mtx={x['matrix']} c={x['counts']}")
