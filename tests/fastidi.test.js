/* Fastidi: la modifica scritta (P4-F, W4-T1 snella; REC-04, SAF-02 con nota, DEC-03/04, BIO-06, PRG-24)
   Prove in node con l'app vera in vm (tests/aiuto-app.js, orologio fisso):
   1. SAF-02 con nota: con un fastidio dichiarato (spalle, ginocchia, schiena) la scheda ha UNA nota per zona che dice (a) cosa non c'e perche carica
      di piu la zona e (b) quali esercizi che la caricano restano, nominandoli tutti; la nota dice il vero per QUEL programma (sono gli esercizi della
      scheda finale, anche dopo il taglio per il tempo), e non fa promesse (niente guarigione, niente diagnosi, niente «e sicuro»);
   2. spalla dolente: niente panca col bilanciere a presa fissa (inclinata, declinata: la piana e con pausa c'erano gia), il petto resta coperto;
   3. ginocchia (cap. 17 n. 16 c): Squat su Scatola, Step-up Basso e Sit-to-Stand dalla Panca (stress 1, pensati per quel caso) non sono piu tolti per il nome;
   4. la frase di rinvio al medico (DEC-03/04): dolore forte o in crescita -> medico o fisioterapista, «Non sono un medico e non faccio diagnosi», nessuna promessa;
   5. ogni unita muscolare che la stessa persona allena senza il fastidio resta coperta con il fastidio (nessuna unita scoperta per il fastidio);
   6. regole bloccate (registro C.2): nessun loro testo nei file di P4-F.
   La regola e spegnibile (REC-04): spenta, tutto come prima (note generiche di SCALE_DOLORE, nessuna eccezione, nessuna esclusione in piu). */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path');
const { caricaApp } = require('./aiuto-app');

const R = path.join(__dirname, '..');
const ORA = '2026-10-05T12:00:00';
const BASE = { sonno: 'bene', attrezzi: 'indifferente', parq: 'no', usaProfilo: false, sex: 'M', age: 30 };
const ETICHETTA = { spalle: 'Spalle', ginocchia: 'Ginocchia', schiena: 'Schiena bassa' };
const pulito = n => String(n).replace(/^[^\p{L}]+/u, '').trim();
const IN_VM = (app, x) => app.g('JSON.parse(' + JSON.stringify(JSON.stringify(x)) + ')');

const app = caricaApp({ ora: ORA });
const costruisci = (p, a) => (a || app).dati((a || app).chiama('buildProgram', Object.assign({}, BASE, p)));
const eserciziDi = prog => [].concat.apply([], prog.sedute.map(sd => sd.esercizi.map(e => e.name)));
const stress = (nome, zona) => app.json('stressArticolare(' + JSON.stringify(nome) + ', ' + JSON.stringify(zona) + ')');

/* i profili: ogni zona (e due coppie) x livello x luogo x giorni x minuti x obiettivo */
function profili(zone, passo) {
  const out = [];
  let i = 0;
  zone.forEach(fastidi => ['principiante', 'intermedio', 'avanzato'].forEach(level => ['palestra', 'manubri', 'corpo'].forEach(luogo => [3, 4].forEach(days => [45, 75].forEach(minutes => [['massa'], ['forza'], ['salute']].forEach(goals => {
    i++;
    if (i % passo === 0) out.push({ level, luogo, days, minutes, goals, fastidi, seme: 'fastidi-' + i });
  }))))));
  return out;
}
const SINGOLE = [['spalle'], ['ginocchia'], ['schiena']];
const GRIGLIA = profili(SINGOLE.concat([['spalle', 'ginocchia'], ['schiena', 'ginocchia']]), 2);

/* le note di una zona: quelle che cominciano con la sua etichetta */
const noteDiZona = (prog, zona) => prog.note.filter(n => String(n).indexOf(ETICHETTA[zona] + ':') === 0);
const VECCHIE_NOTE = /^(Spalle: spinte con presa stretta|Ginocchia: prima delle gambe leg extension isometrica|Schiena bassa: riscaldamento McGill)/;

test('SAF-02 con nota: una nota per ogni zona dichiarata, ogni esercizio che la carica e nominato (e c e davvero nella scheda)', () => {
  let conCautela = 0, programmi = 0;
  GRIGLIA.forEach(p => {
    const prog = costruisci(p);
    programmi++;
    assert.ok(!prog.note.some(n => VECCHIE_NOTE.test(String(n))), 'le note generiche di SCALE_DOLORE non restano: ' + JSON.stringify(p));
    const nomi = eserciziDi(prog);
    p.fastidi.forEach(z => {
      const note = noteDiZona(prog, z);
      assert.strictEqual(note.length, 1, 'una nota per la zona ' + z + ' (' + JSON.stringify(p) + '): ' + JSON.stringify(note));
      const cautela = Array.from(new Set(nomi.filter(n => (stress(n, z) || 0) >= 1).map(pulito)));
      cautela.forEach(n => { conCautela++; assert.ok(note[0].indexOf(n) !== -1, n + ' carica ' + z + ' ed e in scheda: la nota deve nominarlo (' + note[0] + ')'); });
      /* verita: nessun esercizio della libreria che la nota nomina come «resta» manca dalla scheda */
      const libreria = app.json('EXERCISE_LIBRARY.map(e => e.name)').map(pulito);
      const resta = note[0].split('Restano')[1] || '';
      libreria.filter(n => resta.indexOf(n) !== -1).forEach(n => assert.ok(nomi.map(pulito).indexOf(n) !== -1, n + ' e nominato come presente ma la scheda non lo ha (' + JSON.stringify(p) + ')'));
    });
  });
  assert.ok(programmi > 400 && conCautela > 300, 'la griglia esercita il caso (' + programmi + ' programmi, ' + conCautela + ' esercizi con cautela)');
  assert.deepStrictEqual(app.errori, []);
});

test('SAF-02 con nota: la nota e vera, breve e senza promesse (niente guarigione, diagnosi, «e sicuro»), con il rinvio al medico', () => {
  GRIGLIA.filter((p, i) => i % 3 === 0).forEach(p => {
    const prog = costruisci(p);
    p.fastidi.forEach(z => {
      const nota = noteDiZona(prog, z)[0];
      assert.ok(nota && nota.length <= 420, 'breve (' + (nota || '').length + ' caratteri): ' + nota);
      assert.ok(/medico/.test(nota) && /fisioterapista/.test(nota), 'il rinvio al medico o al fisioterapista: ' + nota);
      const senzaFrase = nota.replace('Non sono un medico e non faccio diagnosi.', '');
      assert.ok(!/diagnos|guarig|guarir|\bcura\b|curare|sicur[oa]\b|garant|risolv|previen|elimin|rimedio|terapia/i.test(senzaFrase), 'nessuna promessa ne diagnosi: ' + nota);
      assert.ok(/[0-9]+\/10/.test(nota) && /fermati/.test(nota), 'la soglia del dolore e il fermarsi: ' + nota);
    });
  });
});

test('SAF-02 con nota: un programma costruito a mano, la nota dice solo cio che c e (niente «niente X» se X e in scheda)', () => {
  const prog = IN_VM(app, {
    prefs: { fastidi: ['spalle'] }, note: [],
    sedute: [{ tipo: 'upper', esercizi: [{ name: '💪 Military Press', sets: 3 }, { name: '🛡️ Landmine Press', sets: 2 }, { name: '💪 Panca Inclinata Manubri', sets: 3 }] }]
  });
  app.ctx.__p = prog;
  const d = app.dati(app.g('datiNotaFastidio(__p, "spalle")'));
  assert.ok(d && d.testo, 'datiNotaFastidio esiste e da il testo');
  assert.ok(d.tenuti.map(pulito).indexOf('Military Press') !== -1 && d.tenuti.map(pulito).indexOf('Landmine Press') !== -1, 'i due esercizi che caricano la spalla sono nominati');
  assert.ok(d.tenuti.map(pulito).indexOf('Panca Inclinata Manubri') === -1, 'quello che non la carica no');
  assert.ok(!/niente military press/i.test(d.testo), 'il military press e in scheda: la nota non dice che non c e: ' + d.testo);
  assert.ok(d.fuori.length >= 1, 'qualcosa che non c e lo dice ancora (dip, tirate al mento): ' + d.testo);
});

test('spalla dolente: niente panca col bilanciere (inclinata, declinata, piana, con pausa), il petto resta coperto', () => {
  const profiliSpalla = profili([['spalle'], ['spalle', 'schiena']], 1);
  let programmi = 0, conBilanciere = [];
  profiliSpalla.forEach(p => {
    const prog = costruisci(p);
    programmi++;
    eserciziDi(prog).map(pulito).forEach(n => { if (/^Panca (Inclinata Bilanciere|Declinata|Piana Bilanciere|con Pausa)$/.test(n)) conBilanciere.push(n + ' ' + JSON.stringify(p)); });
    app.ctx.__s = IN_VM(app, prog.sedute.map(sd => ({ esercizi: sd.esercizi.map(e => ({ name: e.name, sets: e.sets })) })));
    const v = app.json('contaVolume(__s)');
    assert.ok(v.petto.frazionarie >= 4, 'il petto resta coperto con la spalla dolente (' + v.petto.frazionarie + ' serie): ' + JSON.stringify(p));
  });
  assert.deepStrictEqual(conBilanciere, [], 'la panca col bilanciere non e per la spalla dolente');
  assert.ok(programmi >= 100);
  /* spenta la regola il bilanciere inclinato torna (come prima): la prova che e la regola e non il caso */
  assert.strictEqual(app.json('consentito("💪 Panca Inclinata Bilanciere", { luogo: "palestra", fastidi: ["spalle"] })'), false);
  const spenta = caricaApp({ ora: ORA });
  spenta.spegni(['REC-04']);
  assert.strictEqual(spenta.json('consentito("💪 Panca Inclinata Bilanciere", { luogo: "palestra", fastidi: ["spalle"] })'), true, 'REC-04 spenta: come prima');
  assert.strictEqual(app.json('consentito("💪 Panca Inclinata Bilanciere", { luogo: "palestra", fastidi: [] })'), true, 'senza il fastidio nessun cambiamento');
  assert.strictEqual(app.json('consentito("🛡️ Landmine Press", { luogo: "palestra", fastidi: ["spalle"] })'), true, 'la landmine (presa neutra, abilita 1) resta');
  assert.strictEqual(app.json('consentito("💪 Panca Inclinata Manubri", { luogo: "palestra", fastidi: ["spalle"] })'), true, 'i manubri restano');
});

test('ginocchia (cap. 17 n. 16 c): lo squat su scatola, lo step-up basso e il sit-to-stand non sono piu tolti per il nome; il resto dello squat si', () => {
  const cons = (nome, prefs) => app.json('consentito(' + JSON.stringify(nome) + ', ' + JSON.stringify(Object.assign({ luogo: 'palestra', fastidi: ['ginocchia'] }, prefs)) + ')');
  ['🦵 Squat su Scatola', '🦵 Step-up Basso', '🦵 Sit-to-Stand dalla Panca'].forEach(n => {
    const nome = app.json('nomeInLibreria(' + JSON.stringify(pulito(n)) + ')');
    assert.ok(nome, n + ' e in libreria');
    assert.strictEqual(stress(nome, 'ginocchia'), 1, n + ': cautela (stress 1), non divieto');
    ['palestra', 'manubri', 'corpo'].forEach(luogo => assert.strictEqual(app.json('consentito(' + JSON.stringify(nome) + ', { luogo: ' + JSON.stringify(luogo) + ', fastidi: ["ginocchia"], esclusi: [] })'), true, nome + ' con le ginocchia dolenti, ' + luogo));
  });
  /* il resto resta tolto: squat con carico, affondi, step-up su panca, hack */
  ['Squat con Bilanciere', 'Goblet Squat', 'Hack Squat', 'Affondi Bulgari', 'Affondi Manubri', 'Step-up su Panca', 'Front Squat'].forEach(pul => {
    const nome = app.json('nomeInLibreria(' + JSON.stringify(pul) + ')');
    assert.strictEqual(app.json('consentito(' + JSON.stringify(nome) + ', { luogo: "palestra", fastidi: ["ginocchia"], esclusi: [] })'), false, pul + ' resta tolto con le ginocchia dolenti');
  });
  /* senza il fastidio non cambia niente, e lo squat a corpo libero ha ancora la sua eccezione (B33) */
  assert.strictEqual(app.json('consentito(nomeInLibreria("Squat a Corpo Libero"), { luogo: "corpo", fastidi: ["ginocchia"] })'), true);
  /* spenta la regola: come prima */
  const spenta = caricaApp({ ora: ORA });
  spenta.spegni(['REC-04']);
  assert.strictEqual(spenta.json('consentito(nomeInLibreria("Squat su Scatola"), { luogo: "palestra", fastidi: ["ginocchia"], esclusi: [] })'), false, 'REC-04 spenta: lo squat su scatola e tolto per il nome come prima');
  /* chi inizia con le ginocchia dolenti a casa ha un esercizio per i quadricipiti con la sua nota */
  const prog = costruisci({ level: 'principiante', luogo: 'corpo', days: 3, minutes: 45, goals: ['salute'], fastidi: ['ginocchia'], seme: 'gi-1' });
  assert.ok(eserciziDi(prog).some(n => app.json('attributi(' + JSON.stringify(n) + ').muscoli.quadricipiti') >= 1), 'i quadricipiti restano coperti a casa');
});

test('rinvio al medico (DEC-03/04): dolore forte o in crescita -> medico o fisioterapista, nessuna diagnosi, nessuna promessa', () => {
  const fb = (livello, zona) => ({ srpe: 6, arrivo: 'normale', carichi: 'giusti', dolore: true, zone: [zona || 'spalla'], livello, coinvolti: [], esercizi: [] });
  const decidi = (f, prec) => {
    app.ctx.__fb = IN_VM(app, f); app.ctx.__prec = IN_VM(app, prec || []); app.ctx.__prefs = IN_VM(app, { luogo: 'palestra', fastidi: [] });
    return app.dati(app.g('decisioniCoach(__fb, __prec, __prefs)'));
  };
  const forte = decidi(fb(7)).filter(d => d.tipo === 'medico');
  assert.strictEqual(forte.length, 1);
  const cresce = decidi(fb(6, 'ginocchio'), [fb(5, 'ginocchio'), fb(4, 'ginocchio')]).filter(d => d.tipo === 'medico').map(d => d.testo);
  assert.ok(cresce.length >= 1, 'il dolore che cresce di seduta in seduta porta al medico');
  const testi = [forte[0].testo].concat(cresce);
  testi.forEach(t => {
    assert.ok(/medico/.test(t) && /fisioterapista/.test(t), 'rinvio a un medico o a un fisioterapista: ' + t);
    assert.ok(/Non sono un medico e non faccio diagnosi\./.test(t), 'dichiara di non fare diagnosi: ' + t);
    const senza = t.replace('Non sono un medico e non faccio diagnosi.', '');
    assert.ok(!/diagnos|guarig|guarir|\bcura\b|sicur[oa]\b|garant|passa in pochi giorni|risolv/i.test(senza), 'niente promesse ne diagnosi: ' + t);
  });
  assert.ok(/non passa o peggiora|persiste|peggiora/.test(forte[0].testo), 'il dolore che persiste o peggiora: ' + forte[0].testo);
  assert.deepStrictEqual(app.errori, []);
});

test('nessuna unita scoperta per il fastidio: cio che la stessa persona allena senza il fastidio (>= 4 serie frazionarie) con il fastidio ne ha almeno 2', () => {
  const GRANDI = ['petto', 'dorsali', 'quadricipiti', 'femorali', 'grande_gluteo', 'bicipiti', 'tricipiti', 'deltoide_laterale', 'deltoide_posteriore', 'schiena_spessore'];
  const vol = prog => { app.ctx.__s = IN_VM(app, prog.sedute.map(sd => ({ esercizi: sd.esercizi.map(e => ({ name: e.name, sets: e.sets })) }))); return app.json('contaVolume(__s)'); };
  let confronti = 0;
  const scoperte = [];
  profili(SINGOLE, 3).forEach(p => {
    const v0 = vol(costruisci(Object.assign({}, p, { fastidi: [] }))), v = vol(costruisci(p));
    GRANDI.forEach(u => { confronti++; if (v0[u].frazionarie >= 4 && v[u].frazionarie < 2) scoperte.push(p.fastidi[0] + ':' + u + ' ' + JSON.stringify(p)); });
  });
  assert.ok(confronti > 1000);
  assert.deepStrictEqual(scoperte, [], 'unita scoperte per il fastidio');
});

test('regole bloccate (registro C.2): nessun loro testo nei file e nelle frasi di P4-F', () => {
  const BLOCCATE = /DON-13|ETA-0[78]|ETA-1[1237]|MAV-14|TAP-01|OBI-17|menopaus|osteopor|pressione alta|ipertension|pronto soccorso|rabdomiol|urine|dolori da crescita|crescita ossea|cadut[ae]\b|capogiri|farmac/i;
  const file = ['js/coach/sicurezza/fastidi.js', 'js/coach/sicurezza/soglie-fastidi.js', 'docs/in-arrivo/P4-F.json'].filter(f => fs.existsSync(path.join(R, f)));
  assert.ok(file.length >= 3, 'i file di P4-F ci sono: ' + file);
  file.forEach(f => {
    const t = fs.readFileSync(path.join(R, f), 'utf8');
    const m = BLOCCATE.exec(t);
    assert.ok(!m, f + ' contiene un testo di una regola bloccata: ' + (m && m[0]));
  });
  /* e il codice che prima non c era non le rende attive */
  ['DON-13', 'ETA-07', 'ETA-11', 'ETA-12', 'ETA-13', 'ETA-17', 'MAV-14', 'TAP-01', 'OBI-17'].forEach(c => assert.strictEqual(app.json('regolaAttiva(' + JSON.stringify(c) + ')'), false, c + ' resta spenta'));
});
