/* ===================================================
   Ver 3.2.1  あそびやすさの追加機能（qol321.js）
   ---------------------------------------------------
   ① 初回の「かんたん設定」（文字の大きさ・音量・難易度）
   ② バックアップのおすすめ（7日に1回、控えめに）
   ③ 新しいバージョンのおしらせ（更新があれば再読み込みをすすめる）
   ④ 操作補助（釣りの判定をゆるく）／つまずき救済（ミニゲームに3回続けて失敗 → 次はやさしく）
   ⑤ 大きな買い物の確認（1万G以上）
   ⑥ 連続ログインボーナス／お天気・ミニゲーム・ゴミのミッションを追加
   ⑦ 結果画面の「📷 画像を保存・共有」
   ⑧ 統計画面／不具合報告用の情報コピー／省電力モード
   ・設定の値は settings32.js の advGet('キー') で読めます。
   =================================================== */
(function () {
    const get = (k) => (window.advGet ? window.advGet(k) : undefined);
    const byId = (id) => document.getElementById(id);
    const sayAlert = (m, o) => (window.gameAlert ? gameAlert(m, o) : Promise.resolve());

    /* ---------- 起きたエラーを覚えておく（不具合報告用） ---------- */
    const errs = [];
    window.addEventListener('error', (e) => { errs.push(String(e.message || e).slice(0, 120) + (e.lineno ? ` @${(e.filename || '').split('/').pop()}:${e.lineno}` : '')); if (errs.length > 5) errs.shift(); });
    window.addEventListener('unhandledrejection', (e) => { errs.push('Promise: ' + String(e.reason).slice(0, 100)); if (errs.length > 5) errs.shift(); });

    /* ---------- ① 初回のかんたん設定 ---------- */
    const FIRST_KEY = 'osakana_first_done';
    const firstDone = () => { try { return !!localStorage.getItem(FIRST_KEY); } catch (e) { return true; } };
    function showFirstSetup() {
        if (byId('first-setup')) return;
        const d = document.createElement('div');
        d.id = 'first-setup';
        d.innerHTML = `<div class="fs-card"><div class="fs-title">🎣 はじめに かんたん設定</div>
            <div class="fs-sub">あとから「設定」でいつでも変えられます。</div>
            <div class="fs-row"><span>文字の大きさ</span><div class="vol-seg adv-seg" id="fs-ts"></div></div>
            <div class="fs-row"><span>音の大きさ</span><div class="vol-seg adv-seg" id="fs-vol"></div></div>
            <div class="fs-row"><span>むずかしさ</span><div class="vol-seg adv-seg" id="fs-diff"></div></div>
            <button class="btn fs-ok" type="button">はじめる！</button></div>`;
        (byId('game-container') || document.body).appendChild(d);
        const mk = (id, opts, onPick, cur) => {
            const box = byId(id);
            opts.forEach(([v, label]) => {
                const b = document.createElement('button'); b.textContent = label; b.dataset.v = String(v);
                b.onclick = () => { onPick(v); Array.from(box.children).forEach(x => x.classList.toggle('on', x === b)); try { playSE('tap'); } catch (e) { } };
                box.appendChild(b);
            });
            Array.from(box.children).forEach(x => x.classList.toggle('on', x.dataset.v === String(cur)));
        };
        mk('fs-ts', [['small', '小'], ['normal', 'ふつう'], ['large', '大'], ['xl', '特大']], (v) => window.advSet({ ts: v }), get('ts') || 'normal');
        const volNow = (typeof seLevel !== 'undefined') ? seLevel : 4;
        mk('fs-vol', [[0, '🔇'], [2, '小'], [4, 'ふつう'], [5, '大']], (v) => { if (typeof setVolLevel === 'function') { setVolLevel('bgm', v); setVolLevel('se', v); } }, [0, 2, 4, 5].includes(volNow) ? volNow : 4);
        mk('fs-diff', [['easy', 'かんたん'], ['normal', 'ふつう'], ['hard', 'むずかしい']], (v) => { if (typeof setDifficulty === 'function') setDifficulty(v); }, (typeof diffKey === 'function') ? diffKey() : 'normal');
        d.querySelector('.fs-ok').onclick = () => { try { localStorage.setItem(FIRST_KEY, '1'); } catch (e) { } d.remove(); try { playSE('success'); } catch (e) { } };
    }

    /* ---------- ② バックアップのおすすめ ---------- */
    const DAY = 86400000;
    function maybeBackupAsk() {
        if (get('backupRemind') === false) return;
        const p = (typeof playerData !== 'undefined' ? playerData : null) || {};
        if ((p.totalCatches || 0) + (p.netCatches || 0) < 20) return;
        let last = 0, asked = 0;
        try { last = Number(localStorage.getItem('osakana_backup_at') || 0); asked = Number(localStorage.getItem('osakana_backup_ask_at') || 0); } catch (e) { return; }
        const now = Date.now();
        if (now - last < 7 * DAY || now - asked < 7 * DAY) return;
        try { localStorage.setItem('osakana_backup_ask_at', String(now)); } catch (e) { }
        gameConfirm((last ? '前回のバックアップから、7日以上たちました。' : 'まだバックアップをしていません。') + '\nブラウザのデータを消すと、セーブデータもなくなります。\nいま、バックアップコードをコピーしておきますか？', { yes: 'バックアップする', no: 'あとで' })
            .then(ok => { if (ok && window.advBackupCopy) advBackupCopy(); });
    }

    /* ---------- ③ 新しいバージョンのおしらせ ---------- */
    let pendingUpdate = false;
    function updateReady() { pendingUpdate = true; }
    function maybeUpdateAsk() {
        if (!pendingUpdate) return;
        pendingUpdate = false;
        gameConfirm('新しいバージョンが用意できました。\nいま、再読み込みして新しくしますか？\n（セーブデータは消えません）', { yes: '再読み込みする', no: 'あとで' })
            .then(ok => { if (ok) location.reload(); else pendingUpdate = true; });
    }
    if ('serviceWorker' in navigator) {
        const hadCtrl = !!navigator.serviceWorker.controller;
        navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadCtrl) updateReady(); });
        navigator.serviceWorker.getRegistration().then(reg => {
            if (!reg) return;
            reg.addEventListener('updatefound', () => { const nw = reg.installing; if (nw) nw.addEventListener('statechange', () => { if (nw.state === 'installed' && navigator.serviceWorker.controller) updateReady(); }); });
            const chk = () => { try { reg.update(); } catch (e) { } };
            document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') chk(); });
            setInterval(chk, 30 * 60 * 1000);
        }).catch(() => { });
    }

    /* ---------- ④ 操作補助／つまずき救済 ---------- */
    let failStreak = 0;
    if (typeof window.fx === 'function') {
        const _fx = window.fx;
        window.fx = function () {
            const o = _fx.apply(this, arguments);
            const a = get('assist');
            const lv = a === 'very' ? 2 : (a === 'easy' ? 1 : 0);
            if (lv) {
                o.limitAdd += 0.12 * lv; o.tapAdd += 3 * lv; o.decayMul *= (lv === 2 ? 0.7 : 0.85);
                o.ring *= 1 + 0.12 * lv; o.spLeniency *= 1 + 0.2 * lv; if (lv === 2) o.spHp += 1;
            }
            if (failStreak >= 3) { o.spLeniency *= 1.5; o.spHp += 1; o.tapAdd += 2; }      // 3回続けて失敗したあとは、少しやさしく
            return o;
        };
    }
    if (typeof window.spStageEnd === 'function') {
        const _end = window.spStageEnd;
        window.spStageEnd = function (win) {
            const live = (typeof spGame !== 'undefined' && !!spGame) && !(typeof spState !== 'undefined' && spState && spState.practice);
            const r = _end.apply(this, arguments);
            if (live) {
                if (win) { failStreak = 0; try { addMission('special'); } catch (e) { } }
                else {
                    failStreak++;
                    if (failStreak === 3) setTimeout(() => { try { floatText('🌟 がんばり応援！ 次のバトルは、ちょっとやさしくなるよ', '#ffe27a', true); } catch (e) { } }, 1200);
                }
            }
            return r;
        };
    }

    /* ---------- ⑤ 大きな買い物の確認 ---------- */
    const BIG = 10000;
    const guard = (name, priceOf, label) => {
        const orig = window[name]; if (typeof orig !== 'function') return;
        window[name] = async function () {
            const args = arguments;
            let price = 0, nm = '';
            try { [price, nm] = priceOf.apply(null, args); } catch (e) { }
            if (get('confirmBuy') !== false && price >= BIG && (typeof playerData !== 'undefined' ? playerData : null) && playerData.gold >= price) {
                const ok = await gameConfirm(`「${nm}」を ${Number(price).toLocaleString()}G で買いますか？`, { yes: '買う', no: 'やめる' });
                if (!ok) return;
            }
            return orig.apply(this, args);
        };
    };
    guard('buyItem', (type, key) => { const d = type === 'rod' ? ROD_DATA[key] : (type === 'net' ? NET_DATA[key] : ACC_DATA[key]); return [d ? d.price : 0, d ? d.name : '']; });
    guard('buyUpgrade', (id) => [upgCost(upgLv(id)), '強化']);
    guard('buyBoost', (id) => { const b = SHOP_BOOST.find(x => x.id === id); return [b ? b.price : 0, b ? b.name : '']; });

    /* ---------- ⑥ 連続ログイン／ミッション追加 ---------- */
    function loginBonus() {
        const p = (typeof playerData !== 'undefined' ? playerData : null); if (!p || !p.tutorialDone) return;
        const today = new Date().toLocaleDateString('sv-SE');
        if (p.loginDate === today) return;
        const y = new Date(Date.now() - DAY).toLocaleDateString('sv-SE');
        p.loginStreak = (p.loginDate === y) ? (p.loginStreak || 0) + 1 : 1;
        p.loginDate = today;
        const gold = Math.min(p.loginStreak, 7) * 100 + (p.loginStreak % 7 === 0 ? 500 : 0);
        p.gold = (p.gold || 0) + gold;
        try { savePlayerData(); updateMenuUI(); } catch (e) { }
        sayAlert(`🎁 ログインボーナス！\n連続 ${p.loginStreak} 日目（+${gold.toLocaleString()}G）\n${p.loginStreak % 7 === 0 ? '7日ごとに、ボーナスがふえるよ！' : '毎日あそぶと、もらえるGがふえるよ（7日目まで）'}`);
    }
    if (typeof MISSION_POOL !== 'undefined') {
        MISSION_POOL.push(
            { id: 'wcatch3', name: '晴れ以外の天気の日に、3匹つかまえる', key: 'wcatch', goal: 3, reward: 250 },
            { id: 'special1', name: 'ミニゲーム（特別な戦い）に勝つ', key: 'special', goal: 1, reward: 300 },
            { id: 'trash1', name: 'ゴミを釣り上げる', key: 'trash', goal: 1, reward: 120 }
        );
        if (typeof window.ensureDaily === 'function') {
            const _ed = window.ensureDaily;
            window.ensureDaily = function () {
                const before = playerData.daily && playerData.daily.date;
                const d = _ed.apply(this, arguments);
                if (d.date !== before && d.list.includes('special1') && !(typeof specialTabVisible === 'function' && specialTabVisible())) {
                    const alt = MISSION_POOL.map(m => m.id).filter(id => !d.list.includes(id) && id !== 'special1');
                    d.list[d.list.indexOf('special1')] = alt[Math.floor(Math.random() * alt.length)];
                    savePlayerData();
                }
                return d;
            };
        }
        if (typeof window.addMission === 'function') {
            const _am = window.addMission;
            window.addMission = function (key, n, isMax) {
                const r = _am.apply(this, arguments);
                if (key === 'catch' && typeof weather !== 'undefined' && weather && weather !== 'clear') _am('wcatch');
                return r;
            };
        }
        if (typeof window.haulTrash === 'function') {
            const _ht = window.haulTrash;
            window.haulTrash = function (force) { const r = _ht.apply(this, arguments); try { addMission('trash'); } catch (e) { } return r; };
        }
    }

    /* ---------- ⑦ 結果画面：画像を保存・共有 ---------- */
    let lastFish = null, lastBonus = null;
    function loadImg(src) { return new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; }); }
    async function makeCard(fish) {
        const W = 720, H = 900, c = document.createElement('canvas'); c.width = W; c.height = H;
        const x = c.getContext('2d');
        const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a2a4a'); g.addColorStop(1, '#04101e');
        x.fillStyle = g; x.fillRect(0, 0, W, H);
        x.strokeStyle = '#d4af37'; x.lineWidth = 10; x.strokeRect(14, 14, W - 28, H - 28);
        x.textAlign = 'center'; x.fillStyle = '#ffd700'; x.font = 'bold 44px "DotGothic16", sans-serif';
        x.fillText('爆釣一閃！ おさかな一本勝負', W / 2, 90);
        x.fillStyle = '#fff'; x.font = 'bold 40px "DotGothic16", sans-serif';
        x.fillText(fish.isBig ? '🌟 大物ゲット！' : '釣れた！', W / 2, 160);
        const im = await loadImg(fish.image);
        if (im) {
            const s = Math.min(560 / im.naturalWidth, 420 / im.naturalHeight), w = im.naturalWidth * s, h = im.naturalHeight * s;
            x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
            x.drawImage(im, (W - w) / 2, 200 + (420 - h) / 2, w, h);
        }
        x.fillStyle = '#fff'; x.font = 'bold 54px "DotGothic16", sans-serif';
        x.fillText(fish.name, W / 2, 700);
        x.fillStyle = '#ffe27a'; x.font = '38px "DotGothic16", sans-serif';
        const loc = (typeof MAP_DATA !== 'undefined' && MAP_DATA[fish.location]) ? MAP_DATA[fish.location].name : '';
        x.fillText(`${loc}　${Number(fish.price || 0).toLocaleString()} G`, W / 2, 765);
        x.fillStyle = '#9fd0ff'; x.font = '28px "DotGothic16", sans-serif';
        x.fillText(new Date().toLocaleDateString('ja-JP') + '　#爆釣一閃', W / 2, 840);
        return new Promise(res => c.toBlob(res, 'image/png'));
    }
    window.shareResultCard = async function () {
        const f = lastFish; if (!f) return;
        const blob = await makeCard(f);
        if (!blob) { sayAlert('画像を作れませんでした。'); return; }
        const file = new File([blob], 'osakana.png', { type: 'image/png' });
        try {
            if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: '爆釣一閃！', text: `${f.name}を釣ったよ！ #爆釣一閃` }); return; }
        } catch (e) { if (e && e.name === 'AbortError') return; }
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'osakana_' + (f.name || 'fish') + '.png';
        document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
        sayAlert('画像を保存しました。');
    };
    function ensureShareBtn() {
        let b = byId('result-share-btn');
        if (!b) {
            const home = byId('result-home-btn'); if (!home || !home.parentNode) return null;
            b = document.createElement('button'); b.id = 'result-share-btn'; b.className = 'btn'; b.type = 'button'; b.textContent = '📷';
            b.title = '画像を保存・共有'; b.onclick = (e) => { e.stopPropagation(); shareResultCard(); };
            home.parentNode.insertBefore(b, home.nextSibling);
        }
        return b;
    }
    if (typeof window.showResult === 'function') {
        const _sr = window.showResult;
        window.showResult = function (isSuccess, fish) {
            const r = _sr.apply(this, arguments);
            const b = ensureShareBtn();
            if (b) { b.style.display = (isSuccess && fish && fish.image) ? '' : 'none'; if (isSuccess) lastFish = fish; }
            return r;
        };
    }

    /* ---------- ⑧ 統計／不具合報告／省電力 ---------- */
    const fmtTime = (s) => { s = Math.floor(s || 0); return `${Math.floor(s / 3600)}時間${Math.floor(s % 3600 / 60)}分`; };
    window.openStats = function () {
        const p = playerData, cf = (typeof caughtFish !== 'undefined' ? caughtFish : null) || {};
        const pct = (cat) => {
            const l = FISH_DATA.filter(f => zukanCatOf(f) === cat); if (!l.length) return null;
            const n = l.filter(f => cf[f.id] && cf[f.id].unlocked).length; return `${Math.floor(n / l.length * 100)}%（${n}/${l.length}）`;
        };
        const got = FISH_DATA.filter(f => cf[f.id] && cf[f.id].unlocked);
        const top = got.slice().sort((a, b) => (b.price || 0) - (a.price || 0))[0];
        const rows = [
            ['⏱ プレイ時間', fmtTime(p.playTimeSeconds)],
            ['🎣 竿で釣った数', `${Number(p.totalCatches || 0).toLocaleString()} 匹`],
            ['🕸 網で捕まえた数', `${Number(p.netCatches || 0).toLocaleString()} 匹`],
            ['🔥 最高の連続成功', `${p.bestCombo || 0} 回`],
            ['🗑 ゴミを釣った数', `${p.trashCount || 0} 回`],
            ['🎰 ゾロ目の奇跡', `${p.zoromeCount || 0} 回`],
            ['📅 連続ログイン', `${p.loginStreak || 0} 日`],
            ['📖 図鑑（通常）', pct('normal')], ['📖 図鑑（ガチャ）', pct('gacha')]
        ];
        if (typeof zukanTabVisible === 'function' && zukanTabVisible('special')) rows.push(['📖 図鑑（特殊エリア）', pct('special')]);
        if (typeof zukanTabVisible === 'function' && zukanTabVisible('event')) rows.push(['📖 図鑑（イベント）', pct('event')]);
        if (top) rows.push(['💎 いちばん高い生き物', `${top.name}（${Number(top.price).toLocaleString()}G）`]);
        const esc = (t) => String(t).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
        sayAlert('📊 あそんだ記録<br><br>' + rows.filter(r => r[1] != null).map(r => `${r[0]}：<b>${esc(r[1])}</b>`).join('<br>'), { html: true, scroll: true });
    };
    window.advBugReport = async function () {
        const p = (typeof playerData !== 'undefined' ? playerData : null) || {};
        const lines = [
            '【不具合報告用の情報】',
            `バージョン: ${typeof APP_VERSION !== 'undefined' ? APP_VERSION : '?'} / CSS ${typeof CSS_VERSION !== 'undefined' ? CSS_VERSION : '?'}`,
            `端末: ${navigator.userAgent}`,
            `画面: ${innerWidth}x${innerHeight} (DPR ${window.devicePixelRatio || 1})`,
            `言語: ${localStorage.getItem('osakana_lang') || 'ja'}`,
            `設定: ${localStorage.getItem('osakana_adv') || '{}'}`,
            `Lv: ${p.level} / 場所: ${typeof currentLocation !== 'undefined' ? currentLocation : '?'} / 状態: ${typeof gameState !== 'undefined' ? gameState : '?'}`,
            `直近のエラー: ${errs.length ? errs.join(' | ') : 'なし'}`,
            '', '（ここに、困ったことを書いてください）'
        ];
        const text = lines.join('\n');
        let ok = false;
        try { if (navigator.clipboard && navigator.clipboard.writeText) { await navigator.clipboard.writeText(text); ok = true; } } catch (e) { }
        sayAlert((ok ? '不具合報告用の情報をコピーしました。\n' : '自動でコピーできませんでした。下の文章をコピーしてください。\n\n' + text + '\n\n') + 'タイトル画面の「アンケート」にはりつけて送ってください。ご意見・ご要望もそこで受け付けています。', { scroll: true });
    };
    window.advSaverToggle = function () {
        const on = !!get('saver');
        if (!on) window.advSet({ saver: true, anim: false, shake: false, weather: false, px: 'crisp', _prev: { anim: get('anim'), shake: get('shake'), weather: get('weather'), px: get('px') } });
        else { const pv = get('_prev') || {}; window.advSet(Object.assign({ saver: false, anim: true, shake: true, weather: true, px: 'auto' }, pv, { saver: false, _prev: null })); }
        const b = byId('adv-saver-btn'); if (b) b.textContent = '省電力モード: ' + (get('saver') ? 'ON' : 'OFF');
    };

    /* ---------- メニューに戻ったときに、おしらせ類を出す ---------- */
    if (typeof window.goToMenu === 'function') {
        const _gm = window.goToMenu;
        let busy = false;
        window.goToMenu = function () {
            const r = _gm.apply(this, arguments);
            if (busy) return r; busy = true;
            setTimeout(() => {
                busy = false;
                try {
                    const p = (typeof playerData !== 'undefined' ? playerData : null) || {};
                    if (!firstDone()) { if ((p.totalCatches || 0) + (p.netCatches || 0) > 0 || p.tutorialDone) { try { localStorage.setItem(FIRST_KEY, '1'); } catch (e) { } } else showFirstSetup(); }
                    if (byId('first-setup')) return;
                    if (pendingUpdate) { maybeUpdateAsk(); return; }
                    loginBonus();
                    setTimeout(maybeBackupAsk, 1500);
                } catch (e) { }
            }, 400);
            return r;
        };
    }

    /* ---------- 図鑑：未入手のカードをタップすると、ヒントが出る ---------- */
    window.zukanHint = function (fish) {
        const secret = fish.id >= 500;               // 特殊エリア・イベントは場所をふせる
        const loc = secret ? '？？？（ふしぎな場所）' : ((typeof MAP_DATA !== 'undefined' && MAP_DATA[fish.location]) ? MAP_DATA[fish.location].name : '？？？');
        const tool = fish.toolType === 'net' ? '🕸 網' : '🎣 竿';
        const w = fish.weight || 30, rare = w <= 5 ? '★★★ とてもレア' : (w <= 15 ? '★★ レア' : '★ わりと出会える');
        sayAlert(`💡 ヒント\n\n📍 ${loc}\n${tool}で出会える\n${secret ? '' : '出会いやすさ：' + rare}`);
    };
})();
