/* INT-2e, FRZ-01 come criterio permanente del collaudo: la matrice «forza» (1.6: profili di forza con il powerlifting scelto, adulti, palestra, nessun fastidio) lanciata sul generatore VERO:
   nessun errore del generatore e nessun programma in cui lo squat e la panca non sono in almeno due sedute e lo stacco in una (FRZ-01). E la misura strutturale indipendente di W2-T7: il collaudo conta le alzate dai nomi, non
   dalle etichette del programma. Un sesto della matrice (240 profili circa, una decina di secondi); la matrice intera (1.440, un minuto e mezzo) si lancia con `npm run collaudo:schede -- --matrice forza`.
   Su coach-v2-onda-2d (forza generale: il campo non si legge) FRZ-01 scatta in 757 programmi su 1.440 (55% pesata): la prova non puo passare senza la struttura Forza attivata dalla domanda «Che forza?» (FRZ-01). */
'use strict';
const test = require('node:test'), assert = require('node:assert');
const { execFileSync } = require('child_process');
const fs = require('fs'), os = require('os'), path = require('path');

test('FRZ-01: sulla matrice «forza» (un sesto) nessun errore e nessun programma da powerlifting senza le frequenze delle tre alzate', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'collaudo-forza-'));
  try {
    execFileSync(process.execPath, [path.join(__dirname, '..', 'tools', 'collaudo-generatore.js'), '--matrice', 'forza-rapida', '--solo', 'FRZ-01,ERR-01,SAN-01', '--out', dir, '--etichetta', 'forza', '--quiet'], { stdio: 'pipe', timeout: 120000 });
    const j = JSON.parse(fs.readFileSync(path.join(dir, 'collaudo-generatore-forza.json'), 'utf8'));
    assert.strictEqual(j.riepilogo.matrice, 'forza-rapida');
    assert.ok(j.riepilogo.profili >= 200 && j.riepilogo.profili <= 280, 'profili: ' + j.riepilogo.profili);
    assert.strictEqual(j.riepilogo.errori, 0, 'il generatore non lancia errori');
    assert.deepStrictEqual(Object.keys(j.riepilogo.classi).filter(k => /^(FRZ-01|ERR-01|SAN-01)/.test(k)), [], 'nessuna classe di FRZ-01, ERR-01 o SAN-01: ' + JSON.stringify(j.riepilogo.classi));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
