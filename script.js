/* ============================================
   FORMA — Animations & Interactions
   ============================================ */

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

// ---- Nav scroll effect ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- AOS — Animate on Scroll ----
const aosElements = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.aosDelay || 0;
      setTimeout(() => entry.target.classList.add('aos-animate'), parseInt(delay));
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
aosElements.forEach(el => aosObserver.observe(el));

// ---- Counter animation ----
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target + '+';
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById('stat1'), 248);
      statObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const statEl = document.getElementById('stat1');
if (statEl) statObserver.observe(statEl);

// ---- Parallax on hero blobs ----
document.addEventListener('mousemove', e => {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;

  const blobs = document.querySelectorAll('.hero-blob');
  blobs.forEach((b, i) => {
    const speed = (i + 1) * 18;
    b.style.transform = `translate(${dx * speed}px, ${dy * speed}px)`;
  });
});

// ---- Collection item hover preview expand ----
const collectionItems = document.querySelectorAll('.collection-item');
collectionItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.background = 'rgba(255,255,255,0.04)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.background = '';
  });
});

// ---- Trend card tilt effect ----
document.querySelectorAll('.trend-card, .testimonial, .hero-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-8px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  });
});

// ---- Scroll-based parallax for sections ----
const parallaxItems = [
  { el: document.querySelector('.hero-title'), speed: 0.3 },
  { el: document.querySelector('.hero-desc'), speed: 0.2 },
];

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  parallaxItems.forEach(({ el, speed }) => {
    if (el) el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

// ---- Magnetic buttons ----
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'transform 0.1s ease';
  });
});

// ---- Smooth section transitions with page progress ----
function updateProgress() {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  const pct = (scrolled / total) * 100;
  document.documentElement.style.setProperty('--scroll-progress', pct + '%');
}
window.addEventListener('scroll', updateProgress, { passive: true });

// ---- Marquee pause on hover ----
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
  marqueeContent.addEventListener('mouseenter', () => {
    marqueeContent.style.animationPlayState = 'paused';
  });
  marqueeContent.addEventListener('mouseleave', () => {
    marqueeContent.style.animationPlayState = 'running';
  });
}

// ---- Form handling ----
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-primary');
  const span = btn.querySelector('span');
  span.textContent = 'Odosielam...';
  btn.disabled = true;

  setTimeout(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    span.textContent = 'Odoslať požiadavku';
    btn.disabled = false;
    e.target.reset();
    setTimeout(() => toast.classList.remove('show'), 4000);
  }, 1200);
}

// ---- Pillar stagger on scroll ----
const pillars = document.querySelectorAll('.pillar');
const pillarObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pillars.forEach((p, i) => {
        setTimeout(() => {
          p.style.opacity = '1';
          p.style.transform = 'translateX(0)';
        }, i * 120);
      });
      pillarObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
pillars.forEach(p => {
  p.style.opacity = '0';
  p.style.transform = 'translateX(-20px)';
  p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
if (pillars.length) pillarObserver.observe(pillars[0]);

// ---- Process step reveal ----
const steps = document.querySelectorAll('.process-step');
const stepObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      steps.forEach((s, i) => {
        setTimeout(() => {
          s.style.opacity = '1';
          s.style.transform = 'translateY(0)';
        }, i * 180);
      });
      stepObserver.disconnect();
    }
  });
}, { threshold: 0.2 });
steps.forEach(s => {
  s.style.opacity = '0';
  s.style.transform = 'translateY(30px)';
  s.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
});
if (steps.length) stepObserver.observe(steps[0]);

// ---- Hero card floating animation ----
const heroCards = document.querySelectorAll('.hero-card');
heroCards.forEach((card, i) => {
  card.style.animation = `cardFloat ${4 + i * 0.8}s ease-in-out ${i * 0.5}s infinite`;
});

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes cardFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
`;
document.head.appendChild(styleSheet);

// ---- Smooth nav anchor scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---- Page load animation ----
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.6s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  setTimeout(() => {
    const heroLabel = document.querySelector('.hero-label');
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-desc');
    const heroActions = document.querySelector('.hero-actions');
    const heroVisual = document.querySelector('.hero-visual');

    [heroLabel, heroTitle, heroDesc, heroActions, heroVisual].forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.9s ease ${i * 0.12}s, transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.12}s`;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 120);
    });
  }, 100);
});
