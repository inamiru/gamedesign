// js/renderer.js
// ==========================================
// 共通スライドレンダラ（GDB_2全対応） + manifest方式のセッション導線
// ==========================================

class SlideRenderer {
  constructor(containerId, sidebarId) {
    this.container = document.getElementById(containerId);
    this.tocList = document.getElementById(sidebarId);
    this.currentSlide = 0;
    this.slides = [];
    this.initResponsiveUI();
  }

  initResponsiveUI() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('closeSidebar');

    if (!sidebar || !overlay) return;

    const toggleMenu = () => {
      sidebar.classList.toggle('open');
      overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    };

    if (openBtn) openBtn.onclick = toggleMenu;
    if (closeBtn) closeBtn.onclick = toggleMenu;
    overlay.onclick = toggleMenu;
  }

  render(data) {
    if (!this.container || !this.tocList) {
      console.error('container/tocList が見つかりません');
      return;
    }

    this.slides = Array.isArray(data) ? data : [];
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

    this.addSlideNavigationUI();
    this.updateProgress();
  }

  getSlideHTML(s) {
    const type = s?.type || 'list';

    switch (type) {
      case 'title':
        return `
          <div class="title-slide" style="text-align:center;">
            <i class="fa-solid ${s.icon || 'fa-gamepad'}"
               style="font-size:5rem; color:var(--accent-pink); margin-bottom:30px;"></i>
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

  addSlideNavigationUI() {
    // 二重生成防止
    if (document.getElementById('prevBtn') || document.getElementById('nextBtn')) return;

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
      // 入力フォーム等があれば邪魔しない（将来用）
      const tag = (document.activeElement?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === 'ArrowRight' || e.key === ' ') this.changeSlide(1);
      if (e.key === 'ArrowLeft') this.changeSlide(-1);
    });
  }

  jumpToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const tocItems = document.querySelectorAll('.toc-item');

    if (!slides.length || !tocItems.length) return;
    if (index < 0 || index >= slides.length) return;

    slides[this.currentSlide]?.classList.remove('active');
    tocItems[this.currentSlide]?.classList.remove('active');

    this.currentSlide = index;

    slides[this.currentSlide]?.classList.add('active');
    tocItems[this.currentSlide]?.classList.add('active');

    if (slides[this.currentSlide]) slides[this.currentSlide].scrollTop = 0;
    tocItems[this.currentSlide]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    this.updateProgress();
  }

  changeSlide(dir) {
    this.jumpToSlide(this.currentSlide + dir);
  }

  updateProgress() {
    const bar = document.getElementById('progressBar');
    if (!bar || !this.slides.length) return;

    const pct = ((this.currentSlide + 1) / this.slides.length) * 100;
    bar.style.width = `${pct}%`;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) prevBtn.disabled = this.currentSlide === 0;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.slides.length - 1;
  }
}

// ==========================================
// セッション導線（manifest方式で自動生成）
// 期待するグローバル：
// - window.SESSION_MANIFEST = { homeTitle, homePath, sessions:[{id,title},...] }
// - window.SESSION_ID = 'first' など
// ==========================================

function buildSessionNavMetaFromManifest() {
  const mf = window.SESSION_MANIFEST;
  const myId = window.SESSION_ID;

  if (!mf || !Array.isArray(mf.sessions) || !myId) return null;

  const idx = mf.sessions.findIndex(s => s.id === myId);
  if (idx === -1) return null;

  const prev = mf.sessions[idx - 1] || null;
  const next = mf.sessions[idx + 1] || null;

  // id -> フォルダ名変換（例: third -> ThirdSession/）
  const folderOf = (id) => {
    const cap = id.charAt(0).toUpperCase() + id.slice(1);
    return `${cap}Session/`;
  };

  return {
    homeTitle: mf.homeTitle || '目次へ',
    homePath: mf.homePath || '../',

    prevTitle: prev?.title || '',
    prevPath: prev ? `../${folderOf(prev.id)}` : null,

    nextTitle: next?.title || '',
    nextPath: next ? `../${folderOf(next.id)}` : null,
  };
}

function addSessionNav(meta) {
  if (!meta) return;
  if (document.getElementById('sessionNav')) return;

  const nav = document.createElement('div');
  nav.id = 'sessionNav';
  nav.style.position = 'fixed';
  nav.style.top = '12px';
  nav.style.right = '12px';
  nav.style.zIndex = '1200';
  nav.style.display = 'flex';
  nav.style.gap = '10px';
  nav.style.flexWrap = 'wrap';

  const mkBtn = (label, href, iconClass) => {
    const a = document.createElement('a');
    a.href = href;
    a.style.textDecoration = 'none';
    a.style.display = 'inline-flex';
    a.style.alignItems = 'center';
    a.style.gap = '8px';
    a.style.padding = '10px 14px';
    a.style.borderRadius = '10px';
    a.style.background = 'var(--card-bg)';
    a.style.boxShadow = 'var(--shadow)';
    a.style.color = 'var(--text-main)';
    a.style.fontSize = '0.9rem';
    a.style.fontWeight = '700';

    const icon = document.createElement('i');
    icon.className = iconClass;
    a.appendChild(icon);

    const span = document.createElement('span');
    span.textContent = label;
    a.appendChild(span);

    return a;
  };

  if (meta.homePath) {
    nav.appendChild(mkBtn(meta.homeTitle || '目次へ', meta.homePath, 'fa-solid fa-list'));
  }
  if (meta.prevPath) {
    nav.appendChild(mkBtn(meta.prevTitle || '前へ', meta.prevPath, 'fa-solid fa-chevron-left'));
  }
  if (meta.nextPath) {
    nav.appendChild(mkBtn(meta.nextTitle || '次へ', meta.nextPath, 'fa-solid fa-chevron-right'));
  }

  document.body.appendChild(nav);
}

// ==========================================
// 起動
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  if (!window.SLIDES_DATA) {
    console.error('SLIDES_DATA が見つかりません（sessions/*.js の読み込み順を確認してください）');
    return;
  }

  const renderer = new SlideRenderer('container', 'tocList');
  renderer.render(window.SLIDES_DATA);

  // セッション導線（manifest方式）
  const meta = buildSessionNavMetaFromManifest();
  addSessionNav(meta);
});
