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
    holy: { name: "聖なる泉", bg: "images/bg/bg_holy.png", reqLevel: 1, gacha: true, matchRod: "holy_rod", sound: "sounds/holy.mp3" }
};

let currentLocation = "sea";
let currentToolMode = "rod"; // "rod" or "net"
let currentShopTab = "rod";  // "rod" or "net"

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
    dragon_rod: { id: "dragon_rod", name: "龍神の竿", icon: "images/fishingrod/dragon_fishing_rod.png", price: 0, gacha: true, desc: "龍神の加護を受けた究極の秘竿。全特殊エリアで待ち時間なし＋レア大物超大幅UP！" }
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
    
    buy_all_shop: { id: "buy_all_shop", name: "ぜ～んぶください！", icon: "images/trophy/trophy_gold.png", desc: "ショップのすべてのアイテム（竿）を購入した" },
    rich_man: { id: "rich_man", name: "大金持ち", icon: "images/trophy/trophy_silver.png", desc: "所持金が10,000ゴールドに達した" },
    all_maps: { id: "all_maps", name: "航海時代", icon: "images/trophy/trophy_gold.png", desc: "すべての基本エリア(全7箇所)を解放した" },
    zukan_master: { id: "zukan_master", name: "伝説の釣り人", icon: "images/trophy/trophy_gold.png", desc: "おさかな絵巻(全種類の魚)をコンプリートした" }
};

/* ===================================================
   魚・水生生物データ (新規追加24種含む全109件)
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
    { id: 9, name: "カレイ", location: "sea", toolType: "rod", price: 130, image: "images/fish/karei.png", shadowImage: "images/shadows/shadow_midi.png", desc: "ヒラメに似ているが右側に目が寄っている煮付けの定番。", reqTime: 0.850, shadowWidth: 95, shadowHeight: 40, isBig: false, weight: 25 },
    { id: 10, name: "カサゴ", location: "sea", toolType: "rod", price: 160, image: "images/fish/kasago.png", shadowImage: "images/shadows/shadow_midi.png", desc: "大きな頭と棘を持つ根魚。唐揚げが美味しい。", reqTime: 0.800, shadowWidth: 85, shadowHeight: 40, isBig: false, weight: 25 },
    { id: 11, name: "ニシン", location: "sea", toolType: "rod", price: 90, image: "images/fish/nisin.png", shadowImage: "images/shadows/shadow_midi.png", desc: "「春を告げる魚」として知られる回遊魚。", reqTime: 0.900, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 25 },
    { id: 12, name: "ヒラメ", location: "sea", toolType: "rod", price: 220, image: "images/fish/hirame.png", shadowImage: "images/shadows/shadow_midi.png", desc: "砂底に化けて獲物を待つ平たい肉食魚。", reqTime: 0.750, shadowWidth: 110, shadowHeight: 40, isBig: false, weight: 20 },
    { id: 13, name: "カワハギ", location: "sea", toolType: "rod", price: 180, image: "images/fish/kawahagi.png", shadowImage: "images/shadows/shadow_small.png", desc: "皮が簡単に剥がせる。濃厚なキモが絶品。", reqTime: 0.800, shadowWidth: 75, shadowHeight: 35, isBig: false, weight: 20 },
    { id: 14, name: "ハリセンボン", location: "sea", toolType: "rod", price: 120, image: "images/fish/fish_harisenbon.png", shadowImage: "images/shadows/shadow_midi.png", desc: "危険を感じると体を丸く膨らませ針を立てる。", reqTime: 0.850, shadowWidth: 80, shadowHeight: 40, isBig: false, weight: 20 },
    { id: 15, name: "トビウオ", location: "sea", toolType: "rod", price: 140, image: "images/fish/tobiuo.png", shadowImage: "images/shadows/shadow_midi.png", desc: "大きな胸ビレを広げて水面を数百度滑空する。", reqTime: 0.800, shadowWidth: 80, shadowHeight: 35, isBig: false, weight: 20 },
    { id: 16, name: "ヤリイカ", location: "sea", toolType: "rod", price: 160, image: "images/fish/yariika.png", shadowImage: "images/shadows/shadow_midi.png", desc: "槍のように細長い先端を持つ透明感のあるイカ。", reqTime: 0.800, shadowWidth: 85, shadowHeight: 30, isBig: false, weight: 20 },
    { id: 17, name: "カツオ", location: "sea", toolType: "rod", price: 350, image: "images/fish/katuo.png", shadowImage: "images/shadows/shadow_big.png", desc: "たたきで有名な回遊魚。鋭い引きを見せる。", reqTime: 0.650, shadowWidth: 120, shadowHeight: 45, isBig: true, weight: 15, tapPower: 10, decaySpeed: 1.2 },
    { id: 18, name: "エイ", location: "sea", toolType: "rod", price: 200, image: "images/fish/fish_ei.png", shadowImage: "images/shadows/shadow_big.png", desc: "大きなひれを羽ばたかせるように泳ぐ巨大魚。", reqTime: 0.700, shadowWidth: 120, shadowHeight: 50, isBig: true, weight: 15, tapPower: 10, decaySpeed: 1.1 },
    { id: 19, name: "フグ", location: "sea", toolType: "rod", price: 300, image: "images/fish/hugu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "高級食材だがテトロドトキシンという猛毒を持つ。", reqTime: 0.700, shadowWidth: 90, shadowHeight: 45, isBig: false, weight: 15 },
    { id: 20, name: "ホラアナゴ", location: "sea", toolType: "rod", price: 250, image: "images/fish/fish_horaanago.png", shadowImage: "images/shadows/shadow_midi.png", desc: "海底の岩陰などにひっそりと生息する深海性アナゴ。", reqTime: 0.750, shadowWidth: 90, shadowHeight: 30, isBig: false, weight: 15 },
    { id: 21, name: "ウツボ", location: "sea", toolType: "rod", price: 350, image: "images/fish/utubo.png", shadowImage: "images/shadows/shadow_big.png", desc: "海のギャングと呼ばれる鋭い歯を持った気荒な魚。", reqTime: 0.650, shadowWidth: 130, shadowHeight: 35, isBig: true, weight: 15, tapPower: 9, decaySpeed: 1.2 },
    { id: 22, name: "クロマグロ", location: "sea", toolType: "rod", price: 500, image: "images/fish/fish_maguro.png", shadowImage: "images/shadows/shadow_big.png", desc: "大海原の最速ランナー。「黒いダイヤ」と呼ばれる最高級魚。", reqTime: 0.600, shadowWidth: 140, shadowHeight: 55, isBig: true, weight: 12, tapPower: 11, decaySpeed: 1.2 },
    { id: 23, name: "マダラ", location: "sea", toolType: "rod", price: 400, image: "images/fish/tara.png", shadowImage: "images/shadows/shadow_big.png", desc: "寒冷な海に棲む大食漢の深場魚。鍋物に最適。", reqTime: 0.600, shadowWidth: 130, shadowHeight: 45, isBig: true, weight: 12, tapPower: 9, decaySpeed: 1.3 },
    { id: 24, name: "サメ", location: "sea", toolType: "rod", price: 600, image: "images/fish/fish_same1.png", shadowImage: "images/shadows/shadow_big.png", desc: "鋭い歯と優れた嗅覚を持つ海のハンター。", reqTime: 0.550, shadowWidth: 150, shadowHeight: 50, isBig: true, weight: 10, tapPower: 10, decaySpeed: 1.3 },
    { id: 25, name: "シュモクザメ", location: "sea", toolType: "rod", price: 700, image: "images/fish/hammer.png", shadowImage: "images/shadows/shadow_big.png", desc: "T字型の頭部が特徴的なインパクトあるサメ。", reqTime: 0.500, shadowWidth: 150, shadowHeight: 55, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.4 },
    { id: 26, name: "イルカ", location: "sea", toolType: "rod", price: 800, image: "images/fish/iruka.png", shadowImage: "images/shadows/shadow_big.png", desc: "知能が高くジャンプが得意な海のアイドル。", reqTime: 0.500, shadowWidth: 140, shadowHeight: 50, isBig: true, weight: 8, tapPower: 9, decaySpeed: 1.3 },
    { id: 27, name: "カジキ", location: "sea", toolType: "rod", price: 900, image: "images/fish/kaziki.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "槍のように鋭い上アゴを持つ巨大トローリング対象魚。", reqTime: 0.450, shadowWidth: 170, shadowHeight: 50, isBig: true, weight: 5, tapPower: 8, decaySpeed: 1.5 },
    { id: 28, name: "チョウザメ", location: "sea", toolType: "rod", price: 1200, image: "images/fish/tyouzame.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "キャビアを生む古代魚の生き残り。", reqTime: 0.450, shadowWidth: 160, shadowHeight: 45, isBig: true, weight: 5, tapPower: 7, decaySpeed: 1.4 },
    { id: 29, name: "シャチ", location: "sea", toolType: "rod", price: 1500, image: "images/fish/syati.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "「海のハンター」と呼ばれる高い知能を持つ大型海獣。", reqTime: 0.400, shadowWidth: 180, shadowHeight: 55, isBig: true, weight: 4, tapPower: 6, decaySpeed: 1.5 },
    { id: 30, name: "クジラ", location: "sea", toolType: "rod", price: 2000, image: "images/fish/kuzira.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "大海原をゆったりと泳ぐ地球上最大級の哺乳類。", reqTime: 0.350, shadowWidth: 200, shadowHeight: 60, isBig: true, weight: 3, tapPower: 5, decaySpeed: 1.6 },
    { id: 31, name: "ジンベエザメ", location: "sea", toolType: "rod", price: 3000, image: "images/fish/zinbei.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "世界最大の魚類。温厚でプランクトンを食べる。", reqTime: 0.300, shadowWidth: 220, shadowHeight: 65, isBig: true, weight: 2, tapPower: 5, decaySpeed: 1.7 },
    { id: 86, name: "チンアナゴ", location: "sea", toolType: "rod", price: 130, image: "images/fish/chinanago.png", shadowImage: "images/shadows/shadow_small.png", desc: "砂底から顔をひょっこり出す姿が人気の細長い魚。", reqTime: 0.900, shadowWidth: 50, shadowHeight: 25, isBig: false, weight: 20 },

    // 1. 海 (sea) - 網
    { id: 32, name: "ヒトデ", location: "sea", toolType: "net", netSize: "small", price: 20, image: "images/fish/hitode.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】星の形をした棘皮動物。磯でよく見かける。", reqTime: 1.200, shadowWidth: 45, shadowHeight: 45, isBig: false, weight: 45 },
    { id: 33, name: "ヤドカリ", location: "sea", toolType: "net", netSize: "small", price: 40, image: "images/fish/yadokari.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】貝殻を背負ってトコトコ歩く浅瀬のアイドル。", reqTime: 1.200, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 40 },
    { id: 34, name: "アサリ", location: "sea", toolType: "net", netSize: "small", price: 30, image: "images/fish/fish_asari.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】潮干狩りでおなじみの二枚貝。味噌汁にぴったり。", reqTime: 1.200, shadowWidth: 40, shadowHeight: 30, isBig: false, weight: 40 },
    { id: 35, name: "クラゲ", location: "sea", toolType: "net", netSize: "midi", price: 60, image: "images/fish/kurage.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】ゆらゆらと海を漂う刺胞動物。", reqTime: 1.100, shadowWidth: 65, shadowHeight: 50, isBig: false, weight: 35 },
    { id: 36, name: "ナマコ", location: "sea", toolType: "net", netSize: "small", price: 90, image: "images/fish/namako.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】海底に転がっているグロテスクだが美味しい生き物。", reqTime: 1.100, shadowWidth: 55, shadowHeight: 25, isBig: false, weight: 30 },
    { id: 37, name: "ハマグリ", location: "sea", toolType: "net", netSize: "small", price: 120, image: "images/fish/fish_hamaguri.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】ひな祭りや祝い事に使われる大きな二枚貝。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 35, isBig: false, weight: 25 },
    { id: 38, name: "カキ", location: "sea", toolType: "net", netSize: "small", price: 180, image: "images/fish/kaki.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】「海のミルク」と呼ばれる栄養満点の二枚貝。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 35, isBig: false, weight: 25 },
    { id: 39, name: "シャコ", location: "sea", toolType: "net", netSize: "small", price: 110, image: "images/fish/syako.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】強力なパンチを繰り出す底生の甲殻類。寿司ネタに。", reqTime: 0.900, shadowWidth: 60, shadowHeight: 25, isBig: false, weight: 25 },
    { id: 40, name: "マダコ", location: "sea", toolType: "net", netSize: "midi", price: 250, image: "images/fish/madako.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】8本の足と高い知能を持つ頭足類。", reqTime: 0.750, shadowWidth: 80, shadowHeight: 50, isBig: false, weight: 20 },
    { id: 41, name: "サザエ", location: "sea", toolType: "net", netSize: "small", price: 200, image: "images/fish/sazae.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】トゲトゲの貝殻を持つ壺焼きの定番貝。", reqTime: 0.950, shadowWidth: 45, shadowHeight: 40, isBig: false, weight: 20 },
    { id: 42, name: "ウニ", location: "sea", toolType: "net", netSize: "small", price: 250, image: "images/fish/uni.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】全身が鋭いトゲで覆われた高級食材。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 45, isBig: false, weight: 20 },
    { id: 43, name: "アワビ", location: "sea", toolType: "net", netSize: "midi", price: 300, image: "images/fish/fish_awabi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】コリコリとした食感が最高の高級一枚貝。", reqTime: 0.850, shadowWidth: 50, shadowHeight: 35, isBig: false, weight: 15 },
    { id: 44, name: "ウミヘビ", location: "sea", toolType: "net", netSize: "midi", price: 300, image: "images/fish/umihebi.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】強力な毒を持つ海生の爬虫類。", reqTime: 0.700, shadowWidth: 90, shadowHeight: 25, isBig: false, weight: 15 },
    { id: 45, name: "イセエビ", location: "sea", toolType: "net", netSize: "midi", price: 500, image: "images/fish/iseebi.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】立派な髭と硬い甲羅を持つ最高級エビ。", reqTime: 0.700, shadowWidth: 75, shadowHeight: 40, isBig: false, weight: 12 },
    { id: 46, name: "ウミガメ", location: "sea", toolType: "net", netSize: "big", price: 700, image: "images/fish/umigame.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】砂浜で産卵する優雅に泳ぐ大きなカメ。", reqTime: 0.600, shadowWidth: 110, shadowHeight: 60, isBig: true, weight: 8, tapPower: 10, decaySpeed: 1.1 },
    { id: 87, name: "トビハゼ", location: "sea", toolType: "net", netSize: "small", price: 50, image: "images/fish/tobihaze.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】干潟をピョンピョンと跳ね回る可愛らしいハゼ。", reqTime: 1.100, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 35 },
    { id: 88, name: "アメフラシ", location: "sea", toolType: "net", netSize: "small", price: 45, image: "images/fish/amefurashi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】紫色の液を出す軟体生物。磯のあちこちにいる。", reqTime: 1.150, shadowWidth: 50, shadowHeight: 30, isBig: false, weight: 35 },
    { id: 89, name: "テッポウエビ", location: "sea", toolType: "net", netSize: "small", price: 75, image: "images/fish/teppouebi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】大きなハサミを鳴らして衝撃波を繰り出すエビ。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },

    // 2. 川 (river) - 竿/網
    { id: 47, name: "メダカ", location: "river", toolType: "rod", price: 20, image: "images/fish/medaka.png", shadowImage: "images/shadows/shadow_small.png", desc: "日本の小川や田んぼで見られる最小級の淡水魚。", reqTime: 1.200, shadowWidth: 35, shadowHeight: 15, isBig: false, weight: 40 },
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
    { id: 59, name: "ナマズ", location: "swamp", toolType: "rod", price: 180, image: "images/fish/fish_namazu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "夜行性で立派なヒゲを持つ泥底の主。", reqTime: 0.800, shadowWidth: 100, shadowHeight: 40, isBig: false, weight: 25 },
    { id: 60, name: "ライギョ", location: "swamp", toolType: "rod", price: 300, image: "images/fish/fish_raigyo.png", shadowImage: "images/shadows/shadow_big.png", desc: "蛇のような頭部を持つスネークヘッド。強力な引き。", reqTime: 0.650, shadowWidth: 120, shadowHeight: 40, isBig: true, weight: 15, tapPower: 10, decaySpeed: 1.2 },
    { id: 61, name: "ピラニア", location: "swamp", toolType: "rod", price: 280, image: "images/fish/pirania.png", shadowImage: "images/shadows/shadow_small.png", desc: "アマゾン川に棲む鋭い歯を持った危険な肉食魚。", reqTime: 0.700, shadowWidth: 70, shadowHeight: 35, isBig: false, weight: 15 },
    { id: 62, name: "スッポン", location: "swamp", toolType: "rod", price: 450, image: "images/fish/suppon.png", shadowImage: "images/shadows/shadow_midi.png", desc: "噛みついたら離さない甲羅が柔らかいカメ。", reqTime: 0.650, shadowWidth: 85, shadowHeight: 45, isBig: false, weight: 12 },
    { id: 63, name: "ピラルク", location: "swamp", toolType: "rod", price: 1800, image: "images/fish/piraruku.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "世界最大級の淡水魚。赤いグラデーションのウロコが特徴。", reqTime: 0.400, shadowWidth: 180, shadowHeight: 50, isBig: true, weight: 3, tapPower: 6, decaySpeed: 1.5 },
    { id: 64, name: "タガメ", location: "swamp", toolType: "net", netSize: "midi", price: 250, image: "images/fish/net_tagame.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】水生昆虫の王様。大きな鋭い前脚で獲物を捕らえる。", reqTime: 0.750, shadowWidth: 70, shadowHeight: 35, isBig: false, weight: 30 },
    { id: 90, name: "フナ", location: "swamp", toolType: "rod", price: 90, image: "images/fish/huna.png", shadowImage: "images/shadows/shadow_small.png", desc: "「釣りはフナに始まりフナに終わる」と言われる身近な川魚。", reqTime: 1.000, shadowWidth: 60, shadowHeight: 25, isBig: false, weight: 30 },
    { id: 91, name: "ブルーギル", location: "swamp", toolType: "rod", price: 110, image: "images/fish/bluegill.png", shadowImage: "images/shadows/shadow_small.png", desc: "青いエラが特徴の貪欲な外来魚。", reqTime: 0.950, shadowWidth: 65, shadowHeight: 30, isBig: false, weight: 30 },
    { id: 92, name: "オタマジャクシ", location: "swamp", toolType: "net", netSize: "small", price: 15, image: "images/fish/otamajakushi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】やがてカエルになる丸くて可愛い幼生。", reqTime: 1.250, shadowWidth: 35, shadowHeight: 20, isBig: false, weight: 45 },
    { id: 93, name: "トノサマガエル", location: "swamp", toolType: "net", netSize: "small", price: 80, image: "images/fish/tonosamagaeru.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】立派な模様と跳躍力を持つ田んぼや沼の定番カエル。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 35 },
    { id: 94, name: "アカハライモリ", location: "swamp", toolType: "net", netSize: "small", price: 100, image: "images/fish/akaharaimori.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】お腹が赤く黒い斑点模様を持つ可愛らしい両生類。", reqTime: 1.000, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },
    { id: 95, name: "クサガメ", location: "swamp", toolType: "net", netSize: "midi", price: 160, image: "images/fish/kusagame.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】甲羅に3本のすじを持つ身近な淡水ガメ。", reqTime: 0.900, shadowWidth: 65, shadowHeight: 35, isBig: false, weight: 25 },

    // 4. 湖 (lake) - 竿/網
    { id: 65, name: "キンギョ", location: "lake", toolType: "rod", price: 50, image: "images/fish/kingyo.png", shadowImage: "images/shadows/shadow_small.png", desc: "観賞魚として古くから親しまれている赤い魚。", reqTime: 1.100, shadowWidth: 50, shadowHeight: 30, isBig: false, weight: 30 },
    { id: 66, name: "バス", location: "lake", toolType: "rod", price: 150, image: "images/fish/fish_basu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "ルアーフィッシングでお馴染みの積極的な肉食魚。", reqTime: 0.800, shadowWidth: 90, shadowHeight: 40, isBig: false, weight: 30 },
    { id: 67, name: "ブラックバス", location: "lake", toolType: "rod", price: 220, image: "images/fish/fish_blackbass.png", shadowImage: "images/shadows/shadow_midi.png", desc: "大きな口で何でも呑み込むパワーファイター。", reqTime: 0.750, shadowWidth: 100, shadowHeight: 45, isBig: false, weight: 25 },
    { id: 68, name: "アメリカザリガニ", location: "lake", toolType: "net", netSize: "small", price: 80, image: "images/fish/zarigani.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】大きな赤いハサミがかっこいい池の定番人気者。", reqTime: 1.000, shadowWidth: 60, shadowHeight: 30, isBig: false, weight: 35 },
    { id: 69, name: "ウーパールーパー", location: "lake", toolType: "net", netSize: "small", price: 400, image: "images/fish/uparupa.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】ピンクの体とエラがチャーミングなメキシコサンショウウオ。", reqTime: 0.850, shadowWidth: 55, shadowHeight: 25, isBig: false, weight: 15 },
    { id: 96, name: "ワカサギ", location: "lake", toolType: "rod", price: 60, image: "images/fish/wakasagi.png", shadowImage: "images/shadows/shadow_small.png", desc: "氷上の穴釣りで有名な小型淡水魚。天ぷらにすると絶品。", reqTime: 1.100, shadowWidth: 40, shadowHeight: 15, isBig: false, weight: 35 },
    { id: 97, name: "ヤゴ", location: "lake", toolType: "net", netSize: "small", price: 40, image: "images/fish/yago.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】トンボの水中での幼虫。水草の陰に潜む。", reqTime: 1.150, shadowWidth: 40, shadowHeight: 20, isBig: false, weight: 40 },
    { id: 98, name: "ゲンゴロウ", location: "lake", toolType: "net", netSize: "small", price: 120, image: "images/fish/gengorou.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】泳ぎが得意な水生甲虫。黒く美しい体を持つ。", reqTime: 0.950, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 30 },
    { id: 99, name: "タニシ", location: "lake", toolType: "net", netSize: "small", price: 25, image: "images/fish/tanishi.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】石や泥にくっついている巻貝。", reqTime: 1.250, shadowWidth: 35, shadowHeight: 25, isBig: false, weight: 45 },

    // 5. 雪山 (snow) - 竿/網
    { id: 70, name: "イワナ", location: "snow", toolType: "rod", price: 160, image: "images/fish/iwana.png", shadowImage: "images/shadows/shadow_small.png", desc: "最源流域の冷たい澄んだ水に生息する渓流魚。", reqTime: 0.800, shadowWidth: 70, shadowHeight: 25, isBig: false, weight: 25 },
    { id: 71, name: "イトウ", location: "snow", toolType: "rod", price: 700, image: "images/fish/fish_itou.png", shadowImage: "images/shadows/shadow_big.png", desc: "「日本最大の淡水魚」と称される湿原の幻の魚。", reqTime: 0.550, shadowWidth: 140, shadowHeight: 45, isBig: true, weight: 10, tapPower: 9, decaySpeed: 1.3 },
    { id: 72, name: "クリオネ", location: "snow", toolType: "net", netSize: "small", price: 350, image: "images/fish/fish_clione.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】「流氷の天使」と呼ばれる半透明の美しい翼足類。", reqTime: 0.800, shadowWidth: 40, shadowHeight: 25, isBig: false, weight: 20 },
    { id: 100, name: "コオリウオ", location: "snow", toolType: "rod", price: 280, image: "images/fish/kooriuo.png", shadowImage: "images/shadows/shadow_midi.png", desc: "極寒の海に生息する、血液が透明な不思議な魚。", reqTime: 0.750, shadowWidth: 75, shadowHeight: 25, isBig: false, weight: 20 },
    { id: 101, name: "ガガンボ", location: "snow", toolType: "net", netSize: "small", price: 50, image: "images/fish/gaganbo.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】足が長くて頼りない見た目の大型昆虫。", reqTime: 1.100, shadowWidth: 45, shadowHeight: 30, isBig: false, weight: 35 },
    { id: 102, name: "ミジンコ", location: "snow", toolType: "net", netSize: "small", price: 10, image: "images/fish/mijinko.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】水中をパタパタと浮遊する微小なプランクトン。", reqTime: 1.300, shadowWidth: 25, shadowHeight: 15, isBig: false, weight: 50 },

    // 6. 地底湖 (underground) - 竿/網
    { id: 73, name: "シーラカンス", location: "underground", toolType: "rod", price: 1500, image: "images/fish/fish_coelacanth.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "「生きた化石」と呼ばれる太古の姿を残す深海古代魚。", reqTime: 0.450, shadowWidth: 160, shadowHeight: 35, isBig: true, weight: 5, tapPower: 6, decaySpeed: 1.5 },
    { id: 74, name: "ホライモリ", location: "underground", toolType: "net", netSize: "big", price: 800, image: "images/fish/net_horaimori.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】光の届かない暗黒の洞窟に棲む色のない両生類。", reqTime: 0.600, shadowWidth: 90, shadowHeight: 30, isBig: true, weight: 20, tapPower: 10, decaySpeed: 1.1 },
    { id: 103, name: "ドウクツギョ", location: "underground", toolType: "rod", price: 650, image: "images/fish/doukutsugyo.png", shadowImage: "images/shadows/shadow_midi.png", desc: "暗闇に適応し、目が退化した洞窟固有の魚。", reqTime: 0.650, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 15 },
    { id: 104, name: "ミミズハゼ", location: "underground", toolType: "net", netSize: "small", price: 220, image: "images/fish/mimizuhaze.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】地下水系に生息するミミズのような細長いハゼ。", reqTime: 0.850, shadowWidth: 50, shadowHeight: 20, isBig: false, weight: 25 },
    { id: 105, name: "サンショウウオ", location: "underground", toolType: "net", netSize: "midi", price: 450, image: "images/fish/sanshouuo.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】冷たい暗所に潜む日本固有の両生類。", reqTime: 0.750, shadowWidth: 65, shadowHeight: 30, isBig: false, weight: 20 },

    // 7. 深海 (deepsea) - 竿/網
    { id: 75, name: "チョウチンアンコウ", location: "deepsea", toolType: "rod", price: 600, image: "images/fish/fish_chouchin.png", shadowImage: "images/shadows/shadow_big.png", desc: "頭の発光器で獲物を誘い込んで捕食する深海魚。", reqTime: 0.550, shadowWidth: 120, shadowHeight: 55, isBig: true, weight: 10, tapPower: 9, decaySpeed: 1.3 },
    { id: 76, name: "リュウグウノツカイ", location: "deepsea", toolType: "rod", price: 2000, image: "images/fish/fish_ryugu.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "赤い背ビレとながーい帯状の魚体を持つ神秘の巨大魚。", reqTime: 0.450, shadowWidth: 180, shadowHeight: 15, isBig: true, weight: 4, tapPower: 6, decaySpeed: 1.5 },
    { id: 77, name: "ホタルイカ", location: "deepsea", toolType: "net", netSize: "small", price: 150, image: "images/fish/hotaruika.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】青白く光る小さなイカ。酢味噌和えが絶品。", reqTime: 0.900, shadowWidth: 40, shadowHeight: 25, isBig: false, weight: 25 },
    { id: 78, name: "メンダコ", location: "deepsea", toolType: "net", netSize: "midi", price: 400, image: "images/fish/fish_mendako.png", shadowImage: "images/shadows/shadow_midi.png", desc: "【網限定】耳のようなヒレをパタパタさせる可愛い深海タコ。", reqTime: 0.700, shadowWidth: 70, shadowHeight: 40, isBig: false, weight: 15 },
    { id: 79, name: "ダイオウグソクムシ", location: "deepsea", toolType: "net", netSize: "biggest", price: 1200, image: "images/fish/net_gusokumushi.png", shadowImage: "images/shadows/shadow_big.png", desc: "【網限定】「深海の掃除屋」と呼ばれる鎧を纏った超巨大甲殻類。", reqTime: 0.500, shadowWidth: 120, shadowHeight: 50, isBig: true, weight: 15, tapPower: 7, decaySpeed: 1.4 },
    { id: 106, name: "デメニギス", location: "deepsea", toolType: "rod", price: 850, image: "images/fish/demenigisu.png", shadowImage: "images/shadows/shadow_midi.png", desc: "頭部が透明で、緑色の球状の目が内部にある不思議な深海魚。", reqTime: 0.600, shadowWidth: 85, shadowHeight: 40, isBig: false, weight: 12 },
    { id: 107, name: "ダイオウイカ", location: "deepsea", toolType: "rod", price: 2500, image: "images/fish/daiouika.png", shadowImage: "images/shadows/shadow_biggest.png", desc: "深海の暗闇に潜む超巨大なイカ。伝説の怪物のモデル。", reqTime: 0.350, shadowWidth: 200, shadowHeight: 55, isBig: true, weight: 3, tapPower: 5, decaySpeed: 1.6 },
    { id: 108, name: "サカバンバスピス", location: "deepsea", toolType: "rod", price: 1100, image: "images/fish/sacabambaspis.png", shadowImage: "images/shadows/shadow_midi.png", desc: "間抜けな表情が魅力的な太古の無顎類。", reqTime: 0.550, shadowWidth: 90, shadowHeight: 35, isBig: false, weight: 10 },
    { id: 109, name: "コウモリダコ", location: "deepsea", toolType: "rod", price: 750, image: "images/fish/koumoridako.png", shadowImage: "images/shadows/shadow_midi.png", desc: "マントのような膜を持つ、タコとイカの原始的な祖先。", reqTime: 0.650, shadowWidth: 80, shadowHeight: 45, isBig: false, weight: 15 },

    // 8. 火山 (volcano) - 竿/網
    { id: 80, name: "マグマサラマンダー", location: "volcano", toolType: "rod", price: 400, image: "images/fish/fish_magma.png", shadowImage: "images/shadows/shadow_big.png", desc: "火山の溶岩の中を自在に泳ぐ伝説の灼熱蜥蜴。", reqTime: 0.500, shadowWidth: 140, shadowHeight: 45, isBig: true, weight: 10, tapPower: 8, decaySpeed: 1.4 },
    { id: 81, name: "ヒノコカゲロウ", location: "volcano", toolType: "net", netSize: "small", price: 200, image: "images/fish/net_hinoko.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】溶岩の熱気の中に発生する高熱の水生昆虫の成虫。", reqTime: 0.750, shadowWidth: 40, shadowHeight: 20, isBig: false, weight: 30 },

    // 9. はちみつ (honey) - 竿/網
    { id: 82, name: "ハニーベアフィッシュ", location: "honey", toolType: "rod", price: 400, image: "images/fish/fish_honey.png", shadowImage: "images/shadows/shadow_midi.png", desc: "甘い甘露の沼に生息する黄金色の珍しい魚。", reqTime: 0.650, shadowWidth: 110, shadowHeight: 40, isBig: false, weight: 30 },
    { id: 83, name: "ハチの幼虫", location: "honey", toolType: "net", netSize: "small", price: 300, image: "images/fish/net_hachi_youchu.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】濃厚なはちみつの底で育つ栄養満点の幼虫。", reqTime: 0.900, shadowWidth: 45, shadowHeight: 25, isBig: false, weight: 40 },

    // 10. 聖なる泉 (holy) - 竿/網
    { id: 84, name: "ホーリーエンゼル", location: "holy", toolType: "rod", price: 400, image: "images/fish/fish_holy.png", shadowImage: "images/shadows/shadow_small.png", desc: "聖なる泉の浄化された水にしか現れない神聖な水生生物。", reqTime: 0.400, shadowWidth: 80, shadowHeight: 30, isBig: false, weight: 15 },
    { id: 85, name: "ヒカリミジンコ", location: "holy", toolType: "net", netSize: "small", price: 200, image: "images/fish/net_mijinko.png", shadowImage: "images/shadows/shadow_small.png", desc: "【網限定】聖水の中で星のように眩しく輝く幻想的な微小生物。", reqTime: 0.650, shadowWidth: 35, shadowHeight: 20, isBig: false, weight: 20 }
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
        titleBgm.volume = 0.02;
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
        titleBgm.volume = 0.02;
        titleBgm.play().catch(() => {});
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
    document.getElementById('map-modal').style.display = "none";
    document.getElementById('zukan-modal').style.display = "none";
    document.getElementById('howto-modal').style.display = "none";
    document.getElementById('shop-screen').style.display = "none";
    document.getElementById('gacha-screen').style.display = "none";
    document.getElementById('gacha-list-modal').style.display = "none";
    document.getElementById('config-modal').style.display = "none";
    document.getElementById('achievement-modal').style.display = "none";
    document.getElementById('zoom-modal').style.display = "none";
    document.getElementById('levelup-modal').style.display = "none";
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

function openGachaScreen() {
    initAudio();
    closeAllModals();
    gameState = 'GACHA';
    document.getElementById('menu-screen').style.display = "none";
    document.getElementById('gacha-gold').innerText = playerData.gold;
    document.getElementById('gacha-result-area').style.display = "none";
    document.getElementById('gacha-screen').style.display = "flex";
    updateStageBgm();
    playWaterPlop();
}

function closeGachaScreen() {
    goToMenu();
}

function openGachaListModal() {
    document.getElementById('gacha-list-modal').style.display = "flex";
}

function closeGachaListModal() {
    document.getElementById('gacha-list-modal').style.display = "none";
}

/* レア確率0.5%に調整したガチャ関数 */
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

    const pool = [
        // --- 特別開放エリア (各 0.5%) ---
        { type: "map", key: "volcano", name: "🌋 火山エリア解放", icon: "images/bg/bg_volcano.png", weight: 0.5 },
        { type: "map", key: "honey", name: "🍯 はちみつエリア解放", icon: "images/bg/bg_honey.png", weight: 0.5 },
        { type: "map", key: "holy", name: "✨ 聖なる泉エリア解放", icon: "images/bg/bg_holy.png", weight: 0.5 },

        // --- 特殊ツール (各 0.5%) ---
        { type: "rod", key: "lava_rod", name: "🔥 耐溶岩釣り竿", icon: "images/fishingrod/lava_fishing_rod.png", weight: 0.5 },
        { type: "rod", key: "jungle_rod", name: "🌿 ジャングルの釣り竿", icon: "images/fishingrod/jungle_fishing_rod.png", weight: 0.5 },
        { type: "rod", key: "holy_rod", name: "⭐ 聖なる釣り竿", icon: "images/fishingrod/holy_fishing_rod.png", weight: 0.5 },
        { type: "rod", key: "dragon_rod", name: "🐉 龍神の竿", icon: "images/fishingrod/dragon_fishing_rod.png", weight: 0.5 },
        { type: "net", key: "divine_net", name: "🔱 神獣の網", icon: "images/net/net_divine.png", weight: 0.5 },

        // --- ハズレ枠 (各 14.0% / 合計84.0%) ---
        { type: "trash", name: "🥫 空き缶 (10 G)", icon: TRASH_PATHS.kan, amount: 10, weight: 14.0 },
        { type: "trash", name: "👞 長靴 (10 G)", icon: TRASH_PATHS.kutu, amount: 10, weight: 14.0 },
        { type: "trash", name: "🛞 古タイヤ (20 G)", icon: TRASH_PATHS.tire, amount: 20, weight: 14.0 },
        { type: "trash", name: "🪵 流木 (10 G)", icon: TRASH_PATHS.ryuuboku, amount: 10, weight: 14.0 },
        { type: "trash", name: "🧹 ボロきれ (5 G)", icon: TRASH_PATHS.kire, amount: 5, weight: 14.0 },
        { type: "trash", name: "🌿 ワカメ (10 G)", icon: TRASH_PATHS.kaisou, amount: 10, weight: 14.0 },

        // --- 微小ゴールド (各 6.0% / 合計12.0%) ---
        { type: "gold", amount: 50, name: "💰 50 Gold", icon: "data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'40\' fill=\'gold\'/></svg>", weight: 6.0 },
        { type: "gold", amount: 30, name: "💰 30 Gold", icon: "data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><circle cx=\'50\' cy=\'50\' r=\'40\' fill=\'gold\'/></svg>", weight: 6.0 }
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
        { id: "buy_all_shop", cond: isShopAllBought() },

        // --- ネット限定実績 ---
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
        locations = ['all', 'volcano', 'honey', 'holy'];
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
            img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='35' y='65' font-size='40' fill='gray'>？</text></svg>";
        }

        const name = document.createElement('div');
        name.className = "zukan-card-name";
        name.innerText = isUnlocked ? fish.name : "？？？？";

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
    document.getElementById('zukan-detail-modal').style.display = "none";
}

function closeZukan() {
    isZukanOpen = false;
    closeZukanDetail();
    document.getElementById('zukan-modal').style.display = "none";
    updateStageBgm();
}

/* SE */
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