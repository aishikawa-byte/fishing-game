/* ===================================================
   Ver 3.2.1  コンプリート演出（celebrate32.js）
   ---------------------------------------------------
   ① エリアコンプリート演出   … 図鑑のエリアを全部そろえた瞬間に出る、全画面の豪華演出
        areaCelebrate(エリアのキー, エリア名)  ※ script.js の「エリアコンプリート判定」から呼ばれます
        ・エリアごとの色の光／回転する光線／花火／そのエリアの生き物がぐるっと集合／「制覇」スタンプ
   ② 殿堂入り演出（全実績達成）… showClearModal() を、花火・王冠・トロフィー・スタッフロール風の
        メッセージつきの演出に差しかえ
   ・花火の描画は fireworks() にまとめています。色や数を変えたいときはここだけ触れば大丈夫です。
   ・設定の「省電力モード」がONのときは、粒の数をへらします。画面をタップするとスキップできます。
   =================================================== */
(function () {
    const byId = (id) => document.getElementById(id);
    const reduce = () => !!(window.advGet && window.advGet('saver'));
    const timers = [];
    const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.push(t); return t; };
    const clearTimers = () => { while (timers.length) clearTimeout(timers.pop()); };

    /* ---------- 色 ---------- */
    const THEME = { sea: '#3aa0ff', river: '#4fd1c5', swamp: '#7bb661', lake: '#6ea8ff', snow: '#bfe9ff', underground: '#b58cff', deepsea: '#2a6bff', volcano: '#ff6a3a', honey: '#ffc83a', holy: '#fff2a8', ryugu: '#ff7fbf', ruins: '#d2a679', poison: '#b04fd0', milkyway: '#8aa0ff', eldorado: '#ffd700', shinju: '#ff5fa8' };
    const themeOf = (k) => THEME[k] || THEME[String(k).replace(/\d+$/, '')] || '#ffd700';

    /* ---------- 音（やわらかい鐘のファンファーレ） ---------- */
    // 以前の「四角い波」は耳にきつかったので、鐘（サイン波＋倍音）とやさしい和音だけで作り直しました。
    // 使う音はすべて ドミソ系（C・F・G の和音）なので、重なってもにごりません。
    const NOTE = { C4: 262, E4: 330, F4: 349, G4: 392, A4: 440, B4: 494, C5: 523, D5: 587, E5: 659, F5: 698, G5: 784, A5: 880, C6: 1047, D6: 1175, E6: 1319, G6: 1568 };
    function ctxOut() {
        try {
            if (typeof soundEnabled !== 'undefined' && !soundEnabled) return null;
            if (typeof initAudio === 'function') initAudio();
            if (typeof audioCtx === 'undefined' || !audioCtx) return null;
            return { c: audioCtx, out: (typeof seOut === 'function') ? seOut() : audioCtx.destination };
        } catch (e) { return null; }
    }
    function tone(A, type, f, t, len, vol, attack) {
        const o = A.c.createOscillator(), g = A.c.createGain();
        o.type = type; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + (attack || 0.012));
        g.gain.exponentialRampToValueAtTime(0.0001, t + len);
        o.connect(g); g.connect(A.out); o.start(t); o.stop(t + len + 0.05);
    }
    const bell = (A, f, t, len, vol) => { tone(A, 'sine', f, t, len, vol); tone(A, 'sine', f * 2, t, len * 0.6, vol * 0.28); tone(A, 'sine', f * 3, t, len * 0.3, vol * 0.1); };
    const pad = (A, fs, t, len, vol) => fs.forEach(f => tone(A, 'sine', f, t, len, vol, 0.12));
    function thud() {
        const A = ctxOut(); if (!A) return;
        const t = A.c.currentTime + 0.01, o = A.c.createOscillator(), g = A.c.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(48, t + 0.3);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.32, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
        o.connect(g); g.connect(A.out); o.start(t); o.stop(t + 0.42);
    }
    let lastPop = 0;
    function pop() {                         // 花火が開く、やさしい「ぱん」＋きらめき
        const A = ctxOut(); if (!A) return;
        const now = Date.now(); if (now - lastPop < 380) return; lastPop = now;
        const t = A.c.currentTime + 0.01, n = A.c.sampleRate * 0.16, buf = A.c.createBuffer(1, n, A.c.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3);
        const src = A.c.createBufferSource(), lp = A.c.createBiquadFilter(), g = A.c.createGain();
        src.buffer = buf; lp.type = 'lowpass'; lp.frequency.value = 900; g.gain.value = 0.09;
        src.connect(lp); lp.connect(g); g.connect(A.out); src.start(t);
        const P = [NOTE.E6, NOTE.G6, NOTE.D6, NOTE.C6, NOTE.G5];
        bell(A, P[Math.floor(Math.random() * P.length)], t + 0.04, 0.9, 0.05);
    }
    function fanfare(grand) {
        const A = ctxOut(); if (!A) return;
        const t0 = A.c.currentTime + 0.05;
        if (!grand) {                                              // エリアコンプリート：のぼる4音 → 明るい和音
            [NOTE.C5, NOTE.E5, NOTE.G5, NOTE.C6].forEach((f, i) => bell(A, f, t0 + i * 0.13, 1.1, 0.13));
            pad(A, [NOTE.C5, NOTE.E5, NOTE.G5], t0 + 0.55, 1.8, 0.05);
            bell(A, NOTE.E6, t0 + 0.6, 1.6, 0.11); bell(A, NOTE.G6, t0 + 0.75, 1.8, 0.08);
        } else {                                                   // 殿堂入り：ドミソ → ファ → ソ → ドの王道進行
            [NOTE.C5, NOTE.E5, NOTE.G5, NOTE.C6, NOTE.E6].forEach((f, i) => bell(A, f, t0 + i * 0.12, 1.2, 0.12));
            const ch = [[[NOTE.C5, NOTE.E5, NOTE.G5], 0.9], [[NOTE.F4, NOTE.A4, NOTE.C5, NOTE.F5], 1.6], [[NOTE.G4, NOTE.B4, NOTE.D5, NOTE.G5], 2.3], [[NOTE.C5, NOTE.E5, NOTE.G5, NOTE.C6], 3.0]];
            ch.forEach(([fs, d], i) => { pad(A, fs, t0 + d, i === 3 ? 3.2 : 0.9, 0.055); bell(A, fs[fs.length - 1] * (i === 3 ? 2 : 1), t0 + d, i === 3 ? 2.6 : 1.0, 0.1); });
            bell(A, NOTE.G6, t0 + 3.2, 2.4, 0.08);
        }
    }

    /* ---------- 花火 ---------- */
    function fireworks(host, opts) {
        opts = opts || {};
        const cv = document.createElement('canvas');
        cv.className = 'cel-canvas';
        const r = host.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
        const W = Math.max(200, r.width), H = Math.max(300, r.height);
        cv.width = W * dpr; cv.height = H * dpr; cv.style.width = '100%'; cv.style.height = '100%';
        host.appendChild(cv);
        const x = cv.getContext('2d'); x.scale(dpr, dpr);
        let ps = [], alive = true, last = 0, nextAt = 0;
        const hues = opts.hues || [45, 0, 200, 300, 120];
        const rnd = (a, b) => a + Math.random() * (b - a);
        function burst(cx, cy, hue, n) {
            n = n || (reduce() ? 26 : 60);
            for (let i = 0; i < n; i++) {
                const a = Math.PI * 2 * i / n + rnd(-.05, .05), s = rnd(60, 190) * (Math.random() < .3 ? .5 : 1);
                ps.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0, max: rnd(.9, 1.6), hue: hue + rnd(-12, 12), sz: rnd(1.6, 3.2) });
            }
            ps.push({ ring: true, x: cx, y: cy, life: 0, max: .5, hue });
            if (!opts.silent) pop();
        }
        function frame(t) {
            if (!alive) return;
            if (!cv.isConnected) { alive = false; return; }
            const dt = Math.min(.05, last ? (t - last) / 1000 : .016); last = t;
            x.clearRect(0, 0, W, H);
            x.globalCompositeOperation = 'lighter';
            if (opts.auto !== false && t > nextAt) {
                burst(rnd(W * .12, W * .88), rnd(H * .12, H * .55), hues[Math.floor(Math.random() * hues.length)]);
                nextAt = t + rnd(280, 700) * (reduce() ? 2 : 1);
            }
            ps = ps.filter(p => (p.life += dt) < p.max);
            ps.forEach(p => {
                const k = 1 - p.life / p.max;
                if (p.ring) { x.strokeStyle = `hsla(${p.hue},100%,75%,${k * .6})`; x.lineWidth = 3; x.beginPath(); x.arc(p.x, p.y, 12 + (1 - k) * 60, 0, 7); x.stroke(); return; }
                p.vy += 90 * dt; p.vx *= .985; p.vy *= .985;
                p.x += p.vx * dt; p.y += p.vy * dt;
                x.fillStyle = `hsla(${p.hue},100%,${60 + k * 20}%,${k})`;
                x.beginPath(); x.arc(p.x, p.y, p.sz * (.6 + k * .6), 0, 7); x.fill();
            });
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
        return { burst, stop() { alive = false; cv.remove(); }, size: () => [W, H] };
    }

    /* ---------- ① エリアコンプリート ---------- */
    let areaFx = null, areaBusy = false;
    const areaQueue = [];
    function closeArea() {
        const o = byId('area-celebrate'); if (o) o.remove();
        clearTimers(); if (areaFx) { areaFx.stop(); areaFx = null; }
        areaBusy = false;
        if (areaQueue.length) { const n = areaQueue.shift(); later(() => window.areaCelebrate(n[0], n[1]), 350); }
    }
    window.areaCelebrate = function (key, name) {
        if (areaBusy) { areaQueue.push([key, name]); return; }
        areaBusy = true;
        const host = document.body;
        const col = themeOf(key);
        const list = (typeof FISH_DATA !== 'undefined' ? FISH_DATA : []).filter(f => f.location === key);
        const o = document.createElement('div');
        o.id = 'area-celebrate'; o.style.setProperty('--c', col);
        const ring = list.slice().sort(() => Math.random() - .5).slice(0, 14);
        o.innerHTML = `<div class="cel-dim"></div><div class="cel-rays"></div><div class="cel-glow"></div>
            <div class="cel-fishring">${ring.map((f, i) => `<img src="${f.image}" alt="" style="--a:${(360 / ring.length) * i}deg;animation-delay:${i * .07}s">`).join('')}</div>
            <div class="cel-center">
                <div class="cel-small">AREA COMPLETE!</div>
                <div class="cel-name">${name || ''}</div>
                <div class="cel-count">図鑑 ${list.length} / ${list.length} しゅ　ぜんぶ発見！</div>
                <div class="cel-stamp">制覇</div>
            </div>
            <div class="cel-tap">タップでとじる</div>`;
        host.appendChild(o);
        areaFx = fireworks(o, { hues: [Math.round(hueOf(col)), 45, hueOf(col) + 40] });
        o.addEventListener('click', () => { if (o._ok) closeArea(); });
        later(() => { o._ok = true; }, 1600);
        later(closeArea, 9000);
        fanfare(false);
        later(() => { try { shake && shake(); } catch (e) { } thud(); }, 650);      // スタンプが押される瞬間
        later(() => { if (areaFx) { const [W, H] = areaFx.size(); areaFx.burst(W / 2, H * .42, hueOf(col), 90); } }, 700);
    };
    function hueOf(hex) {
        const n = parseInt(hex.slice(1), 16), r = (n >> 16) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255;
        const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
        if (!d) return 45;
        const h = mx === r ? ((g - b) / d) % 6 : (mx === g ? (b - r) / d + 2 : (r - g) / d + 4);
        return (h * 60 + 360) % 360;
    }

    /* ---------- ② 殿堂入り ---------- */
    let hofFx = null;
    function stopHof() { clearTimers(); if (hofFx) { hofFx.stop(); hofFx = null; } }
    const fmtH = (s) => `${Math.floor((s || 0) / 3600)}時間${Math.floor((s || 0) % 3600 / 60)}分`;
    window.showClearModal = function (again) {
        stopHof();
        let m = byId('clear-modal');
        if (!m) { m = document.createElement('div'); m.className = 'modal'; m.id = 'clear-modal'; }
        if (m.parentNode !== document.body) document.body.appendChild(m);       // 画面全体に出すため、body 直下に置く
        const p = playerData, ach = (typeof ACHIEVEMENT_DATA !== 'undefined') ? Object.keys(ACHIEVEMENT_DATA).length : 0;
        const got = Object.keys(caughtFish || {}).filter(k => caughtFish[k] && caughtFish[k].unlocked).length;
        const lines = [
            `すべての実績（${ach}こ）を達成しました！`,
            `プレイ時間　${fmtH(p.playTimeSeconds)}`,
            `つかまえた数　${Number((p.totalCatches || 0) + (p.netCatches || 0)).toLocaleString()} 匹`,
            `図鑑に載った生き物　${got} しゅ`,
            `あなたはもう、立派な「釣り神」です。`,
            `ここまで遊んでくれて、本当にありがとう！`
        ];
        const trophies = Array.from({ length: 12 }, (_, i) => `<img src="images/trophy/trophy_gold.png" alt="" style="--a:${i * 30}deg;animation-delay:${i * .08}s">`).join('');
        m.innerHTML = `<div class="hof-bg"></div><div class="cel-rays hof-rays"></div><div class="hof-pillar"></div>
            <div class="hof-ring">${trophies}</div>
            <div class="hof-crown">👑</div>
            <div class="clear-title hof-title">${(window.tr ? tr('殿堂入り') : '殿堂入り').split('').map((c, i) => `<span style="animation-delay:${1.1 + i * .18}s">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</div>
            <div class="clear-sub hof-sub">爆釣一閃の伝説</div>
            <div class="hof-credits">${lines.map(() => '<div></div>').join('')}</div>
            <div class="clear-reward hof-reward">${again ? '殿堂入りの証：メニューが金色に輝いています' : '🎁 ごほうび +100,000G<br>✨ 殿堂入りの証：メニューが金色に！'}</div>
            <button class="btn hof-close" type="button">閉じる</button>`;
        m.style.display = 'flex';
        const cr = m.querySelector('.hof-credits').children;
        hofFx = fireworks(m, { hues: [45, 20, 340, 200, 120, 280], silent: true });      // 殿堂入りの画面は、音なし
        later(() => { try { shake && shake(); } catch (e) { } }, 900);
        later(() => { if (hofFx) { const [W, H] = hofFx.size(); hofFx.burst(W / 2, H * .3, 45, 120); } }, 1000);
        let at = 3300;
        lines.forEach((t, i) => { later(() => { cr[i].textContent = t; cr[i].className = 'on'; }, at); at += 1200; });
        const showEnd = () => { const r = m.querySelector('.hof-reward'), b = m.querySelector('.hof-close'); if (r) r.classList.add('on'); if (b) b.classList.add('on'); };
        later(showEnd, at + 200);
        m.onclick = (e) => {            // タップで一気に表示
            if (e.target.closest('.hof-close')) return;
            lines.forEach((t, i) => { cr[i].textContent = t; cr[i].className = 'on'; }); showEnd();
        };
        m.querySelector('.hof-close').onclick = (e) => { e.stopPropagation(); closeClearModal(); };
    };
    if (typeof window.closeClearModal === 'function') {
        const _c = window.closeClearModal;
        window.closeClearModal = function () { stopHof(); return _c.apply(this, arguments); };
    }

    /* ---------- メインメニュー：エリア制覇メダル ---------- */
    // メニューのステータス欄に、制覇したエリアの数と、エリアごとのメダルを表示します（制覇するほど光が増えます）。
    function renderMedals() {
        const box = document.querySelector('.menu-status-box'); if (!box || typeof zukanAreaKeys !== 'function') return;
        let m = byId('menu-medals');
        if (!m) { m = document.createElement('div'); m.id = 'menu-medals'; box.appendChild(m); }
        let keys = []; try { keys = zukanAreaKeys().filter(k => !/^(all)$/.test(k)); } catch (e) { return; }
        const done = keys.filter(k => { try { return areaDone(k); } catch (e) { return false; } });
        const sig = done.join(',') + '/' + keys.length;
        if (m.dataset.sig === sig) return; m.dataset.sig = sig;
        m.classList.toggle('all', done.length === keys.length && keys.length > 0);
        m.innerHTML = `<div class="mm-head">🏅 エリア制覇 ${done.length} / ${keys.length}</div><div class="mm-dots">${keys.map(k => { const d = done.includes(k); return `<i class="${d ? 'on' : ''}" style="--c:${themeOf(k)}" title="${(typeof areaLabel === 'function' ? areaLabel(k) : k).replace(/"/g, '')}"></i>`; }).join('')}</div>`;
    }
    if (typeof window.updateMenuUI === 'function') {
        const _u = window.updateMenuUI;
        window.updateMenuUI = function () { const r = _u.apply(this, arguments); try { renderMedals(); } catch (e) { } return r; };
    }
    window.zukanAreaDoneC = (function () { let c = null; return function (k) { if (!c) { c = {}; setTimeout(() => { c = null; }, 0); } if (!(k in c)) { try { c[k] = areaDone(k); } catch (e) { c[k] = false; } } return c[k]; }; })();
})();
