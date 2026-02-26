<script>
// ==========================================
    //  コンテンツデータ編集エリア (SLIDES_DATA)
    // ==========================================
    const SLIDES_DATA = [
        
        // --- 1. タイトルスライド ---
        {
            type: 'title',
            title: 'CH2 | 体験を創り出す',
            intro: '',
            icon: 'fa-gamepad'
        },

        // --- 2. アジェンダ ---
        {
            type: 'list',
            title: '本日のポイント',
            intro: '',
            listClass: 'agenda-list',
            items: [
                '定義：体験を作る',
                'アプローチ：3つの視点',
                '武器：内観',
                '解決策：4つの分析法',
                '実践：体験の核'
            ]
        },

        // --- 3. ---
        {
            type: 'list',
            title: 'ゲームは体験ではない',
            intro: 'ゲームと体験の関係性',
            items: [
                'ゲームデザイナーが作るのは「ゲーム」ですが<br>プレイヤーが求めているのは「体験」です',
                'ゲームはただの媒介に過ぎません',
                '体験はプレイヤーの心の中で起こる個人的な出来事です'
            ]
        },

        // --- 4. ---
        {
            type: 'quote',
            title: 'ゲームの体験',
            quote: 'ゲームは体験ではない<br>ゲームは体験を可能にするものだが、体験そのものではない',
            footer: 'これがゲームデザインにおける最も難しい部分です<br>間接的にしかコントロールできないものを作らなければなりません'
        },

        // --- 5. ---
        {
            type: 'list',
            title: '体験の矛盾',
            intro: '同じゲームを遊んでも、人によって体験は異なります',
            items: [
                '体験は「主観」的なものであり、直接触れることも見ることもできません',
                '「体験そのもの」を作ることはできず、体験を生み出す「構造」しか作れません'
            ],
            footer: ''
        },

        // --- 6. ---
        {
            type: 'tiled-grid',
            title: '3つの視点',
            intro: 'ゲーム + プレイヤー = 体験',
            tiles: [
                {
                    icon: 'fa-gamepad',
                    title: 'ゲーム',
                    text: 'ルール、メカニクス、システム<br>体験を引き起こすための装置'
                },
                {
                    icon: 'fa-person',
                    title: 'プレイヤー',
                    text: '独自の感情、背景、スキルを持つ人間<br>体験の主体'
                },
                {
                    icon: 'fa-frog',
                    title: '体験',
                    text: 'ゲームとプレイヤーが出会い生まれる'
                }
            ]
        },

        // --- 7. 内観の重要性 ---
        {
            type: 'list',
            title: '内観',
            intro: '体験は目に見えないため、自分自身の体験を深く観察する「内観」が必要です',
            items: [
                '「なぜ私は今、楽しいと感じたのか？」',
                '「どの瞬間にイライラしたのか？」'
            ],
            footer: '自分の感情を分解する習慣が、目を養います'
        },

        // --- 8. 内観の危険性1 ---
        {
            type: 'tiled-grid',
            title: '内観の危険性 1',
            intro: '主観と現実',
            tiles: [
                {
                    icon: 'fa-scale-unbalanced',
                    title: '主観の罠',
                    text: '「自分が楽しい＝皆も楽しい」？'
                },
                {
                    icon: 'fa-person-falling',
                    title: '現実',
                    text: '自分の感情だけが唯一の現実'
                }
            ]
        },

        // --- 9. 内観の危険性2 ---
        {
            type: 'quote',
            title: '内観の危険性 2',
            quote: '自分の体験で正しいことも<br>他人の体験では正しくないかもしれない',
            footer: '人の趣味嗜好は人それぞれです<br>他人の声を聴きましょう'
        },

        // --- 10. ---
        {
            type: 'quote',
            title: '内観の目標',
            quote: 'どんな感情になり、何を考え、何をしたか<br>分析した内容を、明確に言葉で表現できること',
            footer: '感情は抽象的ですが、言葉は具体的です<br>自分が作りたいと思っている体験を、他人に伝えるためには、言葉による具体性が必要です'
        },

        // --- 11. レンズ1 ---
        {
            type: 'exercise',
            title: 'レンズ #1：喜怒哀楽',
            lensTitle: '意図したとおりに喜怒哀楽を作るために',
            questions: [
                'プレイヤーに体験してほしいのは、喜怒哀楽のどれか？<br>その理由は？',
                'プレイヤーは喜怒哀楽のどの状態でゲームを遊び始めるだろうか？<br>その理由は？',
                'そのときのプレイヤーの喜怒哀楽の状態から、<br>自分がプレイヤーに感じてほしいと思っている喜怒哀楽の状態に変えるには、<br>どうすればよいか？',
            ]
        },

        // --- 12. ---
        {
            type: 'tiled-grid',
            title: 'ハイゼンベルクの原理を克服する',
            intro: '自分の体験を観察しようとすると、その体験自体が変わってしまう（楽しくなくなる）',
            tiles: [
                {
                    icon: 'fa-brain',
                    title: '1. 記憶を分析する',
                    text: '体験が終わった直後に、<br>その記憶を思い出して分析する'
                },
                {
                    icon: 'fa-repeat',
                    title: '2. 2回やる',
                    text: '同じものを2回経験する'
                },
                {
                    icon: 'fa-stopwatch',
                    title: '3. チラ見',
                    text: '体験の途中に素早く自分の感情を観察する'
                },
                {
                    icon: 'fa-user-ninja',
                    title: '4. 静かに観察',
                    text: '体験している自分自身を客観的に観察する'
                },
            ]
        },

        // --- 13. 本質の重要性 ---
        {
            type: 'quote',
            title: '体験の核',
            quote: '記憶に残る体験には、何かしらの重要な特徴がある',
            footer: '実際の体験を完全に再現しなくても優れたゲームが作れます<br>必要なのは、ゲームで作ろうとしている「体験の核」をつかむことです'
        },

        // --- 14. 事例研究 ---
        {
            type: 'list',
            title: '体験の核の定義',
            intro: '実体験の記憶をたどると、さまざまなことが思い浮かぶはずです<br>そのうちのいくつかは、その体験に不可欠だと思う要素であるはずです',
            items: [
                'アートで表現する',
                'ルールを利用する',
            ],
            footer: '生み出したい体験を定義するための核となる要素を見つけ出し<br>ゲームデザインに組み込む方法を考え出すことです'
        },

        // --- 15. レンズ（演習） ---
        {
            type: 'exercise',
            title: 'レンズ #2：体験の核',
            lensTitle: 'プレイヤーの体験について考えます',
            questions: [
                'プレイヤーにどんな体験をして欲しいのか？',
                'その体験の核は何か？',
                'その核をゲームで表現するにはどうすれば良いか？',
            ]
        },

        // --- 16. 全体のまとめ ---
        {
            type: 'list',
            title: '第2章 まとめ',
            intro: '体験を創り出す',
            items: [
                'ゲームではなく体験を作る意識を持つ',
                '自分の感情を観察し、分析する',
                '体験の核となる感情を見極める'
            ]
        }
    ];
    // ==========================================
    //  データ編集エリア 終了
    // ==========================================

    // --- レンダリングロジック ---
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

            openBtn.onclick = toggleMenu;
            closeBtn.onclick = toggleMenu;
            overlay.onclick = toggleMenu;
        }

        render(data) {
            this.slides = data;
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
                li.onclick = () => {
                    this.jumpToSlide(index);
                    if (window.innerWidth <= 768) {
                        document.getElementById('sidebar').classList.remove('open');
                        document.getElementById('overlay').style.display = 'none';
                    }
                };
                
                let plainTitle = s.title.replace(/<br>/g, ' ').replace(/<[^>]*>/g, '');
                li.innerHTML = `<span class="toc-num">${index + 1}.</span> <span>${plainTitle}</span>`;
                this.tocList.appendChild(li);
            });

            this.addNavigation();
            this.updateProgress();
        }

        getSlideHTML(s) {
            switch (s.type) {
                case 'title':
                    return `
                        <div class="title-slide" style="text-align:center;">
                            <i class="fa-solid ${s.icon}" style="font-size:5rem; color:var(--accent-pink); margin-bottom:30px;"></i>
                            <h1 class="slide-title">${s.title}</h1>
                            <p>${s.intro}</p>
                        </div>`;
                case 'list':
                    const listClass = s.listClass || 'bullet-list';
                    const items = s.items.map(i => `<li>${i}</li>`).join('');
                    return `
                        <h2 class="slide-title">${s.title}</h2>
                        <p class="content-text">${s.intro}</p>
                        <ul class="${listClass}">${items}</ul>`;
                case 'tiled-grid':
                    const tilesHTML = s.tiles.map(t => `
                        <div class="card">
                            <i class="fa-solid ${t.icon}"></i>
                            <h3>${t.title}</h3>
                            <p>${t.text}</p>
                        </div>`).join('');
                    return `
                        <h2 class="slide-title">${s.title}</h2>
                        <p class="content-text">${s.intro}</p>
                        <div class="tiled-grid">${tilesHTML}</div>`;
                case 'quote':
                    return `
                        <h2 class="slide-title">${s.title}</h2>
                        <div class="quote-box"><blockquote>${s.quote}</blockquote></div>
                        <p style="text-align:center; opacity:0.8; margin-top:20px; max-width:800px;">${s.footer}</p>`;
                case 'exercise':
                    const qs = s.questions.map(q => `<li>${q}</li>`).join('');
                    return `
                        <h2 class="slide-title">${s.title}</h2>
                        <div class="lens-box">
                            <h3><i class="fa-solid fa-magnifying-glass"></i> ${s.lensTitle}</h3>
                            <ul>${qs}</ul>
                        </div>`;
                default:
                    return `<h2>${s.title}</h2>`;
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
                if(e.key === 'ArrowRight' || e.key === ' ') this.changeSlide(1);
                if(e.key === 'ArrowLeft') this.changeSlide(-1);
            });
        }

        jumpToSlide(index) {
            const slides = document.querySelectorAll('.slide');
            const tocItems = document.querySelectorAll('.toc-item');

            if (index >= 0 && index < slides.length) {
                slides[this.currentSlide].classList.remove('active');
                tocItems[this.currentSlide].classList.remove('active');
                
                this.currentSlide = index;
                
                slides[this.currentSlide].classList.add('active');
                tocItems[this.currentSlide].classList.add('active');
                
                slides[this.currentSlide].scrollTop = 0;
                
                tocItems[this.currentSlide].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                this.updateProgress();
            }
        }

        changeSlide(dir) {
            this.jumpToSlide(this.currentSlide + dir);
        }

        updateProgress() {
            const bar = document.getElementById('progressBar');
            if (!bar) return;
            
            const pct = ((this.currentSlide + 1) / this.slides.length) * 100;
            bar.style.width = `${pct}%`;
            
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if(prevBtn) prevBtn.disabled = this.currentSlide === 0;
            if(nextBtn) nextBtn.disabled = this.currentSlide === this.slides.length - 1;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        new SlideRenderer('container', 'tocList').render(SLIDES_DATA);
    });
</script>
