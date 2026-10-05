/* La finestra del cedimento compare solo con la fiamma, sparisce da sola e non blocca l audio delle altre app.
   Browser vero (Playwright), con finti AudioContext / play() / audioSession / vibrate che contano le chiamate
   e l orologio di Playwright per far passare i 90 secondi. Lancio: npm test */
const test = require('node:test'), assert = require('node:assert');
const fs = require('fs'), path = require('path'), http = require('http');
let chromium; try { ({ chromium } = require('playwright-core')); } catch (e) {}
const exe = process.env.CHROMIUM || ['/opt/pw-browsers/chromium'].find(p => fs.existsSync(p));
const skip = !chromium || !exe ? 'browser non disponibile' : false;
const R = path.join(__dirname, '..');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };

let server, base, browser;
test.before(async () => {
  if (skip) return;
  /* piccolo server locale: serve per far funzionare il lettore YouTube finto (su file:// l app lo rifiuta) */
  server = http.createServer((req, res) => {
    const f = path.join(R, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
    if (!f.startsWith(R) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  base = 'http://127.0.0.1:' + server.address().port + '/index.html';
  browser = await chromium.launch({ executablePath: exe });
});
test.after(async () => {
  if (browser) await browser.close();
  if (server) server.close();
});

/* i finti: contano tutto cio che puo prendere l audio del telefono */
function stub() {
  const T = window.__t = { ctx: [], osc: 0, play: [], pause: [], load: [], sess: [], vib: [], yt: [] };
  const AC = window.AudioContext;
  if (AC) {
    const co = AC.prototype.createOscillator;
    AC.prototype.createOscillator = function() { T.osc++; return co.apply(this, arguments); };
    window.AudioContext = class extends AC { constructor() { super(...arguments); T.ctx.push(this); } };
  }
  const nome = el => el.id || (el.loop ? 'keeper' : el.tagName.toLowerCase());
  HTMLMediaElement.prototype.play = function() { T.play.push(nome(this)); return Promise.resolve(); };
  HTMLMediaElement.prototype.pause = function() { T.pause.push(nome(this)); };
  HTMLMediaElement.prototype.load = function() { T.load.push(nome(this)); };
  let tipo = 'auto';
  Object.defineProperty(navigator, 'audioSession', { configurable: true, value: { get type() { return tipo; }, set type(v) { T.sess.push(v); tipo = v; } } });
  Object.defineProperty(navigator, 'vibrate', { configurable: true, value: p => { T.vib.push(p); return true; } });
  /* YouTube finto: l API si "carica" subito e il lettore e pronto dopo un attimo */
  window.YT = { Player: class {
    constructor(id, o) {
      this.o = o; T.yt.push({ ev: 'new', start: o.playerVars && o.playerVars.start });
      setTimeout(() => o.events.onReady(), 20);
    }
    playVideo() { T.yt.push({ ev: 'play' }); } pauseVideo() { T.yt.push({ ev: 'pause' }); }
    stopVideo() { T.yt.push({ ev: 'stop' }); } destroy() { T.yt.push({ ev: 'destroy' }); }
    seekTo(s) { T.yt.push({ ev: 'seek', s }); } setVolume() {} getDuration() { return 240; }
    getCurrentTime() { return 0; } getPlayerState() { return 1; }
  } };
}

async function apri({ musica, bypass } = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, locale: 'it-IT', serviceWorkers: 'block' });
  const p = await ctx.newPage();
  const errori = [];
  p.on('pageerror', e => errori.push(e.message));
  p.on('dialog', d => d.accept());
  await p.addInitScript(stub);
  await p.addInitScript(([m, b]) => {
    if (!localStorage.getItem('tz_mode')) { localStorage.setItem('tz_mode', 'toji'); localStorage.setItem('tz_consenso', 'no'); localStorage.setItem('tz_onb', '1'); localStorage.setItem('tz_guida_vista', '1'); }
    if (m) localStorage.setItem('tz_cedimento_audio', JSON.stringify(m));
    if (b) localStorage.setItem('tz_bypass_silent', '1');
  }, [musica || null, !!bypass]);
  await p.clock.install({ time: new Date('2026-03-04T10:00:00') });
  await p.goto(base);
  await p.waitForFunction(() => typeof openWorkoutDay === 'function' && typeof loadData === 'function');
  await p.clock.runFor(1500);
  p.errori = errori;
  return p;
}
const T = p => p.evaluate(() => JSON.parse(JSON.stringify(Object.assign({}, window.__t, { ctx: window.__t.ctx.map(c => c.state) }))));

async function preparaSeduta(p) {
  const g = await p.evaluate(() => {
    const d = loadData(), g = DAYS[(new Date().getDay() + 6) % 7];
    d[g] = [['💪 Panca Piana Bilanciere', 3, 10, 60, 90], ['🏹 Lat Machine', 3, 10, 50, 90]]
      .map(([name, sets, reps, weight, rest]) => normalizeExerciseRecord({ name, sets, reps, weight, rest }));
    saveData(d); const t = loadTitles(); t[g] = 'Upper'; saveTitles(t); saveRestDays(DAYS.filter(x => x !== g));
    return g;
  });
  await p.evaluate(g => { switchTab('allenamento'); openWorkoutDay(g); }, g);
  await p.clock.runFor(300);
  return g;
}
const fiamma = p => p.locator('.set-flame-btn[aria-label^="Porta la serie"]').first();
const visibile = p => p.evaluate(() => !document.getElementById('cedimento-sheet').classList.contains('hidden'));
const stato = p => p.evaluate(() => ({
  intervallo: dropInterval, armed: armedSet, attivo: dropActive, audioAttivo: dropAudioAttivo, chiusura: dropChiudiTimer,
  fire: document.body.classList.contains('fire-mode'), dock: document.getElementById('music-dock').className,
  timer: document.getElementById('drop-timer-display').innerText, testo: document.getElementById('drop-status').innerText,
  finito: document.getElementById('cedimento-sheet').classList.contains('finito')
}));
const tipi = t => [...new Set(t.sess)];

test('dopo il caricamento e dopo tocchi a caso: nessun contesto audio, nessun play, sessione audio che non disturba', { skip }, async () => {
  const p = await apri();
  await p.mouse.click(10, 10); await p.mouse.click(380, 400); await p.mouse.click(200, 5);
  await p.evaluate(() => { ['pointerdown', 'touchstart', 'pointerup', 'click'].forEach(e => document.dispatchEvent(new Event(e))); });
  await p.clock.runFor(5000);
  const t = await T(p);
  assert.strictEqual(t.ctx.length, 0, 'nessun AudioContext');
  assert.deepStrictEqual(t.play, [], 'nessun play()');
  assert.ok(t.sess.length > 0 && t.sess.every(x => x === 'ambient'), 'sessione audio solo ambient: ' + t.sess);
  assert.deepStrictEqual(p.errori, []);
  await p.context().close();
});

test('aprendo la seduta la finestra resta nascosta, il lettore non e in sessione e non parte niente', { skip }, async () => {
  const p = await apri({ musica: { tab: 'web', url: 'https://youtu.be/abcdefghijk', webOk: true, webStart: 30, volume: 80 } });
  await preparaSeduta(p);
  assert.strictEqual(await visibile(p), false, 'finestra nascosta');
  assert.strictEqual(await p.locator('#start-drop-btn').count(), 0, 'niente pulsante Inizia Cedimento');
  const s = await stato(p);
  assert.ok(/nascosto/.test(s.dock) && !/sessione/.test(s.dock), 'dock non in sessione: ' + s.dock);
  assert.strictEqual(await p.locator('#youtube-player-host iframe, #youtube-player-host *').count(), 0, 'lettore web non caricato');
  const t = await T(p);
  assert.deepStrictEqual(t.yt, [], 'nessun lettore YouTube creato');
  assert.strictEqual(t.ctx.length, 0); assert.deepStrictEqual(t.play, []);
  assert.deepStrictEqual(tipi(t), ['ambient']);
  assert.strictEqual(await fiamma(p).count() > 0, true, 'la fiamma c e: ' + await p.evaluate(() => [document.getElementById('workout-session').style.display, document.querySelectorAll('.set-flame-btn').length, [...document.querySelectorAll('.set-flame-btn')].map(b => b.getAttribute('aria-label')).join('|')].join(' / ')));
  await p.context().close();
});

test('senza canzone: la fiamma apre la finestra e parte il timer; niente audio toccato; a 90 s niente bip, vibra e si chiude da sola', { skip }, async () => {
  const p = await apri();
  await preparaSeduta(p);
  const prima = await T(p);
  await fiamma(p).click();
  assert.strictEqual(await visibile(p), true, 'finestra aperta subito');
  let s = await stato(p);
  assert.ok(s.intervallo !== null && s.attivo && s.armed, 'timer partito e serie armata');
  assert.strictEqual(s.timer, '01:30');
  assert.match(s.testo, /Cedimento in corso/);
  await p.clock.runFor(10000);
  assert.strictEqual((await stato(p)).timer, '01:20');
  let t = await T(p);
  assert.deepStrictEqual(t.play, [], 'nessun media suonato');
  assert.strictEqual(t.ctx.length, 0, 'nessun AudioContext');
  assert.deepStrictEqual(t.sess, prima.sess, 'la sessione audio non e stata toccata');
  assert.strictEqual(t.yt.length, 0);
  assert.strictEqual(await p.evaluate(() => loadData()[currentDay][0].completedSets[0].wasBerserk), true);

  await p.clock.runFor(80500);
  s = await stato(p);
  assert.match(s.testo, /Cedimento raggiunto/);
  assert.ok(s.finito, 'animazione di fine');
  assert.strictEqual(s.intervallo, null, 'timer fermato');
  assert.strictEqual(await visibile(p), true, 'ancora visibile durante l animazione');
  t = await T(p);
  assert.strictEqual(t.vib.length, 1); assert.deepStrictEqual(t.vib[0], [200, 100, 200]);
  assert.strictEqual(t.osc, 0, 'nessun bip');
  assert.strictEqual(t.ctx.length, 0);

  await p.clock.runFor(1700);
  assert.strictEqual(await visibile(p), false, 'la finestra si chiude da sola');
  s = await stato(p);
  assert.strictEqual(s.intervallo, null); assert.strictEqual(s.chiusura, null);
  assert.strictEqual(s.armed, null); assert.strictEqual(s.attivo, false); assert.strictEqual(s.fire, false);
  assert.ok(/nascosto/.test(s.dock));
  t = await T(p);
  assert.deepStrictEqual(t.play, []); assert.deepStrictEqual(t.sess, prima.sess);
  await p.clock.runFor(60000);   /* nessun timer rimasto vivo */
  assert.strictEqual((await T(p)).vib.length, 1);
  assert.strictEqual(await visibile(p), false);
  assert.deepStrictEqual(p.errori, []);
  await p.context().close();
});

test('un secondo tocco sulla fiamma durante il cedimento non lo riavvia', { skip }, async () => {
  const p = await apri();
  await preparaSeduta(p);
  await fiamma(p).click();
  await p.clock.runFor(20000);
  await p.evaluate(() => apriCedimento(0, 1));
  assert.strictEqual((await stato(p)).timer, '01:10');
  await p.context().close();
});

test('con il contesto dei bip gia creato dal recupero: a fine cedimento nessun bip e il contesto non resta acceso', { skip }, async () => {
  const p = await apri();
  await preparaSeduta(p);
  await p.locator('.set-check').first().click();   /* il tocco che avvia il recupero sblocca il contesto */
  await p.clock.runFor(500);
  await p.waitForTimeout(300);
  let t = await T(p);
  assert.strictEqual(t.ctx.length, 1, 'contesto creato nel tocco del recupero');
  assert.strictEqual(t.osc, 0);
  await p.evaluate(() => closeRecoveryPanel());
  await fiamma(p).click();
  await p.clock.runFor(92500);
  await p.waitForTimeout(400);
  t = await T(p);
  assert.strictEqual(t.osc, 0, 'nessun bip del cedimento');
  assert.ok(t.ctx.every(s => s !== 'running'), 'contesto non acceso: ' + t.ctx);
  await p.context().close();
});

test('i bip del recupero non usano playback e non lasciano il contesto acceso', { skip }, async () => {
  const p = await apri({ bypass: true });
  await preparaSeduta(p);
  await p.locator('.set-check').first().click();
  await p.clock.runFor(91000);
  await p.waitForTimeout(200);
  let t = await T(p);
  assert.ok(t.osc > 0, 'i bip del recupero suonano');
  assert.strictEqual(t.ctx.length, 1);
  assert.deepStrictEqual(tipi(t), ['ambient'], 'solo ambient, anche con "Suona anche in silenzioso": ' + t.sess);
  assert.deepStrictEqual(t.play, [], 'nessuna traccia silenziosa');
  await p.clock.runFor(3000);
  await p.waitForTimeout(400);
  t = await T(p);
  assert.ok(t.ctx.every(s => s === 'suspended'), 'sospeso dopo l ultimo bip: ' + t.ctx);
  await p.context().close();
});

test('Stop a meta: stessa pulizia della fine, senza vibrazione', { skip }, async () => {
  const p = await apri();
  await preparaSeduta(p);
  await fiamma(p).click();
  await p.clock.runFor(35000);
  await p.locator('#drop-stop-btn').click();
  assert.strictEqual(await visibile(p), false);
  const s = await stato(p);
  assert.strictEqual(s.intervallo, null); assert.strictEqual(s.armed, null); assert.strictEqual(s.attivo, false);
  assert.strictEqual(s.fire, false); assert.ok(/nascosto/.test(s.dock)); assert.strictEqual(s.testo, '');
  await p.clock.runFor(100000);
  const t = await T(p);
  assert.strictEqual(t.vib.length, 0); assert.strictEqual(await visibile(p), false);
  assert.strictEqual(t.ctx.length, 0);
  await p.context().close();
});

test('uscendo dalla seduta il cedimento si chiude e si pulisce', { skip }, async () => {
  const p = await apri();
  await preparaSeduta(p);
  await fiamma(p).click();
  await p.clock.runFor(10000);
  await p.evaluate(() => backToDayPicker());
  assert.strictEqual(await visibile(p), false);
  const s = await stato(p);
  assert.strictEqual(s.intervallo, null); assert.strictEqual(s.armed, null); assert.strictEqual(s.fire, false);
  await p.context().close();
});

test('fire-mode con volume 100: acceso durante il cedimento, spento alla fine', { skip }, async () => {
  const p = await apri();
  await preparaSeduta(p);
  await p.evaluate(() => { document.getElementById('drop-volume').value = 100; });
  await fiamma(p).click();
  await p.clock.runFor(1000);
  assert.strictEqual((await stato(p)).fire, true);
  await p.clock.runFor(90000);
  assert.strictEqual((await stato(p)).fire, false);
  await p.context().close();
});

test('con una canzone locale: suona nel tocco, e a fine cedimento tutto e rilasciato', { skip }, async () => {
  const p = await apri();
  await preparaSeduta(p);
  await p.evaluate(() => {
    failureTracks = [{ id: 1, name: 'prova.mp3', type: 'audio/mpeg', blob: new Blob([new Uint8Array(64)], { type: 'audio/mpeg' }), duration: 200 }];
    activeSourceTab = 'mp3'; selectTrack(1);
  });
  const prima = await T(p);
  assert.deepStrictEqual(prima.play, []);
  await fiamma(p).click();
  let t = await T(p);
  assert.deepStrictEqual(t.play, ['failure-audio'], 'l MP3 parte subito nel tocco');
  assert.ok(t.sess.includes('transient-solo'), 'sessione della canzone: ' + t.sess);
  assert.ok(await p.evaluate(() => !!document.getElementById('failure-audio').getAttribute('src')));
  await p.clock.runFor(92500);
  t = await T(p);
  assert.ok(t.pause.includes('failure-audio'), 'MP3 in pausa');
  assert.strictEqual(await p.evaluate(() => document.getElementById('failure-audio').getAttribute('src')), null, 'sorgente scaricata');
  assert.ok(t.load.includes('failure-audio'));
  assert.strictEqual(t.sess[t.sess.length - 1], 'ambient');
  assert.strictEqual(t.osc, 0);
  assert.strictEqual(await visibile(p), false);
  assert.strictEqual((await stato(p)).audioAttivo, false);
  /* la schermata della canzone ritrova la sorgente per l ascolto di prova */
  await p.evaluate(() => openMusicSheet());
  assert.ok(await p.evaluate(() => !!document.getElementById('failure-audio').getAttribute('src')));
  await p.context().close();
});

test('canzone locale con "Suona anche in silenzioso": la traccia silenziosa vive solo nei 90 secondi', { skip }, async () => {
  const p = await apri({ bypass: true });
  await preparaSeduta(p);
  /* niente tocco, niente traccia: nemmeno dopo tocchi a caso */
  await p.mouse.click(10, 10);
  assert.deepStrictEqual((await T(p)).play, []);
  assert.strictEqual(await p.locator('audio[loop]').count(), 0);
  await p.evaluate(() => {
    failureTracks = [{ id: 1, name: 'prova.mp3', type: 'audio/mpeg', blob: new Blob([new Uint8Array(64)], { type: 'audio/mpeg' }), duration: 200 }];
    activeSourceTab = 'mp3'; selectTrack(1);
  });
  await fiamma(p).click();
  let t = await T(p);
  assert.ok(t.play.includes('keeper') && t.play.includes('failure-audio'), 'traccia silenziosa e canzone: ' + t.play);
  assert.strictEqual(t.sess[t.sess.length - 1], 'playback');
  assert.strictEqual(await p.locator('audio[loop]').count(), 1);
  await p.clock.runFor(92500);
  t = await T(p);
  assert.strictEqual(await p.locator('audio[loop]').count(), 0, 'traccia silenziosa rimossa');
  assert.ok(t.pause.includes('keeper'));
  assert.strictEqual(t.sess[t.sess.length - 1], 'ambient');
  assert.strictEqual(await p.evaluate(() => mediaKeeper), null);
  await p.context().close();
});

test('senza canzone e con "Suona anche in silenzioso": niente traccia silenziosa, audio altrui intatto', { skip }, async () => {
  const p = await apri({ bypass: true });
  await preparaSeduta(p);
  const prima = await T(p);
  await fiamma(p).click();
  await p.clock.runFor(95000);
  const t = await T(p);
  assert.deepStrictEqual(t.play, []); assert.deepStrictEqual(t.sess, prima.sess);
  assert.strictEqual(await p.locator('audio[loop]').count(), 0);
  await p.context().close();
});

test('con un link YouTube: il lettore nasce nel tocco sulla fiamma, parte dal punto scelto e a fine cedimento e fermato e rimosso', { skip }, async () => {
  const p = await apri({ musica: { tab: 'web', url: 'https://youtu.be/abcdefghijk', webOk: true, webStart: 45, volume: 80 } });
  await preparaSeduta(p);
  assert.deepStrictEqual((await T(p)).yt, []);
  await fiamma(p).click();
  await p.clock.runFor(500);
  let t = await T(p);
  assert.strictEqual(t.yt[0].ev, 'new'); assert.strictEqual(t.yt[0].start, 45);
  assert.ok(t.yt.some(e => e.ev === 'play'), 'play appena il lettore e pronto');
  assert.ok(/sessione/.test((await stato(p)).dock), 'lettore nella finestra');
  assert.ok(t.sess.includes('transient-solo'));
  await p.clock.runFor(92000);
  t = await T(p);
  const ev = t.yt.map(e => e.ev);
  assert.ok(ev.includes('stop') && ev.includes('destroy'), 'fermato e distrutto: ' + ev);
  assert.strictEqual(await p.locator('#youtube-player-host').evaluate(e => e.innerHTML), '');
  assert.strictEqual(await p.evaluate(() => [ytPlayer, ytPlayerReady]).then(a => a.join()), ',false');
  assert.strictEqual(t.sess[t.sess.length - 1], 'ambient');
  assert.ok(/nascosto/.test((await stato(p)).dock));
  assert.strictEqual(await visibile(p), false);
  /* il link resta salvato per il prossimo cedimento */
  assert.strictEqual(await p.evaluate(() => leggiMusica().url), 'https://youtu.be/abcdefghijk');
  assert.deepStrictEqual(p.errori, []);
  await p.context().close();
});
