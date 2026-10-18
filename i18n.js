/* ===================================================
   言語切りかえ（日本語 / English）  Ver 3.2.0
   ---------------------------------------------------
   ・設定の「言語」で切りかえ。選んだ言語は localStorage "osakana_lang" に保存（データ消去でも消えません）。
   ・英語モードでは、画面に出た日本語を lang_en.js の辞書で自動的に英語へ置きかえます。
       window.I18N_EN : { "日本語": "English" }          … そのまま一致する文
       window.I18N_RX : [ ["^正規表現$", "English %1 %2"] ] … 数字や名前がまじる文（%1 %2 に取り出した部分が入る）
   ・辞書にない文章は日本語のまま表示されます（ゲームは止まりません）。
   ・辞書は i18n/compile.py で作っています。足したい訳は ja|en の行を x*.txt に書いて compile.py を実行。
   =================================================== */
(function () {
    let lang = 'ja';
    try { lang = localStorage.getItem('osakana_lang') === 'en' ? 'en' : 'ja'; } catch (e) { }
    window.__LANG = lang;
    window.getLang = () => lang;
    window.setLang = function (l) {
        try { localStorage.setItem('osakana_lang', l === 'en' ? 'en' : 'ja'); } catch (e) { }
        location.reload();
    };
    if (lang !== 'en') {                        // 日本語のときは何もしない（設定ボタンだけ用意）
        window.tr = (s) => s;
        document.addEventListener('DOMContentLoaded', buildLangRow);
        return;
    }
    document.write('<script src="lang_en.js"><\/script>');
    document.write('<script>window.__i18nStart && window.__i18nStart();<\/script>');

    const CJK = /[\u3040-\u30fa\u30fc-\u30ff\u4e00-\u9fff]/;
    const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let EN, RX = [];
    const cache = new Map();

    function tr1(t, depth) {                    // 前後の空白をのぞいた文を訳す。訳せなければ null
        if (EN[t] !== undefined) return EN[t];
        let m;
        if ((m = t.match(/^(\d+)月(\d+)日$/))) return MON[(+m[1] - 1) % 12] + ' ' + m[2];
        if ((m = t.match(/^(\d+)月$/))) return MON[(+m[1] - 1) % 12];
        if (t.startsWith('【網限定】')) { const r = tr(t.slice(5)); return '【Net Only】' + r; }
        if ((m = t.match(/^【([^】]+)】$/))) { const r = trD(m[1], depth + 1); return r !== m[1] ? '【' + r + '】' : null; }
        if (depth > 4) return null;
        for (let i = 0; i < RX.length; i++) {
            m = RX[i][0].exec(t);
            if (m) {
                const tpl = RX[i][1];
                return tpl.replace(/%(\d)/g, (_, n) => { const g = m[+n]; return g === undefined ? '' : trD(g, depth + 1); });
            }
        }
        return null;
    }
    function trD(s, depth) {
        if (!CJK.test(s)) return s;
        const lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0];
        const core = s.trim();
        if (!core) return s;
        let r = tr1(core, depth);
        if (r === null && /[\n\u3000]/.test(core)) {      // 改行・全角スペースで区切って個別に
            r = core.split(/(\n|\u3000)/).map(p => (p === '\n') ? p : (p === '\u3000') ? ' ' : (CJK.test(p) ? trD(p, depth + 1) : p)).join('');
        }
        if (r === null && depth < 4) {              // 「💡 文章」「名前 (Lv.5〜)」のように空白でつながった文
            const re = /\s+/g; let m;
            while ((m = re.exec(core))) {
                const L = core.slice(0, m.index), R = core.slice(m.index + m[0].length);
                const lt = CJK.test(L) ? tr1(L, depth + 1) : L;
                if (lt === null) continue;
                const rt = trD(R, depth + 1);
                if (CJK.test(L) || rt !== R) { r = lt + m[0] + rt; break; }
            }
        }
        if (r === null) r = core;
        return lead + r + trail;
    }
    function tr(s) {
        if (typeof s !== 'string' || !CJK.test(s)) return s;
        let v = cache.get(s);
        if (v === undefined) { v = trD(s, 0); if (cache.size > 5000) cache.clear(); cache.set(s, v); }
        return v;
    }
    window.tr = tr;

    const ATTRS = ['placeholder', 'title', 'alt', 'aria-label', 'data-label'];
    function doNode(n) {
        if (n.nodeType === 3) {
            const v = n.nodeValue;
            if (v && CJK.test(v)) { const t = tr(v); if (t !== v) n.nodeValue = t; }
        } else if (n.nodeType === 1) {
            const tag = n.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE') return;
            for (const a of ATTRS) { const v = n.getAttribute(a); if (v && CJK.test(v)) { const t = tr(v); if (t !== v) n.setAttribute(a, t); } }
            for (let c = n.firstChild; c; c = c.nextSibling) doNode(c);
        }
    }
    function canvasHook() {                     // ミニゲームなど canvas に描く文字も英語に
        const P = CanvasRenderingContext2D.prototype;
        ['fillText', 'strokeText', 'measureText'].forEach(k => {
            const o = P[k];
            P[k] = function (t) { arguments[0] = tr(String(t)); return o.apply(this, arguments); };
        });
    }
    window.__i18nStart = function () {
        EN = window.I18N_EN || {};
        RX = (window.I18N_RX || []).map(r => [new RegExp(r[0]), r[1]]);
        document.documentElement.lang = 'en';
        document.documentElement.classList.add('lang-en');
        canvasHook();
        const run = () => {
            document.title = tr(document.title);
            doNode(document.body);
            new MutationObserver(ms => {
                for (const m of ms) {
                    if (m.type === 'characterData') doNode(m.target);
                    else if (m.type === 'attributes') doNode(m.target);
                    else m.addedNodes.forEach(doNode);
                }
            }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
        };
        if (document.body) run(); else document.addEventListener('DOMContentLoaded', run);
    };
    document.addEventListener('DOMContentLoaded', buildLangRow);

    window.__i18nStarted = true;
})();

function buildLangRow() {
    const box = document.getElementById('lang-seg');
    if (!box || box.childElementCount) return;
    [['ja', '日本語'], ['en', 'English']].forEach(([k, label]) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = label;
        b.className = (window.__LANG === k) ? 'on' : '';
        b.onclick = () => { if (window.__LANG !== k) setLang(k); };
        box.appendChild(b);
    });
}
