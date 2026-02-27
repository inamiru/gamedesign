// js/sessions/manifest.js
// セッションの並び順を「ここだけ」で管理
window.SESSION_MANIFEST = {
  homeTitle: '目次へ',
  homePath: '../', // 各セッションHTML(UXdesign/XXSession/)から見てUXdesign/へ

  // 表示名と、セッションの「識別子（id）」を並べる
  sessions: [
    { id: 'first',  title: 'First Session'  },
    { id: 'second', title: 'Second Session' },
    { id: 'third',  title: 'Third Session'  },
    { id: 'fourth', title: 'Fourth Session' },
  ]
};
