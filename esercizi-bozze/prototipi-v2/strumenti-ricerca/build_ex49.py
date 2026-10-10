"""ex-49 Tirate al Mento: two-segment IK rig from the START drawing (prototype)."""
import sys, re, math, os
sys.path.insert(0, '.')
import numpy as np
from animcss import fmt, keyframes, cubic_bezier, rot_tf

SRC = '/home/user/toji-workout/esercizi/ex-49-tirate-al-mento.svg'
OUT = '/home/user/toji-workout/esercizi-bozze/prototipi-v2/'
VIEWBOX = '792.8 82 173.3 130'
s = open(SRC).read()
STATIC = s[s.find('</style>') + 8:s.find('<g id="f-giu"')].strip()
m = re.search(r'<g id="f-giu" class="fr">(.*?)</g>', s, re.S)
L = [l for l in m.group(1).strip().split('\n')]
(delL, delR, tank, neck, earL, earR, head, hair, uaL, faL, hdL, uaR, faR, hdR, bar, discL, discR) = L

# joints in START coordinates (from part bounding boxes / overlaps)
S0 = {'L': np.array([866.3, 116.0]), 'R': np.array([892.6, 116.0])}
E0 = {'L': np.array([865.6, 132.8]), 'R': np.array([893.4, 132.8])}
W0 = {'L': np.array([865.6, 148.5]), 'R': np.array([893.6, 148.5])}
UA = {'L': uaL, 'R': uaR}; FA = {'L': faL, 'R': faR}; HD = {'L': hdL, 'R': hdR}; DEL = {'L': delL, 'R': delR}


def ang(v):
    return math.degrees(math.atan2(v[1], v[0]))


def ik(S, W, L1, L2, side):
    """2-bone IK in the image plane; elbow on the lateral side."""
    d = np.linalg.norm(W - S)
    d = min(d, L1 + L2 - 1e-6)
    a = math.acos(max(-1, min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))))
    base = math.atan2(W[1] - S[1], W[0] - S[0])
    # lateral = towards smaller x for L, larger x for R
    cand = []
    for sg in (1, -1):
        th = base + sg * a
        E = S + L1 * np.array([math.cos(th), math.sin(th)])
        cand.append(E)
    return min(cand, key=lambda E: E[0]) if side == 'L' else max(cand, key=lambda E: E[0])


def build(travel=-44.0, shrug=-1.5, fore=0.75, del_frac=0.2, tl=(6, 40, 46, 95), nkeys=12,
          ease_up=(.47, 0, .53, 1), ease_dn=(.42, 0, .58, 1), cap=True, comment=None, static_torso=True,
          del_sq=0.45, del_top=110.7):
    b0, t0, t1, b1 = tl
    eu, ed = cubic_bezier(*ease_up), cubic_bezier(*ease_dn)
    # keyframes at uniform PROGRESS with exact sub-curves of the global easing on each segment
    from animcss import ease_segments
    samples = [(0.0, 0.0, None)]
    for x, p, tf in ease_segments(*ease_up, nkeys):
        samples.append((b0 + (t0 - b0) * x, p, tf))
    for x, p, tf in ease_segments(*ease_dn, nkeys):
        samples.append((t1 + (b1 - t1) * x, 1 - p, tf))
    samples.append((100.0, 0.0, None))
    css = ['.mv{transform-box:view-box;transform-origin:0 0;animation:5.4s infinite linear}']
    names = []
    self_check = []
    for side in 'LR':
        S, E, W = S0[side], E0[side], W0[side]
        L1 = np.linalg.norm(E - S); L2 = np.linalg.norm(W - E)
        a0 = ang(E - S); g0 = ang(W - E)
        ka, kf, kd = [], [], []
        # END elbow from IK (well-conditioned at END), then elbow-driven chain:
        S_end = S + np.array([0, shrug]); W_end = W + np.array([0, travel])
        E_end = ik(S_end, W_end, L1, L2 * fore, side)
        th0 = math.radians(a0); th1 = math.atan2(E_end[1] - S_end[1], E_end[0] - S_end[0])
        # go through the lateral side: unwrap th1 relative to th0 in the lateral direction
        dth = math.degrees(th1 - th0)
        dth = (dth + 360) % 360 if side == 'L' else -((-dth + 360) % 360)
        rows = []
        for tm, p, _tf in samples:
            Sp = S + np.array([0, shrug * p])
            Wp = W + np.array([0, travel * p])
            th = th0 + math.radians(dth * p)
            Ep = Sp + L1 * np.array([math.cos(th), math.sin(th)])
            al = dth * p
            ga = ang(Wp - Ep) - g0
            f = np.linalg.norm(Wp - Ep) / L2
            rows.append([tm, p, al, ga, f])
        rows = np.array(rows)
        rows[:, 3] = np.degrees(np.unwrap(np.radians(rows[:, 3])))
        self_check.append((side, rows[:, 4].min(), rows[:, 4].max()))
        psi = g0 - 90
        for (tm, p, al, ga, f), (_t, _p, tf) in zip(rows, samples):
            phi = ga - al
            ka.append((tm, 'transform:' + rot_tf(S[0], S[1], al, 0, shrug * p), tf))
            kf.append((tm, f'transform:translate({fmt(E[0])}px,{fmt(E[1])}px) rotate({fmt(phi, 2)}deg) rotate({fmt(psi, 2)}deg) '
                           f'scale(1,{fmt(f, 4)}) rotate({fmt(-psi, 2)}deg) translate({fmt(-E[0])}px,{fmt(-E[1])}px)', tf))
            sq = 1 + (del_sq - 1) * p
            kd.append((tm, 'transform:' + rot_tf(S[0], S[1], al * del_frac, 0, shrug * p) +
                       f' translate(0px,{fmt(del_top)}px) scale(1,{fmt(sq, 4)}) translate(0px,{fmt(-del_top)}px)', tf))
        css += [keyframes('ua' + side, ka), keyframes('fa' + side, kf), keyframes('de' + side, kd)]
        names += [f'.ua{side}{{animation-name:ua{side}}}', f'.fa{side}{{animation-name:fa{side}}}', f'.de{side}{{animation-name:de{side}}}']
    kb = [(tm, f'transform:translate(0px,{fmt(travel * p, 3)}px)', tf) for tm, p, tf in samples]
    css.append(keyframes('bar', kb))
    names.append('.bar{animation-name:bar}')
    css.insert(1, ''.join(names))
    css.append('@media (prefers-reduced-motion:reduce){.mv{animation:none!important}}')
    body = [STATIC]
    for side in 'LR':
        body.append(f'<g class="mv de{side}">{DEL[side]}</g>')
    body += [tank, neck, earL, earR, head, hair]
    for side in 'LR':
        capc = f'<circle cx="{fmt(E0[side][0])}" cy="{fmt(E0[side][1])}" r="3.4" fill="#D2B8A3"/>' if cap else ''
        body.append(f'<g class="mv ua{side}">\n{UA[side]}\n{capc}\n<g class="mv fa{side}">{FA[side]}</g>\n</g>')
    body.append(f'<g class="mv bar">\n{hdL}\n{hdR}\n{bar}\n{discL}\n{discR}\n</g>')
    print('forearm projected-length factor range', self_check)
    c = comment or ('PROTOTIPO R&D: rig a due segmenti da un solo disegno (START della bozza a). Bilanciere+mani traslano in verticale; '
                    'braccio ruota attorno alla spalla con curva di easing (posa finale da cinematica inversa), avambraccio (annidato) punta al polso e si accorcia/allunga per scorcio; '
                    f'scorcio avambraccio {fore} in alto, spalle +{-shrug} u, deltoide al {int(del_frac * 100)}%. Busto e testa statici.')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{VIEWBOX}" fill="none" role="img" aria-label="Tirate al Mento (frontale)">\n'
            f'<!-- {c} -->\n<style>\n' + '\n'.join(css) + '\n</style>\n' + '\n'.join(body) + '\n</svg>\n')


if __name__ == '__main__':
    import shutil
    shutil.copy(SRC, OUT + 'ex-49-baseline.svg')
    svg = build(del_frac=0.2, del_sq=0.45)
    open(OUT + 'ex-49-tween-ik.svg', 'w').write(svg)
    print('ex-49-tween-ik', len(svg))
