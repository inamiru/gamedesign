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
      // LevelDesignカテゴリ
      categoryId: 'ld',
      title: 'LevelDesign',
      // 「目次へ」ボタンの戻り先（セッションページから見てLevelDesign/index.htmlのある場所）
      homeTitle: 'レベルデザイン一覧 ',
      homePath: '../', // LevelDesign/FirstSession/ から LevelDesign/ へ戻る

      sessions: [
        { sessionId: 'ld-1', title: '第1回', path: '../FirstSession/' },
        
        // 追加するたびにここへ1行
        // { sessionId: 'ld-3', title: 'Third Session',  path: '../ThirdSession/' },
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
