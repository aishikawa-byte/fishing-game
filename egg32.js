/* ===================================================
   Ver 3.2.0  特殊エリアのイースターエッグ
   ---------------------------------------------------
   ・特殊エリアで、画面下の「さいきんの3匹」の枠を3秒以内に5回タップすると発動します（script.js の bindSecrets）。
   ・キャラクター画像は images/trophy/ に置くと表示されます（無い間は絵文字）。
       サイバーシー  egg_cyber.png　／ ミクロの海  egg_micro.png　／ 理科実験室  egg_science.png
       妖怪の川      egg_kitaro.png ／ 回転ずしレーン egg_sushi.png ／ 海賊の入り江 egg_foxy.png
   ・新しく足すときは EGGS に1つ書き足すだけです（survey を付けるとアンケート形式になります）。
   =================================================== */
(function () {
    // 回転寿司アンケートの返事（はま寿司以外は「なるほどね！」＋そのお店の良いところ）
    const SHOP_NOTE = {
        'スシロー': 'なるほどね！\nスシローは、ネタが大きくて種類もほうふ！\nタッチパネルで頼むのも楽しいよね。',
        'くら寿司': 'なるほどね！\nくら寿司は、サイドメニューが大充実！\n「ビッくらポン！」のガチャも楽しいよね。',
        'はま寿司': '一緒だね！\nはま寿司は、お手ごろ価格で何度も行きたくなる！\nお寿司いがいのメニューも多いよね。',
        'かっぱ寿司': 'なるほどね！\nかっぱ寿司は、食べ放題など楽しい企画がいっぱい！\nラーメンやデザートもおいしいよね。',
        '魚べい': 'なるほどね！\n魚べいは、お寿司が「ビューン」とレーンで届く！\nワクワクするよね。',
        'その他': 'なるほどね！\nどこのお店にも、そのお店だけの良さがあるよね。\nお寿司は世界を救うのだ。'
    };
    const EGGS = {
        sp_cyber: { img: 'egg_cyber', emoji: '👾', name: 'バグ？',
            text: 'ハロー、ワールド！\nここは 0 と 1 でできた海。\n……バグ？ いいえ、仕様です。\nありがとう！これからもよろしく！' },
        sp_micro: { img: 'egg_micro', emoji: '🦠', name: 'ちいさな住人',
            text: 'ちいさな世界へ、ようこそ！\nきみの体の中にも、人間の細胞と同じくらいの数の細菌が住んでいるんだって。\n……こっそり、手をふってるよ。' },
        sp_science: { img: 'egg_science', emoji: '🧑‍🔬', name: '博士',
            text: '実験に失敗はつきものじゃ。\nでも失敗のたびに、新しい発見へ近づくのじゃ！\n……ところで、さっきの爆発は、きみかね？' },
        sp_yokai: { img: 'egg_kitaro', emoji: '👁️', name: '目玉の少年',
            text: 'おや、人間かい？\nこんな夜ふけに川で釣りとは、なかなか肝がすわっているね。\n……ほら、うしろ。' },
        sp_sushi: { img: 'egg_sushi', emoji: '🍣', name: 'お寿司くん',
            survey: { q: '突撃アンケート！\n好きな回転寿司屋さんは？', opts: ['スシロー', 'くら寿司', 'はま寿司', 'かっぱ寿司', '魚べい', 'その他'],
                answer: SHOP_NOTE } },
        sp_pirates: { img: 'egg_foxy', emoji: '🦊', name: '赤い海賊',
            text: '……見つかっちゃったか。\nここは海賊の入り江。\nのぞくなら、ほどほどにね！' }
    };
    let layer = null, busy = false, lastAt = 0, closeTimer = null, charaTimer = null;

    function ensure() {
        if (layer) return layer;
        layer = document.createElement('div');
        layer.id = 'egg-layer';
        layer.innerHTML = '<div class="egg-chara"></div><div class="egg-bubble"><div class="egg-name"></div><div class="egg-text"></div><div class="egg-opts"></div><button class="egg-close" type="button">とじる</button></div>';
        (document.getElementById('game-container') || document.body).appendChild(layer);
        layer.querySelector('.egg-close').addEventListener('click', close);      // 「とじる」ボタンで、キャラもメッセージもいっしょに消える
        return layer;
    }
    function close() {
        if (!layer) return;
        clearTimeout(closeTimer); clearTimeout(charaTimer);
        layer.classList.remove('show', 'chara-out');
        busy = false; lastAt = Date.now();
    }
    function say(egg, text) {
        const L = ensure();
        L.querySelector('.egg-text').textContent = text;
        L.querySelector('.egg-opts').innerHTML = '';
        L.querySelector('.egg-close').style.display = '';
        clearTimeout(closeTimer);
        closeTimer = setTimeout(close, 12000);
    }
    window.spEgg = function (area, force) {
        const egg = EGGS[area];
        if (!egg || busy || Date.now() - lastAt < 1500) return;
        if (!force && typeof gameState !== 'undefined' && gameState !== 'READY') return;      // 釣りの最中は出さない
        busy = true;
        const L = ensure();
        const ch = L.querySelector('.egg-chara');
        ch.innerHTML = `<img src="images/trophy/${egg.img}.png" alt="" onerror="imgEmoji(this,'${egg.emoji}')">`;
        L.querySelector('.egg-name').textContent = egg.name;
        L.querySelector('.egg-text').textContent = '';
        L.querySelector('.egg-opts').innerHTML = '';
        L.querySelector('.egg-close').style.display = 'none';
        L.classList.remove('chara-out');
        void L.offsetWidth;
        L.classList.add('show');
        try { playSE('levelup'); } catch (e) { }
        setTimeout(() => {
            if (!busy) return;
            if (egg.survey) {
                const S = egg.survey;
                L.querySelector('.egg-text').textContent = S.q;
                const box = L.querySelector('.egg-opts');
                S.opts.forEach(o => {
                    const b = document.createElement('button');
                    b.textContent = o;
                    b.onclick = () => {
                        say(egg, S.answer[o]);
                        try { playSE(o === 'はま寿司' ? 'levelup' : 'tap'); } catch (e) { }
                    };
                    box.appendChild(b);
                });
                clearTimeout(closeTimer);
                closeTimer = setTimeout(close, 30000);
                L.querySelector('.egg-close').style.display = '';
            } else say(egg, egg.text);
        }, 500);
    };
})();
