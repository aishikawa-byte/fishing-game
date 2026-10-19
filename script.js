
/* ===================================================
マップ（釣り場）設定
=================================================== */
const MAP_DATA = {
    sea: { name: "海", bg: "images/bg/旧デザイン/bg_sea.png", reqLevel: 1, sound: "sounds/sea.mp3" },
    river: { name: "川", bg: "images/bg/bg_river.png", reqLevel: 5, sound: "sounds/river.mp3" },
    swamp: { name: "沼地", bg: "images/bg/bg_swamp.png", reqLevel: 10, sound: "sounds/swamp.mp3" },
    lake: { name: "湖", bg: "images/bg/bg_lake.png", reqLevel: 18, sound: "sounds/lake.mp3" },
    snow: { name: "雪山", bg: "images/bg/bg_snow.png", reqLevel: 28, sound: "sounds/snow.mp3" },
    underground: { name: "地底湖", bg: "images/bg/bg_underground.png", reqLevel: 40, sound: "sounds/underground.mp3" },
    deepsea: { name: "深海", bg: "images/bg/bg_deepsea.png", reqLevel: 55, sound: "sounds/deepsea.mp3" },

    volcano: { name: "火山", bg: "images/bg/bg_volcano.png", reqLevel: 1, gacha: true, matchRod: "lava_rod", sound: "sounds/volcano.mp3" },
    honey: { name: "はちみつ", bg: "images/bg/bg_honey.png", reqLevel: 1, gacha: true, matchRod: "jungle_rod", sound: "sounds/honey.mp3" },
    holy: { name: "聖なる泉", bg: "images/bg/bg_holy.png", reqLevel: 1, gacha: true, matchRod: "holy_rod", sound: "sounds/holy.mp3" },
    ryugu: { name: "竜宮城", bg: "images/bg/bg_ryugu.png", reqLevel: 1, gacha: true, matchRod: "ryugu_rod", sound: "sounds/ryugu.mp3" },
    ruins: { name: "古代遺跡", bg: "images/bg/bg_ruins.png", reqLevel: 1, gacha: true, matchRod: "ruins_rod", sound: "sounds/ruins.mp3" },
    poison: { name: "毒沼", bg: "images/bg/bg_poison.png", reqLevel: 1, gacha: true, matchRod: "poison_rod", sound: "sounds/poison.mp3" },
    milkyway: { name: "天の川", bg: "images/bg/bg_milkyway.png", reqLevel: 1, gacha: true, matchRod: "galaxy_rod", sound: "sounds/milkyway.mp3" },

    eldorado: { 
        name: "黄金郷", 
        bg: "images/bg/bg_eldorado.png", 
        reqLevel: 100, 
        gacha: true, 
        matchRod: "eldorado_rod", 
        matchNet: "divine_net",   
        sound: "sounds/eldorado.mp3" 
    },
    shinju: { name: "神獣界", bg: "images/bg/bg_shinju.png", reqLevel: 250, sound: "sounds/shinju.mp3" }
};
let currentLocation = "sea";
let currentToolMode = "rod"; // "rod" or "net"
let currentShopTab = "rod";  // "rod", "net", or "acc"
let currentGachaSeries = "volcano";

/* ===================================================
   ガチャシリーズ定義（全8種）
   =================================================== */
const GACHA_SERIES_LIST = [
    { key: "volcano", title: "🌋 火山ガチャ", mapKey: "volcano", mapName: "🌋 火山エリア解放", rodKey: "lava_rod", rodName: "🔥 耐溶岩釣り竿", banner: "images/banner/banner_volcano.png", color: "#ff4444" },
    { key: "honey", title: "🍯 はちみつガチャ", mapKey: "honey", mapName: "🍯 はちみつエリア解放", rodKey: "jungle_rod", rodName: "🌿 ジャングルの釣り竿", banner: "images/banner/banner_honey.png", color: "#ffcc00" },
    { key: "holy", title: "✨ 聖なる泉ガチャ", mapKey: "holy", mapName: "✨ 聖なる泉エリア解放", rodKey: "holy_rod", rodName: "⭐ 聖なる釣り竿", banner: "images/banner/banner_holy.png", color: "#00ffcc" },
    { key: "ryugu", title: "⛩️ 竜宮城ガチャ", mapKey: "ryugu", mapName: "⛩️ 竜宮城エリア解放", rodKey: "ryugu_rod", rodName: "👑 乙姫の釣り竿", banner: "images/banner/banner_ryugu.png", color: "#ff66cc" },
    { key: "ruins", title: "🏛️ 古代遺跡ガチャ", mapKey: "ruins", mapName: "🏛️ 古代遺跡エリア解放", rodKey: "ruins_rod", rodName: "🗿 古代の発掘竿", banner: "images/banner/banner_ruins.png", color: "#d2b48c" },
    { key: "poison", title: "☠️ 毒沼ガチャ", mapKey: "poison", mapName: "☠️ 毒沼エリア解放", rodKey: "poison_rod", rodName: "🧪 解毒の釣り竿", banner: "images/banner/banner_poison.png", color: "#a020f0" },
    { key: "milkyway", title: "🌌 天の川ガチャ", mapKey: "milkyway", mapName: "🌌 天の川エリア解放", rodKey: "galaxy_rod", rodName: "🌌 銀河の釣り竿", banner: "images/banner/banner_milkyway.png", color: "#1e90ff" },
    { key: "eldorado", title: "🏆 黄金郷ガチャ", mapKey: "eldorado", mapName: "🏆 黄金郷エリア解放 (0.5%)", rodKey: "eldorado_rod", rodName: "🏆 エルドラドロッド", banner: "images/banner/banner_eldorado.png", color: "#ffd700" }
];

let currentGachaIndex = 0;

/* ===================================================
   釣り竿データ
   =================================================== */
const ROD_DATA = {
    wood: { id: "wood", name: "木の竿", icon: "images/fishingrod/wood_fishing_rod.png", price: 0, desc: "初期装備の質素な竿。特別な能力はない。" },
    iron: { id: "iron", name: "鉄の竿", icon: "images/fishingrod/iron_fishing_rod.png", price: 1800, desc: "頑丈な金属製の竿。連打パワーが増加し大物を釣りやすい。" },
    gold: { id: "gold", name: "金の竿", icon: "images/fishingrod/gold_fishing_rod.png", price: 7500, desc: "黄金に輝く竿。大物やレアな魚がヒットする確率がアップ！" },
    bronze: { id: "bronze", name: "青銅の竿", icon: "images/fishingrod/copper_fishing_rod.png", price: 18000, desc: "深海エリア専用の特化竿。ヒット判定と連打時間が少し長くなる。" },
    legend: { id: "legend", name: "伝説の竿", icon: "images/fishingrod/legendary_fishing_rod.png", price: 60000, desc: "太古の神木で作られた幻の竿。すべてのエリアで全能力が大幅UP！" },
    god_beast_rod: { id: "god_beast_rod", name: "神獣の竿", icon: "images/fishingrod/god_beast_rod.png", price: 150000, desc: "神獣界のボスに対抗できる伝説の竿。連打パワーが爆発的に上昇！" },
    
    lava_rod: { id: "lava_rod", name: "耐溶岩釣り竿", icon: "images/fishingrod/lava_fishing_rod.png", price: 0, gacha: true, desc: "火山エリア特化。溶岩の熱に耐え、通常通りの待ち時間で釣りが可能！" },
    jungle_rod: { id: "jungle_rod", name: "ジャングルの釣り竿", icon: "images/fishingrod/jungle_fishing_rod.png", price: 0, gacha: true, desc: "はちみつエリア特化。粘り気のあるはちみつでもスムーズに釣りが可能！" },
    holy_rod: { id: "holy_rod", name: "聖なる釣り竿", icon: "images/fishingrod/holy_fishing_rod.png", price: 0, gacha: true, desc: "聖なる泉エリア特化。聖なる力を宿し、通常通りの待ち時間で釣りが可能！" },
    dragon_rod: { id: "dragon_rod", name: "龍神の竿", icon: "images/fishingrod/dragon_fishing_rod.png", price: 0, gacha: true, desc: "龍神の加護を受けた究極の秘竿。全特殊エリアで待ち時間なし＋レア大物超大幅UP！" },
    ryugu_rod: { id: "ryugu_rod", name: "乙姫の釣り竿", icon: "images/fishingrod/ryugu_rod.png", price: 0, gacha: true, desc: "竜宮城エリア特化。海底の海底神殿でも安定して釣りが可能！" },
    ruins_rod: { id: "ruins_rod", name: "古代の発掘竿", icon: "images/fishingrod/ruins_rod.png", price: 0, gacha: true, desc: "古代遺跡エリア特化。太古の呪いを無効化して釣りが可能！" },
    poison_rod: { id: "poison_rod", name: "解毒の釣り竿", icon: "images/fishingrod/poison_rod.png", price: 0, gacha: true, desc: "毒沼エリア特化。強力な毒素を浄化し、安全に釣りが可能！" },
    galaxy_rod: { id: "galaxy_rod", name: "銀河の釣り竿", icon: "images/fishingrod/galaxy_rod.png", price: 0, gacha: true, desc: "天の川エリア特化。星々の輝きで宇宙生物を引き寄せる！" },
    eldorado_rod: { id: "eldorado_rod", name: "エルドラドロッド", icon: "images/fishingrod/eldorado_rod.png", price: 0, gacha: true, desc: "黄金郷エリア特化。金ピカの光で黄金郷の生物を即座に引き寄せる！" }
};

/* ===================================================
   捕獲ネットデータ
   =================================================== */
const NET_DATA = {
    bug_net: { id: "bug_net", name: "虫取り網", icon: "images/net/net_bug.png", price: 0, desc: "初期装備の小さな網。小さな水生生物や昆虫を捕獲可能。", targetSize: ["small"] },
    tough_net: { id: "tough_net", name: "丈夫な網", icon: "images/net/net_tough.png", price: 2200, desc: "ナイロン製の破れにくい網。普通サイズの生物まで捕獲可能。", targetSize: ["small", "midi"] },
    iron_net: { id: "iron_net", name: "鉄の網", icon: "images/net/net_iron.png", price: 9000, desc: "鉄線で編まれた強力な網。大きな生き物までガッチリ捕獲！", targetSize: ["small", "midi", "big"] },
    steel_net: { id: "steel_net", name: "鋼鉄ネット", icon: "images/net/net_steel.png", price: 30000, desc: "最高度の鋼鉄製巨大ネット。特大の生物や伝説の怪物もすくい上げる！", targetSize: ["small", "midi", "big", "biggest"] },
    divine_net: { id: "divine_net", name: "神獣の網", icon: "images/net/net_divine.png", price: 0, gacha: true, desc: "神々の祝福を受けた究極のネット。全生物を最高速度で簡単に捕獲！", targetSize: ["small", "midi", "big", "biggest"] }
};

/* ===================================================
   新規アクセサリ＆消耗品データ
   =================================================== */
const ACC_DATA = {
    maki_esa: { id: "maki_esa", name: "まき餌", icon: "images/acc/maki_esa.png", price: 12000, desc: "消耗品。装備中、魚がかかるまでの待ち時間が短縮！" },
    line_tough: { id: "line_tough", name: "丈夫な釣り糸", icon: "images/acc/line_tough.png", price: 15000, desc: "竿用。ミス時に20%の確率で無効化してセーフ！" },
    net_tough: { id: "net_tough", name: "補強ネット", icon: "images/acc/net_tough.png", price: 15000, desc: "網用。ミス時に20%の確率で無効化してセーフ！" },
    bait_reel: { id: "bait_reel", name: "ベイトリール", icon: "images/acc/bait_reel.png", price: 12000, desc: "竿用。大物との戦いでの連打パワーがアップ！" },
    net_fixed: { id: "net_fixed", name: "定置網", icon: "images/acc/net_fixed.png", price: 12000, desc: "網用。大物との戦いでの連打パワーがアップ！" }
};

/* ===================================================
   実績・称号定義データ
   =================================================== */
const ACHIEVEMENT_DATA = {
    first_catch: { id: "first_catch", name: "初めての１匹", icon: "images/trophy/trophy_copper.png", desc: "初めて魚を1匹釣り上げた" },
    fisherman: { id: "fisherman", name: "釣り師", icon: "images/trophy/trophy_copper.png", desc: "累計20匹の魚を釣り上げた" },
    king_fisher: { id: "king_fisher", name: "爆釣王", icon: "images/trophy/trophy_silver.png", desc: "累計100匹の魚を釣り上げた" },
    combo_master: { id: "combo_master", name: "一閃マスター", icon: "images/trophy/trophy_silver.png", desc: "一度も失敗せず30匹連続で釣り上げた" },

    net_first: { id: "net_first", name: "初めての捕獲", icon: "images/trophy/trophy_copper.png", desc: "初めてネット(網)で生き物を1匹捕まえた" },
    net_apprentice: { id: "net_apprentice", name: "捕獲見習い", icon: "images/trophy/trophy_copper.png", desc: "累計20匹の生き物をネットで捕まえた" },
    net_master: { id: "net_master", name: "ネットマスター", icon: "images/trophy/trophy_silver.png", desc: "累計100匹の生き物をネットで捕まえた" },
    net_combo_master: { id: "net_combo_master", name: "一網打尽！", icon: "images/trophy/trophy_silver.png", desc: "一度も失敗せず30匹連続でネットで捕まえた" },
    
    miss_master: { id: "miss_master", name: "準備運動はそこまでだ。", icon: "images/trophy/trophy_copper.png", desc: "通算で50回捕獲（または釣り）に失敗した" },
    thousand_catches: { id: "thousand_catches", name: "おさかな無双", icon: "images/trophy/trophy_gold.png", desc: "累計で1,000匹の生き物を捕獲した（竿＋網）" },
    
    comp_sea: { id: "comp_sea", name: "海の支配者", icon: "images/trophy/trophy_silver.png", desc: "海の生き物をすべて図鑑に登録した" },
    comp_river: { id: "comp_river", name: "清流の主", icon: "images/trophy/trophy_silver.png", desc: "川の生き物をすべて図鑑に登録した" },
    comp_swamp: { id: "comp_swamp", name: "秘境の怪人", icon: "images/trophy/trophy_silver.png", desc: "沼地の生き物をすべて図鑑に登録した" },
    comp_lake: { id: "comp_lake", name: "大湖の征服者", icon: "images/trophy/trophy_silver.png", desc: "湖の生き物をすべて図鑑に登録した" },
    comp_snow: { id: "comp_snow", name: "氷雪の探検家", icon: "images/trophy/trophy_silver.png", desc: "雪山の生き物をすべて図鑑に登録した" },
    comp_underground: { id: "comp_underground", name: "洞窟の探索者", icon: "images/trophy/trophy_silver.png", desc: "地底湖の生き物をすべて図鑑に登録した" },
    comp_deepsea: { id: "comp_deepsea", name: "深海の覇者", icon: "images/trophy/trophy_silver.png", desc: "深海の生き物をすべて図鑑に登録した" },
    
    comp_volcano: { id: "comp_volcano", name: "ドラゴン誕生", icon: "images/trophy/trophy_silver.png", desc: "火山の生き物をすべて図鑑に登録した" },
    comp_honey: { id: "comp_honey", name: "ハチミツ食べる？", icon: "images/trophy/trophy_silver.png", desc: "はちみつの生き物をすべて図鑑に登録した" },
    comp_holy: { id: "comp_holy", name: "妖精の導き", icon: "images/trophy/trophy_silver.png", desc: "聖なる泉の生き物をすべて図鑑に登録した" },
    comp_ryugu: { id: "comp_ryugu", name: "竜宮の賓客", icon: "images/trophy/trophy_silver.png", desc: "竜宮城の生き物をすべて図鑑に登録した" },
    comp_ruins: { id: "comp_ruins", name: "太古の解明者", icon: "images/trophy/trophy_silver.png", desc: "古代遺跡の生き物をすべて図鑑に登録した" },
    comp_poison: { id: "comp_poison", name: "毒耐性皆伝", icon: "images/trophy/trophy_silver.png", desc: "毒沼の生き物をすべて図鑑に登録した" },
    comp_milkyway: { id: "comp_milkyway", name: "銀河の旅行者", icon: "images/trophy/trophy_silver.png", desc: "天の川の生き物をすべて図鑑に登録した" },
    comp_eldorado: { id: "comp_eldorado", name: "輝きの支配", icon: "images/trophy/trophy_gold.png", desc: "黄金郷の生き物をすべて図鑑に登録した" },
    comp_shinju: { id: "comp_shinju", name: "汝の願いは？", icon: "images/trophy/trophy_gold.png", desc: "神獣界の生き物をすべて図鑑に登録した" },
    
    buy_all_shop: { id: "buy_all_shop", name: "ぜ～んぶください！", icon: "images/trophy/trophy_gold.png", desc: "ショップのすべてのアイテムを購入した" },
    comp_all_rods: { id: "comp_all_rods", name: "ストックは何本？", icon: "images/trophy/trophy_gold.png", desc: "すべての釣り竿（ガチャ限定含む）を獲得した" },
    comp_all_nets: { id: "comp_all_nets", name: "夏休みは終わったよ？", icon: "images/trophy/trophy_gold.png", desc: "すべての捕獲ネット（ガチャ限定含む）を獲得した" },
    rich_man: { id: "rich_man", name: "大金持ち", icon: "images/trophy/trophy_silver.png", desc: "所持金が10,000ゴールドに達した" },
    ultra_rich: { id: "ultra_rich", name: "ガチャでも引いてみる？", icon: "images/trophy/trophy_gold.png", desc: "所持金が100,000ゴールドに達した" },
    all_maps: { id: "all_maps", name: "航海時代", icon: "images/trophy/trophy_gold.png", desc: "すべての基本エリア(全7箇所)を解放した" },
    secret_logo: { id: "secret_logo", name: "ゲーミングフィッシング～！", icon: "images/trophy/trophy_copper.png", desc: "タイトルロゴを10回連打すると…？" },
    zukan_master: { id: "zukan_master", name: "伝説の釣り人", icon: "images/trophy/trophy_gold.png", desc: "おさかな絵巻(全種類の魚)をコンプリートした" },
    hero_reincarnation: { id: "hero_reincarnation", name: "英雄、転生の時…", icon: "images/trophy/trophy_gold.png", desc: "おさかな絵巻（通常・ガチャ）を全コンプリートした状態でデータをリセットした" },
    returned_friend: { id: "returned_friend", name: "帰ってきた友", icon: "images/trophy/trophy_gold.png", desc: "ゲームの2周目でおさかな絵巻（通常・ガチャ）を再び全コンプリートした" }
};

   /* ===================================================
      魚・水生生物データ (全162件)
      =================================================== */
   const FISH_DATA = [
       // 1. 海 (sea) - 竿
       { id: 1, name: "マイワシ", location: "sea", toolType: "rod", price: 40, image: "images/fish/iwasi.png", shadowImage: "images/shadows/shadow_small.png", desc: "群れをなして泳ぐ大衆魚。栄養満点。", reqTime: 1.100, shadowWidth: 60, shadowHeight: 25, isBig: false, weight: 35 },
       { id: 2, name: "マアジ", location: "sea", toolType: "rod", price: 50, image: "images/fish/fish_aji.png", shadowImage: "images/shadows/shadow_small.png", desc: "沿岸部に生息するおなじみの魚。刺身やフライで人気。", reqTime: 1.000, shadowWidth: 70, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 3, name: "マダイ", location: "sea", toolType: "rod", price: 150, image: "images/fish/fish_tai.png", shadowImage: "images/shadows/shadow_midi.png", desc: "「魚の王様」と称されるめでたい高級魚。", reqTime: 0.800, shadowWidth: 100, shadowHeight: 45, isBig: false, weight: 30 },
       { id: 4, name: "アマエビ", location: "sea", toolType: "rod", price: 80, image: "images/fish/fish_amaebi.png", shadowImage: "images/shadows/shadow_small.png", desc: "とろけるような甘みが特徴の鮮やかなエビ。", reqTime: 0.950, shadowWidth: 60, shadowHeight: 25, isBig: false, weight: 25 },
       { id: 5, name: "アナゴ", location: "sea", toolType: "rod", price: 100, image: "images/fish/fish_anago.png", shadowImage: "images/shadows/shadow_midi.png", desc: "細長い体を持つ魚。天ぷらや煮付けが絶品。", reqTime: 0.900, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 6, name: "サンマ", location: "sea", toolType: "rod", price: 100, image: "images/fish/sanma.png", shadowImage: "images/shadows/shadow_small.png", desc: "秋の味覚の代表格。刀のような細長い魚体。", reqTime: 0.900, shadowWidth: 80, shadowHeight: 20, isBig: false, weight: 25 },
       { id: 7, name: "マサバ", location: "sea", toolType: "rod", price: 110, image: "images/fish/saba.png", shadowImage: "images/shadows/shadow_midi.png", desc: "背中のサバ折り模様が特徴。味噌煮やしめさばに。", reqTime: 0.850, shadowWidth: 85, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 8, name: "クマノミ", location: "sea", toolType: "rod", price: 150, image: "images/fish/fish_kumanomi.png", shadowImage: "images/shadows/shadow_small.png", desc: "イソギンチャクと共生する鮮やかなオレンジ色の魚。", reqTime: 0.900, shadowWidth: 60, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 145, name: "ナンヨウハギ", location: "sea", toolType: "rod", price: 160, image: "images/fish/nanyouhagi.png", shadowImage: "images/shadows/shadow_small.png", desc: "鮮やかなブルーの体色と黄色の尾ビレが人気の熱帯魚。", reqTime: 0.850, shadowWidth: 65, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 86, name: "チンアナゴ", location: "sea", toolType: "rod", price: 130, image: "images/fish/chinanago.png", shadowImage: "images/shadows/shadow_small.png", desc: "砂底から顔をひょっこり出す姿が人気の細長い魚。", reqTime: 0.900, shadowWidth: 50, shadowHeight: 25, isBig: false, weight: 20 },
       { id: 9, name: "カレイ", location: "sea", toolType: "rod", price: 130, image: "images/fish/karei.png", shadowImage: "images/shadows/shadow_midi.png", desc: "ヒラメに似ているが右側に目が寄っている煮付けの定番。", reqTime: 0.850, shadowWidth: 95, shadowHeight: 40, isBig: false, weight: 25 },
       { id: 10, name: "カサゴ", location: "sea", toolType: "rod", price: 160, image: "images/fish/kasago.png", shadowImage: "images/shadows/shadow_midi.png", desc: "大きな頭と棘を持つ根魚。唐揚げが美味しい。", reqTime: 0.800, shadowWidth: 85, shadowHeight: 40, isBig: false, weight: 25 },
       { id: 11, name: "ニシン", location: "sea", toolType: "rod", price: 90, image: "images/fish/nisin.png", shadowImage: "images/shadows/shadow_midi.png", desc: "「春を告げる魚」として知られる回遊魚。", reqTime: 0.900, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 12, name: "ヒラメ", location: "sea", toolType: "rod", price: 220, image: "images/fish/hirame.png", shadowImage: "images/shadows/shadow_midi.png", desc: "砂底に化けて獲物を待つ平たい肉食魚。", reqTime: 0.750, shadowWidth: 110, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 13, name: "カワハギ", location: "sea", toolType: "rod", price: 180, image: "images/fish/kawahagi.png", shadowImage: "images/shadows/shadow_small.png", desc: "皮が簡単に剥がせる。濃厚なキモが絶品。", reqTime: 0.800, shadowWidth: 75, shadowHeight: 35, isBig: false, weight: 20 },
       { id: 14, name: "ハリセンボン", location: "sea", toolType: "rod", price: 120, image: "images/fish/fish_harisenbon.png", shadowImage: "images/shadows/shadow_midi.png", desc: "危険を感じると体を丸く膨らませ針を立てる。", reqTime: 0.850, shadowWidth: 80, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 15, name: "トビウオ", location: "sea", toolType: "rod", price: 140, image: "images/fish/tobiuo.png", shadowImage: "images/shadows/shadow_midi.png", desc: "大きな胸ビレを広げて水面を数百度滑空する。", reqTime: 0.800, shadowWidth: 80, shadowHeight: 35, isBig: false, weight: 20 },
       { id: 16, name: "ヤリイカ", location: "sea", toolType: "rod", price: 160, image: "images/fish/yariika.png", shadowImage: "images/shadows/shadow_midi.png", desc: "槍のように細長い先端を持つ透明感のあるイカ。", reqTime: 0.800, shadowWidth: 85, shadowHeight: 30, isBig: false, weight: 20 },
       { id: 19, name: "フグ", location: "sea", toolType: "rod", price: 300, image: "images/fish/hugu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "高級食材だがテトロドトキシンという猛毒を持つ。", reqTime: 0.700, shadowWidth: 90, shadowHeight: 45, isBig: false, weight: 15 },
       { id: 17, name: "カツオ", location: "sea", toolType: "rod", price: 350, image: "images/fish/katuo.png", shadowImage: "images/shadows/shadow_big.png", desc: "たたきで有名な回遊魚。鋭い引きを見せる。", reqTime: 0.650, shadowWidth: 120, shadowHeight: 45, isBig: true, weight: 15, tapPower: 10, decaySpeed: 1.2 },
       { id: 18, name: "エイ", location: "sea", toolType: "rod", price: 200, image: "images/fish/fish_ei.png", shadowImage: "images/shadows/shadow_big.png", desc: "大きなひれを羽ばたかせるように泳ぐ巨大魚。", reqTime: 0.700, shadowWidth: 120, shadowHeight: 50, isBig: true, weight: 15, tapPower: 10, decaySpeed: 1.1 },
       { id: 20, name: "ホラアナゴ", location: "sea", toolType: "rod", price: 250, image: "images/fish/fish_horaanago.png", shadowImage: "images/shadows/shadow_midi.png", desc: "海底の岩陰などにひっそりと生息する深海性アナゴ。", reqTime: 0.750, shadowWidth: 90, shadowHeight: 30, isBig: false, weight: 15 },
       { id: 146, name: "イシダイ", location: "sea", toolType: "rod", price: 280, image: "images/fish/isidai.png", shadowImage: "images/shadows/shadow_midi.png", desc: "黒と白の縞模様が特徴。強靭なアゴで貝をも噛み砕く磯の王者。", reqTime: 0.700, shadowWidth: 90, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 21, name: "ウツボ", location: "sea", toolType: "rod", price: 350, image: "images/fish/utubo.png", shadowImage: "images/shadows/shadow_big.png", desc: "海のギャングと呼ばれる鋭い歯を持った気荒な魚。", reqTime: 0.650, shadowWidth: 130, shadowHeight: 35, isBig: true, weight: 15, tapPower: 9, decaySpeed: 1.2 },
       { id: 22, name: "クロマグロ", location: "sea", toolType: "rod", price: 500, image: "images/fish/fish_maguro.png", shadowImage: "images/shadows/shadow_big.png", desc: "大海原の最速ランナー。「黒いダイヤ」と呼ばれる最高級魚。", reqTime: 0.600, shadowWidth: 140, shadowHeight: 55, isBig: true, weight: 12, tapPower: 11, decaySpeed: 1.2 },
       { id: 23, name: "マダラ", location: "sea", toolType: "rod", price: 400, image: "images/fish/tara.png", shadowImage: "images/shadows/shadow_big.png", desc: "寒冷な海に棲む大食漢の深場魚。鍋物に最適。", reqTime: 0.600, shadowWidth: 130, shadowHeight: 45, isBig: true, weight: 12, tapPower: 9, decaySpeed: 1.3 },
       { id: 147, name: "コブダイ", location: "sea", toolType: "rod", price: 420, image: "images/fish/kobudi.png", shadowImage: "images/shadows/shadow_big.png", desc: "成長すると頭部に大きなコブが発達する貫録ある大型魚。", reqTime: 0.600, shadowWidth: 120, shadowHeight: 45, isBig: true, weight: 12, tapPower: 10, decaySpeed: 1.2 },
       { id: 24, name: "サメ", location: "sea", toolType: "rod", price: 600, image: "images/fish/fish_same1.png", shadowImage: "images/shadows/shadow_big.png", desc: "鋭い歯と優れた嗅覚を持つ海のハンター。", reqTime: 0.550, shadowWidth: 150, shadowHeight: 50, isBig: true, weight: 10, tapPower: 10, decaySpeed: 1.3 },
       { id: 25, name: "シュモクザメ", location: "sea", toolType: "rod", price: 700, image: "images/fish/hammer.png", shadowImage: "images/shadows/shadow_big.png", desc: "T字型の頭部が特徴的なインパクトあるサメ。", reqTime: 0.500, shadowWidth: 150, shadowHeight: 55, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.4 },
       { id: 26, name: "イルカ", location: "sea", toolType: "rod", price: 800, image: "images/fish/iruka.png", shadowImage: "images/shadows/shadow_big.png", desc: "知能が高くジャンプが得意な海のアイドル。", reqTime: 0.500, shadowWidth: 140, shadowHeight: 50, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.3 },
       { id: 144, name: "マンタ", location: "sea", toolType: "rod", price: 850, image: "images/fish/manta.png", shadowImage: "images/shadows/shadow_big.png", desc: "大きな胸ビレを羽ばたかせて海を舞う世界最大のエイ。", reqTime: 0.500, shadowWidth: 140, shadowHeight: 55, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.3 },
       { id: 27, name: "カジキ", location: "sea", toolType: "rod", price: 900, image: "images/fish/kaziki.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "槍のように鋭い上アゴを持つ巨大トローリング対象魚。", reqTime: 0.450, shadowWidth: 170, shadowHeight: 50, isBig: true, weight: 5, tapPower: 8, decaySpeed: 1.5 },
       { id: 148, name: "マンボウ", location: "sea", toolType: "rod", price: 1100, image: "images/fish/manbou.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "独特な丸い体で海面近くをゆったりと漂う巨大魚。", reqTime: 0.450, shadowWidth: 160, shadowHeight: 60, isBig: true, weight: 6, tapPower: 7, decaySpeed: 1.4 },
       { id: 28, name: "チョウザメ", location: "sea", toolType: "rod", price: 1200, image: "images/fish/tyouzame.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "キャビアを生む古代魚の生き残り。", reqTime: 0.450, shadowWidth: 160, shadowHeight: 45, isBig: true, weight: 5, tapPower: 7, decaySpeed: 1.4 },
       { id: 29, name: "シャチ", location: "sea", toolType: "rod", price: 1500, image: "images/fish/syati.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "「海のハンター」と呼ばれる高い知能を持つ大型海獣。", reqTime: 0.400, shadowWidth: 180, shadowHeight: 55, isBig: true, weight: 4, tapPower: 6, decaySpeed: 1.5 },
       { id: 149, name: "マッコウクジラ", location: "sea", toolType: "rod", price: 2500, image: "images/fish/kuzira.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "巨大な頭部を持ち、深海まで潜水してダイオウイカを狩るマッコウクジラ。", reqTime: 0.380, shadowWidth: 210, shadowHeight: 60, isBig: true, weight: 3, tapPower: 5, decaySpeed: 1.6 },
       { id: 31, name: "ジンベエザメ", location: "sea", toolType: "rod", price: 3000, image: "images/fish/zinbei.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "世界最大の魚類。温厚でプランクトンを食べる。", reqTime: 0.350, shadowWidth: 220, shadowHeight: 65, isBig: true, weight: 2, tapPower: 5, decaySpeed: 1.7 },
       { id: 150, name: "シロナガスクジラ", location: "sea", toolType: "rod", price: 4000, image: "images/fish/sironagasukujira.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "地球の歴史上で最大の体長を誇る大海原の超巨大哺乳類。", reqTime: 0.350, shadowWidth: 230, shadowHeight: 70, isBig: true, weight: 1, tapPower: 4, decaySpeed: 1.8 },
   
       { id: 32, name: "ヒトデ", location: "sea", toolType: "net", netSize: "small", price: 20, image: "images/fish/hitode.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】星の形をした棘皮動物。磯でよく見かける。", reqTime: 1.200, shadowWidth: 45, shadowHeight: 45, isBig: false, weight: 45 },
       { id: 33, name: "ヤドカリ", location: "sea", toolType: "net", netSize: "small", price: 40, image: "images/fish/yadokari.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】貝殻を背負ってトコトコ歩く浅瀬のアイドル。", reqTime: 1.200, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 40 },
       { id: 34, name: "アサリ", location: "sea", toolType: "net", netSize: "small", price: 30, image: "images/fish/fish_asari.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】潮干狩りでおなじみの二枚貝。味噌汁にぴったり。", reqTime: 1.200, shadowWidth: 40, shadowHeight: 30, isBig: false, weight: 40 },
       { id: 35, name: "クラゲ", location: "sea", toolType: "net", netSize: "midi", price: 60, image: "images/fish/kurage.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】ゆらゆらと海を漂う刺胞動物。", reqTime: 1.100, shadowWidth: 65, shadowHeight: 50, isBig: false, weight: 35 },
       { id: 151, name: "ウミウシ", location: "sea", toolType: "net", netSize: "small", price: 80, image: "images/fish/umiusi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】「海の宝石」と呼ばれる色鮮やかでカラフルな軟体生物。", reqTime: 1.100, shadowWidth: 40, shadowHeight: 25, isBig: false, weight: 35 },
       { id: 36, name: "ナマコ", location: "sea", toolType: "net", netSize: "small", price: 90, image: "images/fish/namako.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】海底に転がっているグロテスクだが美味しい生き物。", reqTime: 1.100, shadowWidth: 55, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 37, name: "ハマグリ", location: "sea", toolType: "net", netSize: "small", price: 120, image: "images/fish/fish_hamaguri.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】ひな祭りや祝い事に使われる大きな二枚貝。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 38, name: "カキ", location: "sea", toolType: "net", netSize: "small", price: 180, image: "images/fish/kaki.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】「海のミルク」と呼ばれる栄養満点の二枚貝。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 39, name: "シャコ", location: "sea", toolType: "net", netSize: "small", price: 110, image: "images/fish/syako.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】強力なパンチを繰り出す底生の甲殻類。寿司ネタに。", reqTime: 0.900, shadowWidth: 60, shadowHeight: 25, isBig: false, weight: 25 },
       { id: 40, name: "マダコ", location: "sea", toolType: "net", netSize: "midi", price: 250, image: "images/fish/madako.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】8本の足と高い知能を持つ頭足類。", reqTime: 0.750, shadowWidth: 80, shadowHeight: 50, isBig: false, weight: 20 },
       { id: 41, name: "サザエ", location: "sea", toolType: "net", netSize: "small", price: 200, image: "images/fish/sazae.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】トゲトゲの貝殻を持つ壺焼きの定番貝。", reqTime: 0.950, shadowWidth: 45, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 42, name: "ウニ", location: "sea", toolType: "net", netSize: "small", price: 250, image: "images/fish/uni.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】全身が鋭いトゲで覆われた高級食材。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 45, isBig: false, weight: 20 },
       { id: 43, name: "アワビ", location: "sea", toolType: "net", netSize: "midi", price: 300, image: "images/fish/fish_awabi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】コリコリとした食感が最高の高級一枚貝。", reqTime: 0.850, shadowWidth: 50, shadowHeight: 35, isBig: false, weight: 15 },
       { id: 44, name: "ウミヘビ", location: "sea", toolType: "net", netSize: "midi", price: 300, image: "images/fish/umihebi.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】強力な毒を持つ海生の爬虫類。", reqTime: 0.700, shadowWidth: 90, shadowHeight: 25, isBig: false, weight: 15 },
       { id: 87, name: "トビハゼ", location: "sea", toolType: "net", netSize: "small", price: 50, image: "images/fish/tobihaze.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】干潟をピョンピョンと跳ね回る可愛らしいハゼ。", reqTime: 1.100, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 35 },
       { id: 88, name: "アメフラシ", location: "sea", toolType: "net", netSize: "small", price: 45, image: "images/fish/amefurashi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】紫色の液を出す軟体生物。磯のあちこちにいる。", reqTime: 1.150, shadowWidth: 50, shadowHeight: 30, isBig: false, weight: 35 },
       { id: 89, name: "テッポウエビ", location: "sea", toolType: "net", netSize: "small", price: 75, image: "images/fish/teppouebi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】大きなハサミを鳴らして衝撃波を繰り出すエビ。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 45, name: "イセエビ", location: "sea", toolType: "net", netSize: "midi", price: 500, image: "images/fish/iseebi.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】立派な髭と硬い甲羅を持つ最高級エビ。", reqTime: 0.700, shadowWidth: 75, shadowHeight: 40, isBig: false, weight: 12 },
       { id: 46, name: "ウミガメ", location: "sea", toolType: "net", netSize: "big", price: 700, image: "images/fish/umigame.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】砂浜で産卵する優雅に泳ぐ大きなカメ。", reqTime: 0.600, shadowWidth: 110, shadowHeight: 60, isBig: true, weight: 8, tapPower: 10, decaySpeed: 1.1 },
       { id: 152, name: "タカアシガニ", location: "sea", toolType: "net", netSize: "biggest", price: 900, image: "images/fish/takaasigani.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】世界最大の脚の長さを誇る深海に生息する巨大なカニ。", reqTime: 0.500, shadowWidth: 130, shadowHeight: 55, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.3 },
   
       // 2. 川 (river) - 竿/網
       { id: 47, name: "メダカ", location: "river", toolType: "rod", price: 20, image: "images/fish/medaka.png", shadowImage: "images/shadows/shadow_small.png", desc: "日本の小川や田んぼで見られる最小級の淡水魚。", reqTime: 1.200, shadowWidth: 35, shadowHeight: 15, isBig: false, weight: 40 },
       { id: 153, name: "ネオンテトラ", location: "river", toolType: "rod", price: 30, image: "images/fish/neontetora.png", shadowImage: "images/shadows/shadow_small.png", desc: "青と赤のラインがネオンのように輝く綺麗で小さな熱帯魚。", reqTime: 1.150, shadowWidth: 35, shadowHeight: 15, isBig: false, weight: 40 },
       { id: 154, name: "赤ベタ", location: "river", toolType: "rod", price: 90, image: "images/fish/akabeta.png", shadowImage: "images/shadows/shadow_small.png", desc: "優雅で大きなヒレと真っ赤な体色が美しい闘魚（ベタ）。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 155, name: "青ベタ", location: "river", toolType: "rod", price: 90, image: "images/fish/aobeta.png", shadowImage: "images/shadows/shadow_small.png", desc: "深みのある鮮やかな青色のヒレをなびかせて泳ぐベタ。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 48, name: "アユ", location: "river", toolType: "rod", price: 100, image: "images/fish/fish_ayu.png", shadowImage: "images/shadows/shadow_small.png", desc: "「香魚」とも呼ばれる清流のシンボル。塩焼きが最高。", reqTime: 0.900, shadowWidth: 65, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 49, name: "ヤマメ", location: "river", toolType: "rod", price: 120, image: "images/fish/fish_yamame.png", shadowImage: "images/shadows/shadow_small.png", desc: "「渓流の女王」と称されるパーマークが美しい魚。", reqTime: 0.850, shadowWidth: 65, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 50, name: "ドジョウ", location: "river", toolType: "rod", price: 60, image: "images/fish/fish_dozyou.png", shadowImage: "images/shadows/shadow_small.png", desc: "田んぼや小川の泥底に生息するヒゲのある魚。", reqTime: 1.000, shadowWidth: 55, shadowHeight: 20, isBig: false, weight: 35 },
       { id: 51, name: "ニジマス", location: "river", toolType: "rod", price: 130, image: "images/fish/fish_nijimasu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "体に虹色の美しい帯模様を持つ淡水トラウト。", reqTime: 0.850, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 52, name: "コイ", location: "river", toolType: "rod", price: 200, image: "images/fish/koi.png", shadowImage: "images/shadows/shadow_midi.png", desc: "生命力が強く長寿な淡水魚。色鮮やかな個体も。", reqTime: 0.750, shadowWidth: 110, shadowHeight: 45, isBig: false, weight: 20 },
       { id: 53, name: "サケ", location: "river", toolType: "rod", price: 250, image: "images/fish/sake.png", shadowImage: "images/shadows/shadow_midi.png", desc: "川で生まれ海へ下り、再び生まれ故郷の川へ戻る。", reqTime: 0.700, shadowWidth: 110, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 54, name: "ウナギ", location: "river", toolType: "rod", price: 400, image: "images/fish/unagi.png", shadowImage: "images/shadows/shadow_midi.png", desc: "ヌルヌルとしたスタミナ抜群の高級淡水魚。", reqTime: 0.700, shadowWidth: 100, shadowHeight: 25, isBig: false, weight: 15 },
       { id: 55, name: "サクラマス", location: "river", toolType: "rod", price: 350, image: "images/fish/masu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "ヤマメが海へ下り大型化して川へ遡上した姿。", reqTime: 0.650, shadowWidth: 105, shadowHeight: 35, isBig: false, weight: 15 },
       { id: 56, name: "アメンボ", location: "river", toolType: "net", netSize: "small", price: 30, image: "images/fish/net_amenbo.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】水面に浮かび、スイスイと滑るように泳ぐ昆虫。", reqTime: 1.200, shadowWidth: 45, shadowHeight: 20, isBig: false, weight: 50 },
       { id: 57, name: "カニ", location: "river", toolType: "net", netSize: "small", price: 70, image: "images/fish/kani.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】横歩きする可愛い甲殻類。", reqTime: 1.100, shadowWidth: 50, shadowHeight: 30, isBig: false, weight: 35 },
       { id: 58, name: "サワガニ", location: "river", toolType: "net", netSize: "midi", price: 90, image: "images/fish/net_sawagani.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】きれいな渓流の石の下に潜む小さなカニ。", reqTime: 0.900, shadowWidth: 55, shadowHeight: 30, isBig: false, weight: 35 },
   
       // 3. 沼地 (swamp) - 竿/網
       { id: 90, name: "フナ", location: "swamp", toolType: "rod", price: 90, image: "images/fish/huna.png", shadowImage: "images/shadows/shadow_small.png", desc: "「釣りはフナに始まりフナに終わる」と言われる身近な川魚。", reqTime: 1.000, shadowWidth: 60, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 91, name: "ブルーギル", location: "swamp", toolType: "rod", price: 110, image: "images/fish/bluegill.png", shadowImage: "images/shadows/shadow_small.png", desc: "青いエラが特徴の外来魚。", reqTime: 0.950, shadowWidth: 65, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 61, name: "ピラニア", location: "swamp", toolType: "rod", price: 280, image: "images/fish/pirania.png", shadowImage: "images/shadows/shadow_small.png", desc: "アマゾン川に棲む鋭い歯を持った危険な肉食魚。", reqTime: 0.700, shadowWidth: 70, shadowHeight: 35, isBig: false, weight: 15 },
       { id: 59, name: "ナマズ", location: "swamp", toolType: "rod", price: 180, image: "images/fish/fish_namazu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "夜行性で立派なヒゲを持つ泥底の主。", reqTime: 0.800, shadowWidth: 100, shadowHeight: 40, isBig: false, weight: 25 },
       { id: 62, name: "スッポン", location: "swamp", toolType: "rod", price: 450, image: "images/fish/suppon.png", shadowImage: "images/shadows/shadow_midi.png", desc: "噛みついたら離さない甲羅が柔らかいカメ。", reqTime: 0.650, shadowWidth: 85, shadowHeight: 45, isBig: false, weight: 12 },
       { id: 60, name: "ライギョ", location: "swamp", toolType: "rod", price: 300, image: "images/fish/fish_raigyo.png", shadowImage: "images/shadows/shadow_big.png", desc: "蛇のような頭部を持つスネークヘッド。強力な引き。", reqTime: 0.650, shadowWidth: 120, shadowHeight: 40, isBig: true, weight: 15, tapPower: 10, decaySpeed: 1.2 },
       { id: 63, name: "ピラルク", location: "swamp", toolType: "rod", price: 1800, image: "images/fish/piraruku.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "世界最大級の淡水魚。赤いグラデーションのウロコが特徴。", reqTime: 0.400, shadowWidth: 180, shadowHeight: 50, isBig: true, weight: 3, tapPower: 6, decaySpeed: 1.5 },
       { id: 92, name: "オタマジャクシ", location: "swamp", toolType: "net", netSize: "small", price: 15, image: "images/fish/otamajakushi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】やがてカエルになる丸くて可愛い幼生。", reqTime: 1.250, shadowWidth: 35, shadowHeight: 20, isBig: false, weight: 45 },
       { id: 64, name: "タガメ", location: "swamp", toolType: "net", netSize: "midi", price: 250, image: "images/fish/net_tagame.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】水生昆虫の王様。大きな鋭い前脚で獲物を捕らえる。", reqTime: 0.750, shadowWidth: 70, shadowHeight: 35, isBig: false, weight: 30 },
       { id: 93, name: "トノサマガエル", location: "swamp", toolType: "net", netSize: "small", price: 80, image: "images/fish/tonosamagaeru.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】立派な模様と跳躍力を持つ田んぼや沼の定番カエル。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 35 },
       { id: 94, name: "アカハライモリ", location: "swamp", toolType: "net", netSize: "small", price: 100, image: "images/fish/akaharaimori.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】お腹が赤く黒い斑点模様を持つ可愛らしい両生類。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 95, name: "クサガメ", location: "swamp", toolType: "net", netSize: "midi", price: 160, image: "images/fish/kusagame.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】甲羅に3本のすじを持つ身近な淡水ガメ。", reqTime: 0.900, shadowWidth: 65, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 156, name: "ワニガメ", location: "swamp", toolType: "net", netSize: "big", price: 650, image: "images/fish/wanigame.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】怪獣のような甲羅と強力なアゴを持つ超大型淡水ガメ。", reqTime: 0.600, shadowWidth: 100, shadowHeight: 50, isBig: true, weight: 10, tapPower: 9, decaySpeed: 1.2 },
   
       // 4. 湖 (lake) - 竿/網
       { id: 96, name: "ワカサギ", location: "lake", toolType: "rod", price: 60, image: "images/fish/wakasagi.png", shadowImage: "images/shadows/shadow_small.png", desc: "氷上の穴釣りで有名な小型淡水魚。天ぷらにすると絶品。", reqTime: 1.100, shadowWidth: 40, shadowHeight: 15, isBig: false, weight: 35 },
       { id: 65, name: "キンギョ", location: "lake", toolType: "rod", price: 50, image: "images/fish/kingyo.png", shadowImage: "images/shadows/shadow_small.png", desc: "観賞魚として古くから親しまれている赤い魚。", reqTime: 1.100, shadowWidth: 50, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 66, name: "バス", location: "lake", toolType: "rod", price: 150, image: "images/fish/fish_basu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "ルアーフィッシングでお馴染みの積極的な肉食魚。", reqTime: 0.800, shadowWidth: 90, shadowHeight: 40, isBig: false, weight: 30 },
       { id: 67, name: "ブラックバス", location: "lake", toolType: "rod", price: 220, image: "images/fish/fish_blackbass.png", shadowImage: "images/shadows/shadow_midi.png", desc: "大きな口で何でも呑み込むパワーファイター。", reqTime: 0.750, shadowWidth: 100, shadowHeight: 45, isBig: false, weight: 25 },
       { id: 157, name: "アロワナ", location: "lake", toolType: "rod", price: 800, image: "images/fish/arowana.png", shadowImage: "images/shadows/shadow_big.png", desc: "「龍魚」とも呼ばれ珍重される、金属光沢の美しい大型古代魚。", reqTime: 0.500, shadowWidth: 130, shadowHeight: 40, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.3 },
       { id: 97, name: "ヤゴ", location: "lake", toolType: "net", netSize: "small", price: 40, image: "images/fish/yago.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】トンボの水中での幼虫。水草の陰に潜む。", reqTime: 1.150, shadowWidth: 40, shadowHeight: 20, isBig: false, weight: 40 },
       { id: 99, name: "タニシ", location: "lake", toolType: "net", netSize: "small", price: 25, image: "images/fish/tanishi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】石や泥にくっついている巻貝。", reqTime: 1.250, shadowWidth: 35, shadowHeight: 25, isBig: false, weight: 45 },
       { id: 98, name: "ゲンゴロウ", location: "lake", toolType: "net", netSize: "small", price: 120, image: "images/fish/gengorou.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】泳ぎが得意な水生甲虫。黒く美しい体を持つ。", reqTime: 0.950, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 68, name: "アメリカザリガニ", location: "lake", toolType: "net", netSize: "small", price: 80, image: "images/fish/zarigani.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】大きな赤いハサミがかっこいい池の定番人気者。", reqTime: 1.000, shadowWidth: 60, shadowHeight: 30, isBig: false, weight: 35 },
       { id: 69, name: "ウーパールーパー", location: "lake", toolType: "net", netSize: "small", price: 400, image: "images/fish/uparupa.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】ピンクの体とエラがチャーミングなメキシコサンショウウオ。", reqTime: 0.850, shadowWidth: 55, shadowHeight: 25, isBig: false, weight: 15 },
       
       // 5. 雪山 (snow) - 竿/網
       { id: 100, name: "コオリウオ", location: "snow", toolType: "rod", price: 280, image: "images/fish/kooriuo.png", shadowImage: "images/shadows/shadow_midi.png", desc: "極寒の海に生息する、血液が透明な不思議な魚。", reqTime: 0.750, shadowWidth: 75, shadowHeight: 25, isBig: false, weight: 20 },
       { id: 70, name: "イワナ", location: "snow", toolType: "rod", price: 160, image: "images/fish/iwana.png", shadowImage: "images/shadows/shadow_small.png", desc: "最源流域の冷たい澄んだ水に生息する渓流魚。", reqTime: 0.800, shadowWidth: 70, shadowHeight: 25, isBig: false, weight: 25 },
       { id: 138, name: "ナンキョクカジカ", location: "snow", toolType: "rod", price: 320, image: "images/fish/nankyokukajika.png", shadowImage: "images/shadows/shadow_midi.png", desc: "極寒の南極海に生息する、凍らない血液を持つ不思議な魚。", reqTime: 0.700, shadowWidth: 70, shadowHeight: 25, isBig: false, weight: 20 },
       { id: 71, name: "イトウ", location: "snow", toolType: "rod", price: 700, image: "images/fish/fish_itou.png", shadowImage: "images/shadows/shadow_big.png", desc: "「日本最大の淡水魚」と称される湿原の幻の魚。", reqTime: 0.550, shadowWidth: 140, shadowHeight: 45, isBig: true, weight: 10, tapPower: 9, decaySpeed: 1.3 },
       { id: 158, name: "キングサーモン", location: "snow", toolType: "rod", price: 950, image: "images/fish/kingusamon.png", shadowImage: "images/shadows/shadow_big.png", desc: "サケ科の中で最大級の大きさを誇る「マス・サケの王様」。", reqTime: 0.480, shadowWidth: 140, shadowHeight: 45, isBig: true, weight: 8, tapPower: 8, decaySpeed: 1.4 },
       { id: 102, name: "ミジンコ", location: "snow", toolType: "net", netSize: "small", price: 10, image: "images/fish/mijinko.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】水中をパタパタと浮遊する微小なプランクトン。", reqTime: 1.300, shadowWidth: 25, shadowHeight: 15, isBig: false, weight: 50 },
       { id: 139, name: "ナンキョクオキアミ", location: "snow", toolType: "net", netSize: "small", price: 30, image: "images/fish/nankyokuokiami.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】極地の生態系を支える小型のエビに似た甲殻類。", reqTime: 1.200, shadowWidth: 30, shadowHeight: 15, isBig: false, weight: 40 },
       { id: 101, name: "ガガンボ", location: "snow", toolType: "net", netSize: "small", price: 50, image: "images/fish/gaganbo.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】足が長くて頼りない見た目の大型昆虫。", reqTime: 1.100, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 35 },
       { id: 72, name: "クリオネ", location: "snow", toolType: "net", netSize: "small", price: 350, image: "images/fish/fish_clione.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】「流氷の天使」と呼ばれる半透明の美しい翼足類。", reqTime: 0.800, shadowWidth: 40, shadowHeight: 25, isBig: false, weight: 20 },
       { id: 140, name: "ズワイガニ", location: "snow", toolType: "net", netSize: "midi", price: 450, image: "images/fish/zuwaigani.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】冷たい深海に棲む細長い脚が特徴の高級カニ。", reqTime: 0.750, shadowWidth: 65, shadowHeight: 35, isBig: false, weight: 20 },
       { id: 141, name: "タラバガニ", location: "snow", toolType: "net", netSize: "big", price: 850, image: "images/fish/tarabagani.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】トゲだらけの巨大な体を持つ極寒の海の味覚王。", reqTime: 0.550, shadowWidth: 110, shadowHeight: 50, isBig: true, weight: 12, tapPower: 9, decaySpeed: 1.2 },
       
       // 6. 地底湖 (underground) - 竿/網
       { id: 159, name: "エンゼルフィッシュ", location: "underground", toolType: "rod", price: 200, image: "images/fish/enzerufish.png", shadowImage: "images/shadows/shadow_small.png", desc: "菱形の体と長いヒレが特徴的な淡水熱帯魚の代表格。", reqTime: 0.850, shadowWidth: 60, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 160, name: "青ハナゴイ", location: "underground", toolType: "rod", price: 280, image: "images/fish/aohanagoi.png", shadowImage: "images/shadows/shadow_small.png", desc: "地底の水流に群れる、清涼感のある涼しげな青いハナゴイ。", reqTime: 0.750, shadowWidth: 55, shadowHeight: 25, isBig: false, weight: 20 },
       { id: 161, name: "桃ハナゴイ", location: "underground", toolType: "rod", price: 280, image: "images/fish/momohanagoi.png", shadowImage: "images/shadows/shadow_small.png", desc: "華やかなピンク色の体色を持つ、群れで泳ぐ美しい魚。", reqTime: 0.750, shadowWidth: 55, shadowHeight: 25, isBig: false, weight: 20 },
       { id: 142, name: "メクラウオ", location: "underground", toolType: "rod", price: 500, image: "images/fish/mekurauo.png", shadowImage: "images/shadows/shadow_midi.png", desc: "暗黒の地底湖に適応し、目が完全に退化した珍しい淡水魚。", reqTime: 0.600, shadowWidth: 75, shadowHeight: 25, isBig: false, weight: 20 },
       { id: 103, name: "ドウクツギョ", location: "underground", toolType: "rod", price: 650, image: "images/fish/doukutsugyo.png", shadowImage: "images/shadows/shadow_midi.png", desc: "暗闇に適応し、目が退化した洞窟固有の魚。", reqTime: 0.650, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 15 },
       { id: 73, name: "シーラカンス", location: "underground", toolType: "rod", price: 1500, image: "images/fish/fish_coelacanth.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "「生きた化石」と呼ばれる太古の姿を残す深海古代魚。", reqTime: 0.450, shadowWidth: 160, shadowHeight: 35, isBig: true, weight: 5, tapPower: 6, decaySpeed: 1.5 },
       { id: 143, name: "プラナリア", location: "underground", toolType: "net", netSize: "small", price: 180, image: "images/fish/puranaria.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】驚異的な再生能力を持つ、綺麗な冷水に棲む扁形動物。", reqTime: 1.000, shadowWidth: 35, shadowHeight: 20, isBig: false, weight: 35 },
       { id: 104, name: "ミミズハゼ", location: "underground", toolType: "net", netSize: "small", price: 220, image: "images/fish/mimizuhaze.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】地下水系に生息するミミズのような細長いハゼ。", reqTime: 0.850, shadowWidth: 50, shadowHeight: 20, isBig: false, weight: 25 },
       { id: 105, name: "サンショウウオ", location: "underground", toolType: "net", netSize: "midi", price: 450, image: "images/fish/sanshouuo.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】冷たい暗所に潜む日本固有の両生類。", reqTime: 0.750, shadowWidth: 65, shadowHeight: 30, isBig: false, weight: 20 },
       { id: 74, name: "ホライモリ", location: "underground", toolType: "net", netSize: "big", price: 800, image: "images/fish/net_horaimori.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】光の届かない暗黒の洞窟に棲む色のない両生類。", reqTime: 0.600, shadowWidth: 90, shadowHeight: 30, isBig: true, weight: 20, tapPower: 10, decaySpeed: 1.1 },
       { id: 162, name: "キタユウレイクラゲ", location: "underground", toolType: "net", netSize: "biggest", price: 1100, image: "images/fish/kitayuureikurage.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】無数の触手を棚引かせて漂う、世界最大級のクラゲ。", reqTime: 0.500, shadowWidth: 130, shadowHeight: 65, isBig: true, weight: 8, tapPower: 7, decaySpeed: 1.4 },
   
       // 7. 深海 (deepsea) - 竿/網
       { id: 75, name: "チョウチンアンコウ", location: "deepsea", toolType: "rod", price: 600, image: "images/fish/fish_chouchin.png", shadowImage: "images/shadows/shadow_midi.png", desc: "頭の発光器で獲物を誘い込んで捕食する深海魚。", reqTime: 0.550, shadowWidth: 70, shadowHeight: 50, isBig: false, weight: 10, tapPower: 9, decaySpeed: 1.3 },
       { id: 109, name: "コウモリダコ", location: "deepsea", toolType: "rod", price: 750, image: "images/fish/koumoridako.png", shadowImage: "images/shadows/shadow_midi.png", desc: "マントのような膜を持つ、タコとイカの原始的な祖先。", reqTime: 0.650, shadowWidth: 80, shadowHeight: 45, isBig: false, weight: 15 },
       { id: 106, name: "デメニギス", location: "deepsea", toolType: "rod", price: 850, image: "images/fish/demenigisu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "頭部が透明で、緑色の球状の目が内部にある不思議な深海魚。", reqTime: 0.600, shadowWidth: 85, shadowHeight: 40, isBig: false, weight: 12 },
       { id: 108, name: "サカバンバスピス", location: "deepsea", toolType: "rod", price: 1100, image: "images/fish/sacabambaspis.png", shadowImage: "images/shadows/shadow_midi.png", desc: "間抜けな表情が魅力的な太古の無顎類。", reqTime: 0.550, shadowWidth: 90, shadowHeight: 35, isBig: false, weight: 10 },
       { id: 76, name: "リュウグウノツカイ", location: "deepsea", toolType: "rod", price: 2000, image: "images/fish/fish_ryugu.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "赤い背ビレとながーい帯状の魚体を持つ神秘の巨大魚。", reqTime: 0.450, shadowWidth: 180, shadowHeight: 15, isBig: true, weight: 4, tapPower: 6, decaySpeed: 1.5 },
       { id: 107, name: "ダイオウイカ", location: "deepsea", toolType: "rod", price: 2500, image: "images/fish/daiouika.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "深海の暗闇に潜む超巨大なイカ。伝説の怪物のモデル。", reqTime: 0.350, shadowWidth: 200, shadowHeight: 55, isBig: true, weight: 3, tapPower: 5, decaySpeed: 1.6 },
       { id: 77, name: "ホタルイカ", location: "deepsea", toolType: "net", netSize: "small", price: 150, image: "images/fish/hotaruika.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】青白く光る小さなイカ。酢味噌和えが絶品。", reqTime: 0.900, shadowWidth: 40, shadowHeight: 25, isBig: false, weight: 25 },
       { id: 78, name: "メンダコ", location: "deepsea", toolType: "net", netSize: "midi", price: 400, image: "images/fish/fish_mendako.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】耳のようなヒレをパタパタさせる可愛い深海タコ。", reqTime: 0.700, shadowWidth: 70, shadowHeight: 40, isBig: false, weight: 15 },
       { id: 79, name: "ダイオウグソクムシ", location: "deepsea", toolType: "net", netSize: "biggest", price: 1200, image: "images/fish/net_gusokumushi.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】「深海の掃除屋」と呼ばれる鎧を纏った超巨大甲殻類。", reqTime: 0.500, shadowWidth: 120, shadowHeight: 50, isBig: true, weight: 15, tapPower: 7, decaySpeed: 1.4 },
   
       // 8. 火山 (volcano) - 竿/網
       { id: 163, name: "マグマアナゴ", location: "volcano", toolType: "rod", price: 300, image: "images/fish/volcano/magumaanago.png", shadowImage: "images/shadows/shadow_midi.png", desc: "灼熱の溶岩の隙間をヌルヌルとすり抜ける赤熱したアナゴ。", reqTime: 0.600, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 164, name: "ヴォルカニックバス", location: "volcano", toolType: "rod", price: 350, image: "images/fish/volcano/volcanicbass.png", shadowImage: "images/shadows/shadow_midi.png", desc: "岩石のような硬いウロコで身を守る、溶岩湖の肉食魚。", reqTime: 0.550, shadowWidth: 95, shadowHeight: 40, isBig: false, weight: 25 },
       { id: 80, name: "マグマサラマンダー", location: "volcano", toolType: "rod", price: 400, image: "images/fish/volcano/fish_magma.png", shadowImage: "images/shadows/shadow_big.png", desc: "火山の溶岩の中を自在に泳ぐ伝説の灼熱蜥蜴。", reqTime: 0.500, shadowWidth: 140, shadowHeight: 45, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.4 },
       { id: 165, name: "フレイムタイ", location: "volcano", toolType: "rod", price: 450, image: "images/fish/volcano/flametai.png", shadowImage: "images/shadows/shadow_midi.png", desc: "真紅の炎を背ビレから立ち上らせるめでたい？高級魚。", reqTime: 0.500, shadowWidth: 100, shadowHeight: 45, isBig: false, weight: 20 },
       { id: 166, name: "イグニスシャーク", location: "volcano", toolType: "rod", price: 1200, image: "images/fish/volcano/igunisushark.png", shadowImage: "images/shadows/shadow_big.png", desc: "背ビレが激しく燃え盛る、火山の溶岩を泳ぐ恐ろしいサメ。", reqTime: 0.400, shadowWidth: 150, shadowHeight: 50, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.4 },
       { id: 167, name: "マグマドラゴン", location: "volcano", toolType: "rod", price: 2500, image: "images/fish/volcano/magumadragon.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "火口の奥底から姿を現す伝説の火龍。灼熱の引きを見せる。", reqTime: 0.350, shadowWidth: 190, shadowHeight: 60, isBig: true, weight: 4, tapPower: 5, decaySpeed: 1.6 },
       { id: 168, name: "マグマウニ", location: "volcano", toolType: "net", netSize: "small", price: 180, image: "images/fish/volcano/magumauni.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】赤く発熱するトゲを身にまとった火口底のウニ。", reqTime: 0.900, shadowWidth: 45, shadowHeight: 45, isBig: false, weight: 35 },
       { id: 81, name: "ヒノコカゲロウ", location: "volcano", toolType: "net", netSize: "small", price: 200, image: "images/fish/volcano/net_hinoko.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】溶岩の熱気の中に発生する高熱の水生昆虫の成虫。", reqTime: 0.750, shadowWidth: 40, shadowHeight: 20, isBig: false, weight: 30 },
       { id: 169, name: "ヒノコヤドカリ", location: "volcano", toolType: "net", netSize: "small", price: 220, image: "images/fish/volcano/hinokoyadokari.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】軽石を貝殻代わりにして火口付近をトコトコ歩く。", reqTime: 0.850, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 170, name: "カルデラクラゲ", location: "volcano", toolType: "net", netSize: "midi", price: 280, image: "images/fish/volcano/karuderakurage.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】溶岩の上昇気流に乗ってふんわり浮かぶ熱帯クラゲ。", reqTime: 0.750, shadowWidth: 65, shadowHeight: 50, isBig: false, weight: 25 },
       { id: 171, name: "マグマエビ", location: "volcano", toolType: "net", netSize: "midi", price: 380, image: "images/fish/volcano/magumaebi.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】高熱に耐える硬い殻に覆われた、高級感漂うエビ。", reqTime: 0.650, shadowWidth: 75, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 172, name: "マグマガメ", location: "volcano", toolType: "net", netSize: "big", price: 800, image: "images/fish/volcano/magumagame.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】甲羅が小さな火山になっており、噴煙を上げる超巨大ガメ。", reqTime: 0.500, shadowWidth: 120, shadowHeight: 60, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.3 },
   
       // 9. はちみつ (honey) - 竿/網
       { id: 173, name: "キャンディホイップ", location: "honey", toolType: "rod", price: 280, image: "images/fish/honey/candyhoippu.png", shadowImage: "images/shadows/shadow_small.png", desc: "ホイップクリームとカラフルキャンディでできた甘い小魚。", reqTime: 0.700, shadowWidth: 55, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 174, name: "ドーナツアナゴ", location: "honey", toolType: "rod", price: 340, image: "images/fish/honey/donutanago.png", shadowImage: "images/shadows/shadow_midi.png", desc: "体にドーナツをいくつか通して泳ぐチョコカラーのアナゴ。", reqTime: 0.600, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 82, name: "ハニーベアフィッシュ", location: "honey", toolType: "rod", price: 400, image: "images/fish/honey/fish_honey.png", shadowImage: "images/shadows/shadow_midi.png", desc: "甘い甘露の沼に生息する黄金色の珍しい魚。", reqTime: 0.650, shadowWidth: 110, shadowHeight: 40, isBig: false, weight: 30 },
       { id: 175, name: "チョコバナナフィッシュ", location: "honey", toolType: "rod", price: 420, image: "images/fish/honey/tyokobananafish.png", shadowImage: "images/shadows/shadow_midi.png", desc: "チョココーティングとスプレーチョコでおめかししたバナナ魚。", reqTime: 0.550, shadowWidth: 90, shadowHeight: 35, isBig: false, weight: 20 },
       { id: 176, name: "ホットケーキタートル", location: "honey", toolType: "rod", price: 1100, image: "images/fish/honey/hotcaketatoru.png", shadowImage: "images/shadows/shadow_big.png", desc: "重ねたふんわりパンケーキととろけるバターを背負った大きなカメ。", reqTime: 0.420, shadowWidth: 130, shadowHeight: 55, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.3 },
       { id: 177, name: "ハニーパフェドラゴン", location: "honey", toolType: "rod", price: 2600, image: "images/fish/honey/hanipafedragon.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "甘い蜜の沼の主。豪華なパフェのような輝きを放つスイーツの龍。", reqTime: 0.350, shadowWidth: 190, shadowHeight: 60, isBig: true, weight: 4, tapPower: 5, decaySpeed: 1.6 },
       { id: 178, name: "マカロンウニ", location: "honey", toolType: "net", netSize: "small", price: 200, image: "images/fish/honey/makaronuni.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】カラフルなマカロンが集まったような可愛らしいウニ。", reqTime: 0.850, shadowWidth: 45, shadowHeight: 45, isBig: false, weight: 35 },
       { id: 179, name: "グミヤドカリ", location: "honey", toolType: "net", netSize: "small", price: 240, image: "images/fish/honey/gumiyadokari.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】ぷにぷにとした透明なフルーツグミを家にするヤドカリ。", reqTime: 0.800, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 83, name: "ハチの幼虫", location: "honey", toolType: "net", netSize: "small", price: 300, image: "images/fish/honey/net_hachi_youchu.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】濃厚なはちみつの底で育つ栄養満点の幼虫。", reqTime: 0.900, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 40 },
       { id: 180, name: "ビスケットクラブ", location: "honey", toolType: "net", netSize: "midi", price: 320, image: "images/fish/honey/bisukettokurabu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】サクサクのビスケット模様の甲羅を持った香ばしいカニ。", reqTime: 0.700, shadowWidth: 65, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 181, name: "イチゴショートクラゲ", location: "honey", toolType: "net", netSize: "midi", price: 400, image: "images/fish/honey/itigoshortkurage.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】イチゴとホイップフリルをなびかせて漂うケーキ風クラゲ。", reqTime: 0.650, shadowWidth: 70, shadowHeight: 50, isBig: false, weight: 20 },
       { id: 182, name: "ゼリーロブスター", location: "honey", toolType: "net", netSize: "big", price: 850, image: "images/fish/honey/zerirobusuta.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】プルプルとした大きなハサミを持つ、透き通った巨大海老。", reqTime: 0.500, shadowWidth: 120, shadowHeight: 55, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.3 },
   
       // 10. 聖なる泉 (holy) - 竿/網
       { id: 183, name: "クリスタルフィッシュ", location: "holy", toolType: "rod", price: 320, image: "images/fish/holy/kurisutarufish.png", shadowImage: "images/shadows/shadow_small.png", desc: "水晶のように透き通り、光を受けて七色に煌めく美しい魚。", reqTime: 0.650, shadowWidth: 55, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 184, name: "サンクチュアリタツ", location: "holy", toolType: "rod", price: 380, image: "images/fish/holy/sankutyuaritatu.png", shadowImage: "images/shadows/shadow_small.png", desc: "聖水に咲く水草に寄り添う、王冠のような角を持つ黄金のタツノオトシゴ。", reqTime: 0.600, shadowWidth: 50, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 84, name: "ホーリーエンゼル", location: "holy", toolType: "rod", price: 400, image: "images/fish/holy/fish_holy.png", shadowImage: "images/shadows/shadow_small.png", desc: "聖なる泉の浄化された水にしか現れない神聖な水生生物。", reqTime: 0.400, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 15 },
       { id: 185, name: "レインボーシクリッド", location: "holy", toolType: "rod", price: 460, image: "images/fish/holy/reinbosikuritto.png", shadowImage: "images/shadows/shadow_midi.png", desc: "部位ごとに異なる虹色のグラデーションをまとった輝く熱帯魚。", reqTime: 0.550, shadowWidth: 85, shadowHeight: 35, isBig: false, weight: 20 },
       { id: 186, name: "ルミナスナイルパーチ", location: "holy", toolType: "rod", price: 1200, image: "images/fish/holy/ruminasupairupati.png", shadowImage: "images/shadows/shadow_big.png", desc: "青白い聖なる光を全身から放ちながら静かに泳ぐ大型魚。", reqTime: 0.400, shadowWidth: 140, shadowHeight: 50, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.3 },
       { id: 187, name: "プリズムペガサス", location: "holy", toolType: "rod", price: 2800, image: "images/fish/holy/purizumupegasasu.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "泉の神聖な祈りが実体化したとされる主。羽のようなヒレで水面を舞う。", reqTime: 0.350, shadowWidth: 190, shadowHeight: 60, isBig: true, weight: 4, tapPower: 5, decaySpeed: 1.6 },
       { id: 85, name: "ヒカリミジンコ", location: "holy", toolType: "net", netSize: "small", price: 200, image: "images/fish/holy/net_mijinko.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】聖水の中で星のように眩しく輝く幻想的な微小生物。", reqTime: 0.650, shadowWidth: 35, shadowHeight: 20, isBig: false, weight: 20 },
       { id: 188, name: "オーロラウミウシ", location: "holy", toolType: "net", netSize: "small", price: 220, image: "images/fish/holy/ororaumiusi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】夜空のオーロラをそのまま閉じ込めたような色のドレスを纏う。", reqTime: 0.850, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 35 },
       { id: 189, name: "ステンドグラスエビ", location: "holy", toolType: "net", netSize: "small", price: 260, image: "images/fish/holy/sutendogurasuebi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】教会を飾るステンドグラスのようにカラフルな透け通る甲羅を持つ。", reqTime: 0.800, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 190, name: "ジュエルクラブ", location: "holy", toolType: "net", netSize: "midi", price: 350, image: "images/fish/holy/zyuerukurabu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】甲羅にサファイアやエメラルドのような鉱石が群生したキレイなカニ。", reqTime: 0.700, shadowWidth: 65, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 191, name: "シルフィードクラゲ", location: "holy", toolType: "net", netSize: "midi", price: 420, image: "images/fish/holy/sirufidokurage.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】風と水の精霊の落とし子と言われる、パステルカラーに光る美しいクラゲ。", reqTime: 0.650, shadowWidth: 70, shadowHeight: 50, isBig: false, weight: 20 },
       { id: 192, name: "オパールナマコ", location: "holy", toolType: "net", netSize: "midi", price: 300, image: "images/fish/holy/oparunamako.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】見る角度によってピンクや青に輝く、オパールの輝きを秘めたナマコ。", reqTime: 0.750, shadowWidth: 55, shadowHeight: 25, isBig: false, weight: 25 },
   
       // 11. 竜宮城 (ryugu) - 竿/網
       { id: 203, name: "羊の頭蓋骨", location: "ryugu", toolType: "rod", price: 200, image: "images/fish/ryugu/sheep_skull.png", shadowImage: "images/shadows/shadow_midi.png", desc: "海底に沈んでいた角付きの珍しい骨。歴史を感じさせる。", reqTime: 0.650, shadowWidth: 70, shadowHeight: 35, isBig: false, weight: 30 },
       { id: 204, name: "イカリ", location: "ryugu", toolType: "rod", price: 350, image: "images/fish/ryugu/anchor.png", shadowImage: "images/shadows/shadow_midi.png", desc: "古びた沈没船の大きな鉄の錨。非常にずっしりと重い。", reqTime: 0.550, shadowWidth: 90, shadowHeight: 45, isBig: false, weight: 25 },
       { id: 195, name: "竜宮の金フラスコ", location: "ryugu", toolType: "rod", price: 500, image: "images/fish/ryugu/hurasuko.png", shadowImage: "images/shadows/shadow_small.png", desc: "不老不死の秘薬が入っていたとされる、精巧な意匠の金の壺。", reqTime: 0.550, shadowWidth: 60, shadowHeight: 30, isBig: false, weight: 20 },
       { id: 193, name: "海底の財宝箱", location: "ryugu", toolType: "rod", price: 600, image: "images/fish/ryugu/takarabako.png", shadowImage: "images/shadows/shadow_midi.png", desc: "サンゴが着生した、金貨や宝石が詰まった重厚な木箱。", reqTime: 0.500, shadowWidth: 80, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 194, name: "伝説の黄金剣", location: "ryugu", toolType: "rod", price: 750, image: "images/fish/ryugu/sword.png", shadowImage: "images/shadows/shadow_midi.png", desc: "海底の岩に突き刺さっていた、錆びることのない黄金の剣。", reqTime: 0.450, shadowWidth: 90, shadowHeight: 35, isBig: false, weight: 15 },
       { id: 196, name: "龍神の黄金冠", location: "ryugu", toolType: "rod", price: 1500, image: "images/fish/ryugu/kanmuri.png", shadowImage: "images/shadows/shadow_big.png", desc: "龍神が戴いていたとされる、巨大な宝玉が嵌め込まれた絢爛豪華な冠。", reqTime: 0.380, shadowWidth: 130, shadowHeight: 50, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.4 },
       { id: 197, name: "ポセイドンの三叉槍", location: "ryugu", toolType: "rod", price: 3000, image: "images/fish/ryugu/pose_yari.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "海を統べる神の力が宿る黄金の槍。波を割るほどの猛烈な引き。", reqTime: 0.350, shadowWidth: 180, shadowHeight: 50, isBig: true, weight: 4, tapPower: 5, decaySpeed: 1.6 },
       { id: 205, name: "貝殻", location: "ryugu", toolType: "net", netSize: "small", price: 50, image: "images/fish/ryugu/shell.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】海辺や海底で取れるきれいな模様の貝殻。", reqTime: 1.000, shadowWidth: 35, shadowHeight: 25, isBig: false, weight: 45 },
       { id: 208, name: "サンゴ", location: "ryugu", toolType: "net", netSize: "midi", price: 280, image: "images/fish/ryugu/coral.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】海底に生息する色鮮やかで美しい枝状のサンゴ。", reqTime: 0.850, shadowWidth: 60, shadowHeight: 45, isBig: false, weight: 35 },
       { id: 206, name: "琥珀", location: "ryugu", toolType: "net", netSize: "small", price: 300, image: "images/fish/ryugu/amber.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】太古の樹脂が化石化した、温かみのある黄金色の宝石。", reqTime: 0.800, shadowWidth: 40, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 207, name: "パール", location: "ryugu", toolType: "net", netSize: "small", price: 350, image: "images/fish/ryugu/pearl.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】アコヤガイから採れる、気品ある美しい光沢を持った真珠。", reqTime: 0.800, shadowWidth: 35, shadowHeight: 35, isBig: false, weight: 30 },
       { id: 201, name: "クリスタルゴブレット", location: "ryugu", toolType: "net", netSize: "midi", price: 380, image: "images/fish/ryugu/goburetto.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】海底の砂の中から美しく輝く透明な水晶の盃。", reqTime: 0.800, shadowWidth: 50, shadowHeight: 40, isBig: false, weight: 30 },
       { id: 198, name: "龍の翡翠玉", location: "ryugu", toolType: "net", netSize: "small", price: 400, image: "images/fish/ryugu/ryuuhisui.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】吸い込まれそうな深い緑の光を放つ最極上の翡翠。", reqTime: 0.750, shadowWidth: 40, shadowHeight: 40, isBig: false, weight: 25 },
       { id: 199, name: "海賊の金貨袋", location: "ryugu", toolType: "net", netSize: "small", price: 450, image: "images/fish/ryugu/kaizokunohukuro.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】金貨がずっしりと詰まった、沈没船から流れてきた革袋。", reqTime: 0.700, shadowWidth: 45, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 200, name: "青真珠のネックレス", location: "ryugu", toolType: "net", netSize: "small", price: 500, image: "images/fish/ryugu/aosinnzyuneck.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】深海の青い輝きを秘めた大粒の青真珠の首飾り。", reqTime: 0.650, shadowWidth: 45, shadowHeight: 35, isBig: false, weight: 20 },
       { id: 209, name: "ジュエル", location: "ryugu", toolType: "net", netSize: "small", price: 600, image: "images/fish/ryugu/jewel.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】まばゆい輝きを放つ、カットの施された最高級の宝石。", reqTime: 0.700, shadowWidth: 40, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 202, name: "古代の金の壺", location: "ryugu", toolType: "net", netSize: "big", price: 900, image: "images/fish/ryugu/kodai_tubo.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】美しい浮き彫りが施された、重みのある古代の黄金の壺。", reqTime: 0.500, shadowWidth: 100, shadowHeight: 50, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.3 },
   
       // 12. 古代遺跡（竿/網）
       { id: 118, name: "オウムガイ", location: "ruins", toolType: "rod", price: 420, image: "images/fish/ruins/oumugai.png", shadowImage: "images/shadows/shadow_midi.png", desc: "「生きた化石」と呼ばれる殻を持った頭足類。", reqTime: 0.600, shadowWidth: 80, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 121, name: "アンモナイト", location: "ruins", toolType: "rod", price: 550, image: "images/fish/ruins/ammonite.png", shadowImage: "images/shadows/shadow_midi.png", desc: "太古の遺跡の水底で生き永らえていた巻貝状の頭足類。", reqTime: 0.450, shadowWidth: 80, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 120, name: "ウミサソリ", location: "ruins", toolType: "rod", price: 680, image: "images/fish/ruins/umisasori.png", shadowImage: "images/shadows/shadow_midi.png", desc: "古生代の海に生息していた巨大な鋏角類。", reqTime: 0.550, shadowWidth: 85, shadowHeight: 35, isBig: false, weight: 20 },
       { id: 119, name: "アノマロカリス", location: "ruins", toolType: "rod", price: 750, image: "images/fish/ruins/anomaro.png", shadowImage: "images/shadows/shadow_midi.png", desc: "カンブリア紀の海に君臨した最強の捕食者。", reqTime: 0.500, shadowWidth: 90, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 123, name: "ラブカ", location: "ruins", toolType: "rod", price: 800, image: "images/fish/ruins/rabuka.png", shadowImage: "images/shadows/shadow_big.png", desc: "原始的な面影を残す深海の「生きた化石」サメ。", reqTime: 0.500, shadowWidth: 130, shadowHeight: 40, isBig: true, weight: 15, tapPower: 9, decaySpeed: 1.2 },
       { id: 122, name: "カメロケラス", location: "ruins", toolType: "rod", price: 1100, image: "images/fish/ruins/kamerokerasu.png", shadowImage: "images/shadows/shadow_big.png", desc: "巨大な直線状の殻を持つ太古の巨大頭足類。", reqTime: 0.450, shadowWidth: 140, shadowHeight: 45, isBig: true, weight: 12, tapPower: 8, decaySpeed: 1.3 },
       { id: 124, name: "ダンクルオステウス", location: "ruins", toolType: "rod", price: 1600, image: "images/fish/ruins/dankuru.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "強靭な板甲で覆われた頭部を持つ古生代の巨大魚。", reqTime: 0.400, shadowWidth: 170, shadowHeight: 50, isBig: true, weight: 8, tapPower: 7, decaySpeed: 1.4 },
       { id: 125, name: "ヘリコプリオン", location: "ruins", toolType: "rod", price: 1800, image: "images/fish/ruins/herikopurion.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "らせん状に並んだ鋭い歯を持つ奇妙な古代サメ。", reqTime: 0.380, shadowWidth: 180, shadowHeight: 50, isBig: true, weight: 6, tapPower: 6, decaySpeed: 1.5 },
       { id: 126, name: "メガロドン", location: "ruins", toolType: "rod", price: 2800, image: "images/fish/ruins/megarodon.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "歴史上最大級の捕食者である超巨大古代サメ。", reqTime: 0.350, shadowWidth: 210, shadowHeight: 60, isBig: true, weight: 4, tapPower: 5, decaySpeed: 1.6 },
       { id: 127, name: "ネッシー", location: "ruins", toolType: "rod", price: 3500, image: "images/fish/ruins/nessy.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "湖や水底の奥深くに潜む未確認巨大水生首長竜。", reqTime: 0.350, shadowWidth: 220, shadowHeight: 65, isBig: true, weight: 2, tapPower: 5, decaySpeed: 1.7 },
       { id: 128, name: "イソギンチャク", location: "ruins", toolType: "net", netSize: "small", price: 120, image: "images/fish/ruins/isoginchaku.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】岩場や海底に固着して触手で獲物を捕らえる。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 40, isBig: false, weight: 35 },
       { id: 129, name: "カブトエビ", location: "ruins", toolType: "net", netSize: "small", price: 180, image: "images/fish/ruins/kabutoebi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】「生きた化石」と呼ばれる甲殻類の一種。", reqTime: 0.900, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 132, name: "ウミユリ", location: "ruins", toolType: "net", netSize: "small", price: 220, image: "images/fish/ruins/umiyuri.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】植物のような姿をした太古から続く棘皮動物。", reqTime: 0.850, shadowWidth: 45, shadowHeight: 45, isBig: false, weight: 30 },
       { id: 130, name: "三葉虫", location: "ruins", toolType: "net", netSize: "small", price: 380, image: "images/fish/ruins/sanyoutyuu.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】石のスキマをモゾモゾと網這い回る古代の節足動物。", reqTime: 0.700, shadowWidth: 55, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 134, name: "カブトガニ", location: "ruins", toolType: "net", netSize: "midi", price: 400, image: "images/fish/ruins/horseshoe_crab.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】ドーム状の甲羅と剣のような尾を持つ生きている化石。", reqTime: 0.750, shadowWidth: 65, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 133, name: "カブトガニの化石", location: "ruins", toolType: "net", netSize: "midi", price: 450, image: "images/fish/ruins/horseshoe_crab_fossil.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】太古の姿を綺麗に残したカブトガニの化石。", reqTime: 0.800, shadowWidth: 60, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 131, name: "オパビニア", location: "ruins", toolType: "net", netSize: "small", price: 500, image: "images/fish/ruins/opabinia.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】5つの目を持ち、長いノズルで捕食する珍妙なカンブリア生物。", reqTime: 0.650, shadowWidth: 50, shadowHeight: 25, isBig: false, weight: 20 },
       { id: 135, name: "アンモナイトの化石", location: "ruins", toolType: "net", netSize: "midi", price: 500, image: "images/fish/ruins/ammonite_fossil.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】美しい螺旋模様がそのまま残ったアンモナイトの化石。", reqTime: 0.750, shadowWidth: 65, shadowHeight: 45, isBig: false, weight: 15 },
       { id: 137, name: "アーケロン", location: "ruins", toolType: "net", netSize: "biggest", price: 1200, image: "images/fish/ruins/akeron.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】全長4メートルを超える白亜紀の超巨大ウミガメ。", reqTime: 0.500, shadowWidth: 130, shadowHeight: 60, isBig: true, weight: 10, tapPower: 7, decaySpeed: 1.3 },
       { id: 136, name: "ネッシーの化石", location: "ruins", toolType: "net", netSize: "biggest", price: 1500, image: "images/fish/ruins/nessy_fossil.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】幻の水首長竜の骨の一部と思われる超貴重な化石。", reqTime: 0.500, shadowWidth: 120, shadowHeight: 50, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.3 },
   
       // 13. 毒沼 (poison) - 竿/網
       { id: 211, name: "ゴンズイ", location: "poison", toolType: "rod", price: 220, image: "images/fish/poison/gonzui.png", shadowImage: "images/shadows/shadow_small.png", desc: "集団で固まって泳ぐ。背ビレと胸ビレに激痛を伴う毒棘を持つ。", reqTime: 0.700, shadowWidth: 60, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 210, name: "ミノカサゴ", location: "poison", toolType: "rod", price: 280, image: "images/fish/poison/minokasago.png", shadowImage: "images/shadows/shadow_midi.png", desc: "華やかな大きなヒレの棘に強い毒を持つ優雅な危険魚。", reqTime: 0.650, shadowWidth: 80, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 212, name: "アカエイ", location: "poison", toolType: "rod", price: 380, image: "images/fish/poison/akaei.png", shadowImage: "images/shadows/shadow_big.png", desc: "尻尾の付け根に鋸歯状の鋭い猛毒針を持つエイ。", reqTime: 0.550, shadowWidth: 110, shadowHeight: 45, isBig: false, weight: 20 },
       { id: 213, name: "バラハタ", location: "poison", toolType: "rod", price: 650, image: "images/fish/poison/barahata.png", shadowImage: "images/shadows/shadow_big.png", desc: "鮮やかな赤に斑点模様を持つハタ。食物連鎖でシガテラ毒を蓄積する。", reqTime: 0.480, shadowWidth: 120, shadowHeight: 40, isBig: true, weight: 10, tapPower: 9, decaySpeed: 1.3 },
       { id: 215, name: "トラフグ", location: "poison", toolType: "rod", price: 800, image: "images/fish/poison/torahugu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "フグの最高級品種。内臓に致死性の猛毒テトロドトキシンを持つ。", reqTime: 0.500, shadowWidth: 90, shadowHeight: 45, isBig: false, weight: 15 },
       { id: 216, name: "オニダルマオコゼ", location: "poison", toolType: "rod", price: 950, image: "images/fish/poison/onidaruma.png", shadowImage: "images/shadows/shadow_midi.png", desc: "岩そっくりに擬態する。背ビレの毒棘は踏むと死に至ることもある最恐魚。", reqTime: 0.450, shadowWidth: 95, shadowHeight: 45, isBig: false, weight: 12 },
       { id: 214, name: "オオウナギ", location: "poison", toolType: "rod", price: 1800, image: "images/fish/poison/oounagi.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "毒沼の環境に適応し、体内に強力な毒素を溜め込んで巨大化した主。", reqTime: 0.350, shadowWidth: 170, shadowHeight: 45, isBig: true, weight: 5, tapPower: 6, decaySpeed: 1.5 },
       { id: 220, name: "ガンガゼ", location: "poison", toolType: "net", netSize: "small", price: 250, image: "images/fish/poison/gangaze.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】非常に長く折れやすい毒針を無数に生やした危険なウニの仲間。", reqTime: 0.850, shadowWidth: 50, shadowHeight: 50, isBig: false, weight: 30 },
       { id: 217, name: "スベスベマンジュウガニ", location: "poison", toolType: "net", netSize: "small", price: 300, image: "images/fish/poison/manju_kani.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】滑らかな丸い甲羅が美味しそうだが、麻痺性貝毒やテトロドトキシンを持つ。", reqTime: 0.800, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 221, name: "ヤドクガエル", location: "poison", toolType: "net", netSize: "small", price: 350, image: "images/fish/poison/yadokugaeru.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】派手な警戒色を持ち、皮膚から矢の毒に使われる強力な毒を出す。", reqTime: 0.750, shadowWidth: 40, shadowHeight: 25, isBig: false, weight: 25 },
       { id: 219, name: "アンボイナガイ", location: "poison", toolType: "net", netSize: "small", price: 380, image: "images/fish/poison/anboinagai.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】「殺人貝」の異名を持つ。強力な神経毒（コノトキシン）の毒針を放つ。", reqTime: 0.750, shadowWidth: 40, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 218, name: "ハブクラゲ", location: "poison", toolType: "net", netSize: "midi", price: 420, image: "images/fish/poison/habukurage.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】透明な体に長い触手を持ち、激痛と呼吸困難を引き起こす猛毒クラゲ。", reqTime: 0.700, shadowWidth: 65, shadowHeight: 50, isBig: false, weight: 25 },
       { id: 222, name: "ヒョウモンダコ", location: "poison", toolType: "net", netSize: "small", price: 500, image: "images/fish/poison/hyoumondako.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】刺激を受けると青いリング模様が発光する。噛まれると死亡例もある猛毒小型タコ。", reqTime: 0.650, shadowWidth: 50, shadowHeight: 35, isBig: false, weight: 20 },
   
       // 14. 天の川 (milkyway) - 竿/網
       { id: 223, name: "ステラエンゼル", location: "milkyway", toolType: "rod", price: 350, image: "images/fish/milkyway/suteraenzeru.png", shadowImage: "images/shadows/shadow_small.png", desc: "星座の並びのように体に星型の発光点が並ぶ優雅なエンゼルフィッシュ。", reqTime: 0.650, shadowWidth: 60, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 224, name: "コスモウナギ", location: "milkyway", toolType: "rod", price: 420, image: "images/fish/milkyway/kosumounagi.png", shadowImage: "images/shadows/shadow_midi.png", desc: "銀河のうねりのようにすばしっこく泳ぐ、光の軌跡を残す細長い魚。", reqTime: 0.550, shadowWidth: 85, shadowHeight: 30, isBig: false, weight: 25 },
       { id: 116, name: "ギャラクシーフィッシュ", location: "milkyway", toolType: "rod", price: 600, image: "images/fish/milkyway/galaxyfish.png", shadowImage: "images/shadows/shadow_small.png", desc: "体に小さな銀河を宿したかのように輝く宇宙魚。", reqTime: 0.400, shadowWidth: 75, shadowHeight: 30, isBig: false, weight: 15 },
       { id: 225, name: "ネブラパイレーツ", location: "milkyway", toolType: "rod", price: 850, image: "images/fish/milkyway/neburapairetu.png", shadowImage: "images/shadows/shadow_big.png", desc: "星雲の美しい色彩をその身に纏う、天の川を流浪する気荒な大型魚。", reqTime: 0.420, shadowWidth: 130, shadowHeight: 45, isBig: true, weight: 10, tapPower: 9, decaySpeed: 1.3 },
       { id: 226, name: "メテオサーモン", location: "milkyway", toolType: "rod", price: 1100, image: "images/fish/milkyway/meteosamon.png", shadowImage: "images/shadows/shadow_big.png", desc: "隕石のような速度で天の川を遡上する、火花を散らす巨大なサケ。", reqTime: 0.380, shadowWidth: 140, shadowHeight: 45, isBig: true, weight: 8, tapPower: 8, decaySpeed: 1.4 },
       { id: 227, name: "スターダストドラゴン", location: "milkyway", toolType: "rod", price: 3000, image: "images/fish/milkyway/star_dragon.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "無数の星くずが集まって生まれたとされる天の川の主。宇宙の輝きを放つ。", reqTime: 0.350, shadowWidth: 200, shadowHeight: 65, isBig: true, weight: 3, tapPower: 4, decaySpeed: 1.7 },
       { id: 228, name: "ルナヒトデ", location: "milkyway", toolType: "net", netSize: "small", price: 200, image: "images/fish/milkyway/runahitode.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】満月のようにやわらかな黄色い光を一定の周期で放つヒトデ。", reqTime: 0.850, shadowWidth: 45, shadowHeight: 45, isBig: false, weight: 35 },
       { id: 229, name: "サテライトエビ", location: "milkyway", toolType: "net", netSize: "small", price: 280, image: "images/fish/milkyway/sateraitoebi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】人工衛星のアンテナのような長い髭を持ち、浮遊しながら電波を発する。", reqTime: 0.750, shadowWidth: 50, shadowHeight: 25, isBig: false, weight: 30 },
       { id: 230, name: "アストロクラブ", location: "milkyway", toolType: "net", netSize: "midi", price: 380, image: "images/fish/milkyway/asutorokurabu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】甲羅に小宇宙が閉じ込められたかのような、群青色に輝く美しいカニ。", reqTime: 0.700, shadowWidth: 65, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 117, name: "コメットクラゲ", location: "milkyway", toolType: "net", netSize: "small", price: 400, image: "images/fish/milkyway/komettokurage.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】彗星のように長い光の尾を引きながら漂うクラゲ。", reqTime: 0.600, shadowWidth: 60, shadowHeight: 45, isBig: false, weight: 20 },
       { id: 231, name: "プラネットウニ", location: "milkyway", toolType: "net", netSize: "midi", price: 450, image: "images/fish/milkyway/puranettouni.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】土星のような光の環を周囲に浮かべた、青く発光する神秘的なウニ。", reqTime: 0.650, shadowWidth: 55, shadowHeight: 55, isBig: false, weight: 20 },
       { id: 232, name: "ブラックホールタコ", location: "milkyway", toolType: "net", netSize: "big", price: 950, image: "images/fish/milkyway/black_tako.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】中心に光を吸い込むかのような暗黒を宿した、天の川の暗部に潜む大タコ。", reqTime: 0.480, shadowWidth: 120, shadowHeight: 60, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.3 },
   
       // 15. 黄金郷 (eldorado) - 竿/網 (高価値エリア)
       { id: 233, name: "ゴールデンピラニア", location: "eldorado", toolType: "rod", price: 1500, image: "images/fish/eldorado/golden_pirania.png", shadowImage: "images/shadows/shadow_small.png", desc: "全身が純金でできたような煌めきを放つ凶暴な魚。", reqTime: 0.550, shadowWidth: 60, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 245, name: "ゴールデンリュウキン", location: "eldorado", toolType: "rod", price: 1800, image: "images/fish/eldorado/golden_ryukin.png", shadowImage: "images/shadows/shadow_small.png", desc: "ひらひらと金粉の舞うドレスのようなヒレをなびかせる優雅な金魚。", reqTime: 0.600, shadowWidth: 55, shadowHeight: 30, isBig: false, weight: 30 },
       { id: 240, name: "ゴールデンタイ", location: "eldorado", toolType: "rod", price: 2500, image: "images/fish/eldorado/golden_tai.png", shadowImage: "images/shadows/shadow_midi.png", desc: "鱗の一枚一枚が金貨のように眩しく輝く、めでたすぎる黄金の鯛。", reqTime: 0.500, shadowWidth: 90, shadowHeight: 40, isBig: false, weight: 25 },
       { id: 234, name: "ゴールドアロワナ", location: "eldorado", toolType: "rod", price: 3000, image: "images/fish/eldorado/gold_arowana.png", shadowImage: "images/shadows/shadow_midi.png", desc: "黄金郷の清流を優雅に泳ぐ至高の古代魚。", reqTime: 0.450, shadowWidth: 100, shadowHeight: 35, isBig: false, weight: 20 },
       { id: 246, name: "エルドラドアンコウ", location: "eldorado", toolType: "rod", price: 3200, image: "images/fish/eldorado/eldorado_ankou.png", shadowImage: "images/shadows/shadow_midi.png", desc: "頭の発光器に巨大なイエローダイヤモンドが輝く深海魚。", reqTime: 0.500, shadowWidth: 90, shadowHeight: 45, isBig: false, weight: 20 },
       { id: 241, name: "トレジャーエイ", location: "eldorado", toolType: "rod", price: 3500, image: "images/fish/eldorado/treasure_ei.png", shadowImage: "images/shadows/shadow_big.png", desc: "背中に無数の宝石と金貨を散りばめた、滑空するように泳ぐ大きなエイ。", reqTime: 0.450, shadowWidth: 130, shadowHeight: 50, isBig: true, weight: 15, tapPower: 8, decaySpeed: 1.4 },
       { id: 247, name: "ゴールドガー", location: "eldorado", toolType: "rod", price: 4500, image: "images/fish/eldorado/gold_gar.png", shadowImage: "images/shadows/shadow_big.png", desc: "全身が磨き上げられた金の装甲で覆われた、鋭い口先を持つ大型古代魚。", reqTime: 0.420, shadowWidth: 140, shadowHeight: 45, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.4 },
       { id: 242, name: "ミダスシーラカンス", location: "eldorado", toolType: "rod", price: 6000, image: "images/fish/eldorado/midas_coelacanth.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "触れるものを金に変えるとされる伝説の力が宿った古代の黄金魚。", reqTime: 0.380, shadowWidth: 170, shadowHeight: 45, isBig: true, weight: 8, tapPower: 6, decaySpeed: 1.5 },
       { id: 235, name: "キングエルドラド", location: "eldorado", toolType: "rod", price: 8000, image: "images/fish/eldorado/king_eldorado.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "黄金郷の主。巨体から金粉を散らしながら激しく暴れる。", reqTime: 0.350, shadowWidth: 190, shadowHeight: 60, isBig: true, weight: 5, tapPower: 5, decaySpeed: 1.6 },
       { id: 236, name: "ゴールデンクラブ", location: "eldorado", toolType: "net", netSize: "midi", price: 2000, image: "images/fish/eldorado/golden_crab.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】甲羅に金塊を担いだ珍しいカニ。", reqTime: 0.700, shadowWidth: 65, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 248, name: "ゴールドパールガイ", location: "eldorado", toolType: "net", netSize: "small", price: 2200, image: "images/fish/eldorado/golden_pearl_shell.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】中に大粒のゴールデンパール（黄金真珠）を抱えた非常に高価な二枚貝。", reqTime: 0.700, shadowWidth: 45, shadowHeight: 35, isBig: false, weight: 25 },
       { id: 249, name: "ミダスロブスター", location: "eldorado", toolType: "net", netSize: "midi", price: 2800, image: "images/fish/eldorado/midas_lobster.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】金塊を叩いて引き延ばしたような輝くハサミを持つ高級海老。", reqTime: 0.600, shadowWidth: 75, shadowHeight: 40, isBig: false, weight: 20 },
       { id: 243, name: "ゴールドオクトパス", location: "eldorado", toolType: "net", netSize: "big", price: 4000, image: "images/fish/eldorado/gold_octopus.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】吸盤がすべて金の装飾のようになっており、宝箱を大事そうに抱え込んでいるタコ。", reqTime: 0.600, shadowWidth: 100, shadowHeight: 50, isBig: false, weight: 15 },
       { id: 250, name: "オーラムクラゲ", location: "eldorado", toolType: "net", netSize: "biggest", price: 4800, image: "images/fish/eldorado/aurum_kurage.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】傘全体が黄金の輝きを放ち、金の糸のような無数の触手を漂わせる巨大クラゲ。", reqTime: 0.480, shadowWidth: 130, shadowHeight: 65, isBig: true, weight: 8, tapPower: 7, decaySpeed: 1.3 },
       { id: 244, name: "金塊タートル", location: "eldorado", toolType: "net", netSize: "biggest", price: 5000, image: "images/fish/eldorado/kinkai_turtle.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "【網限定】甲羅が積み上げられた巨大な金塊でできている、ずっしりと重い長寿のカメ。", reqTime: 0.500, shadowWidth: 140, shadowHeight: 60, isBig: true, weight: 10, tapPower: 7, decaySpeed: 1.3 },
   
       // 16. 神獣界 (shinju) - ボス級3種 (要 Lv.200)
       { id: 237, name: "ミズチ", location: "shinju", toolType: "rod", price: 10000, image: "images/fish/boss/mizuti.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "神獣界の水流を司る伝説の水を呼ぶ龍蛇。", reqTime: 0.450, shadowWidth: 300, shadowHeight: 90, isBig: true, isBoss: true, weight: 5 },
       { id: 238, name: "ゲンブ", location: "shinju", toolType: "net", netSize: "biggest", price: 12000, image: "images/fish/boss/genbu.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "【網限定】北方を守護する蛇と亀が一体となった四神の一角。", reqTime: 0.400, shadowWidth: 320, shadowHeight: 130, isBig: true, isBoss: true, weight: 3 },
       { id: 239, name: "リヴァイアタン", location: "shinju", toolType: "rod", price: 15000, image: "images/fish/boss/rivaiatan.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "神獣界の最深部に君臨する、大海を飲み込むとされる超巨大怪獣。", reqTime: 0.350, shadowWidth: 400, shadowHeight: 150, isBig: true, isBoss: true, weight: 1 }
   ];
   
let gameState = 'TITLE';
let isZukanOpen = false;
let currentZukanMainTab = 'normal';
let currentFilter = 'all';
let bossPhase = 1;
let bossStep = 0;
let timingCount = 0;
let isBossBattle = false;
let timerId = null;
let timeoutTimerId = null;
let shadowAnimId = null;
let battleIntervalId = null;
let startTime = 0;
let reactionTime = 0;
let soundEnabled = true;
let currentTargetFish = null;
let battleGauge = 0;

let pendingLevelUp = null;

let playerData = {
    level: 1,
    exp: 0,
    gold: 0,
    equippedRod: "wood",
    ownedRods: ["wood"],
    equippedNet: "bug_net",
    ownedNets: ["bug_net"],
    equippedRodAcc: null,
    equippedBait: null,
    equippedNetAcc: null,
    equippedNetReel: null,
    ownedAccs: [],
    unlockedGachaMaps: [],
    totalCatches: 0,
    currentCombo: 0,
    netCatches: 0,
    netCombo: 0,
    missCount: 0,
    achievements: [],
    playTimeSeconds: 0,
    hasSeenHowTo: false,
    hasSeenGachaNotice: false,
    easyMode: false,
    vibrationEnabled: true,
    clearCount: 0,
    isReincarnated: false
};

let caughtFish = JSON.parse(localStorage.getItem('retro_fishing_zukan_v4')) || {};

let audioCtx = null;
let titleBgm = null;
let currentBgm = null;
let currentBgmPath = null;

function savePlayerData() {
    localStorage.setItem('retro_fishing_player_v1', JSON.stringify(playerData));
}

let bgmAudioPlayer = null;
let bgmFadeTimer = null;


function formatPlayTime(totalSeconds) {
    const MAX_SECONDS = (999 * 3600) + (59 * 60);
    if (totalSeconds >= MAX_SECONDS) {
        return "999時間59分";
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${hours}時間${formattedMinutes}分`;
}

let playTimeInterval = null;

function startPlayTimeCounter() {
    if (playTimeInterval) return;

    playTimeInterval = setInterval(() => {
        if (!playerData.playTimeSeconds) playerData.playTimeSeconds = 0;

        const MAX_SECONDS = (999 * 3600) + (59 * 60);
        if (playerData.playTimeSeconds < MAX_SECONDS) {
            playerData.playTimeSeconds++;
            
            if (playerData.playTimeSeconds % 60 === 0) {
                savePlayerData();
            }

            if (gameState === 'MENU') {
                updateMenuUI();
            }
        }
    }, 1000);
}





function updateSoundUI() {
    const configImg = document.getElementById('config-sound-img');
    const headerImg = document.getElementById('header-sound-img');
    
    const imgPath = soundEnabled ? "images/supika_o.png" : "images/supika_x.png";

    if (configImg) configImg.src = imgPath;
    if (headerImg) headerImg.src = imgPath;
}


function setToolMode(mode) {
    currentToolMode = mode;
    document.getElementById('mode-btn-rod').className = `tool-mode-btn ${mode === 'rod' ? 'active' : ''}`;
    document.getElementById('mode-btn-net').className = `tool-mode-btn ${mode === 'net' ? 'active' : ''}`;
    
    resetGameStateToReady();
    playWaterPlop();
}

function menuDateText() { const d = new Date(); return (d.getMonth() + 1) + '月' + d.getDate() + '日'; }   // 英語モードは i18n.js が「Oct 15」に変換
function updateMenuUI() {
    const _md = document.getElementById('menu-date'); if (_md) _md.innerText = menuDateText();
    const curExp = playerData.exp % 100;
    const curLevel = playerData.level;
    const percent = curExp;

    document.getElementById('player-level').innerText = curLevel;
    document.getElementById('player-exp').innerText = curExp;
    document.getElementById('player-next-exp').innerText = 100;
    document.getElementById('player-exp-percent').innerText = percent;
    document.getElementById('menu-level-bar-inner').style.width = `${percent}%`;

    document.getElementById('player-gold').innerText = playerData.gold;
    document.getElementById('player-rod-name').innerText = ROD_DATA[playerData.equippedRod] ? ROD_DATA[playerData.equippedRod].name : "木の竿";
    
    if (!playerData.equippedNet) playerData.equippedNet = "bug_net";
    if (!playerData.ownedNets) playerData.ownedNets = ["bug_net"];

    document.getElementById('player-net-name').innerText = NET_DATA[playerData.equippedNet] ? NET_DATA[playerData.equippedNet].name : "虫取り網";

    const timeElem = document.getElementById('player-play-time');
    if (timeElem) {
        timeElem.innerText = formatPlayTime(playerData.playTimeSeconds || 0);
    }

    const rodCatches = playerData.totalCatches || 0;
    const netCatches = playerData.netCatches || 0;
    const grandTotal = rodCatches + netCatches;

    const rodElem = document.getElementById('player-rod-catches');
    const netElem = document.getElementById('player-net-catches');
    const totalElem = document.getElementById('player-total-catches');

    if (rodElem) rodElem.innerText = rodCatches;
    if (netElem) netElem.innerText = netCatches;
    if (totalElem) totalElem.innerText = grandTotal;

    const howtoBtn = document.getElementById('btn-howto');
    if (howtoBtn) {
        if (!playerData.hasSeenHowTo) {
            howtoBtn.classList.add('highlight-howto');
        } else {
            howtoBtn.classList.remove('highlight-howto');
        }
    }

    const clearBadge = document.getElementById('menu-clear-badge');
    if (clearBadge) {
        const count = playerData.clearCount || 0;

        if (count === 0) {
            // 未クリア：非表示
            clearBadge.style.display = "none";
        } else if (count === 1) {
            // 1回クリア：★
            clearBadge.innerText = "★";
            clearBadge.style.display = "flex";
        } else {
            // 2回目以降：★x2, ★x3 ...
            clearBadge.innerText = `★x${count}`;
            clearBadge.style.display = "flex";
        }
    }

    document.getElementById('header-level').innerText = curLevel;
    document.getElementById('header-exp-percent').innerText = percent;
    document.getElementById('header-level-bar-inner').style.width = `${percent}%`;
    document.getElementById('header-gold').innerText = Number(playerData.gold).toLocaleString();
}

function closeAllModals() {
    const ids = [
        'map-modal', 'zukan-modal', 'howto-modal', 'shop-screen', 
        'gacha-screen', 'gacha-list-modal', 'config-modal', 
        'achievement-modal', 'zoom-modal', 'levelup-modal',
        'gacha-notice-modal', 'ranking-modal', 'equip-screen', 'equip-select-modal'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
    closeZukanDetail();
}


function goToMenuFromHeader() {
    initAudio();
    resetGameStateToReady();
    closeAllModals();
    document.getElementById('menu-screen').style.display = "flex";
    document.getElementById('result-modal').style.display = "none";
    gameState = 'MENU';
    updateMenuUI();
    updateStageBgm();
    playWaterPlop();
}

function startGameFromMenu() {
    initAudio();
    closeAllModals();
    document.getElementById('menu-screen').style.display = "none";
    gameState = 'READY';
    updateMenuUI();
    updateStageBgm();
    playWaterPlop();
}

/* ===================================================
   ガチャ関連機能
   =================================================== */
function openGachaScreen() {
    initAudio();
    closeAllModals();
    gameState = 'GACHA';
    document.getElementById('menu-screen').style.display = "none";
    document.getElementById('gacha-gold').innerText = playerData.gold;
    document.getElementById('gacha-result-area').style.display = "none";
    document.getElementById('gacha-screen').style.display = "flex";
    
    updateGachaSeriesUI();
    updateGachaNoticeUI();
    updateStageBgm();
    playWaterPlop();
}

function closeGachaScreen() {
    goToMenu();
}

function nextGachaSeries() {
    currentGachaIndex = (currentGachaIndex + 1) % GACHA_SERIES_LIST.length;
    updateGachaSeriesUI();
}

function prevGachaSeries() {
    currentGachaIndex = (currentGachaIndex - 1 + GACHA_SERIES_LIST.length) % GACHA_SERIES_LIST.length;
    updateGachaSeriesUI();
}

function updateGachaSeriesUI() {
    const series = GACHA_SERIES_LIST[currentGachaIndex];
    currentGachaSeries = series.key;

    const titleElem = document.getElementById('gacha-series-title');
    if (titleElem) {
        titleElem.innerText = series.title;
    }

    const bannerImg = document.getElementById('gacha-banner-img');
    if (bannerImg) {
        bannerImg.src = series.banner;
        bannerImg.onerror = () => {
            bannerImg.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 130'><rect width='300' height='130' fill='%23111827'/><text x='150' y='50' font-size='18' fill='${encodeURIComponent(series.color)}' font-weight='bold' text-anchor='middle'>${series.mapName}</text><text x='150' y='85' font-size='14' fill='%23ffffff' text-anchor='middle'>${series.rodName} / 🐉 龍神の竿</text></svg>`;
        };
    }

    playWaterPlop();
}

function openGachaListModal() {
    renderGachaListModal();
    document.getElementById('gacha-list-modal').style.display = "flex";
}

function closeGachaListModal() {
    document.getElementById('gacha-list-modal').style.display = "none";
}

function renderGachaListModal() {
    const scrollArea = document.querySelector('#gacha-list-modal .gacha-list-scroll-area');
    if (!scrollArea) return;

    const currentSeries = GACHA_SERIES_LIST[currentGachaIndex];

    scrollArea.innerHTML = `
        <div class="gacha-list-section">
            <div class="gacha-list-sec-title" style="color:#ff66ff;">【限定解放エリア】(確率: 5%)</div>
            <div class="gacha-list-item-group">
                ・${currentSeries.mapName}
            </div>
        </div>

        <div class="gacha-list-section">
            <div class="gacha-list-sec-title" style="color:#00ffcc;">【専用特化ツール / レア】(確率: 各 3%)</div>
            <div class="gacha-list-item-group">
                ・${currentSeries.rodName}<br>
                ・🐉 龍神の竿 <span style="font-size:11px; color:#ffd700;">(超レア)</span><br>
                ・🔱 神獣の網 <span style="font-size:11px; color:#ffd700;">(ネット超レア)</span>
            </div>
        </div>

        <div class="gacha-list-section">
            <div class="gacha-list-sec-title" style="color:#aaa;">【ハズレ（釣りゴミ）アイテム】(確率: 合計82%)</div>
            <div class="gacha-list-item-group">
                ・🥫 空き缶 (10 G)<br>
                ・👞 長靴 (10 G)<br>
                ・🛞 古タイヤ (20 G)<br>
                ・🪵 流木 (10 G)<br>
                ・🧹 ボロきれ (5 G)<br>
                ・🌿 ワカメ (10 G)
            </div>
        </div>

        <div class="gacha-list-section">
            <div class="gacha-list-sec-title" style="color:#ffd700;">【その他補填】(確率: 合計10%)</div>
            <div class="gacha-list-item-group">
                ・💰 少額ゴールド (30 G / 50 G)<br>
                <span style="font-size:11px; color:#ccc;">※獲得済みの竿やエリアが重複した場合は150 Gが補填されます。</span>
            </div>
        </div>
    `;
}

function spinGacha(count) {
    const cost = count === 10 ? 10000 : 1000;
    if (playerData.gold < cost) {
        gameAlert("ゴールドが足りません！");
        return;
    }

    playerData.gold -= cost;
    savePlayerData();
    updateMenuUI();
    document.getElementById('gacha-gold').innerText = playerData.gold;

    if (!playerData.unlockedGachaMaps) playerData.unlockedGachaMaps = [];
    if (!playerData.ownedNets) playerData.ownedNets = ["bug_net"];

    const TRASH_PATHS = {
        kan: "images/trash/trash_kan.png",
        kutu: "images/trash/trash_kutu.png",
        tire: "images/trash/trash_tire.png",
        ryuuboku: "images/trash/trash_ryuuboku.png",
        kire: "images/trash/trash_kire.png",
        kaisou: "images/trash/trash_kaisou.png"
    };

    const GOLD_PATHS = {
        gold30: "images/gold/gold_30.png",
        gold50: "images/gold/gold_50.png"
    };

    const currentSeries = GACHA_SERIES_LIST[currentGachaIndex];
    const seriesMapWeight = currentSeries.key === 'eldorado' ? 0.5 : 5.0;

    const seriesMap = { 
        type: "map", 
        key: currentSeries.mapKey, 
        name: currentSeries.mapName, 
        icon: MAP_DATA[currentSeries.mapKey].bg, 
        weight: seriesMapWeight 
    };
    
    const seriesRod = { 
        type: "rod", 
        key: currentSeries.rodKey, 
        name: currentSeries.rodName, 
        icon: ROD_DATA[currentSeries.rodKey].icon, 
        weight: 3 
    };

    const pool = [
        seriesMap,
        seriesRod,
        { type: "rod", key: "dragon_rod", name: "🐉 龍神の竿", icon: "images/fishingrod/dragon_fishing_rod.png", weight: 1 },
        { type: "net", key: "divine_net", name: "🔱 神獣の網", icon: "images/net/net_divine.png", weight: 1 },

        { type: "trash", name: "🥫 空き缶 (30 G)", icon: TRASH_PATHS.kan, amount: 30, weight: 14.0 },
        { type: "trash", name: "👞 長靴 (30 G)", icon: TRASH_PATHS.kutu, amount: 30, weight: 14.0 },
        { type: "trash", name: "🛞 古タイヤ (60 G)", icon: TRASH_PATHS.tire, amount: 60, weight: 14.0 },
        { type: "trash", name: "🪵 流木 (30 G)", icon: TRASH_PATHS.ryuuboku, amount: 30, weight: 14.0 },
        { type: "trash", name: "🧹 ボロきれ (15 G)", icon: TRASH_PATHS.kire, amount: 15, weight: 14.0 },
        { type: "trash", name: "🌿 ワカメ (30 G)", icon: TRASH_PATHS.kaisou, amount: 30, weight: 14.0 },

        { type: "gold", amount: 150, name: "💰 150 Gold", icon: GOLD_PATHS.gold50, weight: 5.5 },
        { type: "gold", amount: 100, name: "💰 100 Gold", icon: GOLD_PATHS.gold30, weight: 5.5 }
    ];

    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0);

    const results = [];
    for (let i = 0; i < count; i++) {
        let rnd = Math.random() * totalWeight;
        let selectedItem = pool[pool.length - 1];

        for (const p of pool) {
            if (rnd < p.weight) {
                selectedItem = p;
                break;
            }
            rnd -= p.weight;
        }

        const RARE_T = ['map', 'rod', 'net'];
        const noRare10 = count === 10 && i === 9 && !results.some(r => /エリア解放|竿|網/.test(r.name));
        if ((playerData.gachaPity || 0) >= 29 || noRare10) {
            if (!RARE_T.includes(selectedItem.type)) selectedItem = !playerData.unlockedGachaMaps.includes(seriesMap.key) ? seriesMap : seriesRod;
        }
        playerData.gachaPity = RARE_T.includes(selectedItem.type) ? 0 : (playerData.gachaPity || 0) + 1;

        if (selectedItem.type === "map") {
            if (playerData.unlockedGachaMaps.includes(selectedItem.key)) {
                playerData.gold += 150;
                results.push({ name: selectedItem.name + "<br><span style='color:#aaa;'>(重複 +150G)</span>", icon: selectedItem.icon, isTrash: false });
            } else {
                playerData.unlockedGachaMaps.push(selectedItem.key);
                results.push({ name: selectedItem.name, icon: selectedItem.icon, isTrash: false });
            }
        } else if (selectedItem.type === "rod") {
            if (playerData.ownedRods.includes(selectedItem.key)) {
                playerData.gold += 150;
                results.push({ name: selectedItem.name + "<br><span style='color:#aaa;'>(重複 +150G)</span>", icon: selectedItem.icon, isTrash: false });
            } else {
                playerData.ownedRods.push(selectedItem.key);
                results.push({ name: selectedItem.name, icon: selectedItem.icon, isTrash: false });
            }
        } else if (selectedItem.type === "net") {
            if (playerData.ownedNets.includes(selectedItem.key)) {
                playerData.gold += 150;
                results.push({ name: selectedItem.name + "<br><span style='color:#aaa;'>(重複 +150G)</span>", icon: selectedItem.icon, isTrash: false });
            } else {
                playerData.ownedNets.push(selectedItem.key);
                results.push({ name: selectedItem.name, icon: selectedItem.icon, isTrash: false });
            }
        } else if (selectedItem.type === "gold") {
            playerData.gold += selectedItem.amount;
            results.push({ name: selectedItem.name, icon: selectedItem.icon, isTrash: false });
        } else if (selectedItem.type === "trash") {
            playerData.gold += selectedItem.amount;
            results.push({ name: selectedItem.name, icon: selectedItem.icon, isTrash: true });
        }
    }

    savePlayerData();
    updateMenuUI();
    document.getElementById('gacha-gold').innerText = playerData.gold;

    const grid = document.getElementById('gacha-result-grid');
    grid.innerHTML = "";
    
    results.forEach(res => {
        const card = document.createElement('div');
        
        let rarityClass = "";
        if (res.isTrash) {
            rarityClass = "trash";
        } else if (res.name.includes("龍神") || res.name.includes("神獣") || res.name.includes("エルドラド")) {
            rarityClass = "super-rare";
        } else if (res.name.includes("エリア解放") || res.name.includes("竿") || res.name.includes("網")) {
            rarityClass = "rare";
        }

        card.className = `gacha-result-card ${rarityClass}`;
        
        const fallbackTrash = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='25' y='70' font-size='60' fill='gray'>🗑</text></svg>";
        card.innerHTML = `<img src="${res.icon}" alt="Icon" onerror="this.src='${fallbackTrash}'" onclick="zoomImage('${res.icon}')"><div style="text-align:center; line-height:1.2;">${res.name}</div>`;
        
        grid.appendChild(card);
    });

    document.getElementById('gacha-result-area').style.display = "block";
    playSE('levelup');
    checkAchievements();
}

/* ===================================================
   モーダル / 実績 / 設定
   =================================================== */
function openConfigModal() {
    initAudio();
    updateDifficultyUI();
    updateSoundUI();
    updateVibrationUI();
    document.getElementById('config-modal').style.display = "flex";
    playWaterPlop();
}

function closeConfigModal() {
    document.getElementById('config-modal').style.display = "none";
}

function openAchievements() {
    initAudio();
    closeAllModals();
    renderAchievementList();
    document.getElementById('achievement-modal').style.display = "flex";
    playWaterPlop();
}

function closeAchievements() {
    document.getElementById('achievement-modal').style.display = "none";
}


function isAreaCompleted(locationKey) {
    const targetAreaFish = FISH_DATA.filter(fish => fish.location === locationKey);
    if (targetAreaFish.length === 0) return false;

    return targetAreaFish.every(fish => caughtFish[fish.id] && caughtFish[fish.id].unlocked);
}

function isShopAllBought() {
    const shopRods = Object.keys(ROD_DATA).filter(k => !ROD_DATA[k].gacha);
    return shopRods.every(k => playerData.ownedRods.includes(k));
}

let achievementQueue = [];
let isToastShowing = false;

function checkAchievements() {
    if (!playerData.achievements) playerData.achievements = [];

    const totalUnlockedFish = Object.keys(caughtFish).filter(id => caughtFish[id] && caughtFish[id].unlocked && !(FISH_DATA.find(f => f.id == id) && ['event', 'special'].includes(zukanCatOf(FISH_DATA.find(f => f.id == id))))).length;

    const rodCatches = playerData.totalCatches || 0;
    const netCatches = playerData.netCatches || 0;
    const grandTotalCatches = rodCatches + netCatches;
    const netCombo = playerData.netCombo || 0;

    const hasAllRods = Object.keys(ROD_DATA).every(k => playerData.ownedRods.includes(k));
    const hasAllNets = Object.keys(NET_DATA).every(k => playerData.ownedNets.includes(k));

    const isNormal100 = checkCategoryCompPercent('normal') === 100;
    const isGacha100 = checkCategoryCompPercent('gacha') === 100;
    const isFullCompNow = isNormal100 && isGacha100;
    const isSecondClear = (playerData.clearCount >= 1 || playerData.isReincarnated) && isFullCompNow;

    const conditions = [
        { id: "first_catch", cond: playerData.totalCatches >= 1 },
        { id: "fisherman", cond: playerData.totalCatches >= 20 },
        { id: "king_fisher", cond: playerData.totalCatches >= 100 },
        { id: "combo_master", cond: playerData.currentCombo >= 30 },
        { id: "rich_man", cond: playerData.gold >= 10000 },
        { id: "all_maps", cond: playerData.level >= 55 },
        
        { id: "comp_sea", cond: ["sea", "sea2", "sea3"].every(k => isAreaCompleted(k)) },
        { id: "comp_river", cond: isAreaCompleted("river") },
        { id: "comp_swamp", cond: isAreaCompleted("swamp") },
        { id: "comp_lake", cond: isAreaCompleted("lake") },
        { id: "comp_snow", cond: isAreaCompleted("snow") },
        { id: "comp_underground", cond: isAreaCompleted("underground") },
        { id: "comp_deepsea", cond: isAreaCompleted("deepsea") },

        { id: "comp_volcano", cond: isAreaCompleted("volcano") },
        { id: "comp_honey", cond: isAreaCompleted("honey") },
        { id: "comp_holy", cond: isAreaCompleted("holy") },
        { id: "comp_ryugu", cond: isAreaCompleted("ryugu") },
        { id: "comp_ruins", cond: isAreaCompleted("ruins") },
        { id: "comp_poison", cond: isAreaCompleted("poison") },
        { id: "comp_milkyway", cond: isAreaCompleted("milkyway") },
        { id: "comp_eldorado", cond: isAreaCompleted("eldorado") },
        { id: "comp_shinju", cond: isAreaCompleted("shinju") },

        { id: "buy_all_shop", cond: isShopAllBought() },

        { id: "net_first", cond: netCatches >= 1 },
        { id: "net_apprentice", cond: netCatches >= 20 },
        { id: "net_master", cond: netCatches >= 100 },
        { id: "net_combo_master", cond: netCombo >= 30 },

        { id: "zukan_master", cond: totalUnlockedFish >= FISH_DATA.filter(f => !['event', 'special'].includes(zukanCatOf(f))).length },

        { id: "miss_master", cond: (playerData.missCount || 0) >= 50 },
        { id: "thousand_catches", cond: grandTotalCatches >= 1000 },
        { id: "comp_all_rods", cond: hasAllRods },
        { id: "comp_all_nets", cond: hasAllNets },
        { id: "ultra_rich", cond: playerData.gold >= 100000 },
        { id: "returned_friend", cond: isSecondClear }

    ];

    conditions.forEach(item => {
        if (item.cond && !playerData.achievements.includes(item.id)) {
            playerData.achievements.push(item.id);
            savePlayerData();
            enqueueAchievementToast(item.id);
        }
    });
}

function enqueueAchievementToast(achId) {
    achievementQueue.push(achId);
    processAchievementQueue();
}

function processAchievementQueue() {
    if (isToastShowing || achievementQueue.length === 0) return;

    isToastShowing = true;
    const achId = achievementQueue.shift();
    const ach = ACHIEVEMENT_DATA[achId];

    if (!ach) {
        isToastShowing = false;
        processAchievementQueue();
        return;
    }

    playSE('levelup');

    const toast = document.getElementById('achievement-toast');
    document.getElementById('toast-icon').src = ach.icon;
    document.getElementById('toast-name').innerText = ach.name;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        
        setTimeout(() => {
            isToastShowing = false;
            processAchievementQueue();
        }, 500);
    }, 3500);
}

/* 全データ初期化（コンプ100%時の転生対応版） */
/* 全データ初期化（実績・周回星マークの選択保持対応版） */
async function resetAllData() {
    // 通常・ガチャ両方の図鑑コンプリート判定
    const isNormal100 = checkCategoryCompPercent('normal') === 100;
    const isGacha100 = checkCategoryCompPercent('gacha') === 100;
    const isFullComp = isNormal100 && isGacha100;

    let confirmMsg = "本当にすべてのデータを削除しますか？\n（レベル、ゴールド、購入した竿・網、図鑑記録、実績、プレイ時間、ランキングが全消去されます）";
    
    if (isFullComp) {
        confirmMsg = "✨【おさかな絵巻 完全コンプリート達成中！】✨\n転生特典として『10,000 G』を所持した状態で2周目をスタートできます！\n本当にデータをリセット（転生）しますか？";
    }

    const c1 = await gameConfirm(confirmMsg, { yes: 'データを削除する', no: 'やめる', danger: true });
    if (!c1) return;

    const c2 = await gameConfirm("本当によろしいですか？この操作は取り消せません。", { yes: "はい、削除する", no: "やめる", danger: true });
    if (!c2) return;

    // ▼ 追加：実績・称号（および周回数・星）を削除するかどうかの確認 ▼
    let deleteAchievements = true;
    if (isFullComp) {
        // コンプ達成時は実績を消すか残すかを選択
        deleteAchievements = await gameConfirm(
            "【実績・称号データの取り扱い】\n\n" +
            "「リセットする」 : 実績・称号データと周回数(★)もリセットします。\n" +
            "「引き継ぐ」 : 実績・称号データを残し、周回数(★)も加算して引き継ぎます。",
            { yes: "リセットする", no: "引き継ぐ" }
        );
    } else {
        // 通常のリセット時は確認
        deleteAchievements = await gameConfirm("実績・称号データおよびクリア記録(★)も削除しますか？\n（「残す」を選ぶと実績と周回数はそのまま残ります）", { yes: "削除する", no: "残す" });
    }

    // 既存実績・周回数の引き継ぎ用処理
    let nextAchievements = [];
    let nextClearCount = 0;

    if (!deleteAchievements) {
        // 「いいえ（消さない）」を選んだ場合：実績と周回数を保持＆加算
        nextAchievements = playerData.achievements || [];
        nextClearCount = playerData.clearCount || 0;

        if (isFullComp) {
            nextClearCount += 1; // 周回数を加算（★が増える）
            if (!nextAchievements.includes('hero_reincarnation')) {
                nextAchievements.push('hero_reincarnation'); // 転生実績付与
            }
        }
    } else if (isFullComp) {
        // 「はい（消す）」を選んだが転生条件達成の場合：実績は全消去するが、転生実績のみ新しく付与
        nextAchievements = ['hero_reincarnation'];
        nextClearCount = 0; // 周回数・星もリセット
    }

    // 2周目（転生）へ引き継ぐもの（Ver 3.2.0）：拾った手紙・ミニゲーム練習データ・季節イベントの図鑑（特殊エリアの図鑑は消えます）
    // 完全リセット（図鑑コンプ前のリセット）では、すべて消えます。引き継ぐのは「2周目（転生）」のときだけ
    const keep = isFullComp
        ? { bottleNotes: playerData.bottleNotes || [], spSeen: playerData.spSeen || {}, spBest: playerData.spBest || {} }
        : { bottleNotes: [], spSeen: {}, spBest: {} };
    const keepZukan = {};
    if (isFullComp) {
        FISH_DATA.forEach(f => { if (zukanCatOf(f) === 'event' && caughtFish[f.id]) keepZukan[f.id] = caughtFish[f.id]; });
        Object.keys(caughtFish).forEach(k => { if (+k >= 500 && +k <= 699 && caughtFish[k]) keepZukan[k] = caughtFish[k]; });
    }   // 画像がまだ読み込めていない生き物も残す（季節イベント 500〜699）

    // ローカルストレージデータの削除
    localStorage.removeItem('retro_fishing_zukan_v4');
    localStorage.removeItem('retro_fishing_player_v1');
    localStorage.removeItem('retro_fishing_ranking_v1');

    caughtFish = keepZukan;
    localStorage.setItem('retro_fishing_zukan_v4', JSON.stringify(caughtFish));

    rankingData = [
        { fishName: "名無し", time: 0.250 },
        { fishName: "名無し", time: 0.280 },
        { fishName: "名無し", time: 0.320 }
    ];

    // 新規プレイヤーデータ生成（コンプ100%転生時は 10,000 G スタート）
    playerData = {
        level: 1, 
        exp: 0, 
        gold: isFullComp ? 10000 : 0, // ★ 10,000 G スタート
        equippedRod: "wood", ownedRods: ["wood"],
        equippedNet: "bug_net", ownedNets: ["bug_net"],
        equippedRodAcc: null, equippedBait: null,
        equippedNetAcc: null, equippedNetReel: null,
        ownedAccs: [],
        unlockedGachaMaps: [], totalCatches: 0, currentCombo: 0,
        netCatches: 0, netCombo: 0, missCount: 0,
        achievements: nextAchievements, // 選択に応じた実績データ
        playTimeSeconds: 0,
        hasSeenHowTo: false,
        hasSeenGachaNotice: false,
        easyMode: false,
        vibrationEnabled: true,
        clearCount: nextClearCount, // 選択に応じた周回数（星）
        isReincarnated: isFullComp,
        bottleNotes: keep.bottleNotes, spSeen: keep.spSeen, spBest: keep.spBest
    };

    savePlayerData();
    updateMenuUI();
    closeConfigModal();

    if (isFullComp) {
        playSE('levelup');
        const starMsg = deleteAchievements ? "（実績・星はリセットされました）" : `（★周回数: ${nextClearCount} へアップ！）`;
        gameAlert(`🌟 英雄、転生の時… 🌟\n全図鑑コンプリートの功績により『10,000 G』を所持した状態で新しくゲームを開始しました！\n${starMsg}`);
    } else {
        gameAlert("データを初期化しました。");
    }
}

/* 指定カテゴリ（normal / gacha）の図鑑コンプリート率（%）を取得するヘルパー関数 */
function checkCategoryCompPercent(catKey) {
    const targetFishList = FISH_DATA.filter(fish => zukanCatOf(fish) === (catKey === 'gacha' ? 'gacha' : 'normal'));   // イベントエリアはコンプ対象外

    if (targetFishList.length === 0) return 0;
    const unlockedCount = targetFishList.filter(fish => caughtFish[fish.id] && caughtFish[fish.id].unlocked).length;
    return Math.floor((unlockedCount / targetFishList.length) * 100);
}

/* ===================================================
   ショップ関連（アクセサリ購入タブの追加）
   =================================================== */
function openShop() {
    initAudio();
    closeAllModals();
    document.getElementById('menu-screen').style.display = "none";
    document.getElementById('shop-screen').style.display = "flex";
    switchShopTab('rod');
    playWaterPlop();
}

function closeShop() {
    goToMenu();
}

function switchShopTab(tab) {
    currentShopTab = tab;
    document.getElementById('shop-tab-rod').className = `shop-tab-btn ${tab === 'rod' ? 'active' : ''}`;
    document.getElementById('shop-tab-net').className = `shop-tab-btn ${tab === 'net' ? 'active' : ''}`;
    
    const accBtn = document.getElementById('shop-tab-acc');
    if (accBtn) accBtn.className = `shop-tab-btn ${tab === 'acc' ? 'active' : ''}`;

    renderShopList();
}

function renderShopList() {
    document.getElementById('shop-gold').innerText = playerData.gold;
    const list = document.getElementById('shop-list');
    list.innerHTML = "";

    if (!playerData.ownedNets) playerData.ownedNets = ["bug_net"];
    if (!playerData.ownedAccs) playerData.ownedAccs = [];

    let itemDataSource = ROD_DATA;
    let ownedArray = playerData.ownedRods;

    if (currentShopTab === 'net') {
        itemDataSource = NET_DATA;
        ownedArray = playerData.ownedNets;
    } else if (currentShopTab === 'acc') {
        itemDataSource = ACC_DATA;
        ownedArray = playerData.ownedAccs;
    }

    Object.keys(itemDataSource).forEach(key => {
        const data = itemDataSource[key];
        const isOwned = ownedArray.includes(key);

        const item = document.createElement('div');
        item.className = `shop-item ${isOwned ? 'equipped' : ''}`;

        let btnHtml = "";
        if (isOwned) {
            btnHtml = `<button class="btn" disabled style="background:#006644; color:#fff;">購入済み</button>`;
        } else {
            if (data.gacha) {
                btnHtml = `<button class="btn" disabled style="font-size:10px;">ガチャ限定</button>`;
            } else {
                const canBuy = playerData.gold >= data.price;
                btnHtml = `<button class="btn" ${canBuy ? '' : 'disabled'} onclick="buyItem('${currentShopTab}', '${key}')">${Number(data.price).toLocaleString()} G 購入</button>`;
            }
        }

        item.innerHTML = `
            <img class="shop-item-icon" src="${data.icon}" alt="${data.name}" onclick="zoomImage('${data.icon}')" onerror="imgFallback(this)">
            <div class="shop-item-info">
                <div class="shop-item-top">
                    <span class="shop-item-name">${data.name}</span>
                    ${btnHtml}
                </div>
                <div class="shop-item-desc">${data.desc}</div>
            </div>
        `;
        list.appendChild(item);
    });
}

function buyItem(type, key) {
    let itemData = type === 'rod' ? ROD_DATA[key] : (type === 'net' ? NET_DATA[key] : ACC_DATA[key]);
    let ownedArray = type === 'rod' ? playerData.ownedRods : (type === 'net' ? playerData.ownedNets : playerData.ownedAccs);

    if (itemData && playerData.gold >= itemData.price && !ownedArray.includes(key)) {
        playerData.gold -= itemData.price;
        ownedArray.push(key);

        savePlayerData();
        renderShopList();
        updateMenuUI();
        playSE('success');
        checkAchievements();
    }
}

/* ===================================================
   遊び方 / マップ選択モーダル
   =================================================== */
function openHowToPlay() {
    closeAllModals();
    document.getElementById('howto-modal').style.display = "flex";
    if (typeof practiceKinds === 'function') { const pb = byId('howto-sp-btn'); if (pb) pb.style.display = practiceKinds().length ? '' : 'none'; }   // 遊んだミニゲームがあるときだけ表示
    if (!playerData.hasSeenHowTo) {
        playerData.hasSeenHowTo = true;
        savePlayerData();
        const howtoBtn = document.getElementById('btn-howto');
        if (howtoBtn) howtoBtn.classList.remove('highlight-howto');
    }
}

function closeHowToPlay() {
    document.getElementById('howto-modal').style.display = "none";
}

function openMapModal() {
    initAudio();
    resetGameStateToReady();
    closeAllModals();
    mapFilter = (MAP_DATA[currentLocation] && zukanCatOfArea(currentLocation)) || 'normal';     // 今いる場所のタブから開く
    renderMapGrid();
    document.getElementById('map-modal').style.display = "flex";
}

function closeMapModal() {
    document.getElementById('map-modal').style.display = "none";
}

/* ---------- 場所移動：フィルター（通常／ガチャ／特殊／イベント）。特殊・イベントは、合言葉で解放するまでタブが出ません ---------- */
let mapFilter = 'normal';
const specialTabVisible = () => Object.keys(MAP_DATA).some(k => MAP_DATA[k].special && specialUnlocked(k));
const eventTabVisible = () => Object.keys(MAP_DATA).some(k => MAP_DATA[k].event && eventUnlocked(k));
function mapTabsList() {
    const t = [['normal', '通常'], ['gacha', 'ガチャ']];
    if (specialTabVisible()) t.push(['special', '特殊']);
    if (eventTabVisible()) t.push(['event', 'イベント']);
    return t;
}
function renderMapGrid() {
    const grid = document.getElementById('map-grid');
    grid.innerHTML = "";
    if (!playerData.unlockedGachaMaps) playerData.unlockedGachaMaps = [];

    const tabs = mapTabsList();
    if (!tabs.some(t => t[0] === mapFilter)) mapFilter = 'normal';
    const tb = document.getElementById('map-tabs');
    if (tb) {
        tb.innerHTML = '';
        tb.style.display = 'flex';
        tabs.forEach(([k, label]) => {
            const b = document.createElement('button');
            b.className = 'map-tab mt-' + k + (mapFilter === k ? ' active' : '');
            b.textContent = label;
            b.onclick = () => { mapFilter = k; renderMapGrid(); playSE && playSE('tap'); };
            tb.appendChild(b);
        });
    }

    if (mapFilter === 'normal' || mapFilter === 'gacha') {
        Object.keys(MAP_DATA).forEach(locKey => {
            const map = MAP_DATA[locKey];
            if (map.event || map.special) return;
            if (!!map.gacha !== (mapFilter === 'gacha')) return;
            let isUnlocked = playerData.level >= map.reqLevel;
            if (map.gacha) isUnlocked = isUnlocked && playerData.unlockedGachaMaps.includes(locKey);
            const isCurrent = currentLocation === locKey;
            const btn = document.createElement('button');
            btn.className = `map-btn ${isCurrent ? 'active' : ''} ${isUnlocked ? '' : 'locked'}`;
            if (isUnlocked) {
                btn.innerText = `${map.name} ${map.gacha ? '(ガチャ)' : '(Lv.' + map.reqLevel + '〜)'}${map.note ? '\n' + map.note : ''}`;
                btn.onclick = () => selectLocation(locKey);
            } else {
                let reqLabel = map.gacha ? `要 Lv.${map.reqLevel}＆ガチャ` : `要 Lv.${map.reqLevel}`;
                btn.innerText = `🔒 ？？？ (${reqLabel})`;
            }
            grid.appendChild(btn);
        });
    } else if (mapFilter === 'event') renderEventMapButtons(grid);
    else if (mapFilter === 'special') renderSpecialMapButtons(grid);

    const hint = document.createElement('div');
    hint.className = 'map-hint';
    hint.innerText = '🍾 ふしぎなエリアの合言葉は、釣りの最中に見つかる「手紙入りの小瓶」にヒントが…？';
    grid.appendChild(hint);
}

function selectLocation(locKey) {
    const map = MAP_DATA[locKey];
    if (!map) return;
    if (map.event && !eventAreaOpen(locKey)) return;     // イベントエリアは「解放済み」かつ「開催期間中」だけ
    if (map.special && !specialUnlocked(locKey)) return;     // 特殊エリアは「解放済み」ならいつでも

    if (map.gacha) {
        if (!playerData.unlockedGachaMaps.includes(locKey)) return;
    } else {
        if (playerData.level < map.reqLevel) return;
    }

    currentLocation = locKey;
    const container = document.getElementById('game-container');
    container.style.backgroundImage = `url('${map.bg}')` + (map.bgFallback ? `, url('${map.bgFallback}')` : '');
    document.getElementById('current-location-text').innerText = `【${map.name}】`;

    closeMapModal();
    updateStageBgm();
    playWaterPlop();
}


function zoomImage(src) {
    if (!src) return;
    const modal = document.getElementById('zoom-modal');
    const img = document.getElementById('zoom-img');
    img.src = src;
    modal.style.display = "flex";
}

function closeZoomModal() {
    document.getElementById('zoom-modal').style.display = "none";
}

function resetZukanData() {
    resetAllData();
}

/* ===================================================
   おさかな絵巻（図鑑）機能
   =================================================== */



function resetGameStateToReady() {
    clearTimeout(timerId);
    clearTimeout(timeoutTimerId);
    clearInterval(battleIntervalId);
    hideFishShadow();
    
    document.getElementById('ripple-effect').style.display = "none";
    document.getElementById('exclamation').style.display = "none";
    document.getElementById('mash-container').style.display = "none";
    
    if (gameState !== 'TITLE' && gameState !== 'MENU' && gameState !== 'GACHA') {
        gameState = 'READY';
        const actionVerb = currentToolMode === 'rod' ? 'タップで竿を振る' : 'タップで網を構える';
        document.getElementById('status-text').innerText = `${actionVerb}`;
        document.getElementById('status-text').style.color = "#fff";
    }
}

function renderZukanGrid() {
    const currentCategoryFishList = FISH_DATA.filter(fish => zukanCatOf(fish) === currentZukanMainTab);

    const totalFish = currentCategoryFishList.length;
    const unlockedCount = currentCategoryFishList.filter(fish => caughtFish[fish.id] && caughtFish[fish.id].unlocked).length;
    const percent = totalFish > 0 ? Math.floor((unlockedCount / totalFish) * 100) : 0;

    document.getElementById('zukan-progress-num').innerText = `${percent}% (${unlockedCount}/${totalFish})`;
    document.getElementById('zukan-progress-bar-inner').style.width = `${percent}%`;
    { const pc = document.querySelector('.zukan-progress-container'); if (pc) pc.classList.toggle('full', totalFish > 0 && unlockedCount >= totalFish); }

    const gridContainer = document.getElementById('zukan-grid');
    gridContainer.innerHTML = "";

    const listToDisplay = currentCategoryFishList.filter(fish => {
        if (currentFilter === 'all') return true;
        return fish.location === currentFilter;
    });

    const isEvTab = currentZukanMainTab === 'event';
    const showHeads = zukanSortList(listToDisplay, isEvTab);
    let _lastMonthHead = null;
    listToDisplay.forEach(fish => {
        if (isEvTab && showHeads && fish.month !== _lastMonthHead) {        // 月ごとの見出し
            _lastMonthHead = fish.month;
            const hd = document.createElement('div');
            hd.className = 'zukan-month-head';
            hd.innerText = eventMonthLabel(fish.month);
            gridContainer.appendChild(hd);
        }
        const fishRecord = caughtFish[fish.id];
        const isUnlocked = fishRecord && fishRecord.unlocked;
        const card = document.createElement('div');
        card.className = `zukan-card ${isUnlocked ? 'discovered' : ''} ${isUnlocked && window.zukanAreaDoneC && zukanAreaDoneC(fish.location) ? 'area-done' : ''}`;
        
        if (isUnlocked && fishRecord.isNew) {
            const badge = document.createElement('span');
            badge.className = 'zukan-new-badge';
            badge.innerText = 'NEW';
            card.appendChild(badge);
        }

        const img = document.createElement('img');
        if (isUnlocked) {
            img.src = fish.image;
            img.onerror = () => { img.src = fish.fallbackSvg; };
        } else {
            const isNet = fish.toolType === 'net';
            const iconText = isNet ? "🕸" : "🎣";
            img.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='45' font-size='35' text-anchor='middle' dominant-baseline='central'>${iconText}</text><text x='50' y='80' font-size='22' fill='gray' font-family='sans-serif' font-weight='bold' text-anchor='middle'>？</text></svg>`;
        }

        const name = document.createElement('div');
        name.className = "zukan-card-name";
        
        if (isUnlocked) {
            name.innerText = fish.name;
        } else {
            const isNet = fish.toolType === 'net';
            name.innerText = isNet ? "？(網で捕獲可能)" : "？(竿で捕獲可能)";
            card.style.cursor = 'pointer'; card.onclick = () => { if (window.zukanHint) zukanHint(fish); };
            name.style.color = isNet ? "#ff99ff" : "#aaa";
        }

        card.appendChild(img);
        card.appendChild(name);

        if (isUnlocked) {
            card.onclick = () => openZukanDetail(fish);
        }

        gridContainer.appendChild(card);
    });
}


function closeZukanDetail() {
    const modal = document.getElementById('zukan-detail-modal');
    if (modal) modal.style.display = "none";
}

function closeZukan() {
    isZukanOpen = false;
    closeZukanDetail();
    document.getElementById('zukan-modal').style.display = "none";
    updateStageBgm();
}

/* ===================================================
   効果音（SE）再生関数
   =================================================== */
function playWaterPlop() {
    if (!soundEnabled || !audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(seOut());
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    } catch(e) {}
}

function playSplashSE() {
    if (!soundEnabled || !audioCtx) return;
    try {
        const bufferSize = audioCtx.sampleRate * 0.2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(seOut());
        noise.start();
    } catch(e) {}
}



/* ===================================================
   ゲームメインループ・アクション処理
   =================================================== */
function registerMiss() {
    playerData.missCount = (playerData.missCount || 0) + 1;
    savePlayerData();
    checkAchievements();
}

function handleAction() {
    initAudio();

    if (gameState === 'READY') {
        const equippedRod = playerData.equippedRod;
        const equippedNet = playerData.equippedNet || 'bug_net';

        // 深海エリア制限
        if (currentLocation === 'deepsea' && currentToolMode === 'rod') {
            if (equippedRod !== 'bronze' && equippedRod !== 'legend' && equippedRod !== 'god_beast_rod') {
                playSE('foul');
                document.getElementById('status-text').innerText = "青銅・伝説・神獣の竿が必要だ！";
                document.getElementById('status-text').style.color = "#ff3333";
                return;
            }
        }

        // 黄金郷エリア制限（※エルドラドロッド eldorado_rod のみ許可）
        if (currentLocation === 'eldorado') {
            if (currentToolMode === 'rod') {
                if (equippedRod !== 'eldorado_rod') {
                    playSE('foul');
                    document.getElementById('status-text').innerText = "エルドラドロッドが必要だ！";
                    document.getElementById('status-text').style.color = "#ff3333";
                    return;
                }
            } else if (currentToolMode === 'net') {
                if (equippedNet !== 'divine_net') {
                    playSE('foul');
                    document.getElementById('status-text').innerText = "神獣の網が必要だ！";
                    document.getElementById('status-text').style.color = "#ff3333";
                    return;
                }
            }
        }

        // 神獣界エリア制限（※神獣の竿 god_beast_rod のみ許可）
        if (currentLocation === 'shinju') {
            if (currentToolMode === 'rod') {
                if (equippedRod !== 'god_beast_rod') {
                    playSE('foul');
                    document.getElementById('status-text').innerText = "神獣の竿が必要だ！";
                    document.getElementById('status-text').style.color = "#ff3333";
                    return;
                }
            } else if (currentToolMode === 'net') {
                if (equippedNet !== 'divine_net') {
                    playSE('foul');
                    document.getElementById('status-text').innerText = "神獣の網が必要だ！";
                    document.getElementById('status-text').style.color = "#ff3333";
                    return;
                }
            }
        }

        startWaiting();
    } else if (gameState === 'WAITING') {
        foulAction();
    } else if (gameState === 'SIGNAL') {
        hitAction();
    } else if (gameState === 'BATTLE') {
        battleTap();
    }
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (document.getElementById('result-modal').style.display !== 'block' &&
            document.getElementById('zukan-modal').style.display !== 'flex' &&
            document.getElementById('map-modal').style.display !== 'flex' &&
            document.getElementById('howto-modal').style.display !== 'flex' &&
            document.getElementById('levelup-modal').style.display !== 'flex' &&
            document.getElementById('gacha-screen').style.display !== 'flex' &&
            document.getElementById('gacha-list-modal').style.display !== 'flex' &&
            document.getElementById('config-modal').style.display !== 'flex' &&
            document.getElementById('achievement-modal').style.display !== 'flex' &&
            document.getElementById('zoom-modal').style.display !== 'flex') {
            if (gameState === 'TITLE') {
                goToMenu();
            } else if (gameState === 'MENU') {
                startGameFromMenu();
            } else {
                handleAction();
            }
        }
    }
});


function hideFishShadow() {
    document.getElementById('fish-shadow').style.display = "none";
    cancelAnimationFrame(shadowAnimId);
}


function foulAction() {
    clearTimeout(timerId);
    clearTimeout(timeoutTimerId);
    hideFishShadow();
    document.getElementById('ripple-effect').style.display = "none";
    gameState = 'READY';
    playSE('foul');

    if (currentToolMode === 'rod') {
        playerData.currentCombo = 0;
    } else {
        playerData.netCombo = 0;
    }
    
    registerMiss();
    document.getElementById('status-text').innerText = "早合わせ！逃げられた！";
    document.getElementById('status-text').style.color = "#ff3333";
}




function updateGaugeUI() {
    document.getElementById('gauge-inner').style.width = `${battleGauge}%`;
}

function getExpByFish(fish) {
    if (fish.isBig) return 50;
    if (fish.shadowImage && fish.shadowImage.includes('big')) return 30;
    if (fish.shadowImage && fish.shadowImage.includes('midi')) return 20;
    return 10;
}


function showLevelUpModal(lvl, unlockedArea) {
    const modal = document.getElementById('levelup-modal');
    document.getElementById('levelup-text').innerText = `釣りレベルが Lv.${lvl} に上がった！`;
    
    const unlockText = document.getElementById('levelup-unlock-text');
    if (unlockedArea) {
        unlockText.style.display = "block";
        unlockText.innerText = `✨ 新エリア「${unlockedArea}」が解放されました！`;
    } else {
        unlockText.style.display = "none";
    }

    modal.style.display = "flex";
}

function closeLevelUpModal() {
    document.getElementById('levelup-modal').style.display = "none";
}


function closeResult() {
    document.getElementById('result-modal').style.display = "none";
    gameState = 'READY';
    const actionVerb = currentToolMode === 'rod' ? 'タップで竿を振る' : 'タップで網を構える';
    document.getElementById('status-text').innerText = `${actionVerb}`;
    document.getElementById('status-text').style.color = "#fff";

    if (pendingLevelUp) {
        playSE('levelup');
        showLevelUpModal(pendingLevelUp.level, pendingLevelUp.unlockedArea);
        pendingLevelUp = null;
    }
}


function toggleUpdateBox() {
    const content = document.getElementById('update-content');
    const btn = document.getElementById('update-toggle-btn');
    
    if (content.style.display === "none") {
        content.style.display = "block";
        btn.innerText = "ー";
    } else {
        content.style.display = "none";
        btn.innerText = "＋";
    }
}


function loadPlayerData() {
    const saved = localStorage.getItem('retro_fishing_player_v1');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            playerData = Object.assign({}, playerData, parsed);
        } catch(e) {}
    }
    soundEnabled = playerData.soundEnabled !== false;   // 音のON/OFFも保存（Ver 3.1.0）
}

/* ===================================================
   神獣界 ボス専用バトルシステム
   =================================================== */

function setupMashStep(titleText) {
    battleGauge = 20;
    document.getElementById('status-text').innerText = titleText;
    document.getElementById('status-text').style.color = "#ff2200";
    document.getElementById('mash-container').style.display = "flex";
    document.getElementById('mash-title').innerText = titleText;
    updateGaugeUI();

    clearInterval(battleIntervalId);
    battleIntervalId = setInterval(() => {
        if (gameState !== 'BATTLE') return;
        
        let decay = bossPhase === 2 ? 2.5 : 1.8;
        if (playerData.equippedRod === 'god_beast_rod') decay *= 0.6;

        battleGauge -= decay;
        if (battleGauge <= 0) {
            failBossBattle();
        }
        updateGaugeUI();
    }, 100);
}

function setupTimingStep(titleText) {
    clearInterval(battleIntervalId);
    document.getElementById('mash-container').style.display = "none";
    document.getElementById('status-text').innerText = titleText;
    document.getElementById('status-text').style.color = "#ffd700";

    setTimeout(() => {
        if (gameState !== 'BATTLE') return;
        document.getElementById('exclamation').style.display = "block";
        playSE('signal');
        startTime = Date.now();

        clearTimeout(timeoutTimerId);
        timeoutTimerId = setTimeout(() => {
            if (gameState === 'BATTLE') {
                failBossBattle();
            }
        }, 450);
    }, Math.random() * 1500 + 1000);
}

function handleBossTap() {
    const name = currentTargetFish.name;

    if (name === "ミズチ") {
        playSE('tap');
        battleGauge += (playerData.equippedRod === 'god_beast_rod') ? 15 : 10;
        updateGaugeUI();

        if (battleGauge >= 100) {
            bossStep++;
            if (bossStep <= 3) {
                setupMashStep("【ターン " + bossPhase + "/2】画面を連打しろ！ (" + bossStep + "/3)");
            } else {
                advanceBossPhase();
            }
        }
    } 
    else if (name === "ゲンブ") {
        if (document.getElementById('exclamation').style.display === "block") {
            clearTimeout(timeoutTimerId);
            document.getElementById('exclamation').style.display = "none";
            const req = playerData.easyMode ? 0.40 + 0.35 : 0.40;
            const react = (Date.now() - startTime) / 1000;

            if (react <= req) {
                playSE('success');
                timingCount++;
                if (timingCount < 3) {
                    setupTimingStep("【ターン " + bossPhase + "/2】「一閃」で捕まえろ！ (" + (timingCount + 1) + "/3)");
                } else {
                    advanceBossPhase();
                }
            } else {
                failBossBattle();
            }
        } else {
            failBossBattle();
        }
    } 
    else if (name === "リヴァイアタン") {
        if (bossStep === 1 || bossStep === 3) {
            playSE('tap');
            let p = (bossStep === 3) ? 8 : 12;
            if (playerData.equippedRod === 'god_beast_rod') p += 5;
            
            battleGauge += p;
            updateGaugeUI();

            if (battleGauge >= 100) {
                bossStep++;
                if (bossStep === 2) {
                    setupTimingStep("【ターン " + bossPhase + "/2】一閃に合わせてタップ！");
                } else if (bossStep === 3) {
                    setupMashStep("【ターン " + bossPhase + "/2】限界を超えて超連打！");
                } else {
                    advanceBossPhase();
                }
            }
        } else if (bossStep === 2) {
            if (document.getElementById('exclamation').style.display === "block") {
                clearTimeout(timeoutTimerId);
                document.getElementById('exclamation').style.display = "none";
                const req = playerData.easyMode ? 0.35 + 0.35 : 0.35;
                const react = (Date.now() - startTime) / 1000;

                if (react <= req) {
                    playSE('success');
                    bossStep = 3;
                    setupMashStep("【ターン " + bossPhase + "/2】限界を超えて超連打！");
                } else {
                    failBossBattle();
                }
            } else {
                failBossBattle();
            }
        }
    }
}

function advanceBossPhase() {
    clearInterval(battleIntervalId);
    document.getElementById('mash-container').style.display = "none";
    document.getElementById('exclamation').style.display = "none";

    if (bossPhase === 1) {
        playSE('foul');
        document.getElementById('status-text').innerText = "ダメだ！まだ捕まえられない！";
        document.getElementById('status-text').style.color = "#ff3333";

        setTimeout(() => {
            if (gameState === 'BATTLE') {
                startBossBattle(2);
            }
        }, 1800);
    } else {
        isBossBattle = false;
        finishCatch(true);
    }
}

function failBossBattle() {
    clearInterval(battleIntervalId);
    clearTimeout(timeoutTimerId);
    isBossBattle = false;
    document.getElementById('mash-container').style.display = "none";
    document.getElementById('exclamation').style.display = "none";
    playSE('foul');

    if (currentToolMode === 'rod') {
        playerData.currentCombo = 0;
    } else {
        playerData.netCombo = 0;
    }
    
    registerMiss();
    failReason = 'boss';
    showResult(false, currentTargetFish, 0.999);
}

function updateGachaNoticeUI() {
    const btn = document.getElementById('btn-gacha-notice');
    if (btn) {
        if (!playerData.hasSeenGachaNotice) {
            btn.classList.add('highlight-notice');
        } else {
            btn.classList.remove('highlight-notice');
        }
    }
}

function openGachaNotice() {
    document.getElementById('gacha-notice-modal').style.display = "flex";
    
    if (!playerData.hasSeenGachaNotice) {
        playerData.hasSeenGachaNotice = true;
        savePlayerData();
        updateGachaNoticeUI();
    }
    playWaterPlop();
}

function closeGachaNotice() {
    document.getElementById('gacha-notice-modal').style.display = "none";
}

function triggerVibration(pattern) {
    if (playerData.vibrationEnabled !== false && 'vibrate' in navigator) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {
            console.log("Vibration error:", e);
        }
    }
}

function toggleVibration() {
    playerData.vibrationEnabled = (playerData.vibrationEnabled === false) ? true : false;
    
    savePlayerData();
    updateVibrationUI();
    playWaterPlop();
}

function updateVibrationUI() {
    const btn = document.getElementById('config-vibe-btn');
    if (btn) {
        const isVibeOn = playerData.vibrationEnabled !== false;
        
        if (isVibeOn) {
            btn.innerText = "バイブ: ON";
            btn.style.background = "#006644";
        } else {
            btn.innerText = "バイブ: OFF";
            btn.style.background = "#aa0000";
        }
    }
}

let rankingData = JSON.parse(localStorage.getItem('retro_fishing_ranking_v1')) || [
    { fishName: "名無し", time: 0.250 },
    { fishName: "名無し", time: 0.280 },
    { fishName: "名無し", time: 0.320 }
];

function saveRankingData() {
    localStorage.setItem('retro_fishing_ranking_v1', JSON.stringify(rankingData));
}

function checkAndRegisterRanking(newTime, fish) {
    if (!newTime || newTime <= 0 || !fish) return;

    const isRankIn = rankingData.length < 5 || newTime < rankingData[rankingData.length - 1].time;

    if (isRankIn) {
        const fishName = fish.name || "謎の生物";

        rankingData.push({ fishName: fishName, time: parseFloat(newTime.toFixed(3)) });
        rankingData.sort((a, b) => a.time - b.time);
        rankingData = rankingData.slice(0, 5);

        saveRankingData();
    }
}

function openRankingModal() {
    initAudio();
    closeAllModals();
    renderRankingList();
    document.getElementById('ranking-modal').style.display = "flex";
    playWaterPlop();
}

function closeRankingModal() {
    document.getElementById('ranking-modal').style.display = "none";
}

function renderRankingList() {
    const listContainer = document.getElementById('ranking-list');
    listContainer.innerHTML = "";

    if (rankingData.length === 0) {
        listContainer.innerHTML = `<div style="color:#aaa; font-size:14px; margin-top:20px;">記録がありません</div>`;
        return;
    }

    rankingData.forEach((item, index) => {
        const rank = index + 1;
        const div = document.createElement('div');
        div.className = `ranking-item rank-${rank}`;

        let crown = `${rank}位`;
        if (rank === 1) crown = "🥇 1位";
        if (rank === 2) crown = "🥈 2位";
        if (rank === 3) crown = "🥉 3位";

        div.innerHTML = `
            <span class="ranking-rank">${crown}</span>
            <span class="ranking-name">${item.fishName || '魚'}</span>
            <span class="ranking-time">${item.time.toFixed(3)} 秒</span>
        `;
        listContainer.appendChild(div);
    });
}

async function openCheatPrompt() {
    const input = await gamePrompt("合言葉を入力してください", { placeholder: "合言葉", ok: "つかう", cancel: "やめる" });
    if (!input || input.trim() === "") return;

    const code = input.trim().toLowerCase();
    let isSuccess = false;
    let message = "";
    let devRes = null, devAfter = null, devScroll = false;

    if (code === "gold100k8239") {
        playerData.gold += 100000;
        message = "💰 100,000 ゴールドを獲得しました！";
        isSuccess = true;
    }
    else if (code === "unlockalltools4652") {
        unlockAllTools();
        message = "🎣 すべての釣り竿と捕獲ネット、アクセサリを獲得しました！";
        isSuccess = true;
    }
    else if (code === "allmaps93874") {
        unlockAllMaps();
        message = "🗺️ すべての釣り場エリア（通常・ガチャ限定）を解放しました！";
        isSuccess = true;
    }
    else if (code === "fullcheat975330") {
        playerData.gold += 100000;
        unlockAllTools();
        unlockAllMaps();
        message = "✨ 100,000G・全道具・全エリアをすべて獲得しました！";
        isSuccess = true;
    } 
    else if (code === "eventall092365") {
        playerData.eventAllOpen = true;
        message = "🎍 季節イベントのエリアとミニゲームが、期間に関係なくすべて遊べるようになりました！（解除：EventClose087234）";
        isSuccess = true;
    }
    else if (code === "eventclose087234") {
        playerData.eventAllOpen = false;
        message = "🎍 季節イベントを、通常の開催期間だけ遊べる状態にもどしました。";
        isSuccess = true;
    }
    else if (code === "specialarea23742") {
        if (!playerData.specialAreas) playerData.specialAreas = {};
        Object.keys(MAP_DATA).filter(k => MAP_DATA[k].special).forEach(k => { playerData.specialAreas[k] = true; });
        message = "🌌 特殊エリアがすべて解放されました！「場所移動」から行けます。";
        isSuccess = true;
    }
    else if ((devRes = window.runDevCommand ? runDevCommand(code) : null)) {      // 開発者コマンド（devcmd.js）
        message = devRes.msg; isSuccess = true; devAfter = devRes.after;
        if (devRes.scroll) devScroll = true;
    }
    else if (await redeemSecretCode(input.trim())) {     // 小瓶の手紙に書かれた合言葉（Ver 3.0.1）
        return;
    }
    else {
        gameAlert("合言葉が違います。");
        return;
    }

    if (isSuccess) {
        savePlayerData();
        updateMenuUI();
        playSE('levelup');
        checkAchievements();
        await gameAlert(message, devScroll ? { scroll: true } : undefined);
        if (devAfter) devAfter();
    }
}

function unlockAllTools() {
    const allRodKeys = Object.keys(ROD_DATA);
    allRodKeys.forEach(key => {
        if (!playerData.ownedRods.includes(key)) {
            playerData.ownedRods.push(key);
        }
    });
    
    const allNetKeys = Object.keys(NET_DATA);
    allNetKeys.forEach(key => {
        if (!playerData.ownedNets.includes(key)) {
            playerData.ownedNets.push(key);
        }
    });

    if (!playerData.ownedAccs) playerData.ownedAccs = [];
    const allAccKeys = Object.keys(ACC_DATA);
    allAccKeys.forEach(key => {
        if (!playerData.ownedAccs.includes(key)) {
            playerData.ownedAccs.push(key);
        }
    });
}

function unlockAllMaps() {
    playerData.level = 200;
    playerData.exp = 19900;

    if (!playerData.unlockedGachaMaps) playerData.unlockedGachaMaps = [];
    
    Object.keys(MAP_DATA).forEach(key => {
        if (MAP_DATA[key].gacha && !playerData.unlockedGachaMaps.includes(key)) {
            playerData.unlockedGachaMaps.push(key);
        }
    });
}

/* 装備画面を開く */
function openEquipScreen() {
    initAudio();
    closeAllModals();
    updateEquipScreenUI();
    document.getElementById('equip-screen').style.display = "flex";
    playWaterPlop();
}

function closeEquipScreen() {
    document.getElementById('equip-screen').style.display = "none";
}

/* 装備画面UIの更新 */
function updateEquipScreenUI() {
    const rod = ROD_DATA[playerData.equippedRod];
    if (rod) {
        document.getElementById('equip-rod-img').src = rod.icon;
        document.getElementById('equip-rod-name').innerText = rod.name;
    }

    const net = NET_DATA[playerData.equippedNet];
    if (net) {
        document.getElementById('equip-net-img').src = net.icon;
        document.getElementById('equip-net-name').innerText = net.name;
    }

    updateAccSlotUI('equippedRodAcc', 'equip-rodAcc-img', 'equip-rodAcc-name', '竿の補助');
    updateAccSlotUI('equippedBait', 'equip-bait-img', 'equip-bait-name', 'エサ');
    updateAccSlotUI('equippedNetAcc', 'equip-netAcc-img', 'equip-netAcc-name', '網の補助');
    updateAccSlotUI('equippedNetReel', 'equip-netReel-img', 'equip-netReel-name', '網の飾り');
}

function updateAccSlotUI(slotKey, imgId, nameId, defaultText) {
    const accKey = playerData[slotKey];
    const imgEl = document.getElementById(imgId);
    const nameEl = document.getElementById(nameId);

    if (accKey && ACC_DATA[accKey]) {
        const item = ACC_DATA[accKey];
        imgEl.src = item.icon;
        imgEl.style.display = "block";
        nameEl.innerText = item.name;
    } else {
        imgEl.style.display = "none";
        nameEl.innerHTML = `枠<br>(${defaultText})`;
    }
}

let currentSelectingSlot = "";

function openEquipSelectModal(slotType) {
    currentSelectingSlot = slotType;
    const modal = document.getElementById('equip-select-modal');
    const list = document.getElementById('equip-select-list');
    list.innerHTML = "";

    let items = [];
    let currentEquipped = "";

    if (slotType === 'rod') {
        items = playerData.ownedRods.map(k => ROD_DATA[k]);
        currentEquipped = playerData.equippedRod;
    } else if (slotType === 'net') {
        items = playerData.ownedNets.map(k => NET_DATA[k]);
        currentEquipped = playerData.equippedNet;
    } else {
        const accKeys = playerData.ownedAccs || [];
        items = accKeys.map(k => ACC_DATA[k]).filter(item => item !== undefined);

        if (slotType === 'rodAcc') {
            items = items.filter(i => accSlot(i) === 'rodAcc');
            currentEquipped = playerData.equippedRodAcc;
        } else if (slotType === 'bait') {
            items = items.filter(i => accSlot(i) === 'bait');
            currentEquipped = playerData.equippedBait;
        } else if (slotType === 'netAcc') {
            items = items.filter(i => accSlot(i) === 'netAcc');
            currentEquipped = playerData.equippedNetAcc;
        } else if (slotType === 'netReel') {
            items = items.filter(i => accSlot(i) === 'netReel');
            currentEquipped = playerData.equippedNetReel;
        }
    }

    if (slotType !== 'rod' && slotType !== 'net') {
        const unequipDiv = document.createElement('div');
        unequipDiv.className = "equip-select-item";
        unequipDiv.innerHTML = `<span>装備を外す</span><button class="btn" onclick="selectEquipItem('')">外す</button>`;
        list.appendChild(unequipDiv);
    }

    items.forEach(data => {
        if (!data) return;
        const isEq = currentEquipped === data.id;
        const div = document.createElement('div');
        div.className = "equip-select-item";
        div.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px;">
                <img src="${data.icon}" style="width:32px; height:30px; object-fit:contain;" onerror="imgFallback(this)">
                <span style="font-size:13px; font-weight:bold; color:#fff;">${data.name}</span>
            </div>
            <button class="btn" ${isEq ? 'disabled' : ''} onclick="selectEquipItem('${data.id}')">${isEq ? '装備中' : '装備'}</button>
        `;
        list.appendChild(div);
    });

    modal.style.display = "flex";
}

function selectEquipItem(itemId) {
    if (currentSelectingSlot === 'rod') playerData.equippedRod = itemId;
    else if (currentSelectingSlot === 'net') playerData.equippedNet = itemId;
    else if (currentSelectingSlot === 'rodAcc') playerData.equippedRodAcc = itemId;
    else if (currentSelectingSlot === 'bait') playerData.equippedBait = itemId;
    else if (currentSelectingSlot === 'netAcc') playerData.equippedNetAcc = itemId;
    else if (currentSelectingSlot === 'netReel') playerData.equippedNetReel = itemId;

    savePlayerData();
    updateEquipScreenUI();
    updateMenuUI();
    closeEquipSelectModal();
    playWaterPlop();
}

function closeEquipSelectModal() {
    document.getElementById('equip-select-modal').style.display = "none";
}

window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    loadPlayerData();
    updateMenuUI();
    updateSoundUI();
    updateVibrationUI();
    updateTitleBackground();
    checkAchievements();
    startPlayTimeCounter();
});

let logoTapCount = 0;
let isRainbowActive = false;

/* タイトルロゴ連打時の隠しコマンド処理 */
/* タイトルロゴ連打時の隠しコマンド処理 */
function onLogoTap() {
    // タイトル画面以外では無効
    if (gameState !== 'TITLE') return;

    logoTapCount++;

    // タップ時のフィードバック効果音
    playTone(300 + (logoTapCount * 50), 0.05, 'sine');

    // 10回連打達成時
    if (logoTapCount >= 10 && !isRainbowActive) {
        isRainbowActive = true;
        
        const logo = document.getElementById('main-logo');
        if (logo) {
            logo.classList.add('rainbow-mode');
        }

        // ファンファーレ風の効果音
        playSE('levelup');

        // 報酬として 1,000 G をプレゼント（※3000から1000へ変更）
        playerData.gold += 300;
        savePlayerData();

        // 隠し実績の解除チェック
        if (!playerData.achievements) playerData.achievements = [];
        if (!playerData.achievements.includes('secret_logo')) {
            playerData.achievements.push('secret_logo');
            savePlayerData();
            enqueueAchievementToast('secret_logo');
        }

        setTimeout(() => {
            gameAlert("✨ 隠しコマンド発動！ ✨\nロゴが虹色に覚醒し、ボーナス 300 G を獲得しました！");
        }, 100);
    }
}

/* リアルタイム（端末時間）に応じてタイトルの背景画像を切り替える関数 */
function updateTitleBackground() {
    const titleElem = document.getElementById('title-screen');
    if (!titleElem) return;

    const currentHour = new Date().getHours();
    
    // 18:00 〜 5:59 を「夜」と判定
    const isNight = currentHour >= 18 || currentHour < 6;

    if (isNight) {
        // 夜用背景画像を設定（※画像がない場合のフォールバック付き）
        titleElem.style.backgroundImage = "url('images/bg/bg_title_night.png')";
    } else {
        // 昼用背景画像を設定
        titleElem.style.backgroundImage = "url('images/bg/bg_title.png')";
    }
}

/* ===================================================
   Ver 2.6.0 追加・改良パート
   ---------------------------------------------------
   ・新ステージ／生き物／道具の追加は addons.js を編集してください
   =================================================== */
const APP_VERSION = "3.2.1";
const CSS_VERSION = "32-h";
const byId = (id) => document.getElementById(id);
const pickOne = (a) => a[Math.floor(Math.random() * a.length)];
const IS_IOS = /iP(hone|od|ad)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

let failReason = 'late';
let lastLimit = 0;
let waitToken = 0;
let fakeBite = false;
let tutorialStage = 0;      // 0:なし 1:竿(通常) 2:竿(大物) 3:網
let forceTutorial = false;
let forceNextFish = null;
let zoromeCast = false;
let frenzy = 0;
let weather = 'clear';
let recentCatches = [];
let lastBonus = {};
let lastCastSuccess = false;
let netState = null;
let netRaf = 0;
let netRatio = 1;

/* ===================================================
   バランス調整値（ここを変えるとゴールド量を調整できます）
   =================================================== */
const BAL = {
    comboPerStep: 0.01,   // 連続成功1回ごとの売値ボーナス
    comboMax: 15,         // コンボボーナスの上限回数（+15%）
    perfect: 1.15,        // PERFECT倍率
    great: 1.05,          // GREAT倍率
    frenzy: 1.5,          // 入れ食い倍率
    zorome: 2,            // ゾロ目倍率
    chestRate: 0.02,      // 宝箱の出現率
    cap: 1.8,             // ボーナス合計の上限倍率（ゾロ目を除く）
    missionScale: 50      // ミッション報酬のレベル補正（大きいほど控えめ）
};

/* ===================================================
   実績追加（secret:true は条件が見えない隠し実績）
   =================================================== */
const _IC = { c: "images/trophy/trophy_copper.png", s: "images/trophy/trophy_silver.png", g: "images/trophy/trophy_gold.png" };
Object.assign(ACHIEVEMENT_DATA, {
    tutorial_done: { id: "tutorial_done", name: "はじめの一歩", icon: _IC.c, desc: "練習釣りをクリアした" },
    perfect_10: { id: "perfect_10", name: "一閃の使い手", icon: _IC.c, desc: "PERFECTを累計10回出した" },
    perfect_100: { id: "perfect_100", name: "神速の釣り人", icon: _IC.g, desc: "PERFECTを累計100回出した" },
    combo_10: { id: "combo_10", name: "絶好調！", icon: _IC.s, desc: "10連続で成功した" },
    big_10: { id: "big_10", name: "大物ハンター", icon: _IC.s, desc: "大物を累計10匹つかまえた" },
    zorome: { id: "zorome", name: "ゾロ目の奇跡", icon: _IC.g, desc: "同じ生き物を3連続でつかまえた" },
    mission_10: { id: "mission_10", name: "日課の達人", icon: _IC.s, desc: "デイリーミッションを累計10個達成した" },
    ngacha_20: { id: "ngacha_20", name: "息抜き上手", icon: _IC.c, desc: "ノーマルガチャを累計20回まわした" },
    secret_menu: { id: "secret_menu", name: "メニューの住人", icon: _IC.c, desc: "メニューの見出しを…", secret: true },
    secret_level: { id: "secret_level", name: "がんばれ！", icon: _IC.c, desc: "レベルバーを…", secret: true },
    secret_weather: { id: "secret_weather", name: "お天気の神様", icon: _IC.s, desc: "場所の表示を…", secret: true },
    secret_gold: { id: "secret_gold", name: "金の亡者", icon: _IC.c, desc: "所持金を…", secret: true },
    secret_zukan: { id: "secret_zukan", name: "なでなで名人", icon: _IC.c, desc: "図鑑の名前を…", secret: true },
    secret_sound: { id: "secret_sound", name: "音量の探究者", icon: _IC.c, desc: "スピーカーを…", secret: true },
});

function unlockAch(id) {
    const p = playerData;
    if (!p.achievements) p.achievements = [];
    if (!p.achievements.includes(id)) {
        p.achievements.push(id);
        savePlayerData();
        enqueueAchievementToast(id);
    }
}

const _checkAch = window.checkAchievements;
window.checkAchievements = function () {
    _checkAch();
    const p = playerData;
    [
        ['tutorial_done', p.tutorialDone],
        ['perfect_10', (p.perfectCount || 0) >= 10],
        ['perfect_100', (p.perfectCount || 0) >= 100],
        ['combo_10', (p.bestCombo || 0) >= 10],
        ['big_10', (p.bigCount || 0) >= 10],
        ['zorome', (p.zoromeCount || 0) >= 1],
        ['mission_10', (p.missionClaims || 0) >= 10],
        ['ngacha_20', (p.normalGachaCount || 0) >= 20]
    ].forEach(([id, ok]) => { if (ok) unlockAch(id); });
};


/* ===================================================
   サウンド（iPhone対策込み）
   - iOSは audio.volume が効かないため、GainNode で音量・フェードを制御
   - AudioContext が停止中(suspended/interrupted)のときは SE を溜めずに破棄
   =================================================== */
function audioResume() {
    if (audioCtx && audioCtx.state !== 'running') {
        try { const p = audioCtx.resume(); if (p && p.catch) p.catch(() => {}); } catch (e) {}
    }
}
const audioOK = () => !!audioCtx && audioCtx.state === 'running';

function initAudio() {
    if (!audioCtx) {
        try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    if (!titleBgm) titleBgm = byId('title-bgm');
    audioResume();
}

function playTone(freq, duration, type = 'square') {
    if (!audioOK()) return;
    try {
        const t0 = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, t0);
        gain.gain.exponentialRampToValueAtTime(0.01, t0 + duration);
        osc.connect(gain);
        gain.connect(seOut());
        osc.start(t0);
        osc.stop(t0 + duration + 0.02);
    } catch (e) {}
}

['playWaterPlop', 'playSplashSE'].forEach(n => {
    const orig = window[n];
    window[n] = function () {
        if (!audioOK()) { audioResume(); return; }
        return orig.apply(this, arguments);
    };
});

/* 音量（Ver 3.2.0）：BGMとSEを別々に0〜5の6段階。初期値は4（これまでと同じ大きさ） */
const VOL_STEPS = [0, 0.2, 0.45, 0.7, 1, 1.4];
function loadVolLevel(key) { try { const v = parseInt(localStorage.getItem(key), 10); return (v >= 0 && v <= 5) ? v : 4; } catch (e) { return 4; } }
let bgmLevel = loadVolLevel('osakana_vol_bgm'), seLevel = loadVolLevel('osakana_vol_se');
let seMaster = null;
function seOut() {
    if (!seMaster || seMaster.context !== audioCtx) { seMaster = audioCtx.createGain(); seMaster.connect(audioCtx.destination); }
    seMaster.gain.value = VOL_STEPS[seLevel];
    return seMaster;
}
let BGM_VOL = 0.02 * VOL_STEPS[bgmLevel];
function setVolLevel(kind, lv) {
    lv = Math.max(0, Math.min(5, lv | 0));
    try { localStorage.setItem(kind === 'bgm' ? 'osakana_vol_bgm' : 'osakana_vol_se', String(lv)); } catch (e) {}
    if (kind === 'bgm') {
        bgmLevel = lv; BGM_VOL = 0.02 * VOL_STEPS[lv];
        if (bgmWant && bgmTracks[bgmWant]) { initAudio(); bgmFade(bgmWant, BGM_VOL); }
    } else {
        seLevel = lv; if (seMaster) seMaster.gain.value = VOL_STEPS[lv];
        if (soundEnabled) { initAudio(); playWaterPlop(); }
    }
    if (typeof refreshVolUI === 'function') refreshVolUI();
}
const bgmTracks = {};
const bgmFades = {};
let bgmWant = null;

function bgmGet(path) {
    if (!bgmTracks[path]) {
        const a = (path === 'sounds/title.mp3' && byId('title-bgm')) ? byId('title-bgm') : new Audio(path);
        a.loop = true;
        a.preload = 'auto';
        a.setAttribute('playsinline', '');
        a._vol = 0;
        if (IS_IOS && audioCtx && !a._g) {
            try {
                const src = audioCtx.createMediaElementSource(a);
                const g = audioCtx.createGain();
                g.gain.value = 0;
                src.connect(g);
                g.connect(audioCtx.destination);
                a._g = g;
            } catch (e) {}
        }
        bgmTracks[path] = a;
    }
    return bgmTracks[path];
}

function bgmSetVol(a, v) {
    a._vol = v;
    if (a._g) a._g.gain.value = v; else a.volume = v;
}

function bgmFade(path, target, onDone) {
    const a = bgmTracks[path];
    if (!a) return;
    clearInterval(bgmFades[path]);
    bgmFades[path] = setInterval(() => {
        let v = a._vol || 0;
        v = v < target ? Math.min(target, v + 0.004) : Math.max(target, v - 0.004);
        bgmSetVol(a, v);
        if (v === target) {
            clearInterval(bgmFades[path]);
            delete bgmFades[path];
            if (onDone) onDone();
        }
    }, 40);
}

function bgmStop(path) {
    const a = bgmTracks[path];
    if (!a || (a.paused && !bgmFades[path])) return;
    bgmFade(path, 0, () => { if (bgmWant !== path) { a.pause(); a.currentTime = 0; } });
}

function pauseAllBgm() {
    Object.keys(bgmTracks).forEach(p => { clearInterval(bgmFades[p]); delete bgmFades[p]; bgmTracks[p].pause(); });
    const t = byId('title-bgm');
    if (t) t.pause();
}

function playBgm(path) {
    if (!soundEnabled || !path) return;
    initAudio();
    bgmWant = path;
    Object.keys(bgmTracks).forEach(p => { if (p !== path) bgmStop(p); });
    const a = bgmGet(path);
    clearInterval(bgmFades[path]);
    if (a.paused) {
        bgmSetVol(a, 0);
        const pr = a.play();
        if (pr && pr.catch) pr.catch(() => {});
    }
    bgmFade(path, BGM_VOL);
}

function updateStageBgm() {
    if (!soundEnabled) return;
    let p;
    const gs = (typeof spState !== 'undefined' && spState && spState.practice) ? (spState.prevState || 'MENU') : gameState;   // ミニゲーム練習は、元の画面のBGMのまま
    if (gs === 'TITLE' || gs === 'MENU' || gs === 'GACHA' || isZukanOpen) {
        p = 'sounds/title.mp3';
    } else if (gs === 'BATTLE' || gs === 'SPECIAL') {
        p = 'sounds/boss.mp3';
    } else {
        const m = MAP_DATA[currentLocation];
        p = m && m.sound;
    }
    playBgm(p);
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    playerData.soundEnabled = soundEnabled;
    savePlayerData();
    initAudio();
    if (soundEnabled) { updateStageBgm(); playWaterPlop(); }
    else { bgmWant = null; pauseAllBgm(); }
    updateSoundUI();
}

// アプリが裏に回ったら音を止め、戻ってきたら再開（iPhoneの音の残り対策）
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseAllBgm();
        if (audioCtx && audioCtx.state === 'running') { try { audioCtx.suspend(); } catch (e) {} }
    } else {
        audioResume();
        if (soundEnabled) setTimeout(updateStageBgm, 200);
    }
});
window.addEventListener('pagehide', pauseAllBgm);
['touchstart', 'touchend', 'click', 'keydown'].forEach(ev =>
    window.addEventListener(ev, () => { if (audioCtx) audioResume(); }, { passive: true }));

function goToMenu() {
    initAudio();
    closeAllModals();
    byId('title-screen').style.display = "none";
    byId('menu-screen').style.display = "flex";
    gameState = 'MENU';
    updateMenuUI();
    updateStageBgm();
    playWaterPlop();
}

/* ===================================================
   効果音（ジングルは同時に1つだけ／連打しても音が重ならない）
   =================================================== */
let jingleTimers = [];
const lastSE = {};
function playJingle(notes, step, dur, type) {
    jingleTimers.forEach(clearTimeout);
    jingleTimers = notes.map((f, i) => setTimeout(() => playTone(f, dur, type), i * step));
}
function playSE(type) {
    if (!soundEnabled || !audioCtx) return;
    const now = Date.now();
    if (lastSE[type] && now - lastSE[type] < 90) return;
    lastSE[type] = now;
    if (type === 'signal') {
        playSplashSE();
        playTone(880, 0.15, 'sawtooth');
        setTimeout(() => playTone(1760, 0.25, 'sawtooth'), 60);
    } else if (type === 'success') {
        playJingle([523, 659, 783, 1046], 80, 0.12, 'square');
    } else if (type === 'foul') {
        playTone(130, 0.35, 'sawtooth');
    } else if (type === 'tap') {
        playTone(400, 0.05, 'square');
    } else if (type === 'levelup') {
        playJingle([523, 659, 783, 1046, 1318, 1567], 70, 0.15, 'triangle');
    }
}

/* ===================================================
   演出ヘルパー
   =================================================== */
function shake() {
    const c = byId('game-container');
    c.classList.remove('shake');
    void c.offsetWidth;
    c.classList.add('shake');
}

function floatText(text, color, big, isHtml) {
    const d = document.createElement('div');
    d.className = 'float-text' + (big ? ' big' : '');
    d.style.color = color || '#ffd700';
    if (isHtml) d.innerHTML = text; else d.innerText = text;
    byId('game-container').appendChild(d);
    setTimeout(() => d.remove(), 1600);
}

function setStatus(text, color) {
    const s = byId('status-text');
    s.innerText = text;
    s.style.color = color || '#fff';
}

function hideOmen() { const o = byId('omen-layer'); o.className = ''; o.innerText = ''; }
function showOmen(text, big) { const o = byId('omen-layer'); o.className = 'on' + (big ? ' big' : ''); o.innerText = text; }

/* ===================================================
   天気
   【天気が変わる条件】
   ・釣り（またはつかまえ）の結果画面を閉じるたびに判定
   ・晴れのとき：18%の確率で 雨／霧／夕焼け のどれか（均等）に変化
   ・晴れ以外のとき：30%の確率で晴れに戻る
   ・練習中は変化しない／ページを開き直すと晴れに戻る
   =================================================== */
const WEATHER = {
    clear: { name: '晴れ', emoji: '', icon: '', desc: '', big: 1, gold: 1, exp: 1 },
    rain: { name: '雨', emoji: '🌧', icon: 'images/weather/weather_rain.png', desc: '大物が出やすい', big: 1.6, gold: 1, exp: 1 },
    fog: { name: '霧', emoji: '🌫', icon: 'images/weather/weather_fog.png', desc: '売値+10%', big: 1, gold: 1.1, exp: 1 },
    sunset: { name: '夕焼け', emoji: '🌇', icon: 'images/weather/weather_sunset.png', desc: 'EXP×1.3', big: 1, gold: 1, exp: 1.3 }
};
function weatherIconHtml(w, size) {
    const d = WEATHER[w];
    if (!d || !d.icon) return '';
    const s = size || 18;
    return `<img class="weather-icon" src="${d.icon}" width="${s}" height="${s}" alt="${d.name}" onerror="this.replaceWith(document.createTextNode('${d.emoji}'))">`;
}
const noWeatherArea = (k) => ['underground', 'deepsea', 'shinju'].includes(k) || !!(MAP_DATA[k] && (MAP_DATA[k].gacha || MAP_DATA[k].special));
const weatherMods = () => (noWeatherArea(currentLocation) ? WEATHER.clear : (WEATHER[weather] || WEATHER.clear));

function setWeather(w, announce) {
    weather = w;
    byId('weather-layer').className = 'w-' + w;
    updateHud();
    if (announce && w !== 'clear') floatText(weatherIconHtml(w, 28) + ' ' + WEATHER[w].name + '：' + WEATHER[w].desc, '#aef', true, true);
}

/* ===================================================
   HUD（文字は最小限） / 直近3匹スロット
   =================================================== */

function renderSlots() {
    let h = '';
    for (let i = 0; i < 3; i++) {
        const f = recentCatches[i];
        h += `<div class="slot ${f ? 'filled' : 'empty'}">${f ? `<img src="${f.image}" onerror="this.style.display='none'">` : '?'}</div>`;
    }
    const box = byId('catch-slots');
    box.innerHTML = h;
    const r = recentCatches;
    const reach = r.length >= 2 && r[r.length - 1].id === r[r.length - 2].id;
    box.className = reach ? 'reach' : '';
    box.dataset.label = reach ? '👀 リーチ！' : 'さいきんの3匹';
}

/* ===================================================
   魚の向き（FISH_FACING: L=頭が左 / R=頭が右 / N=向きなし）
   個別に直したい時は addons.js の setFacing() を使います
   =================================================== */
const getFacing = (f) => f.facing || (typeof FISH_FACING !== 'undefined' && FISH_FACING[f.id]) || 'N';




/* ===================================================
   魚の抽選（大物ピティ・天気・ゾロ目・練習）
   =================================================== */

/* ===================================================
   竿：待機〜アタリ（反射神経ゲーム）
   =================================================== */


function showFakeBite(token) {
    fakeBite = false;
    showOmen('ぴくっ…？');
    playWaterPlop();
    timerId = setTimeout(() => {
        if (waitToken !== token || gameState !== 'WAITING') return;
        hideOmen();
        haulTrash();      // 「違った…」の代わりに、ゴミが釣れる（Ver 3.0.1）
    }, 1100);
}

function doSignal() {
    hideOmen();
    gameState = 'SIGNAL';
    startTime = Date.now();
    byId('exclamation').style.display = "block";
    setStatus("今だ！", "#ffd700");
    playSE('signal');
    triggerVibration(200);
    const limit = calcLimit(currentTargetFish);
    lastLimit = limit;
    clearTimeout(timeoutTimerId);
    timeoutTimerId = setTimeout(() => {
        if (gameState !== 'SIGNAL') return;
        hideFishShadow();
        byId('ripple-effect').style.display = "none";
        byId('exclamation').style.display = "none";
        playSE('foul');
        if (currentToolMode === 'rod') playerData.currentCombo = 0; else playerData.netCombo = 0;
        registerMiss();
        failReason = 'timeout';
        showResult(false, currentTargetFish, null);
    }, limit * 1000);
}

/* ===================================================
   網：動く生き物を「輪」に入れてタップ（竿とは別のアクション）
   ・魚影が横切る → 輪の中に入った瞬間にタップ
   ・空振りは2回まで／大物は2回成功が必要（輪が小さく、速くなる）
   =================================================== */
const NET_RING = { bug_net: 34, tough_net: 40, iron_net: 46, steel_net: 54, divine_net: 66 };



let netHintTimer = 0;
function showNetHint(html, ms) {
    const h = byId('net-hint');
    h.innerHTML = html;
    h.style.display = 'block';
    clearTimeout(netHintTimer);
    netHintTimer = setTimeout(() => { h.style.display = 'none'; }, ms);
}
function updatePips() {
    const s = netState;
    if (!s) return;
    byId('net-pips').innerText = '●'.repeat(s.hit) + '○'.repeat(Math.max(0, s.need - s.hit)) + `　あと${Math.max(0, s.need - s.hit)}回`;
}


function stopNet() {
    byId('game-container').classList.remove('net-mode');
    cancelAnimationFrame(netRaf);
    netState = null;
    const ring = byId('net-ring');
    if (ring) ring.style.display = 'none';
    byId('net-hint').style.display = 'none';
    byId('net-pips').style.display = 'none';
    hideFishShadow();
}

function netFail() {
    const s = netState;
    if (!s) return;
    const fish = s.fish;
    if (fxHas('net_tough') && Math.random() < 0.2) {   // 補強ネットの救済
        stopNet();
        currentTargetFish = fish;
        netRatio = reactionTime = 0.9;
        setStatus("装備で救済！", "#00ffcc");
        finishCatch(true);
        return;
    }
    stopNet();
    playSE('foul');
    playerData.netCombo = 0;
    registerMiss();
    failReason = 'netmiss';
    currentTargetFish = fish;
    showResult(false, fish, null);
}

const _handleAction = window.handleAction;
window.handleAction = function () {
    if (gameState === 'NET') { initAudio(); netSwing(); return; }
    return _handleAction.apply(this, arguments);
};

['foulAction', 'resetGameStateToReady', 'hitAction'].forEach(n => {
    const orig = window[n];
    window[n] = function () {
        hideOmen();
        if (n === 'resetGameStateToReady') stopNet();
        return orig.apply(this, arguments);
    };
});

// 練習中は失敗数を記録しない
const _registerMiss = window.registerMiss;
window.registerMiss = function () { if (!tutorialStage) _registerMiss(); };

/* ===================================================
   捕獲成功処理（バランス調整済み）
   =================================================== */
function finishCatchCore(isSuccess) {
    if (!isSuccess) return;
    playSE('success');
    const fish = currentTargetFish;
    const p = playerData;
    const isNet = currentToolMode === 'net';
    const ratio = isNet ? netRatio : reactionTime / calcLimit(fish);
    const rm = fx().rankMul;
    const rank = isNet ? (ratio <= 0.3 * rm ? 'PERFECT' : (ratio <= 0.6 * rm ? 'GREAT' : '')) : (ratio <= 0.5 * rm ? 'PERFECT' : (ratio <= 0.75 * rm ? 'GREAT' : ''));
    const wm = weatherMods();

    if (tutorialStage) {   // 練習：ごほうび・記録なし
        lastBonus = { rank, practice: true };
        showResult(true, fish, reactionTime, 0, 0, false);
        return;
    }

    const wasSpecial = spWon; spWon = false;
    const fxo = fx();
    const gm = fxo.goldMul * (buffOn('gold') ? 1.5 : 1) * (buffOn('super') ? 2 : 1) * (wasSpecial ? 1.25 : 1);
    const prevCombo = (isNet ? p.netCombo : p.currentCombo) || 0;
    let mult = 1 + Math.min(prevCombo, BAL.comboMax) * BAL.comboPerStep;
    if (rank === 'PERFECT') mult *= BAL.perfect; else if (rank === 'GREAT') mult *= BAL.great;
    mult *= wm.gold;
    const bonus = { rank, comboPct: Math.round(Math.min(prevCombo, BAL.comboMax) * BAL.comboPerStep * 100), weather: weather !== 'clear' ? weather : '', frenzy: frenzy > 0, zorome: zoromeCast, chest: 0, special: wasSpecial, gm: gm };
    if (frenzy > 0) { mult *= BAL.frenzy; frenzy--; }
    mult = Math.min(mult, BAL.cap);
    if (zoromeCast) { mult *= BAL.zorome; zoromeCast = false; }

    let earnedGold = Math.round((fish.price || 50) * mult * gm);
    if (Math.random() < BAL.chestRate) { bonus.chest = Math.round((fish.price || 50) + 30); earnedGold += bonus.chest; }
    const earnedExp = Math.round(getExpByFish(fish) * wm.exp * (buffOn('exp') ? 1.5 : 1) * (buffOn('super') ? 2 : 1) * fxo.expMul);

    p.gold += earnedGold;
    p.exp += earnedExp;
    if (wasSpecial) p.specialWins = (p.specialWins || 0) + 1;
    if (isNet) { p.netCatches = (p.netCatches || 0) + 1; p.netCombo = prevCombo + 1; }
    else { p.totalCatches = (p.totalCatches || 0) + 1; p.currentCombo = prevCombo + 1; }
    const combo = prevCombo + 1;
    if (combo > (p.bestCombo || 0)) p.bestCombo = combo;
    if (combo % 10 === 0) { frenzy = 3; bonus.newFrenzy = true; }
    if (rank === 'PERFECT') p.perfectCount = (p.perfectCount || 0) + 1;
    if (fish.isBig) { p.bigCount = (p.bigCount || 0) + 1; p.sinceBig = 0; } else { p.sinceBig = (p.sinceBig || 0) + 1; }

    addMission('catch');
    if (isNet) addMission('net');
    if (fish.isBig) addMission('big');
    if (rank === 'PERFECT') addMission('perfect');
    addMission('combo', combo, true);

    recentCatches.push(fish);
    if (recentCatches.length > 3) recentCatches.shift();
    const r = recentCatches;
    if (r.length === 3 && r[0].id === r[1].id && r[1].id === r[2].id) {
        const sorted = FISH_DATA.filter(f => f.location === currentLocation && (f.toolType || 'rod') === currentToolMode).sort((a, b) => b.price - a.price);
        // ピンゾロ：そのエリアの「大物」の中から、確率で1匹が選ばれる（大物がいなければ、いちばん高い生き物）
        const bigs = sorted.filter(f => f.isBig && !f.isBoss);
        if (bigs.length) {
            let t = Math.random() * bigs.reduce((q, f) => q + Math.max(1, f.weight || 1), 0);
            forceNextFish = bigs.find(f => (t -= Math.max(1, f.weight || 1)) < 0) || bigs[0];
        } else forceNextFish = sorted[0] || null;
        p.zoromeCount = (p.zoromeCount || 0) + 1;
        bonus.zoromeHit = true;
        recentCatches = [];
    } else if (r.length >= 2 && r[r.length - 1].id === r[r.length - 2].id) {
        bonus.reach = true;
    }

    const oldLevel = p.level;
    const newLevel = Math.floor(p.exp / 100) + 1;
    if (newLevel > oldLevel) {
        p.level = newLevel;
        let unlocked = "";
        Object.keys(MAP_DATA).forEach(k => { if (MAP_DATA[k].reqLevel === newLevel && !MAP_DATA[k].gacha && !MAP_DATA[k].special && !MAP_DATA[k].event) unlocked = MAP_DATA[k].name; });
        pendingLevelUp = { level: newLevel, unlockedArea: unlocked };
    } else {
        pendingLevelUp = null;
    }
    savePlayerData();
    updateMenuUI();

    const _loc = fish.location, _wasDone = areaDone(_loc);
    let isFirstGet = false;
    if (!caughtFish[fish.id]) {
        isFirstGet = true;
        caughtFish[fish.id] = { unlocked: true, bestTime: reactionTime, isNew: true };
    } else if (reactionTime < caughtFish[fish.id].bestTime) {
        caughtFish[fish.id].bestTime = reactionTime;
    }
    localStorage.setItem('retro_fishing_zukan_v4', JSON.stringify(caughtFish));

    if (!_wasDone && areaDone(_loc)) { bonus.complete = MAP_DATA[_loc] ? MAP_DATA[_loc].name : ''; setTimeout(() => { if (window.areaCelebrate) areaCelebrate(_loc, bonus.complete); else { floatText('🏅 ' + bonus.complete + ' コンプリート！', '#ffd700', true); playSE('levelup'); } }, 900); }
    lastBonus = bonus;
    if (!isNet) checkAndRegisterRanking(reactionTime, fish);
    checkAchievements();
    renderSlots();
    updateHud();
    showResult(true, fish, reactionTime, earnedGold, earnedExp, isFirstGet);
}

/* ===================================================
   リザルト（コンパクト表示）
   =================================================== */
function showResult(isSuccess, fish, time, earnedGold = 0, earnedExp = 0, isFirstGet = false) {
    gameState = 'RESULT';
    lastCastSuccess = isSuccess;
    updateStageBgm();
    const title = byId('result-title'), img = byId('result-img'), timeText = byId('result-time');
    const rankEl = byId('result-rank'), bonusEl = byId('result-bonus'), nextBtn = byId('next-btn');
    byId('result-hint').style.display = "none";

    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = null;
    img.src = fish.image;
    img.onerror = () => { img.src = fish.fallbackSvg; };
    const isNet = fish.toolType === 'net';

    if (isSuccess) {
        const b = lastBonus || {};
        title.innerText = isThing(fish) ? '見つけた！' : (fish.isBig ? "大物ゲット！" : (isNet ? 'つかまえた！' : '釣れた！'));
        title.style.color = "#ffd700";
        byId('result-name').innerText = fish.name;
        byId('result-price').style.display = "block";
        byId('result-price').innerText = b.practice ? "練習なので ごほうびなし" : `+${Number(earnedGold).toLocaleString()} G　⭐+${earnedExp}`;
        img.classList.remove('silhouette');
        img.classList.add('clickable-fish');
        timeText.innerText = isNet ? `🎯 ぴったり ${Math.max(0, Math.round((1 - time) * 100))}%` : `⚡ ${time.toFixed(2)}秒`;
        rankEl.innerHTML = b.rank === 'PERFECT' ? `${fxi('rank_perfect', 20)} PERFECT!` : (b.rank === 'GREAT' ? `${fxi('rank_great', 20)} GREAT!` : '');
        const chips = [];
        if (b.comboPct) chips.push(`${fxi('combo', 14)}+${b.comboPct}%`);
        if (b.weather) {
            const wd = WEATHER[b.weather];
            if (wd.gold > 1) chips.push(`${weatherIconHtml(b.weather, 14)}+${Math.round((wd.gold - 1) * 100)}%`);
            else if (wd.exp > 1) chips.push(`${weatherIconHtml(b.weather, 14)}EXP×${wd.exp}`);
        }
        if (b.frenzy) chips.push(`${fxi('streak_frenzy', 14)}×${BAL.frenzy}`);
        if (b.zorome) chips.push(`${fxi('zorome', 14)}×${BAL.zorome}`);
        if (b.chest) chips.push(`${fxi('chest', 14)}+${Number(b.chest).toLocaleString()}G`);
        if (b.special) chips.push(`${fxi('special_win', 14)}特別な戦いに勝利！`);
        if (b.gm && b.gm > 1.001 && !b.special) chips.push(`${fxi('tool_bonus', 14)}×${b.gm.toFixed(2)}`);
        if (b.complete) chips.push(`${fxi('area_complete', 14)}${b.complete} コンプリート！`);
        if (b.newFrenzy) chips.push(`${fxi('streak_frenzy', 14)}入れ食い突入！`);
        if (b.zoromeHit) chips.push(`${fxi('zorome', 14)}ゾロ目！次は超大物`);
        else if (b.reach) chips.push(`${fxi('reach', 14)}リーチ！`);
        bonusEl.innerHTML = chips.map(c => `<span class="chip">${c}</span>`).join('');
        byId('result-new-badge').style.display = isFirstGet ? "inline-block" : "none";
        if (fish.isBig) shake();
    } else {
        title.innerText = isThing(fish) ? "手に入らなかった…" : "逃げられた…";
        title.style.color = "#ff5555";
        byId('result-name').innerText = "？？？";
        byId('result-price').style.display = "none";
        img.classList.add('silhouette');
        img.classList.remove('clickable-fish');
        rankEl.innerHTML = "";
        bonusEl.innerHTML = "";
        byId('result-new-badge').style.display = "none";
        zoromeCast = false;
        const lim = lastLimit ? lastLimit.toFixed(2) : '';
        const t = { timeout: `反応なし… 制限${lim}秒`, gauge: '連打が足りない…', boss: '力負け…', netmiss: '空振り… 輪に入った瞬間に！', special: '特別な戦いに敗れた…' }[failReason];
        timeText.innerText = t || `遅すぎ… ${Number(time || 0).toFixed(2)}秒 / 制限${lim}秒`;
        failReason = 'late';
    }
    byId('result-modal').style.display = "block";
    if (window.CreatureMotion) { CreatureMotion.stop(img); if (isSuccess && !isThing(fish)) CreatureMotion.start(img, fish); }      // 入手した生き物が動く（anim32.js）
    const homeBtn = byId('result-home-btn');
    nextBtn.disabled = true;
    if (homeBtn) homeBtn.disabled = true;      // 🏠も、次へと同じ時間だけ押せない（連打での誤操作防止）
    let count = 1.5;
    nextBtn.innerText = `…`;
    const iv = setInterval(() => {
        count -= 0.5;
        if (count <= 0) { clearInterval(iv); nextBtn.disabled = false; nextBtn.innerText = "次へ"; if (homeBtn) homeBtn.disabled = false; }
    }, 500);
}

/* ===================================================
   練習（チュートリアル）：竿→大物→網
   =================================================== */
const TUT_TEXT = {
    1: "①タップで竿を振る → 「一閃！」で即タップ",
    2: "②大物！うねりのあと「一閃！」→連打！",
    3: "③網：魚が輪に入った瞬間にタップ！"
};

function showTutorial(text, ms) {
    const b = byId('tutorial-banner');
    b.innerText = text;
    b.style.display = "block";
    clearTimeout(showTutorial.t);
    if (ms) showTutorial.t = setTimeout(() => { b.style.display = "none"; }, ms);
}

function endTutorial(done) {
    tutorialStage = 0;
    byId('tutorial-banner').style.display = "none";
    if (done) {
        let msg = "練習クリア！";
        if (!playerData.tutorialDone) { playerData.gold += 200; msg += " +200G"; }
        playerData.tutorialDone = true;
        savePlayerData();
        checkAchievements();
        updateMenuUI();
        showTutorial(msg + "　🏠でメニューへ戻れるよ", 5000);
    }
    setToolMode('rod');
}

const _closeResult = window.closeResult;
window.closeResult = function () {
    _closeResult();
    if (tutorialStage) {
        if (tutorialStage === 1) { if (lastCastSuccess) { tutorialStage = 2; } }
        else if (tutorialStage === 2) { tutorialStage = 3; setToolMode('net'); }
        else if (tutorialStage === 3) { if (lastCastSuccess) { endTutorial(true); updateHud(); return; } }
        showTutorial(TUT_TEXT[tutorialStage]);
    } else {
        if (noWeatherArea(currentLocation)) { if (weather !== 'clear') setWeather('clear'); }
        else if (weather === 'clear' && Math.random() < 0.18) setWeather(pickOne(['rain', 'fog', 'sunset']), true);
        else if (weather !== 'clear' && Math.random() < 0.30) setWeather('clear');
    }
    updateHud();
};

const _startGame = window.startGameFromMenu;
window.startGameFromMenu = function () {
    if (extModalOpen()) return;
    const noCatch = (playerData.totalCatches || 0) + (playerData.netCatches || 0) === 0;
    if (!playerData.tutorialDone && (forceTutorial || noCatch)) {
        forceTutorial = false;
        tutorialStage = 1;
        if (currentLocation !== 'sea') selectLocation('sea');
        _startGame();
        setToolMode('rod');
        showTutorial(TUT_TEXT[1]);
    } else {
        tutorialStage = 0;
        byId('tutorial-banner').style.display = "none";
        _startGame();
    }
    updateHud();
};

function replayTutorial() {
    playerData.tutorialDone = playerData.tutorialDone || false;
    forceTutorial = true;
    const wasDone = playerData.tutorialDone;
    closeAllModals();
    byId('menu-screen').style.display = "flex";
    gameState = 'MENU';
    if (wasDone) { tutorialStage = 1; if (currentLocation !== 'sea') selectLocation('sea'); _startGame(); setToolMode('rod'); showTutorial(TUT_TEXT[1]); }
    else startGameFromMenu();
}

/* ===================================================
   メニューへ戻りやすく
   =================================================== */
const _toMenuHeader = window.goToMenuFromHeader;
window.goToMenuFromHeader = function () {
    tutorialStage = 0;
    stopNet();
    byId('tutorial-banner').style.display = "none";
    byId('btn-home').classList.remove('pulse');
    playerData.knowsHome = true;
    _toMenuHeader();
    updateMenuUI();
};

function menuFromResult() {
    const hb = byId('result-home-btn');
    if (hb && hb.disabled) return;
    pendingLevelUp = null;
    goToMenuFromHeader();
}

const EXT_MODALS = ['mission-modal', 'zukan-area-modal', 'workshop-screen', 'ng-prize-modal', 'clear-modal'];
const extModalOpen = () => EXT_MODALS.some(id => byId(id) && byId(id).style.display === 'flex');
const _closeAll = window.closeAllModals;
window.closeAllModals = function () {
    _closeAll();
    EXT_MODALS.forEach(id => { if (byId(id)) byId(id).style.display = 'none'; });
};

/* ===================================================
   デイリーミッション
   =================================================== */
const MISSION_POOL = [
    { id: 'catch10', name: '生き物を10匹つかまえる', key: 'catch', goal: 10, reward: 150 },
    { id: 'catch25', name: '生き物を25匹つかまえる', key: 'catch', goal: 25, reward: 400 },
    { id: 'big1', name: '大物を1匹つかまえる', key: 'big', goal: 1, reward: 250 },
    { id: 'perfect3', name: 'PERFECTを3回出す', key: 'perfect', goal: 3, reward: 300 },
    { id: 'combo5', name: '5連続で成功する', key: 'combo', goal: 5, reward: 200 },
    { id: 'net5', name: '網で5匹つかまえる', key: 'net', goal: 5, reward: 200 },
    { id: 'gacha1', name: 'ノーマルガチャを回す', key: 'gacha', goal: 1, reward: 100 }
];
const todayStr = () => new Date().toLocaleDateString('sv-SE');
const missionReward = (m) => Math.round(m.reward * (1 + Math.min(playerData.level, 100) / BAL.missionScale));

function ensureDaily() {
    const d = playerData.daily;
    if (d && d.date === todayStr()) return d;
    const ids = MISSION_POOL.map(m => m.id).sort(() => Math.random() - 0.5).slice(0, 3);
    playerData.daily = { date: todayStr(), list: ids, prog: {}, claimed: [] };
    savePlayerData();
    return playerData.daily;
}

function addMission(key, n = 1, isMax = false) {
    const d = ensureDaily();
    d.prog[key] = isMax ? Math.max(d.prog[key] || 0, n) : (d.prog[key] || 0) + n;
}

function claimableMissions() {
    const d = ensureDaily();
    return d.list.filter(id => {
        const m = MISSION_POOL.find(x => x.id === id);
        return m && !d.claimed.includes(id) && (d.prog[m.key] || 0) >= m.goal;
    }).length;
}

function openMissions() { initAudio(); closeAllModals(); renderMissions(); byId('mission-modal').style.display = "flex"; playWaterPlop(); }
function closeMissions() { byId('mission-modal').style.display = "none"; }

function renderMissions() {
    const d = ensureDaily();
    const box = byId('mission-list');
    box.innerHTML = "";
    d.list.forEach(id => {
        const m = MISSION_POOL.find(x => x.id === id);
        const cur = Math.min(d.prog[m.key] || 0, m.goal);
        const done = cur >= m.goal, claimed = d.claimed.includes(id);
        const row = document.createElement('div');
        row.className = 'mission-row';
        row.innerHTML = `<div class="mission-info"><div>${m.name}</div><div class="mission-sub">${cur}/${m.goal}　${Number(missionReward(m)).toLocaleString()} G</div></div>
            <button class="btn" ${(!done || claimed) ? 'disabled' : ''} onclick="claimMission('${id}')">${claimed ? '済' : (done ? '受取' : '挑戦中')}</button>`;
        box.appendChild(row);
    });
    const rb = byId('mission-reroll');
    if (rb) { rb.disabled = playerData.gold < REROLL_COST; rb.innerText = `🔄 ミッションを引き直す（${REROLL_COST.toLocaleString()}G）`; }
}

function claimMission(id) {
    const d = ensureDaily();
    const m = MISSION_POOL.find(x => x.id === id);
    if (!m || d.claimed.includes(id) || (d.prog[m.key] || 0) < m.goal) return;
    d.claimed.push(id);
    playerData.gold += missionReward(m);
    playerData.missionClaims = (playerData.missionClaims || 0) + 1;
    savePlayerData();
    playSE('success');
    renderMissions();
    updateMenuUI();
    checkAchievements();
}

/* ===================================================
   ガチャ画面の切り替え（レアガチャ ⇄ ノーマルガチャ）
   ・ノーマルガチャはEXPを獲得しません
   =================================================== */


const _openGachaScreen = window.openGachaScreen;
window.openGachaScreen = function () {
    _openGachaScreen();
    setGachaTab(playerData.gachaTab || 'ev');
};
function openNormalGacha() { openGachaScreen(); setGachaTab('ng'); }



/* ===================================================
   メニュー表示（バッジ）
   =================================================== */
const _updateMenuUI = window.updateMenuUI;
window.updateMenuUI = function () {
    _updateMenuUI();
    applyHallOfFame();
    const m = byId('btn-missions'), g = byId('btn-gacha');
    if (m) { const c = claimableMissions(); m.innerText = c ? `ミッション ❗${c}` : 'ミッション'; }
    if (g) g.innerText = playerData.freeGachaDate !== todayStr() ? 'ガチャ 🆓' : 'ガチャ';
};

/* ===================================================
   初めての人向け：「遊び方」へ誘導（周りを暗くして矢印）
   =================================================== */
let guideOn = false;
function ensureGuide() {
    if (byId('guide-layer')) return;
    const g = document.createElement('div');
    g.id = 'guide-layer';
    g.innerHTML = '<div id="guide-hole"></div><div id="guide-bubble">まずは「遊び方」を見てみよう！<div id="guide-arrow">👇</div></div>';
    byId('game-container').appendChild(g);
}

function guideTick() {
    ensureGuide();
    const menu = byId('menu-screen');
    const ctx = kbCtx();
    const on = !playerData.hasSeenHowTo && menu.style.display === 'flex' && ctx && ctx.id === 'menu-screen';
    const layer = byId('guide-layer');
    if (on !== guideOn) { guideOn = on; layer.style.display = on ? 'block' : 'none'; }
    if (!on) return;
    const cr = byId('game-container').getBoundingClientRect();
    const r = byId('btn-howto').getBoundingClientRect();
    const hole = byId('guide-hole'), bub = byId('guide-bubble');
    hole.style.left = `${r.left - cr.left - 5}px`;
    hole.style.top = `${r.top - cr.top - 5}px`;
    hole.style.width = `${r.width + 10}px`;
    hole.style.height = `${r.height + 10}px`;
    bub.style.left = `${Math.max(8, Math.min(cr.width - 228, r.left - cr.left + r.width / 2 - 110))}px`;
    bub.style.top = `${Math.max(8, r.top - cr.top - 74)}px`;
}
setInterval(guideTick, 300);
document.addEventListener('click', (e) => {
    if (!guideOn || e.target.closest('#btn-howto')) return;
    e.stopPropagation();
    e.preventDefault();
    const h = byId('guide-hole');
    h.classList.remove('wiggle'); void h.offsetWidth; h.classList.add('wiggle');
}, true);

/* ===================================================
   隠し要素（どこをタップ／連打すると…？）
   ・各1回だけ小さなごほうび＋隠し実績
   =================================================== */

function bindSecret(elId, need, windowMs, fn) {
    const el = byId(elId);
    if (!el) return;
    let times = [];
    el.addEventListener('click', () => {
        const now = Date.now();
        times = times.filter(t => now - t < windowMs);
        times.push(now);
        if (times.length >= need) { times = []; fn(el); }
    });
}

function bindSecrets() {
    bindSecret('menu-title', 7, 4000, () => giveSecret('secret_menu', 100, '📜 ひみつの住人'));
    bindSecret('header-level-bar-inner', 5, 3000, () => giveSecret('secret_level', 50, '💪 がんばれ！'));
    bindSecret('header-level', 5, 3000, () => giveSecret('secret_level', 50, '💪 がんばれ！'));
    bindSecret('current-location-text', 5, 3000, () => {
        const first = giveSecret('secret_weather', 0, '🌤 天気を操った！', { silentRepeat: true });
        const w = pickOne(Object.keys(WEATHER).filter(k => k !== weather));
        setTimeout(() => setWeather(w, true), first ? 1100 : 0);   // メッセージが重ならないようにずらす
    });
    // 特殊エリアのイースターエッグ：画面下の「さいきんの3匹」の枠を3秒以内に5回タップ（釣りの操作をじゃませないよう、クリック位置で判定）
    (() => {
        let ts = [];
        document.addEventListener('click', (e) => {
            const box = byId('catch-slots');
            if (!box || !window.spEgg || !isSpecialArea(currentLocation)) return;
            const r = box.getBoundingClientRect();
            if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;
            if (typeof gameState !== 'undefined' && gameState !== 'READY') return;        // 釣りの最中は数えない
            e.stopPropagation(); e.preventDefault();      // この枠のタップは、ゲーム本体（キャスト）に伝えない
            const now = Date.now(); ts = ts.filter(t => now - t < 3000); ts.push(now);
            if (ts.length >= 5) { ts = []; spEgg(currentLocation); }
        }, true);
    })();
    bindSecret('header-gold', 10, 4000, () => giveSecret('secret_gold', 0, '💰 お金が大好き！'));
    bindSecret('zukan-detail-title', 7, 4000, (el) => {
        const img = byId('zukan-detail-img');
        img.classList.remove('spin'); void img.offsetWidth; img.classList.add('spin');
        if (window.CreatureMotion && window._zukanFish) CreatureMotion.start(img, window._zukanFish, { duration: 3200, amp: 1.2 });      // なでなで：生き物が動く
        giveSecret('secret_zukan', 100, '🐟 なでなで〜');
    });
    bindSecret('sound-btn', 10, 5000, () => giveSecret('secret_sound', 0, '🔊 音の探究者！'));
    bindSecret('config-sound-btn', 10, 5000, () => giveSecret('secret_sound', 0, '🔊 音の探究者！'));
}


/* ===================================================
   図鑑：エリア選択ウィンドウ／最後に開いたページを記憶／豆知識
   =================================================== */
function zukanAreaKeys() {
    return Object.keys(MAP_DATA).filter(k => zukanCatOfArea(k) === currentZukanMainTab);
}

function areaUnlocked(k) {
    const m = MAP_DATA[k];
    if (!m) return false;
    if (m.event) return eventUnlocked(k);
    if (m.special) return specialUnlocked(k);
    return m.gacha ? !!(playerData.unlockedGachaMaps && playerData.unlockedGachaMaps.includes(k)) : playerData.level >= m.reqLevel;
}

const areaLabel = (k) => k === 'all' ? 'すべて' : (areaUnlocked(k) ? MAP_DATA[k].name : '？？？');

function saveZukanState() {
    const g = byId('zukan-grid');
    playerData.zukanState = { tab: currentZukanMainTab, filter: currentFilter, scroll: g ? g.scrollTop : 0 };
    savePlayerData();
}

const zukanHasCaught = (cat) => FISH_DATA.some(f => zukanCatOf(f) === cat && caughtFish[f.id] && caughtFish[f.id].unlocked) || Object.keys(caughtFish).some(k => (cat === 'event' ? (+k >= 500 && +k <= 699) : (+k >= 700 && +k <= 999)) && caughtFish[k]);
// 特殊エリア・季節イベントのタブは、合言葉でそのエリアを解放するまで（または、その生き物が図鑑に載るまで）出さない
const zukanTabVisible = (cat) => cat === 'special' ? (specialTabVisible() || zukanHasCaught('special')) : (cat === 'event' ? (eventTabVisible() || zukanHasCaught('event')) : true);
function updateZukanTabs() {
    ['special', 'event'].forEach(c => { const b = byId('zukan-tab-' + c); if (b) b.style.display = zukanTabVisible(c) ? '' : 'none'; });
}
function switchZukanCategory(cat, keepFilter) {
    if (!zukanTabVisible(cat)) cat = 'normal';
    updateZukanTabs();
    currentZukanMainTab = cat;
    if (!keepFilter) currentFilter = 'all';
    byId('zukan-tab-normal').className = `zukan-main-tab ${cat === 'normal' ? 'active' : ''}`;
    byId('zukan-tab-gacha').className = `zukan-main-tab ${cat === 'gacha' ? 'active' : ''}`;
    byId('zukan-tab-special').className = `zukan-main-tab ${cat === 'special' ? 'active' : ''}`;
    byId('zukan-tab-event').className = `zukan-main-tab ${cat === 'event' ? 'active' : ''}`;
    renderZukanSubFilterUI();
    renderZukanGrid();
    if (!keepFilter) saveZukanState();
}

function renderZukanSubFilterUI() {
    const box = byId('zukan-sub-filter');
    box.innerHTML = "";
    const b = document.createElement('button');
    b.className = 'zukan-area-btn';
    b.innerHTML = `📍 エリア：<b>${currentFilter === 'all' ? 'すべて' : areaLabel(currentFilter)}${currentFilter !== 'all' && areaDone(currentFilter) ? ' ✅' : ''}</b>${(() => { const n = FISH_DATA.filter(f => zukanCatOf(f) === currentZukanMainTab && (currentFilter === 'all' || f.location === currentFilter) && !(caughtFish[f.id] && caughtFish[f.id].unlocked)).length; return n ? `　<small>あと${n}匹</small>` : ''; })()} ▼`;
    b.onclick = openZukanAreaModal;
    const _done = currentFilter !== 'all' && areaDone(currentFilter);
    if (_done) b.classList.add('done');
    box.style.display = 'flex'; box.style.gap = '6px';
    b.style.flex = '1';
    box.appendChild(b);
    if (_done && window.areaCelebrate) { const rp = document.createElement('button'); rp.className = 'zukan-replay-btn'; rp.innerHTML = '🎆'; rp.title = '制覇の演出をもう一度'; rp.onclick = () => areaCelebrate(currentFilter, areaLabel(currentFilter)); box.appendChild(rp); }
    const n = Object.keys(caughtFish).filter(k => caughtFish[k] && caughtFish[k].isNew).length;
    const c = document.createElement('button');
    c.className = 'zukan-newclear-btn';
    c.innerHTML = n ? `✔ NEWを消す<small>(${n})</small>` : '✔ NEWなし';
    c.disabled = !n;
    c.onclick = clearZukanNew;
    box.appendChild(c);
    const so = document.createElement('button');
    so.className = 'zukan-sort-btn';
    so.innerHTML = `↕ 並べ替え：<b>${ZUKAN_SORTS[zukanSortKey()].label}</b>`;
    so.onclick = cycleZukanSort;
    box.style.flexWrap = 'wrap';
    box.appendChild(so);
}

/* ---------- 図鑑の並べ替え（Ver 3.1.0） ---------- */
const ZUKAN_SORTS = {
    rare: { label: '希少度・サイズ順' },
    rareRev: { label: '希少度・サイズ逆順' },
    kana: { label: '五十音順' },
    kanaRev: { label: '五十音逆順' }
};
const zukanSortKey = () => (ZUKAN_SORTS[playerData.zukanSort] ? playerData.zukanSort : 'rare');
function cycleZukanSort() {
    const ks = Object.keys(ZUKAN_SORTS), i = ks.indexOf(zukanSortKey());
    playerData.zukanSort = ks[(i + 1) % ks.length];
    savePlayerData();
    renderZukanSubFilterUI();
    renderZukanGrid();
    byId('zukan-grid').scrollTop = 0;
    playSE && playSE('tap');
}
// 漢字をふくむ名前の読み（五十音順用）。新しい生き物に漢字を使うときは addYomi で足してください。
const FISH_YOMI = {
    '赤ベタ': 'あかべた', '青ベタ': 'あおべた', '青ハナゴイ': 'あおはなごい', '桃ハナゴイ': 'ももはなごい', 'ハチの幼虫': 'はちのようちゅう', '羊の頭蓋骨': 'ひつじのずがいこつ',
    '竜宮の金フラスコ': 'りゅうぐうのきんふらすこ', '海底の財宝箱': 'かいていのざいほうばこ', '伝説の黄金剣': 'でんせつのおうごんけん', '龍神の黄金冠': 'りゅうじんのおうごんかん',
    'ポセイドンの三叉槍': 'ぽせいどんのさんさそう', '貝殻': 'かいがら', '琥珀': 'こはく', '龍の翡翠玉': 'りゅうのひすいだま', '海賊の金貨袋': 'かいぞくのきんかぶくろ',
    '青真珠のネックレス': 'あおしんじゅのねっくれす', '古代の金の壺': 'こだいのきんのつぼ', '三葉虫': 'さんようちゅう', 'カブトガニの化石': 'かぶとがにのかせき', 'アンモナイトの化石': 'あんもないとのかせき',
    'ネッシーの化石': 'ねっしーのかせき', '金塊タートル': 'きんかいたーとる', '花咲ガニ': 'はなさきがに', '初夢マダイ': 'はつゆめまだい', 'しし舞ガニ': 'ししまいがに', '出世ブリ': 'しゅっせぶり',
    '宝船マンボウ': 'たからぶねまんぼう', 'まつり金魚': 'まつりきんぎょ'
};
function addYomi(map) { Object.assign(FISH_YOMI, map); }
const yomiOf = (f) => (window.__LANG === 'en' && window.I18N_EN ? String(window.I18N_EN[f.name] || f.name).toLowerCase() : null) || (FISH_YOMI[f.name] || f.name).replace(/[\u30a1-\u30f6]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)).replace(/[ー・\s]/g, '');
function zukanSortList(list, isEvTab) {
    const key = zukanSortKey(), rev = key === 'rareRev' || key === 'kanaRev';
    if (key === 'kana' || key === 'kanaRev') {
        list.sort((a, b) => yomiOf(a).localeCompare(yomiOf(b), window.__LANG === 'en' ? 'en' : 'ja') || a.id - b.id);
    } else list.sort(isEvTab ? eventZukanCompare : (currentZukanMainTab === 'special' ? specialZukanCompare : zukanCompare));
    if (rev) list.reverse();
    return key === 'rare' || key === 'rareRev';      // 月見出しを出すか
}

function openZukanAreaModal() {
    const list = byId('zukan-area-list');
    list.innerHTML = "";
    const keys = ['all'].concat(zukanAreaKeys());
    keys.forEach(k => {
        const fl = FISH_DATA.filter(f => k === 'all' ? zukanAreaKeys().includes(f.location) : f.location === k);
        const got = fl.filter(f => caughtFish[f.id] && caughtFish[f.id].unlocked).length;
        const row = document.createElement('button');
        row.className = `zukan-area-row ${currentFilter === k ? 'active' : ''}`;
        row.innerHTML = `<span>${areaLabel(k)}${k !== 'all' && fl.length && got >= fl.length ? ' 🏅' : ''}</span><small>${got}/${fl.length}</small>`;
        if (k !== 'all' && fl.length && got >= fl.length) row.classList.add('done');
        row.onclick = () => {
            currentFilter = k;
            closeZukanAreaModal();
            renderZukanSubFilterUI();
            renderZukanGrid();
            byId('zukan-grid').scrollTop = 0;
            saveZukanState();
        };
        list.appendChild(row);
    });
    byId('zukan-area-modal').style.display = "flex";
}
function closeZukanAreaModal() { byId('zukan-area-modal').style.display = "none"; }

function openZukan() {
    initAudio();
    isZukanOpen = true;
    resetGameStateToReady();
    closeAllModals();
    updateStageBgm();
    const st = playerData.zukanState || {};
    switchZukanCategory(['gacha', 'special', 'event'].includes(st.tab) && zukanTabVisible(st.tab) ? st.tab : 'normal', false);
    if (st.filter && st.filter !== 'all' && zukanAreaKeys().includes(st.filter)) {
        currentFilter = st.filter;
        renderZukanSubFilterUI();
        renderZukanGrid();
    }
    byId('zukan-modal').style.display = "flex";
    byId('zukan-grid').scrollTop = st.scroll || 0;
}

const _closeZukan = window.closeZukan;
window.closeZukan = function () { saveZukanState(); closeZukanAreaModal(); _closeZukan(); };

function openZukanDetail(fish) {
    const locName = MAP_DATA[fish.location] ? MAP_DATA[fish.location].name : "不明";
    const isNet = fish.toolType === 'net';
    byId('zukan-detail-title').innerText = `【${fish.name}】`;
    const img = byId('zukan-detail-img');
    window._zukanFish = fish;
    if (window.CreatureMotion) CreatureMotion.stop(img);
    img.classList.remove('spin');
    img.src = fish.image;
    img.onerror = () => { img.src = fish.fallbackSvg; };
    const tri = (typeof FISH_TRIVIA !== 'undefined' && FISH_TRIVIA[fish.id]) ? `\n\n💡 豆知識\n${FISH_TRIVIA[fish.id]}` : '';
    byId('zukan-detail-desc').innerText = `[${locName}／${isNet ? '網' : '竿'}]\n${fish.desc.replace('【網限定】', '')}${tri}`;
    byId('zukan-detail-price').innerText = `買取価格: ${Number(fish.price).toLocaleString()} G`;
    const best = caughtFish[fish.id].bestTime;
    byId('zukan-detail-time').innerText = isNet
        ? (best <= 1 ? `ベスト：ぴったり ${Math.round((1 - best) * 100)}%` : '')
        : `最速記録: ${best.toFixed(3)}秒`;
    if (caughtFish[fish.id].isNew) {
        caughtFish[fish.id].isNew = false;
        localStorage.setItem('retro_fishing_zukan_v4', JSON.stringify(caughtFish));
        renderZukanGrid();
    }
    byId('zukan-detail-modal').style.display = "flex";
}

/* ===================================================
   追加しやすくするためのAPI（使い方は addons.js / 追加素材リスト.md）
   =================================================== */
const SIZE_DEFAULT = {
    small: { shadowImage: 'images/shadows/shadow_small.png', shadowWidth: 60, shadowHeight: 25, reqTime: 1.0, weight: 30 },
    midi: { shadowImage: 'images/shadows/shadow_midi.png', shadowWidth: 90, shadowHeight: 35, reqTime: 0.8, weight: 20 },
    big: { shadowImage: 'images/shadows/shadow_big.png', shadowWidth: 130, shadowHeight: 45, reqTime: 0.6, weight: 8, isBig: true, tapPower: 8, decaySpeed: 1.3 },
    biggest: { shadowImage: 'images/shadows/shadow_biggest.png', shadowWidth: 180, shadowHeight: 60, reqTime: 0.45, weight: 3, isBig: true, tapPower: 6, decaySpeed: 1.5 }
};
function addArea(key, def, after) {
    const entry = Object.assign({ reqLevel: 1 }, def);
    if (!after || !MAP_DATA[after]) { MAP_DATA[key] = entry; return; }
    // after で指定したエリアの次に並べる（マップ一覧・図鑑の並び順）
    const keys = Object.keys(MAP_DATA), snap = {};
    keys.forEach(k => { snap[k] = MAP_DATA[k]; delete MAP_DATA[k]; });
    keys.forEach(k => { MAP_DATA[k] = snap[k]; if (k === after) MAP_DATA[key] = entry; });
}
// 既存の生き物を別のエリアへ引っ越し（{ 新しい場所: [名前, ...] }）。海からの移動用
function relocateFish(map) {
    Object.keys(map).forEach(loc => map[loc].forEach(name => {
        const f = FISH_DATA.find(x => x.name === name && x.location === 'sea');
        if (f) f.location = loc; else console.warn('relocateFish: 見つかりません', name);
    }));
}
// 画像ファイルが存在する時だけ追加（画像を置いたら自動で登場）
function addFishWhenImage(list) {
    list.forEach(f => {
        const im = new Image();
        im.onload = () => {
            if (FISH_DATA.some(x => x.id === f.id)) return;
            addFish([f]);
            if (isZukanOpen) renderZukanGrid();
        };
        im.src = f.image;
    });
}
function addFish(list) {
    list.forEach(f => {
        const d = SIZE_DEFAULT[f.size || 'small'];
        const item = Object.assign({ toolType: 'rod' }, d, f);
        if (item.toolType === 'net' && !item.netSize) item.netSize = item.size || 'small';
        if (item.toolType === 'net' && !f.shadowWidth) { item.shadowWidth = Math.round(d.shadowWidth * 0.8); item.shadowHeight = Math.round(d.shadowHeight * 1.2); }
        FISH_DATA.push(item);
    });
}
function addRod(id, def) { ROD_DATA[id] = Object.assign({ id, price: 0 }, def); }
function addNet(id, def) { NET_DATA[id] = Object.assign({ id, price: 0, targetSize: ['small', 'midi'] }, def); if (def.ring) NET_RING[id] = def.ring; }
function addAcc(id, def) { ACC_DATA[id] = Object.assign({ id, price: 0 }, def); }
function addTrivia(map) { Object.assign(FISH_TRIVIA, map); }
function setFacing(map) { Object.assign(FISH_FACING, map); }
function addAchievement(id, def) { ACHIEVEMENT_DATA[id] = Object.assign({ id, icon: _IC.c }, def); }

/* ===================================================
   起動時の初期化
   =================================================== */
function bindZukanScroll() {
    let t = 0;
    byId('zukan-grid').addEventListener('scroll', () => { clearTimeout(t); t = setTimeout(saveZukanState, 400); });
}

window.addEventListener('DOMContentLoaded', () => {
    ensureDaily();
    renderSlots();
    setWeather('clear');
    updateHud();
    updateMenuUI();
    bindSecrets();
    bindZukanScroll();
    if (!playerData.knowsHome) byId('btn-home').classList.add('pulse');
    byId('version-label').innerText = 'Ver ' + APP_VERSION;
});


/* ===================================================
   Ver 3.0.0 追加・改良パート
   ・画像先読み／魚影を実物サイズに／3段階の難易度
   ・特別な捕まえ方（ミニゲーム）／道具の効果の見直し
   ・ノーマルガチャ刷新／工房（強化・ブースト）／殿堂入り
   =================================================== */

/* ---------- 画像の先読み（魚影が遅れて出る問題の対策） ---------- */
const imgCache = {};
function preloadImg(src) {
    if (!src) return Promise.resolve(null);
    if (imgCache[src]) return imgCache[src].p;
    const im = new Image();
    im.decoding = 'async';
    const p = new Promise(res => {
        im.onload = () => { (im.decode ? im.decode().catch(() => {}) : Promise.resolve()).then(() => res(im)); };
        im.onerror = () => res(null);
    });
    imgCache[src] = { im, p };
    im.src = src;
    return p;
}
function preloadArea(loc) {
    FISH_DATA.filter(f => f.location === loc).forEach(f => preloadImg(f.image));
    const m = MAP_DATA[loc];
    if (m) preloadImg(m.bg);
}
function startBackgroundPreload() {
    if (navigator.connection && navigator.connection.saveData) return;
    const areas = [currentLocation].concat(Object.keys(MAP_DATA).filter(k => k !== currentLocation));
    const q = [];
    areas.forEach(a => FISH_DATA.filter(f => f.location === a).forEach(f => q.push(f.image)));
    let i = 0, active = 0;
    const pump = () => {
        while (active < 3 && i < q.length) {
            const s = q[i++];
            if (imgCache[s]) continue;
            active++;
            preloadImg(s).then(() => { active--; setTimeout(pump, 40); });
        }
    };
    pump();
}
const _selectLocation = window.selectLocation;
window.selectLocation = function (k) {
    _selectLocation.apply(this, arguments);
    preloadArea(currentLocation);
    if (noWeatherArea(currentLocation) && weather !== 'clear') setWeather('clear');
};

/* ---------- 魚影のサイズ（実物サイズに比例・巨大なものは上限） ---------- */
const sizeClassOf = (f) => { const s = f.shadowImage || ''; return s.includes('biggest') ? 'biggest' : s.includes('big') ? 'big' : s.includes('midi') ? 'midi' : 'small'; };
const getCm = (f) => f.cm || (typeof FISH_CM !== 'undefined' && FISH_CM[f.id]) || ({ small: 20, midi: 50, big: 200, biggest: 600 }[f.size || sizeClassOf(f)] || 30);
function shadowDim(fish) {
    const w = Math.max(34, Math.min(220, Math.round(36 * Math.pow(Math.max(getCm(fish), 0.1) / 3, 0.28))));
    const im = imgCache[fish.image] && imgCache[fish.image].im;
    const ratio = (im && im.naturalWidth) ? im.naturalHeight / im.naturalWidth : ((fish.shadowHeight / fish.shadowWidth) || 0.5);
    return { w, h: Math.max(24, Math.min(240, Math.round(w * ratio))) };
}
function setCm(map) { Object.assign(FISH_CM, map); }

let shadowToken = 0;
function prepareShadow(fish, topY) {
    const s = byId('fish-shadow');
    if (window.CreatureMotion) CreatureMotion.stop(s);
    s.style.display = "none";
    s.style.backgroundColor = "transparent";
    s.style.borderRadius = "0";
    s.style.backgroundSize = "100% 100%";
    s.style.backgroundRepeat = "no-repeat";
    s.classList.add('navy-shadow');
    s.style.top = `${topY}px`;
    s.style.transform = 'none';
    const face = getFacing(fish);
    const dir = face === 'L' ? -1 : (face === 'R' ? 1 : (Math.random() < 0.5 ? -1 : 1));
    const ready = preloadImg(fish.image).then(() => {
        const d = shadowDim(fish);
        s.style.width = `${d.w}px`;
        s.style.height = `${d.h}px`;
        s.style.backgroundImage = `url('${fish.image}')`;
        s.style.display = "block";
        if (window.CreatureMotion) CreatureMotion.shadow(s, fish);      // 魚影が泳ぐ動き（anim32.js）
        return d;
    });
    return { dir, ready };
}

function setupFishShadow(fish) {
    const s = byId('fish-shadow');
    const token = ++shadowToken;
    const topY = Math.random() * 60 + 340;
    const { dir, ready } = prepareShadow(fish, topY);
    cancelAnimationFrame(shadowAnimId);
    ready.then(d => {
        if (token !== shadowToken || !(gameState === 'WAITING' || gameState === 'SIGNAL')) return;
        s.style.top = `${topY + (80 - d.h / 2)}px`;
        let posX = dir > 0 ? -d.w - 20 : 500;
        const loop = () => {
            posX += 2.2 * dir;
            if (dir > 0 && posX > 500) posX = -d.w - 20;
            if (dir < 0 && posX < -d.w - 20) posX = 500;
            s.style.left = `${posX}px`;
            s.style.transform = `translateY(${Math.sin(posX * 0.04) * 6}px)`;
            if (token === shadowToken && (gameState === 'WAITING' || gameState === 'SIGNAL')) shadowAnimId = requestAnimationFrame(loop);
        };
        shadowAnimId = requestAnimationFrame(loop);
    });
}

/* ---------- 難易度（簡単／通常／難しい） ---------- */
const DIFF = {
    easy: { name: '簡単', limitAdd: 0.35, limitMul: 1, minLimit: 0.3, ring: 1.4, netSpeed: 0.85, fake: 0.05, fakeLv: 3, decay: 0.8, power: 1.1, big: 1, sp: 0.8, hp: 0 },
    normal: { name: '通常', limitAdd: 0, limitMul: 1, minLimit: 0.3, ring: 1, netSpeed: 1, fake: 0.12, fakeLv: 3, decay: 1, power: 1, big: 1, sp: 1, hp: 0 },
    hard: { name: '難しい', limitAdd: 0, limitMul: 0.8, minLimit: 0.28, ring: 0.75, netSpeed: 1.35, fake: 0.28, fakeLv: 1, decay: 1.35, power: 0.9, big: 1.2, sp: 1.3, hp: -1 }
};
const diffKey = () => playerData.difficulty || (playerData.easyMode ? 'easy' : 'normal');
const D = () => DIFF[diffKey()] || DIFF.normal;
function setDifficulty(k) {
    playerData.difficulty = k;
    playerData.easyMode = (k === 'easy');
    savePlayerData();
    updateDifficultyUI();
    playWaterPlop();
}
function updateDifficultyUI() {
    ['easy', 'normal', 'hard'].forEach(k => {
        const b = byId('cfg-diff-' + k);
        if (b) b.classList.toggle('active', diffKey() === k);
    });
}

/* ---------- 道具の効果（ここで一括管理。強化レベル・難易度も反映） ---------- */
function upgLv(id) { return (playerData.upgrades && playerData.upgrades[id]) || 0; }
function fx() {
    const p = playerData, o = { limitMul: 1, limitAdd: 0, tapAdd: 0, decayMul: 1, bigMul: 1, rareMul: 1, goldMul: 1, waitMul: 1, ring: 1, netSlow: 1, netNeed1: false, spLeniency: 1, fakeMul: 1, trashLuck: 1, rankMul: 1, spHp: 0, expMul: 1, swingsAdd: 0 };
    const has = fxHas;
    if (currentToolMode === 'rod') {
        const rod = p.equippedRod || 'wood', gachaArea = !!(MAP_DATA[currentLocation] && MAP_DATA[currentLocation].gacha);
        if (rod === 'iron') { o.tapAdd += 4; o.decayMul *= 0.7; o.limitAdd += 0.03; }
        if (rod === 'gold') { o.bigMul *= 1.5; o.rareMul *= 1.4; o.goldMul *= 1.05; }
        if (rod === 'bronze' && currentLocation === 'deepsea') { o.limitMul *= 1.4; o.decayMul *= 0.75; }
        if (rod === 'legend') { o.limitMul *= 1.3; o.tapAdd += 6; o.decayMul *= 0.7; o.bigMul *= 1.4; o.goldMul *= 1.1; }
        if (rod === 'god_beast_rod') { o.limitMul *= 1.4; o.tapAdd += 14; o.decayMul *= 0.55; o.bigMul *= 1.6; o.goldMul *= 1.15; o.spLeniency *= 1.35; }
        if (rod === 'dragon_rod') { o.limitMul *= 1.3; if (gachaArea) o.bigMul *= 2.0; }
        const lv = upgLv(rod);
        o.limitAdd += 0.02 * lv; o.goldMul *= 1 + 0.02 * lv; o.tapAdd += 0.5 * lv;
        if (has('bait_reel')) o.tapAdd += 5;
        if (has('maki_esa')) o.waitMul *= 0.8;
    } else {
        const net = p.equippedNet || 'bug_net';
        o.ring *= 1 + 0.03 * upgLv(net);
        o.goldMul *= 1 + 0.02 * upgLv(net);
        if (net === 'iron_net') o.goldMul *= 1.03;
        if (net === 'steel_net') { o.goldMul *= 1.08; o.spLeniency *= 1.15; }
        if (net === 'divine_net') { o.netSlow *= 0.8; o.netNeed1 = true; o.goldMul *= 1.15; o.spLeniency *= 1.4; }
        if (has('net_fixed')) { o.ring *= 1.15; o.spLeniency *= 1.1; }
    }
    // ---- アクセサリー（追加分）----
    if (has('float')) o.fakeMul *= 0.3;
    if (has('scope') || has('net_scope')) o.rankMul *= 1.25;
    if (has('compass')) o.spHp += 1;
    if (has('glow_bait')) o.bigMul *= 1.3;
    if (has('gold_lure') || has('net_gold')) o.goldMul *= 1.08;
    if (has('exp_bait')) o.expMul *= 1.15;
    if (has('net_pole')) o.swingsAdd += 1;
    if (has('lantern')) o.netSlow *= 0.88;
    if (has('net_buoy')) o.ring *= 1.08;
    if (has('magnet')) o.fakeMul *= 2.5;        // ニセのアタリ＝ゴミ
    if (has('trash_bait')) o.trashLuck *= 3;    // 小瓶・宝箱が出やすい
    return o;
}
// 道具の説明文を、実際の効果に合わせて更新
Object.assign(ROD_DATA.wood, { desc: "初期装備の質素な竿。特別な能力はない。" });
Object.assign(ROD_DATA.iron, { desc: "連打+4・連打ゲージの減りが30%ゆっくり。反応の猶予+0.03秒。" });
Object.assign(ROD_DATA.gold, { desc: "大物の出現率1.5倍・レア魚が出やすい。売値+5%。" });
Object.assign(ROD_DATA.bronze, { desc: "深海エリアで使える竿（青銅・伝説・神獣のみ）。深海では反応の猶予1.4倍・連打ゲージの減りが25%ゆっくり。" });
Object.assign(ROD_DATA.legend, { desc: "深海でも使える。全エリアで反応の猶予1.3倍・連打+6・大物1.4倍・売値+10%。" });
Object.assign(ROD_DATA.god_beast_rod, { desc: "深海・神獣界でも使える最強の竿。反応の猶予1.4倍・連打+14・ゲージ減り45%減・大物1.6倍・売値+15%・特別な戦いが楽になる。" });
Object.assign(ROD_DATA.dragon_rod, { desc: "全ガチャエリアで待ち時間なし＋大物2倍。反応の猶予1.3倍。" });
Object.assign(NET_DATA.bug_net, { desc: "初期装備の小さな網。輪が小さく、大きな獲物は苦手。" });
Object.assign(NET_DATA.tough_net, { desc: "輪がやや大きい。普通サイズまでなら捕まえやすい。" });
Object.assign(NET_DATA.iron_net, { desc: "輪が大きい。大きな獲物も狙える。売値+3%。" });
Object.assign(NET_DATA.steel_net, { desc: "輪がとても大きい。売値+8%・特別な戦いが少し楽に。" });
Object.assign(NET_DATA.divine_net, { desc: "最強の網。輪が最大・魚の動き20%ゆっくり・大物も1回で捕獲・売値+15%・特別な戦いが楽に。" });
Object.assign(ACC_DATA.maki_esa, { desc: "装備中、魚がかかるまでの待ち時間が20%短くなる。", price: 12000 });
Object.assign(ACC_DATA.line_tough, { desc: "竿用。反応が遅れた時、20%の確率で失敗を無効にする。" });
Object.assign(ACC_DATA.net_tough, { desc: "網用。空振りした時、20%の確率で捕獲成功にする。" });
Object.assign(ACC_DATA.bait_reel, { desc: "竿用。連打パワー+5。" });
Object.assign(ACC_DATA.net_fixed, { desc: "網用。輪が15%大きくなる。" });

function calcLimit(fish) {
    const f = fx(), d = D();
    const L = Math.max(fish.reqTime, 0.350) * f.limitMul * d.limitMul + f.limitAdd + d.limitAdd + (tutorialStage ? 0.35 : 0);
    return Math.max(L, d.minLimit);
}

/* ---------- バフ・消耗アイテム（ノーマルガチャ／工房） ---------- */
const BUFFS = {
    gold: { name: 'ゴールド×1.5', ico: '💰' }, exp: { name: 'EXP×1.5', ico: '⭐' },
    frenzy: { name: '入れ食い', ico: '⚡' }, big: { name: '大物チャンス', ico: '🌟' }, super: { name: 'スーパー(金×2/EXP×2)', ico: '👑' }
};
const buffLeft = (k) => Math.max(0, ((playerData.buffs && playerData.buffs[k]) || 0) - Date.now());
const buffOn = (k) => buffLeft(k) > 0;
function addBuff(k, min) {
    if (!playerData.buffs) playerData.buffs = {};
    playerData.buffs[k] = Math.min(Math.max(playerData.buffs[k] || 0, Date.now()) + min * 60000, Date.now() + 60 * 60000);   // 重ねがけは最大60分まで
}
function addItem(k, n) {
    if (!playerData.items) playerData.items = {};
    playerData.items[k] = (playerData.items[k] || 0) + n;
}
const itemCount = (k) => (playerData.items && playerData.items[k]) || 0;

setInterval(() => { if (typeof updateHud === 'function' && byId('status-hud')) updateHud(); }, 20000);

/* ---------- 魚の抽選（道具・バフ・難易度を反映） ---------- */
function getRandomFish() {
    const mode = currentToolMode;
    const pool = FISH_DATA.filter(f => f.location === currentLocation && (f.toolType || "rod") === mode);
    if (tutorialStage) {
        const sea = (t) => FISH_DATA.filter(f => ['sea', 'sea2', 'sea3'].includes(f.location) && (f.toolType || 'rod') === t);
        const f = tutorialStage === 1 ? sea('rod').find(x => !x.isBig) : tutorialStage === 2 ? sea('rod').find(x => x.isBig) : sea('net').find(x => !x.isBig);
        if (f) return f;
    }
    zoromeCast = false;
    if (forceNextFish) {
        const f = forceNextFish;
        forceNextFish = null;
        if (f.location === currentLocation && (f.toolType || 'rod') === mode) { zoromeCast = true; return f; }
    }
    if (pool.length === 0) return FISH_DATA.find(f => f.location === currentLocation) || FISH_DATA[0];
    const o = fx(), wm = weatherMods();
    const bigBonus = (1 + Math.min(2, (playerData.sinceBig || 0) * 0.12)) * o.bigMul * (buffOn('big') ? 2 : 1) * D().big;
    const wts = pool.map(f => f.weight * (f.isBig ? bigBonus * wm.big : (f.weight <= 8 ? o.rareMul : 1)));
    let r = Math.random() * wts.reduce((a, b) => a + b, 0);
    for (let i = 0; i < pool.length; i++) { if (r < wts[i]) return pool[i]; r -= wts[i]; }
    return pool[0];
}

/* ---------- 竿：待機〜アタリ ---------- */
function startWaiting() {
    if (currentToolMode === 'net') { startNetting(); return; }
    gameState = 'WAITING';
    currentTargetFish = getRandomFish();
    preloadImg(currentTargetFish.image);
    const token = ++waitToken;
    setStatus("…", "#fff");
    byId('exclamation').style.display = "none";
    hideOmen();
    const ripple = byId('ripple-effect');
    ripple.style.display = "block";
    ripple.style.left = "40%";
    ripple.style.top = "70%";
    playWaterPlop();
    setupFishShadow(currentTargetFish);

    const m = MAP_DATA[currentLocation], o = fx(), dd = D();
    const slow = !!(m && m.gacha && playerData.equippedRod !== m.matchRod && playerData.equippedRod !== 'dragon_rod');
    let d = slow ? Math.floor(Math.random() * 4000) + 8000 : Math.floor(Math.random() * 2500) + 2000;
    let wm = o.waitMul;
    if (itemCount('bait') > 0 && !tutorialStage) { playerData.items.bait--; wm *= 0.8; savePlayerData(); }
    if (frenzy > 0) wm *= 0.8;
    if (buffOn('frenzy') || buffOn('super')) wm *= 0.8;
    d = Math.max(Math.floor(d * Math.max(wm, 0.55)), 1800);   // 重ねても速くなりすぎない（最短1.8秒）

    const big = !!currentTargetFish.isBig;
    fakeBite = !tutorialStage && !big && playerData.level >= dd.fakeLv && Math.random() < dd.fake * o.fakeMul;
    const at = (ms, fn) => setTimeout(() => { if (waitToken === token && gameState === 'WAITING') fn(); }, ms);
    if (big) {
        at(d * 0.4, () => { showOmen('🌊 うねり…！', true); shake(); triggerVibration([80, 60, 80]); playTone(90, 0.5, 'sawtooth'); });
        at(d * 0.75, () => { showOmen('⚠ 来る…！！', true); shake(); playTone(70, 0.4, 'sawtooth'); });
    } else if (!fakeBite) {
        at(d * 0.55, () => { showOmen('ぴくっ'); setTimeout(() => { if (waitToken === token) hideOmen(); }, 800); });
    }
    timerId = setTimeout(() => {
        if (gameState !== 'WAITING') return;
        if (fakeBite) showFakeBite(token); else doSignal();
    }, d);
}

function hitAction() {
    clearTimeout(timeoutTimerId);
    reactionTime = (Date.now() - startTime) / 1000;
    hideFishShadow();
    byId('ripple-effect').style.display = "none";
    byId('exclamation').style.display = "none";
    hideOmen();
    const limit = calcLimit(currentTargetFish);
    const proceed = () => {
        if (currentTargetFish.isBoss) startBossBattle(1);
        else if (currentTargetFish.isBig) startBattle();
        else finishCatch(true);
    };
    if (reactionTime <= limit) { proceed(); return; }
    if (currentToolMode === 'rod' && fxHas('line_tough') && Math.random() < 0.20) {
        setStatus("装備の力で回避！", "#00ffcc");
        proceed();
        return;
    }
    playSE('foul');
    playerData.currentCombo = 0;
    registerMiss();
    showResult(false, currentTargetFish, reactionTime);
}

function startBattle() {
    if (isSpecialFish(currentTargetFish)) { startSpecial(); return; }
    gameState = 'BATTLE';
    battleGauge = 30;
    updateStageBgm();
    triggerVibration([300, 100, 300]);
    setStatus("連打！", "#ff2200");
    byId('mash-container').style.display = "flex";
    updateGaugeUI();
    playSE('signal');
    const decay = (currentTargetFish.decaySpeed || 1.2) * fx().decayMul * D().decay;
    clearInterval(battleIntervalId);
    battleIntervalId = setInterval(() => {
        if (gameState !== 'BATTLE') return;
        battleGauge -= decay;
        if (battleGauge <= 0) {
            battleGauge = 0;
            clearInterval(battleIntervalId);
            byId('mash-container').style.display = "none";
            playSE('foul');
            if (currentToolMode === 'rod') playerData.currentCombo = 0; else playerData.netCombo = 0;
            registerMiss();
            failReason = 'gauge';
            showResult(false, currentTargetFish, reactionTime);
        }
        updateGaugeUI();
    }, 100);
}

function battleTap() {
    if (gameState !== 'BATTLE') return;
    playSE('tap');
    const power = ((currentTargetFish.tapPower || 11) + fx().tapAdd) * D().power;
    battleGauge += power;
    if (battleGauge >= 100) {
        battleGauge = 100;
        clearInterval(battleIntervalId);
        byId('mash-container').style.display = "none";
        finishCatch(true);
    }
    updateGaugeUI();
}

/* ---------- 網：輪の中でタップ（道具・難易度・先読み対応） ---------- */
function startNetting() {
    gameState = 'NET';
    byId('game-container').classList.add('net-mode');
    const fish = currentTargetFish = getRandomFish();
    const W = byId('game-screen').clientWidth || 400;
    const topY = Math.random() * 50 + 350;
    const { dir, ready } = prepareShadow(fish, topY);
    const o = fx(), dd = D();
    const eq = playerData.equippedNet || 'bug_net';
    const net = NET_DATA[eq] || NET_DATA.bug_net;
    const mismatch = (fish.netSize && net.targetSize && !net.targetSize.includes(fish.netSize)) ? 0.75 : 1;
    const r = (NET_RING[eq] || 34) * o.ring * dd.ring * (tutorialStage ? 1.4 : 1) * (fish.isBig ? 0.85 : 1) * mismatch;
    netState = {
        fish, dir, W, r, sw: 80, cx: W / 2, cy: topY + 20, x: dir > 0 ? -400 : W + 400, last: 0, loading: true,
        speed: (140 + 60 / Math.max(fish.reqTime, 0.4)) * (fish.isBig ? 1.15 : 1) * dd.netSpeed * o.netSlow * (tutorialStage ? 0.8 : 1),
        swings: 2 + o.swingsAdd, need: fish.isBig ? (o.netNeed1 ? 1 : 2) : 1, hit: 0, ratioSum: 0, busy: false, delay: fish.isBig ? 1500 : 400
    };
    const ring = byId('net-ring');
    ring.className = '';
    ring.style.display = 'none';
    const pips = byId('net-pips');
    pips.style.display = 'none';
    byId('net-hint').style.display = 'none';
    setStatus(fish.isBig ? "大物！" : "🥅", fish.isBig ? "#ffd700" : "#fff");
    playWaterPlop();
    cancelAnimationFrame(netRaf);
    ready.then(d => {
        const s = netState;
        if (!s || s.fish !== fish || gameState !== 'NET') return;
        s.sw = d.w; s.cy = topY + d.h / 2; s.x = dir > 0 ? -d.w : W; s.loading = false;
        byId('fish-shadow').style.left = `${s.x}px`;
        ring.style.display = 'block';
        ring.style.width = ring.style.height = `${r * 2}px`;
        ring.style.left = `${s.cx - r}px`;
        ring.style.top = `${s.cy - r}px`;
        if (fish.isBig && s.need > 1) {
            ring.classList.add('big');
            showNetHint('⚠ 大物！ 輪に入ったら <b>2回</b> タップ！<br><small>1回目のあと、もう一度泳いでくるよ</small>', 3200);
            shake(); triggerVibration([60, 40, 60]);
            pips.style.display = 'block';
            pips.style.left = `${s.cx - 65}px`;
            pips.style.top = `${s.cy - r - 34}px`;
            updatePips();
        } else if (fish.isBig) {
            showNetHint('✨ 神獣の網！ 大物も<b>1回</b>でOK！', 2200);
        }
        netRaf = requestAnimationFrame(netLoop);
    });
}

function netLoop(t) {
    const s = netState;
    if (!s || gameState !== 'NET') return;
    const dt = s.last ? Math.min((t - s.last) / 1000, 0.05) : 0.016;
    s.last = t;
    if (s.delay > 0) { s.delay -= dt * 1000; netRaf = requestAnimationFrame(netLoop); return; }
    s.x += s.dir * s.speed * dt;
    const el = byId('fish-shadow');
    el.style.left = `${s.x}px`;
    el.style.transform = `translateY(${Math.sin(s.x * 0.05) * 5}px)`;
    if ((s.dir > 0 && s.x > s.W + 10) || (s.dir < 0 && s.x < -s.sw - 10)) { netFail(); return; }
    netRaf = requestAnimationFrame(netLoop);
}

function netSwing() {
    const s = netState;
    if (!s || s.busy || s.delay > 0 || s.loading) return;
    const ring = byId('net-ring');
    const tol = s.r + Math.min(s.sw * 0.15, 22);
    const dist = Math.abs(s.x + s.sw / 2 - s.cx);
    ring.classList.remove('swing', 'ok', 'ng');
    void ring.offsetWidth;
    playSplashSE();
    triggerVibration(40);
    if (dist <= tol) {
        s.hit++;
        s.ratioSum += dist / tol;
        if (s.need > 1) updatePips();
        ring.classList.add('swing', 'ok');
        if (s.hit >= s.need) {
            s.busy = true;
            netRatio = s.ratioSum / s.hit;
            reactionTime = netRatio;
            cancelAnimationFrame(netRaf);
            setTimeout(() => {
                if (!netState) return;
                const fish = netState.fish;
                stopNet();
                currentTargetFish = fish;
                finishCatch(true);
            }, 350);
        } else {
            s.r *= 0.85; s.speed *= 1.25;
            s.x = s.dir > 0 ? -s.sw : s.W;
            s.delay = 900;
            byId('fish-shadow').style.left = `${s.x}px`;
            ring.style.width = ring.style.height = `${s.r * 2}px`;
            ring.style.left = `${s.cx - s.r}px`;
            ring.style.top = `${s.cy - s.r}px`;
            setStatus("あと1回！", "#00ffcc");
            showNetHint("✨ 命中！ もう一度来るよ！<br><b>もう1回</b>タップ！", 2200);
        }
    } else {
        s.swings--;
        ring.classList.add('swing', 'ng');
        playSE('tap');
        if (s.swings <= 0) { netFail(); } else { s.speed *= 1.2; setStatus("もう1回！", "#ff9966"); }
    }
}

/* ---------- 特別な捕まえ方（各エリアで最も希少な生き物・神獣界のボス） ---------- */
const SP_KINDS = ['timing', 'follow', 'dodge', 'rhythm', 'charge'];
const SP_SEQ = { 237: ['dodge', 'simon', 'charge', 'odd', 'rhythm'], 238: ['timing', 'match', 'follow', 'sort', 'dodge'], 239: ['run', 'rhythm', 'deliver', 'shell', 'charge', 'pop'] };
const SP_OVERRIDE = {};
let spCache = { n: -1, map: {} };
function rarestMap() {
    if (spCache.n === FISH_DATA.length) return spCache.map;
    const groups = {};
    FISH_DATA.forEach(f => { const k = f.location + '|' + (f.toolType || 'rod') + (f.month ? '|' + f.month : ''); (groups[k] = groups[k] || []).push(f); });
    const m = {};
    Object.keys(groups).forEach(k => {
        const g = groups[k];
        if (g.length < 3) return;
        g.sort((a, b) => a.weight - b.weight || b.price - a.price);
        m[g[0].id] = true;
    });
    spCache = { n: FISH_DATA.length, map: m };
    return m;
}
const isSpecialFish = (f) => !!f && (!!f.isBoss || !!rarestMap()[f.id]);
const SP_AREA_KIND = { volcano: 'run', honey: 'match', holy: 'simon', ryugu: 'shell', ruins: 'sort', poison: 'deliver', milkyway: 'odd', eldorado: 'pop' };
const spKindOf = (f) => SP_OVERRIDE[f.id] || SP_AREA_KIND[f.location] || SP_KINDS[(f.id * 7 + 3) % SP_KINDS.length];
function setSpecial(map) { Object.assign(SP_OVERRIDE, map); }

const SP_INFO = {
    timing: { ico: '🎯', name: 'タイミング', text: (n) => `動く線が、光る場所に来た瞬間にタップ！<br>3回成功で捕獲。ミスが${n.lives}回で失敗。` },
    follow: { ico: '👆', name: 'おいかけ', text: () => '光る輪を、指でなぞって追いかけよう！<br>輪はランダムに動く。中にいるとゲージがたまる。（PC：矢印キー）' },
    dodge: { ico: '💣', name: '大砲をよけろ', text: () => '指を左右に動かして、飛んでくる大砲の弾をよけよう！<br>時間まで耐えれば捕獲。（PC：←→キー）' },
    rhythm: { ico: '🎵', name: 'リズム', text: (n) => `縮む輪が、中の丸にぴったり重なる瞬間にタップ！<br>輪は全部で5回。${n.need}回成功で捕獲。` },
    run: { ico: '🏃', name: 'ダッシュ！間欠泉', text: (n) => `長押しで走ってゴールをめざそう！<br>信号が<b>赤</b>の間は止まる（間欠泉が噴き出す）。赤で走るとミス。ミス${n.lives}回で失敗。（PC：Zキー長押し）` },
    deliver: { ico: '💊', name: '解毒薬を届けろ', text: (n) => `上を動く<b>解毒薬</b>を、「助けて！」と光る生き物の真上でタップして落とそう！<br>${n.deliverNeed}回成功で捕獲。ミス${n.lives}回で失敗。（PC：Zキー）` },
    match: { ico: '🃏', name: 'ハニカム神経衰弱', text: (n) => `カードの絵を覚えて、同じ絵の<b>ペア</b>を4組そろえよう！<br>ミス${n.lives + 2}回で失敗。` },
    simon: { ico: '🔮', name: 'ひかりの記憶', text: (n) => `光った順番を覚えて、同じ順にタップ！<br>だんだん長くなる。4回クリアで捕獲。ミス${n.lives}回で失敗。` },
    shell: { ico: '🐚', name: '貝殻あて', text: (n) => `真珠が入った貝殻を、目で追おう！<br>シャッフルが止まったら、真珠のある貝殻をタップ。3回当てれば捕獲。ミス${n.lives}回で失敗。` },
    sort: { ico: '🗿', name: '石板ならべ', text: () => '2枚をタップして入れかえ、<b>1→5</b>の順に並べよう！<br>入れかえられる回数には限りがある。' },
    odd: { ico: '🌠', name: 'まちがい探し', text: (n) => `ひとつだけ違う星を探してタップ！<br>3問。ミス${n.lives}回で失敗。時間切れもミス。` },
    pop: { ico: '⛏', name: '黄金のもぐら', text: (n) => `穴から出る<b>黄金の魚</b>だけをタップ！ 爆弾はさわらないで！<br>ミス${n.lives}回で失敗。` },
    charge: { ico: '💪', name: 'ためうち', text: (n) => `長押しでゲージをため、<b>緑の所</b>で指を離そう！<br>チャンスは5回。${n.chargeNeed}回成功で捕獲。（PC：Zキー長押し）` }
};
let spState = null, spRaf = 0, spGame = null, spLast = 0;
const spKeys = {};
const SP_BASE = {
    'sp-bar': 'position:absolute;height:36px;background:#0b2a40;border:3px solid #d8b66a;border-radius:8px;',
    'sp-bar tall': 'position:absolute;height:48px;background:#0b2a40;border:3px solid #d8b66a;border-radius:8px;',
    'sp-zone': 'position:absolute;top:0;bottom:0;background:rgba(255,226,122,.55);border:2px solid #ffe27a;border-radius:4px;',
    'sp-zone good': 'position:absolute;top:0;bottom:0;background:rgba(60,220,120,.6);border:2px solid #5f8;border-radius:4px;',
    'sp-marker': 'position:absolute;top:-6px;bottom:-6px;width:6px;margin-left:-3px;background:#fff;border-radius:3px;',
    'sp-fill': 'position:absolute;left:0;top:0;bottom:0;width:0;background:#7fc4ff;border-radius:3px;opacity:.85;',
    'sp-target': 'position:absolute;border:4px dashed #ffe27a;border-radius:50%;background:rgba(255,226,122,.15);',
    'sp-cursor': 'position:absolute;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 0 0 3px #4aa3ff;z-index:3;',
    'sp-heart': 'position:absolute;width:24px;height:24px;background:#ff4466;clip-path:polygon(50% 100%,0 40%,10% 10%,30% 0,50% 20%,70% 0,90% 10%,100% 40%);',
    'sp-haz': 'position:absolute;width:22px;height:22px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#bbb,#444 55%,#111);box-shadow:0 0 6px rgba(0,0,0,.8);',
    'sp-orb': 'position:absolute;border:3px solid #ffe27a;border-radius:50%;background:rgba(255,226,122,.2);',
    'sp-ring': 'position:absolute;border:4px solid #fff;border-radius:50%;pointer-events:none;'
};
const spEl = (cls, parent, css) => {
    const e = document.createElement('div');
    e.className = cls;
    if (SP_BASE[cls]) e.style.cssText = SP_BASE[cls];   // style.css が古くても最低限表示されるように
    if (css) Object.assign(e.style, css);
    if (parent) parent.appendChild(e);
    return e;
};



const THING_AREAS = ['ryugu'];
const isThing = (f) => !!f && (THING_AREAS.includes(f.location) || !!f.thing);

function spCardHtml(ico, name, body, ok) {
    return `<div style="font-size:clamp(36px,12vw,54px);line-height:1;">${ico}</div>
        <div style="font-size:clamp(17px,5.6vw,26px);font-weight:bold;color:#ffe9a0;text-shadow:2px 2px 0 #000;max-width:100%;word-break:break-word;">⚓ ${name} ⚓</div>
        <div style="font-size:clamp(12px,3.8vw,16px);line-height:1.6;color:#fff;background:rgba(255,244,214,.12);border:3px solid #d8b66a;border-radius:10px;padding:8px 10px;max-width:100%;box-sizing:border-box;word-break:break-word;overflow-wrap:anywhere;">${body}</div>
        ${ok ? '<div style="margin-top:4px;padding:8px 16px;font-size:clamp(14px,4.6vw,18px);font-weight:bold;background:#c0392b;border:3px solid #ffd700;border-radius:10px;color:#fff;max-width:100%;box-sizing:border-box;">タップではじめる</div>' : ''}`;
}

const spApi = {
    get stage() { return byId('sp-stage'); },
    get W() { return byId('sp-stage').clientWidth || 320; },
    get H() { return byId('sp-stage').clientHeight || 240; },
    say(t) { byId('sp-say').innerHTML = t; },
    prog(p) { byId('sp-prog-in').style.width = Math.max(0, Math.min(100, p * 100)) + '%'; },
    hearts(n) { byId('sp-hearts').innerText = n > 0 ? '❤'.repeat(n) : '💔'; },
    hudText(s) { byId('sp-hearts').innerText = s; },
    flash(t, c) { const f = byId('sp-flash'); f.innerText = t; f.style.color = c || '#fff'; f.classList.remove('on'); void f.offsetWidth; f.classList.add('on'); },
    win() { spStageEnd(true); },
    lose() { spStageEnd(false); }
};

function startBossBattle() { startSpecial(); }

function spClearFlash() { const f = byId('sp-flash'); if (f) { f.classList.remove('on'); f.innerText = ''; } }

function startSpecial() {
    const fish = currentTargetFish;
    const seq = (SP_SEQ[fish.id] || [spKindOf(fish)]).slice();
    spState = { fish, seq, idx: 0 };
    gameState = 'SPECIAL';
    clearInterval(battleIntervalId);
    byId('mash-container').style.display = "none";
    hideFishShadow();
    updateStageBgm();
    triggerVibration([200, 80, 200]);
    ensureSpLayer();
    spClearFlash();
    byId('sp-layer').style.display = 'flex';
    byId('sp-layer').scrollTop = 0;
    spRunStage();
}

function spInfoNums(kind) {
    const dd = D();
    const sp = dd.sp * (spState && spState.seq.length > 1 ? 1.25 : 1);
    const need = sp > 1.1 ? 4 : (sp < 0.9 ? 2 : 3);
    return { lives: 3 + dd.hp + fx().spHp, need: need, chargeNeed: sp > 1.1 ? 4 : 3, deliverNeed: sp > 1.1 ? 6 : (sp < 0.9 ? 4 : 5) };
}

function spRunStage() {
    const kind = spState.seq[spState.idx];
    const fish = spState.fish;
    const info = SP_INFO[kind];
    byId('sp-title').innerHTML = `⚓ ${info.ico} ${fish.name}${spState.seq.length > 1 ? `　ターン ${spState.idx + 1}/${spState.seq.length}` : ''} ⚓`;
    const st = byId('sp-stage');
    st.innerHTML = '';
    spGame = null;
    spApi.say('');
    spApi.prog(0);
    spApi.hearts(0);
    const seen = (playerData.spSeen = playerData.spSeen || {});
    const card = byId('sp-card');
    if (!seen[kind] || spState.idx === 0 && spState.seq.length > 1 && !seen['boss']) {
        seen[kind] = true;
        if (spState.seq.length > 1) seen['boss'] = true;
        savePlayerData();
        card.innerHTML = spCardHtml(info.ico, info.name, `${isThing(fish) ? `${fish.name}を手に入れるには、試練を乗りこえなければ！` : `${fish.name}が本気で抵抗してきた！`}<br>${info.text(spInfoNums(kind))}`, true);
        card.style.display = 'flex';
        spState.waitCard = true;
    } else {
        card.innerHTML = spCardHtml(info.ico, info.name, `<b style="font-size:22px;color:#ffe27a;">${isThing(fish) ? fish.name + 'への挑戦！' : fish.name + 'との勝負！'} READY…</b>`, false);
        card.style.display = 'flex';
        spState.waitCard = false;
        setTimeout(spCardOk, 900);
    }
}

function spCardOk() {
    if (!spState || gameState !== 'SPECIAL' || spGame) return;
    byId('sp-card').style.display = 'none';
    const kind = spState.seq[spState.idx];
    const o = fx(), dd = D();
    const P = { sp: dd.sp * (spState.seq.length > 1 ? 1.25 : 1), len: o.spLeniency * (spState.seq.length > 1 ? 0.9 : 1), hp: 3 + dd.hp + o.spHp };
    spGame = SPG[kind](spApi, P);
    spLast = 0;
    cancelAnimationFrame(spRaf);
    spRaf = requestAnimationFrame(spTick);
}

function spTick(t) {
    if (!spGame || gameState !== 'SPECIAL') return;
    const dt = spLast ? Math.min((t - spLast) / 1000, 0.05) : 0.016;
    spLast = t;
    spGame.update && spGame.update(dt);
    if (spGame) spRaf = requestAnimationFrame(spTick);
}

function spStageEnd(win) {
    if (!spGame) return;
    spGame = null;
    cancelAnimationFrame(spRaf);
    spApi.flash(win ? 'SUCCESS!' : 'FAILED…', win ? '#ffe27a' : '#ff6666');
    playSE(win ? 'success' : 'foul');
    setTimeout(() => {
        if (!spState) return;
        if (win && spState.idx + 1 < spState.seq.length) { spState.idx++; spRunStage(); return; }
        const fish = spState.fish;
        spClearFlash();
        byId('sp-layer').style.display = 'none';
        spState = null;
        currentTargetFish = fish;
        if (win) { spWon = true; finishCatch(true); }
        else {
            if (currentToolMode === 'rod') playerData.currentCombo = 0; else playerData.netCombo = 0;
            registerMiss();
            failReason = 'special';
            showResult(false, fish, null);
        }
    }, 900);
}

function spAction() { if (spState && spState.waitCard && byId('sp-card').style.display !== 'none') { spCardOk(); return; } if (spGame && spGame.act) spGame.act(); }
window.addEventListener('keydown', (e) => {
    if (gameState !== 'SPECIAL') return;
    if (e.code.startsWith('Arrow')) { spKeys[e.code] = true; e.preventDefault(); if (!e.repeat && spGame && spGame.keyPress) spGame.keyPress(e.code); }
    if (e.code === 'KeyZ' && !e.repeat) { if (spCardShown()) spCardOk(); else if (spGame) { spGame.keyDown ? spGame.keyDown() : (spGame.down && spGame.down(spGame.px || 0, spGame.py || 0)); } e.preventDefault(); }
}, true);
window.addEventListener('keyup', (e) => {
    spKeys[e.code] = false;
    if (gameState === 'SPECIAL' && e.code === 'KeyZ' && spGame && spGame.up) spGame.up();
}, true);
const spCardShown = () => byId('sp-card') && byId('sp-card').style.display !== 'none';

const SPG = {};
SPG.timing = function (a, P) {
    const BW = a.W - 40, bar = spEl('sp-bar', a.stage, { left: '20px', top: `${a.H / 2 - 18}px`, width: BW + 'px' });
    const zone = spEl('sp-zone', bar), mk = spEl('sp-marker', bar);
    const need = 3; let hits = 0, lives = P.hp, x = 0, dir = 1, zx = 0, zw = 0;
    const speed = BW / (1.5 / P.sp);
    const newZone = () => { zw = Math.max(34, BW * 0.22 * P.len / Math.pow(P.sp, 0.7) * Math.pow(0.88, hits)); zx = Math.random() * (BW - zw); zone.style.left = zx + 'px'; zone.style.width = zw + 'px'; };
    newZone(); a.hearts(lives); a.say(`光る所でタップ！ ${need}回成功（ミス${lives}回で失敗）`);
    const g = {
        update(dt) { x += dir * speed * (1 + hits * 0.12) * dt; if (x >= BW) { x = BW; dir = -1; } if (x <= 0) { x = 0; dir = 1; } mk.style.left = x + 'px'; },
        act() {
            if (x >= zx && x <= zx + zw) { hits++; a.prog(hits / need); a.flash('ナイス！', '#7fff7f'); playSE('tap'); if (hits >= need) return a.win(); newZone(); }
            else { lives--; a.hearts(lives); a.flash('ミス…', '#ff7777'); playSE('foul'); if (lives <= 0) return a.lose(); }
        },
        down() { g.act(); }, keyDown() { g.act(); }
    };
    return g;
};
SPG.follow = function (a, P) {
    const W = a.W, H = a.H, r = 38 * P.len / Math.pow(P.sp, 0.4);
    const tg = spEl('sp-target', a.stage, { width: 2 * r + 'px', height: 2 * r + 'px' }), cur = spEl('sp-cursor', a.stage);
    let t = 0, gauge = 25, px = W / 2, py = H / 2, time = 13 * (P.sp < 1 ? 1.2 : 1);
    let tx = W / 2, ty = H / 2, vx = 0, vy = 0, wx = W / 2, wy = H / 2, wt = 0;
    a.say('光る輪を 指で追いかけよう！'); a.prog(gauge / 100);
    const g = {
        px, py,
        update(dt) {
            t += dt; time -= dt;
            const k = 260 * dt;
            if (spKeys.ArrowLeft) px -= k; if (spKeys.ArrowRight) px += k; if (spKeys.ArrowUp) py -= k; if (spKeys.ArrowDown) py += k;
            px = Math.max(0, Math.min(W, px)); py = Math.max(0, Math.min(H, py));
            wt -= dt;   // ランダムな目的地へ、急に向きを変えながら動く
            if (wt <= 0) { wx = r + Math.random() * (W - 2 * r); wy = r + Math.random() * (H - 2 * r); wt = (0.5 + Math.random() * 1.1) / P.sp; }
            const sp = 150 * P.sp, ddx = wx - tx, ddy = wy - ty, dl = Math.hypot(ddx, ddy) || 1;
            vx += (ddx / dl * sp - vx) * Math.min(1, 3.2 * dt); vy += (ddy / dl * sp - vy) * Math.min(1, 3.2 * dt);
            tx = Math.max(r, Math.min(W - r, tx + vx * dt)); ty = Math.max(r, Math.min(H - r, ty + vy * dt));
            tg.style.left = (tx - r) + 'px'; tg.style.top = (ty - r) + 'px';
            cur.style.left = (px - 8) + 'px'; cur.style.top = (py - 8) + 'px';
            const inside = Math.hypot(px - tx, py - ty) <= r;
            tg.classList.toggle('on', inside);
            gauge += (inside ? 30 : -16 * P.sp) * dt;
            gauge = Math.max(0, Math.min(100, gauge));
            a.prog(gauge / 100); a.say(`あと ${Math.max(0, Math.ceil(time))} 秒`);
            if (gauge >= 100) a.win(); else if (time <= 0) a.lose();
        },
        down(x, y) { px = x; py = y; }, move(x, y) { px = x; py = y; }
    };
    return g;
};
SPG.dodge = function (a, P) {
    const W = a.W, H = a.H, total = 9 * (P.sp < 1 ? 0.85 : (P.sp > 1.1 ? 1.1 : 1));
    const heart = spEl('sp-heart', a.stage, { top: (H - 34) + 'px' });
    let px = W / 2, tx = null, time = total, hp = P.hp, inv = 0, spawn = 0.4, n = 0; const haz = [];
    a.hearts(hp); a.say('よけつづけろ！');
    const add = (x, v) => { const e = spEl('sp-haz', a.stage, { left: (x - 11) + 'px', top: '-24px' }); haz.push({ e, x, y: -24, v }); };
    const g = {
        update(dt) {
            time -= dt; inv -= dt; spawn -= dt;
            const k = 280 * dt;
            if (spKeys.ArrowLeft) { px -= k; tx = null; } if (spKeys.ArrowRight) { px += k; tx = null; }
            if (tx !== null) px += (tx - px) * Math.min(1, 14 * dt);
            px = Math.max(12, Math.min(W - 12, px));
            heart.style.left = (px - 12) + 'px'; heart.style.opacity = inv > 0 && Math.floor(inv * 12) % 2 ? 0.3 : 1;
            if (spawn <= 0) {
                n++; spawn = 0.62 / P.sp; const v = 150 * P.sp;
                if (n % 5 === 0) { const gap = Math.random() * (W - 120) + 60; for (let x = 20; x < W; x += 36) if (Math.abs(x - gap) > 54 * P.len) add(x, v * 0.85); }
                else add(Math.random() * (W - 30) + 15, v);
            }
            for (let i = haz.length - 1; i >= 0; i--) {
                const h = haz[i]; h.y += h.v * dt; h.e.style.top = h.y + 'px';
                if (inv <= 0 && Math.hypot(h.x - px, h.y + 11 - (H - 22)) < 20) {
                    hp--; inv = 1.2; a.hearts(hp); a.flash('ヒット！', '#ff7777'); playSE('foul'); triggerVibration(120);
                    if (hp <= 0) return a.lose();
                }
                if (h.y > H + 30) { h.e.remove(); haz.splice(i, 1); }
            }
            a.prog(1 - time / total);
            const left = Math.max(0, Math.ceil(time)); if (left !== g._left) { g._left = left; a.say(`あと ${left} 秒 よけつづけろ！`); }
            if (time <= 0) a.win();
        },
        down(x) { tx = x; }, move(x) { if (tx !== null) tx = x; }, up() { }
    };
    return g;
};
SPG.rhythm = function (a, P) {
    const W = a.W, H = a.H, beats = 5, need = P.sp > 1.1 ? 4 : (P.sp < 0.9 ? 2 : 3), dur = 1.05 / P.sp, R0 = 90, tr = 26, win = 15 * P.len;
    let beat = -1, wait = 0.5, t = 0, good = 0, active = false, cx = W / 2, cy = H / 2, done = 0;
    const target = spEl('sp-orb', a.stage, { width: 2 * tr + 'px', height: 2 * tr + 'px' }), ring = spEl('sp-ring', a.stage);
    target.style.display = ring.style.display = 'none';
    const hud = () => { a.say(`輪は5回。 ${need}回成功で捕獲！`); a.hudText(`成功 ${good}/${need}　残り ${Math.max(0, beats - done)}回`); a.prog(done / beats); };
    hud();
    const nextBeat = () => {
        beat++; if (beat >= beats) { return good >= need ? a.win() : a.lose(); }
        cx = 60 + Math.random() * (W - 120); cy = 60 + Math.random() * (H - 120);
        target.style.left = (cx - tr) + 'px'; target.style.top = (cy - tr) + 'px'; target.style.display = 'block';
        ring.style.width = ring.style.height = 2 * R0 + 'px'; ring.style.left = (cx - R0) + 'px'; ring.style.top = (cy - R0) + 'px';
        ring.style.display = 'block'; t = 0; active = true;
    };
    const judge = (ok) => {
        if (!active) return; active = false;
        if (ok) { good++; a.flash('GOOD!', '#7fff7f'); playSE('tap'); } else { a.flash('MISS', '#ff7777'); playSE('foul'); }
        done++; hud(); target.style.display = ring.style.display = 'none'; wait = 0.55;
    };
    const g = {
        update(dt) {
            if (!active) { wait -= dt; if (wait <= 0) nextBeat(); return; }
            t += dt; const rr = R0 - (R0 - tr) * (t / dur);
            ring.style.width = ring.style.height = 2 * rr + 'px'; ring.style.left = (cx - rr) + 'px'; ring.style.top = (cy - rr) + 'px';
            if (t > dur + 0.18) judge(false);
        },
        act() { if (!active) return; const rr = R0 - (R0 - tr) * (t / dur); judge(Math.abs(rr - tr) <= win * 0.8 && t > dur * 0.4); },
        down() { g.act(); }, keyDown() { g.act(); }
    };
    return g;
};
SPG.charge = function (a, P) {
    const BW = a.W - 40, bar = spEl('sp-bar tall', a.stage, { left: '20px', top: `${a.H / 2 - 24}px`, width: BW + 'px' });
    const zone = spEl('sp-zone good', bar), fill = spEl('sp-fill', bar);
    let tries = 5, ok = 0, v = 0, holding = false, zx = 0, zw = 0;
    const need = P.sp > 1.1 ? 4 : 3, rate = 70 * P.sp;
    const newZone = () => { zw = Math.max(10, 22 * P.len / Math.pow(P.sp, 0.7)); zx = 35 + Math.random() * (95 - zw - 35); zone.style.left = zx + '%'; zone.style.width = zw + '%'; };
    const hud = () => { a.say(`長押しでためて 緑で離す！ ${need}回成功で捕獲`); a.hudText(`成功 ${ok}/${need}　残り ${tries}回`); a.prog(ok / need); };
    newZone(); hud();
    const release = () => {
        holding = false;
        if (v >= zx && v <= zx + zw) { ok++; a.flash('ばっちり！', '#7fff7f'); playSE('success'); } else { a.flash('はずれ…', '#ff7777'); playSE('foul'); }
        tries--; v = 0; fill.style.width = '0%'; hud();
        if (ok >= need) return a.win(); if (tries <= 0 || ok + tries < need) return a.lose(); newZone();
    };
    const g = {
        update(dt) { if (holding) { v += rate * dt; fill.style.width = Math.min(v, 100) + '%'; if (v >= 100) { v = 100; release(); } } },
        down() { if (!holding) { holding = true; v = 0; } }, keyDown() { g.down(); },
        up() { if (holding) release(); }
    };
    return g;
};

/* ---------- 捕獲成功の入口（特別な生き物は特別な戦いへ） ---------- */
let spWon = false;
function finishCatch(isSuccess) {
    if (isSuccess && !spWon && !tutorialStage && isSpecialFish(currentTargetFish)) { startSpecial(); return; }
    finishCatchCore(isSuccess);
}

const _handleAction30 = window.handleAction;
window.handleAction = function () {
    if (gameState === 'SPECIAL') { initAudio(); spAction(); return; }
    if (gameState === 'READY' && kbCtx()) return;   // レベルアップ等のウィンドウが開いている間は、外側をタップしても釣りを始めない
    return _handleAction30.apply(this, arguments);
};

/* ---------- お守り（ガチャで入手）：失敗を身代わりに ---------- */
const _showResult30 = showResult;
window.showResult = function (isSuccess, fish) {
    if (!isSuccess && !tutorialStage && itemCount('charm') > 0) {
        playerData.items.charm--;
        savePlayerData();
        stopNet();
        hideFishShadow();
        byId('exclamation').style.display = 'none';
        byId('mash-container').style.display = 'none';
        failReason = 'late';
        gameState = 'READY';
        setStatus('🧿 お守りが身代わりに！', '#00ffcc');
        floatText('🧿 お守りで失敗を回避！', '#00ffcc', true);
        playSE('success');
        updateHud();
        return;
    }
    return _showResult30.apply(this, arguments);
};

/* ===================================================
   ノーマルガチャ（刷新）：ゴールド＋バフ＋アイテム。1回300G
   =================================================== */
const NG_COST = 600;
const NG_POOL = [
    { w: 30, tier: 0, ico: '🪙', label: '+150G', fx: 'coin_s', gold: 150 },
    { w: 15, tier: 1, ico: '🪙', label: '+300G', fx: 'coin_m', gold: 300 },
    { w: 10, tier: 2, ico: '🧿', label: 'お守り×1', fx: 'item_charm', item: ['charm', 1], desc: '失敗を1回だけ無かったことに' },
    { w: 10, tier: 2, ico: '🪱', label: '特製まき餌×5', fx: 'item_bait', item: ['bait', 5], desc: '次の5回は待ち時間が短くなる' },
    { w: 10, tier: 2, ico: '⚡', label: '入れ食い10分', fx: 'buff_frenzy', buff: ['frenzy', 10], desc: '待ち時間が短くなる' },
    { w: 8, tier: 3, ico: '💰', label: 'ゴールド×1.5（10分）', fx: 'buff_gold', buff: ['gold', 10] },
    { w: 8, tier: 3, ico: '⭐', label: 'EXP×1.5（10分）', fx: 'buff_exp', buff: ['exp', 10] },
    { w: 5, tier: 3, ico: '🌟', label: '大物チャンス10分', fx: 'buff_big', buff: ['big', 10], desc: '大物が出やすい' },
    { w: 3, tier: 4, ico: '💎', label: '+1000G', fx: 'coin_l', gold: 1000 },
    { w: 1, tier: 5, ico: '👑', label: 'スーパーブースト15分', fx: 'buff_super', buff: ['super', 15], desc: '金×2・EXP×2・待ち時間短縮' }
];
const NG_TIER_LABEL = ['', '', 'レア', 'スーパーレア', 'ウルトラ', 'レジェンド'];

function setGachaTab(tab) {
    playerData.gachaTab = tab;
    byId('gacha-screen').classList.toggle('ng-mode', tab === 'ng');
    byId('gtab-ev').classList.toggle('active', tab === 'ev');
    byId('gtab-ng').classList.toggle('active', tab === 'ng');
    if (tab === 'ng') renderNormalGacha();
    savePlayerData();
}
function renderNormalGacha() {
    const free = playerData.freeGachaDate !== todayStr();
    byId('gacha-gold').innerText = playerData.gold;
    const b = byId('ng-free-btn');
    b.disabled = !free;
    b.innerHTML = free ? '🆓<small>今日の無料</small>' : '🆓<small>明日また</small>';
    let h = '';
    Object.keys(BUFFS).forEach(k => { if (buffOn(k)) h += `<span class="ng-buff">${fxi('buff_' + k, 16, BUFFS[k].ico)} ${BUFFS[k].name} 残り${Math.ceil(buffLeft(k) / 60000)}分</span>`; });
    if (itemCount('charm') > 0) h += `<span class="ng-buff">${fxi('item_charm', 16)} お守り×${itemCount('charm')}</span>`;
    if (itemCount('bait') > 0) h += `<span class="ng-buff">${fxi('item_bait', 16)} 特製まき餌×${itemCount('bait')}</span>`;
    byId('ng-buffs').innerHTML = h || '<span class="ng-buff dim">いまは効果なし</span>';
}
function showNgPrizes() {
    const total = NG_POOL.reduce((s, x) => s + x.w, 0);
    byId('ng-prize-list').innerHTML = NG_POOL.map(x => `<div class="ng-prize-row tier${x.tier}"><span>${fxi(x.fx, 22, x.ico)} ${x.label}</span><small>${(x.w / total * 100).toFixed(0)}%</small></div>`).join('') +
        `<div class="ng-prize-note">10連は「レア」以上が1つ確定。1回${NG_COST.toLocaleString()}G／10連${(NG_COST * 10).toLocaleString()}G。毎日1回は無料。<br>ゴールド以外は、ゲームを始めると自動で使われます。</div>`;
    byId('ng-prize-modal').style.display = 'flex';
}
function closeNgPrizes() { byId('ng-prize-modal').style.display = 'none'; }

let ngBusy = false;
function closeNgResult() { const r = byId('ng-result'); if (r) { r.style.display = 'none'; } }

/* ===================================================
   工房：ゴールドの使い道（道具の強化・ブースト購入）
   =================================================== */
const UPG_MAX = 10;
const upgCost = (lv) => Math.round(2500 * Math.pow(lv + 1, 1.6) / 100) * 100;
const SHOP_BOOST = [
    { id: 'b_frenzy', fx: 'buff_frenzy', ico: '⚡', name: '入れ食い10分', desc: '待ち時間が短くなる', price: 4000, act: () => addBuff('frenzy', 10) },
    { id: 'b_gold', fx: 'buff_gold', ico: '💰', name: 'ゴールド×1.5（10分）', desc: '売値が1.5倍', price: 8000, act: () => addBuff('gold', 10) },
    { id: 'b_exp', fx: 'buff_exp', ico: '⭐', name: 'EXP×1.5（10分）', desc: 'レベルが上がりやすい', price: 5000, act: () => addBuff('exp', 10) },
    { id: 'b_big', fx: 'buff_big', ico: '🌟', name: '大物チャンス10分', desc: '大物が出やすい', price: 5000, act: () => addBuff('big', 10) },
    { id: 'b_charm', fx: 'item_charm', ico: '🧿', name: 'お守り×3', desc: '失敗を3回まで無かったことに', price: 3000, act: () => addItem('charm', 3) },
    { id: 'b_bait', fx: 'item_bait', ico: '🪱', name: '特製まき餌×5', desc: '次の5回は待ち時間が短くなる', price: 2500, act: () => addItem('bait', 5) }
];
let wsTab = 'upg';
function buyUpgrade(id) {
    const lv = upgLv(id);
    if (lv >= UPG_MAX || playerData.gold < upgCost(lv)) return;
    playerData.gold -= upgCost(lv);
    if (!playerData.upgrades) playerData.upgrades = {};
    playerData.upgrades[id] = lv + 1;
    playerData.upgradeCount = (playerData.upgradeCount || 0) + 1;
    savePlayerData(); playSE('levelup'); setWsTab('upg'); updateMenuUI(); checkAchievements();
}
function buyBoost(id) {
    const b = SHOP_BOOST.find(x => x.id === id);
    if (!b || playerData.gold < b.price) return;
    playerData.gold -= b.price;
    b.act();
    savePlayerData(); playSE('success'); setWsTab('boost'); updateMenuUI(); updateHud();
}

/* ===================================================
   実績：ヒント表示／エリア名のネタバレ防止／全実績達成の特別演出
   =================================================== */
const ACH_HINTS = {
    comp_sea: '広くて青い場所の住人を、全員そろえよう', comp_river: '流れる水辺の住人を、全員そろえよう', comp_swamp: 'ぬかるむ水辺の住人を、全員そろえよう',
    comp_lake: '静かな水面の住人を、全員そろえよう', comp_snow: '凍える場所の住人を、全員そろえよう', comp_underground: '光の届かない洞窟の住人を、全員そろえよう',
    comp_deepsea: '一番深い青の底の住人を、全員そろえよう', comp_volcano: '熱くて赤い場所の住人を、全員そろえよう', comp_honey: 'あまーい場所の住人を、全員そろえよう',
    comp_holy: '清らかな光の場所の住人を、全員そろえよう', comp_ryugu: '伝説のお城の宝を、全部そろえよう', comp_ruins: '太古の時代の生き物を、全員そろえよう',
    comp_poison: '危険な色の水辺の住人を、全員そろえよう', comp_milkyway: '夜空の彼方の住人を、全員そろえよう', comp_eldorado: '輝く伝説の地の住人を、全員そろえよう',
    comp_shinju: '神々の世界の住人を、全員そろえよう', all_maps: 'いろいろな場所へ冒険に出かけよう'
};
Object.keys(ACH_HINTS).forEach(k => { if (ACHIEVEMENT_DATA[k]) ACHIEVEMENT_DATA[k].hint = ACH_HINTS[k]; });
const SECRET_HINTS = {
    secret_logo: 'タイトルのロゴは、くすぐったがり屋さん。',
    secret_menu: '「メインメニュー」の文字を、せっせと叩いてみよう。',
    secret_level: 'ゲーム中のレベル表示は、はげましてほしそう。',
    secret_weather: '釣り場の名前をつつくと、空模様が変わるかも？',
    secret_gold: '所持金をじっと見つめて、何度もつついてみよう。',
    secret_zukan: '図鑑で生き物の名前を、なでてあげよう。',
    secret_sound: 'スピーカーのボタンを、たくさん鳴らしてみよう。'
};
Object.keys(SECRET_HINTS).forEach(k => { if (ACHIEVEMENT_DATA[k]) ACHIEVEMENT_DATA[k].shint = SECRET_HINTS[k]; });
// 「すべての実績を達成した」は実績としては廃止（達成すると殿堂入りの演出だけが起こります）
ACHIEVEMENT_DATA.special_5 = { id: 'special_5', name: '勝負師', icon: _IC.s, desc: '特別な戦いに5回勝った', hint: '希少な生き物は、普通には捕まらない…' };
ACHIEVEMENT_DATA.upgrade_10 = { id: 'upgrade_10', name: '工房の常連', icon: _IC.c, desc: '道具を合計10回強化した', hint: 'ゴールドの使い道は、工房にある' };


const _checkAch30 = window.checkAchievements;
window.checkAchievements = function () {
    _checkAch30();
    const p = playerData;
    if ((p.specialWins || 0) >= 5) unlockAch('special_5');
    if ((p.upgradeCount || 0) >= 10) unlockAch('upgrade_10');
    if ((p.trashCount || 0) >= 100) unlockAch('trash_100');
    if (Object.keys(ACC_DATA).every(k => (p.ownedAccs || []).includes(k))) unlockAch('comp_all_accs');
    if (Object.keys(p.upgrades || {}).some(k => p.upgrades[k] >= UPG_MAX)) unlockAch('upgrade_max');
    if (p.achievements.includes('all_clear')) { p.hallOfFame = true; p.achievements = p.achievements.filter(k => k !== 'all_clear'); savePlayerData(); }   // 旧データ：実績としては外し、殿堂入りだけ残す
    const ids = Object.keys(ACHIEVEMENT_DATA);
    if (!p.hallOfFame && ids.every(k => p.achievements.includes(k))) {
        p.gold += 100000;
        p.hallOfFame = true;
        savePlayerData();
        applyHallOfFame();
        setTimeout(() => showClearModal(false), 1500);
    }
};
function applyHallOfFame() {
    // 実績「爆釣一閃の伝説」を持っていれば、データをリセットして実績を引き継いだ後も殿堂入りの証を表示する
    if (!playerData.hallOfFame && (playerData.achievements || []).includes('all_clear')) { playerData.hallOfFame = true; playerData.achievements = playerData.achievements.filter(k => k !== 'all_clear'); savePlayerData(); }
    document.body.classList.toggle('hof', !!playerData.hallOfFame);
    const t = byId('menu-title');
    if (t) t.innerText = playerData.hallOfFame ? '👑 メインメニュー 👑' : 'メインメニュー';
}
function showClearModal(again) {
    let m = byId('clear-modal');
    if (!m) {
        m = spEl('modal', byId('game-container'));
        m.id = 'clear-modal';
        byId('game-container').appendChild(m);
    }
    m.innerHTML = `<div class="clear-confetti">${Array.from({ length: 24 }, (_, i) => `<i style="left:${(i * 4.3) % 100}%;animation-delay:${(i % 8) * 0.25}s;background:hsl(${i * 37},90%,60%)"></i>`).join('')}</div>
        <div class="clear-title">👑 殿堂入り 👑</div>
        <div class="clear-sub">爆釣一閃の伝説</div>
        <div class="clear-text">すべての実績を達成しました！<br>あなたはもう、立派な「釣り神」です。<br>ここまで遊んでくれて、本当にありがとう！</div>
        <div class="clear-reward">${again ? '殿堂入りの証：メニューが金色に輝いています' : '🎁 ごほうび +100,000G<br>✨ 殿堂入りの証：メニューが金色に！'}</div>
        <button class="btn" onclick="closeClearModal()">閉じる</button>`;
    m.style.display = 'flex';
    if (!again) playSE('levelup');
}
function closeClearModal() { const m = byId('clear-modal'); if (m) m.style.display = 'none'; updateMenuUI(); }

/* ===================================================
   エリアコンプリート通知／アイコン
   =================================================== */
const areaDone = (k) => { try { return isAreaCompleted(k); } catch (e) { return false; } };

window.addEventListener('DOMContentLoaded', () => {
    applyLocationBg();
    preloadArea(currentLocation);
    setTimeout(startBackgroundPreload, 1500);
    updateDifficultyUI();
    applyHallOfFame();
    if (byId('ws-gold')) byId('ws-gold').innerText = Number(playerData.gold).toLocaleString();
    const cssVer = getComputedStyle(document.documentElement).getPropertyValue('--css-ver').trim().replace(/['"]/g, '');
    if (cssVer !== CSS_VERSION) {
        document.body.insertAdjacentHTML('afterbegin', '<div style="position:fixed;left:0;right:0;top:0;z-index:99999;background:#a00;color:#fff;padding:8px 12px;font-size:13px;line-height:1.5;">⚠ style.css が古いままです。最新の style.css に入れ替えてください。（表示が崩れる原因になります）</div>');
    }
});

/* ===================================================
   キーボード操作（PC向け）
   ↑↓←→：選択移動 / Z：決定（釣り上げ） / X・Esc：戻る
   =================================================== */
const KB_CTX = [
    { id: 'zoom-modal', zoom: true, back: () => closeZoomModal() },
    { id: 'levelup-modal', back: () => closeLevelUpModal() },
    { id: 'equip-select-modal', back: () => closeEquipSelectModal() },
    { id: 'zukan-detail-modal', back: () => closeZukanDetail() },
    { id: 'zukan-area-modal', back: () => closeZukanAreaModal() },
    { id: 'ng-prize-modal', back: () => closeNgPrizes() },
    { id: 'workshop-screen', back: () => closeWorkshop() },
    { id: 'clear-modal', back: () => closeClearModal() },
    { id: 'gacha-notice-modal', back: () => closeGachaNotice() },
    { id: 'gacha-list-modal', back: () => closeGachaListModal() },
    { id: 'ranking-modal', back: () => closeRankingModal() },
    { id: 'config-modal', back: () => closeConfigModal() },
    { id: 'achievement-modal', back: () => closeAchievements() },
    { id: 'mission-modal', back: () => closeMissions() },
    { id: 'equip-screen', back: () => closeEquipScreen() },
    { id: 'zukan-modal', back: () => closeZukan() },
    { id: 'map-modal', back: () => closeMapModal() },
    { id: 'howto-modal', back: () => closeHowToPlay() },
    { id: 'shop-screen', back: () => closeShop() },
    { id: 'gacha-screen', back: () => closeGachaScreen() },
    { id: 'result-modal', result: true, prefer: '#next-btn', back: () => { if (!byId('next-btn').disabled) closeResult(); } },
    { id: 'menu-screen', prefer: 'button[onclick="startGameFromMenu()"]' },
    { id: 'title-screen', title: true }
];
const KB_SEL = 'button, [onclick], .zukan-card.discovered';
let kbMode = false, kbFocus = null, kbCtxId = 'game', kbMoved = false;
const kbMemory = {};

function kbCtx() {
    return KB_CTX.find(c => { const el = byId(c.id); return el && getComputedStyle(el).display !== 'none'; }) || null;
}

function kbCands(ctx) {
    const root = ctx ? byId(ctx.id) : null;
    const list = ctx ? [...root.querySelectorAll(KB_SEL)] : [...document.querySelectorAll('.ui-header button, .tool-mode-btn')];
    return list.filter(el => {
        if (el === root || el.tagName === 'IMG' || el.classList.contains('locked')) return false;
        if (el.disabled && el.id !== 'next-btn') return false;
        if (!el.getClientRects().length) return false;
        const cs = getComputedStyle(el);
        return cs.visibility !== 'hidden' && cs.pointerEvents !== 'none';
    });
}

function kbReading(list) {
    return list.slice().sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return Math.abs(ra.top - rb.top) < 8 ? ra.left - rb.left : ra.top - rb.top;
    });
}

function kbSet(el) {
    if (kbFocus) kbFocus.classList.remove('kb-focus');
    kbFocus = el;
    if (el) {
        el.classList.add('kb-focus');
        el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
}

function kbAutoFocus(ctx) {
    if (!ctx) { kbSet(null); return; }
    const c = kbCands(ctx);
    if (!c.length) { kbSet(null); return; }
    let el = null;
    const pref = (ctx.id === 'menu-screen' && typeof guideOn !== 'undefined' && guideOn) ? '#btn-howto' : ctx.prefer;
    if (pref) el = c.find(x => x.matches(pref));
    const mem = kbMemory[ctx.id];
    if (!el && mem !== undefined && c[mem]) el = c[mem];
    kbSet(el || kbReading(c)[0]);
}

function kbMove(dir) {
    const ctx = kbCtx(), c = kbCands(ctx);
    if (!c.length) return;
    kbMoved = true;
    if (!kbFocus || !c.includes(kbFocus)) { if (ctx) kbAutoFocus(ctx); else kbSet(kbReading(c)[0]); return; }
    const cr = kbFocus.getBoundingClientRect();
    const cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
    let best = null, bs = Infinity;
    c.forEach(el => {
        if (el === kbFocus) return;
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - cx, dy = r.top + r.height / 2 - cy;
        let main, cross;
        if (dir === 'left') { main = -dx; cross = Math.abs(dy); }
        else if (dir === 'right') { main = dx; cross = Math.abs(dy); }
        else if (dir === 'up') { main = -dy; cross = Math.abs(dx); }
        else { main = dy; cross = Math.abs(dx); }
        if (main <= 2) return;
        const score = main + cross * 2.2;
        if (score < bs) { bs = score; best = el; }
    });
    if (!best && (dir === 'up' || dir === 'down')) {
        const sorted = kbReading(c);
        best = dir === 'down' ? sorted[0] : sorted[sorted.length - 1];
    }
    if (best) {
        kbSet(best);
        if (ctx) kbMemory[ctx.id] = c.indexOf(best);
        playTone(520, 0.04, 'square');
    }
}

function kbEnable() {
    if (!kbMode) { kbMode = true; document.body.classList.add('kb-mode'); }
}

function kbOK() {
    const ctx = kbCtx();
    if (!ctx) {                       // ゲーム画面：ヘッダー選択中なら決定、それ以外は釣り操作
        if (kbFocus) kbFocus.click(); else handleAction();
        return;
    }
    if (ctx.title) { goToMenu(); return; }
    if (ctx.zoom) { closeZoomModal(); return; }
    if (ctx.result) {                 // 連打中の誤操作を防ぐため、初期状態では「次へ進む」のみ
        const next = byId('next-btn');
        if (!kbMoved || !kbFocus) { if (!next.disabled) closeResult(); return; }
        if (!kbFocus.disabled) kbFocus.click();
        return;
    }
    if (!kbFocus || !kbCands(ctx).includes(kbFocus)) { kbAutoFocus(ctx); return; }
    kbMemory[ctx.id] = kbCands(ctx).indexOf(kbFocus);
    kbFocus.click();
}

function kbBack() {
    const ctx = kbCtx();
    if (!ctx) {
        if (kbFocus) { kbSet(null); return; }
        if (gameState === 'READY') goToMenuFromHeader();
        return;
    }
    if (ctx.back) ctx.back();
}

window.addEventListener('keydown', (e) => {
    if (gameState === 'SPECIAL') return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const dirs = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' };
    if (dirs[e.code] || e.code === 'KeyZ' || e.code === 'KeyX' || e.code === 'Escape') {
        if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur();
    }
    if (dirs[e.code]) {
        e.preventDefault();
        kbEnable();
        kbMove(dirs[e.code]);
    } else if (e.code === 'KeyZ') {
        if (e.repeat) return;
        kbEnable();
        kbOK();
    } else if (e.code === 'KeyX' || e.code === 'Escape') {
        if (e.repeat) return;
        kbEnable();
        kbBack();
    }
});

['pointerdown', 'touchstart'].forEach(ev => window.addEventListener(ev, () => {
    if (kbMode) { kbMode = false; document.body.classList.remove('kb-mode'); }
}, true));

// 画面（モーダル）が切り替わったら選択位置を整える
setInterval(() => {
    const ctx = kbCtx();
    const id = ctx ? ctx.id : 'game';
    if (id !== kbCtxId) {
        kbCtxId = id;
        kbMoved = false;
        kbSet(null);
        if (kbMode) kbAutoFocus(ctx);
    } else if (kbFocus && kbMode && (!kbFocus.isConnected || !kbFocus.getClientRects().length)) {
        const mem = kbMemory[id];
        kbSet(null);
        const c = kbCands(ctx);
        kbSet(c[mem] || kbReading(c)[0] || null);
    }
}, 120);

function spinNormal(mode) {
    if (ngBusy) return;
    const times = mode === 10 ? 10 : 1;
    if (mode === 'free') {
        if (playerData.freeGachaDate === todayStr()) return;
    } else if (playerData.gold < times * NG_COST) { gameAlert("ゴールドが足りません！"); return; }
    ngBusy = true;
    if (mode === 'free') playerData.freeGachaDate = todayStr(); else playerData.gold -= times * NG_COST;
    const total = NG_POOL.reduce((s, x) => s + x.w, 0), out = [];
    for (let i = 0; i < times; i++) {
        let r = Math.random() * total, it = NG_POOL[0];
        for (const x of NG_POOL) { if (r < x.w) { it = x; break; } r -= x.w; }
        if (times === 10 && i === 9 && !out.some(o => o.tier >= 2)) it = NG_POOL[2 + Math.floor(Math.random() * 3)];
        out.push(it);
    }
    let g = 0;
    out.forEach(o => {
        if (o.gold) g += o.gold;
        if (o.item) addItem(o.item[0], o.item[1]);
        if (o.buff) addBuff(o.buff[0], o.buff[1]);
    });
    playerData.gold += g;
    playerData.normalGachaCount = (playerData.normalGachaCount || 0) + times;
    addMission('gacha', times);
    savePlayerData();
    updateMenuUI();
    const best = Math.max(...out.map(o => o.tier));
    const scr = byId('gacha-screen'), res = byId('ng-result'), fl = byId('ng-flash');
    res.style.display = 'none';
    scr.classList.add('ng-shake');
    playTone(300, 0.1, 'square'); setTimeout(() => playTone(420, 0.1, 'square'), 120); setTimeout(() => playTone(560, 0.12, 'square'), 240);
    setTimeout(() => {
        scr.classList.remove('ng-shake');
        fl.classList.remove('on'); void fl.offsetWidth; fl.classList.add('on');
        playSE(best >= 3 ? 'levelup' : 'success');
        const grid = out.map((o, i) => `<div class="ng-card tier${o.tier}" style="animation-delay:${i * 0.09}s"><div class="ng-ico">${fxi(o.fx, times === 1 ? 64 : 34, o.ico)}</div><div class="ng-name">${o.label}</div>${o.desc && times === 1 ? `<div class="ng-desc">${o.desc}</div>` : ''}${o.tier >= 2 ? `<div class="ng-rank">${NG_TIER_LABEL[o.tier]}</div>` : ''}</div>`).join('');
        res.innerHTML = `${best >= 4 ? '<div class="ng-jackpot">✨ 大当たり！ ✨</div>' : ''}${g ? `<div class="ng-total">ゴールド <b>+${Number(g).toLocaleString()}</b> G</div>` : ''}<div class="ng-grid ${times === 1 ? 'single' : ''}">${grid}</div><button class="btn ng-close" onclick="closeNgResult()">OK</button>`;
        res.style.display = 'block';
        res.scrollTop = 0;
        renderNormalGacha();
        checkAchievements();
        updateHud();
        ngBusy = false;
    }, 800);
}

function openWorkshop() {
    initAudio();
    closeAllModals();
    byId('menu-screen').style.display = 'none';
    byId('workshop-screen').style.display = 'flex';
    setWsTab(wsTab);
    playWaterPlop();
}
function closeWorkshop() {
    byId('workshop-screen').style.display = 'none';
    byId('menu-screen').style.display = 'flex';
    gameState = 'MENU';
    updateMenuUI();
}
function setWsTab(tab) {
    wsTab = tab;
    byId('ws-tab-upg').classList.toggle('active', tab === 'upg');
    byId('ws-tab-boost').classList.toggle('active', tab === 'boost');
    byId('ws-gold').innerText = playerData.gold.toLocaleString();
    const box = byId('ws-list');
    box.innerHTML = '';
    const head = (txt) => { const h = document.createElement('div'); h.className = 'wk-sec'; h.innerText = txt; box.appendChild(h); };
    if (tab === 'upg') {
        byId('ws-note').innerText = 'ゴールドで道具を強化！ 最大 +10 まで。強化するほど効果が上がります。';
        const row = (kind, id, d) => {
            const lv = upgLv(id), max = lv >= UPG_MAX;
            const eq = (kind === 'rod' ? playerData.equippedRod : playerData.equippedNet) === id;
            const eff = kind === 'rod' ? `売値+${lv * 2}% ・ 反応+${(lv * 0.02).toFixed(2)}秒 ・ 連打+${(lv * 0.5).toFixed(1)}` : `輪+${lv * 3}% ・ 売値+${lv * 2}%`;
            const e = document.createElement('div');
            e.className = 'ws-row';
            e.innerHTML = `<img width="44" height="44" src="${d.icon}" onerror="this.style.visibility='hidden'"><div class="ws-info"><b>${d.name}</b> <span class="ws-lv">+${lv}/${UPG_MAX}</span>${eq ? '<span class="ws-eq">装備中</span>' : ''}<small>${eff}</small></div>
                <button class="btn" ${max || playerData.gold < upgCost(lv) ? 'disabled' : ''} onclick="buyUpgrade('${id}')">${max ? 'MAX' : upgCost(lv).toLocaleString() + 'G'}</button>`;
            box.appendChild(e);
        };
        head('🎣 竿');
        (playerData.ownedRods || []).forEach(id => ROD_DATA[id] && row('rod', id, ROD_DATA[id]));
        head('🥅 網');
        (playerData.ownedNets || []).forEach(id => NET_DATA[id] && row('net', id, NET_DATA[id]));
    } else {
        const act = Object.keys(BUFFS).filter(buffOn).map(k => `${BUFFS[k].ico}${BUFFS[k].name} 残り${Math.ceil(buffLeft(k) / 60000)}分`);
        if (itemCount('charm') > 0) act.push(`🧿お守り×${itemCount('charm')}`);
        if (itemCount('bait') > 0) act.push(`🪱特製まき餌×${itemCount('bait')}`);
        byId('ws-note').innerText = act.length ? '使用中：' + act.join(' ／ ') : '買ったブーストは、すぐに効果がはじまります。';
        SHOP_BOOST.forEach(b => {
            const e = document.createElement('div');
            e.className = 'ws-row';
            e.innerHTML = `<div class="ws-ico">${fxi(b.fx, 36, b.ico)}</div><div class="ws-info"><b>${b.name}</b><small>${b.desc}</small></div>
                <button class="btn" ${playerData.gold < b.price ? 'disabled' : ''} onclick="buyBoost('${b.id}')">${b.price.toLocaleString()}G</button>`;
            box.appendChild(e);
        });
    }
}

function applyLocationBg() {
    const map = MAP_DATA[currentLocation];
    if (!map) return;
    byId('game-container').style.backgroundImage = `url('${map.bg}')` + (map.bgFallback ? `, url('${map.bgFallback}')` : '');
    byId('current-location-text').innerText = `【${map.name}】`;
}

/* 図鑑の並び：竿 → 網。同じ種類の中では エリア順 → （とりにくい・大きい・高い生き物ほど後ろ） */
function zukanScore(f) { return Math.log((f.price || 1) + 1) + 0.7 * Math.log(getCm(f) + 1) - 0.9 * Math.log((f.weight || 1) + 1); }
function zukanCompare(a, b) {
    const keys = Object.keys(MAP_DATA);
    const ta = (a.toolType === 'net') ? 1 : 0, tb = (b.toolType === 'net') ? 1 : 0;
    if (ta !== tb) return ta - tb;
    const ia = keys.indexOf(a.location), ib = keys.indexOf(b.location);
    if (ia !== ib) return ia - ib;
    return zukanScore(a) - zukanScore(b) || a.id - b.id;
}

/* 実績の並び：関連するものを塊にして表示（絵巻コンプリート・データリセット・2周目クリアは最後） */
const ACH_GROUPS = [
    ['はじめの一歩', ['tutorial_done', 'first_catch']],
    ['🎣 竿で釣る', ['fisherman', 'king_fisher', 'combo_master', 'combo_10']],
    ['🥅 網で捕まえる', ['net_first', 'net_apprentice', 'net_master', 'net_combo_master']],
    ['⚡ 腕前', ['perfect_10', 'perfect_100', 'big_10', 'zorome', 'special_5']],
    ['📊 通算', ['thousand_catches', 'miss_master']],
    ['💰 お金・道具', ['rich_man', 'ultra_rich', 'buy_all_shop', 'comp_all_rods', 'comp_all_nets', 'comp_all_accs', 'upgrade_10', 'upgrade_max']],
    ['🗑 海のお掃除', ['trash_100']],
    ['📅 ミッション・ガチャ', ['mission_10', 'ngacha_20']],
    ['🗺 エリア', ['all_maps']],
    ['📖 エリアの図鑑コンプリート', ['comp_sea', 'comp_river', 'comp_swamp', 'comp_lake', 'comp_snow', 'comp_underground', 'comp_deepsea', 'comp_volcano', 'comp_honey', 'comp_holy', 'comp_ryugu', 'comp_ruins', 'comp_poison', 'comp_milkyway', 'comp_eldorado', 'comp_shinju']],
    ['🔍 ひみつ', ['secret_logo', 'secret_menu', 'secret_level', 'secret_weather', 'secret_gold', 'secret_zukan', 'secret_sound']],
    ['👑 最終章', ['zukan_master', 'hero_reincarnation', 'returned_friend']]
];
function achOrder() {
    const used = new Set(), out = [];
    ACH_GROUPS.forEach(([title, ids]) => {
        const list = ids.filter(id => ACHIEVEMENT_DATA[id]);
        list.forEach(id => used.add(id));
        out.push([title, list]);
    });
    const rest = Object.keys(ACHIEVEMENT_DATA).filter(id => !used.has(id));   // 新しく追加した実績は「その他」へ（最終章の手前）
    if (rest.length) out.splice(out.length - 1, 0, ['その他', rest]);
    return out;
}
function renderAchievementList() {
    const keys = Object.keys(ACHIEVEMENT_DATA), got = (playerData.achievements || []).filter((k, i, a) => ACHIEVEMENT_DATA[k] && a.indexOf(k) === i);   // 存在しない/重複した実績IDは数えない
    const percent = keys.length ? Math.floor((got.length / keys.length) * 100) : 0;
    byId('achievement-progress-num').innerText = `${percent}% (${got.length}/${keys.length})`;
    byId('achievement-progress-bar-inner').style.width = `${percent}%`;
    const list = byId('achievement-list');
    list.innerHTML = playerData.hallOfFame ? '<button class="btn hof-btn" onclick="showClearModal(true)">👑 殿堂入りの間をみる</button>' : '';
    achOrder().forEach(([title, ids]) => {
        if (!ids.length) return;
        const h = document.createElement('div');
        h.className = 'ach-group';
        h.innerText = `${title}　${ids.filter(id => got.includes(id)).length}/${ids.length}`;
        list.appendChild(h);
        ids.forEach(key => {
            const ach = ACHIEVEMENT_DATA[key], ok = got.includes(key);
            const item = document.createElement('div');
            item.className = `achievement-item ${ok ? 'unlocked' : ''}`;
            const locked = (ach.secret || ach.shint) ? ('ひみつ… 🔍 ' + (ach.shint || '')) : (ach.hint || ach.desc);
            item.innerHTML = `<img class="achievement-icon" src="${ach.icon}" alt="Trophy"><div class="achievement-info">
                <span class="achievement-name">${ok ? ach.name : "？？？？？"}</span><span class="achievement-desc">${ok ? ach.desc : (ach.hint ? '💡 ' : '') + locked}</span></div>`;
            list.appendChild(item);
        });
    });
}

/* レアガチャ：演出つき・結果は画面中央に表示 */
let evBusy = false;
const _spinGacha = spinGacha;
window.spinGacha = function (count) {
    if (evBusy) return;
    const cost = count === 10 ? 10000 : 1000;
    if (playerData.gold < cost) { gameAlert("ゴールドが足りません！"); return; }
    evBusy = true;
    const scr = byId('gacha-screen'), fl = byId('ev-flash');
    byId('gacha-result-area').style.display = 'none';
    scr.classList.add('ev-shake');
    [260, 330, 400, 470, 540, 620].forEach((f, i) => setTimeout(() => playTone(f, 0.09, 'square'), i * 130));
    setTimeout(() => {
        scr.classList.remove('ev-shake');
        fl.classList.remove('on'); void fl.offsetWidth; fl.classList.add('on');
        _spinGacha(count);
        showGachaResultFx();
        evBusy = false;
    }, 900);
};
function closeGachaResult() { byId('gacha-result-area').style.display = 'none'; }
function showGachaResultFx() {
    const area = byId('gacha-result-area');
    area.style.display = 'flex';
    const cards = [...area.querySelectorAll('.gacha-result-card')];
    cards.forEach((c, i) => { c.style.animationDelay = `${0.25 + i * 0.12}s`; });
    const rank = cards.some(c => c.classList.contains('super-rare')) ? 3 : (cards.some(c => c.classList.contains('rare')) ? 2 : 1);
    const ban = byId('gr-banner');
    ban.className = 'rank' + rank;
    ban.innerText = rank === 3 ? '🌈 超・大当たり！！ 🌈' : (rank === 2 ? '✨ レア獲得！ ✨' : 'さあ、次こそ…！');
    const fx = byId('gr-fx');
    fx.innerHTML = '';
    if (rank >= 2) {
        const em = rank === 3 ? ['🌈', '✨', '⭐', '💎'] : ['✨', '⭐'];
        for (let i = 0; i < (rank === 3 ? 26 : 14); i++) {
            const s = document.createElement('span');
            s.innerText = pickOne(em);
            s.style.left = Math.random() * 100 + '%';
            s.style.animationDelay = (Math.random() * 1.2) + 's';
            s.style.fontSize = (14 + Math.random() * 16) + 'px';
            fx.appendChild(s);
        }
    }
    area.querySelector('.gr-panel').scrollTop = 0;
    if (rank === 3) shake();
}

/* ===================================================
   ボーナスエフェクト画像（images/effects/ に置くと自動で使われます。無い時は絵文字）
   =================================================== */
const FX_ICONS = {
    buff_frenzy: '⚡', buff_gold: '💰', buff_exp: '⭐', buff_big: '🌟', buff_super: '👑',
    item_charm: '🧿', item_bait: '🪱', coin_s: '🪙', coin_m: '💰', coin_l: '💎',
    combo: '🔥', streak_frenzy: '⚡', rank_perfect: '✨', rank_great: '👍', chest: '📦',
    reach: '👀', zorome: '🎰', special_win: '✨', area_complete: '🏅', tool_bonus: '🛠'
};
function fxi(key, size, emoji) {
    const e = emoji || FX_ICONS[key] || '★';
    const s = size || 18;
    return `<img class="fxi" src="images/effects/${key}.png" width="${s}" height="${s}" alt="" onerror="this.replaceWith(document.createTextNode('${e}'))">`;
}
function updateHud() {
    const c = (currentToolMode === 'rod' ? playerData.currentCombo : playerData.netCombo) || 0;
    let h = '';
    if (c >= 2) h += `<div class="hud-chip combo">${fxi('combo', 16)}${c}</div>`;
    if (weather !== 'clear' && !noWeatherArea(currentLocation)) h += `<div class="hud-chip">${weatherIconHtml(weather, 16)}${WEATHER[weather].name}</div>`;
    if (frenzy > 0) h += `<div class="hud-chip frenzy">${fxi('streak_frenzy', 16)}×${frenzy}</div>`;
    Object.keys(BUFFS).forEach(k => { if (buffOn(k)) h += `<div class="hud-chip buff">${fxi('buff_' + k, 16)}${Math.ceil(buffLeft(k) / 60000)}分</div>`; });
    if (itemCount('charm') > 0) h += `<div class="hud-chip buff">${fxi('item_charm', 16)}×${itemCount('charm')}</div>`;
    if (itemCount('bait') > 0) h += `<div class="hud-chip buff">${fxi('item_bait', 16)}×${itemCount('bait')}</div>`;
    byId('status-hud').innerHTML = h;
}

function giveSecret(id, gold, msg, opt) {
    if (!playerData.secrets) playerData.secrets = {};
    if (playerData.secrets[id]) { if (!(opt && opt.silentRepeat)) floatText('…もう知ってるね！', '#ccc'); return false; }
    playerData.secrets[id] = true;
    playerData.gold += gold;
    savePlayerData();
    updateMenuUI();
    playSE('levelup');
    floatText(`${msg}${gold ? `　+${Number(gold).toLocaleString()}G` : ''}`, '#ffd700', true);
    unlockAch(id);
    return true;
}

/* ---------- ミニゲームの枠（海賊船・水のデザイン。images/minigames/ の画像があれば重ねて使用） ---------- */
function ensureSpLayer() {
    if (byId('sp-layer')) return;
    const L = spEl('', byId('game-container'));
    L.id = 'sp-layer';
    L.style.cssText = 'display:none;position:absolute;left:0;top:0;right:0;bottom:0;z-index:70;background:rgba(2,14,30,.88);align-items:center;justify-content:center;';
    const water = "url('images/minigames/stage_water.png') center/cover no-repeat, radial-gradient(circle at 15% 85%,rgba(255,255,255,.16) 0 5px,transparent 6px), radial-gradient(circle at 82% 68%,rgba(255,255,255,.13) 0 4px,transparent 5px), radial-gradient(circle at 55% 92%,rgba(255,255,255,.13) 0 6px,transparent 7px), linear-gradient(#0f6a8c,#073a58 60%,#04243a)";
    L.innerHTML = `<div class="sp-box" style="position:relative;width:96%;max-width:96%;background:url('images/minigames/frame_board.png') center/100% 100% no-repeat, repeating-linear-gradient(90deg,#6a4322 0 22px,#5b391c 22px 24px);border:5px solid #2f1c0c;box-shadow:inset 0 0 0 3px #d8b66a,0 0 24px rgba(0,0,0,.8);border-radius:14px;padding:10px;box-sizing:border-box;display:flex;flex-direction:column;gap:6px;overflow:hidden;">
        <div class="sp-title" id="sp-title" style="font-size:clamp(19px,5vw,25px);color:#3b2410;text-align:center;font-weight:bold;background:url('images/minigames/title_ribbon.png') center/100% 100% no-repeat, linear-gradient(#f0cf7a,#b88a2c);border:3px solid #6a4a1a;border-radius:8px;padding:3px 8px;text-shadow:0 1px 0 #fff3c4;"></div>
        <div class="sp-say" id="sp-say" style="font-size:clamp(14px,3.8vw,18px);color:#3b2410;text-align:center;min-height:20px;background:rgba(255,244,214,.93);border-radius:6px;padding:3px 6px;font-weight:bold;"></div>
        <div style="position:relative;">
            <div class="sp-stage" id="sp-stage" style="position:relative;width:100%;height:clamp(250px,calc(var(--app-h,100dvh) - 270px),440px);background:${water};border:3px solid #d8b66a;border-radius:10px;overflow:hidden;touch-action:none;user-select:none;"></div>
        </div>
        <div class="sp-foot" style="display:flex;align-items:center;gap:8px;min-height:22px;"><div class="sp-hearts" id="sp-hearts" style="min-width:60px;font-size:13px;color:#ffe9b0;white-space:nowrap;text-shadow:1px 1px 0 #000;"></div><div class="sp-prog" style="flex:1;height:14px;background:#0b2a40;border:3px solid #d8b66a;border-radius:8px;overflow:hidden;"><div id="sp-prog-in" style="height:100%;width:0;background:linear-gradient(90deg,#2ec4b6,#ffd27a);"></div></div></div>
        <div class="sp-card" id="sp-card" style="display:none;position:absolute;left:0;top:0;right:0;bottom:0;z-index:5;background:linear-gradient(#0b3a58,#041a2c);flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px;text-align:center;"></div>
        <div class="sp-flash" id="sp-flash" style="position:absolute;left:0;right:0;top:40%;text-align:center;font-size:34px;font-weight:bold;opacity:0;pointer-events:none;z-index:6;"></div></div>`;
    const st = byId('sp-stage');
    const pos = (e) => { const r = st.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    st.addEventListener('pointerdown', e => { if (!spGame) return; try { st.setPointerCapture(e.pointerId); } catch (x) {} const [x, y] = pos(e); spGame.down && spGame.down(x, y); e.preventDefault(); });
    st.addEventListener('pointermove', e => { if (!spGame) return; const [x, y] = pos(e); spGame.move && spGame.move(x, y); });
    ['pointerup', 'pointercancel'].forEach(n => st.addEventListener(n, e => { if (spGame && spGame.up) spGame.up(); }));
    byId('sp-card').addEventListener('pointerdown', () => spCardOk());
}

/* ===================================================
   新ミニゲーム（ガチャエリアごとに別の仕掛け）
   火山：とびらをまもれ（FNAF風）／はちみつ：神経衰弱／聖なる泉：光の記憶／竜宮城：貝殻あて
   古代遺跡：石板ならべ／毒沼：毒のバルブ（ライツアウト）／天の川：まちがい探し／黄金郷：黄金のもぐら
   =================================================== */
const SPT_CELL = 'display:flex;align-items:center;justify-content:center;border-radius:14px;font-size:34px;user-select:none;background:linear-gradient(#1f86a3,#0d4f6c);border:3px solid #d8b66a;box-shadow:inset 0 0 10px rgba(255,255,255,.28),0 2px 0 #06222f;color:#fff;transition:transform .12s,background .2s,opacity .2s;box-sizing:border-box;line-height:1;';
function spGridBox(a, cols, rows, gap) {
    return spEl('', a.stage, { position: 'absolute', left: '10px', right: '10px', top: '10px', bottom: '10px', display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gridTemplateRows: `repeat(${rows},1fr)`, gap: (gap || 8) + 'px' });
}
function spCell(box, html, extra) { const e = document.createElement('div'); e.style.cssText = SPT_CELL + (extra || ''); e.innerHTML = html || ''; box.appendChild(e); return e; }
function spHit(cells, x, y) {
    const sr = byId('sp-stage').getBoundingClientRect();
    for (let i = 0; i < cells.length; i++) {
        const r = cells[i].getBoundingClientRect(), l = r.left - sr.left, tp = r.top - sr.top;
        if (x >= l && x <= l + r.width && y >= tp && y <= tp + r.height) return i;
    }
    return -1;
}
function mgImg(name, emoji, size) { return `<img src="images/minigames/${name}.png" width="${size}" height="${size}" alt="" style="object-fit:contain;image-rendering:pixelated;pointer-events:none;" onerror="this.replaceWith(document.createTextNode('${emoji}'))">`; }
// キーボード（矢印で選択・Zで決定）
function spCursor(g, cells, cols, press) {
    let cur = 0;
    const mark = () => cells.forEach((c, i) => { c.style.outline = i === cur ? '4px solid #fff' : 'none'; c.style.outlineOffset = '-4px'; });
    g.keyPress = (code) => {
        const n = cells.length;
        if (code === 'ArrowLeft') cur = (cur + n - 1) % n; else if (code === 'ArrowRight') cur = (cur + 1) % n;
        else if (code === 'ArrowUp') cur = (cur - cols + n) % n; else if (code === 'ArrowDown') cur = (cur + cols) % n;
        mark();
    };
    g.keyDown = () => press(cur);
    g.down = (x, y) => { const i = spHit(cells, x, y); if (i >= 0) press(i); };
    return g;
}


SPG.match = function (a, P) {
    const pairs = P.pairs || 4, icons = ['🍯', '🐝', '🌼', '🍓', '🧁', '🍰'].slice(0, pairs), deck = [...icons, ...icons].sort(() => Math.random() - 0.5);
    const mcols = pairs === 4 ? 4 : (pairs === 5 ? 5 : 4), box = spGridBox(a, mcols, 2 + (pairs === 6 ? 1 : 0), 8), cells = deck.map(d => spCell(box, d, pairs > 4 ? 'font-size:28px;' : ''));
    let phase = 'show', timer = (2.6 + (pairs - 4) * 0.5) / P.sp, open = [], matched = 0, lock = 0, lives = P.hp + 2;
    const down = (i) => { cells[i].innerHTML = '❓'; cells[i].style.background = 'linear-gradient(#a9792e,#6a431a)'; };
    a.hearts(lives); a.say('絵を覚えて！ すぐ裏返るよ'); a.prog(0);
    const press = (i) => {
        if (phase !== 'play' || lock > 0 || open.includes(i) || cells[i]._m) return;
        cells[i].innerHTML = deck[i]; cells[i].style.background = 'linear-gradient(#ffe9a0,#d8a53c)'; open.push(i); playSE('tap');
        if (open.length === 2) lock = 0.7;
    };
    const g = {
        update(dt) {
            if (phase === 'show') { timer -= dt; if (timer <= 0) { cells.forEach((c, i) => down(i)); phase = 'play'; a.say('同じ絵を2枚ずつそろえよう！'); } return; }
            if (lock > 0) {
                lock -= dt;
                if (lock <= 0) {
                    const [p, q] = open; open = [];
                    if (deck[p] === deck[q]) { cells[p]._m = cells[q]._m = true; cells[p].style.background = cells[q].style.background = 'linear-gradient(#7be0a0,#2a9a5a)'; matched++; a.prog(matched / pairs); a.flash('ペア！', '#7fff7f'); playSE('success'); if (matched >= pairs) a.win(); }
                    else { down(p); down(q); lives--; a.hearts(lives); a.flash('ちがう…', '#ff7777'); playSE('foul'); if (lives <= 0) a.lose(); }
                }
            }
        }
    };
    return spCursor(g, cells, mcols, press);
};

SPG.simon = function (a, P) {
    const nb = P.btn || 4, goalN = P.need || 4;
    const cols = [['#3a8dff', '🔵'], ['#ffd23a', '🟡'], ['#ff6bd0', '🟣'], ['#3aff8a', '🟢'], ['#ff7a3a', '🟠'], ['#b07aff', '🟤']].slice(0, nb), freq = [392, 494, 587, 784, 880, 988];
    const box = spGridBox(a, nb > 4 ? 3 : 2, 2, 10), cells = cols.map(([c, e]) => spCell(box, e, `background:${c};opacity:.5;font-size:46px;`));
    let round = 0, seq = [], pos = 0, phase = 'gap', timer = 0.9, showIdx = 0, lit = -1, lives = P.hp;
    const light = (i, on) => { cells[i].style.opacity = on ? 1 : 0.5; cells[i].style.transform = on ? 'scale(1.06)' : 'none'; if (on) playTone(freq[i], 0.25, 'triangle'); };
    const start = (fresh) => {
        if (fresh) { if (!seq.length) seq = [Math.floor(Math.random() * nb), Math.floor(Math.random() * nb)]; else seq.push(Math.floor(Math.random() * nb)); }   // 前の順番のまま、1つ足す
        phase = 'show'; showIdx = 0; lit = -1; timer = 0.7; a.say(`光る順番を覚えて…（${seq.length}こ）`);
    };
    a.hearts(lives); a.prog(0); a.say('よく見ていてね');
    const press = (i) => {
        if (phase !== 'input') return;
        light(i, true); setTimeout(() => light(i, false), 180);
        if (i === seq[pos]) {
            pos++;
            if (pos >= seq.length) { round++; a.prog(round / goalN); a.flash('せいかい！', '#7fff7f'); if (round >= goalN) return a.win(); phase = 'gap'; timer = 0.9; }
        } else {
            lives--; a.hearts(lives); a.flash('ちがう！', '#ff7777'); playSE('foul');
            if (lives <= 0) return a.lose(); phase = 'gap'; timer = 0.9; g._replay = true;
        }
    };
    const g = {
        update(dt) {
            timer -= dt;
            if (phase === 'gap' && timer <= 0) { start(!g._replay); g._replay = false; return; }
            if (phase === 'show' && timer <= 0) {
                if (lit >= 0) { light(lit, false); lit = -1; timer = 0.2; }
                else if (showIdx < seq.length) { lit = seq[showIdx++]; light(lit, true); timer = 0.55 / P.sp; }
                else { phase = 'input'; pos = 0; a.say('同じ順番にタップ！'); }
            }
        }
    };
    return spCursor(g, cells, nb > 4 ? 3 : 2, press);
};

SPG.shell = function (a, P) {
    const W = a.W, H = a.H, xs = [W * 0.2, W * 0.5, W * 0.8], baseTop = H * 0.42;
    const sh = [0, 1, 2].map(i => { const e = spEl('', a.stage, { position: 'absolute', top: baseTop + 'px', width: '84px', height: '70px', marginLeft: '-42px', left: xs[i] + 'px', fontSize: '60px', textAlign: 'center', lineHeight: '70px', transition: `left ${0.3 / P.sp}s ease-in-out, top .3s`, userSelect: 'none' }); e.innerHTML = mgImg('shell', '🐚', 64); return { e, slot: i }; });
    const pearl = spEl('', a.stage, { position: 'absolute', top: (baseTop + 30) + 'px', width: '30px', height: '30px', marginLeft: '-15px', fontSize: '26px', textAlign: 'center', lineHeight: '30px', opacity: 0, transition: 'opacity .2s' });
    pearl.innerHTML = mgImg('pearl', '⚪', 28);
    let round = 0, lives = P.hp, phase = 'idle', timer = 0.5, swaps = 0, pearlShell = 0;
    const place = () => { sh.forEach(s => { s.e.style.left = xs[s.slot] + 'px'; }); pearl.style.left = xs[sh[pearlShell].slot] + 'px'; };
    const lift = (s, up) => { s.e.style.top = (up ? baseTop - 34 : baseTop) + 'px'; };
    const begin = () => { sh.forEach((s, i) => { s.slot = i; lift(s, false); }); pearlShell = Math.floor(Math.random() * 3); place(); pearl.style.opacity = 1; lift(sh[pearlShell], true); phase = 'show'; timer = 1.2; swaps = 3 + round * 2 + (P.sp > 1.1 ? 2 : 0) + (P.extra || 0); a.say('真珠の場所を覚えて！'); };
    a.hearts(lives); a.prog(0);
    const g = {
        update(dt) {
            timer -= dt;
            if (phase === 'idle' && timer <= 0) { begin(); return; }
            if (phase === 'show' && timer <= 0) { lift(sh[pearlShell], false); pearl.style.opacity = 0; phase = 'shuffle'; timer = 0.35; a.say('目で追って…'); return; }
            if (phase === 'shuffle' && timer <= 0) {
                if (swaps <= 0) { phase = 'pick'; a.say('真珠はどれ？ タップ！'); return; }
                const i = Math.floor(Math.random() * 3); let j = (i + 1 + Math.floor(Math.random() * 2)) % 3;
                const A = sh.find(s => s.slot === i), B = sh.find(s => s.slot === j);
                A.slot = j; B.slot = i; swaps--; place(); timer = 0.38 / P.sp;
            }
            if (phase === 'result' && timer <= 0) { if (round >= 3) return a.win(); phase = 'idle'; timer = 0.3; }
        },
        down(x) {
            if (phase !== 'pick') return;
            let best = -1, bd = 60; sh.forEach((s, i) => { const d = Math.abs(xs[s.slot] - x); if (d < bd) { bd = d; best = i; } });
            if (best < 0) return;
            phase = 'result'; timer = 1.1; pearl.style.left = xs[sh[pearlShell].slot] + 'px'; pearl.style.opacity = 1; lift(sh[pearlShell], true);
            if (best === pearlShell) { round++; a.prog(round / 3); a.flash('あたり！', '#7fff7f'); playSE('success'); }
            else { lift(sh[best], true); lives--; a.hearts(lives); a.flash('はずれ…', '#ff7777'); playSE('foul'); if (lives <= 0) { phase = 'dead'; return a.lose(); } }
        },
        keyPress(code) { g._k = ((g._k || 1) + (code === 'ArrowRight' ? 1 : code === 'ArrowLeft' ? 2 : 0)) % 3; },
        keyDown() { g.down(xs[g._k === undefined ? 1 : g._k]); }
    };
    return g;
};



SPG.odd = function (a, P) {
    const dims = [[3, 3], [4, 4], [5, 4], [6, 5], [6, 6]], syms = [['⭐', '🌟'], ['🌙', '🌛'], ['💫', '✨'], ['⭐', '🌟'], ['🌙', '🌛'], ['💫', '✨']], off = P.off || 0;
    let r = 0, lives = P.hp, cells = [], odd = 0, time = 0, limit = 7 / P.sp, box = null;
    const g = { update(dt) { time -= dt; if (time <= 0) miss(); } };
    const build = () => {
        a.stage.innerHTML = ''; const [c, rw] = dims[Math.min(dims.length - 1, r + off)]; box = spGridBox(a, c, rw, 6);
        cells = []; odd = Math.floor(Math.random() * c * rw);
        for (let i = 0; i < c * rw; i++) cells.push(spCell(box, i === odd ? syms[(r + off) % 6][1] : syms[(r + off) % 6][0], `font-size:${c > 5 ? 17 : (c > 4 ? 22 : 28)}px;`));
        time = limit; a.say(`ちがう星はどれ？（${r + 1}/3問）`); a.hearts(lives); a.prog(r / 3);
        spCursor(g, cells, c, press);
    };
    const miss = () => { lives--; a.hearts(lives); a.flash('ちがう！', '#ff7777'); playSE('foul'); if (lives <= 0) return a.lose(); build(); };
    const press = (i) => { if (i === odd) { r++; playSE('success'); if (r >= 3) { a.prog(1); return a.win(); } build(); } else miss(); };
    build();
    return g;
};

SPG.pop = function (a, P) {
    const box = spGridBox(a, 3, 3, 8), cells = Array.from({ length: 9 }, () => spCell(box, '', 'background:radial-gradient(#2a1a0c,#0c0702);border-color:#8a6a2a;'));
    const need = P.sp > 1.1 ? 9 : (P.sp < 0.9 ? 6 : 8); let score = 0, lives = P.hp, time = 26, spawn = 0.5; const items = Array(9).fill(null);
    const clear = (i) => { items[i] = null; cells[i].innerHTML = ''; cells[i].style.background = 'radial-gradient(#2a1a0c,#0c0702)'; };
    a.hearts(lives); a.prog(0); a.say(`黄金の魚を${need}匹！ 爆弾はNG`);
    const press = (i) => {
        const it = items[i]; if (!it) return;
        if (it.t === 'gold') { score++; a.prog(score / need); playSE('tap'); clear(i); if (score >= need) a.win(); }
        else { lives--; a.hearts(lives); a.flash('ドカーン！', '#ff7777'); playSE('foul'); triggerVibration(120); clear(i); if (lives <= 0) a.lose(); }
    };
    const g = {
        update(dt) {
            time -= dt; spawn -= dt;
            if (spawn <= 0) {
                const free = items.map((v, i) => v ? -1 : i).filter(i => i >= 0);
                if (free.length) {
                    const i = pickOne(free), gold = Math.random() < 0.72;
                    items[i] = { t: gold ? 'gold' : 'bomb', life: 1.1 / P.sp };
                    cells[i].innerHTML = gold ? mgImg('gold_fish', '🐟', 44) : mgImg('bomb', '💣', 44);
                    cells[i].style.background = gold ? 'linear-gradient(#ffe27a,#c8901a)' : 'linear-gradient(#6a2a2a,#2a0a0a)';
                }
                spawn = 0.55 / P.sp;
            }
            items.forEach((it, i) => { if (it) { it.life -= dt; if (it.life <= 0) clear(i); } });
            a.hudText(`のこり ${Math.max(0, Math.ceil(time))}秒　${score}/${need}`);
            if (time <= 0) a.lose();
        }
    };
    return spCursor(g, cells, 3, press);
};

SPG.run = function (a, P) {
    const W = a.W, H = a.H, trackY = H * 0.6, x0 = 28, x1 = W - 46;
    spEl('', a.stage, { position: 'absolute', left: (x0 - 6) + 'px', width: (x1 - x0 + 40) + 'px', top: (trackY + 30) + 'px', height: '10px', borderRadius: '6px', background: 'linear-gradient(#8a6a3a,#4a3418)' });
    spEl('', a.stage, { position: 'absolute', left: 0, right: 0, bottom: 0, height: '34px', background: 'linear-gradient(#ff7a1a,#b3200a)', opacity: 0.85 });
    const goal = spEl('', a.stage, { position: 'absolute', left: (x1 + 4) + 'px', top: (trackY - 24) + 'px', fontSize: '34px' }); goal.innerText = '🏁';
    const runner = spEl('', a.stage, { position: 'absolute', top: (trackY - 20) + 'px', fontSize: '38px', transition: 'left .06s linear' }); runner.innerHTML = mgImg('runner', '🏃', 40);
    const lamp = spEl('', a.stage, { position: 'absolute', left: (W / 2 - 46) + 'px', top: '14px', width: '92px', height: '40px', borderRadius: '20px', border: '3px solid #d8b66a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 'bold', color: '#fff' });
    let pos = 0, phase = 'go', timer = (1.6 + Math.random()) / 1, holding = false, hp = P.hp, penal = false, time = 24 / Math.pow(P.sp, 0.6) * (P.timeMul || 1);
    const setPhase = (p) => {
        phase = p; penal = false;
        if (p === 'go') { timer = (1.4 + Math.random() * 1.1); lamp.style.background = '#2fbf5a'; lamp.innerText = 'GO!'; }
        else if (p === 'warn') { timer = 0.6 / P.sp; lamp.style.background = '#e8b81c'; lamp.innerText = 'もうすぐ！'; }
        else { timer = (1.0 + Math.random() * 0.7) * (P.sp > 1.1 ? 1.2 : 1); lamp.style.background = '#d62a2a'; lamp.innerText = 'ストップ！'; }
    };
    setPhase('go'); a.hearts(hp); a.prog(0);
    const g = {
        update(dt) {
            time -= dt; timer -= dt;
            if (timer <= 0) setPhase(phase === 'go' ? 'warn' : (phase === 'warn' ? 'stop' : 'go'));
            if (holding) {
                if (phase === 'stop') {
                    if (!penal) { penal = true; hp--; a.hearts(hp); pos = Math.max(0, pos - 0.1); a.flash('あちち！', '#ff7777'); playSE('foul'); triggerVibration(120); if (hp <= 0) return a.lose(); }
                } else pos = Math.min(1, pos + dt * 0.19);
            }
            runner.style.left = (x0 + (x1 - x0) * pos) + 'px';
            runner.style.transform = holding && phase !== 'stop' ? `translateY(${Math.sin(time * 18) * 3}px)` : 'none';
            a.prog(pos);
            a.say(phase === 'stop' ? '赤！ 手をはなして止まれ！' : (holding ? '走れ走れ！' : '長押しで走る！'));
            if (pos >= 1) a.win(); else if (time <= 0) a.lose();
        },
        down() { holding = true; }, up() { holding = false; }, keyDown() { holding = true; }
    };
    return g;
};

SPG.deliver = function (a, P) {
    const W = a.W, H = a.H, sw = (W - 20) / 3, need = P.sp > 1.1 ? 6 : (P.sp < 0.9 ? 4 : 5);
    const slots = [0, 1, 2].map(i => { const e = spEl('', a.stage, { position: 'absolute', left: (10 + i * sw + 4) + 'px', width: (sw - 8) + 'px', bottom: '12px', height: '84px', borderRadius: '14px', border: '3px solid #d8b66a', background: 'linear-gradient(#3b6a2a,#1d3a14)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '34px', transition: 'background .2s, transform .2s' }); e.innerHTML = '🐟'; return e; });
    const tray = spEl('', a.stage, { position: 'absolute', top: '20px', width: '44px', height: '44px', marginLeft: '-22px', fontSize: '34px', textAlign: 'center', lineHeight: '44px' }); tray.innerHTML = mgImg('potion', '💊', 40);
    const drop = spEl('', a.stage, { position: 'absolute', width: '44px', height: '44px', marginLeft: '-22px', fontSize: '34px', textAlign: 'center', lineHeight: '44px', opacity: 0, transition: 'top .32s ease-in' }); drop.innerHTML = mgImg('potion', '💊', 40);
    let x = W * 0.2, dir = 1, wanted = 0, score = 0, lives = P.hp, cool = 0, falling = null; const speed = W / (1.5 / P.sp);
    const want = () => { wanted = Math.floor(Math.random() * 3); slots.forEach((s, i) => { s.style.background = i === wanted ? 'linear-gradient(#7a2a6a,#401040)' : 'linear-gradient(#3b6a2a,#1d3a14)'; s.style.transform = i === wanted ? 'scale(1.05)' : 'none'; s.innerHTML = i === wanted ? '😵<div style="font-size:12px;font-weight:bold;">助けて！</div>' : '🐟'; }); };
    want(); a.hearts(lives); a.prog(0); a.say(`光る生き物の真上でタップ！ ${need}回成功で捕獲`);
    const g = {
        update(dt) {
            x += dir * speed * dt; if (x >= W - 24) { x = W - 24; dir = -1; } if (x <= 24) { x = 24; dir = 1; }
            tray.style.left = x + 'px';
            cool -= dt;
            if (falling) { falling.t -= dt; if (falling.t <= 0) {
                const idx = Math.max(0, Math.min(2, Math.floor((falling.x - 10) / sw)));
                drop.style.opacity = 0; falling = null;
                if (idx === wanted) { score++; a.prog(score / need); a.flash('ありがとう！', '#7fff7f'); playSE('success'); if (score >= need) return a.win(); }
                else { lives--; a.hearts(lives); a.flash('ちがう！', '#ff7777'); playSE('foul'); if (lives <= 0) return a.lose(); }
                want(); cool = 0.3;
            } }
        },
        down() { g.drop(); }, keyDown() { g.drop(); },
        drop() { if (falling || cool > 0) return; drop.style.transition = 'none'; drop.style.left = x + 'px'; drop.style.top = '64px'; drop.style.opacity = 1; void drop.offsetWidth; drop.style.transition = 'top .32s ease-in'; drop.style.top = (H - 110) + 'px'; falling = { x, t: 0.34 }; playSE('tap'); }
    };
    return g;
};

SPG.sort = function (a, P) {
    const N = P.n || 5, runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚷ', 'ᚹ'].slice(0, N), k = P.sp < 0.9 ? 4 : (P.sp > 1.1 ? 7 : 5);
    const W = a.W, gap = N > 5 ? 5 : 8, tw = (W - 20 - gap * (N - 1)) / N, th = Math.min(120, tw * 1.55), top = (a.H - th) / 2 + 14;
    const slotX = (i) => 10 + i * (tw + gap);
    let vals = Array.from({ length: N }, (_, i) => i + 1), sel = -1, cur = 0, busy = 0;
    for (let n = 0; n < k + (N - 5) * 2; n++) { const i = Math.floor(Math.random() * (N - 1)); [vals[i], vals[i + 1]] = [vals[i + 1], vals[i]]; }
    if (vals.every((v, i) => v === i + 1)) { [vals[0], vals[1]] = [vals[1], vals[0]]; }
    let moves = k + (N - 5) * 3 + (P.sp < 0.9 ? 6 : (P.sp > 1.1 ? 2 : 4));
    const goal = spEl('', a.stage, { position: 'absolute', left: '10px', right: '10px', top: '14px', textAlign: 'center', fontSize: '15px', color: '#ffe9a0', textShadow: '1px 1px 0 #000' }); goal.innerText = runes.join(' → ');
    const tabs = {};   // 石板（数字ごと）。位置が変わると、左右にすべるように動く
    for (let v = 1; v <= N; v++) {
        const e = spEl('', a.stage, { position: 'absolute', top: top + 'px', width: tw + 'px', height: th + 'px', borderRadius: '10px', border: '3px solid #bba777', background: 'linear-gradient(#9b988f,#55524c)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 10px rgba(255,255,255,.25),0 3px 0 #2a2824', transition: 'left .3s cubic-bezier(.3,1.5,.5,1), transform .2s, border-color .2s, box-shadow .2s', userSelect: 'none' });
        e.innerHTML = `<div style="font-size:30px;line-height:1.1;">${runes[v - 1]}</div><div style="font-size:18px;">${v}</div>`;
        tabs[v] = e;
    }
    const place = () => {
        vals.forEach((v, i) => { const e = tabs[v]; e.style.left = slotX(i) + 'px'; const ok = v === i + 1; e.style.borderColor = ok ? '#7be0a0' : '#bba777'; e.style.boxShadow = ok ? '0 0 12px #7be0a0,inset 0 0 10px rgba(255,255,255,.25),0 3px 0 #2a2824' : 'inset 0 0 10px rgba(255,255,255,.25),0 3px 0 #2a2824'; e.style.transform = (i === sel) ? 'translateY(-14px) scale(1.06)' : 'none'; e.style.outline = (g._kb && i === cur) ? '4px solid #fff' : 'none'; });
        a.hudText(`のこり ${moves}回`);
    };
    const press = (i) => {
        if (busy > 0) return;
        if (sel < 0) { sel = i; playSE('tap'); place(); return; }
        if (sel === i) { sel = -1; place(); return; }
        if (Math.abs(sel - i) !== 1) { sel = i; place(); return; }
        const s = sel; [vals[s], vals[i]] = [vals[i], vals[s]]; sel = -1; moves--; busy = 0.32; playSE('tap');
        const A = tabs[vals[s]], B = tabs[vals[i]];
        A.style.transform = 'translateY(-16px)'; B.style.transform = 'translateY(14px)';   // 片方は浮き、片方は沈みながら入れかわる
        place(); A.style.transform = 'translateY(-16px)'; B.style.transform = 'translateY(14px)';
        setTimeout(() => { place(); }, 190);
        const done = vals.filter((v, n) => v === n + 1).length; a.prog(done / N);
        if (done === N) { busy = 9; setTimeout(() => a.win(), 450); }
        else if (moves <= 0) { busy = 9; a.flash('回数切れ…', '#ff7777'); setTimeout(() => a.lose(), 450); }
    };
    a.say(`となり同士を入れかえて、1→${N}の順に並べよう`); a.prog(0);
    const g = {
        update(dt) { if (busy > 0 && busy < 8) busy -= dt; },
        down(x) { const i = Math.floor((x - 10) / (tw + gap)); if (i >= 0 && i < N) press(i); },
        keyPress(code) { g._kb = true; if (code === 'ArrowLeft') cur = (cur + N - 1) % N; if (code === 'ArrowRight') cur = (cur + 1) % N; place(); },
        keyDown() { press(cur); }
    };
    place();
    return g;
};

function clearZukanNew() {
    Object.keys(caughtFish).forEach(k => { if (caughtFish[k]) caughtFish[k].isNew = false; });
    localStorage.setItem('retro_fishing_zukan_v4', JSON.stringify(caughtFish));
    renderZukanGrid();
    renderZukanSubFilterUI();
    updateMenuUI();
    playSE('tap');
}

/* ===================================================
   アクセサリー（追加分）  画像は images/acc/<id>.png
   slot … rodAcc=釣り糸等 / bait=エサ / netAcc=網の補助 / netReel=網の飾り
   =================================================== */
const ACC_SLOT_LEGACY = { line_tough: 'rodAcc', bait_reel: 'rodAcc', maki_esa: 'bait', net_tough: 'netAcc', net_fixed: 'netReel' };
const accSlot = (i) => i.slot || ACC_SLOT_LEGACY[i.id];
const ACC_NEW = {
    float: { name: 'うき', price: 8000, slot: 'rodAcc', emoji: '🎈', desc: '竿用。ニセのアタリが出にくくなる（発生率-70%）。' },
    scope: { name: '遠眼鏡', price: 14000, slot: 'rodAcc', emoji: '🔭', desc: '竿用。PERFECT・GREATの判定が25%ゆるくなる。' },
    compass: { name: '羅針盤', price: 20000, slot: 'rodAcc', emoji: '🧭', desc: '竿用。特別な戦い（ミニゲーム）で、ミスできる回数+1。' },
    glow_bait: { name: '光るエサ', price: 9000, slot: 'bait', emoji: '✨', desc: 'エサ枠。大物が出やすくなる（×1.3）。' },
    gold_lure: { name: '金のルアー', price: 16000, slot: 'bait', emoji: '🪙', desc: 'エサ枠。売値+8%。' },
    exp_bait: { name: '賢者のミミズ', price: 12000, slot: 'bait', emoji: '🪱', desc: 'エサ枠。獲得EXP+15%。' },
    net_pole: { name: 'のびる柄', price: 14000, slot: 'netAcc', emoji: '📏', desc: '網用。空振りできる回数+1。' },
    lantern: { name: '水中ランタン', price: 12000, slot: 'netAcc', emoji: '🏮', desc: '網用。魚の動きが12%ゆっくりになる。' },
    net_scope: { name: '網用スコープ', price: 14000, slot: 'netAcc', emoji: '🎯', desc: '網用。PERFECT・GREATの判定が25%ゆるくなる。' },
    net_buoy: { name: 'ブイ', price: 11000, slot: 'netReel', emoji: '🛟', desc: '網用。輪が8%大きくなる。' },
    net_gold: { name: '金の網かざり', price: 16000, slot: 'netReel', emoji: '🏅', desc: '網用。売値+8%。' }
};
Object.keys(ACC_NEW).forEach(k => { ACC_DATA[k] = Object.assign({ id: k, icon: `images/acc/${k}.png` }, ACC_NEW[k]); });
// 画像が無い間は絵文字で表示（装備画面・ショップ）
document.addEventListener('error', (e) => {
    const im = e.target;
    if (!im || im.tagName !== 'IMG' || im.dataset.fb) return;
    const m = (im.getAttribute('src') || '').match(/images\/acc\/([^/.]+)\.png/);
    if (!m || !ACC_NEW[m[1]]) return;
    im.dataset.fb = '1';
    im.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="72" font-size="64" text-anchor="middle">${ACC_NEW[m[1]].emoji}</text></svg>`);
}, true);

/* ===================================================
   デイリーミッションの引き直し（100,000G・何度でも）
   =================================================== */
const REROLL_COST = 100000;
async function rerollMissions() {
    if (playerData.gold < REROLL_COST) { gameAlert('ゴールドが足りません（100,000G）'); return; }
    if (!(await gameConfirm('100,000Gを払って、ミッションを引き直しますか？\n（いまの進み具合はリセットされます）', { yes: '引き直す', no: 'やめる' }))) return;
    playerData.gold -= REROLL_COST;
    const before = (playerData.daily && playerData.daily.list || []).join();
    let ids;
    for (let n = 0; n < 8; n++) { ids = MISSION_POOL.map(m => m.id).sort(() => Math.random() - 0.5).slice(0, 3); if (ids.slice().sort().join() !== before.split(',').sort().join()) break; }
    playerData.daily = { date: todayStr(), list: ids, prog: {}, claimed: [] };
    savePlayerData();
    renderMissions();
    updateMenuUI();
    playSE('success');
}

/* 画像が読み込めない時の代わりの表示（ショップ・装備画面の共通） */
function imgFallback(im) {
    if (im.dataset.fb) return;
    im.dataset.fb = '1';
    im.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="72" font-size="64" text-anchor="middle">🎒</text></svg>');
}


/* ===================================================
   Ver 3.0.1  ゴミ・小瓶・宝箱 ／ 最強アクセサリー ／ 実績
   ---------------------------------------------------
   ・ニセのアタリ（ぴくっ…？）が来ると、「違った」の代わりにゴミが釣れる（全エリア）
   ・ゴミの中から、ごくまれに「手紙入りの小瓶」「宝箱」
   ・小瓶の手紙に書かれた言葉を 設定の「コード入力」に入れると、イベントエリアの解放やアイテム入手
   ・合言葉の一覧・イベントエリアのデータは events.js にまとめてあります
   =================================================== */

/* ---------- 最強アクセサリー：他のアクセサリーの効果を全部持つ ---------- */
const ACC_ULT = {
    ult_rod: ['line_tough', 'bait_reel', 'scope', 'compass', 'magnet'],
    ult_bait: ['maki_esa', 'glow_bait', 'gold_lure', 'exp_bait', 'trash_bait'],
    ult_net: ['net_tough', 'net_pole', 'lantern', 'net_scope'],
    ult_reel: ['net_fixed', 'net_buoy', 'net_gold']
};
// いま装備している（今のモードの）アクセサリーが、その効果を持つか
function fxHas(id) {
    const p = playerData;
    const slots = currentToolMode === 'rod' ? [p.equippedRodAcc, p.equippedBait] : [p.equippedNetAcc, p.equippedNetReel];
    return slots.some(e => e === id || (ACC_ULT[e] && ACC_ULT[e].includes(id)));
}
Object.assign(ACC_NEW, {
    magnet: { name: 'ゴミよせマグネット', price: 15000, slot: 'rodAcc', emoji: '🧲', desc: '竿用。ニセのアタリ（ゴミ）が来やすくなる（約2.5倍）。小瓶や宝箱を狙おう。' },
    trash_bait: { name: 'ゴミよせのエサ', price: 15000, slot: 'bait', emoji: '🧴', desc: 'エサ枠。ゴミの中から「小瓶」「宝箱」が出る確率が3倍。' },
    ult_rod: { name: '究極の釣り糸', price: 150000, slot: 'rodAcc', emoji: '🌈', desc: '竿用の全能力：ミス20%無効・連打+5・PERFECT判定25%ゆるく・特別な戦いのミス+1・ゴミよせ。（うきの代わりにゴミよせ）' },
    ult_bait: { name: '究極のエサ', price: 120000, slot: 'bait', emoji: '🍣', desc: 'エサ枠の全能力：待ち時間-20%・大物×1.3・売値+8%・EXP+15%・小瓶/宝箱3倍。' },
    ult_net: { name: '究極の補助ネット', price: 110000, slot: 'netAcc', emoji: '🕸', desc: '網の補助の全能力：空振り20%救済・空振り回数+1・魚の動き12%ゆっくり・PERFECT判定25%ゆるく。' },
    ult_reel: { name: '究極の網かざり', price: 90000, slot: 'netReel', emoji: '👑', desc: '網かざりの全能力：輪+15%と+8%・売値+8%・特別な戦いが少し楽に。' }
});
Object.keys(ACC_NEW).forEach(k => { if (!ACC_DATA[k]) ACC_DATA[k] = Object.assign({ id: k, icon: `images/acc/${k}.png` }, ACC_NEW[k]); });
Object.assign(ACC_DATA.float, { desc: '竿用。ニセのアタリ（ゴミ）が出にくくなる（発生率-70%）。' });

/* ---------- ゴミ ---------- */
const TRASH_LIST = [
    { k: 'kutu', name: '片方だけのくつ', emoji: '👞', say: '持ち主はどこへ…？' },
    { k: 'kan', name: 'さびた空き缶', emoji: '🥫', say: '水辺は、みんなの場所だよ！' },
    { k: 'tire', name: '古いタイヤ', emoji: '⭕', say: 'ずっしり重い…！' },
    { k: 'ryuuboku', name: '流木', emoji: '🪵', say: 'どこから流れてきたのかな。' },
    { k: 'kire', name: 'ぼろ布', emoji: '🧦', say: 'ぐっしょり濡れている。' },
    { k: 'kaisou', name: 'からまった海藻', emoji: '🌿', say: 'ゴミ…？ でも元気そう。' }
];
const trashImg = (k) => `images/trash/trash_${k}.png`;
const TRASH_RARE = { bottle: 0.015, chest: 0.015 };        // ゴミ1回あたり（アクセサリーなしの時）
const BOTTLE_IMG = 'images/trash/trash_bin.png', CHEST_IMG = 'images/trash/trash_takarabako.png';
const emojiSvg = (e) => 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="72" font-size="64" text-anchor="middle">${e}</text></svg>`);
function imgEmoji(im, e) { if (im.dataset.fb) return; im.dataset.fb = '1'; im.src = emojiSvg(e); }

function showTrashPop(it) {
    let el = byId('trash-pop');
    if (!el) { el = document.createElement('div'); el.id = 'trash-pop'; byId('game-container').appendChild(el); }
    el.innerHTML = `<img src="${trashImg(it.k)}" width="76" height="76" alt="" onerror="imgEmoji(this,'${it.emoji}')"><div class="tp-name">🗑 ${it.name}を釣り上げた！</div><div class="tp-say">${it.say}</div><div class="tp-cnt">お掃除 ${playerData.trashCount || 0} こ目</div>`;
    el.classList.remove('on'); void el.offsetWidth; el.classList.add('on');
}
function hideTrashPop() { const el = byId('trash-pop'); if (el) el.classList.remove('on'); }

// ニセのアタリの結果。force = 'trash' | 'bottle' | 'chest'（テスト用）
function haulTrash(force) {
    hideFishShadow();
    byId('ripple-effect').style.display = 'none';
    byId('exclamation').style.display = 'none';
    const p = playerData;
    p.trashCount = (p.trashCount || 0) + 1;
    const luck = fx().trashLuck || 1;
    let kind = force;
    if (!kind) {
        const r = Math.random();
        kind = r < TRASH_RARE.bottle * luck ? 'bottle' : (r < (TRASH_RARE.bottle + TRASH_RARE.chest) * luck ? 'chest' : 'trash');
    }
    savePlayerData();
    checkAchievements();
    if (kind === 'bottle') { playSE('levelup'); openBottle(); return; }
    if (kind === 'chest') { playSE('levelup'); openChest(); return; }
    const it = TRASH_LIST[Math.floor(Math.random() * TRASH_LIST.length)];
    gameState = 'TRASH';
    setStatus('ゴミだった…', '#ccc');
    playSE('foul');
    showTrashPop(it);
    timerId = setTimeout(() => {
        if (gameState !== 'TRASH') return;
        hideTrashPop();
        startWaiting();
    }, 1900);
}

// 結果ウィンドウで「次へ」「🏠」を少しのあいだ押せなくする
let _lockIv = null;
function lockResultButtons(sec) {
    const nb = byId('next-btn'), hb = byId('result-home-btn');
    clearInterval(_lockIv);
    nb.disabled = true; if (hb) hb.disabled = true;
    nb.innerText = '…';
    let left = sec;
    _lockIv = setInterval(() => {
        left -= 0.5;
        if (left <= 0) { clearInterval(_lockIv); nb.disabled = false; nb.innerText = '次へ'; if (hb) hb.disabled = false; }
    }, 500);
}
// 小瓶・宝箱の結果表示（結果ウィンドウを流用）
function showFind(o) {
    gameState = 'RESULT';
    lastCastSuccess = true;
    updateStageBgm();
    const img = byId('result-img');
    img.style.animation = 'none'; img.offsetHeight; img.style.animation = null;
    img.classList.remove('silhouette'); img.classList.add('clickable-fish');
    img.onerror = () => { img.onerror = null; img.src = emojiSvg(o.emoji); };
    img.src = o.img;
    const t = byId('result-title'); t.innerText = o.title; t.style.color = '#ffd700';
    byId('result-rank').innerHTML = '';
    byId('result-bonus').innerHTML = o.chips || '';
    byId('result-name').innerText = o.name;
    const pr = byId('result-price'); pr.style.display = 'block'; if (o.lineHtml) pr.innerHTML = o.lineHtml; else pr.innerText = o.line;
    byId('result-time').innerText = o.sub || '';
    byId('result-new-badge').style.display = 'none';
    byId('result-hint').style.display = 'none';
    byId('result-modal').style.display = 'block';
    lockResultButtons(o.wait || 1.5);
}

/* ---------- 手紙入りの小瓶 ---------- */
function pickBottleCode() {
    if (typeof BOTTLE_CODES === 'undefined') return null;
    const p = playerData, used = p.usedCodes || {}, ev = p.eventAreas || {}, sp = p.specialAreas || {}, now = eventMonthNow(), got = p.bottleNotes || [];
    // 手紙は重複しない：すでに拾った手紙・解放ずみのエリアの手紙は出ない（Ver 3.2.0）
    const pool = BOTTLE_CODES.filter(c => !got.includes(c.code) && (c.area ? (MAP_DATA[c.area] && !ev[c.area] && !sp[c.area]) : !used[c.code]));
    if (!pool.length) return null;
    const w = (c) => c.area ? (MAP_DATA[c.area].special ? 2 : (MAP_DATA[c.area].months.includes(now) ? 6 : 1)) : 2;     // いま開催中のエリアの手紙は出やすい
    let r = Math.random() * pool.reduce((s, c) => s + w(c), 0);
    for (const c of pool) { r -= w(c); if (r < 0) return c; }
    return pool[0];
}
function openBottle() {
    const p = playerData, e = pickBottleCode();
    if (!p.bottleNotes) p.bottleNotes = [];
    let line, sub, lineHtml = '';
    if (e) {
        if (!p.bottleNotes.includes(e.code)) p.bottleNotes.push(e.code);
        line = `中には「${e.code}」と書かれていた…`;
        lineHtml = `中には「<span style="color:${noteColor(e)};font-weight:bold;">${e.code}</span>」と書かれていた…`;
        sub = '（どこかで使えるかもしれない…）';
    } else {
        p.gold += 5000;
        line = '中には「ありがとう」と書かれていた…';
        sub = 'お礼に 5,000G がはさまっていた！';
        updateMenuUI();
    }
    savePlayerData();
    showFind({ title: '📜 手紙入りの小瓶！', img: BOTTLE_IMG, emoji: '🍾', name: '手紙入りの小瓶', line, lineHtml, sub, wait: 3 });
}
// 設定の「拾った手紙」：いままで拾った言葉を読み返せる
// 手紙の言葉の色：特殊エリアは紫、イベントエリアはオレンジ（それ以外はそのまま）
function noteColor(e) {
    const m = e && e.area && MAP_DATA[e.area];
    return m && m.special ? '#c9a8ff' : (m ? '#ffb347' : '#ffffff');
}
// 手紙の言葉を、もう入力したか？（エリアの手紙＝解放ずみか／アイテムの手紙＝使用ずみか）
function noteUsed(e) {
    const p = playerData;
    if (!e) return false;
    if (e.area) { const m = MAP_DATA[e.area]; return !!(m && (m.special ? (p.specialAreas || {})[e.area] : (p.eventAreas || {})[e.area])); }
    return !!(p.usedCodes || {})[e.code];
}
// 拾った手紙の一覧：白文字（アイテム）→ 特殊エリア → イベントエリア の順。入力ずみは ✅、まだは ⬜
function openBottleNotes() {
    const n = playerData.bottleNotes || [];
    const esc = (t) => String(t).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
    const rank = (e) => { const m = e && e.area && MAP_DATA[e.area]; return m ? (m.special ? 1 : 2) : 0; };
    const list = n.map((c, i) => { const e = (typeof BOTTLE_CODES !== 'undefined' && BOTTLE_CODES.find(x => x.code === c)) || null; return { c, e, i }; })
        .sort((a, b) => rank(a.e) - rank(b.e) || a.i - b.i);
    gameAlert(list.length ? '📜 拾った手紙<br>✅ 入力ずみ　⬜ まだ入力していない<br><br>' + list.map(o => `${noteUsed(o.e) ? '✅' : '⬜'} <span style="color:${noteColor(o.e)};font-weight:bold;">${esc(o.c)}</span>`).join('<br>') : 'まだ手紙を拾っていません。', { scroll: true, html: true });
}

/* ---------- 宝箱 ---------- */
const CHEST_TABLE = [
    { w: 34, kind: 'gold', mul: 1 }, { w: 14, kind: 'gold', mul: 3 },
    { w: 14, kind: 'buff', k: 'exp', min: 5 }, { w: 14, kind: 'buff', k: 'gold', min: 5 },
    { w: 11, kind: 'buff', k: 'frenzy', min: 3 }, { w: 8, kind: 'buff', k: 'big', min: 5 }, { w: 5, kind: 'buff', k: 'super', min: 3 }
];
function openChest() {
    const p = playerData;
    let r = Math.random() * CHEST_TABLE.reduce((s, x) => s + x.w, 0), e = CHEST_TABLE[0];
    for (const x of CHEST_TABLE) { r -= x.w; if (r < 0) { e = x; break; } }
    let line;
    if (e.kind === 'gold') {
        const g = Math.round((1500 + (p.level || 1) * 30) * e.mul / 10) * 10;
        p.gold += g;
        line = `金貨 ${g.toLocaleString()}G が入っていた！`;
    } else {
        addBuff(e.k, e.min);
        line = `${BUFFS[e.k].ico} ${BUFFS[e.k].name} が ${e.min}分間つく！`;
    }
    savePlayerData(); updateMenuUI(); updateHud();
    showFind({ title: '🎁 宝箱を見つけた！', img: CHEST_IMG, emoji: '🧰', name: '宝箱', line, sub: '', wait: 2 });
}

/* ---------- 合言葉（コード入力） ---------- */
function normCode(s) {
    return String(s || '').normalize('NFKC').replace(/[\s"'“”「」『』]/g, '').replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60)).toLowerCase();
}
function redeemSecretCode(raw) {
    if (typeof BOTTLE_CODES === 'undefined') return false;
    const n = normCode(raw), e = BOTTLE_CODES.find(c => normCode(c.code) === n);
    if (!e) return false;
    const p = playerData;
    if (e.area) {
        const m = MAP_DATA[e.area];
        if (!m) return false;
        if (m.special) {
            if (!p.specialAreas) p.specialAreas = {};
            if (p.specialAreas[e.area]) { gameAlert(`「${m.name}」は、すでに解放済みです。`); return true; }
            p.specialAreas[e.area] = true;
            savePlayerData(); updateMenuUI(); playSE('levelup');
            gameAlert(`${m.emoji || '🌌'} 特殊エリア「${m.name}」が解放されました！\n季節に関係なく、いつでも遊べます。\n釣りレベルが Lv.${m.reqLevel} 以上になったら「場所移動」の「特殊」から行けます。\n図鑑にも「特殊エリア」のタブが増えました。`);
            return true;
        }
        if (!p.eventAreas) p.eventAreas = {};
        const per = `毎年${m.months[0]}〜${m.months[1]}月`;
        if (p.eventAreas[e.area]) { gameAlert(`「${m.name}」は、すでに解放済みです。（${per}）`); return true; }
        p.eventAreas[e.area] = true;
        savePlayerData(); updateMenuUI(); playSE('levelup');
        gameAlert(`${m.emoji || '🎉'} イベントエリア「${m.name}」が解放されました！\n開催期間：${per}\n${m.months.includes(eventMonthNow()) ? 'いまが開催中！「場所移動」から行けます。' : '開催期間になったら遊べます。'}\n図鑑にも「イベントエリア」のタブが増えました。`);
        return true;
    }
    if (!p.usedCodes) p.usedCodes = {};
    if (p.usedCodes[e.code]) { gameAlert('この合言葉は、もう使われています。'); return true; }
    p.usedCodes[e.code] = true;
    if (e.gold) p.gold += e.gold;
    if (e.item) addItem(e.item, e.n || 1);
    if (e.buff) addBuff(e.buff, e.min || 10);
    savePlayerData(); updateMenuUI(); updateHud(); playSE('levelup');
    gameAlert(`🎁 ${e.label || 'アイテムを手に入れた'}！`);
    return true;
}

/* ===================================================
   Ver 3.0.1  季節イベントエリア（2か月ごとに1エリア・年6エリア）
   ---------------------------------------------------
   エリアと生き物の定義は events.js。ここは仕組みだけです。
   ・解放：小瓶の合言葉を「コード入力」→ そのエリアが「解放済み」になる（ずっと有効）
   ・遊べる期間：そのエリアの月（例：1〜2月）だけ。期間外は「場所移動」に鍵つきで表示
   ・図鑑：「イベントエリア」タブ（月ごとにまとめて表示）。図鑑コンプ・実績の対象外
   =================================================== */
function eventMonthNow() { return window.EVENT_DEBUG_MONTH || (new Date().getMonth() + 1); }
const isEventArea = (k) => !!(MAP_DATA[k] && MAP_DATA[k].event);
const eventUnlocked = (k) => !!(playerData.eventAllOpen || (playerData.eventAreas && playerData.eventAreas[k]));   // eventAllOpen：開発者コマンド EventAll092365
const eventInSeason = (k) => !!(MAP_DATA[k] && MAP_DATA[k].months && (playerData.eventAllOpen || MAP_DATA[k].months.includes(eventMonthNow())));
const eventAreaOpen = (k) => isEventArea(k) && eventUnlocked(k) && eventInSeason(k);
/* ---- 特殊エリア（Ver 3.2.0）：小瓶の合言葉で解放。期間に関係なく、いつでも遊べる ---- */
const isSpecialArea = (k) => !!(MAP_DATA[k] && MAP_DATA[k].special);
const specialUnlocked = (k) => !!(playerData.specialAreas && playerData.specialAreas[k]);
const zukanCatOfArea = (k) => { const m = MAP_DATA[k]; return m && m.event ? 'event' : (m && m.special ? 'special' : (m && m.gacha ? 'gacha' : 'normal')); };
const zukanCatOf = (f) => zukanCatOfArea(f.location);
function eventMonthLabel(m) { return (typeof EVENT_MONTH_NAMES !== 'undefined' && EVENT_MONTH_NAMES[m]) || `${m}月`; }
function eventZukanCompare(a, b) {
    const keys = Object.keys(MAP_DATA);
    if ((a.month || 0) !== (b.month || 0)) return (a.month || 0) - (b.month || 0);
    const ta = (a.toolType === 'net') ? 1 : 0, tb = (b.toolType === 'net') ? 1 : 0;
    if (ta !== tb) return ta - tb;                      // 竿 → 網
    const ia = keys.indexOf(a.location), ib = keys.indexOf(b.location);
    if (ia !== ib) return ia - ib;
    return (a.ord || 0) - (b.ord || 0) || zukanScore(a) - zukanScore(b) || a.id - b.id;   // レア度順（めずらしいほど後ろ）
}
function specialZukanCompare(a, b) {
    const keys = Object.keys(MAP_DATA);
    const ia = keys.indexOf(a.location), ib = keys.indexOf(b.location);
    if (ia !== ib) return ia - ib;
    const ta = (a.toolType === 'net') ? 1 : 0, tb = (b.toolType === 'net') ? 1 : 0;
    if (ta !== tb) return ta - tb;                      // 竿 → 網
    return (a.ord || 0) - (b.ord || 0) || a.id - b.id;   // 番号順（大きいほどレア）
}
function renderSpecialMapButtons(grid) {
    Object.keys(MAP_DATA).filter(k => MAP_DATA[k].special && specialUnlocked(k)).forEach(k => {
        const m = MAP_DATA[k];
        const btn = document.createElement('button');
        const ok = playerData.level >= m.reqLevel;
        btn.className = `map-btn special ${currentLocation === k ? 'active' : ''} ${ok ? '' : 'locked'}`;
        if (ok) { btn.innerText = `${m.emoji || '✨'} ${m.name}\n(特殊エリア Lv.${m.reqLevel}〜)`; btn.onclick = () => selectLocation(k); }
        else btn.innerText = `🔒 ${m.emoji || '✨'} ${m.name}\n(要 Lv.${m.reqLevel})`;
        grid.appendChild(btn);
    });
}
function renderEventMapButtons(grid) {
    Object.keys(MAP_DATA).filter(k => MAP_DATA[k].event && eventUnlocked(k)).forEach(k => {
        const m = MAP_DATA[k], span = `${m.months[0]}〜${m.months[1]}月`;
        const btn = document.createElement('button');
        const open = eventInSeason(k);
        btn.className = `map-btn event ${currentLocation === k ? 'active' : ''} ${open ? '' : 'locked'}`;
        if (open) { btn.innerText = `${m.emoji || '🎉'} ${m.name}\n(イベント開催中：${span})`; btn.onclick = () => selectLocation(k); }
        else btn.innerText = `🔒 ${m.name}\n(${span}に開催)`;
        grid.appendChild(btn);
    });
}
// 期間が終わったイベントエリアにいたら、さざ波の海へ戻す／魚がまだ居ないエリアは遊べない
const _handleAction301 = window.handleAction;
window.handleAction = function () {
    if (gameState === 'READY' && (isEventArea(currentLocation) || isSpecialArea(currentLocation))) {
        if (isSpecialArea(currentLocation) && (!specialUnlocked(currentLocation) || playerData.level < MAP_DATA[currentLocation].reqLevel)) { selectLocation('sea'); return; }
        if (isEventArea(currentLocation) && !eventAreaOpen(currentLocation)) { floatText('イベントは終了しました。さざ波の海へ戻ります', '#ffd700', true); selectLocation('sea'); return; }
        if (!FISH_DATA.some(f => f.location === currentLocation && (f.toolType || 'rod') === currentToolMode)) {
            playSE('foul'); setStatus(currentToolMode === 'rod' ? '竿で釣れる生き物は、準備中です' : '網で捕れる生き物は、準備中です', '#ff9'); return;
        }
    }
    return _handleAction301.apply(this, arguments);
};

/* ---------- 実績（ゴミ・アクセサリー・工房） ---------- */
Object.assign(ACHIEVEMENT_DATA, {
    trash_100: { id: 'trash_100', name: '海のお掃除やさん', icon: _IC.s, desc: 'ゴミを合計100個釣り上げた', hint: 'ニセのアタリには、思わぬ"おみやげ"がついてくる…' },
    comp_all_accs: { id: 'comp_all_accs', name: 'おしゃれ番長', icon: _IC.g, desc: 'すべてのアクセサリーを手に入れた', hint: 'ショップの「アクセサリー」を、ぜんぶそろえよう' },
    upgrade_max: { id: 'upgrade_max', name: '極みの道具', icon: _IC.s, desc: '工房で道具を1つ「+10（最大）」まで強化した', hint: 'ひとつの道具を、とことん磨いてみよう' }
});


/* ===================================================
   Ver 3.0.1  季節イベント用ミニゲーム（各イベントエリアの“いちばん希少な生き物”で遊べる）
   ev_winter：豆まき／ev_spring：花びらキャッチ／ev_may：滝のぼり／ev_summer：星つなぎ／ev_autumn：だんご積み／ev_xmas：そりジャンプ
   画像は images/minigames/ev_*.png（無くても絵文字で遊べます。追加素材リスト.md を参照）
   =================================================== */
function evBg(a, grad, imgName) {
    return spEl('', a.stage, { position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, background: `url(images/minigames/mini_bg/${imgName}.png) center/cover no-repeat, ${grad}`, pointerEvents: 'none' });
}
function evSp(a, name, emoji, size, x, y) {
    const e = spEl('', a.stage, { position: 'absolute', width: size + 'px', height: size + 'px', fontSize: Math.round(size * 0.8) + 'px', lineHeight: size + 'px', textAlign: 'center', marginLeft: (-size / 2) + 'px', marginTop: (-size / 2) + 'px', pointerEvents: 'none', left: x + 'px', top: y + 'px' });
    e.innerHTML = mgImg(name, emoji, size);
    return e;
}
const evPut = (e, x, y) => { e.style.left = x + 'px'; e.style.top = y + 'px'; };

Object.assign(SP_INFO, {
    bean: { ico: '👹', name: '豆まき', text: (n) => `左右に歩く<b>鬼</b>に、タップした場所へ豆を投げよう！豆はすこし遅れて届くよ。<br>鬼に${n.need + 2}回当てたら捕獲。<b>福の神</b>に当てるとミス（ミス${n.lives}回で失敗）。（PC：←→で狙って Z）` },
    petal: { ico: '🌸', name: '花びらキャッチ', text: (n) => `指を左右に動かして、<b>桜の花びら</b>をかごでキャッチ！<br>毛虫🐛に当たるとミス（ミス${n.lives}回で失敗）。時間内に集めよう。（PC：←→キー）` },
    carp: { ico: '🎏', name: '滝のぼり', text: () => '連打（タップ）で鯉をジャンプさせ、<b>金色のゾーン</b>の中にとどまろう！<br>ゲージがいっぱいになれば「龍」に出世して捕獲。（PC：Zキー連打）' },
    stars: { ico: '🎋', name: '星つなぎ', text: (n) => `夜空の星を、<b>1・2・3…の順</b>にタップして、天の川をつなごう！<br>3つの星座。まちがえるとミス（ミス${n.lives}回で失敗）。（PC：←→で選んで Z）` },
    dango: { ico: '🍡', name: 'おだんご積み', text: (n) => `左右に動くおだんごを、タイミングよくタップして<b>真上に</b>積み上げよう！<br>ずれたら崩れてミス（ミス${n.lives}回で失敗）。（PC：Zキー）` },
    gift: { ico: '🛷', name: 'そりジャンプ', text: (n) => `タップでそりがジャンプ！ <b>プレゼント🎁</b>を集めて、<b>雪だるま⛄</b>はよけよう。<br>ミス${n.lives}回で失敗。（PC：Zキー）` }
});
Object.assign(SP_AREA_KIND, { ev_winter: 'bean', ev_spring: 'petal', ev_may: 'carp', ev_summer: 'stars', ev_autumn: 'dango', ev_xmas: 'gift' });

/* ---- 豆まき ---- */
SPG.bean = function (a, P) {
    const W = a.W, H = a.H, need = spInfoNums('bean').need + 1, rowY = 82;
    evBg(a, 'linear-gradient(#3a1d5a,#1b0f33 60%,#4a2a14)', 'ev_bean_bg');
    let lives = P.hp, score = 0, time = 34, aim = W / 2, cool = 0, fukuT = 4;
    const aimE = evSp(a, 'ev_bean', '🫘', 30, aim, H - 24);
    const mk = (kind) => ({ kind, x: Math.random() * (W - 80) + 40, dir: Math.random() < .5 ? -1 : 1, e: kind === 'oni' ? evSp(a, 'ev_oni', '👹', 54, 0, rowY) : evSp(a, 'ev_fuku', '👵', 54, 0, rowY + 6), life: 7 });
    const acts = [mk('oni')], pend = [];
    a.hearts(lives); a.prog(0);
    const throwAt = (x) => {
        if (cool > 0) return; cool = 0.25; playSE('tap');
        const b = evSp(a, 'ev_bean', '🫘', 24, x, H - 24); b.style.transition = 'top .26s linear'; void b.offsetWidth; b.style.top = (rowY + 8) + 'px';
        pend.push({ t: 0.26, x, b });
    };
    const g = {
        update(dt) {
            time -= dt; cool -= dt; fukuT -= dt;
            const k = 300 * dt; if (spKeys.ArrowLeft) aim -= k; if (spKeys.ArrowRight) aim += k; aim = Math.max(20, Math.min(W - 20, aim)); evPut(aimE, aim, H - 24);
            acts.forEach(o => {
                o.x += o.dir * (W / (2.1 / P.sp)) * (o.kind === 'oni' ? 1 + score * 0.06 : 0.8) * dt;
                if (o.x > W - 30) { o.x = W - 30; o.dir = -1; } if (o.x < 30) { o.x = 30; o.dir = 1; }
                if (Math.random() < dt * 0.5) o.dir *= -1;
                evPut(o.e, o.x, o.kind === 'oni' ? rowY : rowY + 6); o.e.style.transform = `scaleX(${o.dir})`;
                if (o.kind === 'fuku') { o.life -= dt; }
            });
            for (let i = acts.length - 1; i >= 0; i--) if (acts[i].kind === 'fuku' && acts[i].life <= 0) { acts[i].e.remove(); acts.splice(i, 1); }
            if (fukuT <= 0 && !acts.some(o => o.kind === 'fuku')) { acts.push(mk('fuku')); fukuT = 5; }
            for (let i = pend.length - 1; i >= 0; i--) {
                const p = pend[i]; p.t -= dt; if (p.t > 0) continue;
                pend.splice(i, 1); p.b.remove();
                const hit = acts.filter(o => Math.abs(o.x - p.x) < 34 * P.len).sort((u, v) => Math.abs(u.x - p.x) - Math.abs(v.x - p.x))[0];
                if (!hit) continue;
                if (hit.kind === 'oni') { score++; a.prog(score / (need + 1)); a.flash('鬼は外！', '#7fff7f'); playSE('success'); hit.x = Math.random() < .5 ? 40 : W - 40; if (score > need) return a.win(); }
                else { lives--; a.hearts(lives); a.flash('福は内…！', '#ff7777'); playSE('foul'); triggerVibration(120); hit.life = 0; if (lives <= 0) return a.lose(); }
            }
            a.say(`あと ${Math.max(0, Math.ceil(time))} 秒　鬼 ${score}/${need + 1}`);
            if (time <= 0) a.lose();
        },
        down(x) { throwAt(x); }, keyDown() { throwAt(aim); }
    };
    return g;
};

/* ---- 花びらキャッチ ---- */
SPG.petal = function (a, P) {
    const W = a.W, H = a.H, need = P.sp > 1.1 ? 14 : (P.sp < 0.9 ? 10 : 12);
    evBg(a, 'linear-gradient(#ffd6e8,#f6a9c8 55%,#7b4a6a)', 'ev_petal_bg');
    let px = W / 2, tx = null, lives = P.hp, score = 0, time = 30, spawn = 0.3, inv = 0;
    const basket = evSp(a, 'ev_basket', '🧺', 48, px, H - 28); const items = [];
    a.hearts(lives); a.prog(0);
    const g = {
        update(dt) {
            time -= dt; spawn -= dt; inv -= dt;
            const k = 330 * dt; if (spKeys.ArrowLeft) { px -= k; tx = null; } if (spKeys.ArrowRight) { px += k; tx = null; }
            if (tx !== null) px += (tx - px) * Math.min(1, 14 * dt); px = Math.max(24, Math.min(W - 24, px)); evPut(basket, px, H - 28);
            if (spawn <= 0) { spawn = 0.5 / P.sp; const bad = Math.random() < 0.26, x = Math.random() * (W - 40) + 20; items.push({ bad, x0: x, x, y: -20, ph: Math.random() * 6, v: (bad ? 150 : 120) * P.sp, e: bad ? evSp(a, 'ev_caterpillar', '🐛', 34, x, -20) : evSp(a, 'ev_petal', '🌸', 34, x, -20) }); }
            for (let i = items.length - 1; i >= 0; i--) {
                const it = items[i]; it.y += it.v * dt; it.ph += dt * 3; it.x = Math.max(16, Math.min(W - 16, it.x0 + Math.sin(it.ph) * 22)); evPut(it.e, it.x, it.y);
                if (it.y > H - 52 && it.y < H - 8 && Math.abs(it.x - px) < 27 * P.len) {
                    it.e.remove(); items.splice(i, 1);
                    if (it.bad) { if (inv <= 0) { lives--; inv = 0.6; a.hearts(lives); a.flash('毛虫！', '#ff7777'); playSE('foul'); triggerVibration(120); if (lives <= 0) return a.lose(); } }
                    else { score++; a.prog(score / need); playSE('tap'); if (score >= need) return a.win(); }
                } else if (it.y > H + 20) { it.e.remove(); items.splice(i, 1); }
            }
            a.say(`あと ${Math.max(0, Math.ceil(time))} 秒　花びら ${score}/${need}`);
            if (time <= 0) a.lose();
        },
        down(x) { tx = x; }, move(x) { if (tx !== null) tx = x; }, up() { }
    };
    return g;
};

/* ---- 滝のぼり ---- */
SPG.carp = function (a, P) {
    const W = a.W, H = a.H, top = 26, bot = H - 26, span = bot - top;
    evBg(a, 'linear-gradient(90deg,#0a4a7a,#4fb5e8 50%,#0a4a7a)', 'ev_carp_bg');
    const band = spEl('', a.stage, { position: 'absolute', left: 0, right: 0, background: 'rgba(255,226,122,.38)', borderTop: '3px solid #ffe27a', borderBottom: '3px solid #ffe27a', pointerEvents: 'none' });
    const carp = evSp(a, 'ev_carp', '🎏', 50, W / 2, bot);
    let y = 0.05, vy = 0, prog = 0, t = 0, time = 32; const goal = 5.5 * Math.pow(P.sp, 0.6), bh = 0.17 * Math.min(1.3, P.len);
    a.hudText('🎏'); a.prog(0);
    const hop = () => { vy = Math.min(vy + 0.5, 0.9); playSE('tap'); };
    const g = {
        update(dt) {
            t += dt; time -= dt;
            vy -= 0.85 * dt; vy *= Math.exp(-1.2 * dt); y += vy * dt; if (y < 0) { y = 0; vy = Math.max(0, vy); } if (y > 1) { y = 1; vy = Math.min(0, vy); }
            const c = 0.5 + 0.34 * Math.sin(t * 0.9 * P.sp) * Math.cos(t * 0.37); const inB = Math.abs(y - c) < bh;
            band.style.top = (bot - (c + bh) * span) + 'px'; band.style.height = (2 * bh * span) + 'px';
            evPut(carp, W / 2 + Math.sin(t * 3) * 6, bot - y * span); carp.style.transform = `rotate(${-vy * 40}deg)`;
            prog += inB ? dt : -dt * 0.45; prog = Math.max(0, prog); band.style.background = inB ? 'rgba(255,226,122,.6)' : 'rgba(255,226,122,.3)';
            a.prog(prog / goal); a.say(`あと ${Math.max(0, Math.ceil(time))} 秒　金色のゾーンにとどまれ！`);
            if (prog >= goal) return a.win(); if (time <= 0) a.lose();
        },
        down() { hop(); }, keyDown() { hop(); }
    };
    return g;
};

/* ---- 星つなぎ ---- */
SPG.stars = function (a, P) {
    const W = a.W, H = a.H, rounds = [4, 5, 6]; let r = 0, lives = P.hp, next = 1, tl = 0, cur = 0; let st = [];
    evBg(a, 'linear-gradient(#050a2a,#1a1f5a 70%,#2a3a7a)', 'ev_stars_bg');
    const line = spEl('', a.stage, { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', pointerEvents: 'none' }); line.innerHTML = `<svg width="${W}" height="${H}" style="position:absolute;left:0;top:0"><polyline id="ev-star-line" points="" fill="none" stroke="#ffe9a0" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/></svg>`;
    const setup = () => {
        st.forEach(s => s.e.remove()); st = []; next = 1; cur = 0; const ex = P.starAdd || 0; tl = (9 + r * 1.5 + ex * 1.3) / Math.min(1.3, P.sp); const n = rounds[r] + ex, pts = [];
        let guard = 0; while (pts.length < n && guard++ < 400) { const x = 30 + Math.random() * (W - 60), y = 30 + Math.random() * (H - 60); if (pts.every(p => Math.hypot(p[0] - x, p[1] - y) > (guard > 250 ? 50 : 60))) pts.push([x, y]); }
        pts.forEach((p, i) => { const e = evSp(a, 'ev_star', '⭐', 46, p[0], p[1]); const num = spEl('', e, { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, fontSize: '15px', fontWeight: 'bold', color: '#1a1f5a', textAlign: 'center', lineHeight: '46px', textShadow: '0 0 3px #fff' }); num.innerText = i + 1; e.style.pointerEvents = 'none'; st.push({ n: i + 1, x: p[0], y: p[1], e }); });
        document.getElementById('ev-star-line').setAttribute('points', ''); mark();
        a.prog(r / 3); a.hearts(lives);
    };
    const mark = () => st.forEach((s, i) => { s.e.style.filter = i === cur && s.n >= next ? 'drop-shadow(0 0 6px #fff)' : 'none'; s.e.style.opacity = s.n < next ? 0.55 : 1; });
    const tap = (s) => {
        if (!s || s.n < next) return;
        if (s.n === next) {
            playSE('tap'); next++; const pts = st.filter(q => q.n < next).map(q => q.x + ',' + q.y).join(' '); document.getElementById('ev-star-line').setAttribute('points', pts);
            const rest = st.filter(q => q.n >= next); if (rest.length) cur = st.indexOf(rest[0]); mark();
            if (next > st.length) { r++; if (r >= rounds.length) { a.prog(1); return a.win(); } a.flash('星座かんせい！', '#ffe27a'); playSE('success'); setTimeout(() => { if (spGame === g) setup(); }, 450); next = 999; }
        } else { lives--; a.hearts(lives); a.flash('ちがう星…', '#ff7777'); playSE('foul'); if (lives <= 0) a.lose(); }
    };
    const g = {
        update(dt) {
            if (next >= 999) return; tl -= dt; a.say(`1から順番に！ のこり ${Math.max(0, Math.ceil(tl))} 秒（星座 ${r + 1}/3）`);
            if (tl <= 0) { lives--; a.hearts(lives); a.flash('時間切れ…', '#ff7777'); playSE('foul'); if (lives <= 0) return a.lose(); setup(); }
        },
        down(x, y) { if (next >= 999) return; let b = null, bd = 9e9; st.forEach(s => { const d = Math.hypot(s.x - x, s.y - y); if (d < bd) { bd = d; b = s; } }); if (bd < 34) tap(b); },
        keyPress(code) { const rest = st.filter(q => q.n >= next); if (!rest.length) return; let i = rest.indexOf(st[cur]); if (i < 0) i = 0; i = (i + (code === 'ArrowLeft' || code === 'ArrowUp' ? -1 : 1) + rest.length) % rest.length; cur = st.indexOf(rest[i]); mark(); },
        keyDown() { if (next >= 999) return; tap(st[cur]); }
    };
    setup(); return g;
};

/* ---- おだんご積み ---- */
SPG.dango = function (a, P) {
    const W = a.W, H = a.H, need = P.sp > 1.1 ? 9 : (P.sp < 0.9 ? 7 : 8), sz = 28, tol = 25 * P.len;
    evBg(a, 'linear-gradient(#10163a,#2b2a6a 60%,#4a3a5a)', 'ev_dango_bg');
    evSp(a, 'ev_moon', '🌕', 56, W - 46, 40); const stand = spEl('', a.stage, { position: 'absolute', left: (W / 2 - 46) + 'px', width: '92px', height: '10px', bottom: '4px', background: '#8a5a2a', borderRadius: '4px', pointerEvents: 'none' });
    let lives = P.hp, n = 0, cx = W / 2, x = 40, dir = 1, falling = null, time = 40; const pile = [];
    const baseY = (i) => H - 14 - sz / 2 - i * (sz - 4);
    const mover = evSp(a, 'ev_dango', '🍡', sz + 4, x, baseY(0) - 36);
    a.hearts(lives); a.prog(0); a.say(`真上に重ねよう！ ${need}こで完成`);
    const drop = () => {
        if (falling) return; const dx = Math.abs(x - cx);
        if (dx <= tol) {
            const e = evSp(a, 'ev_dango', '🍡', sz + 4, x, baseY(n)); pile.push(e); n++; cx = x; a.prog(n / need); playSE('tap');
            if (n >= need) return a.win();
        } else {
            lives--; a.hearts(lives); a.flash('くずれた！', '#ff7777'); playSE('foul'); triggerVibration(120);
            const e = evSp(a, 'ev_dango', '🍡', sz + 4, x, baseY(n)); falling = { e, vy: -120, vx: (x > cx ? 1 : -1) * 90, y: baseY(n), x };
            if (lives <= 0) { return a.lose(); }
        }
    };
    const g = {
        update(dt) {
            x += dir * (W / (1.35 / P.sp)) * (1 + n * 0.07) * dt; if (x > W - 22) { x = W - 22; dir = -1; } if (x < 22) { x = 22; dir = 1; }
            time -= dt; a.say(`真上に重ねよう！ あと ${Math.max(0, Math.ceil(time))} 秒　${n}/${need}こ`); if (time <= 0) return a.lose();
            evPut(mover, x, baseY(n) - 4);
            mover.style.opacity = falling ? 0.3 : 1;
            if (falling) { falling.vy += 900 * dt; falling.y += falling.vy * dt; falling.x += falling.vx * dt; evPut(falling.e, falling.x, falling.y); if (falling.y > H + 40) { falling.e.remove(); falling = null; } }
        },
        down() { drop(); }, keyDown() { drop(); }
    };
    return g;
};

/* ---- そりジャンプ ---- */
SPG.gift = function (a, P) {
    const W = a.W, H = a.H, need = P.sp > 1.1 ? 7 : (P.sp < 0.9 ? 5 : 6), gy = H - 46, sx = 70;
    evBg(a, 'linear-gradient(#0c1a3a,#2a4a7a 62%,#eaf4ff 62%,#cfe4f5)', 'ev_gift_bg');
    const sled = evSp(a, 'ev_sled', '🛷', 54, sx, gy); let y = 0, vy = 0, lives = P.hp, score = 0, spawn = 1.0, inv = 0, t = 0; const items = [];
    a.hearts(lives); a.prog(0); a.say(`プレゼントを${need}こ集めよう！`);
    const jump = () => { if (y <= 0.5) { vy = 640; playSE('tap'); } };
    const g = {
        update(dt) {
            t += dt; spawn -= dt; inv -= dt; vy -= 1750 * dt; y += vy * dt; if (y < 0) { y = 0; vy = 0; }
            evPut(sled, sx, gy - y); sled.style.opacity = inv > 0 && Math.floor(inv * 12) % 2 ? 0.35 : 1;
            if (spawn <= 0) { spawn = (0.95 + Math.random() * 0.7) / P.sp; const gift = Math.random() < 0.5; items.push({ gift, x: W + 30, e: gift ? evSp(a, 'ev_present', '🎁', 36, W + 30, gy - 78) : evSp(a, 'ev_snowman', '⛄', 44, W + 30, gy + 2) }); }
            for (let i = items.length - 1; i >= 0; i--) {
                const it = items[i]; it.x -= 200 * P.sp * dt; evPut(it.e, it.x, it.gift ? gy - 78 : gy + 2);
                const dx = Math.abs(it.x - sx);
                if (it.gift && dx < 30 && Math.abs((gy - y) - (gy - 78)) < 36) { it.e.remove(); items.splice(i, 1); score++; a.prog(score / need); a.flash('ゲット！', '#7fff7f'); playSE('success'); if (score >= need) return a.win(); continue; }
                if (!it.gift && dx < 26 * (2 - Math.min(1.3, P.len)) && y < 30 && inv <= 0) { it.e.remove(); items.splice(i, 1); lives--; inv = 1.1; a.hearts(lives); a.flash('ガシャン！', '#ff7777'); playSE('foul'); triggerVibration(120); if (lives <= 0) return a.lose(); continue; }
                if (it.x < -40) { it.e.remove(); items.splice(i, 1); }
            }
            a.say(`プレゼント ${score}/${need}　タップでジャンプ！`);
        },
        down() { jump(); }, keyDown() { jump(); }
    };
    return g;
};


/* ===================================================
   Ver 3.1.0  ミニゲーム練習（遊び方 →「ミニゲーム練習」）
   ・一度でも遊んだ（説明を見た）ミニゲームだけが並びます
   ・スコア式：1ラウンドごとにクリアで +100点。進むほど速く・きびしくなり、失敗（ミス切れ）で終了
   ・ベストスコアは playerData.spBest に保存
   =================================================== */
const PRACTICE_EV_KIND = Object.fromEntries(Object.entries(SP_AREA_KIND).filter(([a]) => /^ev_/.test(a)).map(([a, k]) => [k, a]));   // 季節ミニゲーム → エリア
// 遊べる条件：ふつうのミニゲームは「一度遊んだことがある」／季節ミニゲームは「その期間の間だけ」（エリア解放は不要）
function practiceOpen(k) {
    if (!SPG[k]) return false;
    if (PRACTICE_EV_KIND[k]) return eventInSeason(PRACTICE_EV_KIND[k]);
    return !!(playerData.spSeen || {})[k];
}
const practiceAllKinds = () => Object.keys(SP_INFO).filter(k => SPG[k]).sort((a, b) => (!!PRACTICE_EV_KIND[a] - !!PRACTICE_EV_KIND[b]));
const practiceKinds = () => practiceAllKinds().filter(practiceOpen);
const PRACTICE_REWARDS = [[10, 3000], [20, 10000]];       // [ラウンド数, ごほうびG]（練習に挑戦するたびにもらえる）
// 練習の味付け：速さ・判定のきびしさの倍率、制限時間（秒・ラウンドが進むと短く）、追加の仕掛け
const PRACTICE_TUNE = {
    timing: { sp: 1.3, len: 0.8, time: 18 }, dodge: { sp: 1.35, len: 0.85 }, shell: { sp: 1.3 },
    run: { timeMul: 0.85 }, deliver: { time: 26 }, match: { time: 40 }, sort: { time: 45 }
};
const PRACTICE_NOTE = {
    timing: '練習では<b>制限時間</b>あり。判定もきびしめ。', dodge: '練習では、弾がかなり速くなっていきます。', run: '練習では制限時間がきびしめです。',
    deliver: '練習では<b>制限時間</b>あり。', match: '練習では<b>制限時間</b>あり。進むとカードが増えます。', simon: '練習では、進むとボタンや覚える数が増えます。',
    shell: '練習では、シャッフルがどんどん速く・多くなります。', sort: '練習では<b>制限時間</b>あり。進むと石板が増えます。', odd: '練習では、進むとカードが増えます。', stars: '練習では、数ラウンドごとに星の数が増えます。'
};
const practiceBest = (k) => ((playerData.spBest || {})[k]) || 0;
/* ---------- ミニゲーム練習：図鑑のように横にならぶ一覧 → タップで「タイトル・記録・ゲーム開始」画面 → 開始で遊び方 ---------- */
function practiceIcon(k, px) {      // アイコンは、各ミニゲームにもともと設定されている絵文字を使う
    const emoji = (SP_INFO[k] && SP_INFO[k].ico) || '🎮';
    return `<span style="display:inline-block;font-size:${Math.round(px * 0.8)}px;line-height:${px}px;height:${px}px;">${emoji}</span>`;
}
function practiceAreaText(k) {
    const names = Object.entries(SP_AREA_KIND).filter(([a, kk]) => kk === k && MAP_DATA[a]).map(([a]) => MAP_DATA[a].name);
    return names.length ? names.join('・') : 'いろいろなエリア';
}
function practiceModal() {
    let m = byId('sp-practice-modal');
    if (!m) { m = spEl('modal', byId('game-container')); m.id = 'sp-practice-modal'; byId('game-container').appendChild(m); }
    return m;
}
function openPracticeList() {
    closeAllModals();
    const m = practiceModal();
    const ks = practiceAllKinds();
    m.innerHTML = `<div style="font-size:20px;color:#ffd700;font-weight:bold;margin-bottom:6px;">🎮 ミニゲーム練習</div>
        <div style="font-size:12px;color:#cfe8ff;margin-bottom:8px;text-align:center;line-height:1.6;">遊んだことのあるミニゲームが遊べます。<br>タップすると、記録とスタートボタンが出ます。<br><small>🎍 季節イベントのミニゲームは、その季節だけ遊べます</small></div>
        <div id="sp-practice-list" class="pg-grid"></div>
        <button class="btn" style="margin-top:12px;padding:8px 25px;font-size:15px;" onclick="closePracticeList(true)">もどる</button>`;
    const list = m.querySelector('#sp-practice-list');
    ks.forEach(k => {
        const b = document.createElement('button');
        b.className = 'pg-card';
        if (practiceOpen(k)) {
            b.innerHTML = `<span class="pg-ico">${practiceIcon(k, 44)}</span><span class="pg-name">${SP_INFO[k].name}</span><small class="pg-best">${practiceBest(k) ? 'ベスト ' + practiceBest(k) + '点' : 'きろくなし'}</small>${PRACTICE_EV_KIND[k] ? '<i class="pg-tag">🎍</i>' : ''}`;
            b.onclick = () => openPracticeDetail(k);
        } else {
            b.className += ' locked';
            b.innerHTML = `<span class="pg-ico">❔</span><span class="pg-name">？？？</span><small class="pg-best">???</small>`;
            b.disabled = true;
        }
        list.appendChild(b);
    });
    m.style.display = 'flex';
}
function openPracticeDetail(k) {
    if (!SPG[k] || !practiceOpen(k)) return;
    const m = practiceModal();
    const info = SP_INFO[k];
    const best = practiceBest(k);
    m.innerHTML = `<div class="pg-detail">
        <div class="pg-d-ico">${practiceIcon(k, 84)}</div>
        <div class="pg-d-title">${info.name}</div>
        <div class="pg-d-area">${PRACTICE_EV_KIND[k] ? '🎍 季節イベント　' : '📍 '}${practiceAreaText(k)}</div>
        <div class="pg-d-rec"><span>🏆 ベストスコア</span><b>${best ? best + ' 点' : 'まだ記録なし'}</b></div>
        <button class="btn pg-d-start" onclick="startPractice('${k}')">▶ ゲーム開始</button>
        <button class="btn pg-d-back" onclick="openPracticeList()">もどる</button>
    </div>`;
    m.style.display = 'flex';
    playSE && playSE('tap');
}
function closePracticeList(toHowTo) {
    const m = byId('sp-practice-modal'); if (m) m.style.display = 'none';
    if (toHowTo) openHowToPlay();
}
function startPractice(kind) {
    if (!SPG[kind]) return;
    closePracticeList(false);
    closeHowToPlay();
    initAudio();
    spState = { fish: { id: 0, name: '練習' }, seq: [kind], idx: 0, practice: true, kind, score: 0, over: false, prevState: gameState };
    gameState = 'SPECIAL';
    ensureSpLayer();
    spClearFlash();
    const L = byId('sp-layer');
    L.style.display = 'flex';
    let q = byId('sp-practice-quit');
    if (!q) { q = document.createElement('button'); q.id = 'sp-practice-quit'; q.className = 'btn'; q.innerText = '✕ やめる'; q.style.cssText = 'position:absolute;right:8px;top:8px;z-index:8;padding:5px 10px;font-size:13px;'; q.onclick = () => practiceExit(); L.appendChild(q); }
    q.style.display = '';
    practiceRound();
}
function practiceParams() {
    const r = spState.score, t = PRACTICE_TUNE[spState.kind] || {}, k = spState.kind;
    const P = { sp: Math.min(2.6, (0.85 + 0.09 * r) * (t.sp || 1)), len: Math.max(0.5, (1.05 - 0.04 * r) * (t.len || 1)), hp: 3, practice: true, round: r, timeMul: t.timeMul || 1 };
    if (k === 'match') P.pairs = r >= 8 ? 6 : (r >= 4 ? 5 : 4);
    if (k === 'simon') { P.btn = r >= 6 ? 6 : 4; P.need = Math.min(8, 4 + Math.floor(r / 3)); }
    if (k === 'shell') P.extra = Math.floor(r * 0.8);
    if (k === 'sort') P.n = r >= 9 ? 7 : (r >= 4 ? 6 : 5);
    if (k === 'stars') P.starAdd = Math.min(5, Math.floor(r / 3));
    if (k === 'odd') P.off = Math.min(2, Math.floor(r / 4));
    if (t.time) P.limit = Math.max(t.time * 0.5, t.time * (1 - 0.03 * r)) + (k === 'match' ? (P.pairs - 4) * 8 : 0) + (k === 'sort' ? (P.n - 5) * 8 : 0);
    return P;
}
function practiceRound() {
    const st = spState; if (!st || !st.practice) return;
    const info = SP_INFO[st.kind];
    byId('sp-title').innerHTML = `⚓ ${info.ico} ${info.name}（練習） ⚓`;
    byId('sp-stage').innerHTML = '';
    spGame = null; st.waitCard = false; st.over = false;
    spApi.say(''); spApi.prog(0); spApi.hearts(0);
    const card = byId('sp-card');
    if (st.score === 0) {       // 最初のラウンドは毎回ルール説明（タップではじめる）
        card.innerHTML = spCardHtml(info.ico, info.name, info.text({ lives: 3, need: 3, chargeNeed: 3, deliverNeed: 5 }).replace(/捕獲/g, 'クリア') + `<br><small>※クリアするたびに、少しずつ難しくなります${PRACTICE_NOTE[st.kind] ? '<br>' + PRACTICE_NOTE[st.kind] : ''}</small>`, true);
        card.style.display = 'flex'; st.waitCard = true; st.token = (st.token || 0) + 1;
        return;
    }
    card.innerHTML = spCardHtml(info.ico, info.name, `${st.rewardMsg ? `<div style="color:#7fff7f;font-weight:bold;margin-bottom:6px;">${st.rewardMsg}</div>` : ''}<b style="font-size:22px;color:#ffe27a;">ラウンド ${st.score + 1}　READY…</b><br>スコア ${st.score * 100}点　ベスト ${Math.max(practiceBest(st.kind), st.score * 100)}点`, false);
    card.style.display = 'flex';
    const token = st.token = (st.token || 0) + 1;
    setTimeout(() => { if (spState === st && st.token === token) practiceStart(); }, 1000);
}
function practiceTimeLimit(g, limit) {
    const lab = spEl('', spApi.stage, { position: 'absolute', right: '6px', top: '4px', zIndex: 4, padding: '1px 8px', fontSize: '13px', fontWeight: 'bold', color: '#fff', background: 'rgba(0,0,0,.55)', border: '1px solid #ffe27a', borderRadius: '8px', pointerEvents: 'none' });
    let t = limit; const up = g.update;
    lab.innerText = `⏱ ${Math.ceil(t)}`;
    g.update = function (dt) {
        up && up.call(g, dt);
        if (!spGame) return;
        t -= dt; lab.innerText = `⏱ ${Math.max(0, Math.ceil(t))}`; if (t < 5) lab.style.color = '#ff8a8a';
        if (t <= 0) { spApi.flash('時間切れ…', '#ff7777'); spApi.lose(); }
    };
}
function practiceStart() {
    const st = spState;
    if (!st || !st.practice || st.over || gameState !== 'SPECIAL' || spGame) return;
    byId('sp-card').style.display = 'none'; st.waitCard = false; st.rewardMsg = null;
    const P = practiceParams();
    spGame = SPG[st.kind](spApi, P);
    if (P.limit) practiceTimeLimit(spGame, P.limit);
    spLast = 0;
    cancelAnimationFrame(spRaf);
    spRaf = requestAnimationFrame(spTick);
}
const _spCardOk301 = spCardOk;
spCardOk = function () { if (spState && spState.practice) { practiceStart(); return; } return _spCardOk301(); };
const _spStageEnd301 = spStageEnd;
spStageEnd = function (win) {
    if (!spState || !spState.practice) return _spStageEnd301(win);
    if (!spGame) return;
    const st = spState;
    spGame = null; cancelAnimationFrame(spRaf);
    spApi.flash(win ? 'CLEAR!' : 'GAME OVER', win ? '#ffe27a' : '#ff6666');
    playSE(win ? 'success' : 'foul');
    setTimeout(() => {
        if (spState !== st) return;
        if (win) { st.score++; practiceRecord(st); practiceReward(st); practiceRound(); } else practiceOver();
    }, 900);
};
function practiceReward(st) {
    const rw = PRACTICE_REWARDS.find(x => x[0] === st.score);
    if (!rw) return;
    playerData.gold = (playerData.gold || 0) + rw[1];
    st.earned = (st.earned || 0) + rw[1];
    savePlayerData(); updateMenuUI();
    st.rewardMsg = `🎁 ${st.score}ラウンド達成！ +${rw[1].toLocaleString()}G`;
}
function practiceRecord(st) {
    const sc = st.score * 100;
    playerData.spBest = playerData.spBest || {};
    if (sc > (playerData.spBest[st.kind] || 0)) { playerData.spBest[st.kind] = sc; savePlayerData(); return true; }
    return false;
}
function practiceOver() {
    const st = spState; if (!st) return;
    st.over = true;
    const sc = st.score * 100, newBest = practiceRecord(st) && sc > 0;
    spClearFlash();
    const info = SP_INFO[st.kind], card = byId('sp-card');
    card.innerHTML = spCardHtml(info.ico, info.name, `<b style="font-size:20px;color:#ffe27a;">けっか</b><br>スコア <b style="font-size:26px;color:#fff;">${sc}</b> 点${newBest ? ' <span style="color:#ff8;">🎉 ベスト更新！</span>' : ''}<br>ベスト ${practiceBest(st.kind)} 点（${st.score}ラウンドクリア）${st.earned ? `<br><span style="color:#7fff7f;">🎁 ごほうび +${st.earned.toLocaleString()}G</span>` : ''}`, false)
        + `<div style="display:flex;gap:8px;margin-top:4px;flex-wrap:wrap;justify-content:center;"><button class="btn" style="padding:8px 14px;font-size:15px;" onclick="practiceAgain()">もう一度</button><button class="btn" style="padding:8px 14px;font-size:15px;" onclick="practiceExit()">もどる</button></div>`;
    card.style.display = 'flex';
}
function practiceAgain() { if (!spState || !spState.practice) return; spState.score = 0; spState.earned = 0; spState.rewardMsg = null; practiceRound(); }
function practiceExit() {
    const st = spState;
    if (st && st.practice) { practiceRecord(st); }
    spGame = null; cancelAnimationFrame(spRaf);
    spClearFlash();
    const L = byId('sp-layer'); if (L) L.style.display = 'none';
    const q = byId('sp-practice-quit'); if (q) q.style.display = 'none';
    byId('sp-card').style.display = 'none';
    gameState = (st && st.prevState) || 'MENU';
    spState = null;
    openPracticeList();
}


/* ---- V3.1.1 画面サイズ対応（実際の表示領域に合わせる／縦画面固定） ---- */
(function () {
    const fit = () => {
        const vv = window.visualViewport, h = Math.round((vv && vv.height) || window.innerHeight);
        document.documentElement.style.setProperty('--app-h', h + 'px');
    };
    fit();
    ['resize', 'orientationchange'].forEach(e => window.addEventListener(e, () => { fit(); setTimeout(fit, 250); }));
    if (window.visualViewport) window.visualViewport.addEventListener('resize', fit);
    const lock = () => { try { if (screen.orientation && screen.orientation.lock) screen.orientation.lock('portrait').catch(() => {}); } catch (e) {} };
    lock(); window.addEventListener('pointerdown', lock, { once: true });
    // 横向きの間は操作を止める（ガード画面が全面を覆う）。音も一時停止。
    const mq = window.matchMedia('(orientation: landscape) and (pointer: coarse) and (max-height: 600px)');
    const onRot = () => { try { if (mq.matches) { if (typeof audioCtx !== 'undefined' && audioCtx && audioCtx.suspend) audioCtx.suspend(); } else if (typeof audioCtx !== 'undefined' && audioCtx && audioCtx.resume) audioCtx.resume(); } catch (e) {} };
    if (mq.addEventListener) mq.addEventListener('change', onRot);
})();
