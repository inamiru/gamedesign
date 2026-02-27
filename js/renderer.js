// js/renderer.js

class SlideRenderer {
  constructor(containerId, sidebarId) {
    this.container = document.getElementById(containerId);
    this.tocList = document.getElementById(sidebarId);
    this.currentSlide = 0;
    this.initResponsiveUI();
  }

  initResponsiveUI() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('closeSidebar');

    const toggleMenu = () => {
      sidebar.classList.toggle('open');
      overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    };

    if (openBtn) openBtn.onclick = toggleMenu;
    if (closeBtn) closeBtn.onclick = toggleMenu;
    if (overlay) overlay.onclick = toggleMenu;
  }

  render(data) {
    if (!this.container || !this.tocList) return;

    this.slides = data;
    this.currentSlide = 0;
    this.container.innerHTML = '';
    this.tocList.innerHTML = '';

    data.forEach((s, index) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;

      const pageNum = document.createElement('div');
      pageNum.className = 'slide-number';
      pageNum.innerText = `${index + 1} / ${data.length}`;

      slideDiv.innerHTML = this.getSlideHTML(s);
      slideDiv.appendChild(pageNum);
      this.container.appendChild(slideDiv);

      const li = document.createElement('li');
      li.className = `toc-item ${index === 0 ? 'active' : ''}`;
      li.onclick = () => this.jumpToSlide(index);

      const plainTitle = (s.title || '')
        .replace(/<br>/g, ' ')
        .replace(/<[^>]*>/g, '');

      li.innerHTML = `<span class="toc-num">${index + 1}.</span><span>${plainTitle}</span>`;
      this.tocList.appendChild(li);
    });

    this.addNavigation();
    this.updateProgress();
  }

  getSlideHTML(s) {
    switch (s.type) {
      case 'title':
        return `
          <div class="title-slide">
            <h1 class="slide-title">${s.title || ''}</h1>
            <p>${s.intro || ''}</p>
          </div>
        `;
      case 'list':
        return `
          <h2 class="slide-title">${s.title || ''}</h2>
          <ul class="${s.listClass || 'bullet-list'}">
            ${(s.items || []).map(i => `<li>${i}</li>`).join('')}
          </ul>
        `;
      default:
        return `<h2 class="slide-title">${s.title || ''}</h2>`;
    }
  }

  addNavigation() {
    const nav = document.createElement('div');
    nav.className = 'nav-buttons';
    nav.innerHTML = `
      <button class="nav-btn" id="prevBtn">←</button>
      <button class="nav-btn" id="nextBtn">→</button>
    `;
    this.container.appendChild(nav);

    document.getElementById('prevBtn').onclick = () => this.changeSlide(-1);
    document.getElementById('nextBtn').onclick = () => this.changeSlide(1);
  }

  jumpToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const tocItems = document.querySelectorAll('.toc-item');

    if (index < 0 || index >= slides.length) return;

    slides[this.currentSlide].classList.remove('active');
    tocItems[this.currentSlide].classList.remove('active');

    this.currentSlide = index;

    slides[this.currentSlide].classList.add('active');
    tocItems[this.currentSlide].classList.add('active');

    this.updateProgress();
  }

  changeSlide(dir) {
    this.jumpToSlide(this.currentSlide + dir);
  }

  updateProgress() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;
    bar.style.width = ((this.currentSlide + 1) / this.slides.length) * 100 + '%';
  }
}

/* ===============================
   セッション自動ナビ（manifest方式）
   =============================== */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.SLIDES_DATA) {
    console.error('SLIDES_DATA が見つかりません');
    return;
  }

  const renderer = new SlideRenderer('container', 'tocList');
  renderer.render(window.SLIDES_DATA);

  const navMeta = buildNavMetaFromManifest();
  if (navMeta) addSessionNav(navMeta);
});

function buildNavMetaFromManifest() {
  const mf = window.SESSION_MANIFEST;
  const myId = window.SESSION_ID;
  if (!mf || !myId) return null;

  const idx = mf.sessions.findIndex(s => s.id === myId);
  if (idx === -1) return null;

  const prev = mf.sessions[idx - 1];
  const next = mf.sessions[idx + 1];

  const folder = id =>
    id.charAt(0).toUpperCase() + id.slice(1) + 'Session/';

  return {
    homePath: mf.homePath || '../',
    prevPath: prev ? `../${folder(prev.id)}` : null,
    prevTitle: prev?.title,
    nextPath: next ? `../${folder(next.id)}` : null,
    nextTitle: next?.title
  };
}

function addSessionNav(meta) {
  const nav = document.createElement('div');
  nav.style.position = 'fixed';
  nav.style.top = '12px';
  nav.style.right = '12px';
  nav.style.display = 'flex';
  nav.style.gap = '8px';
  nav.style.zIndex = '1200';

  const btn = (label, href) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    a.style.padding = '8px 12px';
    a.style.background = '#fff';
    a.style.borderRadius = '8px';
    a.style.boxShadow = '0 4px 10px rgba(0,0,0,.15)';
    a.style.textDecoration = 'none';
    return a;
  };

  if (meta.homePath) nav.appendChild(btn('目次', meta.homePath));
  if (meta.prevPath) nav.appendChild(btn('← 前', meta.prevPath));
  if (meta.nextPath) nav.appendChild(btn('次 →', meta.nextPath));

  document.body.appendChild(nav);
}
