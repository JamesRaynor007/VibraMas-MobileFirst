/**
 * ============================================================================
 * VIBRA — CHATBOT ASISTENTE VIRTUAL ("VIBRABOT")
 * ============================================================================
 * Agente interactivo diseñado para facilitar la navegación y orientar
 * a nuevos visitantes con accesos rápidos y respuestas empáticas.
 * ============================================================================
 */

(function() {
  'use strict';

  const BOT_RESPONSES = {
    practicas: {
      title: "🧘‍♀️ Tipos de Prácticas en VibraMas",
      text: "Ofrecemos 4 caminos conscientes adaptados a todos los niveles:\n• <strong>Hatha & Vinyasa Yoga:</strong> Equilibrio, fuerza suave y respiración consciente.\n• <strong>Pilates Mat:</strong> Alineación postural, estabilidad y fortalecimiento del core.\n• <strong>Stretching Profundo:</strong> Flexibilidad articular y liberación fascial.\n• <strong>Movimiento desde Cero:</strong> Diseñado especialmente para quienes nunca practicaron o buscan retomar con amabilidad.",
      buttons: [
        { label: "Ver detalle de Clases", url: "index.html#tipos-clases" },
        { label: "Ver Horarios", action: "horarios" }
      ]
    },
    horarios: {
      title: "📅 Planilla de Horarios Semanales",
      text: "Tenemos clases de Lunes a Sábados por la mañana (desde 08:30 hs) y por la tarde (desde 17:30 hs). Podés filtrar por disciplina o por tu profesora favorita, y descargar la planilla en formato PDF.",
      buttons: [
        { label: "Ir a la Planilla Interactiva", url: "quienes-somos.html#horarios" },
        { label: "Descargar PDF", action: "download-pdf" }
      ]
    },
    prueba: {
      title: "✨ Reservar Clase de Prueba Diagnóstica",
      text: "¡Nos alegra mucho darte la bienvenida! Podés sumarte a una clase de prueba para experimentar el espacio, conversar con la profe y ver qué práctica resuena mejor con vos.",
      buttons: [
        { label: "Reservar por WhatsApp Seguro", action: "secure-whatsapp-trial" },
        { label: "Ver Tienda de Clases", url: "tienda.html" }
      ]
    },
    demostrativa: {
      title: "🎥 Clase Demostrativa en YouTube",
      text: "Podés realizar ahora mismo nuestra clase gratuita de 25 minutos: 'Movimiento desde Cero', guiada por nuestras fundadoras para que descubras tu cuerpo sin presiones.",
      buttons: [
        { label: "Ver Video Demostrativo", action: "open-video-modal" },
        { label: "Ir a Sección de Inicio", url: "index.html#video-demo" }
      ]
    },
    contacto: {
      title: "💬 Contacto Humano y Canales Oficiales",
      text: "Estamos a tu disposición para cualquier duda. Podés escribirnos por WhatsApp directo o enviarnos un correo al área que necesites.",
      buttons: [
        { label: "Abrir WhatsApp Oficial", action: "secure-whatsapp" },
        { label: "Formulario de Contacto", url: "contacto.html" }
      ]
    }
  };

  // Crear e inyectar el HTML del Chatbot si no existe
  function initChatbot() {
    if (document.getElementById('vibrabotWidget')) return;

    const widget = document.createElement('div');
    widget.id = 'vibrabotWidget';
    widget.className = 'vibrabot-container';
    widget.innerHTML = `
      <!-- Botón Flotante Launcher -->
      <button class="vibrabot-toggle-btn" id="vibrabotToggleBtn" aria-label="Abrir asistente de ayuda VibraBot" title="¿Necesitás ayuda para navegar?">
        <span class="vibrabot-pulse"></span>
        <svg class="vibrabot-icon-lotus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2C10 7 6 10 3 12C6 14 10 17 12 22C14 17 18 14 21 12C18 10 14 7 12 2Z" fill="currentColor"/>
        </svg>
        <span class="vibrabot-badge-unread">1</span>
      </button>

      <!-- Ventana de Chat Flotante -->
      <div class="vibrabot-window" id="vibrabotWindow" aria-hidden="true">
        <!-- Header -->
        <div class="vibrabot-header">
          <div class="vibrabot-avatar-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2C10 7 6 10 3 12C6 14 10 17 12 22C14 17 18 14 21 12C18 10 14 7 12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <div class="vibrabot-header-info">
            <h4 class="vibrabot-name">VibraBot Asistente</h4>
            <span class="vibrabot-status"><span class="status-dot"></span> Guía de Bienestar Online</span>
          </div>
          <button class="vibrabot-close-btn" id="vibrabotCloseBtn" aria-label="Cerrar chat">✕</button>
        </div>

        <!-- Área de Conversación -->
        <div class="vibrabot-messages" id="vibrabotMessages">
          <div class="chat-msg bot-msg">
            <div class="msg-bubble">
              ¡Hola! Bienvenida/o a <strong>VibraMas</strong> 🌿 Soy tu asistente para ayudarte a recorrer la web. ¿En qué te gustaría que te guíe hoy?
            </div>
          </div>

          <!-- Opciones de Utilidad Requeridas -->
          <div class="vibrabot-quick-chips" id="vibrabotQuickChips">
            <button class="quick-chip" data-topic="practicas">🧘 Ver tipos de prácticas</button>
            <button class="quick-chip" data-topic="horarios">📅 Ver horarios</button>
            <button class="quick-chip" data-topic="prueba">✨ Reservar una clase de Prueba</button>
            <button class="quick-chip" data-topic="demostrativa">🎥 Ver clase demostrativa</button>
            <button class="quick-chip" data-topic="contacto">💬 Enviar correo o WhatsApp</button>
          </div>
        </div>

        <!-- Input de Texto y Preguntas Libres -->
        <form class="vibrabot-input-form" id="vibrabotInputForm">
          <input type="text" id="vibrabotTextInput" placeholder="Escribí tu consulta aquí..." autocomplete="off">
          <button type="submit" aria-label="Enviar pregunta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(widget);
    bindChatbotEvents();
  }

  function bindChatbotEvents() {
    const toggleBtn = document.getElementById('vibrabotToggleBtn');
    const closeBtn = document.getElementById('vibrabotCloseBtn');
    const windowEl = document.getElementById('vibrabotWindow');
    const unreadBadge = document.querySelector('.vibrabot-badge-unread');
    const inputForm = document.getElementById('vibrabotInputForm');
    const textInput = document.getElementById('vibrabotTextInput');
    const chips = document.querySelectorAll('.quick-chip');

    // Toggle Chat
    function toggleChat() {
      const isOpen = windowEl.classList.contains('open');
      if (isOpen) {
        windowEl.classList.remove('open');
        windowEl.setAttribute('aria-hidden', 'true');
      } else {
        windowEl.classList.add('open');
        windowEl.setAttribute('aria-hidden', 'false');
        if (unreadBadge) unreadBadge.style.display = 'none';
        if (textInput) textInput.focus();
      }
    }

    if (toggleBtn) toggleBtn.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', toggleChat);

    // Click en Chips Rápidos
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const topic = chip.getAttribute('data-topic');
        handleQuickTopic(topic);
      });
    });

    // Envío de Pregunta Libre
    if (inputForm) {
      inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = textInput.value.trim();
        if (!query) return;

        appendUserMessage(query);
        textInput.value = '';

        // Análisis semántico de respuesta
        setTimeout(() => {
          processUserInput(query);
        }, 350);
      });
    }

    // Auto-mostrar sugerencia después de 4 segundos si el usuario no ha abierto
    setTimeout(() => {
      if (unreadBadge && !windowEl.classList.contains('open')) {
        unreadBadge.classList.add('bounce');
      }
    }, 4000);
  }

  function appendUserMessage(text) {
    const messages = document.getElementById('vibrabotMessages');
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user-msg';
    userMsg.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;
  }

  function appendBotResponse(title, text, buttons) {
    const messages = document.getElementById('vibrabotMessages');
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot-msg';

    let buttonsHtml = '';
    if (buttons && buttons.length) {
      buttonsHtml = '<div class="msg-actions-row">';
      buttons.forEach(btn => {
        if (btn.url) {
          buttonsHtml += `<a href="${btn.url}" class="btn-chat-action">${btn.label}</a>`;
        } else if (btn.action) {
          buttonsHtml += `<button class="btn-chat-action" data-action="${btn.action}">${btn.label}</button>`;
        }
      });
      buttonsHtml += '</div>';
    }

    botMsg.innerHTML = `
      <div class="msg-bubble">
        ${title ? `<div class="msg-bubble-title">${title}</div>` : ''}
        <div class="msg-bubble-body">${text.replace(/\n/g, '<br>')}</div>
        ${buttonsHtml}
      </div>
    `;

    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;

    // Vincular acciones de botones
    botMsg.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = btn.getAttribute('data-action');
        executeBotAction(action);
      });
    });
  }

  function handleQuickTopic(topicKey) {
    const topic = BOT_RESPONSES[topicKey];
    if (!topic) return;

    appendUserMessage(topic.title);
    setTimeout(() => {
      appendBotResponse(topic.title, topic.text, topic.buttons);
    }, 250);
  }

  function processUserInput(query) {
    const q = query.toLowerCase();

    if (q.includes('horario') || q.includes('dia') || q.includes('hora') || q.includes('turno')) {
      handleQuickTopic('horarios');
    } else if (q.includes('practica') || q.includes('clase') || q.includes('yoga') || q.includes('pilates') || q.includes('disciplina')) {
      handleQuickTopic('practicas');
    } else if (q.includes('prueba') || q.includes('gratis') || q.includes('primera') || q.includes('empezar')) {
      handleQuickTopic('prueba');
    } else if (q.includes('video') || q.includes('youtube') || q.includes('demo') || q.includes('mostrar')) {
      handleQuickTopic('demostrativa');
    } else if (q.includes('contacto') || q.includes('whatsapp') || q.includes('mail') || q.includes('telefono') || q.includes('donde') || q.includes('direccion')) {
      handleQuickTopic('contacto');
    } else if (q.includes('precio') || q.includes('tienda') || q.includes('cuanto') || q.includes('comprar') || q.includes('pack')) {
      appendBotResponse(
        "🛍️ Precios y Tienda Vibra",
        "Podés ver todos los valores actualizados de pases mensuales, packs de clases y equipamiento en nuestra tienda oficial Shopify (vibramas.store).",
        [
          { label: "Ver Tienda Oficial", url: "tienda.html" },
          { label: "Consultar por WhatsApp", action: "secure-whatsapp" }
        ]
      );
    } else {
      appendBotResponse(
        "🌿 Estamos para acompañarte",
        "No logré identificar la consulta con exactitud, pero podés elegir una de nuestras secciones principales o conversar directamente con nosotras por WhatsApp.",
        [
          { label: "Ver Tipos de Prácticas", action: "practicas-trigger" },
          { label: "Escribirnos por WhatsApp", action: "secure-whatsapp" }
        ]
      );
    }
  }

  function executeBotAction(action) {
    if (action === 'secure-whatsapp' || action === 'secure-whatsapp-trial') {
      const msg = action === 'secure-whatsapp-trial' 
        ? 'Hola! Me gustaría coordinar mi primera clase de prueba en VibraMas.' 
        : 'Hola equipo de VibraMas! Me gustaría consultar por clases y actividades.';
      if (window.VibraSecurity) {
        window.VibraSecurity.openWhatsApp({ isTrusted: true }, msg);
      } else {
        window.open('https://wa.me/5492262554433', '_blank');
      }
    } else if (action === 'download-pdf') {
      const btn = document.getElementById('btnDownloadSchedulePdf');
      if (btn) {
        btn.click();
      } else {
        window.location.href = 'quienes-somos.html#horarios';
      }
    } else if (action === 'open-video-modal') {
      const modalTrigger = document.querySelector('[data-open-modal="videoModal"]') || document.querySelector('.btn-video-play-banner');
      if (modalTrigger) {
        modalTrigger.click();
      } else {
        window.location.href = 'index.html#video-demo';
      }
    } else if (action === 'practicas-trigger') {
      handleQuickTopic('practicas');
    } else if (action === 'horarios') {
      handleQuickTopic('horarios');
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Inicializar al cargar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
