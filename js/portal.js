// ====== 設定：学年（コース）とセッションの定義 ======
// パスは「index.html（ルート）」から見た相対パス
const PORTAL_DATA = [
  {
    id: "uxdesign",
    title: "UXdesign",
    sessions: [
      { title: "First Session", path: "UXdesign/FirstSession/" },
      { title: "Second Session", path: "UXdesign/SecondSession/" },
    ],
  },
];

const gradeListEl = document.getElementById("gradeList");
const sessionListEl = document.getElementById("sessionList");
const frameEl = document.getElementById("sessionFrame");
const placeholderEl = document.getElementById("portalPlaceholder");

// ====== モバイルサイドバー開閉（GDB_2と同じ挙動） ======
(function initResponsiveUI() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("closeSidebar");

  const toggleMenu = () => {
    sidebar.classList.toggle("open");
    overlay.style.display = sidebar.classList.contains("open") ? "block" : "none";
  };

  openBtn.onclick = toggleMenu;
  closeBtn.onclick = toggleMenu;
  overlay.onclick = toggleMenu;
})();

// ====== UI描画 ======
let currentGradeIndex = 0;

function renderGrades() {
  gradeListEl.innerHTML = "";
  PORTAL_DATA.forEach((g, idx) => {
    const li = document.createElement("li");
    li.className = `toc-item ${idx === currentGradeIndex ? "active" : ""}`;
    li.innerHTML = `<span class="toc-num">${idx + 1}.</span> <span>${g.title}</span>`;
    li.onclick = () => selectGrade(idx);
    gradeListEl.appendChild(li);
  });
}

function renderSessions(gradeIndex) {
  sessionListEl.innerHTML = "";
  const sessions = PORTAL_DATA[gradeIndex].sessions;

  sessions.forEach((s, idx) => {
    const li = document.createElement("li");
    li.className = "toc-item";
    li.innerHTML = `<span class="toc-num">${idx + 1}.</span> <span>${s.title}</span>`;
    li.onclick = () => openSession(s.path);
    sessionListEl.appendChild(li);
  });
}

function selectGrade(idx) {
  currentGradeIndex = idx;
  renderGrades();
  renderSessions(idx);
}

function openSession(path) {
  // iframeで該当セッションを表示
  frameEl.src = path;

  // 表示切り替え
  if (placeholderEl) placeholderEl.style.display = "none";
  frameEl.style.display = "block";

  // モバイルならメニュー閉じる
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").style.display = "none";
  }
}

// 初期化
renderGrades();
selectGrade(0);

// 初期表示：最初のセッションを開きたいなら有効化
openSession(PORTAL_DATA[0].sessions[0].path);
