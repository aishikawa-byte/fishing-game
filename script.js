/* ===================================================
   マップ（釣り場）設定
   =================================================== */
const MAP_DATA = {
    sea: { name: "海", bg: "images/bg/bg_sea.png", reqLevel: 1, sound: "sounds/sea.mp3" },
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
    milkyway: { name: "天の川", bg: "images/bg/bg_milkyway.png", reqLevel: 1, gacha: true, matchRod: "galaxy_rod", sound: "sounds/milkyway.mp3" }
};

let currentLocation = "sea";
let currentToolMode = "rod"; // "rod" or "net"
let currentShopTab = "rod";  // "rod" or "net"
let currentGachaSeries = "volcano"; // 現在選択中のガチャキー

/* ===================================================
   ガチャシリーズ定義（全7種）
   =================================================== */
const GACHA_SERIES_LIST = [
    { key: "volcano", title: "🌋 火山ガチャ", mapKey: "volcano", mapName: "🌋 火山エリア解放", rodKey: "lava_rod", rodName: "🔥 耐溶岩釣り竿", banner: "images/banner/banner_volcano.png", color: "#ff4444" },
    { key: "honey", title: "🍯 はちみつガチャ", mapKey: "honey", mapName: "🍯 はちみつエリア解放", rodKey: "jungle_rod", rodName: "🌿 ジャングルの釣り竿", banner: "images/banner/banner_honey.png", color: "#ffcc00" },
    { key: "holy", title: "✨ 聖なる泉ガチャ", mapKey: "holy", mapName: "✨ 聖なる泉エリア解放", rodKey: "holy_rod", rodName: "⭐ 聖なる釣り竿", banner: "images/banner/banner_holy.png", color: "#00ffcc" },
    { key: "ryugu", title: "⛩️ 竜宮城ガチャ", mapKey: "ryugu", mapName: "⛩️ 竜宮城エリア解放", rodKey: "ryugu_rod", rodName: "👑 乙姫の釣り竿", banner: "images/banner/banner_ryugu.png", color: "#ff66cc" },
    { key: "ruins", title: "🏛️ 古代遺跡ガチャ", mapKey: "ruins", mapName: "🏛️ 古代遺跡エリア解放", rodKey: "ruins_rod", rodName: "🗿 古代の発掘竿", banner: "images/banner/banner_ruins.png", color: "#d2b48c" },
    { key: "poison", title: "☠️ 毒沼ガチャ", mapKey: "poison", mapName: "☠️ 毒沼エリア解放", rodKey: "poison_rod", rodName: "🧪 解毒の釣り竿", banner: "images/banner/banner_poison.png", color: "#a020f0" },
    { key: "milkyway", title: "🌌 天の川ガチャ", mapKey: "milkyway", mapName: "🌌 天の川エリア解放", rodKey: "galaxy_rod", rodName: "🌌 銀河の釣り竿", banner: "images/banner/banner_milkyway.png", color: "#1e90ff" }
];

let currentGachaIndex = 0;

/* ===================================================
   釣り竿データ
   =================================================== */
const ROD_DATA = {
    wood: { id: "wood", name: "木の竿", icon: "images/fishingrod/wood_fishing_rod.png", price: 0, desc: "初期装備の質素な竿。特別な能力はない。" },
    iron: { id: "iron", name: "鉄の竿", icon: "images/fishingrod/iron_fishing_rod.png", price: 1200, desc: "頑丈な金属製の竿。連打パワーが増加し大物を釣りやすい。" },
    gold: { id: "gold", name: "金の竿", icon: "images/fishingrod/gold_fishing_rod.png", price: 5000, desc: "黄金に輝く竿。大物やレアな魚がヒットする確率がアップ！" },
    bronze: { id: "bronze", name: "青銅の竿", icon: "images/fishingrod/copper_fishing_rod.png", price: 12000, desc: "深海エリア専用の特化竿。ヒット判定と連打時間が少し長くなる。" },
    legend: { id: "legend", name: "伝説の竿", icon: "images/fishingrod/legendary_fishing_rod.png", price: 40000, desc: "太古の神木で作られた幻の竿。すべてのエリアで全能力が大幅UP！" },

    lava_rod: { id: "lava_rod", name: "耐溶岩釣り竿", icon: "images/fishingrod/lava_fishing_rod.png", price: 0, gacha: true, desc: "火山エリア特化。溶岩の熱に耐え、通常通りの待ち時間で釣りが可能！" },
    jungle_rod: { id: "jungle_rod", name: "ジャングルの釣り竿", icon: "images/fishingrod/jungle_fishing_rod.png", price: 0, gacha: true, desc: "はちみつエリア特化。粘り気のあるはちみつでもスムーズに釣りが可能！" },
    holy_rod: { id: "holy_rod", name: "聖なる釣り竿", icon: "images/fishingrod/holy_fishing_rod.png", price: 0, gacha: true, desc: "聖なる泉エリア特化。聖なる力を宿し、通常通りの待ち時間で釣りが可能！" },
    dragon_rod: { id: "dragon_rod", name: "龍神の竿", icon: "images/fishingrod/dragon_fishing_rod.png", price: 0, gacha: true, desc: "龍神の加護を受けた究極の秘竿。全特殊エリアで待ち時間なし＋レア大物超大幅UP！" },
    ryugu_rod: { id: "ryugu_rod", name: "乙姫の釣り竿", icon: "images/fishingrod/ryugu_rod.png", price: 0, gacha: true, desc: "竜宮城エリア特化。海底の海底神殿でも安定して釣りが可能！" },
    ruins_rod: { id: "ruins_rod", name: "古代の発掘竿", icon: "images/fishingrod/ruins_rod.png", price: 0, gacha: true, desc: "古代遺跡エリア特化。太古の呪いを無効化して釣りが可能！" },
    poison_rod: { id: "poison_rod", name: "解毒の釣り竿", icon: "images/fishingrod/poison_rod.png", price: 0, gacha: true, desc: "毒沼エリア特化。強力な毒素を浄化し、安全に釣りが可能！" },
    galaxy_rod: { id: "galaxy_rod", name: "銀河の釣り竿", icon: "images/fishingrod/galaxy_rod.png", price: 0, gacha: true, desc: "天の川エリア特化。星々の輝きで宇宙生物を引き寄せる！" }
};

/* ===================================================
   捕獲ネットデータ
   =================================================== */
const NET_DATA = {
    bug_net: { id: "bug_net", name: "虫取り網", icon: "images/net/net_bug.png", price: 0, desc: "初期装備の小さな網。小さな水生生物や昆虫を捕獲可能。", targetSize: ["small"] },
    tough_net: { id: "tough_net", name: "丈夫な網", icon: "images/net/net_tough.png", price: 1500, desc: "ナイロン製の破れにくい網。普通サイズの生物まで捕獲可能。", targetSize: ["small", "midi"] },
    iron_net: { id: "iron_net", name: "鉄の網", icon: "images/net/net_iron.png", price: 6000, desc: "鉄線で編まれた強力な網。大きな生き物までガッチリ捕獲！", targetSize: ["small", "midi", "big"] },
    steel_net: { id: "steel_net", name: "鋼鉄ネット", icon: "images/net/net_steel.png", price: 20000, desc: "最高度の鋼鉄製巨大ネット。特大の生物や伝説の怪物もすくい上げる！", targetSize: ["small", "midi", "big", "biggest"] },
    divine_net: { id: "divine_net", name: "神獣の網", icon: "images/net/net_divine.png", price: 0, gacha: true, desc: "神々の祝福を受けた究極のネット。全生物を最高速度で簡単に捕獲！", targetSize: ["small", "midi", "big", "biggest"] }
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
    
    buy_all_shop: { id: "buy_all_shop", name: "ぜ～んぶください！", icon: "images/trophy/trophy_gold.png", desc: "ショップのすべてのアイテム（竿）を購入した" },
    rich_man: { id: "rich_man", name: "大金持ち", icon: "images/trophy/trophy_silver.png", desc: "所持金が10,000ゴールドに達した" },
    all_maps: { id: "all_maps", name: "航海時代", icon: "images/trophy/trophy_gold.png", desc: "すべての基本エリア(全7箇所)を解放した" },
    zukan_master: { id: "zukan_master", name: "伝説の釣り人", icon: "images/trophy/trophy_gold.png", desc: "おさかな絵巻(全種類の魚)をコンプリートした" }
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
    { id: 75, name: "チョウチンアンコウ", location: "deepsea", toolType: "rod", price: 600, image: "images/fish/fish_chouchin.png", shadowImage: "images/shadows/shadow_big.png", desc: "頭の発光器で獲物を誘い込んで捕食する深海魚。", reqTime: 0.550, shadowWidth: 120, shadowHeight: 55, isBig: false, weight: 10, tapPower: 9, decaySpeed: 1.3 },
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
    { id: 168, name: "マグマウニ", location: "volcano", toolType: "net", netSize: "small", price: 180, image: "images/fish/volcano/magmauni.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】赤く発熱するトゲを身にまとった火口底のウニ。", reqTime: 0.900, shadowWidth: 45, shadowHeight: 45, isBig: false, weight: 35 },
    { id: 81, name: "ヒノコカゲロウ", location: "volcano", toolType: "net", netSize: "small", price: 200, image: "images/fish/volcano/net_hinoko.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】溶岩の熱気の中に発生する高熱の水生昆虫の成虫。", reqTime: 0.750, shadowWidth: 40, shadowHeight: 20, isBig: false, weight: 30 },
    { id: 169, name: "ヒノコヤドカリ", location: "volcano", toolType: "net", netSize: "small", price: 220, image: "images/fish/volcano/hinokoyadokari.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】軽石を貝殻代わりにして火口付近をトコトコ歩く。", reqTime: 0.850, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 30 },
    { id: 170, name: "カルデラクラゲ", location: "volcano", toolType: "net", netSize: "midi", price: 280, image: "images/fish/volcano/karuderakurage.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】溶岩の上昇気流に乗ってふんわり浮かぶ熱帯クラゲ。", reqTime: 0.750, shadowWidth: 65, shadowHeight: 50, isBig: false, weight: 25 },
    { id: 171, name: "マグマエビ", location: "volcano", toolType: "net", netSize: "midi", price: 380, image: "images/fish/volcano/magmaebi.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】高熱に耐える硬い殻に覆われた、高級感漂うエビ。", reqTime: 0.650, shadowWidth: 75, shadowHeight: 40, isBig: false, weight: 20 },
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
    { id: 186, name: "ルミナスナイルパーチ", location: "holy", toolType: "rod", price: 1200, image: "images/fish/holy/ruminasupairupa-ti.png", shadowImage: "images/shadows/shadow_big.png", desc: "青白い聖なる光を全身から放ちながら静かに泳ぐ大型魚。", reqTime: 0.400, shadowWidth: 140, shadowHeight: 50, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.3 },
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
    { id: 110, name: "オトヒメエビ", location: "ryugu", toolType: "rod", price: 500, image: "images/fish/ryugu/otohimeebi.png", shadowImage: "images/shadows/shadow_small.png", desc: "海底宮殿に住まう優雅で色鮮やかな珍しいエビ。", reqTime: 0.450, shadowWidth: 70, shadowHeight: 30, isBig: false, weight: 20 },
    { id: 193, name: "海底の財宝箱", location: "ryugu", toolType: "rod", price: 600, image: "images/fish/ryugu/takarabako.png", shadowImage: "images/shadows/shadow_midi.png", desc: "サンゴが着生した、金貨や宝石が詰まった重厚な木箱。", reqTime: 0.500, shadowWidth: 80, shadowHeight: 40, isBig: false, weight: 20 },
    { id: 194, name: "伝説の黄金剣", location: "ryugu", toolType: "rod", price: 750, image: "images/fish/ryugu/sword.png", shadowImage: "images/shadows/shadow_midi.png", desc: "海底の岩に突き刺さっていた、錆びることのない黄金の剣。", reqTime: 0.450, shadowWidth: 90, shadowHeight: 35, isBig: false, weight: 15 },
    { id: 196, name: "龍神の黄金冠", location: "ryugu", toolType: "rod", price: 1500, image: "images/fish/ryugu/kanmuri.png", shadowImage: "images/shadows/shadow_big.png", desc: "龍神が戴いていたとされる、巨大な宝玉が嵌め込まれた絢爛豪華な冠。", reqTime: 0.380, shadowWidth: 130, shadowHeight: 50, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.4 },
    { id: 197, name: "ポセイドンの三叉槍", location: "ryugu", toolType: "rod", price: 3000, image: "images/fish/ryugu/pose_yari.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "海を統べる神の力が宿る黄金の槍。波を割るほどの猛烈な引き。", reqTime: 0.350, shadowWidth: 180, shadowHeight: 50, isBig: true, weight: 4, tapPower: 5, decaySpeed: 1.6 },
    { id: 205, name: "貝殻", location: "ryugu", toolType: "net", netSize: "small", price: 50, image: "images/fish/ryugu/shell.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】海辺や海底で取れるきれいな模様の貝殻。", reqTime: 1.000, shadowWidth: 35, shadowHeight: 25, isBig: false, weight: 45 },
    { id: 208, name: "サンゴ", location: "ryugu", toolType: "net", netSize: "midi", price: 280, image: "images/fish/ryugu/coral.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】海底に生息する色鮮やかで美しい枝状のサンゴ。", reqTime: 0.850, shadowWidth: 60, shadowHeight: 45, isBig: false, weight: 35 },
    { id: 206, name: "琥珀", location: "ryugu", toolType: "net", netSize: "small", price: 300, image: "images/fish/ryugu/amber.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】太古の樹脂が化石化した、温かみのある黄金色の宝石。", reqTime: 0.800, shadowWidth: 40, shadowHeight: 30, isBig: false, weight: 30 },
    { id: 207, name: "パール", location: "ryugu", toolType: "net", netSize: "small", price: 350, image: "images/fish/ryugu/pearl.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】アコヤガイから採れる、気品ある美しい光沢を持った真珠。", reqTime: 0.800, shadowWidth: 35, shadowHeight: 35, isBig: false, weight: 30 },
    { id: 111, name: "タマテバコガイ", location: "ryugu", toolType: "net", netSize: "small", price: 350, image: "images/fish/ryugu/tamatebakogai.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】開けると白い煙が立ち込めるという伝説の二枚貝。", reqTime: 0.650, shadowWidth: 50, shadowHeight: 35, isBig: false, weight: 25 },
    { id: 201, name: "クリスタルゴブレット", location: "ryugu", toolType: "net", netSize: "midi", price: 380, image: "images/fish/ryugu/goburetto.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】海底の砂の中から美しく輝く透明な水晶の盃。", reqTime: 0.800, shadowWidth: 50, shadowHeight: 40, isBig: false, weight: 30 },
    { id: 198, name: "龍の翡翠玉", location: "ryugu", toolType: "net", netSize: "small", price: 400, image: "images/fish/ryugu/ryuuhisui.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】吸い込まれそうな深い緑の光を放つ最極上の翡翠。", reqTime: 0.750, shadowWidth: 40, shadowHeight: 40, isBig: false, weight: 25 },
    { id: 199, name: "海賊の金貨袋", location: "ryugu", toolType: "net", netSize: "small", price: 450, image: "images/fish/ryugu/kaizokunohukuro.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】金貨がずっしりと詰まった、沈没船から流れてきた革袋。", reqTime: 0.700, shadowWidth: 45, shadowHeight: 35, isBig: false, weight: 25 },
    { id: 200, name: "青真珠のネックレス", location: "ryugu", toolType: "net", netSize: "small", price: 500, image: "images/fish/ryugu/aosinnzyuneck.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】深海の青い輝きを秘めた大粒の青真珠の首飾り。", reqTime: 0.650, shadowWidth: 45, shadowHeight: 35, isBig: false, weight: 20 },
    { id: 209, name: "ジュエル", location: "ryugu", toolType: "net", netSize: "small", price: 600, image: "images/fish/ryugu/jewel.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】まばゆい輝きを放つ、カットの施された最高級の宝石。", reqTime: 0.700, shadowWidth: 40, shadowHeight: 40, isBig: false, weight: 20 },
    { id: 202, name: "古代の金の壺", location: "ryugu", toolType: "net", netSize: "big", price: 900, image: "images/fish/ryugu/kodai_tubo.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】美しい浮き彫りが施された、重みのある古代の黄金の壺。", reqTime: 0.500, shadowWidth: 100, shadowHeight: 50, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.3 },

    // 12. 古代遺跡（竿/網）
    { id: 118, name: "オウムガイ", location: "ruins", toolType: "rod", price: 420, image: "images/fish/ruins/oumugai.png", shadowImage: "images/shadows/shadow_midi.png", desc: "「生きた化石」と呼ばれる殻を持った頭足類。", reqTime: 0.600, shadowWidth: 80, shadowHeight: 35, isBig: false, weight: 25 },
    { id: 121, name: "アンモナイト", location: "ruins", toolType: "rod", price: 550, image: "images/fish/ruins/ammonite.png", shadowImage: "images/shadows/shadow_midi.png", desc: "太古の遺跡の水底で生き永らえていた巻貝状の頭足類。", reqTime: 0.450, shadowWidth: 80, shadowHeight: 40, isBig: false, weight: 20 },
    { id: 120, name: "ウミサソリ", location: "ruins", toolType: "rod", price: 680, image: "images/fish/ruins/umisagori.png", shadowImage: "images/shadows/shadow_midi.png", desc: "古生代の海に生息していた巨大な鋏角類。", reqTime: 0.550, shadowWidth: 85, shadowHeight: 35, isBig: false, weight: 20 },
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
    { id: 130, name: "三葉虫", location: "ruins", toolType: "net", netSize: "small", price: 380, image: "images/fish/ruins/sanyoutyu.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】石のスキマをモゾモゾと網這い回る古代の節足動物。", reqTime: 0.700, shadowWidth: 55, shadowHeight: 30, isBig: false, weight: 25 },
    { id: 134, name: "カブトガニ", location: "ruins", toolType: "net", netSize: "midi", price: 400, image: "images/fish/ruins/horseshoe_crab.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】ドーム状の甲羅と剣のような尾を持つ生きている化石。", reqTime: 0.750, shadowWidth: 65, shadowHeight: 40, isBig: false, weight: 20 },
    { id: 133, name: "カブトガニの化石", location: "ruins", toolType: "net", netSize: "midi", price: 450, image: "images/fish/ruins/horseshoe_crab_fossil.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】太古の姿を綺麗に残したカブトガニの化石。", reqTime: 0.800, shadowWidth: 60, shadowHeight: 40, isBig: false, weight: 20 },
    { id: 131, name: "オパビニア", location: "ruins", toolType: "net", netSize: "small", price: 500, image: "images/fish/ruins/opabinia.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】5つの目を持ち、長いノズルで捕食する珍妙なカンブリア生物。", reqTime: 0.650, shadowWidth: 50, shadowHeight: 25, isBig: false, weight: 20 },
    { id: 135, name: "アンモナイトの化石", location: "ruins", toolType: "net", netSize: "midi", price: 500, image: "images/fish/ruins/ammonite_fossil.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】美しい螺旋模様がそのまま残ったアンモナイトの化石。", reqTime: 0.750, shadowWidth: 65, shadowHeight: 45, isBig: false, weight: 15 },
    { id: 137, name: "アーケロン", location: "ruins", toolType: "net", netSize: "biggest", price: 1200, image: "images/fish/ruins/akeron.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】全長4メートルを超える白亜紀の超巨大ウミガメ。", reqTime: 0.500, shadowWidth: 130, shadowHeight: 60, isBig: true, weight: 10, tapPower: 7, decaySpeed: 1.3 },
    { id: 136, name: "ネッシーの化石", location: "ruins", toolType: "net", netSize: "biggest", price: 1500, image: "images/fish/ruins/nessy_fossil.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】幻の水首長竜の骨の一部と思われる超貴重な化石。", reqTime: 0.500, shadowWidth: 120, shadowHeight: 50, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.3 },

    // 13. 毒沼 (poison) - 竿/網
    { id: 211, name: "ゴンズイ", location: "poison", toolType: "rod", price: 220, image: "images/fish/poison/gonzui.png", shadowImage: "images/shadows/shadow_small.png", desc: "集団で固まって泳ぐ。背ビレと胸ビレに激痛を伴う毒棘を持つ。", reqTime: 0.700, shadowWidth: 60, shadowHeight: 25, isBig: false, weight: 30 },
    { id: 210, name: "ミノカサゴ", location: "poison", toolType: "rod", price: 280, image: "images/fish/poison/minokazsago.png", shadowImage: "images/shadows/shadow_midi.png", desc: "華やかな大きなヒレの棘に強い毒を持つ優雅な危険魚。", reqTime: 0.650, shadowWidth: 80, shadowHeight: 35, isBig: false, weight: 25 },
    { id: 114, name: "ドクナマズ", location: "poison", toolType: "rod", price: 480, image: "images/fish/poison/dokunamazu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "紫色の毒液を体表から染み出させている不気味なナマズ。", reqTime: 0.500, shadowWidth: 100, shadowHeight: 40, isBig: false, weight: 20 },
    { id: 212, name: "アカエイ", location: "poison", toolType: "rod", price: 380, image: "images/fish/poison/akaei.png", shadowImage: "images/shadows/shadow_big.png", desc: "尻尾の付け根に鋸歯状の鋭い猛毒針を持つエイ。", reqTime: 0.550, shadowWidth: 110, shadowHeight: 45, isBig: false, weight: 20 },
    { id: 213, name: "バラハタ", location: "poison", toolType: "rod", price: 650, image: "images/fish/poison/barahata.png", shadowImage: "images/shadows/shadow_big.png", desc: "鮮やかな赤に斑点模様を持つハタ。食物連鎖でシガテラ毒を蓄積する。", reqTime: 0.480, shadowWidth: 120, shadowHeight: 40, isBig: true, weight: 10, tapPower: 9, decaySpeed: 1.3 },
    { id: 215, name: "トラフグ", location: "poison", toolType: "rod", price: 800, image: "images/fish/poison/torahugu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "フグの最高級品種。内臓に致死性の猛毒テトロドトキシンを持つ。", reqTime: 0.500, shadowWidth: 90, shadowHeight: 45, isBig: false, weight: 15 },
    { id: 216, name: "オニダルマオコゼ", location: "poison", toolType: "rod", price: 950, image: "images/fish/poison/onidaruma.png", shadowImage: "images/shadows/shadow_midi.png", desc: "岩そっくりに擬態する。背ビレの毒棘は踏むと死に至ることもある最恐魚。", reqTime: 0.450, shadowWidth: 95, shadowHeight: 45, isBig: false, weight: 12 },
    { id: 214, name: "オオウナギ（毒沼変異）", location: "poison", toolType: "rod", price: 1800, image: "images/fish/poison/oounagi.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "毒沼の環境に適応し、体内に強力な毒素を溜め込んで巨大化した主。", reqTime: 0.350, shadowWidth: 170, shadowHeight: 45, isBig: true, weight: 5, tapPower: 6, decaySpeed: 1.5 },
    { id: 220, name: "ガンガゼ", location: "poison", toolType: "net", netSize: "small", price: 250, image: "images/fish/poison/gangaze.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】非常に長く折れやすい毒針を無数に生やした危険なウニの仲間。", reqTime: 0.850, shadowWidth: 50, shadowHeight: 50, isBig: false, weight: 30 },
    { id: 217, name: "スベスベマンジュウガニ", location: "poison", toolType: "net", netSize: "small", price: 300, image: "images/fish/poison/manju_kani.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】滑らかな丸い甲羅が美味しそうだが、麻痺性貝毒やテトロドトキシンを持つ。", reqTime: 0.800, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 30 },
    { id: 115, name: "ポイズンヤドクガエル", location: "poison", toolType: "net", netSize: "small", price: 320, image: "images/fish/poison/yadokugaeru.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】派手な毒々しい色をした毒沼固有のカエル。", reqTime: 0.750, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 25 },
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
    { id: 232, name: "ブラックホールタコ", location: "milkyway", toolType: "net", netSize: "big", price: 950, image: "images/fish/milkyway/blaxk_tako.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】中心に光を吸い込むかのような暗黒を宿した、天の川の暗部に潜む大タコ。", reqTime: 0.480, shadowWidth: 120, shadowHeight: 60, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.3 }
];

let gameState = 'TITLE';
let isZukanOpen = false;
let currentZukanMainTab = 'normal';
let currentFilter = 'all';
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

let playerData = JSON.parse(localStorage.getItem('retro_fishing_player_v1')) || {
    level: 1,
    exp: 0,
    gold: 0,
    equippedRod: "wood",
    ownedRods: ["wood"],
    equippedNet: "bug_net",
    ownedNets: ["bug_net"],
    unlockedGachaMaps: [],
    totalCatches: 0,
    currentCombo: 0,
    netCatches: 0,
    netCombo: 0,
    achievements: []
};

let caughtFish = JSON.parse(localStorage.getItem('retro_fishing_zukan_v4')) || {};

let audioCtx = null;
let titleBgm = null;
let currentBgm = null;
let currentBgmPath = null;

function savePlayerData() {
    localStorage.setItem('retro_fishing_player_v1', JSON.stringify(playerData));
}

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (!titleBgm) {
        titleBgm = document.getElementById('title-bgm');
        if (titleBgm) titleBgm.volume = 0.02;
    }
}

/* 自然なBGMフェード切り替え処理 */
function playBgm(soundPath, isTitle = false) {
    if (!soundEnabled) return;
    initAudio();

    if (isTitle) {
        if (currentBgm && currentBgm !== titleBgm) {
            fadeOutAudio(currentBgm);
        }
        currentBgm = titleBgm;
        currentBgmPath = 'title';
        if (titleBgm) {
            titleBgm.volume = 0.02;
            titleBgm.play().catch(() => {});
        }
        return;
    }

    if (currentBgmPath === soundPath && currentBgm && !currentBgm.paused) {
        return; 
    }

    if (currentBgm) {
        fadeOutAudio(currentBgm);
    }

    const newAudio = new Audio(soundPath);
    newAudio.loop = true;
    newAudio.volume = 0.0;
    
    currentBgm = newAudio;
    currentBgmPath = soundPath;

    newAudio.play().then(() => {
        fadeInAudio(newAudio, 0.02);
    }).catch(() => {});
}

function fadeOutAudio(audio) {
    if (!audio) return;
    let vol = audio.volume;
    const fadeOutTimer = setInterval(() => {
        vol -= 0.003;
        if (vol <= 0.001) {
            vol = 0;
            audio.pause();
            clearInterval(fadeOutTimer);
        } else {
            audio.volume = vol;
        }
    }, 50);
}

function fadeInAudio(audio, targetVol) {
    if (!audio) return;
    let vol = 0;
    audio.volume = 0;
    const fadeInTimer = setInterval(() => {
        vol += 0.002;
        if (vol >= targetVol) {
            audio.volume = targetVol;
            clearInterval(fadeInTimer);
        } else {
            audio.volume = vol;
        }
    }, 50);
}

function updateStageBgm() {
    if (!soundEnabled) return;
    if (gameState === 'TITLE' || gameState === 'MENU' || gameState === 'GACHA' || isZukanOpen) {
        playBgm(null, true);
    } else {
        const mapObj = MAP_DATA[currentLocation];
        if (mapObj && mapObj.sound) {
            playBgm(mapObj.sound, false);
        }
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('sound-btn');
    const configBtn = document.getElementById('config-sound-btn');
    
    const text = soundEnabled ? "音: ON" : "音: OFF";
    if (btn) btn.innerText = text;
    if (configBtn) configBtn.innerText = text;

    initAudio();

    if (soundEnabled) {
        updateStageBgm();
        playWaterPlop();
    } else {
        if (currentBgm) currentBgm.pause();
        if (titleBgm) titleBgm.pause();
    }
}

function setToolMode(mode) {
    currentToolMode = mode;
    document.getElementById('mode-btn-rod').className = `tool-mode-btn ${mode === 'rod' ? 'active' : ''}`;
    document.getElementById('mode-btn-net').className = `tool-mode-btn ${mode === 'net' ? 'active' : ''}`;
    
    resetGameStateToReady();
    playWaterPlop();
}

function updateMenuUI() {
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

    document.getElementById('header-level').innerText = curLevel;
    document.getElementById('header-exp-percent').innerText = percent;
    document.getElementById('header-level-bar-inner').style.width = `${percent}%`;
    document.getElementById('header-gold').innerText = playerData.gold;
}

function closeAllModals() {
    const ids = [
        'map-modal', 'zukan-modal', 'howto-modal', 'shop-screen', 
        'gacha-screen', 'gacha-list-modal', 'config-modal', 
        'achievement-modal', 'zoom-modal', 'levelup-modal'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
    closeZukanDetail();
}

function goToMenu() {
    initAudio();
    closeAllModals();
    document.getElementById('title-screen').style.display = "none";
    document.getElementById('menu-screen').style.display = "flex";
    gameState = 'MENU';
    updateMenuUI();
    updateStageBgm();
    playWaterPlop();
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
   ガチャ関連機能（矢印切替＆7種対応）
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
    updateStageBgm();
    playWaterPlop();
}

function closeGachaScreen() {
    goToMenu();
}

// 次のシリーズへ（＞）
function nextGachaSeries() {
    currentGachaIndex = (currentGachaIndex + 1) % GACHA_SERIES_LIST.length;
    updateGachaSeriesUI();
}

// 前のシリーズへ（＜）
function prevGachaSeries() {
    currentGachaIndex = (currentGachaIndex - 1 + GACHA_SERIES_LIST.length) % GACHA_SERIES_LIST.length;
    updateGachaSeriesUI();
}

// ガチャ画面の表示更新
function updateGachaSeriesUI() {
    const series = GACHA_SERIES_LIST[currentGachaIndex];
    currentGachaSeries = series.key;

    // タイトル表示更新
    const titleElem = document.getElementById('gacha-series-title');
    if (titleElem) {
        titleElem.innerText = series.title;
    }

    // バナー画像更新
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
            <div class="gacha-list-sec-title" style="color:#00ffcc;">【専用特化ツール / レア】(確率: 各 1%)</div>
            <div class="gacha-list-item-group">
                ・${currentSeries.rodName}<br>
                ・🐉 龍神の竿 <span style="font-size:11px; color:#ffd700;">(超レア)</span><br>
                ・🔱 神獣の網 <span style="font-size:11px; color:#ffd700;">(ネット超レア)</span>
            </div>
        </div>

        <div class="gacha-list-section">
            <div class="gacha-list-sec-title" style="color:#aaa;">【ハズレ（釣りゴミ）アイテム】(確率: 合計84%)</div>
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
        alert("ゴールドが足りません！");
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

    const currentSeries = GACHA_SERIES_LIST[currentGachaIndex];

    const seriesMap = { 
        type: "map", 
        key: currentSeries.mapKey, 
        name: currentSeries.mapName, 
        icon: MAP_DATA[currentSeries.mapKey].bg, 
        weight: 5 
    };
    
    const seriesRod = { 
        type: "rod", 
        key: currentSeries.rodKey, 
        name: currentSeries.rodName, 
        icon: ROD_DATA[currentSeries.rodKey].icon, 
        weight: 1 
    };

    const pool = [
        seriesMap,
        seriesRod,
        { type: "rod", key: "dragon_rod", name: "🐉 龍神の竿", icon: "images/fishingrod/dragon_fishing_rod.png", weight: 1 },
        { type: "net", key: "divine_net", name: "🔱 神獣の網", icon: "images/net/net_divine.png", weight: 1 },

        { type: "trash", name: "🥫 空き缶 (10 G)", icon: TRASH_PATHS.kan, amount: 10, weight: 14.0 },
        { type: "trash", name: "👞 長靴 (10 G)", icon: TRASH_PATHS.kutu, amount: 10, weight: 14.0 },
        { type: "trash", name: "🛞 古タイヤ (20 G)", icon: TRASH_PATHS.tire, amount: 20, weight: 14.0 },
        { type: "trash", name: "🪵 流木 (10 G)", icon: TRASH_PATHS.ryuuboku, amount: 10, weight: 14.0 },
        { type: "trash", name: "🧹 ボロきれ (5 G)", icon: TRASH_PATHS.kire, amount: 5, weight: 14.0 },
        { type: "trash", name: "🌿 ワカメ (10 G)", icon: TRASH_PATHS.kaisou, amount: 10, weight: 14.0 },

        { type: "gold", amount: 50, name: "💰 50 Gold", icon: "data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'40\' fill=\'gold\'/></svg>", weight: 5.5 },
        { type: "gold", amount: 30, name: "💰 30 Gold", icon: "data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'40\' fill=\'gold\'/></svg>", weight: 5.5 }
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
        card.className = `gacha-result-card ${res.isTrash ? 'trash' : ''}`;
        const fallbackTrash = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='25' y='70' font-size='60' fill='gray'>🗑</text></svg>";
        card.innerHTML = `<img src="${res.icon}" alt="Icon" onerror="this.src='${fallbackTrash}'" onclick="zoomImage('${res.icon}')"><div>${res.name}</div>`;
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

function renderAchievementList() {
    const totalAchievements = Object.keys(ACHIEVEMENT_DATA).length;
    const unlockedCount = playerData.achievements ? playerData.achievements.length : 0;
    const percent = totalAchievements > 0 ? Math.floor((unlockedCount / totalAchievements) * 100) : 0;

    document.getElementById('achievement-progress-num').innerText = `${percent}% (${unlockedCount}/${totalAchievements})`;
    document.getElementById('achievement-progress-bar-inner').style.width = `${percent}%`;

    const list = document.getElementById('achievement-list');
    list.innerHTML = "";

    Object.keys(ACHIEVEMENT_DATA).forEach(key => {
        const ach = ACHIEVEMENT_DATA[key];
        const isUnlocked = playerData.achievements && playerData.achievements.includes(key);

        const item = document.createElement('div');
        item.className = `achievement-item ${isUnlocked ? 'unlocked' : ''}`;

        item.innerHTML = `
            <img class="achievement-icon" src="${ach.icon}" alt="Trophy">
            <div class="achievement-info">
                <span class="achievement-name">${isUnlocked ? ach.name : "？？？？？"}</span>
                <span class="achievement-desc">${ach.desc}</span>
            </div>
        `;
        list.appendChild(item);
    });
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

function checkAchievements() {
    if (!playerData.achievements) playerData.achievements = [];

    const totalUnlockedFish = Object.keys(caughtFish).filter(id => caughtFish[id] && caughtFish[id].unlocked).length;

    const netCatches = playerData.netCatches || 0;
    const netCombo = playerData.netCombo || 0;

    const conditions = [
        { id: "first_catch", cond: playerData.totalCatches >= 1 },
        { id: "fisherman", cond: playerData.totalCatches >= 20 },
        { id: "king_fisher", cond: playerData.totalCatches >= 100 },
        { id: "combo_master", cond: playerData.currentCombo >= 30 },
        { id: "rich_man", cond: playerData.gold >= 10000 },
        { id: "all_maps", cond: playerData.level >= 55 },
        
        { id: "comp_sea", cond: isAreaCompleted("sea") },
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

        { id: "buy_all_shop", cond: isShopAllBought() },

        { id: "net_first", cond: netCatches >= 1 },
        { id: "net_apprentice", cond: netCatches >= 20 },
        { id: "net_master", cond: netCatches >= 100 },
        { id: "net_combo_master", cond: netCombo >= 30 },

        { id: "zukan_master", cond: totalUnlockedFish >= FISH_DATA.length }
    ];

    conditions.forEach(item => {
        if (item.cond && !playerData.achievements.includes(item.id)) {
            playerData.achievements.push(item.id);
            savePlayerData();
            triggerAchievementToast(item.id);
        }
    });
}

function triggerAchievementToast(achId) {
    const ach = ACHIEVEMENT_DATA[achId];
    if (!ach) return;

    playSE('levelup');

    const toast = document.getElementById('achievement-toast');
    document.getElementById('toast-icon').src = ach.icon;
    document.getElementById('toast-name').innerText = ach.name;

    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

function resetAllData() {
    const c1 = window.confirm("本当にすべてのデータを削除しますか？\n（レベル、ゴールド、購入した竿・網、図鑑記録、実績が全消去されます）");
    if (c1) {
        const c2 = window.confirm("本当によろしいですか？この操作は取り消せません。");
        if (c2) {
            localStorage.removeItem('retro_fishing_zukan_v4');
            localStorage.removeItem('retro_fishing_player_v1');
            caughtFish = {};
            playerData = {
                level: 1, exp: 0, gold: 0, equippedRod: "wood",
                ownedRods: ["wood"], equippedNet: "bug_net", ownedNets: ["bug_net"],
                unlockedGachaMaps: [], totalCatches: 0, currentCombo: 0,
                netCatches: 0, netCombo: 0, achievements: []
            };
            savePlayerData();
            updateMenuUI();
            closeConfigModal();
            alert("すべてのデータを初期化しました。");
        }
    }
}

/* ===================================================
   ショップ関連
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
    renderShopList();
}

function renderShopList() {
    document.getElementById('shop-gold').innerText = playerData.gold;
    const list = document.getElementById('shop-list');
    list.innerHTML = "";

    if (!playerData.ownedNets) playerData.ownedNets = ["bug_net"];

    const itemDataSource = currentShopTab === 'rod' ? ROD_DATA : NET_DATA;
    const ownedItems = currentShopTab === 'rod' ? playerData.ownedRods : playerData.ownedNets;
    const equippedItem = currentShopTab === 'rod' ? playerData.equippedRod : playerData.equippedNet;

    Object.keys(itemDataSource).forEach(key => {
        const data = itemDataSource[key];
        const isOwned = ownedItems.includes(key);
        const isEquipped = equippedItem === key;

        const item = document.createElement('div');
        item.className = `shop-item ${isEquipped ? 'equipped' : ''}`;

        let btnHtml = "";
        if (isEquipped) {
            btnHtml = `<button class="btn" disabled>装備中</button>`;
        } else if (isOwned) {
            btnHtml = `<button class="btn" style="background:#006644;" onclick="equipItem('${currentShopTab}', '${key}')">装備する</button>`;
        } else {
            if (data.gacha) {
                btnHtml = `<button class="btn" disabled style="font-size:10px;">ガチャ限定</button>`;
            } else {
                const canBuy = playerData.gold >= data.price;
                btnHtml = `<button class="btn" ${canBuy ? '' : 'disabled'} onclick="buyItem('${currentShopTab}', '${key}')">${data.price} G 購入</button>`;
            }
        }

        item.innerHTML = `
            <img class="shop-item-icon" src="${data.icon}" alt="${data.name}" onclick="zoomImage('${data.icon}')" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><rect x=\'40\' y=\'10\' width=\'20\' height=\'80\' fill=\'sienna\'/></svg>'">
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
    const itemData = type === 'rod' ? ROD_DATA[key] : NET_DATA[key];
    const ownedArray = type === 'rod' ? playerData.ownedRods : playerData.ownedNets;

    if (itemData && playerData.gold >= itemData.price && !ownedArray.includes(key)) {
        playerData.gold -= itemData.price;
        ownedArray.push(key);
        if (type === 'rod') playerData.equippedRod = key;
        else playerData.equippedNet = key;

        savePlayerData();
        renderShopList();
        updateMenuUI();
        playSE('success');
        checkAchievements();
    }
}

function equipItem(type, key) {
    const ownedArray = type === 'rod' ? playerData.ownedRods : playerData.ownedNets;
    if (ownedArray.includes(key)) {
        if (type === 'rod') playerData.equippedRod = key;
        else playerData.equippedNet = key;

        savePlayerData();
        renderShopList();
        updateMenuUI();
        playWaterPlop();
    }
}

/* ===================================================
   遊び方 / マップ選択モーダル
   =================================================== */
function openHowToPlay() {
    closeAllModals();
    document.getElementById('howto-modal').style.display = "flex";
}

function closeHowToPlay() {
    document.getElementById('howto-modal').style.display = "none";
}

function openMapModal() {
    initAudio();
    resetGameStateToReady();
    closeAllModals();
    renderMapGrid();
    document.getElementById('map-modal').style.display = "flex";
}

function closeMapModal() {
    document.getElementById('map-modal').style.display = "none";
}

function renderMapGrid() {
    const grid = document.getElementById('map-grid');
    grid.innerHTML = "";

    if (!playerData.unlockedGachaMaps) playerData.unlockedGachaMaps = [];

    Object.keys(MAP_DATA).forEach(locKey => {
        const map = MAP_DATA[locKey];
        let isUnlocked = playerData.level >= map.reqLevel;
        if (map.gacha) {
            isUnlocked = playerData.unlockedGachaMaps.includes(locKey);
        }

        const isCurrent = currentLocation === locKey;

        const btn = document.createElement('button');
        btn.className = `map-btn ${isCurrent ? 'active' : ''} ${isUnlocked ? '' : 'locked'}`;

        if (isUnlocked) {
            btn.innerText = `${map.name} ${map.gacha ? '(ガチャ)' : '(Lv.' + map.reqLevel + '〜)'}`;
            btn.onclick = () => selectLocation(locKey);
        } else {
            btn.innerText = map.gacha ? `🔒 ${map.name} (ガチャ限定)` : `🔒 ${map.name} (要 Lv.${map.reqLevel})`;
        }
        grid.appendChild(btn);
    });
}

function selectLocation(locKey) {
    const map = MAP_DATA[locKey];
    if (!map) return;

    if (map.gacha) {
        if (!playerData.unlockedGachaMaps.includes(locKey)) return;
    } else {
        if (playerData.level < map.reqLevel) return;
    }

    currentLocation = locKey;
    const container = document.getElementById('game-container');
    container.style.backgroundImage = `url('${map.bg}')`;
    document.getElementById('current-location-text').innerText = `【${map.name}】`;

    closeMapModal();
    updateStageBgm();
    playWaterPlop();
}

function getRandomFish() {
    const availableFish = FISH_DATA.filter(fish => fish.location === currentLocation && (fish.toolType || "rod") === currentToolMode);
    if (availableFish.length === 0) {
        return FISH_DATA.find(f => f.location === currentLocation) || FISH_DATA[0];
    }

    const totalWeight = availableFish.reduce((sum, fish) => sum + fish.weight, 0);

    let randomVal = Math.floor(Math.random() * totalWeight);
    for (const fish of availableFish) {
        if (randomVal < fish.weight) return fish;
        randomVal -= fish.weight;
    }
    return availableFish[0];
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
function openZukan() {
    initAudio();
    isZukanOpen = true;

    resetGameStateToReady();
    closeAllModals();

    updateStageBgm();

    switchZukanCategory('normal');
    document.getElementById('zukan-modal').style.display = "flex";
}

function switchZukanCategory(catKey) {
    currentZukanMainTab = catKey;
    currentFilter = 'all';

    document.getElementById('zukan-tab-normal').className = `zukan-main-tab ${catKey === 'normal' ? 'active' : ''}`;
    document.getElementById('zukan-tab-gacha').className = `zukan-main-tab ${catKey === 'gacha' ? 'active' : ''}`;

    renderZukanSubFilterUI();
    renderZukanGrid();
}

function renderZukanSubFilterUI() {
    const subFilterContainer = document.getElementById('zukan-sub-filter');
    subFilterContainer.innerHTML = "";

    let locations = [];
    if (currentZukanMainTab === 'normal') {
        locations = ['all', 'sea', 'river', 'swamp', 'lake', 'snow', 'underground', 'deepsea'];
    } else {
        locations = ['all', 'volcano', 'honey', 'holy', 'ryugu', 'ruins', 'poison', 'milkyway'];
    }

    locations.forEach(loc => {
        const name = loc === 'all' ? 'すべて' : (MAP_DATA[loc] ? MAP_DATA[loc].name : loc);
        const btn = document.createElement('button');
        btn.className = `filter-btn ${currentFilter === loc ? 'active' : ''}`;
        btn.innerText = name;
        btn.onclick = () => {
            currentFilter = loc;
            renderZukanSubFilterUI();
            renderZukanGrid();
        };
        subFilterContainer.appendChild(btn);
    });
}

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
        const actionVerb = currentToolMode === 'rod' ? '竿を振れ！' : '網を構えろ！';
        document.getElementById('status-text').innerText = `画面を叩いて${actionVerb}`;
        document.getElementById('status-text').style.color = "#fff";
    }
}

function renderZukanGrid() {
    const currentCategoryFishList = FISH_DATA.filter(fish => {
        const map = MAP_DATA[fish.location];
        const isGacha = map && map.gacha;
        return currentZukanMainTab === 'gacha' ? isGacha : !isGacha;
    });

    const totalFish = currentCategoryFishList.length;
    const unlockedCount = currentCategoryFishList.filter(fish => caughtFish[fish.id] && caughtFish[fish.id].unlocked).length;
    const percent = totalFish > 0 ? Math.floor((unlockedCount / totalFish) * 100) : 0;

    document.getElementById('zukan-progress-num').innerText = `${percent}% (${unlockedCount}/${totalFish})`;
    document.getElementById('zukan-progress-bar-inner').style.width = `${percent}%`;

    const gridContainer = document.getElementById('zukan-grid');
    gridContainer.innerHTML = "";

    const listToDisplay = currentCategoryFishList.filter(fish => {
        if (currentFilter === 'all') return true;
        return fish.location === currentFilter;
    });

    listToDisplay.forEach(fish => {
        const isUnlocked = caughtFish[fish.id] && caughtFish[fish.id].unlocked;
        const card = document.createElement('div');
        card.className = `zukan-card ${isUnlocked ? 'discovered' : ''}`;

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

function openZukanDetail(fish) {
    const modal = document.getElementById('zukan-detail-modal');
    const title = document.getElementById('zukan-detail-title');
    const img = document.getElementById('zukan-detail-img');
    const desc = document.getElementById('zukan-detail-desc');
    const price = document.getElementById('zukan-detail-price');
    const time = document.getElementById('zukan-detail-time');

    const locName = MAP_DATA[fish.location] ? MAP_DATA[fish.location].name : "不明";

    title.innerText = `【${fish.name}】`;
    img.src = fish.image;
    img.onerror = () => { img.src = fish.fallbackSvg; };
    desc.innerText = `[生息地: ${locName}] [種別: ${fish.toolType === 'net' ? '網捕獲' : '釣り竿'}]\n` + fish.desc;
    price.innerText = `買取価格: ${fish.price} G`;

    const best = caughtFish[fish.id].bestTime.toFixed(3);
    time.innerText = `最速記録: ${best}秒`;

    modal.style.display = "flex";
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
   効果音（SE）関連
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
        gain.connect(audioCtx.destination);
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
        gain.connect(audioCtx.destination);
        noise.start();
    } catch(e) {}
}

function playSE(type) {
    if (!soundEnabled || !audioCtx) return;
    if (type === 'signal') {
        playSplashSE();
        playTone(880, 0.15, 'sawtooth');
        setTimeout(() => playTone(1760, 0.25, 'sawtooth'), 60);
    } else if (type === 'success') {
        const notes = [523, 659, 783, 1046];
        notes.forEach((f, i) => setTimeout(() => playTone(f, 0.12, 'square'), i * 80));
    } else if (type === 'foul') {
        playTone(130, 0.35, 'sawtooth');
    } else if (type === 'tap') {
        playTone(400, 0.05, 'square');
    } else if (type === 'levelup') {
        const notes = [523, 659, 783, 1046, 1318, 1567];
        notes.forEach((f, i) => setTimeout(() => playTone(f, 0.15, 'triangle'), i * 70));
    }
}

function playTone(freq, duration, type = 'square') {
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch(e) {}
}

/* ===================================================
   ゲームメインループ・アクション処理
   =================================================== */
function handleAction() {
    initAudio();

    if (gameState === 'READY') {
        if (currentLocation === 'deepsea' && currentToolMode === 'rod') {
            const rod = playerData.equippedRod;
            if (rod !== 'bronze' && rod !== 'legend' && rod !== 'dragon_rod') {
                playSE('foul');
                document.getElementById('status-text').innerText = "青銅の竿か伝説の竿が必要だ！";
                document.getElementById('status-text').style.color = "#ff3333";
                return;
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

function setupFishShadow(fish) {
    const shadow = document.getElementById('fish-shadow');
    shadow.style.display = "block";
    shadow.style.width = `${fish.shadowWidth}px`;
    shadow.style.height = `${fish.shadowHeight}px`;

    if (fish.shadowImage) {
        shadow.style.backgroundImage = `url('${fish.shadowImage}')`;
        shadow.style.backgroundColor = "transparent";
    } else {
        shadow.style.backgroundImage = "none";
        shadow.style.backgroundColor = "rgba(0,0,0,0.7)";
        shadow.style.borderRadius = "50%";
    }

    let posX = -180;
    let posY = Math.random() * 80 + 360; 
    shadow.style.top = `${posY}px`;

    cancelAnimationFrame(shadowAnimId);
    
    function animateShadow() {
        posX += 2.2;
        if (posX > 500) posX = -180;
        const waveY = Math.sin(posX * 0.04) * 6;
        shadow.style.left = `${posX}px`;
        shadow.style.transform = `translateY(${waveY}px)`;

        if (gameState === 'WAITING' || gameState === 'SIGNAL') {
            shadowAnimId = requestAnimationFrame(animateShadow);
        }
    }
    shadowAnimId = requestAnimationFrame(animateShadow);
}

function hideFishShadow() {
    document.getElementById('fish-shadow').style.display = "none";
    cancelAnimationFrame(shadowAnimId);
}

function startWaiting() {
    gameState = 'WAITING';
    
    currentTargetFish = getRandomFish();

    document.getElementById('status-text').innerText = "じっと待て……";
    document.getElementById('status-text').style.color = "#fff";
    document.getElementById('exclamation').style.display = "none";

    const ripple = document.getElementById('ripple-effect');
    ripple.style.display = "block";
    ripple.style.left = "40%";
    ripple.style.top = "70%";

    playWaterPlop();
    setupFishShadow(currentTargetFish);

    const currentMapObj = MAP_DATA[currentLocation];
    const equippedRod = playerData.equippedRod;

    let isSlowWaiting = false;
    if (currentToolMode === 'rod' && currentMapObj && currentMapObj.gacha) {
        const reqRodKey = currentMapObj.matchRod;
        if (equippedRod !== reqRodKey && equippedRod !== 'legend' && equippedRod !== 'dragon_rod') {
            isSlowWaiting = true;
        }
    }

    const randomDelay = isSlowWaiting 
        ? Math.floor(Math.random() * 4000) + 8000
        : Math.floor(Math.random() * 3000) + 3000;

    timerId = setTimeout(() => {
        gameState = 'SIGNAL';
        startTime = Date.now();
        document.getElementById('exclamation').style.display = "block";
        document.getElementById('status-text').innerText = "今だ！合わせろ！";
        document.getElementById('status-text').style.color = "#ffd700";
        playSE('signal');

        let timeBonus = 1.0;
        if (currentToolMode === 'rod') {
            const rod = playerData.equippedRod;
            if (rod === 'bronze' && currentLocation === 'deepsea') timeBonus = 1.4;
            if (rod === 'legend' || rod === 'dragon_rod') timeBonus = 1.3;
        } else {
            const net = playerData.equippedNet || 'bug_net';
            if (net === 'divine_net') timeBonus = 1.5;
        }

        const limitTime = currentTargetFish.reqTime * timeBonus;

        clearTimeout(timeoutTimerId);
        timeoutTimerId = setTimeout(() => {
            if (gameState === 'SIGNAL') {
                hideFishShadow();
                document.getElementById('ripple-effect').style.display = "none";
                document.getElementById('exclamation').style.display = "none";
                playSE('foul');

                if (currentToolMode === 'rod') {
                    playerData.currentCombo = 0;
                } else {
                    playerData.netCombo = 0;
                }
                savePlayerData();
                showResult(false, currentTargetFish, limitTime + 0.1);
            }
        }, limitTime * 1000);

    }, randomDelay);
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
    savePlayerData();
    document.getElementById('status-text').innerText = "早合わせ！逃げられた！";
    document.getElementById('status-text').style.color = "#ff3333";
}

function hitAction() {
    clearTimeout(timeoutTimerId);
    const endTime = Date.now();
    reactionTime = (endTime - startTime) / 1000;
    hideFishShadow();
    document.getElementById('ripple-effect').style.display = "none";
    document.getElementById('exclamation').style.display = "none";

    let timeBonus = 1.0;
    if (currentToolMode === 'rod') {
        const rod = playerData.equippedRod;
        if (rod === 'bronze' && currentLocation === 'deepsea') timeBonus = 1.4;
        if (rod === 'legend' || rod === 'dragon_rod') timeBonus = 1.3;
    } else {
        const net = playerData.equippedNet || 'bug_net';
        if (net === 'divine_net') timeBonus = 1.5;
    }

    const limitTime = currentTargetFish.reqTime * timeBonus;

    if (reactionTime <= limitTime) {
        if (currentTargetFish.isBig) {
            startBattle();
        } else {
            finishCatch(true);
        }
    } else {
        playSE('foul');
        if (currentToolMode === 'rod') {
            playerData.currentCombo = 0;
        } else {
            playerData.netCombo = 0;
        }
        savePlayerData();
        showResult(false, currentTargetFish, reactionTime);
    }
}

function startBattle() {
    gameState = 'BATTLE';
    battleGauge = 30;
    document.getElementById('status-text').innerText = "叩け！叩け！叩け！";
    document.getElementById('status-text').style.color = "#ff2200";
    document.getElementById('mash-container').style.display = "flex";
    updateGaugeUI();

    playSE('signal');

    let decay = currentTargetFish.decaySpeed || 1.2;
    if (currentToolMode === 'rod') {
        const rod = playerData.equippedRod;
        if (rod === 'iron' || rod === 'legend' || rod === 'dragon_rod') decay *= 0.7;
    }

    clearInterval(battleIntervalId);
    battleIntervalId = setInterval(() => {
        if (gameState !== 'BATTLE') return;
        
        battleGauge -= decay;
        if (battleGauge <= 0) {
            battleGauge = 0;
            clearInterval(battleIntervalId);
            document.getElementById('mash-container').style.display = "none";
            playSE('foul');

            if (currentToolMode === 'rod') {
                playerData.currentCombo = 0;
            } else {
                playerData.netCombo = 0;
            }
            savePlayerData();
            showResult(false, currentTargetFish, reactionTime);
        }
        updateGaugeUI();
    }, 100);
}

function battleTap() {
    if (gameState !== 'BATTLE') return;
    
    playSE('tap');

    let power = currentTargetFish.tapPower || 11;
    if (currentToolMode === 'rod') {
        const rod = playerData.equippedRod;
        if (rod === 'iron') power += 4;
        if (rod === 'legend' || rod === 'dragon_rod') power += 6;
    } else {
        const net = playerData.equippedNet || 'bug_net';
        if (net === 'steel_net' || net === 'divine_net') power += 8;
    }

    battleGauge += power;
    
    if (battleGauge >= 100) {
        battleGauge = 100;
        clearInterval(battleIntervalId);
        document.getElementById('mash-container').style.display = "none";
        finishCatch(true);
    }
    updateGaugeUI();
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

function finishCatch(isSuccess) {
    if (isSuccess) {
        playSE('success');

        const earnedGold = currentTargetFish.price || 50;
        const earnedExp = getExpByFish(currentTargetFish);

        playerData.gold += earnedGold;
        playerData.exp += earnedExp;

        if (currentToolMode === 'rod') {
            playerData.totalCatches = (playerData.totalCatches || 0) + 1;
            playerData.currentCombo = (playerData.currentCombo || 0) + 1;
        } else {
            playerData.netCatches = (playerData.netCatches || 0) + 1;
            playerData.netCombo = (playerData.netCombo || 0) + 1;
        }

        const oldLevel = playerData.level;
        const newLevel = Math.floor(playerData.exp / 100) + 1;

        if (newLevel > oldLevel) {
            playerData.level = newLevel;
            let unlockedMapName = "";
            Object.keys(MAP_DATA).forEach(k => {
                if (MAP_DATA[k].reqLevel === newLevel) {
                    unlockedMapName = MAP_DATA[k].name;
                }
            });
            pendingLevelUp = { level: newLevel, unlockedArea: unlockedMapName };
        } else {
            pendingLevelUp = null;
        }

        savePlayerData();
        updateMenuUI();

        if (!caughtFish[currentTargetFish.id] || reactionTime < caughtFish[currentTargetFish.id].bestTime) {
            caughtFish[currentTargetFish.id] = {
                unlocked: true,
                bestTime: reactionTime
            };
            localStorage.setItem('retro_fishing_zukan_v4', JSON.stringify(caughtFish));
        }

        checkAchievements();
        showResult(true, currentTargetFish, reactionTime, earnedGold, earnedExp);
    }
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

function showResult(isSuccess, fish, time, earnedGold = 0, earnedExp = 0) {
    gameState = 'RESULT';
    const modal = document.getElementById('result-modal');
    const title = document.getElementById('result-title');
    const img = document.getElementById('result-img');
    const name = document.getElementById('result-name');
    const priceText = document.getElementById('result-price');
    const timeText = document.getElementById('result-time');
    const nextBtn = document.getElementById('next-btn');

    img.style.animation = 'none';
    img.offsetHeight; 
    img.style.animation = null;

    if (isSuccess) {
        const verb = fish.toolType === 'net' ? '捕獲成功！' : '一本釣り成功！';
        title.innerText = fish.isBig ? "超大物 GET!!" : verb;
        title.style.color = "#ffd700";
        name.innerText = fish.name;
        priceText.style.display = "block";
        priceText.innerText = `+${earnedGold} G 獲得！ (+${earnedExp} EXP)`;
        img.style.display = "inline-block";
        
        img.src = fish.image;
        img.onerror = () => { img.src = fish.fallbackSvg; };

        timeText.innerText = `反応速度: ${time.toFixed(3)}秒`;
    } else {
        title.innerText = "逃げられた…";
        title.style.color = "#ff3333";
        name.innerText = "";
        priceText.style.display = "none";
        img.style.display = "none";
        timeText.innerText = `反応速度: ${time.toFixed(3)}秒`;
    }

    modal.style.display = "block";

    nextBtn.disabled = true;
    let count = 1.5;
    nextBtn.innerText = `待機中 (${Math.ceil(count)}s)`;

    const countdownInterval = setInterval(() => {
        count -= 0.5;
        if (count <= 0) {
            clearInterval(countdownInterval);
            nextBtn.disabled = false;
            nextBtn.innerText = "次へ進む";
        } else {
            nextBtn.innerText = `待機中 (${Math.ceil(count)}s)`;
        }
    }, 500);
}

function closeResult() {
    document.getElementById('result-modal').style.display = "none";
    gameState = 'READY';
    const actionVerb = currentToolMode === 'rod' ? '竿を振れ！' : '網を構えろ！';
    document.getElementById('status-text').innerText = `画面を叩いて${actionVerb}`;
    document.getElementById('status-text').style.color = "#fff";

    if (pendingLevelUp) {
        playSE('levelup');
        showLevelUpModal(pendingLevelUp.level, pendingLevelUp.unlockedArea);
        pendingLevelUp = null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initAudio();
    updateMenuUI();
    checkAchievements();
});