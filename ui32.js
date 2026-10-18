/* ===================================================
   Ver 3.2.0  ゲーム内ダイアログ／音量／日付のお知らせ
   ---------------------------------------------------
   ・Webの alert / confirm / prompt は使いません（音が途切れ、雰囲気が壊れるため）
     gameAlert(msg, opt) / gameConfirm(msg, opt) → Promise<boolean> / gamePrompt(msg, opt) → Promise<string|null>
   ・音量はBGMとSEを別々に6段階（setVolLevel は script.js）
   ・日付をタップ → いま遊べる季節イベントのお知らせ
   =================================================== */
(function () {
    const queue = [];
    let showing = false, root = null;

    function ensureRoot() {
        if (root) return root;
        root = document.createElement('div');
        root.id = 'gd-overlay';
        root.innerHTML = '<div class="gd-card" role="dialog" aria-modal="true"><div class="gd-title" id="gd-title"></div><div class="gd-msg" id="gd-msg"></div><input class="gd-input" id="gd-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"><div class="gd-btns" id="gd-btns"></div></div>';
        document.body.appendChild(root);
        // ゲーム側のキー操作（Z/X など）を、ダイアログ表示中は止める
        window.addEventListener('keydown', (e) => {
            if (!showing) return;
            e.stopPropagation();
            if (e.key === 'Escape') { const c = root.querySelector('[data-cancel]'); if (c) c.click(); }
            else if (e.key === 'Enter') { const o = root.querySelector('[data-ok]'); if (o) o.click(); }
        }, true);
        return root;
    }

    function next() {
        if (showing || !queue.length) return;
        const q = queue.shift();
        const r = ensureRoot();
        showing = true;
        const card = r.querySelector('.gd-card');
        card.className = 'gd-card' + (q.opt.danger ? ' danger' : '') + (q.opt.scroll ? ' scroll' : '');
        r.querySelector('#gd-title').textContent = q.opt.title || '';
        r.querySelector('#gd-title').style.display = q.opt.title ? '' : 'none';
        if (q.opt.html) r.querySelector('#gd-msg').innerHTML = q.msg; else r.querySelector('#gd-msg').textContent = q.msg;
        const inp = r.querySelector('#gd-input');
        inp.style.display = q.kind === 'prompt' ? '' : 'none';
        inp.value = '';
        inp.placeholder = q.opt.placeholder || '';
        const btns = r.querySelector('#gd-btns');
        btns.innerHTML = '';
        const done = (val) => {
            r.classList.remove('show');
            showing = false;
            q.resolve(val);
            setTimeout(next, 30);
        };
        const mk = (label, cls, attr, val) => {
            const b = document.createElement('button');
            b.className = 'gd-btn ' + cls; b.textContent = label; b.setAttribute(attr, '');
            b.onclick = () => done(typeof val === 'function' ? val() : val);
            btns.appendChild(b);
        };
        if (q.kind === 'alert') mk(q.opt.ok || 'OK', 'ok', 'data-ok', true);
        else if (q.kind === 'confirm') {
            mk(q.opt.no || 'キャンセル', 'no', 'data-cancel', false);
            mk(q.opt.yes || 'OK', 'ok', 'data-ok', true);
        } else {
            mk(q.opt.cancel || 'やめる', 'no', 'data-cancel', null);
            mk(q.opt.ok || 'OK', 'ok', 'data-ok', () => inp.value);
        }
        r.classList.add('show');
        if (q.kind === 'prompt') setTimeout(() => { try { inp.focus(); } catch (e) {} }, 60);
    }
    function push(kind, msg, opt) {
        return new Promise((resolve) => { queue.push({ kind, msg: String(msg == null ? '' : msg), opt: opt || {}, resolve }); next(); });
    }
    window.gameAlert = (msg, opt) => push('alert', msg, opt);
    window.gameConfirm = (msg, opt) => push('confirm', msg, opt);
    window.gamePrompt = (msg, opt) => push('prompt', msg, opt);

    /* ---------- 音量（設定画面） ---------- */
    window.refreshVolUI = function () {
        [['bgm', bgmLevel], ['se', seLevel]].forEach(([k, lv]) => {
            const box = document.getElementById('vol-' + k);
            if (!box) return;
            if (!box.children.length) {
                for (let i = 0; i <= 5; i++) {
                    const b = document.createElement('button');
                    b.textContent = i === 0 ? '🔇' : String(i);
                    b.onclick = () => setVolLevel(k, i);
                    box.appendChild(b);
                }
            }
            Array.from(box.children).forEach((b, i) => b.classList.toggle('on', i === lv));
        });
    };

    /* ---------- 日付タップ：いま遊べる季節イベント ---------- */
    window.openEventNews = function () {
        const m = (typeof eventMonthNow === 'function') ? eventMonthNow() : (new Date().getMonth() + 1);
        const keys = Object.keys(MAP_DATA).filter(k => MAP_DATA[k].event && MAP_DATA[k].months && MAP_DATA[k].months.includes(m));
        const list = document.getElementById('evnews-list');
        const head = document.getElementById('evnews-head');
        if (!list || !head) return;
        list.innerHTML = '';
        if (!keys.length) {
            head.textContent = `${m}月のイベントは、おやすみ中`;
            list.textContent = 'いま開催中のイベントはありません。';
        } else {
            const mm = MAP_DATA[keys[0]].months;
            head.textContent = `${mm[0]}・${mm[1]}月のイベント開催中！`;
            keys.forEach(k => {
                const a = MAP_DATA[k];
                const row = document.createElement('div');
                row.className = 'evnews-row';
                const ok = eventUnlocked(k);
                row.innerHTML = '<span class="evn-ico"></span><span class="evn-name"></span><span class="evn-st"></span>';
                row.children[0].textContent = a.emoji || '🎉';
                row.children[1].textContent = a.name;
                row.children[2].textContent = ok ? '遊べる！' : '🍾 未解放';
                row.children[2].className = 'evn-st ' + (ok ? 'on' : 'off');
                list.appendChild(row);
            });
        }
        document.getElementById('evnews-hint').textContent = '未解放のエリアは、釣りの最中に見つかる「手紙入りの小瓶」の合言葉でひらきます。\n（設定の「コード入力」へ）';
        document.getElementById('evnews-modal').style.display = 'flex';
        if (typeof playSE === 'function') playSE('tap');
    };
    window.closeEventNews = function () { document.getElementById('evnews-modal').style.display = 'none'; };

    document.addEventListener('DOMContentLoaded', () => {
        const d = document.getElementById('menu-date');
        if (d) { d.addEventListener('click', openEventNews); d.style.cursor = 'pointer'; }
        refreshVolUI();
    });

    /* ---------- 金額にコンマ（保険）：「1234G」→「1,234G」。数字のあとに G が付く表示を自動で整える ---------- */
    (function () {
        const RE = /(^|[^\d,.])(\d{4,})(?=\s?G(?![A-Za-z]))/g;
        const fix = (n) => {
            if (n.nodeType === 3) {
                const t = n.nodeValue;
                if (!/\dG|\d G/.test(t)) return;
                const v = t.replace(RE, (m, a, d) => a + Number(d).toLocaleString('en-US'));
                if (v !== t) n.nodeValue = v;
            } else if (n.nodeType === 1 && !/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(n.tagName)) n.childNodes.forEach(fix);
        };
        const start = () => {
            new MutationObserver((ms) => {
                ms.forEach(m => { if (m.type === 'characterData') fix(m.target); else m.addedNodes.forEach(fix); });
            }).observe(document.body, { childList: true, subtree: true, characterData: true });
        };
        if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
    })();
})();
