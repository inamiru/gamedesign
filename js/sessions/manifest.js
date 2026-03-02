// js/sessions/manifest.js
// セッションの並び順を「ここだけ」で管理
window.SESSION_MANIFEST = {
  homeTitle: '一覧へ',
  homePath: '../', // 各セッションHTML(UXdesign/XXSession/)から見てUXdesign/へ

  // 表示名と、セッションの「識別子（id）」を並べる
  sessions: [
    { id: 'first',  title: '第1回'  },
    { id: 'second', title: '第2回' },
    { id: 'third',  title: '第3回'  },
    { id: 'fourth', title: '第4回' },
  ]
};
