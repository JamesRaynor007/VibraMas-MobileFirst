/**
 * ============================================================================
 * VIBRA — LÓGICA DE INTERACTIVIDAD & EXPERIENCIA DE USUARIO (APP.JS)
 * ============================================================================
 * - Navegación responsiva Mobile-First
 * - Carrusel dinámico continuo con tiempo de lectura
 * - Modales de video y reproducción fluida
 * - Efectos multi-imagen en tarjetas de profesores
 * - Audio Zen ambiental (Web Audio API)
 * - Notificaciones Toast y feedback de formularios
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initDynamicCarousel();
  initVideoModal();
  initZenAudio();
  initFormHandlers();
  initActiveNavHighlight();
});

// 1. Header con scroll suave y fondo con desenfoque
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// 2. Menú de navegación móvil
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-navigation');
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('mobile-open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('mobile-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// 3. Carrusel Interactivo Continuo con Lectura Automática
function initDynamicCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const indicatorsContainer = document.getElementById('carouselIndicators');
  if (!track) return;

  const slidesData = (window.VIBRA_CONFIG && window.VIBRA_CONFIG.heroAnnouncements) ? window.VIBRA_CONFIG.heroAnnouncements : [];
  if (slidesData.length === 0) return;

  // Render slides si está vacío
  if (track.children.length === 0) {
    let slidesHtml = '';
    slidesData.forEach(slide => {
      slidesHtml += `
        <div class="carousel-slide ${slide.bgClass || ''}">
          <div class="carousel-card">
            <div class="carousel-content">
              <span class="carousel-badge">${slide.badge}</span>
              <h3 class="carousel-title">${slide.title}</h3>
              <p class="carousel-desc">${slide.description}</p>
            </div>
            <a href="${slide.linkUrl}" class="carousel-link">${slide.linkText}</a>
          </div>
        </div>
      `;
    });
    track.innerHTML = slidesHtml;
  }

  const slides = track.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoPlayInterval = null;
  const slideDuration = 6500; // Tiempo para lectura pausada (6.5 segundos)

  // Crear indicadores
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.className = `carousel-indicator-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('data-index', i);
      dot.addEventListener('click', () => {
        goToSlide(i);
        restartAutoPlay();
      });
      indicatorsContainer.appendChild(dot);
    }
  }

  function updateIndicators() {
    if (!indicatorsContainer) return;
    const dots = indicatorsContainer.querySelectorAll('.carousel-indicator-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoPlay();
    });
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, slideDuration);
  }

  function pauseAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }

  function restartAutoPlay() {
    pauseAutoPlay();
    startAutoPlay();
  }

  // Pausar con hover para permitir lectura sin prisa
  const wrapper = document.querySelector('.carousel-container');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', pauseAutoPlay);
    wrapper.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

// 4. Modal de Video Demostrativo Inteligente
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const openTriggers = document.querySelectorAll('[data-open-modal="videoModal"]');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const iframe = document.getElementById('modalVideoIframe');
  if (!modal) return;

  const videoConfig = (window.VIBRA_CONFIG && window.VIBRA_CONFIG.featuredVideo) 
    ? window.VIBRA_CONFIG.featuredVideo 
    : { youtubeVideoId: "inpok4MKVLM" };

  function openVideoModal() {
    if (iframe) {
      iframe.src = `https://www.youtube-nocookie.com/embed/${videoConfig.youtubeVideoId}?autoplay=1&rel=0`;
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (iframe) {
      iframe.src = '';
    }
  }

  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openVideoModal();
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeVideoModal();
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeVideoModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeVideoModal();
    }
  });
}

// 5. Audio Zen Ambiental con Web Audio API (Cuenco Tibetano Sintetizado)
function initZenAudio() {
  const audioBtn = document.getElementById('btnZenSound');
  if (!audioBtn) return;

  let audioCtx = null;
  let isPlaying = false;

  audioBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    playTibetanBowl(audioCtx);
    showToast('🌿 Sonido de campana tibetana activado. Respirá profundo.');
  });

  function playTibetanBowl(ctx) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Frecuencia sagrada 432 Hz (afinación armónica natural)
    osc.frequency.setValueAtTime(432, ctx.currentTime);

    // Resonancia armónica sutil
    const harmonicOsc = ctx.createOscillator();
    const harmonicGain = ctx.createGain();
    harmonicOsc.type = 'sine';
    harmonicOsc.frequency.setValueAtTime(864, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.5);

    harmonicGain.gain.setValueAtTime(0.001, ctx.currentTime);
    harmonicGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.0);

    osc.connect(gain);
    harmonicOsc.connect(harmonicGain);
    gain.connect(ctx.destination);
    harmonicGain.connect(ctx.destination);

    osc.start();
    harmonicOsc.start();
    osc.stop(ctx.currentTime + 5.6);
    harmonicOsc.stop(ctx.currentTime + 4.1);
  }
}

// 6. Manejo de Formularios y Feedback
function initFormHandlers() {
  const forms = document.querySelectorAll('form[data-ajax-form]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Enviar';

      if (submitBtn) {
        submitBtn.innerHTML = 'Enviando...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        showToast('✨ Mensaje enviado con éxito. Te responderemos a la brevedad.');
        form.reset();
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }, 1000);
    });
  });
}

// 7. Notificaciones Toast Flotantes
function showToast(message) {
  let toast = document.getElementById('vibraToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'vibraToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 90px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #262523;
      color: #FAF8F5;
      padding: 12px 22px;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 8px 24px rgba(0,0,0,0.25);
      z-index: 10000;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 4000);
}

// 8. Resaltar enlace de navegación activo según URL actual
function initActiveNavHighlight() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.main-navigation .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Comparar nombre de archivo
    if (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path.endsWith('index.html')))) {
      link.classList.add('active');
    } else if (href.startsWith('#')) {
      // Dejar hash navigation
    } else {
      link.classList.remove('active');
    }
  });
}
