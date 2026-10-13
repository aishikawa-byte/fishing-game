/* ===================================================
   追加データ置き場（新しいエリア・生き物・道具はここに足すだけ）
   ---------------------------------------------------
   このファイルは script.js のあとに読み込まれます。
   書き方の説明は一番下の「新しく足すとき」と「追加素材リスト.md」を見てください。
   =================================================== */

/* ===================================================
   Ver 2.7.0  海を3つのエリアに分割
   さざ波の海（海１）：最初から ／ 沖合の海（海２）：Lv.14〜 ／ 深淵の海（海３）：Lv.34〜
   =================================================== */

// ---- エリア（レベル順に並ぶ位置へ差し込み。背景は bg_sea1/2/3.png。BGMは今は共通） ----
addArea('sea2', { name: "沖合の海", bg: "images/bg/bg_sea2.png", bgFallback: "images/bg/旧デザイン/bg_sea.png", reqLevel: 14, sound: "sounds/sea.mp3" }, 'swamp');
addArea('sea3', { name: "深淵の海", bg: "images/bg/bg_sea3.png", bgFallback: "images/bg/旧デザイン/bg_sea.png", reqLevel: 34, sound: "sounds/sea.mp3" }, 'snow');
MAP_DATA.sea.name = "さざ波の海";
MAP_DATA.sea.bg = "images/bg/bg_sea1.png";
MAP_DATA.sea.bgFallback = "images/bg/旧デザイン/bg_sea.png";   // 新しい背景が無い時は、これまでの背景を使う

// ---- もともといた生き物を、海２・海３へ引っ越し ----
relocateFish({
    sea2: ["カツオ", "エイ", "ホラアナゴ", "イシダイ", "ウツボ", "クロマグロ", "マダラ", "コブダイ", "サメ", "シュモクザメ", "イルカ", "マンタ", "カジキ", "ヒトデ", "ヤドカリ", "アサリ", "クラゲ", "ウミウシ", "ナマコ", "ハマグリ", "カキ", "シャコ", "マダコ", "サザエ", "ウニ", "アワビ", "ウミヘビ", "トビハゼ", "アメフラシ", "テッポウエビ"],
    sea3: ["マンボウ", "チョウザメ", "シャチ", "マッコウクジラ", "ジンベエザメ", "シロナガスクジラ", "イセエビ", "タカアシガニ", "ウミガメ"]
});

// ---- 新しい生き物（size は small / midi / big / biggest。難しさ・影の大きさが自動で決まります） ----
addFish([
    { id: 300, name: "アイナメ", location: "sea", size: "midi", price: 120, weight: 22, image: "images/fish/ainame.png", desc: "岩礁にすむ根魚。ぷりっとした白身が人気。" },
    { id: 301, name: "キス（シロギス）", location: "sea", size: "small", price: 90, weight: 30, image: "images/fish/kisu.png", desc: "砂浜の人気者。天ぷらで有名な投げ釣りの定番。" },
    { id: 302, name: "コハダ", location: "sea", size: "small", price: 70, weight: 30, image: "images/fish/kohada.png", desc: "コノシロの若魚。寿司ネタで有名な光りもの。" },
    { id: 303, name: "サヨリ", location: "sea", size: "small", price: 80, weight: 30, image: "images/fish/sayori.png", desc: "細長い体と長い下あごが特徴の上品な魚。" },
    { id: 304, name: "スズメダイ", location: "sea", size: "small", price: 60, weight: 32, image: "images/fish/suzumedai.png", desc: "岩礁や港で群れる、小さくて丈夫な魚。" },
    { id: 305, name: "チョウチョウウオ", location: "sea", size: "small", price: 140, weight: 26, image: "images/fish/tyoutyouuo.png", desc: "ひらひら泳ぐサンゴ礁の人気者。" },
    { id: 306, name: "ツノダシ", location: "sea", size: "small", price: 150, weight: 26, image: "images/fish/tunodasi.png", desc: "背ビレが長く伸びた白黒のおしゃれな魚。" },
    { id: 307, name: "ハゼ（マハゼ）", location: "sea", size: "small", price: 70, weight: 32, image: "images/fish/mahaze.png", desc: "河口や干潟にすむ小さな魚。天ぷらが絶品。" },
    { id: 308, name: "ハタタテダイ", location: "sea", size: "small", price: 150, weight: 26, image: "images/fish/hatatatedai.png", desc: "長い背ビレをたなびかせるサンゴ礁の魚。" },
    { id: 309, name: "ハタハタ", location: "sea", size: "midi", price: 110, weight: 22, image: "images/fish/hatahata.png", desc: "冬の日本海で獲れる、うろこのない魚。" },
    { id: 310, name: "ホッケ", location: "sea", size: "midi", price: 130, weight: 22, image: "images/fish/hokke.png", desc: "北の海で獲れる、脂ののった大衆魚。" },
    { id: 311, name: "ボラ", location: "sea", size: "midi", price: 100, weight: 24, image: "images/fish/bora.png", desc: "河口にも上がってくる、ジャンプ上手な魚。" },
    { id: 312, name: "メバル", location: "sea", size: "midi", price: 150, weight: 22, image: "images/fish/mebaru.png", desc: "大きな目が特徴の岩礁の魚。" },
    { id: 313, name: "ルリスズメダイ", location: "sea", size: "small", price: 110, weight: 28, image: "images/fish/rurisuzumedai.png", desc: "宝石のように青く輝くサンゴ礁の魚。" },
    { id: 314, name: "イイダコ", location: "sea", size: "midi", price: 140, weight: 22, image: "images/fish/iidako.png", desc: "ご飯粒のような卵を持つ小型のタコ。" },
    { id: 315, name: "キジハタ（アコウ）", location: "sea", size: "midi", price: 260, weight: 15, image: "images/fish/kizihata.png", desc: "高級魚として知られる赤い斑点のハタ。" },
    { id: 316, name: "コウイカ", location: "sea", size: "midi", price: 170, weight: 22, image: "images/fish/kouika.png", desc: "体の中に硬い甲（舟）を持つイカ。" },
    { id: 317, name: "アカガイ", location: "sea", toolType: "net", size: "small", price: 110, weight: 26, image: "images/fish/akagai.png", desc: "【網限定】血のように赤い体液を持つ二枚貝。" },
    { id: 318, name: "ガザミ（ワタリガニ）", location: "sea", toolType: "net", size: "midi", price: 220, weight: 20, image: "images/fish/gazami.png", desc: "【網限定】泳ぎが得意なカニ。味噌汁の出汁が絶品。" },
    { id: 319, name: "クルマエビ", location: "sea", toolType: "net", size: "midi", price: 260, weight: 16, image: "images/fish/kurumaebi.png", desc: "【網限定】体を丸めると車輪のように見える高級エビ。" },
    { id: 320, name: "サクラエビ", location: "sea", toolType: "net", size: "small", price: 60, weight: 34, image: "images/fish/sakuraebi.png", desc: "【網限定】駿河湾で有名な桜色の小さなエビ。" },
    { id: 321, name: "シバエビ", location: "sea", toolType: "net", size: "small", price: 70, weight: 34, image: "images/fish/sibaebi.png", desc: "【網限定】浅い海にすむ小型のエビ。かき揚げの定番。" },
    { id: 322, name: "ツメタガイ", location: "sea", toolType: "net", size: "small", price: 40, weight: 36, image: "images/fish/tumetagai.png", desc: "【網限定】他の貝に穴をあけて食べる貝のハンター。" },
    { id: 323, name: "トリガイ", location: "sea", toolType: "net", size: "small", price: 130, weight: 24, image: "images/fish/torigai.png", desc: "【網限定】足の形が鳥のくちばしに似た寿司ネタの貝。" },
    { id: 324, name: "バイガイ", location: "sea", toolType: "net", size: "small", price: 90, weight: 28, image: "images/fish/baigai.png", desc: "【網限定】縞模様の巻貝。煮付けにするとおいしい。" },
    { id: 325, name: "フジツボ", location: "sea", toolType: "net", size: "small", price: 35, weight: 38, image: "images/fish/huzitubo.png", desc: "【網限定】岩や船底にびっしりくっつく生き物。" },
    { id: 326, name: "ブラックタイガー", location: "sea", toolType: "net", size: "small", price: 150, weight: 24, image: "images/fish/burakkutaiga.png", desc: "【網限定】縞模様が虎のように見える大型のエビ。" },
    { id: 327, name: "ホタテガイ", location: "sea", toolType: "net", size: "small", price: 140, weight: 24, image: "images/fish/hotategai.png", desc: "【網限定】貝殻をパクパクさせて泳ぐ二枚貝。" },
    { id: 328, name: "ホンビノスガイ", location: "sea", toolType: "net", size: "small", price: 100, weight: 28, image: "images/fish/honbinosugai.png", desc: "【網限定】ハマグリに似た大きな二枚貝。" },
    { id: 329, name: "ボタンエビ", location: "sea2", toolType: "net", size: "midi", price: 350, weight: 16, image: "images/fish/botanebi.png", desc: "【網限定】ぷりぷりで甘い高級エビ。" },
    { id: 330, name: "マテガイ", location: "sea2", toolType: "net", size: "small", price: 80, weight: 30, image: "images/fish/mategai.png", desc: "【網限定】細長い筒のような二枚貝。" },
    { id: 331, name: "ミルガイ", location: "sea2", toolType: "net", size: "small", price: 320, weight: 14, image: "images/fish/mirugai.png", desc: "【網限定】大きな水管をもつ高級寿司ネタの貝。" },
    { id: 332, name: "ウミエラ", location: "sea2", toolType: "net", size: "small", price: 100, weight: 28, image: "images/fish/umiera.png", desc: "【網限定】鳥の羽のような形をした海底の生き物。" },
    { id: 333, name: "ウミグモ", location: "sea2", toolType: "net", size: "small", price: 150, weight: 22, image: "images/fish/umigumo.png", desc: "【網限定】細くて長い脚を持つ、クモのような海の生き物。" },
    { id: 334, name: "ウミサボテン", location: "sea2", toolType: "net", size: "small", price: 180, weight: 20, image: "images/fish/umisaboten.png", desc: "【網限定】サボテンのような形をした海の生き物。" },
    { id: 335, name: "ウミシダ", location: "sea2", toolType: "net", size: "small", price: 120, weight: 26, image: "images/fish/umisida.png", desc: "【網限定】羽のような腕が美しいウミユリの仲間。" },
    { id: 336, name: "クモヒトデ", location: "sea2", toolType: "net", size: "small", price: 90, weight: 30, image: "images/fish/kumohitode.png", desc: "【網限定】長い腕をくねらせて歩くヒトデの仲間。" },
    { id: 337, name: "ヒモムシ", location: "sea2", toolType: "net", size: "small", price: 60, weight: 32, image: "images/fish/himomusi.png", desc: "【網限定】ひものように細長い体の海の生き物。" },
    { id: 338, name: "ユムシ", location: "sea2", toolType: "net", size: "small", price: 70, weight: 32, image: "images/fish/yumusi.png", desc: "【網限定】ソーセージのような形をした海底の生き物。" },
    { id: 339, name: "ジュゴン", location: "sea2", toolType: "net", size: "big", price: 900, weight: 8, image: "images/fish/zyugon.png", desc: "【網限定】人魚伝説のもとになったとも言われる海獣。" },
    { id: 340, name: "マナティ", location: "sea2", toolType: "net", size: "big", price: 850, weight: 8, image: "images/fish/manatexi.png", desc: "【網限定】のんびり泳ぐ、丸い体の草食海獣。" },
    { id: 341, name: "ラッコ", location: "sea2", toolType: "net", size: "big", price: 650, weight: 10, image: "images/fish/rakko.png", desc: "【網限定】貝を石で割る、道具使いの海獣。" },
    { id: 342, name: "カンパチ", location: "sea3", size: "big", price: 900, weight: 12, image: "images/fish/kanpati.png", desc: "ヒラマサの親戚にあたる高級魚。" },
    { id: 343, name: "キハダマグロ", location: "sea3", size: "big", price: 1100, weight: 10, image: "images/fish/kihadamaguro.png", desc: "黄色いヒレが特徴のマグロ。" },
    { id: 344, name: "クエ", location: "sea3", size: "big", price: 1300, weight: 8, image: "images/fish/kue.png", desc: "鍋で有名な幻の高級魚。" },
    { id: 345, name: "シイラ", location: "sea3", size: "big", price: 800, weight: 12, image: "images/fish/siira.png", desc: "ジャンプが得意なカラフルな魚。" },
    { id: 346, name: "ヒラマサ", location: "sea3", size: "big", price: 1000, weight: 10, image: "images/fish/hiramasa.png", desc: "ブリの親戚で、とても力の強い魚。" },
    { id: 347, name: "ビンナガマグロ", location: "sea3", size: "big", price: 900, weight: 12, image: "images/fish/binnagamaguro.png", desc: "長い胸ビレをもつ、白身のマグロ。" },
    { id: 348, name: "ブリ", location: "sea3", size: "big", price: 750, weight: 14, image: "images/fish/buri.png", desc: "成長で名前が変わる出世魚の代表。" },
    { id: 349, name: "メバチマグロ", location: "sea3", size: "big", price: 1200, weight: 10, image: "images/fish/mebatimaguro.png", desc: "大きな目が特徴のマグロ。" },
    { id: 350, name: "カリフォルニアアシカ", location: "sea3", toolType: "net", size: "big", price: 1100, weight: 8, image: "images/fish/kariforuniaasika.png", desc: "【網限定】芸達者で知られる人気者の海獣。" },
    { id: 351, name: "ベニザケ", location: "river", size: "midi", price: 320, weight: 14, image: "images/fish/benizake.png", desc: "真っ赤な婚姻色になるサケの仲間。" },
    { id: 352, name: "ムツゴロウ", location: "swamp", size: "small", price: 220, weight: 22, image: "images/fish/mutugorou.png", desc: "干潟で跳ねる、愛嬌たっぷりの魚。" },
    { id: 353, name: "シシャモ", location: "lake", size: "small", price: 130, weight: 28, image: "images/fish/sisyamo.png", desc: "卵をぎっしり抱えた北海道の名物。" },
    { id: 354, name: "ゴマフアザラシ", location: "snow", toolType: "net", size: "midi", price: 420, weight: 16, image: "images/fish/gomahuazarasi.png", desc: "【網限定】ごま模様がかわいいアザラシ。" },
    { id: 355, name: "ベルーガ（シロイルカ）", location: "snow", toolType: "net", size: "big", price: 750, weight: 9, image: "images/fish/beruga.png", desc: "【網限定】白くて丸い頭のイルカの仲間。" },
    { id: 356, name: "イッカク", location: "snow", toolType: "net", size: "big", price: 900, weight: 8, image: "images/fish/ikkaku.png", desc: "【網限定】長い牙がまっすぐ伸びたクジラの仲間。" },
    { id: 357, name: "コククジラ", location: "snow", toolType: "net", size: "biggest", price: 1100, weight: 5, image: "images/fish/kokukuzira.png", desc: "【網限定】長い旅をする沿岸のクジラ。" },
    { id: 358, name: "ザトウクジラ", location: "snow", toolType: "net", size: "biggest", price: 1300, weight: 4, image: "images/fish/zatoukuzira.png", desc: "【網限定】「歌うクジラ」として有名な巨体。" },
    { id: 359, name: "セイウチ", location: "snow", toolType: "net", size: "big", price: 700, weight: 10, image: "images/fish/seiuti.png", desc: "【網限定】立派な牙をもつ北の巨体。" },
    { id: 360, name: "セミクジラ", location: "snow", toolType: "net", size: "biggest", price: 1400, weight: 4, image: "images/fish/semikuzira.png", desc: "【網限定】背ビレがなく、頭が大きなクジラ。" },
    { id: 361, name: "ゾウアザラシ", location: "snow", toolType: "net", size: "big", price: 800, weight: 9, image: "images/fish/zouazarasi.png", desc: "【網限定】ゾウの鼻のような鼻をもつ巨大アザラシ。" },
    { id: 362, name: "トド", location: "snow", toolType: "net", size: "big", price: 600, weight: 10, image: "images/fish/todo.png", desc: "【網限定】アシカの仲間で最大級の海獣。" },
    { id: 363, name: "ナガスクジラ", location: "snow", toolType: "net", size: "biggest", price: 1600, weight: 3, image: "images/fish/nagasukuzira.png", desc: "【網限定】シロナガスクジラに次ぐ大きさの巨大クジラ。" },
    { id: 364, name: "ミンククジラ", location: "snow", toolType: "net", size: "big", price: 1000, weight: 8, image: "images/fish/minnkukuzira.png", desc: "【網限定】ヒゲクジラの中では小柄なクジラ。" },
    { id: 365, name: "ケガニ", location: "snow", toolType: "net", size: "midi", price: 380, weight: 18, image: "images/fish/kegani.png", desc: "【網限定】体中に細かい毛のようなトゲがある北のカニ。" },
    { id: 366, name: "花咲ガニ", location: "snow", toolType: "net", size: "midi", price: 460, weight: 14, image: "images/fish/hanasakigani.png", desc: "【網限定】根室の名物、真っ赤なカニ。" },
    { id: 367, name: "フウセンウナギ", location: "deepsea", size: "midi", price: 900, weight: 12, image: "images/fish/huusenunagi.png", desc: "風船のように口をふくらませる深海魚。" },
    { id: 368, name: "ホウライエソ", location: "deepsea", size: "midi", price: 800, weight: 12, image: "images/fish/houraieso.png", desc: "牙のような歯が目立つ深海の肉食魚。" },
    { id: 369, name: "ミズウオ", location: "deepsea", size: "midi", price: 950, weight: 11, image: "images/fish/mizuuo.png", desc: "何でも食べる「海の掃除屋」と呼ばれる深海魚。" },
    { id: 370, name: "アンコウ", location: "deepsea", size: "midi", price: 1000, weight: 10, image: "images/fish/ankou.png", desc: "ちょうちんで獲物をおびき寄せる冬の味覚。" },
    { id: 371, name: "クロムツ", location: "deepsea", size: "midi", price: 850, weight: 12, image: "images/fish/kuromutu.png", desc: "脂ののった深場の魚。煮付けが人気。" },
    { id: 372, name: "アカムツ（ノドグロ）", location: "deepsea", size: "midi", price: 1300, weight: 8, image: "images/fish/akamutu.png", desc: "「ノドグロ」と呼ばれる超高級魚。" },
    { id: 373, name: "アコウダイ", location: "deepsea", size: "midi", price: 1100, weight: 10, image: "images/fish/akoudai.png", desc: "目が大きな赤い深海魚。" },
    { id: 374, name: "キンメダイ", location: "deepsea", size: "midi", price: 1200, weight: 9, image: "images/fish/kinmedai.png", desc: "金色の目が光る高級魚。" },
    { id: 375, name: "ダイオウホウズキイカ", location: "deepsea", size: "biggest", price: 2200, weight: 3, image: "images/fish/daiouhouzukiika.png", desc: "世界最大級の巨大イカ。" },
    { id: 376, name: "ペリカンアンコウ", location: "deepsea", size: "big", price: 1500, weight: 6, image: "images/fish/perikanankou.png", desc: "ペリカンのように大きく開く口の深海魚。" },
    { id: 377, name: "ミズダコ", location: "deepsea", size: "big", price: 1400, weight: 7, image: "images/fish/mizudako.png", desc: "世界最大のタコ。" },
    { id: 378, name: "オオグソクムシ", location: "deepsea", toolType: "net", size: "midi", price: 700, weight: 14, image: "images/fish/oogusokumusi.png", desc: "【網限定】ダイオウグソクムシに似た深海のダンゴムシの仲間。" },
    { id: 379, name: "ベニズワイガニ", location: "deepsea", toolType: "net", size: "midi", price: 900, weight: 12, image: "images/fish/benizuwaigani.png", desc: "【網限定】赤い色のズワイガニの仲間。" },
    { id: 388, name: "タツノオトシゴ", location: "sea", toolType: "net", size: "small", price: 280, weight: 18, image: "images/fish/fish_tatsu.png", desc: "【網限定】くるんと丸まった尾が特徴の、小さな海の馬。" }
]);

// ---- 画像がまだ無い生き物：images/fish/ に画像を置くと、自動で登場します ----
//   （ファイル名は下の image のとおりに作ってください。無い間はゲームに出てきません）
addFishWhenImage([
    { id: 380, name: "アオリイカ", location: "sea2", size: "midi", price: 320, weight: 20, image: "images/fish/aoriika.png", desc: "「イカの王様」と呼ばれる甘みの強いイカ。" },
    { id: 381, name: "ウミイグアナ", location: "sea2", size: "big", price: 700, weight: 9, image: "images/fish/umiiguana.png", desc: "海に潜って海藻を食べる世界でただ一つのイグアナ。" },
    { id: 382, name: "オニオコゼ", location: "sea2", size: "midi", price: 380, weight: 16, image: "images/fish/oniokoze.png", desc: "背ビレに毒をもつ高級魚。" },
    { id: 383, name: "スズキ（シーバス）", location: "sea2", size: "midi", price: 300, weight: 20, image: "images/fish/suzuki.png", desc: "ルアー釣りで大人気の出世魚。" },
    { id: 384, name: "スルメイカ", location: "sea2", size: "midi", price: 220, weight: 24, image: "images/fish/surumeika.png", desc: "干してスルメになる身近なイカ。" },
    { id: 385, name: "タチウオ", location: "sea2", size: "midi", price: 340, weight: 18, image: "images/fish/tatiuo.png", desc: "太刀のような銀色の体をした魚。" },
    { id: 386, name: "ケンサキイカ", location: "sea2", size: "midi", price: 330, weight: 18, image: "images/fish/kensakiika.png", desc: "剣の先のように尖ったイカ。" },
    { id: 387, name: "サワラ", location: "sea2", size: "midi", price: 420, weight: 16, image: "images/fish/sawara.png", desc: "春を告げる、スマートな魚。" }
]);

// ---- 図鑑の豆知識 ----
addTrivia({
    300: "縄張り意識が強く、産卵期のオスは卵をずっと守り続けるよ。",
    301: "砂地にすみ、海底の小さな生き物を探して食べているよ。",
    302: "成長で名前が変わる出世魚。シンコ→コハダ→ナカズミ→コノシロ。",
    303: "下あごだけが長く伸びていて、上あごは短いんだ。",
    304: "縄張り意識が強く、近づいてくるものを追い払うよ。",
    305: "目に黒い帯があって、天敵に頭の位置をまぎらわせると言われる。",
    306: "背ビレが角のように長く伸びる姿が名前の由来だよ。",
    307: "寿命は約1年。秋のハゼ釣りは日本の風物詩なんだ。",
    308: "長い背ビレが旗のように見えるので「旗立鯛」と呼ばれる。",
    309: "卵は「ブリコ」と呼ばれ、プチプチした食感が人気だよ。",
    310: "岩の間に卵を産み、オスが卵を守る習性があるよ。",
    311: "成長で名前が変わる出世魚。「とどのつまり」の語源とも言われる。",
    312: "卵ではなく稚魚を産む卵胎生。名前は大きな目から。",
    313: "サンゴの周りで群れをつくり、危険を感じると隙間に隠れるよ。",
    314: "卵が飯粒に似ているのが名前の由来だよ。",
    315: "西日本では「アコウ」と呼ばれ、最高級の魚として扱われる。",
    316: "体内の甲に空気の部屋があり、浮き沈みを調節しているよ。",
    317: "血液にヘモグロビンがあるので、身が赤いんだ。",
    318: "最後の足がヒレのように平たくて、泳ぐのが得意だよ。",
    319: "縞模様の体を曲げると車輪に見えるのが名前の由来だよ。",
    320: "日本で漁をしているのは、ほぼ駿河湾だけなんだ。",
    321: "かき揚げや唐揚げにすると、香ばしくておいしいよ。",
    322: "歯舌と分泌液で貝殻に穴を開け、中身を食べてしまうんだ。",
    323: "足が鳥のくちばしに似ているのが名前の由来という説があるよ。",
    324: "ベーゴマの名前は、バイ貝の殻で遊んだことに由来するよ。",
    325: "貝に見えるけれど、実はエビやカニと同じ甲殻類なんだ。",
    326: "黒い縞模様が虎に似ているのが名前の由来だよ。",
    327: "貝柱の力で殻を開け閉めして、海の中を泳ぐことができる。",
    328: "北アメリカ原産で、日本では東京湾などで増えているよ。",
    329: "生まれた時はオスで、成長するとメスに変わるんだ。",
    330: "塩をかけると、穴から飛び出してくるよ。",
    331: "水管が海藻の「ミル」に似ているのが名前の由来という説がある。",
    332: "羽のように見えるけれど、サンゴやイソギンチャクの仲間だよ。",
    333: "陸のクモとは別の仲間で、体の割に脚がとても長いんだ。",
    334: "サンゴやイソギンチャクと同じ刺胞動物の仲間だよ。",
    335: "ウミユリの仲間だけど、成長すると柄がなくなって泳げるよ。",
    336: "細い腕をくねらせて、意外なほど素早く動くよ。",
    337: "種類によっては、体長が数十メートルにもなるんだ。",
    338: "砂や泥にU字形の穴を掘ってすんでいるよ。",
    339: "海草を食べる草食の海獣で、「人魚」のモデルとも言われるよ。",
    340: "1日に体重の1割ほどの水草を食べることもあるんだ。",
    341: "眠る時は流されないように、仲間と手をつなぐよ。",
    342: "頭を上から見ると「八」の字の模様があるので「間八」と呼ばれる。",
    343: "大きくなるほど、ヒレが長く黄色く伸びていくよ。",
    344: "成長がゆっくりで、数十年生きる個体もいるんだ。",
    345: "オスは成長するとおでこが出っ張って、四角い顔になるよ。",
    346: "ブリより体がスマートで、引きがとても強いと人気だよ。",
    347: "胸ビレが長いので「ビンチョウ」とも呼ばれるよ。",
    348: "関東では、ワカシ→イナダ→ワラサ→ブリと名前が変わる。",
    349: "目が大きく、深い海にも潜って獲物を探すよ。",
    350: "耳たぶがあるのがアシカの特徴。アザラシにはないんだ。",
    351: "産卵期になると、オスの体が鮮やかな赤色に染まるよ。",
    352: "ヒレを使って干潟の上を歩き、皮膚でも呼吸するんだ。",
    353: "本物のシシャモは、北海道の太平洋側にしかすんでいないよ。",
    354: "赤ちゃんは、白くてふわふわの毛で生まれてくるよ。",
    355: "多彩な声を出すので「海のカナリア」と呼ばれるよ。",
    356: "長い牙は、実は伸びた歯。感覚器官だとも言われるよ。",
    357: "毎年、数千キロもの距離を回遊するんだ。",
    358: "オスは長い「歌」をうたって、メスにアピールするよ。",
    359: "牙は、氷の上に上がる時の足がかりにも使うんだ。",
    360: "背ビレがなく、頭には白いコブのような模様があるよ。",
    361: "オスは体重が数トンにもなる、最大級のアザラシだよ。",
    362: "体重が1トンを超える個体もいるんだ。",
    363: "地球で2番目に大きい動物で、泳ぎもとても速いよ。",
    364: "ヒゲクジラの中では小さいほうでも、数トンはあるんだ。",
    365: "名前のとおり、体に毛のような細かいトゲがあるよ。",
    366: "名前は、北海道根室の花咲港に由来するんだ。",
    367: "とても大きな口で、小さなエサをまとめて飲み込むよ。",
    368: "夜になると、深い所から浅い所まで毎日上り下りするんだ。",
    369: "胃の中から、ビニール袋などが出てきたことがあるよ。",
    370: "頭の長い突起を振って、小魚をおびき寄せるんだ。",
    371: "深い海にすみ、成長すると体が黒っぽくなるよ。",
    372: "口の中が黒いので「ノドグロ」と呼ばれているよ。",
    373: "深い所から急に引き上げると、目が飛び出ることがあるよ。",
    374: "目が光を反射して金色に光るのが名前の由来だよ。",
    375: "体重は500kg近くになるとも言われているんだ。",
    376: "エサの少ない深海では、大きな口でチャンスを逃さないよ。",
    377: "腕を広げると、数メートルにもなる巨大なタコだよ。",
    378: "から揚げにして食べる地域もあるんだ。",
    379: "水深数百〜2000mほどの深い海にすんでいるよ。",
    388: "オスのおなかの袋で赤ちゃんが育ち、オスが「出産」するんだ。",
    380: "ヒレが体全体にあって、水中で優雅に泳ぐよ。",
    381: "ガラパゴス諸島にすみ、余分な塩を鼻から吹き出すんだ。",
    382: "岩にそっくりな姿で待ち伏せ。トゲの毒には注意だよ。",
    383: "成長で名前が変わる出世魚。セイゴ→フッコ→スズキ。",
    384: "寿命はおよそ1年。短い一生を駆け抜けるよ。",
    385: "立ち泳ぎをすることでも知られているよ。",
    386: "体の先が剣の先のように尖っているのが名前の由来だよ。",
    387: "漢字では「鰆」。春の味覚として知られているよ。"
});

// ---- 魚影の向き ----
// 向きは fishfacing.js に一本化しました（300〜388 もそちらで設定）。個別に足すときだけ setFacing({ id: 'L' }) を使ってください。

// ---- サカバンバスピス（深海）の絵を新しい画像に差し替え（Ver 2.7.1） ----
FISH_DATA.find(f => f.id === 108).image = "images/fish/sakabanbasupisu.png";

/* ===================================================
   Ver 3.0.1  さざ波の海に「オジサン」（画像 images/fish/ojisan.png を置くと登場します）
   =================================================== */
addFishWhenImage([
    { id: 389, name: "オジサン", location: "sea", size: "small", price: 140, weight: 14, image: "images/fish/ojisan.png", desc: "あごの下に2本のヒゲがある魚。名前も見た目も、なんだかオジサン。" }
]);
addTrivia({ 389: "正式名ではなく、ヒメジ科の魚の呼び名。あごのヒゲで砂の中のエサを探すよ。" });
setFacing({ 389: 'L' });
setCm({ 389: 25 });

/* ===================================================
   新しく足すとき（コピーして使ってください）
   ---------------------------------------------------
   addArea('coral', { name: "サンゴ礁", bg: "images/bg/bg_coral.png", reqLevel: 70, sound: "sounds/coral.mp3" }, 'deepsea');  // 最後の引数＝この次に並べる位置
   addFish([{ id: 400, name: "サンゴウオ", location: "coral", size: "small", price: 500, image: "images/fish/sangouo.png", desc: "サンゴの間にすむ小さな魚。" }]);
   addFish([{ id: 401, name: "ミドリイシ", location: "coral", toolType: "net", size: "midi", price: 700, image: "images/fish/midoriishi.png", desc: "【網限定】サンゴの仲間。" }]);
   addTrivia({ 400: "サンゴは動物。小さなポリプが集まってできているよ。" });
   setFacing({ 400: 'L', 401: 'L' });
   addRod('coral_rod', { name: "サンゴの竿", icon: "images/fishingrod/coral_rod.png", price: 90000, desc: "サンゴ礁で使いやすい竿。" });
   addNet('coral_net', { name: "サンゴの網", icon: "images/net/net_coral.png", price: 40000, ring: 60, desc: "輪が大きい網。" });
   addAcc('lucky_charm', { name: "お守り", icon: "images/acc/lucky_charm.png", price: 12000, desc: "ラッキーなお守り。" });
   addAchievement('coral_master', { name: "サンゴの主", desc: "サンゴ礁の生き物をすべて登録した" });
   setCm({ 400: 12, 401: 40 });            // 実物サイズ(cm)。魚影の大きさに使われます（無ければ size から自動）
   setSpecial({ 401: 'dodge' });           // 特別な捕まえ方を指定（timing/follow/dodge/rhythm/charge/guard/match/simon/shell/sort/lights/odd/pop）
   ※ 各エリアの竿・網で「出現の重み(weight)が一番小さい生き物」は、自動で特別な捕まえ方（ミニゲーム）になります。
   ※ id は他と重ならない番号にしてください。今回の追加は 300〜389 まで使用済みです（400〜459 はイベントエリア用）。
   =================================================== */
