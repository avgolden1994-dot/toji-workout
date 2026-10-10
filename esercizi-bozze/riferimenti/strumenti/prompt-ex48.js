// Prompt di ex-48: blocchi identici + un solo paragrafo "Position" diverso. Stampa i prompt e il numero di caratteri.
const fs = require('fs');
const A = 'Detailed vector illustration for a premium fitness app: one athletic woman on a seated shoulder press machine, strict front view, camera at chest height. Square canvas, viewBox 0 0 1000 1000, one figure centred on x=500. Shoe soles and machine base on y=950, top of her head at y=300, machine crossbar at y=70.';
const B = 'The woman: late 20s, athletic and toned, 7.5 heads tall. Dark brown hair #2B211C in a high ponytail. Skin #D2B8A3. Black sports bra #201E1E with thin seams, slate grey high-waist leggings #5B5E66, dark grey trainers #2F3237 with white soles and laces. Calm face with small simple features. A visible neck joins head and shoulders.';
const C = 'The machine: seat and tall backrest padded in dark slate #34373D with stitched seams; seat top at y=730, on a steel post; backrest behind her back and head, as wide as her shoulders, top edge at y=270. Two vertical steel posts #8a919c at x=190 and x=810, with bolts, on a steel base frame, joined by the crossbar. Each post has a sliding carriage with a horizontal handle pointing inward, covered by a black ribbed grip #201E1E. Only the carriages move, straight up and down the posts.';
const D = 'She sits upright, her whole back on the backrest. Her shoulders span x=390 to x=610, shoulder joints at y=450, kept low, away from the ears. Knees bent 90 degrees, hip-width apart, at y=705 just above the seat top; shins vertical; feet flat. Overhand grip, palms forward: from the front we see four curled fingers across each grip and the thumb tip below them; wrists straight. Both arms mirror each other; her face stays fully visible.';
const F = 'Muscles painted on her skin: front and side deltoids as a rounded bright orange #fb8b3c cap over each shoulder joint, on the upper arm; triceps as a light orange #fdba8c band along the underside of each upper arm; fine separation lines. Style: realistic proportions, crisp cel shading with one darker shade per colour, thin dark outlines, five distinct fingers per hand; upper arms, forearms and hands as separate shapes with rounded ends overlapping at the joints. Plain transparent background: no floor, no shadow, no other objects, no text.';
const REF = 'Attached image: the same illustration in another position. Keep the woman, outfit, colours, machine, camera, framing and scale; only her arms and the two carriages move.';
const E = {
  start: 'Position, bottom of the press: grip centres at x=310 and x=690, y=405, level with her chin. Forearms vertical, elbows directly below the grips at y=560, level with the bottom of her sports bra; upper arms 46 degrees below horizontal, clear of her torso.',
  end: 'Position, top of the press: grip centres at x=310 and x=690, y=164, high above her head. Arms almost straight with soft elbows, elbow angle 165 degrees, forming a slight V; elbows at x=345 and x=655, y=315, level with her forehead.',
  mid: 'Position, halfway up the press: grip centres at x=310 and x=690, y=285, just above the top of her head. Elbows out wide at x=264 and x=736, y=433, at shoulder height; upper arms 6 degrees above horizontal; elbow angle 79 degrees; forearms tilted slightly inward.',
  q1: 'Position, one quarter of the way up the press: grip centres at x=310 and x=690, y=345, level with her eyes. Elbows at x=270 and x=730, y=495, below shoulder height; upper arms 17 degrees below horizontal; elbow angle 58 degrees; forearms tilted slightly inward.',
  q3: 'Position, three quarters of the way up the press: grip centres at x=310 and x=690, y=224, one hand above her head. Elbows at x=282 and x=718, y=376, level with her nose; upper arms 29 degrees above horizontal; elbow angle 109 degrees; forearms tilted slightly inward.',
};
const out = {};
for (const [k, pos] of Object.entries(E)) out[k] = [A, B, C, D, pos, F].join('\n\n');
const bad = /\b(START|MID|END|start|mid)\b|%|°|[^\x00-\x7F]/;
for (const [k, t] of Object.entries(out)) {
  const m = t.match(bad);
  console.log(k, t.length, 'caratteri', '(con REF', (REF + '\n\n' + t).length + ')', m ? 'PAROLA VIETATA: ' + m[0] : 'ok');
}
console.log('blocchi fissi:', { A: A.length, B: B.length, C: C.length, D: D.length, F: F.length, REF: REF.length });
fs.writeFileSync(__dirname + '/prompt-ex48.json', JSON.stringify({ out, REF, blocchi: { A, B, C, D, F }, E }, null, 1));
