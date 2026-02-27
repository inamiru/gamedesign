<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GDB ポータル</title>

  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Zen+Maru+Gothic:wght@700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <!-- 既存の共通CSS（GDB_2から分離したやつ） -->
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div id="overlay"></div>
  <button id="mobile-menu-btn"><i class="fa-solid fa-bars"></i></button>

  <nav id="sidebar">
    <div class="sidebar-header">
      <h2><i class="fa-solid fa-layer-group"></i> 学年</h2>
      <button class="close-sidebar-btn" id="closeSidebar"><i class="fa-solid fa-xmark"></i></button>
    </div>

    <!-- 学年 -->
    <ul class="toc-list" id="gradeList"></ul>

    <!-- セッション一覧（学年クリックでここに出す） -->
    <div style="padding:10px 10px 20px; border-top:1px solid #EDF2F7;">
      <div style="font-weight:bold; color:var(--text-main); margin:10px 5px;">セッション</div>
      <ul class="toc-list" id="sessionList" style="padding:0 0 10px;"></ul>
    </div>
  </nav>

  <main id="main-wrapper">
    <div id="container" style="height:100%;">
      <!-- セッションをここに表示（iframe） -->
      <div class="slide active" style="padding:0; overflow:hidden;">
        <div style="width:100%; height:100%; position:relative;">
          <iframe
            id="sessionFrame"
            title="Session Viewer"
            src=""
            style="width:100%; height:100%; border:0; background:white;"
          ></iframe>
          <div class="progress-bar" id="progressBar" style="width:0%"></div>
        </div>
      </div>
    </div>
  </main>

  <script src="js/portal.js"></script>
</body>
</html>
