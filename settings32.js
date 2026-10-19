/* ===================================================
   Ver 3.2.3  詳しい設定（settings32.js）
   ---------------------------------------------------
   設定画面の「⚙ 詳しい設定 ＋」をおすと広がります。ここで変えられるもの：
     ・文字の大きさ      … 小／ふつう／大／特大（文字だけが大きくなります）
     ・ドットの見え方    … じどう／くっきり／なめらか（ドット絵のあらさ対策）
     ・生き物の動き      … ON／OFF（入手・魚影・なでなでの動き）
     ・画面のゆれ        … ON／OFF（大物のときなど）
     ・天気エフェクト    … ON／OFF（雨・雪・霧など）
     ・バックアップ      … セーブデータをコードにしてコピー／コードから復元
     ・設定をもとにもどす
   ・保存先は localStorage の 'osakana_adv'（言語・音量と同じく、データ削除をしても消えません）。
   ・項目を足すときは ADV_ROWS に1つ書き足し、apply() に反映の処理を足します。
   =================================================== */
(function () {
    const KEY = 'osakana_adv';
    const DEF = { ts: 'normal', px: 'auto', anim: true, shake: true, weather: true, assist: 'off', colorHelp: false, confirmBuy: true, backupRemind: true, saver: false };
    const TS = { small: 0.9, normal: 1, large: 1.12, xl: 1.25 };
    let S = Object.assign({}, DEF);
    try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { }
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } };

    /* ---------- 文字の大きさ：style.css の px 指定の font-size を、倍率つきに置きかえる ---------- */
    let textSheet = null, textObs = null, textReady = false;
    const SKIP = '#sp-stage, .cm-canvas, #egg-layer .egg-chara';
    function buildTextSheet() {
        if (textReady) return;
        textReady = true;
        let css = '';
        const walk = (rules, wrap) => {
            for (const r of rules) {
                if (r.type === 1 && r.style && /px$/.test(r.style.fontSize || '') && !/sp-stage/.test(r.selectorText)) {
                    css += wrap[0] + `${r.selectorText}{font-size:calc(${parseFloat(r.style.fontSize)}px * var(--ts,1)) !important}` + wrap[1];
                } else if (r.type === 4 && r.conditionText !== undefined) {
                    css += `@media ${r.conditionText}{`; walk(r.cssRules, ['', '']); css += '}';
                } else if (r.type === 12 && r.conditionText !== undefined) {
                    css += `@supports ${r.conditionText}{`; walk(r.cssRules, ['', '']); css += '}';
                }
            }
        };
        for (const sh of Array.from(document.styleSheets)) {
            try { if (sh.cssRules && !/fonts\.googleapis/.test(sh.href || '')) walk(sh.cssRules, ['', '']); } catch (e) { }
        }
        textSheet = document.createElement('style'); textSheet.id = 'adv-text-sheet'; textSheet.textContent = css;
        document.head.appendChild(textSheet);
    }
    // JS が style 属性に直接書いた font-size（px）も倍率つきにする
    const inlineFix = (el) => {
        if (!el.style || !el.style.fontSize) return;
        const v = el.style.fontSize;
        if (/var\(--ts/.test(v) || !/^[\d.]+px$/.test(v)) return;
        if (el.closest && el.closest(SKIP)) return;
        el.style.fontSize = `calc(${parseFloat(v)}px * var(--ts,1))`;
    };
    const inlineScan = (root) => {
        if (root.nodeType !== 1) return;
        inlineFix(root);
        root.querySelectorAll('[style*="font-size"]').forEach(inlineFix);
    };
    function startInline() {
        if (textObs) return;
        inlineScan(document.body);
        textObs = new MutationObserver((ms) => {
            ms.forEach(m => {
                if (m.type === 'attributes') inlineFix(m.target);
                else m.addedNodes.forEach(inlineScan);
            });
        });
        textObs.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
    }
    function applyText() {
        const k = TS[S.ts] || 1;
        document.documentElement.style.setProperty('--ts', String(k));
        if (k !== 1) { buildTextSheet(); startInline(); }
        document.documentElement.dataset.ts = S.ts;
    }

    /* ---------- ドットの見え方 ---------- */
    // くっきり：ドットをそのまま拡大（いままで）／なめらか：やわらかく補間／じどう：縮小して見せる絵だけ、なめらかにする
    //  （大きな絵を小さく縮めるとき、「くっきり」だとギザギザが目立つ。「じどう」はそこだけ自動でなめらかにします）
    let ro = null; const seen = new WeakSet();
    const judge = (img) => {
        const w = img.clientWidth || img.width;
        img.classList.toggle('px-down', !!(w && img.naturalWidth && img.naturalWidth > w * 1.12));
    };
    function watchImg(img) {
        if (seen.has(img)) return; seen.add(img);
        if (!ro && window.ResizeObserver) ro = new ResizeObserver((es) => es.forEach(e => judge(e.target)));
        if (ro) ro.observe(img);
        judge(img);
    }
    document.addEventListener('load', (e) => { if (e.target && e.target.tagName === 'IMG') { if (S.px === 'auto') watchImg(e.target); } }, true);
    function applyPx() {
        const b = document.body; if (!b) return;
        b.classList.toggle('px-auto', S.px === 'auto');
        b.classList.toggle('px-smooth', S.px === 'smooth');
        if (window.CreatureMotion) CreatureMotion.smooth = (S.px !== 'crisp');
        if (S.px === 'auto') document.querySelectorAll('img').forEach(i => { if (i.complete) watchImg(i); });
    }

    /* ---------- そのほか ---------- */
    function apply() {
        applyText(); applyPx();
        if (window.CreatureMotion) CreatureMotion.enabled = !!S.anim;
        document.body.classList.toggle('no-weather', !S.weather);
    }
    // 画面のゆれ：shake() を包んで、OFF のときは何もしない
    if (typeof window.shake === 'function' && !window.shake._adv) {
        const _shake = window.shake;
        window.shake = function () { if (S.shake === false) return; return _shake.apply(this, arguments); };
        window.shake._adv = true;
    }

    /* ---------- バックアップ ---------- */
    const KEYS = ['retro_fishing_player_v1', 'retro_fishing_zukan_v4', 'retro_fishing_ranking_v1'];
    const enc = (o) => 'OSAKANA1:' + btoa(unescape(encodeURIComponent(JSON.stringify(o))));
    const dec = (t) => JSON.parse(decodeURIComponent(escape(atob(String(t).trim().replace(/^OSAKANA1:/, '').replace(/\s+/g, '')))));
    function copyText(t) {
        if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(t).then(() => true, () => fallbackCopy(t));
        return Promise.resolve(fallbackCopy(t));
    }
    function fallbackCopy(t) {
        try { const a = document.createElement('textarea'); a.value = t; a.style.cssText = 'position:fixed;left:-999px;top:0;'; document.body.appendChild(a); a.select(); const ok = document.execCommand('copy'); a.remove(); return ok; } catch (e) { return false; }
    }
    window.advBackupCopy = async function () {
        try { if (typeof savePlayerData === 'function') savePlayerData(); } catch (e) { }
        const o = { v: 1, t: Date.now() }; KEYS.forEach(k => { o[k] = localStorage.getItem(k); });
        const code = enc(o);
        const ok = await copyText(code);
        if (ok) { try { localStorage.setItem('osakana_backup_at', String(Date.now())); } catch (e) { } const bi = document.getElementById('adv-backup-info'); if (bi) bi.textContent = '前回: ' + window.advBackupInfo(); }
        if (ok) void gameAlert('バックアップコードをコピーしました。\nメモ帳などにはりつけて、大切に保管してください。\n（別の端末で「コードから復元」すると、続きから遊べます）');
        else void gameAlert('自動でコピーできませんでした。\n下のコードを、長押しでコピーしてください。\n\n' + code, { scroll: true });
    };
    window.advBackupRestore = async function () {
        const t = await gamePrompt('バックアップコードをはりつけてください。', { placeholder: 'OSAKANA1:…' });
        if (t == null || !String(t).trim()) return;
        let o;
        try { o = dec(t); if (!o || o.v !== 1 || !o['retro_fishing_player_v1']) throw 0; JSON.parse(o['retro_fishing_player_v1']); } catch (e) { void gameAlert('コードが正しくないようです。\nコピーしたコードを、すべてはりつけたか確認してください。'); return; }
        const ok = await gameConfirm('いまのセーブデータは、このコードの内容に置きかわります。\n本当に復元しますか？', { danger: true, yes: '復元する', no: 'やめる' });
        if (!ok) return;
        KEYS.forEach(k => { if (o[k] != null) localStorage.setItem(k, o[k]); else localStorage.removeItem(k); });
        window.onbeforeunload = null;
        location.reload();
    };

    /* ---------- 画面（設定の「詳しい設定」） ---------- */
    const ADV_ROWS = [
        { id: 'ts', label: '文字の大きさ', opts: [['small', '小'], ['normal', 'ふつう'], ['large', '大'], ['xl', '特大']] },
        { id: 'px', label: 'ドットの見え方', opts: [['auto', 'じどう'], ['crisp', 'くっきり'], ['smooth', 'なめらか']], note: 'ドット絵のあらさが気になる時は「なめらか」。縮んで見える絵のギザギザは「じどう」で自動的にやわらぎます。' },
        { id: 'anim', label: '生き物の動き', opts: [[true, 'ON'], [false, 'OFF']], note: '入手した時・魚影・図鑑のなでなでで、生き物が動きます。' },
        { id: 'shake', label: '画面のゆれ', opts: [[true, 'ON'], [false, 'OFF']] },
        { id: 'weather', label: '天気エフェクト', opts: [[true, 'ON'], [false, 'OFF']], note: '雨・雪・霧などの演出。OFFにすると軽くなります。' },
        { id: 'assist', label: '釣りの操作補助', opts: [['off', 'なし'], ['easy', 'すこし'], ['very', 'しっかり']], note: '釣りやミニゲームの判定がゆるくなります（むずかしさとは別です）。' },
        { id: 'colorHelp', label: '色混ぜの色名表示', opts: [[false, 'OFF'], [true, 'ON']], note: '色混ぜゲームで、色の名前も表示します。' },
        { id: 'confirmBuy', label: '高い買い物の確認', opts: [[true, 'ON'], [false, 'OFF']], note: '10,000G以上の買い物の前に確認します。' },
        { id: 'backupRemind', label: 'バックアップのおすすめ', opts: [[true, 'ON'], [false, 'OFF']], note: '7日に1回、そっと声をかけます。' }
    ];
    function seg(row) {
        const box = document.getElementById('adv-seg-' + row.id); if (!box) return;
        if (!box.children.length) {
            row.opts.forEach(([val, label]) => {
                const b = document.createElement('button'); b.textContent = label; b.dataset.v = String(val);
                b.onclick = () => { S[row.id] = (typeof val === 'boolean') ? val : val; save(); apply(); seg(row); try { playSE('tap'); } catch (e) { } };
                box.appendChild(b);
            });
        }
        Array.from(box.children).forEach(b => b.classList.toggle('on', b.dataset.v === String(S[row.id])));
    }
    window.toggleAdvSettings = function () {
        const c = document.getElementById('adv-content'), b = document.getElementById('adv-toggle-btn');
        if (!c) return;
        const open = c.style.display === 'none';
        c.style.display = open ? 'block' : 'none';
        if (b) b.innerText = open ? 'ー' : '＋';
        if (open) { ADV_ROWS.forEach(seg); const bi = document.getElementById('adv-backup-info'); if (bi) bi.textContent = '前回: ' + window.advBackupInfo(); const sb = document.getElementById('adv-saver-btn'); if (sb) sb.textContent = '省電力モード: ' + (S.saver ? 'ON' : 'OFF'); }
        try { playSE('tap'); } catch (e) { }
    };
    window.advReset = async function () {
        const ok = await gameConfirm('「詳しい設定」を、はじめの状態にもどします。\n（セーブデータは消えません）', { yes: 'もどす', no: 'やめる' });
        if (!ok) return;
        Object.keys(DEF).forEach(k => { S[k] = DEF[k]; }); save(); apply(); ADV_ROWS.forEach(seg);
    };

    window.advGet = (k) => S[k];
    window.advSet = (o) => { Object.assign(S, o); save(); apply(); ADV_ROWS.forEach(seg); };
    window.advBackupInfo = () => { try { const t = Number(localStorage.getItem('osakana_backup_at') || 0); return t ? new Date(t).toLocaleDateString('ja-JP') : '未バックアップ'; } catch (e) { return '?'; } };

    function init() {
        apply(); ADV_ROWS.forEach(seg);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
