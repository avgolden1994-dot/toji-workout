"""python3 plot.py OUT.png title name1 name2 ...  (reads results/<name>.json)"""
import sys, json
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
out, title = sys.argv[1], sys.argv[2]
names = sys.argv[3:]
fig, ax = plt.subplots(3, 1, figsize=(11, 8.5), sharex=True)
for n in names:
    r = json.load(open(f'results/{n}.json'))
    t = [v / 1000 for v in r['series']['t']]
    ax[0].plot(t, r['series']['mad'], label=n, lw=1.2)
    ax[1].plot(t, [g * 100 for g in r['series']['ghost']], label=n, lw=1.2)
    ax[2].plot(t, r['series']['solid'], label=n, lw=1.2)
ax[0].set_ylabel('MAD frame-to-frame\n(grey levels, moving region)')
ax[1].set_ylabel('ghost / blended px\n(% interior moving px)')
ax[2].set_ylabel('solid limb area\n(vs START)')
ax[2].set_xlabel('time (s), 60 fps')
ax[0].legend(fontsize=8, ncol=3)
for a in ax: a.grid(alpha=.3)
fig.suptitle(title)
fig.tight_layout()
fig.savefig(out, dpi=80)
print(out)
