/* ===================================
   Petrofine FZCO — script.js
   Micro-interactions & scroll effects
=================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Intersection Observer: fade in stats on scroll ---
  const statItems = document.querySelectorAll('.stat-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statItems.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // --- Parallax: handshake icon moves slightly on mouse move ---
  const hero = document.getElementById('hero');
  const handshake = document.getElementById('handshake-icon');

  if (hero && handshake) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (e.clientX - rect.left - cx) / cx;
      const dy = (e.clientY - rect.top - cy) / cy;
      handshake.style.transform = `translate(${dx * 10}px, ${dy * 6}px)`;
    });

    hero.addEventListener('mouseleave', () => {
      handshake.style.transform = 'translate(0, 0)';
      handshake.style.transition = 'transform 0.6s ease';
    });

    hero.addEventListener('mouseenter', () => {
      handshake.style.transition = 'transform 0.15s ease';
    });
  }

  // --- Topbar: shadow on scroll ---
  const topbar = document.getElementById('topbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      topbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
    } else {
      topbar.style.boxShadow = 'none';
    }
  }, { passive: true });

  // --- Animated counter for stat numbers ---
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.textContent;
        const isNumber = /^\d+/.test(target);
        if (isNumber) {
          const num = parseInt(target);
          const suffix = target.replace(/\d+/, '');
          let current = 0;
          const step = Math.ceil(num / 30);
          const timer = setInterval(() => {
            current = Math.min(current + step, num);
            el.textContent = current + suffix;
            if (current >= num) clearInterval(timer);
          }, 40);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

});
