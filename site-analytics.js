/* Flavio Guercio portfolio — optional Google Analytics 4 integration.
 * Configured for Measurement ID G-N1N9WRYGHK.
 * The Google Analytics tag is not loaded until the visitor accepts.
 * Tracking starts only after the visitor explicitly accepts.
 */
(() => {
  'use strict';
  const MEASUREMENT_ID = 'G-N1N9WRYGHK'; // Google Analytics 4 Measurement ID
  if (!/^G-[A-Z0-9]{5,}$/.test(MEASUREMENT_ID)) return;

  const KEY = 'fg_portfolio_analytics_consent_v1';
  const TEXT = {
    pt: {
      label: 'Privacidade',
      message: 'Este site usa Google Analytics para medir visitas e melhorar o portfólio. A medição só começa se você aceitar.',
      accept: 'Aceitar', reject: 'Recusar'
    },
    en: {
      label: 'Privacy',
      message: 'This website uses Google Analytics to measure visits and improve the portfolio. Tracking starts only if you accept.',
      accept: 'Accept', reject: 'Decline'
    },
    es: {
      label: 'Privacidad',
      message: 'Este sitio usa Google Analytics para medir visitas y mejorar el portafolio. La medición empieza solo si aceptas.',
      accept: 'Aceptar', reject: 'Rechazar'
    }
  };
  let consent = null;
  try { consent = localStorage.getItem(KEY); } catch (_) {}

  let loaded = false;
  let panel = null;
  let footerLink = null;

  const labels = () => TEXT[(document.documentElement.lang || 'pt').slice(0, 2).toLowerCase()] || TEXT.pt;

  function loadGA() {
    if (loaded) {
      window['ga-disable-' + MEASUREMENT_ID] = false;
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', MEASUREMENT_ID);
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function setConsent(next) {
    consent = next;
    try { localStorage.setItem(KEY, next); } catch (_) {}
    if (next === 'accepted') {
      loadGA();
    } else if (loaded) {
      window['ga-disable-' + MEASUREMENT_ID] = true;
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
      // Clear first-party GA cookies on this site on consent withdrawal.
      document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        if (name === '_ga' || name.startsWith('_ga_')) {
          document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax';
        }
      });
    }
    if (panel) { panel.remove(); panel = null; }
  }

  function button(label, accept) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.style.cssText = accept
      ? 'padding:9px 16px;background:#a84b36;color:#fff;border:1px solid #a84b36;border-radius:3px;font:600 13px Inter,Arial,sans-serif;cursor:pointer'
      : 'padding:9px 16px;background:transparent;color:#f4f2ed;border:1px solid #909690;border-radius:3px;font:600 13px Inter,Arial,sans-serif;cursor:pointer';
    b.addEventListener('click', () => setConsent(accept ? 'accepted' : 'rejected'));
    return b;
  }

  function showConsent() {
    if (panel) return;
    const t = labels();
    panel = document.createElement('aside');
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', t.label);
    panel.style.cssText = 'position:fixed;z-index:9999;bottom:16px;left:16px;right:16px;max-width:460px;background:#161c19;color:#f4f2ed;border:1px solid #414841;border-radius:5px;padding:17px 19px;box-shadow:0 8px 30px #0005;font:14px/1.5 Inter,Arial,sans-serif';
    const message = document.createElement('p');
    message.style.cssText = 'margin:0 0 13px';
    message.textContent = t.message;
    panel.appendChild(message);
    const actions = document.createElement('div');
    actions.style.cssText = 'display:flex;gap:9px;flex-wrap:wrap';
    actions.appendChild(button(t.accept, true));
    actions.appendChild(button(t.reject, false));
    panel.appendChild(actions);
    document.body.appendChild(panel);
  }

  const footer = document.querySelector('footer .wrap') || document.querySelector('footer');
  if (footer) {
    footerLink = document.createElement('button');
    footerLink.type = 'button';
    footerLink.textContent = labels().label;
    footerLink.style.cssText = 'background:transparent;border:0;padding:0;color:inherit;font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer';
    footerLink.addEventListener('click', showConsent);
    footer.appendChild(footerLink);
  }

  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
    queueMicrotask(() => {
      if (footerLink) footerLink.textContent = labels().label;
      if (panel) { panel.remove(); panel = null; showConsent(); }
    });
  }));

  if (consent === 'accepted') loadGA();
  else if (consent !== 'rejected') showConsent();
})();
