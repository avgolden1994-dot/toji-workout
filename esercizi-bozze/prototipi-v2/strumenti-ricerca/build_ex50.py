"""Builds the ex-50 prototypes into esercizi-bozze/prototipi-v2/."""
import sys, re, math
sys.path.insert(0, '.')
import numpy as np
from ex50lib import STATIC, POSES, ORDER, doc
from animcss import *
from svgparts import catmull_rom_path
import morph50

OUT = '/home/user/toji-workout/esercizi-bozze/prototipi-v2/'
AX = 877.5
PIV_L = (866.0, 108.5)
PIV_R = (2 * AX - PIV_L[0], PIV_L[1])
HAND_L = (860.46, 144.89)
HAND_R = (893.77, 144.89)
THETA = 80.0          # end abduction (deg) of the START arm
DEL_FRAC = 0.55       # deltoid cap follows 55% of the arm angle
P0 = POSES['f-giu']


def g(lines, attrs='', dx=0, dy=0):
    t = f' transform="translate({fmt(dx)} {fmt(dy)})"' if (dx or dy) else ''
    body = '\n'.join(lines) if isinstance(lines, list) else lines
    return f'<g{attrs}{t}>\n{body}\n</g>'


def pose_markup(gid):
    p = POSES[gid]
    return [p['armL'], p['armR']] + p['dbL'] + p['dbR'] + [p['delL'], p['delR']], p['dx'], p['dy']


# ---------------------------------------------------------------- shared morph data
M = morph50.get()
K_ARM, K_DEL = 56, 20


def pts_at(part, gid, K):
    P = M[gid][part]
    idx = np.linspace(0, len(P), K, endpoint=False).astype(int)
    return P[idx]


def shape_path(part, gid, K, fill, prec=2):
    return f'<path d="{catmull_rom_path(pts_at(part, gid, K), prec=prec)}" fill="{fill}"/>'


def interp_markup(ga, gb, u):
    """Synthetic intermediate pose between drawn poses ga, gb (u in 0..1): morphed arm/deltoid outlines,
    START dumbbell translated to the interpolated hand position."""
    out = []
    for part, K, fill in (('armL', K_ARM, '#fdba8c'), ('armR', K_ARM, '#fdba8c')):
        P = (1 - u) * pts_at(part, ga, K) + u * pts_at(part, gb, K)
        out.append(f'<path d="{catmull_rom_path(P)}" fill="{fill}"/>')
    for side in 'LR':
        c = (1 - u) * M[ga]['db' + side] + u * M[gb]['db' + side]
        d = c - M['f-giu']['db' + side]
        out.append(g(P0['db' + side], dx=round(d[0], 2), dy=round(d[1], 2)))
    for part in ('delL', 'delR'):
        P = (1 - u) * pts_at(part, ga, K_DEL) + u * pts_at(part, gb, K_DEL)
        out.append(f'<path d="{catmull_rom_path(P)}" fill="#fb8b3c"/>')
    return out


# ---------------------------------------------------------------- 1) 9-pose crossfade (4 synthetic)
def crossfade9():
    ids, body = [], []
    seq = []
    for i, gid in enumerate(ORDER):
        seq.append(('drawn', gid))
        if i < len(ORDER) - 1:
            seq.append(('synth', (gid, ORDER[i + 1])))
    for j, (kind, ref) in enumerate(seq):
        gid = f'f-p{j}'
        ids.append(gid)
        if kind == 'drawn':
            lines, dx, dy = pose_markup(ref)
            body.append(g(lines, f' id="{gid}" class="fr"', dx, dy))
        else:
            body.append(g(interp_markup(ref[0], ref[1], 0.5), f' id="{gid}" class="fr" data-synthetic="1"'))
    css = crossfade_css(ids)
    return doc(css, '\n'.join(body), comment='PROTOTIPO R&D: crossfade a 9 pose. Pose 0,2,4,6,8 = disegnate (bozza d); pose 1,3,5,7 = SINTETICHE (interpolazione dei contorni a meta strada), data-synthetic="1".')


# ---------------------------------------------------------------- 2) SMIL path morph (5 drawn poses)
KT = '0;0.03;0.162;0.25;0.338;0.47;0.53;0.662;0.75;0.838;0.97;1'
SEQ = [0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0, 0]
SPL = ['0 0 1 1', '.4 0 .7 .55', '0 0 1 1', '0 0 1 1', '.3 .45 .6 1', '0 0 1 1',
       '.4 0 .7 .55', '0 0 1 1', '0 0 1 1', '.3 .45 .6 1', '0 0 1 1']


def smil(attr, values, extra=''):
    return (f'<animate attributeName="{attr}" dur="5.4s" repeatCount="indefinite" calcMode="spline" '
            f'keyTimes="{KT}" keySplines="{";".join(SPL)}" values="{";".join(values)}"{extra}/>')


def morph_smil():
    body = []
    statics = []
    for part, K, fill in (('armL', K_ARM, '#fdba8c'), ('armR', K_ARM, '#fdba8c')):
        ds = [catmull_rom_path(pts_at(part, gg, K), prec=2) for gg in ORDER]
        body.append(f'<path class="mv" d="{ds[0]}" fill="{fill}">{smil("d", [ds[k] for k in SEQ])}</path>')
    for side in 'LR':
        vals = []
        for k in SEQ:
            d = M[ORDER[k]]['db' + side] - M['f-giu']['db' + side]
            vals.append(f'{fmt(d[0], 2)} {fmt(d[1], 2)}')
        anim = (f'<animateTransform attributeName="transform" type="translate" dur="5.4s" repeatCount="indefinite" '
                f'calcMode="spline" keyTimes="{KT}" keySplines="{";".join(SPL)}" values="{";".join(vals)}"/>')
        body.append(f'<g class="mv">\n' + '\n'.join(P0['db' + side]) + f'\n{anim}\n</g>')
    for part in ('delL', 'delR'):
        ds = [catmull_rom_path(pts_at(part, gg, K_DEL), prec=2) for gg in ORDER]
        body.append(f'<path class="mv" d="{ds[0]}" fill="#fb8b3c">{smil("d", [ds[k] for k in SEQ])}</path>')
    # reduced motion: static START copy (hidden unless reduce)
    st = [P0['armL'], P0['armR']] + P0['dbL'] + P0['dbR'] + [P0['delL'], P0['delR']]
    body.append(g(st, ' class="st"'))
    css = '.st{display:none}\n@media (prefers-reduced-motion:reduce){.mv{display:none}.st{display:inline}}'
    return doc(css, '\n'.join(body), comment='PROTOTIPO R&D: morph SMIL dei contorni (5 pose disegnate, contorni ricampionati a struttura identica: 56 C per braccio, 20 per deltoide).')


# ---------------------------------------------------------------- 3) rigid tween, single master (START)
def ease_keys(theta, hold=3.0, ease=EASE_IO):
    """angle keys: START hold, rise, END hold, lower, START hold (symmetric)."""
    return [(0, 0, None), (hold, 0, ease), (50 - hold, theta, None), (50 + hold, theta, ease), (100 - hold, 0, None), (100, 0, None)]


def rot_keyframes(name, piv, keys, tx=None):
    ks = []
    for i, (tm, a, tfn) in enumerate(keys):
        dx, dy = (tx[i] if tx else (0, 0))
        ks.append((tm, 'transform:' + rot_tf(piv[0], piv[1], a, dx, dy), tfn))
    return keyframes(name, ks)


def tween_rigid(theta=THETA, del_frac=DEL_FRAC, hold=3.0, ease=EASE_IO):
    keys = ease_keys(theta, hold, ease)
    neg = lambda ks, f=1.0: [(t, -a * f, e) for t, a, e in ks]
    sc = lambda ks, f: [(t, a * f, e) for t, a, e in ks]
    css = ['.mv{transform-box:view-box;transform-origin:0 0;animation:5.4s infinite linear}',
           '.aL{animation-name:aL}.aR{animation-name:aR}.hL{animation-name:hL}.hR{animation-name:hR}.cL{animation-name:cL}.cR{animation-name:cR}',
           rot_keyframes('aL', PIV_L, keys), rot_keyframes('aR', PIV_R, neg(keys)),
           rot_keyframes('hL', HAND_L, neg(keys)), rot_keyframes('hR', HAND_R, keys),
           rot_keyframes('cL', PIV_L, sc(keys, del_frac)), rot_keyframes('cR', PIV_R, neg(keys, del_frac)),
           '@media (prefers-reduced-motion:reduce){.mv{animation:none!important}}']
    body = []
    for side in 'LR':
        body.append(f'<g class="mv a{side}">\n{P0["arm" + side]}\n' + g(P0['db' + side], f' class="mv h{side}"') + '\n</g>')
    for side in 'LR':
        body.append(g([P0['del' + side]], f' class="mv c{side}"'))
    return doc('\n'.join(css), '\n'.join(body),
               comment=f'PROTOTIPO R&D: tween rigido da un solo disegno (START). Braccio ruotato attorno alla spalla (pivot {PIV_L}, {PIV_R}) fino a {theta} gradi, manubrio contro-ruotato attorno alla mano, deltoide al {int(del_frac*100)}% dell angolo. Solo transform CSS.')


if __name__ == '__main__':
    open(OUT + 'ex-50-crossfade-9.svg', 'w').write(crossfade9())
    open(OUT + 'ex-50-morph-smil.svg', 'w').write(morph_smil())
    open(OUT + 'ex-50-tween-rigid.svg', 'w').write(tween_rigid())
    import os
    for f in ('ex-50-crossfade-9.svg', 'ex-50-morph-smil.svg', 'ex-50-tween-rigid.svg'):
        print(f, os.path.getsize(OUT + f))


# ---------------------------------------------------------------- 4) two masters (START + END drawn), swap at coincident angle
def tween_2master(theta=THETA, del_frac=DEL_FRAC, win=2.5):
    """Layer A = START drawing rotated by theta(t); layer B = END drawing (length-normalised along its axis)
    rotated by theta(t)-thetaB so that both coincide; B fades in OVER an opaque A around mid-rise (no see-through dip)."""
    PE = POSES['f-su']
    keys = ease_keys(theta)
    cfg = {'L': (PIV_L, 1, 84.9, 1.69), 'R': (PIV_R, -1, 84.9, 1.77)}
    css = ['.mv{transform-box:view-box;transform-origin:0 0;animation:5.4s infinite linear}',
           '.aL{animation-name:aL}.aR{animation-name:aR}.hL{animation-name:hL}.hR{animation-name:hR}.cL{animation-name:cL}.cR{animation-name:cR}'
           '.bL{animation-name:bL,ob}.bR{animation-name:bR,ob}.dL{animation-name:dL,ob}.dR{animation-name:dR,ob}.oa{animation-name:aL,oa}.ob{animation-name:aR,oa}']
    body_a, body_b, body_h = [], [], []
    sgnk = lambda ks, f=1.0, off=0.0: [(t, a * f + off, e) for t, a, e in ks]
    for side, (piv, sg, thB, k) in cfg.items():
        css.append(rot_keyframes('a' + side, piv, sgnk(keys, sg)))
        css.append(rot_keyframes('h' + side, HAND_L if side == 'L' else HAND_R, sgnk(keys, -sg)))
        css.append(rot_keyframes('c' + side, piv, sgnk(keys, sg * del_frac)))
        css.append(rot_keyframes('b' + side, piv, sgnk(keys, sg, -sg * thB)))
        css.append(rot_keyframes('d' + side, piv, sgnk(keys, sg * del_frac, -sg * del_frac * thB)))
        # END arm normalisation: stretch k along its own axis (phi) about the pivot, in END-group coordinates
        phi = -175.0 if side == 'L' else -4.8
        dx = PE['dx']
        norm = (f'translate({fmt(piv[0])} {fmt(piv[1])}) rotate({fmt(phi)}) scale({fmt(k)} 1) rotate({fmt(-phi)}) '
                f'translate({fmt(-piv[0])} {fmt(-piv[1])}) translate({fmt(dx)} 0)')
        body_a.append(f'<g class="mv a{side} oa{side}">{P0["arm" + side]}</g>')
        body_a.append(g([P0['del' + side]], f' class="mv c{side} oa{side}"'))
        body_b.append(f'<g class="mv b{side}"><g transform="{norm}">{PE["arm" + side]}</g></g>')
        body_b.append(f'<g class="mv d{side}"><g transform="translate({fmt(dx)} 0)">{PE["del" + side]}</g></g>')
        body_h.append(f'<g class="mv a{side}">' + g(P0['db' + side], f' class="mv h{side}"') + '</g>')
    # opacity: A opaque until B is fully in, then hidden; B fades in over A around 25% and out around 75%
    css.append(f'@keyframes ob{{0%,{fmt(25 - win)}%{{opacity:0}}{fmt(25 + win)}%,{fmt(75 - win)}%{{opacity:1}}{fmt(75 + win)}%,100%{{opacity:0}}}}')
    css.append(f'@keyframes oa{{0%,{fmt(25 + win)}%{{opacity:1}}{fmt(25 + win + 0.01)}%,{fmt(75 - win - 0.01)}%{{opacity:0}}{fmt(75 - win)}%,100%{{opacity:1}}}}')
    css = [c.replace('.oa{animation-name:aL,oa}.ob{animation-name:aR,oa}', '') for c in css]
    css.append('.aL.oaL{animation-name:aL,oa}.aR.oaR{animation-name:aR,oa}.cL.oaL{animation-name:cL,oa}.cR.oaR{animation-name:cR,oa}')
    css.append('@media (prefers-reduced-motion:reduce){.mv{animation:none!important}.bL,.bR,.dL,.dR{opacity:0}}')
    return doc('\n'.join(css), '\n'.join(body_a + body_b + body_h),
               comment='PROTOTIPO R&D: due disegni master (START e END della bozza d). A = START ruotato, B = END ruotato all indietro e allungato lungo l asse (x1.7: il braccio END della bozza e lungo solo il 57% di quello START), B entra in dissolvenza SOPRA A opaco intorno a meta salita (25%) e esce a meta discesa (75%).')

if __name__ == '__main__':
    open(OUT + 'ex-50-tween-2master.svg', 'w').write(tween_2master())
    print('2master', len(tween_2master()))


# ---------------------------------------------------------------- 5) hybrid: rigid tween + secondary motion + tempo
EASE_UP = 'cubic-bezier(.47,0,.53,1)'      # ~minimum-jerk peak speed
EASE_DN = 'cubic-bezier(.42,0,.58,1)'


def hybrid(theta=THETA, del_frac=DEL_FRAC, breath=0.008, shrug=0.9, squash=(1.1, 0.9),
           tl=(6, 40, 46, 95), name='hybrid'):
    b0, t0, t1, b1 = tl          # bottom-hold end, top reached, top-hold end, bottom reached
    st = STATIC.split('\n')
    lower = [st[i] for i in (0, 2, 3, 4, 15, 16, 17, 18)]
    upper = [st[i] for i in (1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14)]
    ang = lambda a: [(0, 0, None), (b0, 0, EASE_UP), (t0, a, None), (t1, a, EASE_DN), (b1, 0, None), (100, 0, None)]
    css = ['.mv{transform-box:view-box;transform-origin:0 0;animation:5.4s infinite linear}',
           '.br{animation-name:br}.sh{animation-name:sh}.aL{animation-name:aL}.aR{animation-name:aR}'
           '.hL{animation-name:hL}.hR{animation-name:hR}.cL{animation-name:cL}.cR{animation-name:cR}']
    css.append(rot_keyframes('aL', PIV_L, ang(theta)))
    css.append(rot_keyframes('aR', PIV_R, ang(-theta)))
    css.append(rot_keyframes('hL', HAND_L, ang(-theta)))
    css.append(rot_keyframes('hR', HAND_R, ang(theta)))
    # deltoid: follows del_frac of the angle and contracts (shorter + wider) at the top
    for side, piv, sg, cc in (('L', PIV_L, 1, (867.2, 108.4)), ('R', PIV_R, -1, (887.3, 108.4))):
        ks = []
        for tm, a, e in ang(theta):
            p = a / theta
            sx = 1 + (squash[0] - 1) * p; sy = 1 + (squash[1] - 1) * p
            tr = (rot_tf(piv[0], piv[1], sg * a * del_frac) +
                  f' translate({fmt(cc[0])}px,{fmt(cc[1])}px) scale({fmt(sx)},{fmt(sy)}) translate({fmt(-cc[0])}px,{fmt(-cc[1])}px)')
            ks.append((tm, 'transform:' + tr, e))
        css.append(keyframes('c' + side, ks))
    # shoulder elevation (scapular upward rotation), starts after ~1/4 of the rise, released before the bottom
    rise = t0 - b0
    css.append(keyframes('sh', [(0, 'transform:translate(0px,0px)', None),
                                (b0 + 0.25 * rise, 'transform:translate(0px,0px)', 'cubic-bezier(.45,0,.55,1)'),
                                (t0, f'transform:translate(0px,{fmt(-shrug)}px)', None),
                                (t1, f'transform:translate(0px,{fmt(-shrug)}px)', 'cubic-bezier(.45,0,.55,1)'),
                                (t1 + 0.7 * (b1 - t1), 'transform:translate(0px,0px)', None),
                                (100, 'transform:translate(0px,0px)', None)]))
    # breathing: exhale (chest down) while lifting, inhale while lowering; scale about the waist line (no seam opens)
    W = (877.5, 127.5)
    brt = lambda s: f'transform:translate({fmt(W[0])}px,{fmt(W[1])}px) scale(1,{fmt(s, 4)}) translate({fmt(-W[0])}px,{fmt(-W[1])}px)'
    css.append(keyframes('br', [(0, brt(1 + breath), None), (b0, brt(1 + breath), 'cubic-bezier(.45,0,.55,1)'),
                                (t0, brt(1), None), (t1, brt(1), 'cubic-bezier(.45,0,.55,1)'),
                                (b1, brt(1 + breath), None), (100, brt(1 + breath), None)]))
    css.append('@media (prefers-reduced-motion:reduce){.mv{animation:none!important}}')
    arms = []
    for side in 'LR':
        arms.append(f'<g class="mv a{side}">\n{P0["arm" + side]}\n' + g(P0['db' + side], f' class="mv h{side}"') + '\n</g>')
    for side in 'LR':
        arms.append(g([P0['del' + side]], f' class="mv c{side}"'))
    body = '\n'.join(lower) + '\n' + g(upper + [g(arms, ' class="mv sh"')], ' class="mv br"')
    svg = doc('\n'.join(css), body, comment='PROTOTIPO R&D: ibrido = tween rigido da un solo disegno (START) + movimenti secondari (spalle che salgono di 0.9 u in alto, deltoide che si contrae, respiro 0.8% scalato attorno alla vita) + tempo asimmetrico (salita 1.8 s, pausa 0.3 s, discesa 2.6 s, pausa 0.6 s).')
    svg = svg.replace('\n' + STATIC + '\n', '\n', 1)
    return svg

if __name__ == '__main__':
    open(OUT + 'ex-50-hybrid.svg', 'w').write(hybrid())
    print('hybrid', len(hybrid()))


# ---------------------------------------------------------------- 6) flip-book control: rigid tween quantised to N fps (SMIL discrete)
def flipbook(fps=24, theta=THETA, del_frac=DEL_FRAC):
    import re as _re
    keys = ease_keys(theta)
    m = _re.match(r'cubic-bezier\(([^)]+)\)', EASE_IO)
    ef = {EASE_IO: cubic_bezier(*[float(v) for v in m.group(1).split(',')])}
    nfr = int(round(5.4 * fps))
    angs = [eval_keys(keys, 100.0 * k / nfr, ef) for k in range(nfr)]
    def anim(piv, f):
        vals = ';'.join(f'{fmt(a * f, 2)} {fmt(piv[0])} {fmt(piv[1])}' for a in angs)
        return (f'<animateTransform attributeName="transform" type="rotate" dur="5.4s" repeatCount="indefinite" '
                f'calcMode="discrete" values="{vals}"/>')
    body = []
    for side, piv, sg, hand in (('L', PIV_L, 1, HAND_L), ('R', PIV_R, -1, HAND_R)):
        body.append(f'<g class="mv">{anim(piv, sg)}\n{P0["arm" + side]}\n<g class="mv">{anim(hand, -sg)}\n' + '\n'.join(P0['db' + side]) + '</g></g>')
    for side, piv, sg in (('L', PIV_L, 1), ('R', PIV_R, -1)):
        body.append(f'<g class="mv">{anim(piv, sg * del_frac)}{P0["del" + side]}</g>')
    st = [P0['armL'], P0['armR']] + P0['dbL'] + P0['dbR'] + [P0['delL'], P0['delR']]
    body.append(g(st, ' class="st"'))
    css = '.st{display:none}\n@media (prefers-reduced-motion:reduce){.mv{display:none}.st{display:inline}}'
    return doc(css, '\n'.join(body), comment=f'PROTOTIPO R&D (controllo): stesso tween rigido ma quantizzato a {fps} fps (SMIL discrete), come un flip-book di disegni perfetti.')

if __name__ == '__main__':
    open(OUT + 'ex-50-flipbook-24.svg', 'w').write(flipbook(24))
    print('flipbook', len(flipbook(24)))
