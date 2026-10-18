/* ===================================================
   Ver 3.2.0  開発者用の隠しコマンド（設定 →「コード入力」）
   ---------------------------------------------------
   ・形式は「英単語＋ランダムな数字5桁」。大文字小文字は区別しません。
   ・新しいコマンドは DEV に1行足すだけ：  コード: ['説明', () => '完了メッセージ'],
       戻り値を { msg: '...', after: () => {...} } にすると、メッセージを閉じたあとに after を実行します。
   ・一覧は「DevList52019」でゲーム内に表示されます（隠しコマンド・小瓶一覧.md にも載せています）。
   =================================================== */
(function () {
    const save = () => {
        try { localStorage.setItem('retro_fishing_zukan_v4', JSON.stringify(caughtFish)); } catch (e) { }
        savePlayerData(); updateMenuUI(); try { updateHud(); } catch (e) { }
    };
    const setLevel = (lv) => { playerData.level = lv; playerData.exp = (lv - 1) * 100; };
    const groupIds = (key) => { const g = achOrder().find(([t]) => t.includes(key)); return g ? g[1] : []; };
    const giveAch = (ids) => {
        if (!playerData.achievements) playerData.achievements = [];
        let n = 0; ids.forEach(id => { if (ACHIEVEMENT_DATA[id] && !playerData.achievements.includes(id)) { playerData.achievements.push(id); n++; } });
        return n;
    };
    const achCmd = (label, key) => () => `🏆 実績「${label}」を ${giveAch(groupIds(key))} 個、解除しました。`;
    const zukanCmd = (label, cats) => () => {
        let n = 0;
        FISH_DATA.forEach(f => { if (cats.includes(zukanCatOf(f)) && !(caughtFish[f.id] && caughtFish[f.id].unlocked)) { caughtFish[f.id] = { unlocked: true, bestTime: 1, isNew: false }; n++; } });
        return `📖 図鑑「${label}」に ${n} 種を登録しました。（画像が読み込めた生き物のみ）`;
    };
    const buffCmd = (k, min) => () => { addBuff(k, min); return `✨ ${BUFFS[k].name} を ${min} 分間つけました。`; };
    const eggCmd = (area, label) => () => ({ msg: `🥚 イースターエッグ（${label}）を表示します。`, after: () => spEgg(area, true) });

    const DEV = {
        // ---- レベル・お金・道具 ----
        levelten48215: ['レベル +10', () => { setLevel(playerData.level + 10); return `⬆ レベルが Lv.${playerData.level} になりました。`; }],
        levelspecial71853: ['レベル 220（特殊エリアがすべて入れるレベル）', () => { setLevel(Math.max(playerData.level, 220)); return `⬆ レベルが Lv.${playerData.level} になりました。`; }],
        levelmax90316: ['レベル 250', () => { setLevel(250); return '⬆ レベルを Lv.250 にしました。'; }],
        levelzero20485: ['レベル 1 にもどす', () => { setLevel(1); return '⬇ レベルを Lv.1 にもどしました。'; }],
        moneybig63027: ['1,000,000 G を獲得', () => { playerData.gold += 1000000; return '💰 1,000,000G を獲得しました。'; }],
        moneyzero18452: ['所持金を 0 にする', () => { playerData.gold = 0; return '💰 所持金を 0 にしました。'; }],
        toolsreset52746: ['道具を初期状態にもどす', () => { playerData.ownedRods = ['wood']; playerData.ownedNets = ['bug_net']; playerData.ownedAccs = []; playerData.equippedRod = 'wood'; playerData.equippedNet = 'bug_net'; playerData.equippedRodAcc = playerData.equippedBait = playerData.equippedNetAcc = playerData.equippedNetReel = null; return '🎣 道具を初期状態にもどしました。'; }],
        gachaopen37491: ['ガチャ限定エリアをすべて解放（レベルは変えない）', () => { playerData.unlockedGachaMaps = Object.keys(MAP_DATA).filter(k => MAP_DATA[k].gacha); return '🗺 ガチャ限定エリアをすべて解放しました。'; }],
        gachaclose84062: ['ガチャ限定エリアを未解放にもどす', () => { playerData.unlockedGachaMaps = []; return '🗺 ガチャ限定エリアを未解放にもどしました。'; }],
        // ---- 実績（分野ごとの一括解除） ----
        achievefirst33901: ['実績：はじめの一歩', achCmd('はじめの一歩', 'はじめの')],
        achieverod58214: ['実績：竿で釣る', achCmd('竿で釣る', '竿')],
        achievenet16482: ['実績：網で捕まえる', achCmd('網で捕まえる', '網')],
        achieveskill72059: ['実績：腕前', achCmd('腕前', '腕前')],
        achievetotal40817: ['実績：通算', achCmd('通算', '通算')],
        achievemoney95263: ['実績：お金・道具', achCmd('お金・道具', 'お金')],
        achievetrash38724: ['実績：海のお掃除', achCmd('海のお掃除', 'お掃除')],
        achievemission61045: ['実績：ミッション・ガチャ', achCmd('ミッション・ガチャ', 'ミッション')],
        achievearea27590: ['実績：エリア', achCmd('エリア', 'エリア')],
        achievezukan83176: ['実績：エリアの図鑑コンプリート', achCmd('図鑑コンプリート', '図鑑')],
        achievesecret54931: ['実績：ひみつ', achCmd('ひみつ', 'ひみつ')],
        achievefinal19762: ['実績：最終章', achCmd('最終章', '最終')],
        achieveall60813: ['実績：すべて解除', () => `🏆 実績を ${giveAch(Object.keys(ACHIEVEMENT_DATA))} 個、解除しました。`],
        achieveclear45379: ['実績：すべて消す', () => { playerData.achievements = []; return '🏆 実績をすべて消しました。'; }],
        // ---- エフェクト（ボーナス効果） ----
        effectexp71625: ['EXP×1.5（30分）', buffCmd('exp', 30)],
        effectgold24508: ['ゴールド×1.5（30分）', buffCmd('gold', 30)],
        effectbig83912: ['大物チャンス（30分）', buffCmd('big', 30)],
        effectfrenzy50347: ['入れ食い（30分）', buffCmd('frenzy', 30)],
        effectsuper16794: ['スーパーブースト（30分）', buffCmd('super', 30)],
        effectall39281: ['すべてのエフェクトを30分', () => { Object.keys(BUFFS).forEach(k => addBuff(k, 30)); return '✨ すべてのエフェクトを30分つけました。'; }],
        effectclear82056: ['エフェクトをすべて消す', () => { playerData.buffs = {}; return '✨ エフェクトをすべて消しました。'; }],
        itemcharm47283: ['お守り +10', () => { addItem('charm', 10); return '🧿 お守りを10個もらいました。'; }],
        itembait69150: ['特製まき餌 +10', () => { addItem('bait', 10); return '🪱 特製まき餌を10個もらいました。'; }],
        itemclear23871: ['お守り・まき餌を0にする', () => { playerData.items = {}; return '🧿 アイテムを空にしました。'; }],
        // ---- 図鑑 ----
        zukannormal35906: ['図鑑：通常エリアを全登録', zukanCmd('通常エリア', ['normal'])],
        zukangacha72418: ['図鑑：ガチャエリアを全登録', zukanCmd('ガチャエリア', ['gacha'])],
        zukanspecial10593: ['図鑑：特殊エリアを全登録', zukanCmd('特殊エリア', ['special'])],
        zukanevent64827: ['図鑑：イベントエリアを全登録', zukanCmd('イベントエリア', ['event'])],
        zukanall97135: ['図鑑：すべて登録', zukanCmd('すべて', ['normal', 'gacha', 'special', 'event'])],
        zukanclear51049: ['図鑑：すべて消す', () => { caughtFish = {}; return '📖 図鑑をすべて消しました。'; }],
        // ---- 特殊エリア・手紙・ミニゲーム・イベント ----
        specialclose56018: ['特殊エリアをすべて未解放にもどす', () => { playerData.specialAreas = {}; return '🌌 特殊エリアを未解放にもどしました。'; }],
        bottleall29473: ['手紙を全種ひろった状態にする', () => { playerData.bottleNotes = BOTTLE_CODES.map(c => c.code); return `📜 手紙を ${BOTTLE_CODES.length} 通ひろった状態にしました。`; }],
        bottleclear75316: ['手紙をすべて消す', () => { playerData.bottleNotes = []; playerData.usedCodes = {}; return '📜 手紙と使用済みの合言葉を消しました。'; }],
        miniopen41689: ['ミニゲームを全種「遊んだことがある」状態にする', () => { playerData.spSeen = {}; Object.keys(SP_INFO).forEach(k => { playerData.spSeen[k] = 1; }); return '🎮 すべてのミニゲーム練習が選べるようになりました。'; }],
        miniclose93204: ['ミニゲームの「遊んだ」記録を消す（？？？にもどす）', () => { playerData.spSeen = {}; return '🎮 ミニゲームを「？？？」にもどしました。'; }],
        minibest57731: ['ミニゲームのベストスコアを 500 点にする', () => { playerData.spBest = {}; Object.keys(SP_INFO).forEach(k => { playerData.spBest[k] = 500; }); return '🎮 ベストスコアをすべて 500 点にしました。'; }],
        minibestclear24690: ['ミニゲームのベストスコアを消す', () => { playerData.spBest = {}; return '🎮 ベストスコアを消しました。'; }],
        monthnext70512: ['イベントの月を1つ進める（テスト用）', () => { window.EVENT_DEBUG_MONTH = (eventMonthNow() % 12) + 1; return `📅 イベントの月を ${EVENT_DEBUG_MONTH} 月にしました。（もどす：MonthReal38695 または再読み込み）`; }],
        monthreal38695: ['イベントの月を本物の月にもどす', () => { window.EVENT_DEBUG_MONTH = undefined; return '📅 イベントの月を本物の月にもどしました。'; }],
        // ---- イースターエッグの動作確認 ----
        eggcyber61874: ['エッグ：サイバーシー', eggCmd('sp_cyber', 'サイバーシー')],
        eggmicro20963: ['エッグ：ミクロの海', eggCmd('sp_micro', 'ミクロの海')],
        eggscience83540: ['エッグ：理科実験室', eggCmd('sp_science', '理科実験室')],
        eggyokai47192: ['エッグ：妖怪の川', eggCmd('sp_yokai', '妖怪の川')],
        eggsushi95318: ['エッグ：回転ずしレーン', eggCmd('sp_sushi', '回転ずしレーン')],
        eggpirates12786: ['エッグ：海賊の入り江', eggCmd('sp_pirates', '海賊の入り江')],
        // ---- 初期化（確認なし） ----
        freshstart16784: ['完全リセット（確認なし。言語・音量の設定は残る）', () => ({ msg: '🧹 データをすべて消して、最初の状態から始めます。（言語・音量の設定は残ります）', after: () => { ['retro_fishing_player_v1', 'retro_fishing_zukan_v4', 'retro_fishing_ranking_v1'].forEach(k => localStorage.removeItem(k)); location.reload(); } })]
    };
    DEV.devlist52019 = ['この一覧を表示', () => ({ msg: '🛠 開発者コマンド一覧\n\n' + ['gold100k8239（100,000G）', 'unlockalltools4652（全道具）', 'allmaps93874（全エリア＋Lv200）', 'fullcheat975330（上の3つ）', 'EventAll092365 / EventClose087234（季節イベント）', 'SpecialArea23742（特殊エリア全解放）'].concat(Object.keys(DEV).map(k => `${k}（${DEV[k][0]}）`)).join('\n'), scroll: true })];

    // openCheatPrompt から呼ばれる。コードが無ければ null
    window.runDevCommand = function (code) {
        const d = DEV[String(code || '').trim().toLowerCase()];
        if (!d) return null;
        const r = d[1]();
        const out = typeof r === 'string' ? { msg: r } : r;
        save();
        return out;
    };
    window.DEV_COMMANDS = DEV;
})();
