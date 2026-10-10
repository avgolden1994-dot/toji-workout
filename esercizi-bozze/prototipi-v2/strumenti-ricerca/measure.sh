#!/bin/bash
# usage: measure.sh NAME SVG EXCONF   (EXCONF = file with PAL, PIVOTS, AXIS, VB, LIMB, WIDTH)
set -e
cd "$(dirname "$0")"
export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers NODE_PATH=/opt/node-tools/node_modules
NAME=$1; SVG=$2; source $3
node render-frames.js "$SVG" frames/m-$NAME --fps 60 --dur ${DUR:-5400} --width $WIDTH >/dev/null
node render-frames.js "$SVG" frames/m-$NAME-static --times 0 --width $WIDTH --css ".fr,.mv,.anim,g[class*=\"-mv\"]{display:none!important}" >/dev/null
python3 -I metrics.py "$NAME" frames/m-$NAME frames/m-$NAME-static/f0000.png $PAL results/$NAME.json --limb $LIMB --pivots "$PIVOTS" --px-per-unit $PPU --vb $VB --axis $AXIS
