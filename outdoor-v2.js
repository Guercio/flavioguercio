/* Outdoor v2 enhancement for Guercio's existing GitHub Pages portfolio.
   No original images or athletic results are modified. No tracking until GA4 consent. */
(() => {
  'use strict';
  if (document.documentElement.dataset.outdoorV2 === '1') return;
  document.documentElement.dataset.outdoorV2 = '1';

  const COPY = {
    pt: {
      proofLabel: 'Resultados em destaque',
      proof: [
        ['Campeão norte-americano', 'Adventure racing · Gold Rush · 2016'],
        ['Vice-campeão brasileiro', 'Corrida de aventura · Malacara · 2025'],
        ['Campeão geral · 60 km', 'Insanity Mountain · Chapada dos Veadeiros · 2026']
      ],
      pitchEyebrow:'Valor para parceiros',
      pitchTitle:'Experiência real em campo. Conteúdo com identidade.',
      pitchText:'Trail running, aventura e multisport em ambientes reais. Uma trajetória competitiva que sustenta testes de produto, narrativa audiovisual e ações de comunidade.',
      pitchPills:['Testes em campo','Foto e vídeo outdoor','Eventos e comunidade'],
      pitchAction:'Conhecer possibilidades de parceria',
      usArchive:'Resultados adicionais nos Estados Unidos',
      usArchiveDescription:'Pódios e top 5 selecionados de trail running e ultratrail',
      otherArchive:'Outras competições internacionais',
      otherArchiveDescription:'Histórico complementar e classificações oficiais',
      showcaseEyebrow:'Atuação outdoor',
      showcaseTitle:'O território faz parte da história.',
      showcaseIntro:'Registros de ambientes e modalidades que definem o projeto. Fotografias originais, experiência de campo e repertório para colaborações autênticas.',
      showcase:[
        ['Trail e montanha','Travessias, resistência e leitura de terreno.'],
        ['Adventure racing','Equipes, expedições e desafios multidisciplinares.'],
        ['Água e multisport','Movimento em diferentes modalidades e ambientes.']
      ],
      showcaseAction:'Conversar sobre um projeto',
      privacy:'Política de privacidade',
      zoom:'Ampliar imagem'
    },
    en: {
      proofLabel:'Selected achievements',
      proof:[
        ['North American champion','Adventure racing · Gold Rush · 2016'],
        ['Brazilian runner-up','Adventure racing · Malacara · 2025'],
        ['Overall winner · 60 km','Insanity Mountain · Chapada dos Veadeiros · 2026']
      ],
      pitchEyebrow:'For brand partners',
      pitchTitle:'Real field experience. Distinctive storytelling.',
      pitchText:'Trail running, adventure and multisport in real outdoor environments. A competitive track record supporting field tests, visual storytelling and community activations.',
      pitchPills:['Field testing','Outdoor photo and video','Events and community'],
      pitchAction:'Explore partnership opportunities',
      usArchive:'More results from the United States',
      usArchiveDescription:'Selected trail and ultratrail podiums and top-five finishes',
      otherArchive:'Additional international races',
      otherArchiveDescription:'More results and official rankings',
      showcaseEyebrow:'Outdoor practice',
      showcaseTitle:'The landscape is part of the story.',
      showcaseIntro:'Scenes from the environments and disciplines that define the project. Original photographs, field experience and authentic collaboration opportunities.',
      showcase:[
        ['Trail and mountains','Traverses, endurance and technical terrain.'],
        ['Adventure racing','Teams, expeditions and multidisciplinary challenges.'],
        ['Water and multisport','Movement across sports and environments.']
      ],
      showcaseAction:'Discuss a project',
      privacy:'Privacy policy',
      zoom:'Enlarge image'
    },
    es: {
      proofLabel:'Logros destacados',
      proof:[
        ['Campeón norteamericano','Carreras de aventura · Gold Rush · 2016'],
        ['Subcampeón brasileño','Carreras de aventura · Malacara · 2025'],
        ['Ganador general · 60 km','Insanity Mountain · Chapada dos Veadeiros · 2026']
      ],
      pitchEyebrow:'Para marcas colaboradoras',
      pitchTitle:'Experiencia real en terreno. Contenido con identidad.',
      pitchText:'Trail running, aventura y multisport en entornos reales. Una trayectoria competitiva que respalda pruebas de producto, contenido audiovisual y actividades con la comunidad.',
      pitchPills:['Pruebas en terreno','Foto y vídeo outdoor','Eventos y comunidad'],
      pitchAction:'Explorar oportunidades de colaboración',
      usArchive:'Otros resultados en Estados Unidos',
      usArchiveDescription:'Podios y top 5 seleccionados de trail y ultratrail',
      otherArchive:'Otras competencias internacionales',
      otherArchiveDescription:'Trayectoria complementaria y clasificaciones oficiales',
      showcaseEyebrow:'Experiencia outdoor',
      showcaseTitle:'El territorio es parte de la historia.',
      showcaseIntro:'Imágenes de los entornos y disciplinas que definen este proyecto. Fotografías originales, experiencia en terreno y oportunidades de colaboración auténtica.',
      showcase:[
        ['Trail y montaña','Travesías, resistencia y terreno técnico.'],
        ['Carreras de aventura','Equipos, expediciones y desafíos multidisciplinarios.'],
        ['Agua y multisport','Movimiento entre deportes y entornos.']
      ],
      showcaseAction:'Hablemos de un proyecto',
      privacy:'Política de privacidad',
      zoom:'Ampliar imagen'
    }
  };

  const el = (tag, className, parent) => {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (parent) parent.appendChild(n);
    return n;
  };
  const t = (node, value) => { node.textContent = value; return node; };
  const currentLang = () => {
    const lang = (document.documentElement.lang || 'pt').slice(0, 2).toLowerCase();
    return COPY[lang] ? lang : 'pt';
  };
  const sections = Array.from(document.querySelectorAll('body > section'));
  const hero = document.querySelector('header.hero');
  const profile = document.querySelector('#perfil');
  const partnerships = document.querySelector('#parcerias');
  const contact = document.querySelector('#contato');

  let proof, pitch, showcase, archiveUSA, archiveOther, privacyLink;

  function makeProof() {
    if (!hero) return;
    proof = el('section','ov2-proof');
    proof.id = 'conquistas';
    const inner = el('div','ov2-inner',proof);
    const grid = el('div','ov2-proof-grid',inner);
    for (let i=0;i<3;i++) {
      const item=el('div','ov2-proof-item',grid);
      el('strong',null,item);
      el('span',null,item);
    }
    hero.insertAdjacentElement('afterend', proof);
  }
  function makePitch() {
    if (!profile) return;
    pitch = el('section','ov2-teaser');
    const inner=el('div','ov2-inner',pitch);
    const copy=el('div',null,inner);
    el('div','ov2-eyebrow',copy);
    el('h2',null,copy);
    el('p',null,copy);
    const link=el('a','ov2-action',copy);
    link.href='#parcerias';link.dataset.ov2Event='partnership_cta';
    el('div','ov2-pill-list',inner);
    profile.insertAdjacentElement('afterend',pitch);
  }
  function archiveSection(source, kind) {
    if (!source || source.tagName !== 'SECTION') return null;
    const wrapper=el('details','ov2-archive');
    const summary=el('summary',null,wrapper);
    const title=el('span',null,summary);
    el('strong','ov2-archive-title',title);
    el('span','ov2-archive-description',title);
    const content=el('div','ov2-archive-content',wrapper);
    source.parentNode.insertBefore(wrapper,source);
    content.appendChild(source);
    wrapper.dataset.ov2Event='archive_'+kind;
    wrapper.addEventListener('toggle',()=>{
      if (wrapper.open) analytics('portfolio_archive_open',{archive:kind});
    });
    return wrapper;
  }
  function makeShowcase() {
    if (!partnerships) return;
    showcase=el('section','ov2-showcase');
    showcase.id='portfolio-em-acao';
    const inner=el('div','ov2-inner',showcase);
    el('div','ov2-eyebrow',inner);
    el('h2',null,inner);
    el('p','ov2-intro',inner);
    const grid=el('div','ov2-showcase-grid',inner);
    const pictures=[
      {src:'images/trail.jpg',alt:'Travessia de montanha no Desolation Wilderness, Sierra Nevada'},
      {src:'images/boa2.jpg',alt:'Equipe de corrida de aventura em ação'},
      {src:'images/surfski.jpg',alt:'Flávio remando de surfski'}
    ];
    for(const pic of pictures){
      const card=el('figure','ov2-work-card',grid);
      const img=el('img',null,card);
      img.src=pic.src;img.alt=pic.alt;img.loading='lazy';img.decoding='async';
      const cap=el('figcaption',null,card);
      el('strong',null,cap);el('span',null,cap);
    }
    const action=el('a','ov2-action',inner);
    action.href='#contato';action.dataset.ov2Event='showcase_cta';
    partnerships.parentNode.insertBefore(showcase,partnerships);
  }
  function makePrivacyLink() {
    const footer=document.querySelector('footer .wrap') || document.querySelector('footer');
    if (!footer) return;
    privacyLink=el('a','ov2-privacy',footer);
    privacyLink.href='privacy.html';
  }
  function translate() {
    const d=COPY[currentLang()];
    if(proof){
      proof.setAttribute('aria-label',d.proofLabel);
      Array.from(proof.querySelectorAll('.ov2-proof-item')).forEach((item,i)=>{
        t(item.querySelector('strong'),d.proof[i][0]);
        t(item.querySelector('span'),d.proof[i][1]);
      });
    }
    if(pitch){
      t(pitch.querySelector('.ov2-eyebrow'),d.pitchEyebrow);
      t(pitch.querySelector('h2'),d.pitchTitle);
      t(pitch.querySelector('p'),d.pitchText);
      t(pitch.querySelector('a'),d.pitchAction+' ↗');
      const tags=pitch.querySelector('.ov2-pill-list');
      tags.replaceChildren();
      d.pitchPills.forEach(x=>t(el('span','ov2-pill',tags),x));
    }
    for(const [node,title,desc] of [
      [archiveUSA,d.usArchive,d.usArchiveDescription],
      [archiveOther,d.otherArchive,d.otherArchiveDescription]
    ]) {
      if (!node) continue;
      t(node.querySelector('.ov2-archive-title'),title);
      t(node.querySelector('.ov2-archive-description'),desc);
    }
    if(showcase){
      t(showcase.querySelector('.ov2-eyebrow'),d.showcaseEyebrow);
      t(showcase.querySelector('h2'),d.showcaseTitle);
      t(showcase.querySelector('.ov2-intro'),d.showcaseIntro);
      Array.from(showcase.querySelectorAll('figure')).forEach((f,i)=>{
        t(f.querySelector('strong'),d.showcase[i][0]);
        t(f.querySelector('span'),d.showcase[i][1]);
      });
      t(showcase.querySelector('a'),d.showcaseAction+' ↗');
    }
    if(privacyLink)privacyLink.textContent=d.privacy;
    document.querySelectorAll('img.zoom').forEach(img=>{
      img.setAttribute('aria-label',d.zoom+': '+(img.alt||''));
    });
  }
  function analytics(name,data) {
    // The existing consent script defines gtag only after opt-in.
    if (typeof window.gtag === 'function' && window['ga-disable-G-N1N9WRYGHK']!==true) {
      window.gtag('event',name,data||{});
    }
  }
  function improveAccessibilityAndLoading(){
    document.querySelectorAll('img').forEach(img=>{
      img.decoding='async';
      if(!img.closest('header.hero') && !img.hasAttribute('loading')) img.loading='lazy';
    });
    const heroImage=document.querySelector('header.hero img');
    if(heroImage){heroImage.loading='eager';heroImage.fetchPriority='high';}
    document.querySelectorAll('img.zoom').forEach(img=>{
      img.tabIndex=0;img.setAttribute('role','button');
      img.addEventListener('keydown',e=>{
        if(e.key==='Enter'||e.key===' '){e.preventDefault();img.click();}
      });
    });
  }
  function registerAnalyticsEvents(){
    document.addEventListener('click',event=>{
      const link=event.target.closest('a');
      if(!link)return;
      const href=link.getAttribute('href')||'';
      const method=href.startsWith('mailto:')?'email':href.includes('wa.me/')?'whatsapp':href.includes('instagram.com/')?'instagram':null;
      if(method && contact?.contains(link)) analytics('portfolio_contact_click',{contact_method:method});
      else if(link.classList.contains('rl')) analytics('portfolio_results_click',{link_destination:href});
      else if(link.dataset.ov2Event) analytics('portfolio_cta_click',{cta:link.dataset.ov2Event});
    });
  }

  makeProof();makePitch();
  // Index positions are from the audited original 12 direct-child sections.
  // Guard against future structural changes rather than wrapping the wrong section.
  if (sections.length===12){
    archiveUSA=archiveSection(sections[4],'us_results');
    archiveOther=archiveSection(sections[8],'other_international');
  }
  makeShowcase();makePrivacyLink();
  improveAccessibilityAndLoading();
  registerAnalyticsEvents();
  translate();
  document.querySelectorAll('.lang button').forEach(button=>{
    button.addEventListener('click',()=>Promise.resolve().then(translate));
  });
})();
