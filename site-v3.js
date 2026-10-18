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
