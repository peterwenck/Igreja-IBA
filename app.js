/**
 * ==========================================================================
 * IGREJA COMUNIDADE & VIDA - INTERACTIVE APPLICATION CONTROLLER
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. ACCESSIBILITY CONTROLS (A+, A-, Contrast Toggle)
  // --------------------------------------------------------------------------
  let fontScale = parseFloat(localStorage.getItem('igreja_font_scale')) || 1.0;
  let isHighContrast = localStorage.getItem('igreja_contrast') === 'high';

  const applyAccessibility = () => {
    document.documentElement.style.setProperty('--font-scale', fontScale);
    if (isHighContrast) {
      document.documentElement.setAttribute('data-contrast', 'high');
    } else {
      document.documentElement.removeAttribute('data-contrast');
    }
  };
  applyAccessibility();

  const fontIncreaseBtn = document.getElementById('btn-font-increase');
  const fontDecreaseBtn = document.getElementById('btn-font-decrease');
  const fontResetBtn = document.getElementById('btn-font-reset');
  const contrastToggleBtn = document.getElementById('btn-contrast-toggle');

  if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener('click', () => {
      if (fontScale < 1.3) {
        fontScale += 0.1;
        localStorage.setItem('igreja_font_scale', fontScale.toFixed(1));
        applyAccessibility();
      }
    });
  }

  if (fontDecreaseBtn) {
    fontDecreaseBtn.addEventListener('click', () => {
      if (fontScale > 0.9) {
        fontScale -= 0.1;
        localStorage.setItem('igreja_font_scale', fontScale.toFixed(1));
        applyAccessibility();
      }
    });
  }

  if (fontResetBtn) {
    fontResetBtn.addEventListener('click', () => {
      fontScale = 1.0;
      localStorage.setItem('igreja_font_scale', '1.0');
      applyAccessibility();
    });
  }

  if (contrastToggleBtn) {
    contrastToggleBtn.addEventListener('click', () => {
      isHighContrast = !isHighContrast;
      localStorage.setItem('igreja_contrast', isHighContrast ? 'high' : 'normal');
      applyAccessibility();
      showToast(isHighContrast ? 'Modo de Alto Contraste Ativado' : 'Modo Padrão Ativado');
    });
  }

  // --------------------------------------------------------------------------
  // 2. VISITOR WELCOME MODAL ("Sou Novo Aqui")
  // --------------------------------------------------------------------------
  const visitorModal = document.getElementById('visitor-modal');
  const openVisitorBtns = document.querySelectorAll('.js-open-visitor-modal');
  const closeVisitorBtns = document.querySelectorAll('.js-close-visitor-modal');
  const visitorForm = document.getElementById('visitor-form');

  const openModal = () => {
    if (visitorModal) {
      visitorModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (visitorModal) {
      visitorModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  openVisitorBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeVisitorBtns.forEach(btn => btn.addEventListener('click', closeModal));

  if (visitorModal) {
    visitorModal.addEventListener('click', (e) => {
      if (e.target === visitorModal) closeModal();
    });
  }

  if (visitorForm) {
    visitorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Obrigado! Recebemos sua mensagem. Seja muito bem-vindo à nossa comunidade! ❤️');
      visitorForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // CONTACT & PRAYER FORM HANDLER
  // --------------------------------------------------------------------------
  const contactPrayerForm = document.getElementById('contact-prayer-form');
  if (contactPrayerForm) {
    contactPrayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Sua mensagem / pedido de oração foi enviado com sucesso! Nossa equipe entrará em contato em breve. 🙏');
      contactPrayerForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 3. EVENT CATEGORY FILTERING LOGIC
  // --------------------------------------------------------------------------
  const filterChips = document.querySelectorAll('.filter-chip');
  const eventCards = document.querySelectorAll('.event-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterCategory = chip.getAttribute('data-filter');

      eventCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4. LIVE BROADCAST COUNTDOWN TIMER
  // --------------------------------------------------------------------------
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (hoursEl && minsEl && secsEl) {
    let targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 18, 42, 15);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetTime.getTime() - now;

      if (diff <= 0) {
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(minutes).padStart(2, '0');
      secsEl.textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // --------------------------------------------------------------------------
  // 5. TOAST NOTIFICATION HELPER
  // --------------------------------------------------------------------------
  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
      background: var(--color-dark);
      color: #FFF;
      padding: 14px 20px;
      border-radius: var(--radius-md);
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
      animation: slideInRight 0.3s ease;
    `;
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C2410C" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --------------------------------------------------------------------------
  // 6. SCROLL REVEAL OBSERVER (@IMPECCABLE /ANIMATE)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }
});
