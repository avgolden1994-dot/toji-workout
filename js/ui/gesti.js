/* Swipe, rotella dei numeri e trascinamento
   (3in, parte di ui; ordine di caricamento: vedi index.html) */

/* ============================================================
   SWIPE, ANNULLA, RIPOSO, SETTIMANE
   ============================================================ */

/* Swipe con pointer events: funziona con dito e mouse, e non entra in
   conflitto con lo scroll verticale (touch-action: pan-y sull'elemento).
   NOTA UX: la ricerca (NN/g) avverte che gli utenti si aspettano lo swipe
   per azioni DISTRUTTIVE; lo swipe-per-aggiungere e' meno convenzionale.
   Per questo i pulsanti visibili + e x restano sempre al loro posto. */
function attachSwipe(host, opts) {
  const fg = host.querySelector('.swipe-fg');
  if (!fg) return;
  let startX = 0, startY = 0, dx = 0, dragging = false, decided = false;
  const THRESHOLD = 70;

  const down = (e) => {
    dragging = true; decided = false; dx = 0;
    startX = e.clientX; startY = e.clientY;
    fg.style.transition = 'none';
  };
  const move = (e) => {
    if (!dragging) return;
    const mx = e.clientX - startX;
    const my = e.clientY - startY;
    if (!decided) {
      if (Math.abs(my) > Math.abs(mx)) { dragging = false; return; } /* sta scorrendo la pagina */
      if (Math.abs(mx) < 6) return;
      decided = true;
    }
    dx = mx;
    if (dx < 0 && !opts.onLeft) dx = 0;
    if (dx > 0 && !opts.onRight) dx = 0;
    host.classList.toggle('to-left', dx < 0);
    host.classList.toggle('to-right', dx > 0);
    fg.style.transform = 'translateX(' + dx + 'px)';
  };
  const up = () => {
    if (!dragging) return;
    dragging = false;
    fg.style.transition = '';
    const fired = dx;
    fg.style.transform = '';
    host.classList.remove('to-left', 'to-right');
    if (fired <= -THRESHOLD && opts.onLeft) opts.onLeft();
    else if (fired >= THRESHOLD && opts.onRight) opts.onRight();
    dx = 0;
  };

  fg.addEventListener('pointerdown', down);
  fg.addEventListener('pointermove', move);
  fg.addEventListener('pointerup', up);
  fg.addEventListener('pointercancel', up);
  fg.addEventListener('pointerleave', up);
}

/* ---------- Rotella dei numeri ---------- */
let wheelTarget = null;

window.openWheel = function(inputEl, min, max, titolo, onChange) {
  wheelTarget = { input: inputEl, onChange: onChange };
  const cur = parseInt(inputEl.value, 10) || min;
  document.getElementById('wheel-title').innerText = titolo || 'Scegli il numero';
  document.getElementById('wheel-mask').innerText = 'da ' + min + ' a ' + max + ' \u2022 scorri di lato o tocca';

  const track = document.getElementById('wheel-track');
  let html = '';
  for (let v = min; v <= max; v++) {
    html += '<button class="wheel-num ' + (v === cur ? 'on' : '') + '" data-v="' + v + '" onclick="pickWheel(' + v + ')">' + v + '</button>';
  }
  track.innerHTML = html;
  document.getElementById('wheel-overlay').classList.remove('hidden');

  /* porta il valore attuale al centro senza animazione, cosi si parte da li */
  setTimeout(() => {
    const el = track.querySelector('.wheel-num.on');
    if (el && el.scrollIntoView) { try { el.scrollIntoView({ inline: 'center', block: 'nearest' }); } catch (e) {} }
  }, 0);
};

window.pickWheel = function(v) {
  if (!wheelTarget) return;
  wheelTarget.input.value = v;
  if (wheelTarget.onChange) wheelTarget.onChange(v);
  document.querySelectorAll('.wheel-num').forEach(b => b.classList.toggle('on', Number(b.dataset.v) === v));
  closeWheel();
};

window.closeWheel = function() {
  const ov = document.getElementById('wheel-overlay');
  ov.classList.add('closing');
  setTimeout(() => { ov.classList.remove('closing', 'hidden'); ov.classList.add('hidden'); wheelTarget = null; }, 160);
};

/* Numero regolabile scorrendo: si tiene premuto e si trascina in alto o in
   basso. Resta anche scrivibile da tastiera, per chi preferisce digitare. */
/* Ripetizioni: si scrivono con la tastiera oppure si scelgono con la ruota
   (dal 6 al 20). Lo scorrimento verso l alto o il basso e stato tolto:
   si attivava per sbaglio mentre si scorreva la pagina. */
function attachRepsField(input, min, max, onChange) {
  const clamp = () => {
    const val = Math.max(min, Math.min(max, parseInt(input.value, 10) || min));
    input.value = val;
    if (onChange) onChange(val);
  };
  input.addEventListener('change', clamp);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { clamp(); input.blur(); } });
  const btn = input.nextElementSibling;
  if (btn && btn.classList.contains('wheel-btn')) {
    btn.addEventListener('click', () => openWheel(input, min, max, input.dataset.wheelTitle || 'Ripetizioni', onChange));
  }
}

function attachNumberDrag(input, min, max, onChange) {
  let startY = 0, startVal = 0, dragging = false, moved = false;
  const STEP_PX = 9; /* pixel per unita */

  input.addEventListener('pointerdown', (e) => {
    dragging = true; moved = false;
    startY = e.clientY;
    startVal = parseInt(input.value, 10) || min;
    input.classList.add('dragging');
    try { input.setPointerCapture(e.pointerId); } catch (err) {}
  });

  input.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dy = startY - e.clientY;          /* su = +, giu = - */
    if (Math.abs(dy) > 3) moved = true;
    const val = Math.max(min, Math.min(max, startVal + Math.round(dy / STEP_PX)));
    if (String(val) !== input.value) {
      input.value = val;
      if (onChange) onChange(val);
    }
    e.preventDefault();
  });

  const end = (e) => {
    if (!dragging) return;
    dragging = false;
    input.classList.remove('dragging');
    try { input.releasePointerCapture(e.pointerId); } catch (err) {}
    /* tocco secco: apre la rotella. Trascinando invece si regola al volo:
       due modi per lo stesso campo, uno preciso e uno veloce. */
    if (!moved) openWheel(input, min, max, input.dataset.wheelTitle || 'Ripetizioni', onChange);
  };
  input.addEventListener('pointerup', end);
  input.addEventListener('pointercancel', end);

  /* la digitazione resta valida, ma dentro i limiti */
  input.addEventListener('change', () => {
    const val = Math.max(min, Math.min(max, parseInt(input.value, 10) || min));
    input.value = val;
    if (onChange) onChange(val);
  });
}
