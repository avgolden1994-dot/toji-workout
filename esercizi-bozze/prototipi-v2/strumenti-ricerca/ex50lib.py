"""Extraction of ex-50 parts from the shipped final (text level)."""
import re

SRC = '/home/user/toji-workout/esercizi/ex-50-alzate-laterali.svg'
VIEWBOX = '790.5 77.5 173.3 130'
_s = open(SRC).read()
STATIC = _s[_s.find('</style>') + 8:_s.find('<g id="f-giu"')].strip()
POSES = {}
for m in re.finditer(r'<g id="([^"]+)" class="fr"( transform="translate\(([-\d.]+) ([-\d.]+)\)")?>(.*?)</g>', _s, re.S):
    gid = m.group(1)
    dx = float(m.group(3) or 0); dy = float(m.group(4) or 0)
    lines = m.group(5).strip().split('\n')
    # roles: arms (fdba8c paths), dumbbells, deltoids
    armL, armR = lines[0], lines[1]
    rest = lines[2:-2]
    delL, delR = lines[-2], lines[-1]
    # dumbbell elements split by side using x of first numeric attr
    def cx(l):
        m2 = re.search(r'(?:cx|x)="([-\d.]+)"', l)
        return float(m2.group(1)) + dx
    mid = 877.7
    dbL = [l for l in rest if cx(l) < mid]
    dbR = [l for l in rest if cx(l) >= mid]
    POSES[gid] = dict(dx=dx, dy=dy, armL=armL, armR=armR, dbL=dbL, dbR=dbR, delL=delL, delR=delR)

ORDER = ['f-giu', 'f-q1', 'f-mid', 'f-q3', 'f-su']


def wrap(lines, dx=0, dy=0, attrs=''):
    t = f' transform="translate({dx:g} {dy:g})"' if (dx or dy) else ''
    body = '\n'.join(lines) if isinstance(lines, list) else lines
    return f'<g{t}{attrs}>\n{body}\n</g>'


def doc(style, body, viewbox=VIEWBOX, label='Alzate Laterali (frontale)', comment=''):
    c = f'<!-- {comment} -->\n' if comment else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" fill="none" role="img" aria-label="{label}">\n'
            f'{c}<style>\n{style}\n</style>\n{STATIC}\n{body}\n</svg>\n')
