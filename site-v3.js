/* Outdoor 3.0 static localization and interactions. No external tracking before opt-in. */
(() => {
  'use strict';
  const lang = (document.documentElement.lang || 'pt').slice(0,2).toLowerCase();
  const root = '/flavioguercio/';
  const destinations = {pt:root,en:root+'en/',es:root+'es/'};
  document.querySelectorAll('.lang a[data-l]').forEach(link => {
    link.addEventListener('click', () => {
      try { localStorage.setItem('lang',link.dataset.l); } catch (_) {}
    });
  });
  document.querySelectorAll('img.zoom').forEach(img => {
    img.tabIndex = 0;
    img.setAttribute('role','button');
    img.addEventListener('keydown', event => {
      if(event.key === 'Enter' || event.key === ' ') { event.preventDefault();img.click(); }
    });
  });
  function analytics(name,params){
    if(typeof window.gtag === 'function' && window['ga-disable-G-N1N9WRYGHK'] !== true) {
      window.gtag('event',name,params || {});
    }
  }
  document.querySelectorAll('details.ov2-archive').forEach(detail => {
    detail.addEventListener('toggle',()=>{
      if(detail.open) analytics('portfolio_archive_open',{archive: detail.dataset.ov2Event || 'archive'});
    });
  });
  document.addEventListener('click',event => {
    const link = event.target.closest('a');
    if(!link) return;
    const href = link.getAttribute('href') || '';
    const contact = document.querySelector('#contato');
    const type = href.startsWith('mailto:') ? 'email'
      : href.includes('wa.me/') ? 'whatsapp'
      : href.includes('instagram.com/') ? 'instagram' : null;
    if(type && contact?.contains(link)) analytics('portfolio_contact_click',{contact_method:type});
    else if(link.classList.contains('rl')) analytics('portfolio_results_click',{link_destination:href});
    else if(link.dataset.ov2Event) analytics('portfolio_cta_click',{cta:link.dataset.ov2Event});
  });
})();

/* Mobile navigation: three-language, keyboard and touch accessible. */
(() => {
  'use strict';
  const nav = document.querySelector('nav');
  const wrap = nav?.querySelector('.wrap');
  const items = wrap?.querySelector(':scope > ul');
  if (!nav || !wrap || !items || nav.classList.contains('ov3-menu-ready')) return;

  const lang = (document.documentElement.lang || 'pt').slice(0,2).toLowerCase();
  const text = {
    pt: { label: 'Menu', open: 'Abrir menu de navegação', close: 'Fechar menu de navegação' },
    en: { label: 'Menu', open: 'Open navigation menu', close: 'Close navigation menu' },
    es: { label: 'Menú', open: 'Abrir menú de navegación', close: 'Cerrar menú de navegación' }
  }[lang] || { label: 'Menu', open: 'Abrir menu', close: 'Fechar menu' };

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'ov3-menu-toggle';
  toggle.setAttribute('aria-controls', items.id || 'ov3-mobile-links');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', text.open);
  if (!items.id) items.id = 'ov3-mobile-links';

  const icon = document.createElement('span');
  icon.className = 'ov3-menu-icon';
  icon.setAttribute('aria-hidden','true');
  for (let i=0;i<3;i++) icon.appendChild(document.createElement('i'));
  const label = document.createElement('span');
  label.textContent = text.label;
  toggle.append(icon, label);
  wrap.appendChild(toggle);

  function setOpen(open){
    nav.classList.toggle('ov3-nav-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?text.close:text.open);
  }
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('ov3-nav-open')));
  items.addEventListener('click', event => { if(event.target.closest('a')) setOpen(false); });
  document.addEventListener('pointerdown', event => {
    if(nav.classList.contains('ov3-nav-open') && !nav.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if(event.key === 'Escape' && nav.classList.contains('ov3-nav-open')){
      setOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if(window.innerWidth>760 && nav.classList.contains('ov3-nav-open')) setOpen(false);
  });
  nav.classList.add('ov3-menu-ready');
})();

/* Media kit CTA — integrates the brand dossier without changing the existing menu. */
(() => {
  'use strict';
  const partnerships = document.querySelector('#parcerias');
  if (!partnerships || partnerships.querySelector('[data-media-kit-entry]')) return;
  const locale = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
  const config = {
    pt: { label: 'Ver media kit para marcas', url: '/flavioguercio/media-kit.html' },
    en: { label: 'View brand media kit', url: '/flavioguercio/en/media-kit.html' },
    es: { label: 'Ver dossier comercial', url: '/flavioguercio/es/media-kit.html' }
  }[locale] || { label: 'Ver media kit para marcas', url: '/flavioguercio/media-kit.html' };
  const anchor = document.createElement('a');
  anchor.className = 'btn';
  anchor.textContent = config.label + ' ↗';
  anchor.href = config.url;
  anchor.dataset.mediaKitEntry = '1';
  anchor.dataset.ov2Event = 'media_kit';
  anchor.style.margin = '4px 0 24px';
  anchor.style.display = 'inline-block';
  const lead = partnerships.querySelector('.lead');
  if (lead) lead.insertAdjacentElement('afterend', anchor);
  else partnerships.prepend(anchor);
})();
