/* ===================================================
   Ver 3.2.0  特殊エリア用ミニゲーム（各エリアの“いちばん希少な生き物”で遊べる）
   sp_cyber：回路つなぎ／sp_micro：なぞって囲め！／sp_science：色水まぜ
   sp_yokai：影あて／sp_sushi：お皿キャッチ／sp_pirates：手配書さがし
   ---------------------------------------------------
   ・このファイルは script.js のあとに読み込まれます（SPG・SP_INFO などを拡張）。
   ・P.practice が true のとき（遊び方 → ミニゲーム練習）は、P.round（クリアしたラウンド数）で少しずつ難しくなります。
   ・画像は images/minigames/sp_*.png（無くても絵文字で遊べます。追加素材リスト.md を参照）。
   =================================================== */
Object.assign(SP_INFO, {
    circuit: { ico: '⚡', name: '回路つなぎ', text: () => '3×3のマスをタップすると、パネルが<b>90度</b>回るよ。<br>左の「電源⚡」から右の「生き物」まで、<b>線がつながる</b>ように向きをそろえよう！<br>つながると電気が流れて、捕獲成功。時間切れで失敗。（PC：矢印で選んで Z）' },
    enclose: { ico: '🦠', name: 'なぞって囲め！', text: () => '動き回る<b>ばい菌🦠</b>を、指でぐるっと線を描いて<b>囲もう</b>！<br>体を守る<b>良い菌😇</b>まで囲むと、残り時間が減るよ。<br>一度にたくさん囲むとボーナス！ 決められた数を時間内に捕まえたら成功。' },
    mix: { ico: '⚗️', name: '色水まぜ', text: () => 'お題の<b>色見本</b>と同じ色を、赤・青・黄のしずくを混ぜて作ろう！<br>入れすぎたら「すてる」でやり直し。「できた！」で判定（★1〜3）。<br>3つのお題で、★をたくさん集めたら成功。（PC：←→で選んで Z）' },
    shadow: { ico: '👻', name: '影あて', text: () => '障子に映った<b>妖怪の影</b>と、同じものを下から選んでタップ！<br>正解するとすぐ次の影。まちがえると残り時間が減るよ。<br>時間内に決められた数を当てたら成功。（PC：←→で選んで Z）' },
    plate: { ico: '🍣', name: 'お皿キャッチ', text: () => '上に出る<b>注文の札</b>と同じネタを、レーンを流れてくるお皿からタップして取ろう！<br>ちがうお皿を取ると、残り時間が減るよ。<br>注文を全部そろえたら成功。' },
    wanted: { ico: '📜', name: '手配書さがし', text: () => '<b>手配書（WANTED）</b>に描かれた生き物を、群れの中から探してタップ！<br>正解すると残り時間が少し増える。まちがえると減るよ。<br>時間がなくなるまでに、決められた数を捕まえたら成功。' }
});
Object.assign(SP_AREA_KIND, { sp_cyber: 'circuit', sp_micro: 'enclose', sp_science: 'mix', sp_yokai: 'shadow', sp_sushi: 'plate', sp_pirates: 'wanted' });

// 難しさの段階（0〜）。ふだんは かんたん=0／ふつう=1／むずかしい=3。練習は P.round（クリアしたラウンド数）。
const spStage = (P) => P.practice ? (P.round || 0) : (P.sp > 1.1 ? 3 : (P.sp < 0.9 ? 0 : 1));
const spRand = (n) => Math.floor(Math.random() * n);
const spShuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = spRand(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const spBgImg = (a, name, grad) => spEl('', a.stage, { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, background: `url(images/minigames/mini_bg/${name}.png) center/cover no-repeat, ${grad}`, pointerEvents: 'none' });
// 画面上に置く部品（中心座標）
function spPut(a, name, emoji, size, x, y, extra) {
    const e = spEl('', a.stage, Object.assign({ position: 'absolute', width: size + 'px', height: size + 'px', fontSize: Math.round(size * 0.78) + 'px', lineHeight: size + 'px', textAlign: 'center', left: x + 'px', top: y + 'px', marginLeft: (-size / 2) + 'px', marginTop: (-size / 2) + 'px', pointerEvents: 'none' }, extra || {}));
    e.innerHTML = mgImg(name, emoji, size);
    return e;
}
// 画像（あれば）でも絵文字でも、同じ大きさで並べる
const spIcon = (name, emoji, size) => mgImg(name, emoji, size);

/* ---------- 回路つなぎ（サイバーシー） ---------- */
SPG.circuit = function (a, P) {
    const W = a.W, H = a.H, r = spStage(P), N = r >= 2 ? 4 : 3;
    const limit = Math.max(12, (N === 3 ? 28 : 36) - Math.max(0, r - 3) * 1.8) + (!P.practice && P.sp < 0.9 ? 6 : 0);
    spBgImg(a, 'sp_circuit_bg', 'linear-gradient(#061a2c,#0a3a4c 60%,#041a24)');
    const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0], BIT = [1, 2, 4, 8];     // 上・右・下・左
    const rot = (m, k) => { for (let i = 0; i < k; i++) m = ((m << 1) | (m >> 3)) & 15; return m; };
    // 1) 電源→生き物までの通り道をランダムに作る（行き止まりなしの一本道）
    const sRow = spRand(N), gRow = spRand(N);
    let path = null;
    for (let tries = 0; tries < 200 && !path; tries++) {
        const seen = new Set([sRow * N]), p = [[sRow, 0]];
        const walk = (rw, c) => {
            if (rw === gRow && c === N - 1) return true;
            const ds = spShuffle([0, 1, 2, 3]);
            for (const d of ds) {
                const nr = rw + DY[d], nc = c + DX[d];
                if (nr < 0 || nc < 0 || nr >= N || nc >= N || seen.has(nr * N + nc)) continue;
                seen.add(nr * N + nc); p.push([nr, nc]);
                if (walk(nr, nc)) return true;
                p.pop(); seen.delete(nr * N + nc);
            }
            return false;
        };
        if (walk(sRow, 0)) path = p.slice();
    }
    if (!path) { path = []; for (let c = 0; c < N; c++) path.push([sRow, c]); const dir = gRow > sRow ? 1 : -1; let rr = sRow; while (rr !== gRow) { rr += dir; path.push([rr, N - 1]); } }
    // 2) パネルを置く（通り道は I か L、それ以外はランダム）
    const mask = Array.from({ length: N * N }, () => 0), onPath = new Set();
    path.forEach(([rw, c], i) => {
        onPath.add(rw * N + c);
        const prev = i === 0 ? [rw, c - 1] : path[i - 1], next = i === path.length - 1 ? [rw, c + 1] : path[i + 1];
        let m = 0;
        [prev, next].forEach(([pr, pc]) => { const d = [0, 1, 2, 3].find(k => rw + DY[k] === pr && c + DX[k] === pc); m |= BIT[d]; });
        mask[rw * N + c] = m;
    });
    const kinds = [10, 3, 3, 11, 10, 15];       // 直線・L字・T字・十字
    for (let i = 0; i < N * N; i++) if (!onPath.has(i)) mask[i] = pickOne(kinds);
    const solvedCheck = () => {
        const pw = new Set(), q = [];
        if (mask[sRow * N] & 8) { pw.add(sRow * N); q.push([sRow, 0]); }
        while (q.length) {
            const [rw, c] = q.shift();
            for (let d = 0; d < 4; d++) {
                if (!(mask[rw * N + c] & BIT[d])) continue;
                const nr = rw + DY[d], nc = c + DX[d];
                if (nr < 0 || nc < 0 || nr >= N || nc >= N || pw.has(nr * N + nc)) continue;
                if (mask[nr * N + nc] & BIT[(d + 2) % 4]) { pw.add(nr * N + nc); q.push([nr, nc]); }
            }
        }
        return { pw, ok: pw.has(gRow * N + N - 1) && !!(mask[gRow * N + N - 1] & 2) };
    };
    const sol = mask.slice();      // 正解の並び（テスト用）
    // 3) かきまぜる（最初からつながっている状態にはしない）
    do { for (let i = 0; i < N * N; i++) mask[i] = rot(mask[i], spRand(4)); } while (solvedCheck().ok);
    // 4) 画面
    const pad = 44, boxW = W - pad * 2, boxH = H - 20, cs = Math.min(boxW / N, boxH / N), gw = cs * N, gx = (W - gw) / 2, gy = (H - gw) / 2;
    const box = spEl('', a.stage, { position: 'absolute', left: gx + 'px', top: gy + 'px', width: gw + 'px', height: gw + 'px', display: 'grid', gridTemplateColumns: `repeat(${N},1fr)`, gridTemplateRows: `repeat(${N},1fr)`, gap: '3px' });
    const cells = [];
    for (let i = 0; i < N * N; i++) { const c = spCell(box, '', 'border-radius:8px;font-size:12px;background:linear-gradient(#0e3a4a,#082432);border:2px solid #2a6a7a;box-shadow:none;'); c.style.position = 'relative'; cells.push(c); }
    const src = spPut(a, 'sp_power', '⚡', 34, gx - 22, gy + (sRow + 0.5) * cs);
    const goal = spPut(a, 'sp_goal', '🐟', 38, gx + gw + 22, gy + (gRow + 0.5) * cs);
    const wire = (cls, css) => `<div style="position:absolute;${css}background:${cls};border-radius:3px;"></div>`;
    const draw = () => {
        const { pw, ok } = solvedCheck();
        cells.forEach((c, i) => {
            const m = mask[i], lit = pw.has(i), col = lit ? '#ffe27a' : '#5fb8d8', th = Math.max(8, Math.round(cs * 0.16)), half = (100 - 0) / 2;
            let h = wire(col, `left:calc(50% - ${th / 2}px);top:calc(50% - ${th / 2}px);width:${th}px;height:${th}px;`);
            if (m & 1) h += wire(col, `left:calc(50% - ${th / 2}px);top:0;width:${th}px;height:calc(50% + ${th / 2}px);`);
            if (m & 2) h += wire(col, `left:calc(50% - ${th / 2}px);top:calc(50% - ${th / 2}px);width:calc(50% + ${th / 2}px);height:${th}px;`);
            if (m & 4) h += wire(col, `left:calc(50% - ${th / 2}px);top:calc(50% - ${th / 2}px);width:${th}px;height:calc(50% + ${th / 2}px);`);
            if (m & 8) h += wire(col, `left:0;top:calc(50% - ${th / 2}px);width:calc(50% + ${th / 2}px);height:${th}px;`);
            c.innerHTML = h;
            c.style.borderColor = lit ? '#ffe27a' : '#2a6a7a';
            c.style.boxShadow = lit ? '0 0 10px rgba(255,226,122,.7)' : 'none';
        });
        src.style.filter = (mask[sRow * N] & 8) ? 'drop-shadow(0 0 6px #ffe27a)' : 'none';
        goal.style.filter = ok ? 'drop-shadow(0 0 10px #ffe27a)' : 'grayscale(.6)';
        a.prog(pw.size / (path.length + 1));
        return ok;
    };
    let time = limit, done = false;
    const press = (i) => {
        if (done || i < 0) return;
        mask[i] = rot(mask[i], 1); playSE('tap');
        if (draw()) { done = true; playSE('success'); a.flash('つながった！', '#ffe27a'); setTimeout(() => { if (spGame === g) a.win(); }, 600); }
    };
    const g = { update(dt) { if (done) return; time -= dt; a.say(`電源から生き物まで、線をつなごう！　のこり ${Math.max(0, Math.ceil(time))} 秒`); if (time <= 0) { done = true; a.lose(); } } };
    spCursor(g, cells, N, press);
    g._dbg = () => ({ mask: mask.slice(), sol, N });      // テスト用
    a.hudText('⚡'); draw();
    return g;
};

/* ---------- なぞって囲め！（ミクロの海） ---------- */
SPG.enclose = function (a, P) {
    const W = a.W, H = a.H, r = spStage(P);
    const need = P.practice ? Math.min(14, 6 + Math.floor(r / 2)) : (P.sp > 1.1 ? 9 : (P.sp < 0.9 ? 6 : 8));
    let time = P.practice ? Math.max(24, 36 - r * 0.8) : (P.sp > 1.1 ? 33 : 36);
    const speed = Math.min(150, 44 + 14 * r), nGood = r >= 3 ? Math.min(3, 1 + Math.floor((r - 3) / 2)) : 0, split = r >= 5;
    spBgImg(a, 'sp_enclose_bg', 'radial-gradient(circle at 50% 40%,#2a6a5a,#0e3a3a 70%,#06201f)');
    const svg = spEl('', a.stage, { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none', zIndex: 3 });
    svg.innerHTML = `<svg width="${W}" height="${H}" style="position:absolute;left:0;top:0"><polyline id="enc-line" points="" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/></svg>`;
    const line = svg.querySelector('#enc-line');
    const germs = [];
    const spawn = (good, x, y) => {
        const ang = Math.random() * 6.283, sp = speed * (0.7 + Math.random() * 0.6) * (good ? 0.8 : 1);
        const e = spPut(a, good ? 'sp_good' : 'sp_germ', good ? '😇' : '🦠', 34, 0, 0, { zIndex: 2 });
        const gm = { good, x: x == null ? 30 + Math.random() * (W - 60) : x, y: y == null ? 30 + Math.random() * (H - 60) : y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, e, age: 0 };
        e.style.left = gm.x + 'px'; e.style.top = gm.y + 'px'; germs.push(gm);
    };
    const nBad = 5 + Math.floor(r / 3);
    for (let i = 0; i < nBad; i++) spawn(false); for (let i = 0; i < nGood; i++) spawn(true);
    let caught = 0, pts = [], drawing = false, splitT = 5, fade = 0;
    a.hudText('🦠'); a.prog(0);
    const inside = (poly, x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; };
    const areaOf = (poly) => { let s2 = 0; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) s2 += poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1]; return Math.abs(s2) / 2; };
    // 大きく囲みすぎは無効（画面ぜんぶを囲んで一気にクリア、を防ぐ）。むずかしいほど、囲める広さがせまくなる
    const maxArea = W * H * Math.max(0.16, 0.26 - 0.012 * Math.min(r, 8));
    // 囲んだ輪っか（poly）を判定する
    const resolve = (poly) => {
        if (poly.length < 5) return;
        if (areaOf(poly) > maxArea) { a.flash('大きすぎる！ 小さく囲んで', '#ffd27a'); playSE('foul'); time = Math.max(0, time - 2); fade = 0.5; return; }
        const hit = germs.filter(gm => inside(poly, gm.x, gm.y));
        const bad = hit.filter(gm => !gm.good), good = hit.filter(gm => gm.good);
        hit.forEach(gm => { gm.e.remove(); germs.splice(germs.indexOf(gm), 1); });
        if (good.length) { time = Math.max(0, time - 4 * good.length); a.flash('いい菌まで…！', '#ff7777'); playSE('foul'); triggerVibration(120); }
        if (bad.length) {
            const add = bad.length + (bad.length >= 2 ? bad.length - 1 : 0);
            caught += add; a.prog(caught / need); playSE('success');
            if (bad.length >= 2) a.flash(`${bad.length}匹！ボーナス！`, '#ffe27a'); else if (!good.length) a.flash('つかまえた！', '#7fff7f');
            if (caught >= need) return a.win();
        }
        if (!hit.length) a.flash('からぶり…', '#cfe8ff');
        // 減った分は、あとから補充
        setTimeout(() => { if (spGame !== g) return; const nb = germs.filter(q => !q.good).length; for (let i = nb; i < nBad; i++) spawn(false, Math.random() < .5 ? 20 : W - 20, 20 + Math.random() * (H - 40)); if (good.length) spawn(true); }, 700);
        fade = 0.35;
    };
    // 線が自分の線と交わったら、そこで輪っかが完成（ぐるっと1周なぞるだけでOK。指をはなす必要なし）
    const segX = (p1, p2, p3, p4) => {
        const d = (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p2[1] - p1[1]) * (p4[0] - p3[0]);
        if (Math.abs(d) < 1e-6) return null;
        const t = ((p3[0] - p1[0]) * (p4[1] - p3[1]) - (p3[1] - p1[1]) * (p4[0] - p3[0])) / d, u = ((p3[0] - p1[0]) * (p2[1] - p1[1]) - (p3[1] - p1[1]) * (p2[0] - p1[0])) / d;
        return (t >= 0 && t <= 1 && u >= 0 && u <= 1) ? [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])] : null;
    };
    const redraw = () => line.setAttribute('points', pts.map(p => p.join(',')).join(' '));
    const finish = () => {
        drawing = false;
        if (pts.length < 8) { line.setAttribute('points', ''); return; }
        const f = pts[0], l = pts[pts.length - 1];
        if (Math.hypot(f[0] - l[0], f[1] - l[1]) > 130) { a.flash('とじてないよ！', '#ffd27a'); fade = 0.4; return; }     // 始点の近くではなせば、自動でとじる
        resolve(pts.slice());
        fade = Math.max(fade, 0.3);
    };
    const g = {
        update(dt0) {
            const dt = drawing ? dt0 * 0.45 : dt0;       // なぞっている間は、ばい菌の動きがゆっくりになる
            time -= dt0; splitT -= dt0;
            germs.forEach(gm => {
                gm.age += dt; gm.x += gm.vx * dt; gm.y += gm.vy * dt;
                if (gm.x < 16) { gm.x = 16; gm.vx = Math.abs(gm.vx); } if (gm.x > W - 16) { gm.x = W - 16; gm.vx = -Math.abs(gm.vx); }
                if (gm.y < 16) { gm.y = 16; gm.vy = Math.abs(gm.vy); } if (gm.y > H - 16) { gm.y = H - 16; gm.vy = -Math.abs(gm.vy); }
                if (Math.random() < dt * 0.4) { const ang = Math.random() * 6.283, sp = Math.hypot(gm.vx, gm.vy); gm.vx = Math.cos(ang) * sp; gm.vy = Math.sin(ang) * sp; }
                gm.e.style.left = gm.x + 'px'; gm.e.style.top = gm.y + 'px';
            });
            if (split && splitT <= 0) { splitT = 5; const bads = germs.filter(q => !q.good); if (bads.length < 14 && bads.length) { const s = pickOne(bads); spawn(false, s.x, s.y); a.flash('分裂した！', '#ffd27a'); } }
            if (fade > 0) { fade -= dt0; if (fade <= 0 && !drawing) { line.setAttribute('points', ''); } }
            a.say(`ばい菌を ${need} 匹！ いま ${caught} 匹　のこり ${Math.max(0, Math.ceil(time))} 秒`);
            if (time <= 0) a.lose();
        },
        down(x, y) { drawing = true; pts = [[x, y]]; fade = 0; redraw(); },
        move(x, y) {
            if (!drawing) return;
            const l = pts[pts.length - 1]; if (Math.hypot(x - l[0], y - l[1]) < 4) return;
            const np = [x, y];
            for (let i = 0; i < pts.length - 3; i++) {       // 直前の線以外と交わったか
                const X = segX(pts[i], pts[i + 1], l, np);
                if (X) { const poly = [X].concat(pts.slice(i + 1)); pts = [X, np]; redraw(); resolve(poly); return; }
            }
            pts.push(np); redraw();
        },
        up() { if (drawing) finish(); }
    };
    g._dbg = () => germs.map(q => ({ x: q.x, y: q.y, good: q.good }));      // テスト用
    return g;
};

/* ---------- 色水まぜ（理科実験室） ---------- */
SPG.mix = function (a, P) {
    const W = a.W, H = a.H, r = spStage(P);
    const COL = { r: [230, 40, 50], y: [255, 225, 20], b: [25, 80, 230], w: [255, 255, 255] };       // 絵の具の色（混ぜると引き算の混色：黄＋青＝緑、赤＋黄＝オレンジ、赤＋青＝むらさき）
    const NAME = { r: '赤', y: '黄', b: '青', w: '白' };
    const useW = r >= 4, three = r >= 2;
    const perTime = P.practice ? Math.max(11, 22 - r * 0.9) : (P.sp > 1.1 ? 17 : (P.sp < 0.9 ? 26 : 21));
    const needStars = P.practice ? Math.min(7, 4 + Math.floor(r / 3)) : (P.sp > 1.1 ? 6 : (P.sp < 0.9 ? 4 : 5));
    const MAXD = 10;
    spBgImg(a, 'sp_mix_bg', 'linear-gradient(#2a2a4a,#16162e 60%,#0c0c1c)');
    const mixOf = (c) => { let n = 0, s = [0, 0, 0]; Object.keys(c).forEach(k => { n += c[k]; for (let i = 0; i < 3; i++) s[i] += Math.log(COL[k][i]) * c[k]; }); return n ? s.map(v => Math.round(Math.exp(v / n))) : [235, 240, 245]; };     // 絵の具のように、色を「かけ合わせる」平均
    const rgb = (v) => `rgb(${v[0]},${v[1]},${v[2]})`;
    const dist = (u, v) => Math.hypot(u[0] - v[0], u[1] - v[1], u[2] - v[2]);
    const newTarget = () => {
        const keys = three ? ['r', 'y', 'b'] : spShuffle(['r', 'y', 'b']).slice(0, 2);
        const c = {}; keys.forEach(k => { c[k] = 1 + spRand(three ? 3 : 4); });
        if (useW && Math.random() < 0.7) c.w = 1 + spRand(3);
        return mixOf(c);
    };
    let round = 0, stars = 0, mine = {}, tgt = newTarget(), time = perTime, busy = 0, cur = 0;
    // 画面
    const sw = spEl('', a.stage, { position: 'absolute', left: '22px', top: '38px', width: '74px', height: '74px', borderRadius: '10px', border: '4px solid #fff', background: rgb(tgt), boxShadow: '0 0 12px rgba(255,255,255,.4)', pointerEvents: 'none' });
    const lbl = (t, x, y, css) => { const e = spEl('', a.stage, Object.assign({ position: 'absolute', left: x + 'px', top: y + 'px', fontSize: '13px', color: '#fff4c8', textShadow: '1px 1px 0 #000', pointerEvents: 'none', whiteSpace: 'nowrap', background: 'rgba(12,12,34,.82)', border: '2px solid rgba(255,233,160,.7)', borderRadius: '10px', padding: '1px 8px', fontWeight: 'bold' }, css || {})); e.innerText = t; return e; };
    lbl('お題の色', 22, 8); const starLbl = lbl('', W - 132, 8, { fontSize: '14px' });
    const bk = spEl('', a.stage, { position: 'absolute', left: (W / 2 - 38) + 'px', top: '24px', width: '76px', height: '100px', border: '4px solid #cfe8ff', borderTop: 'none', borderRadius: '0 0 16px 16px', background: 'rgba(255,255,255,.08)', overflow: 'hidden', pointerEvents: 'none' });
    const liquid = spEl('', bk, { position: 'absolute', left: 0, right: 0, bottom: 0, height: '0%', background: '#eee', transition: 'height .2s,background .2s' });
    const cnt = lbl('', W / 2 - 38, 130, { fontSize: '12px', color: '#d8ecff' });
    const sw2 = spEl('', a.stage, { position: 'absolute', left: (W - 98) + 'px', top: '44px', width: '74px', height: '74px', borderRadius: '10px', border: '4px dashed #fff', background: '#eee', pointerEvents: 'none' });
    lbl('いまの色', W - 98, 122, { fontSize: '12px' });
    // 色の見分けをたすける（設定「色混ぜの色名表示」）：色の名前を文字でも出す
    const help = !!(window.advGet && window.advGet('colorHelp'));
    const PAL = [['赤', [230, 40, 50]], ['オレンジ', [240, 130, 30]], ['黄', [255, 225, 20]], ['黄緑', [150, 210, 40]], ['緑', [40, 160, 70]], ['水色', [90, 190, 235]], ['青', [25, 80, 230]], ['むらさき', [130, 50, 190]], ['ピンク', [240, 120, 170]], ['茶色', [130, 80, 50]], ['白', [255, 255, 255]], ['灰色', [150, 150, 150]], ['こげ茶', [70, 40, 30]], ['くろ', [30, 30, 30]]];
    const colName = (v) => { let b = PAL[0], bd = 1e9; PAL.forEach(p => { const d = dist(p[1], v); if (d < bd) { bd = d; b = p; } }); return b[0]; };
    const tName = help ? lbl('', 18, 116, { fontSize: '12px' }) : null, mName = help ? lbl('', W - 102, 140, { fontSize: '12px' }) : null;
    const nameRefresh = () => { if (!help) return; tName.innerText = colName(tgt); mName.innerText = drops() ? colName(mixOf(mine)) : '—'; };
    // ボタン（座標で判定）
    const btns = []; const bw = 46, bh = 46, by = H - 58, keys = useW ? ['r', 'y', 'b', 'w'] : ['r', 'y', 'b'];
    const total = keys.length + 2, gap = 6, bx0 = (W - (total * bw + (total - 1) * gap)) / 2;
    keys.forEach((k, i) => {
        const e = spEl('', a.stage, { position: 'absolute', left: (bx0 + i * (bw + gap)) + 'px', top: by + 'px', width: bw + 'px', height: bh + 'px', borderRadius: '50%', border: '3px solid #fff', background: rgb(COL[k]), boxShadow: 'inset 0 -6px 8px rgba(0,0,0,.25),0 2px 0 #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 'bold', color: k === 'w' || k === 'y' ? '#333' : '#fff', pointerEvents: 'none' });
        e.innerHTML = mgImg('sp_drop_' + k, '💧', 30) + (window.advGet && window.advGet('colorHelp') ? `<span style="position:absolute;left:0;right:0;bottom:-17px;text-align:center;font-size:12px;color:#fff;text-shadow:1px 1px 0 #000">${NAME[k]}</span>` : ''); e.title = NAME[k]; btns.push({ e, fn: () => add(k) });
    });
    const mkBtn = (txt, i, bg, fn) => { const e = spEl('', a.stage, { position: 'absolute', left: (bx0 + i * (bw + gap)) + 'px', top: by + 'px', width: bw + 'px', height: bh + 'px', borderRadius: '10px', border: '3px solid #ffe9a0', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#fff', textAlign: 'center', lineHeight: '1.1', pointerEvents: 'none' }); e.innerHTML = txt; btns.push({ e, fn }); };
    mkBtn('🗑<br>すてる', keys.length, '#6a3a3a', () => { mine = {}; refresh(); playSE('tap'); });
    mkBtn('✅<br>できた！', keys.length + 1, '#2a8a4a', () => judge());
    const drops = () => Object.keys(mine).reduce((s, k) => s + mine[k], 0);
    function refresh() {
        const n = drops(), col = mixOf(mine);
        liquid.style.height = (n / MAXD * 100) + '%'; liquid.style.background = n ? rgb(col) : '#eee'; sw2.style.background = n ? rgb(col) : '#eee';
        cnt.innerText = `しずく ${n}/${MAXD}`; nameRefresh(); starLbl.innerText = `★ ${stars}/${needStars}　(${round + 1}/3)`;
        btns.forEach((b, i) => { b.e.style.outline = (g._kb && i === cur) ? '4px solid #fff' : 'none'; });
    }
    function add(k) { if (busy > 0) return; if (drops() >= MAXD) { a.flash('いっぱい！', '#ffd27a'); return; } mine[k] = (mine[k] || 0) + 1; playSE('tap'); refresh(); }
    function judge() {
        if (busy > 0) return;
        const n = drops(); const d = n ? dist(mixOf(mine), tgt) : 999;
        const s = d <= 28 ? 3 : (d <= 55 ? 2 : (d <= 90 ? 1 : 0));
        stars += s; busy = 1.3; playSE(s ? 'success' : 'foul');
        a.flash(s === 3 ? '★★★ ぴったり！' : (s === 2 ? '★★ いい色！' : (s === 1 ? '★ おしい！' : '色がちがう…')), s ? '#ffe27a' : '#ff7777');
        sw2.style.background = rgb(mixOf(mine)); round++; a.prog(round / 3);
        setTimeout(() => {
            if (spGame !== g) return;
            if (round >= 3) { if (stars >= needStars) return a.win(); return a.lose(); }
            mine = {}; tgt = newTarget(); sw.style.background = rgb(tgt); time = perTime; busy = 0; refresh();
        }, 1300);
    }
    const g = {
        update(dt) {
            if (busy > 0) { busy -= dt; return; }
            time -= dt; a.say(`同じ色を作ろう！　のこり ${Math.max(0, Math.ceil(time))} 秒　★${needStars}個で成功`);
            if (time <= 0) judge();
        },
        down(x, y) { for (const b of btns) { const rc = b.e.getBoundingClientRect(), sr = byId('sp-stage').getBoundingClientRect(); const l = rc.left - sr.left, t = rc.top - sr.top; if (x >= l && x <= l + rc.width && y >= t && y <= t + rc.height) { b.fn(); return; } } },
        keyPress(code) { g._kb = true; if (code === 'ArrowLeft') cur = (cur + btns.length - 1) % btns.length; else if (code === 'ArrowRight') cur = (cur + 1) % btns.length; refresh(); },
        keyDown() { g._kb = true; btns[cur].fn(); }
    };
    a.hudText('⚗️'); a.prog(0); refresh();
    return g;
};

/* ---------- 影あて（妖怪の川） ---------- */
const SPY_POOL = [
    { k: 'oni', e: '👹', n: '鬼' }, { k: 'tengu', e: '👺', n: '天狗' }, { k: 'obake', e: '👻', n: 'おばけ' }, { k: 'kitsune', e: '🦊', n: 'きつね' },
    { k: 'neko', e: '🐱', n: 'ねこまた' }, { k: 'kappa', e: '🐸', n: 'かっぱ' }, { k: 'rokuro', e: '🐍', n: 'ろくろ首' }, { k: 'tanuki', e: '🦝', n: 'たぬき' },
    { k: 'ryu', e: '🐉', n: 'りゅう' }, { k: 'kumo', e: '🕷️', n: 'つちぐも' }, { k: 'gasha', e: '💀', n: 'がしゃどくろ' }, { k: 'chochin', e: '🏮', n: 'ちょうちん' },
    { k: 'karakasa', e: '☂️', n: 'からかさ' }, { k: 'umibozu', e: '🐙', n: 'うみぼうず' }
];
const SPY_LIKE = [['oni', 'tengu'], ['kitsune', 'neko', 'tanuki'], ['obake', 'gasha'], ['rokuro', 'ryu'], ['kumo', 'umibozu'], ['chochin', 'karakasa']];
SPG.shadow = function (a, P) {
    const W = a.W, H = a.H, r = spStage(P);
    const need = P.practice ? Math.min(12, 6 + Math.floor(r / 3)) : (P.sp > 1.1 ? 8 : (P.sp < 0.9 ? 5 : 6));
    let time = P.practice ? Math.max(28, 40 - r) : (P.sp > 1.1 ? 36 : (P.sp < 0.9 ? 46 : 40));
    const nChoice = r >= 2 ? 4 : 3, wobble = r >= 4, similar = r >= 6;
    spBgImg(a, 'sp_shadow_bg', 'linear-gradient(#1a1030,#0c0818)');
    const shoji = spEl('', a.stage, { position: 'absolute', left: '28px', right: '28px', top: '10px', height: '126px', borderRadius: '8px', border: '5px solid #6a4a2a', background: 'repeating-linear-gradient(90deg,transparent 0 38px,rgba(90,60,30,.55) 38px 41px),repeating-linear-gradient(0deg,transparent 0 30px,rgba(90,60,30,.55) 30px 33px),radial-gradient(circle at 50% 50%,#fff6d0,#e8cf8a 80%)', boxShadow: 'inset 0 0 18px rgba(255,180,60,.6)', pointerEvents: 'none', overflow: 'hidden' });
    const shade = spEl('', shoji, { position: 'absolute', left: '50%', top: '50%', width: '90px', height: '90px', marginLeft: '-45px', marginTop: '-45px', fontSize: '70px', lineHeight: '90px', textAlign: 'center', filter: 'brightness(0)' });
    const box = spEl('', a.stage, { position: 'absolute', left: '10px', right: '10px', top: '148px', bottom: '10px', display: 'grid', gridTemplateColumns: `repeat(${nChoice},1fr)`, gap: '8px' });
    let caught = 0, ans = null, cells = [], t = 0, busy = 0;
    const next = () => {
        const target = pickOne(SPY_POOL); let decoys = [];
        const others = SPY_POOL.filter(p => p.k !== target.k);
        if (similar) { const grp = SPY_LIKE.find(gp => gp.includes(target.k)); if (grp) decoys = spShuffle(grp.filter(k => k !== target.k)).map(k => SPY_POOL.find(p => p.k === k)); }
        spShuffle(others).forEach(p => { if (decoys.length < nChoice - 1 && !decoys.includes(p)) decoys.push(p); });
        const opts = spShuffle([target].concat(decoys.slice(0, nChoice - 1)));
        ans = opts.indexOf(target);
        shade.innerHTML = mgImg('sp_y_' + target.k, target.e, 70);
        box.innerHTML = ''; cells = opts.map(o => spCell(box, `<div style="text-align:center;line-height:1.1;">${mgImg('sp_y_' + o.k, o.e, nChoice > 3 ? 40 : 48)}<div style="font-size:11px;margin-top:2px;">${o.n}</div></div>`, 'font-size:34px;'));
        spCursor(g, cells, nChoice, press);
    };
    const press = (i) => {
        if (busy > 0) return;
        if (i === ans) { caught++; a.prog(caught / need); playSE('tap'); a.flash('あたり！', '#7fff7f'); if (caught >= need) return a.win(); busy = 0.25; setTimeout(() => { if (spGame === g) next(); }, 250); }
        else { time -= 4; a.flash('ちがう！ -4秒', '#ff7777'); playSE('foul'); triggerVibration(100); cells[i].style.opacity = '.35'; }
    };
    const g = {
        update(dt) {
            time -= dt; t += dt; if (busy > 0) busy -= dt;
            if (wobble) { shade.style.transform = `translate(${Math.sin(t * 2.2) * 14}px,${Math.cos(t * 1.7) * 8}px) rotate(${Math.sin(t * 1.3) * 8}deg)`; shade.style.filter = `brightness(0) blur(${r >= 5 ? 2.5 : 1.5}px)`; }
            a.say(`影の正体は？　あと ${Math.max(0, need - caught)} 問　のこり ${Math.max(0, Math.ceil(time))} 秒`);
            if (time <= 0) a.lose();
        }
    };
    a.hudText('👻'); a.prog(0); next();
    return g;
};

/* ---------- お皿キャッチ（回転ずしレーン） ---------- */
const SPS_POOL = [
    { k: 'salmon', e: '🍣', n: 'サーモン' }, { k: 'tempura', e: '🍤', n: 'えび天' }, { k: 'tamago', e: '🥚', n: 'たまご' }, { k: 'tako', e: '🐙', n: 'たこ' },
    { k: 'ika', e: '🦑', n: 'いか' }, { k: 'ebi', e: '🦐', n: 'えび' }, { k: 'maguro', e: '🐟', n: 'まぐろ' }, { k: 'kappa', e: '🥒', n: 'かっぱ巻き' }
];
const SPS_LIKE = [['tempura', 'ebi'], ['tako', 'ika'], ['salmon', 'maguro']];
SPG.plate = function (a, P) {
    const W = a.W, H = a.H, r = spStage(P);
    const need = P.practice ? Math.min(10, 4 + Math.floor(r / 2)) : (P.sp > 1.1 ? 6 : (P.sp < 0.9 ? 3 : 4));
    let time = P.practice ? Math.max(30, 42 - r) : (P.sp > 1.1 ? 38 : 42);
    const speed = Math.min(190, 62 + 9 * r), lanes = 2, perOrder = r >= 5 ? 3 : (r >= 3 ? 2 : 1), similar = r >= 5, nKinds = r >= 2 ? 6 : 4;
    spBgImg(a, 'sp_plate_bg', 'linear-gradient(#5a3a22,#3a2414)');
    const laneY = [58 + (H - 58) * 0.3, 58 + (H - 58) * 0.74];       // レーンは2本（上は左へ、下は右へ流れる）
    laneY.forEach(y => spEl('', a.stage, { position: 'absolute', left: 0, right: 0, top: (y - 30) + 'px', height: '60px', background: `url(images/minigames/sp_belt.png) center/100% 100% no-repeat,linear-gradient(#8a8a92,#55555c)`, borderTop: '3px solid #c8c8d0', borderBottom: '3px solid #2a2a30', pointerEvents: 'none' }));
    const panel = spEl('', a.stage, { position: 'absolute', left: '8px', right: '8px', top: '6px', height: '52px', borderRadius: '8px', border: '3px solid #ffe9a0', background: 'rgba(255,244,214,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', color: '#3b2410', fontWeight: 'bold', pointerEvents: 'none' });
    const kinds = spShuffle(SPS_POOL).slice(0, nKinds);
    let order = [], done = 0, plates = [], busy = 0, nextGap = [0, 0];
    const showOrder = () => { panel.innerHTML = `<span>ちゅうもん</span>` + order.map(o => `<span style="display:inline-flex;flex-direction:column;align-items:center;background:#fff;border:2px solid #c0392b;border-radius:8px;padding:2px 6px;line-height:1.1;">${mgImg('sp_neta_' + o.k, o.e, 26)}<small style="font-size:10px;">${o.n}</small></span>`).join(''); };
    const newOrder = () => { order = spShuffle(kinds).slice(0, perOrder); showOrder(); };
    const rm = (p) => { p.e.remove(); plates.splice(plates.indexOf(p), 1); };
    const mkPlate = (li) => {
        let it;
        const ord = order.length ? order : kinds;       // 注文が切り替わる間は、空になる
        const wantIt = Math.random() < 0.5 ? pickOne(ord) : null;
        if (wantIt) it = wantIt;
        else if (similar && Math.random() < 0.5) { const o = pickOne(ord), grp = SPS_LIKE.find(gp => gp.includes(o.k)); const k = grp ? pickOne(grp.filter(x => x !== o.k)) : null; it = (k && SPS_POOL.find(p => p.k === k)) || pickOne(kinds); }
        else it = pickOne(kinds);
        const dir = li % 2 === 0 ? -1 : 1, sp = speed;       // レーンごとに同じ向き・同じ速さ（重ならない）
        const e = spEl('', a.stage, { position: 'absolute', width: '50px', height: '50px', marginLeft: '-25px', marginTop: '-25px', borderRadius: '50%', border: '3px solid #cfd0d8', background: 'radial-gradient(#fff,#e8e8ee)', boxShadow: '0 3px 0 #555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', pointerEvents: 'none', zIndex: 2 });
        e.innerHTML = mgImg('sp_neta_' + it.k, it.e, 34);
        const p = { it, x: dir < 0 ? W + 30 : -30, y: laneY[li], v: dir * sp, e }; e.style.left = p.x + 'px'; e.style.top = p.y + 'px'; plates.push(p);
    };
    const take = (p) => {
        if (busy > 0) return;
        const hit = order.findIndex(o => o.k === p.it.k);
        if (hit >= 0) {
            order.splice(hit, 1); rm(p); playSE('tap'); showOrder();
            if (!order.length) { done++; a.prog(done / need); playSE('success'); a.flash('ちゅうもん完了！', '#ffe27a'); if (done >= need) return a.win(); busy = 0.5; setTimeout(() => { if (spGame === g) newOrder(); }, 500); }
        } else { time -= 3; a.flash('ちがう！ -3秒', '#ff7777'); playSE('foul'); triggerVibration(100); p.e.style.opacity = '.4'; setTimeout(() => { if (p.e.parentNode) rm(p); }, 200); }
    };
    const g = {
        update(dt) {
            time -= dt; if (busy > 0) busy -= dt;
            for (let li = 0; li < lanes; li++) {      // レーンごとに、いちばん新しいお皿から十分はなれたら次を出す
                const lp = plates.filter(q => q.y === laneY[li]).pop();
                if (!lp || Math.abs(lp.x - (li % 2 === 0 ? W + 30 : -30)) >= nextGap[li]) { mkPlate(li); nextGap[li] = 84 + Math.random() * 46; }
            }
            for (let i = plates.length - 1; i >= 0; i--) { const p = plates[i]; p.x += p.v * dt; p.e.style.left = p.x + 'px'; if (p.x < -40 || p.x > W + 40) rm(p); }
            a.say(`注文を ${need} 回そろえよう！　あと ${Math.max(0, need - done)} 回　のこり ${Math.max(0, Math.ceil(time))} 秒`);
            if (time <= 0) a.lose();
        },
        down(x, y) { let b = null, bd = 9e9; plates.forEach(p => { const d = Math.hypot(p.x - x, p.y - y); if (d < bd) { bd = d; b = p; } }); if (b && bd < 36) take(b); },
        keyPress() { }, keyDown() { let b = null; plates.forEach(p => { if (p.x > 20 && p.x < W - 20 && (!b || order.some(o => o.k === p.it.k))) b = p; }); const hit = plates.filter(p => p.x > 20 && p.x < W - 20 && order.some(o => o.k === p.it.k)).sort((u, v) => Math.abs(u.x - W / 2) - Math.abs(v.x - W / 2))[0]; if (hit) take(hit); }
    };
    a.hudText('🍣'); a.prog(0); newOrder(); nextGap = [90, 90]; mkPlate(0); mkPlate(1);
    return g;
};

/* ---------- 手配書さがし（海賊の入り江） ---------- */
SPG.wanted = function (a, P) {
    const W = a.W, H = a.H, r = spStage(P);
    const need = P.practice ? Math.min(14, 6 + Math.floor(r / 3)) : (P.sp > 1.1 ? 8 : (P.sp < 0.9 ? 5 : 6));
    let time = P.practice ? Math.max(26, 32 - Math.floor(r / 2)) : 32; const bonus = 2, pen = 3;
    const nCrowd = Math.min(22, 12 + Math.floor(r / 2) * 2), mode = r >= 4 ? 2 : (r >= 2 ? 1 : 0), lookalike = r >= 6;
    spBgImg(a, 'sp_wanted_bg', 'linear-gradient(#0e5a8a,#06324f 70%,#04223a)');
    const pool = FISH_DATA.filter(f => f.image && !f.isBoss && f.id < 700);
    const poster = spEl('', a.stage, { position: 'absolute', left: '8px', top: '6px', width: '92px', height: '84px', borderRadius: '6px', border: '3px solid #6a4a1a', background: 'linear-gradient(#f4e2b0,#d8bb7a)', color: '#5a2a10', textAlign: 'center', fontWeight: 'bold', zIndex: 4, pointerEvents: 'none', boxShadow: '0 3px 6px rgba(0,0,0,.5)' });
    poster.innerHTML = `<div style="font-size:13px;letter-spacing:1px;margin-top:2px;">WANTED</div><div id="wp-img" style="height:46px;display:flex;align-items:center;justify-content:center;"></div><div id="wp-name" style="font-size:10px;line-height:1.1;"></div>`;
    const sprite = (f, h) => {
        const im = document.createElement('img'); im.src = f.image; im.style.cssText = `height:${h}px;max-width:${h * 1.5}px;object-fit:contain;image-rendering:pixelated;pointer-events:none;`;
        im.onerror = () => { const hue = (f.id * 47) % 360, b = document.createElement('div'); b.style.cssText = `width:${h}px;height:${h}px;border-radius:50%;background:hsl(${hue},60%,50%);color:#fff;font-size:${Math.round(h * 0.3)}px;line-height:${h}px;text-align:center;font-weight:bold;pointer-events:none;`; b.innerText = f.name.slice(0, 2); im.replaceWith(b); };
        return im;
    };
    let caught = 0, crowd = [], target = null, tT = 0;
    const regen = () => {
        crowd.forEach(c => c.e.remove()); crowd = [];
        target = pickOne(pool);
        const list = [target];
        if (lookalike) spShuffle(pool.filter(f => f.id !== target.id && f.location === target.location && (f.size || '') === (target.size || ''))).slice(0, 4).forEach(f => list.push(f));
        spShuffle(pool.filter(f => f.id !== target.id && !list.includes(f))).forEach(f => { if (list.length < nCrowd) list.push(f); });
        const wImg = poster.querySelector('#wp-img'); wImg.innerHTML = ''; wImg.appendChild(sprite(target, 42)); poster.querySelector('#wp-name').innerText = target.name;
        const top = 96, rows = Math.ceil(Math.sqrt(list.length * 1.4)), cols = Math.ceil(list.length / rows), cw = (W - 24) / cols, ch = (H - top - 14) / rows;
        const slots = spShuffle(Array.from({ length: rows * cols }, (_, i) => i));
        list.forEach((f, i) => {
            const s = slots[i], cx = 12 + (s % cols + 0.5) * cw + (Math.random() - .5) * cw * 0.4, cy = top + (Math.floor(s / cols) + 0.5) * ch + (Math.random() - .5) * ch * 0.3;
            const e = spEl('', a.stage, { position: 'absolute', left: cx + 'px', top: cy + 'px', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 2 });
            e.appendChild(sprite(f, 34));
            const o = { f, e, x: cx, y: cy, vx: 0, vy: 0, row: cy };
            if (mode === 1) { const ang = Math.random() * 6.283, sp = 24 * P.sp * (1 + r * 0.05); o.vx = Math.cos(ang) * sp; o.vy = Math.sin(ang) * sp * 0.6; }
            if (mode === 2) { o.vx = -(28 + Math.random() * 30) * P.sp * (1 + r * 0.04) * (Math.random() < 0.5 ? 1 : 0.7); o.vy = 0; }
            crowd.push(o);
        });
    };
    const g = {
        update(dt) {
            time -= dt; tT += dt;
            crowd.forEach(o => {
                if (mode === 1) {
                    o.x += o.vx * dt; o.y += o.vy * dt;
                    if (o.x < 20 || o.x > W - 20) o.vx *= -1; if (o.y < 100 || o.y > H - 16) o.vy *= -1; o.x = Math.max(20, Math.min(W - 20, o.x)); o.y = Math.max(100, Math.min(H - 16, o.y));
                } else if (mode === 2) { o.x += o.vx * dt; if (o.x < -30) o.x = W + 30; }
                o.e.style.left = o.x + 'px'; o.e.style.top = o.y + 'px';
            });
            a.say(`手配書の生き物を探せ！　あと ${Math.max(0, need - caught)} 匹　のこり ${Math.max(0, Math.ceil(time))} 秒`);
            if (time <= 0) a.lose();
        },
        down(x, y) {
            let b = null, bd = 9e9; crowd.forEach(o => { const d = Math.hypot(o.x - x, o.y - y); if (d < bd) { bd = d; b = o; } });
            if (!b || bd > 30) return;
            if (b.f.id === target.id) { caught++; time = Math.min(45, time + bonus); a.prog(caught / need); playSE('success'); a.flash(`つかまえた！ +${bonus}秒`, '#ffe27a'); if (caught >= need) return a.win(); regen(); }
            else { time -= pen; a.flash(`ちがう！ -${pen}秒`, '#ff7777'); playSE('foul'); triggerVibration(100); b.e.style.opacity = '.35'; }
        }
    };
    a.hudText('📜'); a.prog(0); regen();
    return g;
};
