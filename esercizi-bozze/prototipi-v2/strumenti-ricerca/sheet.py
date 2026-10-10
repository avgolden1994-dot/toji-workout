"""Contact sheet: python3 sheet.py out.png cols label1=dir1[:i,j,k] label2=dir2 ...
Each dir is a frames dir from render.js; optional frame indices after ':'.
--crop x0,y0,x1,y1 (fractions) crops each frame."""
import sys, json, os
from PIL import Image, ImageDraw

out = sys.argv[1]
cols = int(sys.argv[2])
crop = None
items = []
args = sys.argv[3:]
i = 0
while i < len(args):
    a = args[i]
    if a == '--crop':
        crop = [float(v) for v in args[i + 1].split(',')]
        i += 2
        continue
    label, spec = a.split('=', 1)
    if ':' in spec:
        d, idx = spec.split(':', 1)
        idx = [int(v) for v in idx.split(',')]
    else:
        d, idx = spec, None
    meta = json.load(open(os.path.join(d, 'frames.json')))
    frames = meta['frames']
    if idx is not None:
        frames = [frames[k] for k in idx]
    items.append((label, frames))
    i += 1

tiles = []
for label, frames in items:
    for f in frames:
        im = Image.open(f['file']).convert('RGBA')
        bg = Image.new('RGBA', im.size, (255, 255, 255, 255))
        im = Image.alpha_composite(bg, im).convert('RGB')
        if crop:
            W, H = im.size
            im = im.crop((int(crop[0] * W), int(crop[1] * H), int(crop[2] * W), int(crop[3] * H)))
        tiles.append((f"{label} t={f['t']:.0f}", im))

tw = max(t[1].size[0] for t in tiles)
th = max(t[1].size[1] for t in tiles) + 16
rows = (len(tiles) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw, rows * th), (230, 230, 230))
d = ImageDraw.Draw(sheet)
for k, (lab, im) in enumerate(tiles):
    x, y = (k % cols) * tw, (k // cols) * th
    sheet.paste(im, (x, y + 16))
    d.text((x + 3, y + 2), lab, fill=(0, 0, 0))
    d.rectangle([x, y, x + tw - 1, y + th - 1], outline=(160, 160, 160))
sheet.save(out)
print(out, sheet.size)
