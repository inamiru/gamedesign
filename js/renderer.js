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
    if (!this.container || !this.tocList) {
      console.error('container/tocList が見つかりません');
      return;
    }

    this.slides = data || [];
    this.currentSlide = 0;
    this.container.innerHTML = '';
    this.tocList.innerHTML = '';

    this.slides.forEach((s, index) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;

      const pageNum = document.createElement('div');
      pageNum.className = 'slide-number';
      pageNum.innerText = `${index + 1} / ${this.slides.length}`;

      slideDiv.innerHTML = this.getSlideHTML(s);
      slideDiv.appendChild(pageNum);
      this.container.appendChild(slideDiv);

      const li = document.createElement('li');
      li.className = `toc-item ${index === 0 ? 'active' : ''}`;
      li.onclick = () => {
        this.jumpToSlide(index);
        if (window.innerWidth <= 768) {
          document.getElementById('sidebar')?.classList.remove('open');
          const overlay = document.getElementById('overlay');
          if (overlay) overlay.style.display = 'none';
        }
      };

      const rawTitle = (s.title ?? '').toString();
      const plainTitle = rawTitle.replace(/<br>/g, ' ').replace(/<[^>]*>/g, '');
      li.innerHTML = `<span class="toc-num">${index + 1}.</span> <span>${plainTitle}</span>`;
      this.tocList.appendChild(li);
    });

    this.addNavigation();
    this.updateProgress();
  }

  getSlideHTML(s) {
    const type = s.type || 'list';

    switch (type) {
      case 'title':
        return `
          <div class="title-slide" style="text-align:center;">
            <i class="fa-solid ${s.icon || 'fa-gamepad'}" style="font-size:5rem; color:var(--accent-pink); margin-bottom:30px;"></i>
            <h1 class="slide-title">${s.title || ''}</h1>
            <p>${s.intro || ''}</p>
          </div>`;

      case 'list': {
        const listClass = s.listClass || 'bullet-list';
        const items = (s.items || []).map(i => `<li>${i}</li>`).join('');
        return `
          <h2 class="slide-title">${s.title || ''}</h2>
          <p class="content-text">${s.intro || ''}</p>
          <ul class="${listClass}">${items}</ul>
          ${s.footer ? `<p style="text-align:center; opacity:0.8; margin-top:20px; max-width:800px;">${s.footer}</p>` : ''}`;
      }

      case 'tiled-grid': {
        const tilesHTML = (s.tiles || []).map(t => `
          <div class="card">
            <i class="fa-solid ${t.icon || 'fa-circle'}"></i>
            <h3>${t.title || ''}</h3>
            <p>${t.text || ''}</p>
          </div>`).join('');
        return `
          <h2 class="slide-title">${s.title || ''}</h2>
          <p class="content-text">${s.intro || ''}</p>
          <div class="tiled-grid">${tilesHTML}</div>`;
      }

      case 'quote':
        return `
          <h2 class="slide-title">${s.title || ''}</h2>
          <div class="quote-box"><blockquote>${s.quote || ''}</blockquote></div>
          ${s.footer ? `<p style="text-align:center; opacity:0.8; margin-top:20px; max-width:800px;">${s.footer}</p>` : ''}`;

      case 'exercise': {
        const qs = (s.questions || []).map(q => `<li>${q}</li>`).join('');
        return `
          <h2 class="slide-title">${s.title || ''}</h2>
          <div class="lens-box">
            <h3><i class="fa-solid fa-magnifying-glass"></i> ${s.lensTitle || ''}</h3>
            <ul>${qs}</ul>
          </div>`;
      }

      default:
        return `<h2 class="slide-title">${s.title || ''}</h2>`;
    }
  }

  addNavigation() {
    const navDiv = document.createElement('div');
    navDiv.className = 'nav-buttons';
    navDiv.innerHTML = `
      <button class="nav-btn" id="prevBtn"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="nav-btn" id="nextBtn"><i class="fa-solid fa-arrow-right"></i></button>
    `;
    this.container.appendChild(navDiv);

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.id = 'progressBar';
    this.container.appendChild(progressBar);

    document.getElementById('prevBtn').onclick = () => this.changeSlide(-1);
    document.getElementById('nextBtn').onclick = () => this.changeSlide(1);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') this.changeSlide(1);
      if (e.key === 'ArrowLeft') this.changeSlide(-1);
    });
  }

  jumpToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const tocItems = document.querySelectorAll('.toc-item');

    if (index >= 0 && index < slides.length) {
      slides[this.currentSlide]?.classList.remove('active');
      tocItems[this.currentSlide]?.classList.remove('active');

      this.currentSlide = index;

      slides[this.currentSlide]?.classList.add('active');
      tocItems[this.currentSlide]?.classList.add('active');

      if (slides[this.currentSlide]) slides[this.currentSlide].scrollTop = 0;
      tocItems[this.currentSlide]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      this.updateProgress();
    }
  }

  changeSlide(dir) {
    this.jumpToSlide(this.currentSlide + dir);
  }

  updateProgress() {
    const bar = document.getElementById('progressBar');
    if (!bar || !this.slides?.length) return;

    const pct = ((this.currentSlide + 1) / this.slides.length) * 100;
    bar.style.width = `${pct}%`;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) prevBtn.disabled = this.currentSlide === 0;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.slides.length - 1;
  }
}

// セッション側の data を読んで描画する入口
document.addEventListener('DOMContentLoaded', () => {
  if (!window.SLIDES_DATA) return;

  const renderer = new SlideRenderer('container', 'tocList');
  renderer.render(window.SLIDES_DATA);

  // ここが自動化ポイント
  const meta = buildNavMetaFromManifest();
  addSessionNav(meta);
});

function buildNavMetaFromManifest() {
  const mf = window.SESSION_MANIFEST;
  const myId = window.SESSION_ID;

  // manifestが無い or 自分のIDが無いなら、ナビ無しでOK
  if (!mf || !Array.isArray(mf.sessions) || !myId) return {};

  const idx = mf.sessions.findIndex(s => s.id === myId);
  if (idx === -1) return {};

  const prev = mf.sessions[idx - 1];
  const next = mf.sessions[idx + 1];

  // id -> フォルダ名（FirstSession など）に変換する関数
  const folderOf = (id) => {
    const cap = id.charAt(0).toUpperCase() + id.slice(1);
    return `${cap}Session/`;       // 例: third -> ThirdSession/
  };

  return {
    homeTitle: mf.homeTitle || '目次へ',
    homePath: mf.homePath || '../',

    prevTitle: prev?.title,
    prevPath: prev ? `../${folderOf(prev.id)}` : null,

    nextTitle: next?.title,
    nextPath: next ? `../${folderOf(next.id)}` : null,
  };
});
