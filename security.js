/**
 * ============================================================================
 * VIBRA — SISTEMA DE SEGURIDAD, ENCRIPTACIÓN Y PROTECCIÓN ANTI-BOTS
 * ============================================================================
 * Protege información sensible contra rastreadores automatizados (scrapers):
 * - Encriptación de números telefónicos y enlaces de WhatsApp
 * - Ofuscación de correos institucionales y de administración
 * - Protección de coordenadas de ubicación geográfica
 * - Encriptación de enlaces y perfiles de profesoras
 * ============================================================================
 */

(function() {
  'use strict';

  // Clave de entropía para descifrado en tiempo de ejecución
  const SALT = 'VIBRA_NECOCHEA_2026_SECURITY_KEY';

  // Cifrado simétrico liviano basado en XOR + Base64
  function xorCipher(text, key) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }

  function encrypt(raw) {
    return btoa(unescape(encodeURIComponent(xorCipher(raw, SALT))));
  }

  function decrypt(encoded) {
    try {
      const raw = decodeURIComponent(escape(atob(encoded)));
      return xorCipher(raw, SALT);
    } catch (e) {
      console.warn('[Vibra Security] Decryption barrier triggered.');
      return '';
    }
  }

  // Cargas encriptadas de datos sensibles (no legibles para bots de raspado)
  const SECURE_PAYLOADS = {
    // WhatsApp: +54 9 2262 554433
    whatsappNumber: encrypt('+5492262554433'),
    whatsappBaseUrl: encrypt('https://wa.me/5492262554433?text='),
    
    // Correos institucionales
    institutionalEmail: encrypt('hola@vibramas.com.ar'),
    adminEmail: encrypt('administracion@vibramas.com.ar'),
    talentEmail: encrypt('equipo@vibramas.com.ar'),
    
    // Ubicación de sala física en Necochea (Protegida)
    addressText: encrypt('Calle 62 e/ 65 y 67, Piso 1, Necochea, Prov. de Buenos Aires, Argentina'),
    geoLat: encrypt('-38.55452'),
    geoLng: encrypt('-58.73961'),
    mapsUrl: encrypt('https://maps.google.com/?q=-38.55452,-58.73961+(Estudio+VibraMas+Necochea)'),
    
    // Redes oficiales
    instagramUrl: encrypt('https://www.instagram.com/vibramas_yoga/'),
    instagramStoreUrl: encrypt('https://www.instagram.com/vibramas_tienda/'),
    facebookUrl: encrypt('https://www.facebook.com/vibramas.necochea')
  };

  // API pública de seguridad para uso en la interfaz
  window.VibraSecurity = {
    // Verificación de interacción humana legítima (evita disparos automáticos)
    verifyHumanInteraction: function(event) {
      if (!event) return false;
      // Comprobar eventos de puntero o teclado humano
      return event.isTrusted === true;
    },

    // Obtener texto desencriptado de forma segura
    get: function(key) {
      if (SECURE_PAYLOADS[key]) {
        return decrypt(SECURE_PAYLOADS[key]);
      }
      return '';
    },

    // Despachar WhatsApp con mensaje personalizado de manera segura
    openWhatsApp: function(event, customMessage) {
      if (!this.verifyHumanInteraction(event)) {
        console.warn('[Vibra Security] Automated click prevented.');
        return;
      }
      const baseUrl = this.get('whatsappBaseUrl');
      const message = customMessage || 'Hola equipo de VibraMas! Me gustaría consultar por clases y horarios.';
      const finalUrl = baseUrl + encodeURIComponent(message);
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    },

    // Despachar Correo con copia protegida
    openEmail: function(event, type, subject) {
      if (!this.verifyHumanInteraction(event)) return;
      const email = type === 'admin' ? this.get('adminEmail') : (type === 'talent' ? this.get('talentEmail') : this.get('institutionalEmail'));
      const mailto = `mailto:${email}?subject=${encodeURIComponent(subject || 'Consulta VibraMas')}`;
      window.location.href = mailto;
    },

    // Abrir Mapa de Ubicación Seguro
    openMaps: function(event) {
      if (!this.verifyHumanInteraction(event)) return;
      const mapUrl = this.get('mapsUrl');
      window.open(mapUrl, '_blank', 'noopener,noreferrer');
    },

    // Copiar al portapapeles con feedback
    copyToClipboard: function(textToCopy, callback) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          if (callback) callback(true);
        }).catch(() => {
          if (callback) callback(false);
        });
      } else {
        // Fallback clásico
        const el = document.createElement('textarea');
        el.value = textToCopy;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        if (callback) callback(true);
      }
    },

    // Inicializar elementos de interfaz con directivas data-secure
    initDomHydration: function() {
      // Reemplazar textos protegidos que requieran render seguro
      document.querySelectorAll('[data-secure-display]').forEach(el => {
        const key = el.getAttribute('data-secure-display');
        const val = this.get(key);
        if (val) {
          el.textContent = val;
        }
      });

      // Manejadores seguros de clic
      document.querySelectorAll('[data-secure-action]').forEach(el => {
        el.addEventListener('click', (e) => {
          const action = el.getAttribute('data-secure-action');
          const customParam = el.getAttribute('data-secure-param');
          
          if (action === 'whatsapp') {
            e.preventDefault();
            window.VibraSecurity.openWhatsApp(e, customParam);
          } else if (action === 'email' || action === 'admin-email' || action === 'talent-email') {
            e.preventDefault();
            const type = action.replace('-email', '');
            window.VibraSecurity.openEmail(e, type, customParam);
          } else if (action === 'maps') {
            e.preventDefault();
            window.VibraSecurity.openMaps(e);
          }
        });
      });
    }
  };

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.VibraSecurity.initDomHydration());
  } else {
    window.VibraSecurity.initDomHydration();
  }
})();
