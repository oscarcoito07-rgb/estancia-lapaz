/* ============================================================
   ESTANCIA LA PAZ — JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ─────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ── HAMBURGER MENU ────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    // Cerrar al hacer click en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ── FADE-IN ON SCROLL ─────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, (entry.target.dataset.delay || 0));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* ── LIGHTBOX ──────────────────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg   = lightbox.querySelector('.lightbox-img');
    const lbClose = lightbox.querySelector('.lightbox-close');

    document.querySelectorAll('.galeria-item[data-src]').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.src;
        lbImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLB = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lbClose && lbClose.addEventListener('click', closeLB);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLB(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLB(); });
  }

  /* ── FORMULARIO DE RESERVA ─────────────────────────────── */
  const form = document.getElementById('form-reserva');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validación básica
      const campos = form.querySelectorAll('[required]');
      let valido = true;
      campos.forEach(campo => {
        campo.style.borderColor = '';
        if (!campo.value.trim()) {
          campo.style.borderColor = '#c0392b';
          valido = false;
        }
      });

      if (!valido) return;

      // Simular envío
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        const success = document.getElementById('form-success');
        if (success) success.style.display = 'block';
      }, 1200);
    });
  }

  /* ── TABS GALERÍA ──────────────────────────────────────── */
  const tabBtns = document.querySelectorAll('.galeria-tab');
  const tabPanels = document.querySelectorAll('.galeria-panel');
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById(btn.dataset.panel);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ── SCROLL SUAVE PARA ANCLAJES ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── ACTIVE NAV LINK ────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link[data-section]');
  if (sections.length && navItems.length) {
    const activateNav = () => {
      const scrollY = window.scrollY;
      sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          navItems.forEach(n => n.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-link[data-section="${section.id}"]`);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', activateNav, { passive: true });
  }

  /* ── ANIMACIÓN STAGGER PARA GRIDS ──────────────────────── */
  document.querySelectorAll('.stagger-children').forEach(container => {
    const children = container.querySelectorAll('.fade-in');
    children.forEach((child, i) => {
      child.dataset.delay = i * 100;
    });
  });

});
