// ==========================================
    //  コンテンツデータ編集エリア (SLIDES_DATA)
    // ==========================================
    const SLIDES_DATA = [
        
        // --- 1. タイトルスライド ---
        {
            type: 'title',
            title: '体験はプレイ環境で起こる',
            intro: '',
            icon: 'fa-location-dot'
        },

        // --- 2. 今までのまとめ ---
        {
            type: 'list',
            title: '今までのまとめ',
            intro: '要点',
            items: [
                'ゲームデザイナーは、ゲームを通して体験を与える'
            ]
        },

        // --- 3. アジェンダ ---
        {
            type: 'list',
            title: '本日のポイント',
            intro: '',
            listClass: 'agenda-list',
            items: [
                '1. プレイ環境',
                '2. 私的な環境',
                '3. 公的な環境',
                '4. 中間の環境と「どこでも」'
            ]
        },

        // --- 4. 導入：場所の重要性 ---
        {
            type: 'quote',
            title: '場所の力',
            quote: '「私たちはどこにいるのか？」<br>この問いへの答えが、体験の質を劇的に変える',
            footer: '同じゲームでも、家で一人で遊ぶのと、大勢の友人と遊ぶのでは全く違う体験になる'
        },

        // --- 5. ---
{
            type: 'tiled-grid',
            title: '私的なプレイ環境',
            intro: 'リビング、作業場、寝室',
            tiles: [
                { icon: 'fa-family', title: 'リビング', text: '複数人で楽しめる、見て楽しむゲーム<br>歌ったり踊ったりできるゲーム' },
                { icon: 'fa-gamepad', title: '作業場', text: 'MMOなど一人で遊ぶ<br>難易度が高めで緊張感があり、1回のプレイに数時間を要するゲーム' },
                { icon: 'fa-bed', title: '寝室', text: '静かな部屋の隅で遊ぶ<br>簡単で単純で癒されるゲーム' }
            ]
        },

        // --- 6. ---
        {
            type: 'tiled-grid',
            title: '公共のプレイ環境',
            intro: '劇場、アリーナ、ミュージアム',
            tiles: [
                { icon: 'fa-users', title: '劇場', text: '大人数の人々が集まって一緒に何かを目撃する<br>誰かと一緒に体験を味わうことは、人をとても満足させる何かがある' },
                { icon: 'fa-bolt', title: 'アリーナ', text: 'リビングや寝室にいながら、アリーナの中にいる<br>どこかのプレイヤーが遊ぶ様子を、観戦する人が増え、仮想世界における劇場も増えている' },
                { icon: 'fa-users', title: 'ミュージアム', text: '普段目にしないものや、場所を考察する機会によって得られるものがある<br>ゲームセンターでの行動は、ミュージアムでの行動とよく似ている' }
            ]
        },

        // --- 7.  ---
        {
            type: 'tiled-grid',
            title: '半々のプレイ環境',
            intro: 'テーブル、遊び場、どこでも',
            tiles: [
                { icon: 'fa-users', title: 'テーブル', text: 'プレイヤー同士が向かい合うことで、特別な親密さが感じられる' },
                { icon: 'fa-bolt', title: '遊び場', text: '裏庭や道路、空き地など、子供が遊びのために集まるあらゆる空間が、遊び場になる' },
                { icon: 'fa-users', title: 'どこでも', text: 'バスや電車、職場や学校で数分の空き時間ができたときに向いている' }
            ]
        },

        // --- 8.  ---
        {
            type: 'quote',
            title: 'プレイ環境',
            quote: 'それぞれのプレイ環境とその性質を知ること<br>ゲームと技術は絶えず変化するが、プレイ環境はあまり変化しない',
            footer: ''
        },

        // --- 9.  ---
        {
            type: 'exercise',
            title: 'レンズ #3：プレイ環境',
            lensTitle: 'ゲームを遊ぶ場所はゲームデザインに大きな影響を与えます',
            questions: [
                '自分が作ろうとしているゲームに最もふさわしいプレイ環境はどこか？',
                '想定しているプレイ環境には、自分のゲームに影響を及ぽす特別な性質があるか？',
                'わたしのゲームの要素で、想定しているプレイ環境と親和性が高いものはどれか？逆に、違和感がありそうなものはどれか？',
            ]
        },

        // --- 10. 全体のまとめ ---
        {
            type: 'list',
            title: 'まとめ',
            intro: '場所が体験を形作る',
            items: [
                '技術は変わるが、プレイ環境の性質は普遍的',
                '私的環境は「没入と複雑さ」、公的環境は「興奮とシンプルさ」',
                '自分のゲームが遊ばれる「場所」を想像してデザインする'
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
