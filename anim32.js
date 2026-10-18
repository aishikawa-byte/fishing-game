/* ===================================================
   Ver 3.2.0  生き物の「動き」アニメーション（anim32.js）
   ---------------------------------------------------
   生き物の画像を、キャンバスで少しずつゆがめて、本当に泳いでいるように動かします。
   ・使う場面：①生き物を入手した時（結果ウィンドウ）　②魚影が泳いでくる時　③図鑑の「なでなで」
     （生き物図鑑を見ているだけの時は動きません）
   ・動きの種類は、生き物の名前から自動で決まります（下の MOTION_RULES）。
       swim … ふつうの魚：体をくねらせて、尾びれをふる
       long … ウナギ・ヘビ・ドラゴンなど：大きくくねる
       ray  … エイ・マンタ：翼（ひれ）をはばたかせる
       jelly… クラゲ・イカ・タコなど：ふわふわ伸び縮み
       shell… 貝・カニ・エビ・ヒトデなど：ぴょこぴょこ、ゆらゆら
       sway … チンアナゴ：砂から顔を出して、ゆらゆらゆれる
       obj  … 化石・宝物・道具など生き物ではないもの：ふわふわ浮かぶだけ（形はくずさない）
       bob  … それ以外：ふわふわ上下
   ・新しい種類を足したいときは、MOTION_RULES に「正規表現, 種類」を1行足すだけです。
   ・画像の「頭の向き」は fishfacing.js（getFacing）の設定を使います。
   =================================================== */
(function () {
    // 化石・宝物・武器・道具・結晶など「生き物ではないもの」は、くねらせず、ふわふわ浮かぶだけ
    const OBJECT_RE = /化石|琥珀|(ユキノ|エンノ|ミョウバン)ケッショウ$|^グンカンウニ$|トクジョウニギリ|ユノミ|ゴウカオケ|イヤリング|タカラノチズ|クロイシルシ|カイゾクノオキテ|フネノカネ|オカネ$|コショウブクロ|オウゴンドクロ|スナドケイ|タレビン|フラーレン|ナノマシン|ホシノスナ|ケサランパサラン|^ライム$|剣|刀|槍|斧|盾|冠|壺|財宝|宝箱|指輪|首飾り|ネックレス|金塊$|宝石|真珠|コイン|金貨|フラスコ|電球|瓶|鍵|杖/;
    const MOTION_RULES = [
        [/ウナギ|アナゴ|ウツボ|ヘビ|ハモ|ドジョウ|ナマズ|リュウ|ドラゴン|ミミズ|ムカデ|ゲンゴロウ|タチウオ|サヨリ|ダツ|ヤツメ|ウミヘビ|オオナマズ|ネッシー/, 'long'],
        [/エイ|マンタ|ガンギ/, 'ray'],
        [/クラゲ|イカ|タコ|ミズ|ホヤ|ヒドラ|ウミウシ|プランクトン|ミジンコ|ゾウリムシ|ボルボックス|ミドリムシ|アメーバ|ワムシ/, 'jelly'],
        [/貝|カニ|エビ|ヤドカリ|ヒトデ|ウニ|ナマコ|ホタテ|アワビ|サザエ|カメ|フジツボ|イソギンチャク|シャコ|ザリガニ|ホタル|ムシ|ガ$|ゲンジ|タニシ|カタツムリ|ナメクジ|ホヤ|サンゴ|オウム/, 'shell']
    ];
    // 特殊エリア・イベントエリア（id 500〜）は、名前の「最後（末尾）」で判断する（例：ピーエイチウミウシ → ウミウシ → jelly）
    const SUFFIX_RULES = [
        [/ウナギ$|アナゴ$|ウツボ$|ヘビ$|ハモ$|ドジョウ$|ナマズ$|ドラゴン$|リュウ$|タチウオ$|ダツ$|サヨリ$|ネッシー$|ムカデ$|ミミズ$/, 'long'],
        [/エイ$|マンタ$/, 'ray'],
        [/クラゲ$|イカ$|タコ$|ウミウシ$|ミジンコ$|プランクトン$|アメーバ$|ゾウリムシ$|ミドリムシ$|ワムシ$|ホヤ$|ヒドラ$|チュウ$/, 'jelly'],
        [/貝$|ガイ$|カニ$|ガニ$|エビ$|ヤドカリ$|ヒトデ$|ウニ$|ナマコ$|ホタテ$|アワビ$|サザエ$|カメ$|ガメ$|フジツボ$|イソギンチャク$|シャコ$|ザリガニ$|ホタル$|ムシ$|シジミ$|ガ$|サンゴ$|ウミユリ$|オキアミ$|ミミズク$|アサリ$|ハマグリ$|カキ$/, 'shell']
    ];
    const kindOf = (fish) => {
        const n = (fish && fish.name) || '';
        if (fish && (((typeof isThing === 'function') && isThing(fish)) || fish.thing || OBJECT_RE.test(n))) return 'obj';
        if (/チンアナゴ|ニシキアナゴ/.test(n)) return 'sway';      // 砂から顔を出して、ゆらゆらゆれる
        if (fish && fish.id >= 500) { for (const [re, k] of SUFFIX_RULES) if (re.test(n)) return k; return 'swim'; }
        for (const [re, k] of MOTION_RULES) if (re.test(n)) return k;
        return 'swim';
    };
    const facingOf = (fish) => { try { return typeof getFacing === 'function' ? getFacing(fish) : 'L'; } catch (e) { return 'L'; } };

    // 画像 → 1フレーム分のゆがんだ絵を canvas に描く
    function drawFrame(ctx, im, cw, ch, fit, kind, head, t, amp) {
        ctx.clearRect(0, 0, cw, ch);
        const { x: fx, y: fy, w: fw, h: fh } = fit;
        const iw = im.naturalWidth, ih = im.naturalHeight;
        const sp = t * 6.2832;       // 1秒で1周期ぶん×係数
        const dir = head === 'R' ? 1 : -1;        // 頭が向いている向き（-1:左 / +1:右）
        const step = Math.max(2, Math.round(fw / 90));     // 列の幅（細かいほどなめらか）
        if (kind === 'swim' || kind === 'long') {
            const A = (kind === 'long' ? 0.11 : 0.075) * fh * amp, k = kind === 'long' ? 5.2 : 3.0, f = kind === 'long' ? 1.6 : 2.2;
            for (let dx = 0; dx < fw; dx += step) {
                const u = (dx + step / 2) / fw;                         // 0〜1（左→右）
                const tail = dir < 0 ? u : 1 - u;                       // 頭=0 → 尾=1
                const env = 0.15 + 0.85 * Math.pow(tail, 1.4);          // 尾に近いほど大きく揺れる
                const oy = Math.sin(sp * f - tail * k) * A * env;
                const sx = Math.floor(dx / fw * iw), sw = Math.max(1, Math.ceil(step / fw * iw));
                ctx.drawImage(im, sx, 0, sw, ih, Math.round(fx + dx), Math.round(fy + oy), step + 1, fh);
            }
        } else if (kind === 'sway') {      // チンアナゴ：根もと（砂）は動かず、顔のほうほどゆらゆらゆれる（絵が割れないよう、1行ずつ横にずらすだけ）
            const rows = Math.max(1, Math.round(fh / 120));
            for (let dy = 0; dy < fh; dy += rows) {
                const v = (dy + rows / 2) / fh, up = Math.max(0, (0.82 - v) / 0.82);      // 砂のあたり(下)は 0、上ほど 1
                const ox = Math.sin(sp * 0.7 - up * 1.4) * fw * 0.035 * amp * Math.pow(up, 1.4);
                const sy0 = Math.floor(dy / fh * ih), sh = Math.max(1, Math.ceil((rows + 1) / fh * ih));
                ctx.drawImage(im, 0, sy0, iw, sh, Math.round(fx + ox), Math.round(fy + dy), Math.ceil(fw), rows + 1);
            }
        } else if (kind === 'ray') {      // エイ・マンタ：ゆったり滑空（翼のはしがやわらかく波打つ。形はくずさない）
            const A = 0.035 * fh * amp;
            for (let dx = 0; dx < fw; dx += step) {
                const u = (dx + step / 2) / fw, side = Math.abs(u - 0.5) * 2;
                const oy = Math.sin(sp * 0.55 - u * 2.2) * A * (0.3 + side) + Math.sin(sp * 0.4) * fh * 0.025 * amp;
                const sx = Math.floor(dx / fw * iw), sw = Math.max(1, Math.ceil(step / fw * iw));
                ctx.drawImage(im, sx, 0, sw, ih, Math.round(fx + dx), Math.round(fy + oy), step + 1, fh);
            }
        } else if (kind === 'obj') {      // 道具・化石・宝物：ふわふわ浮かんで、すこしゆれる
            const oy = Math.sin(sp * 0.5) * fh * 0.035 * amp;
            ctx.save(); ctx.translate(fx + fw / 2, fy + fh / 2 + oy); ctx.rotate(Math.sin(sp * 0.3) * 0.035 * amp);
            ctx.drawImage(im, -fw / 2, -fh / 2, fw, fh); ctx.restore();
        } else if (kind === 'jelly') {
            const pulse = Math.sin(sp * 0.9);
            const sy = 1 + 0.09 * pulse * amp, sxx = 1 - 0.07 * pulse * amp;      // 上下に伸びたら、横は縮む
            const rows = Math.max(2, Math.round(fh / 45));
            for (let dy = 0; dy < fh; dy += rows) {
                const v = (dy + rows / 2) / fh;                         // 0(上)〜1(下)
                const ox = Math.sin(sp * 1.3 - v * 4) * fw * 0.035 * amp * v;      // 下ほど（足・触手）大きくゆれる
                const sy0 = Math.floor(dy / fh * ih), sh = Math.max(1, Math.ceil(rows / fh * ih));
                const w2 = fw * sxx;
                ctx.drawImage(im, 0, sy0, iw, sh, Math.round(fx + (fw - w2) / 2 + ox), Math.round(fy + fh * (1 - sy) / 2 + dy * sy - 0), Math.round(w2), Math.ceil(rows * sy) + 1);
            }
        } else if (kind === 'shell') {
            const hop = Math.max(0, Math.sin(sp * 0.8)), wob = Math.sin(sp * 1.6);
            ctx.save();
            ctx.translate(fx + fw / 2, fy + fh);                       // 足もとを軸に
            ctx.rotate(wob * 0.07 * amp);
            ctx.scale(1 + 0.05 * (1 - hop) * amp, 1 - 0.05 * (1 - hop) * amp + 0.05 * hop);
            ctx.drawImage(im, -fw / 2, -fh - hop * fh * 0.08 * amp, fw, fh);
            ctx.restore();
        } else {
            const oy = Math.sin(sp * 0.9) * fh * 0.04 * amp;
            ctx.save(); ctx.translate(fx + fw / 2, fy + fh / 2 + oy); ctx.rotate(Math.sin(sp * 0.45) * 0.04 * amp);
            ctx.drawImage(im, -fw / 2, -fh / 2, fw, fh); ctx.restore();
        }
    }

    // 内側のサイズ（object-fit: contain 相当）
    const fitContain = (bw, bh, iw, ih) => { const s = Math.min(bw / iw, bh / ih); const w = iw * s, h = ih * s; return { x: (bw - w) / 2, y: (bh - h) / 2, w, h }; };

    /* ----- 外から使う関数 -----
       CreatureMotion.start(imgエレメント, fish, { duration: ミリ秒(省略=ずっと), amp: 動きの大きさ })
       CreatureMotion.shadow(魚影の div, fish)
       CreatureMotion.stop(エレメント)                                                      */
    const CM = window.CreatureMotion = {
        enabled: true,
        kindOf,
        stop(el) { if (el && el._cm) el._cm.stop(); },
        start(img, fish, opt) {
            if (!CM.enabled || !img || !fish || window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
            CM.stop(img);
            const opts = opt || {};
            const host = img.parentElement; if (!host) return null;
            if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
            const cv = document.createElement('canvas');
            cv.className = 'cm-canvas';
            cv.style.cssText = 'position:absolute;pointer-events:none;image-rendering:pixelated;z-index:1;';
            host.appendChild(cv);
            const ctx = cv.getContext('2d'); ctx.imageSmoothingEnabled = false;
            const kind = opts.kind || kindOf(fish), head = facingOf(fish);
            const imSrc = img.src;
            const T0 = performance.now(), dur = opts.duration || 0, amp = opts.amp || 1;
            let raf = 0, alive = true, im = null;
            const stop = () => {
                if (!alive) return; alive = false; cancelAnimationFrame(raf);
                try { cv.remove(); } catch (e) { }
                img.classList.remove('cm-hide'); img._cm = null;
            };
            const place = () => {      // img と同じ場所・大きさに重ねる
                const dpr = Math.min(2, window.devicePixelRatio || 1);
                const w = img.offsetWidth, h = img.offsetHeight;
                cv.style.left = img.offsetLeft + 'px'; cv.style.top = img.offsetTop + 'px'; cv.style.width = w + 'px'; cv.style.height = h + 'px';
                const pw = Math.max(1, Math.round(w * dpr)), ph = Math.max(1, Math.round(h * dpr));
                if (cv.width !== pw || cv.height !== ph) { cv.width = pw; cv.height = ph; ctx.imageSmoothingEnabled = false; }
                return { pw, ph };
            };
            const loop = (now) => {
                if (!alive) return;
                if (!img.isConnected || img.src !== imSrc || img.classList.contains('silhouette') || img.offsetWidth === 0) { stop(); return; }
                if (dur && now - T0 > dur) { stop(); return; }
                const { pw, ph } = place();
                const fit = fitContain(pw, ph, im.naturalWidth, im.naturalHeight);
                const t = (now - T0) / 1000;
                const ease = dur ? Math.min(1, (dur - (now - T0)) / 500, (now - T0) / 200 + 0.2) : Math.min(1, (now - T0) / 300 + 0.2);      // 始まりと終わりをやわらかく
                drawFrame(ctx, im, pw, ph, fit, kind, head, t, amp * Math.max(0, ease));
                raf = requestAnimationFrame(loop);
            };
            const go = () => {
                if (!alive) return;
                im = new Image(); im.onload = () => { if (!alive) return; img.classList.add('cm-hide'); raf = requestAnimationFrame(loop); };
                im.onerror = stop; im.src = imSrc;
            };
            img._cm = { stop };
            if (img.complete && img.naturalWidth) go(); else img.addEventListener('load', go, { once: true });
            return { stop };
        },
        // 魚影（背景画像つきの div）。泳いでいる間、ずっと動かす
        shadow(el, fish) {
            if (!CM.enabled || !el || !fish || window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            CM.stop(el);
            const kind = kindOf(fish), head = facingOf(fish);
            const cv = document.createElement('canvas');
            cv.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;image-rendering:pixelated;';
            el.appendChild(cv);
            const ctx = cv.getContext('2d'); ctx.imageSmoothingEnabled = false;
            const T0 = performance.now(); let raf = 0, alive = true;
            const src = fish.image;
            const im = new Image();
            const stop = () => { if (!alive) return; alive = false; cancelAnimationFrame(raf); try { cv.remove(); } catch (e) { } el.classList.remove('cm-on'); el._cm = null; };
            el._cm = { stop };
            im.onload = () => {
                if (!alive) return;
                el.classList.add('cm-on');
                const loop = (now) => {
                    if (!alive) return;
                    if (el.style.display === 'none' || !el.isConnected) { stop(); return; }
                    const w = Math.max(1, el.offsetWidth), h = Math.max(1, el.offsetHeight);
                    if (cv.width !== w * 2 || cv.height !== h * 2) { cv.width = w * 2; cv.height = h * 2; ctx.imageSmoothingEnabled = false; }
                    drawFrame(ctx, im, cv.width, cv.height, { x: 0, y: 0, w: cv.width, h: cv.height }, kind, head, (now - T0) / 1000, 1);
                    raf = requestAnimationFrame(loop);
                };
                raf = requestAnimationFrame(loop);
            };
            im.onerror = stop; im.src = src;
        }
    };
})();
