// js/sessions/manifest.js
// ==========================================
// カテゴリ（コース）単位でセッション順とリンク先を管理する
// - sessions[].path は「各セッションHTMLから見た相対パス」ではなく、
//   基本的に「そのセッションHTMLから見て動く形」を推奨（= ../XxxSession/）。
//   ただしカテゴリごとに構成が違う場合もここで自由に指定できる。
// ==========================================

window.SESSION_MANIFEST = {
  categories: [
    {
      // UXdesignカテゴリ
      categoryId: 'ux',
      title: 'UXdesign',
      // 「目次へ」ボタンの戻り先（セッションページから見てUXdesign/index.htmlのある場所）
      homeTitle: '体験のデザイン一覧 ',
      homePath: '../', // UXdesign/FirstSession/ から UXdesign/ へ戻る

      sessions: [
        { sessionId: 'ux-1', title: '第1回', path: '../FirstSession/' },
        { sessionId: 'ux-2', title: '第2回', path: '../SecondSession/' },
        { sessionId: 'ux-3', title: '第3回', path: '../ThirdSession/' },
        { sessionId: 'ux-4', title: '第4回', path: '../FourthSession/' },
        { sessionId: 'ux-5', title: '第5回', path: '../FifthSession/' },
        { sessionId: 'ux-6', title: '第6回', path: '../SixthSession/' },
        { sessionId: 'ux-7', title: '第7回', path: '../SeventhSession/' },
        { sessionId: 'ux-7', title: '第8回', path: '../EighthSession/' },
        { sessionId: 'ux-7', title: '第9回', path: '../NinthSession/' },
        
        // 追加するたびにここへ1行
        // { sessionId: 'ux-3', title: 'Third Session',  path: '../ThirdSession/' },
      ],
    },

    // 例：GameDesignカテゴリ（将来追加する場合のサンプル）
    // フォルダがまだ無ければ、このカテゴリブロック自体を消してOK
    /*
    {
      categoryId: 'gd',
      title: 'GameDesign',
      homeTitle: 'GameDesign 目次',
      homePath: '../', // GameDesign/Ch01/ から GameDesign/ へ
      sessions: [
        { sessionId: 'gd-1', title: 'Chapter 1', path: '../Ch01/' },
        { sessionId: 'gd-2', title: 'Chapter 2', path: '../Ch02/' },
      ],
    },
    */
  ],
};
