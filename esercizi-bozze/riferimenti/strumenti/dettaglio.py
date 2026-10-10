# Statistiche per regime (coordinate di path per figura, ecc.) da misure/analisi.json (analizza.py) e dagli SVG delle bozze.
# Percorsi relativi a questo script: strumenti/ -> riferimenti/ -> esercizi-bozze/ -> radice del repo.
import re, json, glob, os, statistics as st
QUI = os.path.dirname(os.path.abspath(__file__))
BOZZE = os.path.normpath(os.path.join(QUI, '..', '..'))
FINALI = os.path.normpath(os.path.join(QUI, '..', '..', '..', 'esercizi'))
rows = json.load(open(os.path.join(QUI, 'misure', 'analisi.json')))
byfile = {r['file']: r for r in rows}
def nposes(n, f):
    if f.startswith('ex-02'): return 1
    if 40 <= n <= 41: return 3
    if n >= 42: return 5
    return 2
def regime(n, f):
    if f.startswith('ex-02'): return 'S1 single-realistic'
    if n <= 25: return 'R1 2-pose realistic'
    if n <= 39: return 'R2 2-pose flat'
    if n <= 41: return 'R3 3-pose flat'
    return 'R4 5-pose flat'
acc = {}
for path in sorted(glob.glob(os.path.join(BOZZE, '*.svg'))) + [os.path.join(FINALI, 'ex-02-panca-inclinata-su-a.svg')]:
    f = os.path.basename(path)
    t = open(path).read()
    m = re.match(r'ex-(\d+)', f); n = int(m.group(1))
    ds = re.findall(r'\sd="([^"]*)"', t)
    cmds = sum(len(re.findall(r'[MmLlHhVvCcSsQqTtAaZz]', d)) for d in ds)
    # numbers count as proxy for coordinates
    nums = sum(len(re.findall(r'-?\d*\.?\d+', d)) for d in ds)
    fills = set(x.lower() for x in re.findall(r'fill="(#[0-9A-Fa-f]{3,6})"', t))
    r = byfile.get(f)
    k = nposes(n, f)
    content = r['counts'].get('content', 0) if r else 0
    segh = [s['h'] for s in r['segs'] if s['h'] > 25] if r else []
    reg = regime(n, f)
    acc.setdefault(reg, []).append(dict(f=f, k=k, el=content/k, cmd=cmds/k, nums=nums/k, fills=len(fills), kb=len(t)/1024, h=max(segh) if segh else 0, uh=r['u']['h'] if r else 0))
for reg, L in sorted(acc.items()):
    med = lambda key: round(st.median([x[key] for x in L]), 1)
    print(f"{reg:22s} n={len(L):3d}  elements/fig={med('el')}  pathcmds/fig={med('cmd')}  coords/fig={med('nums')}  fills/file={med('fills')}  KB/file={med('kb')}  maxSegH={med('h')} unionH={med('uh')}")
