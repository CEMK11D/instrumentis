/* =========================================
   1. CORTINĂ DE ÎNCEPUT
   ========================================= */
window.addEventListener('load', () => {
  setTimeout(() => {
    const intro = document.getElementById('introScreen');
    if (intro) intro.classList.add('hide');
  }, 3050);
});

/* =========================================
   2. NINSOARE & LUMINI BOKEH PE FUNDAL
   ========================================= */
const canvas = document.getElementById('snowCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Fulgi fini
  const flakes = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.2 + 0.8,
    speedY: Math.random() * 0.8 + 0.25,
    speedX: Math.random() * 0.4 - 0.2,
    gold: Math.random() > 0.7
  }));

  // Globuri difuze de lumină (Bokeh)
  const bokeh = Array.from({ length: 12 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 35 + 18,
    speedY: Math.random() * 0.25 + 0.1,
    isRed: Math.random() > 0.5
  }));

  function renderAtmosphere() {
    ctx.clearRect(0, 0, width, height);

    // Desenează luminile Bokeh
    bokeh.forEach(b => {
      const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
      grad.addColorStop(0, b.isRed ? 'rgba(158, 27, 36, 0.08)' : 'rgba(216, 180, 90, 0.07)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      b.y -= b.speedY;
      if (b.y < -b.r) { b.y = height + b.r; b.x = Math.random() * width; }
    });

    // Desenează fulgii
    flakes.forEach(f => {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = f.gold ? 'rgba(246, 224, 158, 0.6)' : 'rgba(255, 255, 255, 0.4)';
      ctx.fill();

      f.y += f.speedY;
      f.x += f.speedX;

      if (f.y > height) { f.y = -5; f.x = Math.random() * width; }
      if (f.x > width) f.x = 0;
      if (f.x < 0) f.x = width;
    });

    requestAnimationFrame(renderAtmosphere);
  }
  renderAtmosphere();
}

/* =========================================
   3. COUNTDOWN CRĂCIUN
   ========================================= */
function updateCountdown() {
  const now = new Date();
  let christmas = new Date(now.getFullYear(), 11, 25);
  if (now > christmas) christmas = new Date(now.getFullYear() + 1, 11, 25);

  const diff = christmas - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / 1000 / 60) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = String(d).padStart(2, '0');
  document.getElementById('hours').textContent = String(h).padStart(2, '0');
  document.getElementById('minutes').textContent = String(m).padStart(2, '0');
  document.getElementById('seconds').textContent = String(s).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

/* =========================================
   4. COPIERE COD PROMOȚIONAL
   ========================================= */
const copyBtn = document.getElementById('copyCodeBtn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const code = document.getElementById('promoCode').textContent;
    navigator.clipboard.writeText(code);
    const badge = document.getElementById('copyStatus');
    badge.textContent = 'COPIAT ✓';
    setTimeout(() => badge.textContent = 'COPIAZĂ', 2000);
  });
}

/* =========================================
   5. MODAL REZERVARE
   ========================================= */
const offerModal = document.getElementById('offerModal');
const selectedOfferName = document.getElementById('selectedOfferName');
const closeModalBtn = document.getElementById('closeModalBtn');
const offerForm = document.getElementById('offerForm');

document.querySelectorAll('[data-offer]').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedOfferName.textContent = btn.dataset.offer;
    offerModal.classList.add('open');
  });
});

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    offerModal.classList.remove('open');
  });
}

if (offerForm) {
  offerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✦ Mulțumim! Cererea ta pentru oferta de Crăciun InstruMentis a fost înregistrată (simulare educațională).');
    offerModal.classList.remove('open');
    offerForm.reset();
  });
}