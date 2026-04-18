/* =============================================
   SHASHANK KUMAR — CINEMATOGRAPHER
   script.js
   ============================================= */

/* ── CURSOR ───────────────────────────── */
const cursor = document.getElementById('cursor');
let mx = 0, my = 0, cx = 0, cy = 0;

if (cursor && window.matchMedia('(pointer:fine)').matches) {
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function tick() {
    cx += (mx - cx) * 0.13;
    cy += (my - cy) * 0.13;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a,button,.project-row,.gi,.edu-card,.cd-row')
    .forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
    });
}

/* ── NAV STUCK ───────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 50);
}, { passive: true });

/* ── MOBILE MENU ─────────────────────── */
const burger  = document.getElementById('burger');
const overlay = document.getElementById('overlay');
const oClose  = document.getElementById('overlayClose');

burger.addEventListener('click', () => {
  const open = overlay.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
oClose.addEventListener('click', closeOverlay);

function closeOverlay() {
  overlay.classList.remove('open');
  burger.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── VIDEO PLACEHOLDER LOGIC ─────────── */
// Hide placeholder if a real video ID has been added
const reelIframe = document.getElementById('reelIframe');
const reelPlaceholder = document.getElementById('reelPlaceholder');
if (reelIframe && reelPlaceholder) {
  const src = reelIframe.getAttribute('src');
  if (!src.includes('VIDEO_ID')) {
    reelPlaceholder.style.display = 'none';
  }
}

/* ── SCROLL REVEAL ───────────────────── */
const revealEls = document.querySelectorAll(
  '.work-header, .project-row, .reel-section, .gallery-strip, ' +
  '.about-left, .about-right, .contact-top, .contact-body, .reel-note'
);
revealEls.forEach(el => el.classList.add('reveal'));

const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => ro.observe(el));

/* ── PROJECT ROW HOVER IMAGE ─────────── */
document.querySelectorAll('.project-row').forEach(row => {
  const img = row.querySelector('.proj-hover-img');
  if (!img) return;
  row.addEventListener('mousemove', e => {
    img.style.left = (e.clientX + 30) + 'px';
    img.style.top  = (e.clientY - 110) + 'px';
  });
});

/* ── GALLERY DRAG SCROLL ─────────────── */
const gal = document.getElementById('galleryScroll');
if (gal) {
  let isDown = false, startX, scrollLeft;
  gal.addEventListener('mousedown', e => {
    isDown = true; gal.classList.add('dragging');
    startX = e.pageX - gal.offsetLeft; scrollLeft = gal.scrollLeft;
  });
  gal.addEventListener('mouseleave', () => { isDown = false; gal.classList.remove('dragging'); });
  gal.addEventListener('mouseup',    () => { isDown = false; gal.classList.remove('dragging'); });
  gal.addEventListener('mousemove', e => {
    if (!isDown) return; e.preventDefault();
    gal.scrollLeft = scrollLeft - (e.pageX - gal.offsetLeft - startX) * 1.4;
  });
}

/* ── SMOOTH ANCHOR SCROLL ────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return; e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
    closeOverlay();
  });
});

/* ── CONTACT FORM ────────────────────── */
const form    = document.getElementById('contactForm');
const success = document.getElementById('cfSuccess');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.cf-submit');
    btn.style.opacity = '.6'; btn.style.pointerEvents = 'none';
    try {
      const res = await fetch(form.action, {
        method:'POST', body: new FormData(form), headers: { Accept:'application/json' }
      });
      if (res.ok) {
        form.reset();
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 7000);
      }
    } catch {}
    btn.style.opacity = '1'; btn.style.pointerEvents = 'auto';
  });
}

/* ── ACTIVE NAV LINK ─────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-center a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 160) cur = s.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--cream)' : '';
  });
}, { passive: true });
