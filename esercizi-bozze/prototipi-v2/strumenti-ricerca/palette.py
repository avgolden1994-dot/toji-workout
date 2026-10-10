"""Build the clean-colour palette from key-pose frames: colours with >= MIN px in any key frame.
usage: python3 palette.py OUT_JSON MIN frame1.png frame2.png ..."""
import sys, json
import numpy as np
from PIL import Image
out, mn = sys.argv[1], int(sys.argv[2])
cols = set()
for f in sys.argv[3:]:
    a = np.asarray(Image.open(f).convert('RGB')).reshape(-1, 3)
    u, c = np.unique(a, axis=0, return_counts=True)
    for col, cnt in zip(u, c):
        if cnt >= mn:
            cols.add(tuple(int(v) for v in col))
json.dump(sorted(cols), open(out, 'w'))
print(len(cols), 'colours ->', out)
