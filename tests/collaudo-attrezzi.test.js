/* INT-2f (revisione indipendente dell onda 2e, minore 5): il collaudo non passava mai al generatore gli attrezzi dichiarati (attrezziCasa, extraPalestra, manubriKg) ne i punti deboli del powerlifting: la copertura stava solo nelle prove unitarie.
   La matrice «attrezzi» (circa 600 profili: casa con i manubri, corpo libero e palestra x le risposte sugli attrezzi x livello x giorni x minuti x massa e glutei) lanciata sul generatore VERO: nessun errore, nessun esercizio che chiede un
   attrezzo che l utente ha detto di non avere (ATT-01), nessuna seduta con meno di 3 esercizi (EXN-01) o con esercizi doppi o fuori libreria (SAN-01). I punti deboli stanno ora nella matrice «forza» (tests/collaudo-forza.test.js). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { execFileSync } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');

test('ATT-01: sulla matrice «attrezzi» nessun errore, nessun esercizio con un attrezzo non dichiarato, nessuna seduta vuota o con doppioni', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'collaudo-attrezzi-'));
  try {
    execFileSync(process.execPath, [path.join(__dirname, '..', 'tools', 'collaudo-generatore.js'), '--matrice', 'attrezzi', '--solo', 'ATT-01,ERR-01,SAN-01,EXN-01', '--out', dir, '--etichetta', 'attrezzi', '--quiet'], { stdio: 'pipe', timeout: 240000 });
    const j = JSON.parse(fs.readFileSync(path.join(dir, 'collaudo-generatore-attrezzi.json'), 'utf8'));
    assert.strictEqual(j.riepilogo.matrice, 'attrezzi');
    assert.ok(j.riepilogo.profili >= 500 && j.riepilogo.profili <= 700, 'profili: ' + j.riepilogo.profili);
    assert.strictEqual(j.riepilogo.errori, 0, 'il generatore non lancia errori');
    assert.deepStrictEqual(Object.keys(j.riepilogo.classi).filter(k => /^(ATT-01|ERR-01|SAN-01|EXN-01)/.test(k)), [], 'nessuna classe: ' + JSON.stringify(j.riepilogo.classi));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('ATT-01: il criterio sa scattare (autotest del collaudo) e la matrice dichiara davvero gli attrezzi (i profili portano i campi al generatore)', () => {
  const out = execFileSync(process.execPath, [path.join(__dirname, '..', 'tools', 'collaudo-generatore.js'), '--profilo', JSON.stringify({ luogo: 'manubri', attrezziCasa: [], days: 3, goals: ['massa'], level: 'intermedio' }), '--solo', 'ATT-01'], { encoding: 'utf8', timeout: 60000 });
  assert.ok(/attrezziCasa/.test(out), 'il profilo compatto riporta gli attrezzi dichiarati: ' + out.slice(0, 300));
  assert.ok(!/ATT-01/.test(out.split('Fallimenti')[1] || ''), 'con «solo i manubri» il generatore non da esercizi da panca');
});
