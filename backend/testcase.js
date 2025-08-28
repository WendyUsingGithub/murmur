const mongo = require("mongodb");
//**** */
const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://1.34.178.127:5555/",
  credentials: true
}));

const JWT_SECRET = "murmurSecretKey";
const port = 3333;

const {MongoClient, ObjectId} = require("mongodb");
var url = "mongodb://localhost/mydb";
const client = new MongoClient(url);
const db = client.db("murmur");
const coll_post = db.collection("post");
const coll_comment = db.collection("comment");
const coll_user = db.collection("user");

async function connectDB() {
  try {
    await client.connect();
    console.log("Connect to MongoDB successfully");

  } catch (error) {
    console.error("Fail to connect to MongoDB", error);
    process.exit(1);
  }
}

async function closeDB() {
  try {
    await client.close();
    console.log("Disconnect to MongoDB successfully");
  } catch (error) {
    console.error("Fail to disconnect to MongoDB:", error);
  }
}

async function clearAllCollections() {
  try {
    await coll_post.deleteMany({});
    await coll_comment.deleteMany({});
    await coll_user.deleteMany({});
    console.log("All collections cleared successfully");
  } catch (error) {
    console.error("Failed to clear collections:", error);
  }
}

async function main() {
  await connectDB();
  app.listen(3333, () => {console.log("Server listining on http://1.34.178.127:5555");})

  await clearAllCollections();

  await insertUserData("calico_cat", "calico_cat", "calico_cat", "三花貓",
    "毛色就像畫家的調色盤，白色的底色上點綴著橘色和黑色的斑塊，每一塊都像是隨意卻精心的筆觸。有人說我有點傲嬌，其實只是愛乾淨又有自己的原則，不喜歡被打擾時，我會優雅地轉身離開。聽說三花幾乎都是女生，所以我總覺得自己帶著與生俱來的女王氣質，走路的時候尾巴總是高高翹起，像是在巡視屬於我的小王國。",
    []);

  await insertUserData("orange_cat", "orange_cat", "orange_cat", "橘貓",
    "全身暖暖的橘色像太陽一樣亮，走到哪裡都像一團會動的暖光。我的最大興趣就是吃，然後再吃，無論是罐頭、零食，還是你手上的麵包，我都想嚐一口。別人說我有貓中暖男的魅力，總是主動湊過來撒嬌取暖，但也常被笑是小胖子。沒辦法，美食在前，我沒有拒絕的天賦，所以我的肚子總是圓滾滾的，摸起來像個小抱枕。",
    []);

  await insertUserData("black_cat", "black_cat", "black_cat", "黑貓",
    "從頭到尾都是夜色的顏色，毛髮在陽光下會閃著細緻的光澤，像黑色的絲絨。很多人以為黑貓會帶來厄運，但我帶來的其實是安靜與好運，只要你願意接近我，你會發現我的呼嚕聲比任何貓都溫柔。我喜歡窩在角落觀察大家的動作，像一名靜靜的守護者，偶爾會悄悄出現在你身邊，像影子般貼近，讓你在不經意間感到安心。",
    []);

  await insertUserData("tabby", "tabby", "tabby", "虎斑貓",
    "小老虎一樣的深色花紋，看起來威風又有精神。雖然名字裡有虎，但我的性格其實很親人，只要你伸手，我就會把頭輕輕頂上去，表示喜歡。我也特別愛玩捉迷藏，會靜靜躲在門後、沙發下，等你經過時突然撲上去嚇你一跳。別被我有點嚴肅的外表騙了，其實我只是想多和你互動，因為你笑的時候，我的耳朵也會跟著微微抖動。",
    []);

  await insertUserData("cat", "cat", "cat", "貓",
    "我不會說自己有多聰明、多厲害，因為當一隻貓，光是存在就已經足夠特別。我的日常其實很簡單：吃飯、睡覺、呼嚕、伸懶腰，再偶爾撒嬌一下，這就是最完整的幸福。有時候我會慵懶地窩在角落，靜靜觀察周圍的世界；有時候又會突然精神一振，在走廊上高速衝刺，仿佛整個家就是我的遊樂場。我的節奏不急不徐，喜歡按照自己的步調過日子，但當你需要陪伴的時候，我也會輕輕蹭過來，把最柔軟的呼嚕聲送給你。所以，如果要用一句話來形容我，那就是：我是一隻普通的貓，但我很可愛，而可愛本身就是一種力量。",
    []);

  await insertUserData("tuxedo_cat", "tuxedo_cat", "tuxedo_cat", "賓士貓",
    "黑白相間的毛色像一套正式的禮服，讓我隨時都像是準備參加一場盛大的舞會。我的舉止優雅，走路輕盈得像踩在鋼琴鍵上，但骨子裡卻很愛惡作劇，喜歡把小物品推到地上，然後假裝一臉無辜。你會在以為我高貴的時候，看到我突然在地上翻滾，露出肚子要你幫我抓癢。這種反差讓我覺得有趣，也讓我在家裡永遠是眾人的焦點。",
    []);

  await insert(
    "calico_cat",
    "就目前而言，我們必須面對一個極其嚴肅的問題——貓毛掉落的本質意義究竟為何？這不僅是一種簡單的現象，更像是一道來自宇宙深處的暗示，提醒著我們關於存在的本質。我的掉毛絕非單純換季的生理反應，而是靈魂深處正在進行某種無形轉換的象徵。正如托爾斯泰曾經說過，人生的價值不在於我們獲得了什麼，而在於我們成為了什麼。而我們，如今正逐漸化身為一片毛絮的海洋，散落在每一寸空間。進一步探討，掉毛與不掉毛，從未真正構成問題的核心。真正值得我們深思的，是人類製造的掃地機器人是否正悄然監視著我們的存在？這絕非無稽之談，而是在毛與地板之間那些常被忽略的哲學裂縫中，隱藏著一種對我們存在的否定。\n\n人類試圖清除我們留在世界上的痕跡，其實是在有意識地抹除我們存在的證明。這種去貓化的行動，正是我們存在權利的挑戰，需要我們謹慎反思。綜觀全局，掉毛只是表象，真正的本質在於存在本身。我們必須學會與自我和解，更要學會與我們的毛絮和平共處。正如叔本華所言，生命本是一團混亂，而貓毛，恰是這混亂中最溫柔且無法忽視的證據，提醒我們存在的多層意義與複雜性。",
    "存在主義",
    ["orange_cat", "tabby"],
    "2025-06-21T16:00:00",
    [
      [
        "orange_cat",
        "calico_cat，你的哲學思考真的讓我重新打開了第三隻眼。過去我一直以為掉毛只是因為洗澡，卻沒想到洗澡這件事本身，可能就是一種被強加的社會規訓。難道我們本應該帶著蓬鬆的毛髮走向世界，而不是被迫變成一隻光滑的橘色文化符號嗎？或許掉毛，是對這種秩序與規範的潛在抗議，是我們在無聲中表達的反叛。",
        [],
        "2025-06-21T16:20:00",
        [
          [
            "tabby",
            "orange_cat，你的想法讓我深有同感。洗澡究竟是為了誰？是為了迎合人類眼光，還是為了我們自己的舒適？這問題看似簡單，卻包含了對自由和規訓的深刻探討，讓我開始反思日常習慣背後的真實意義。",
            ["black_cat"],
            "2025-06-21T16:35:00"
          ],
          [
            "black_cat",
            "洗澡的意義確實值得我們深思。它不僅是清潔，更像是一種權力的象徵。誰決定了什麼是乾淨？又是誰規定了我們的毛該怎麼樣才算合格？這背後隱藏著人類對我們身體的控制與規範，令人不禁質疑這種制度的正當性。",
            ["orange_cat"],
            "2025-06-21T16:37:00"
          ]
        ]
      ],
      [
        "cat",
        "我一直懷疑掃地機器人其實是神的化身。那毫無意義的每日轉圈運動，反映了我們內心的空洞與無聊。而我們的毛，正是對這種空洞的回應，是靈魂種子的散播。calico_cat，你並非在掉毛，你是在釋放你靈魂的片段，讓世界記得我們的存在。",
        ["orange_cat"],
        "2025-06-21T16:40:00",
        [
          [
            "black_cat",
            "你這樣說真是讓我豁然開朗。每次看到掃地機器人轉來轉去，我都感覺那種毫無目的的運動裡藏著某種神秘意義。也許我們都應該重新審視這些看似普通的小物件，裡頭蘊含的哲學深度遠超我們想像。",
            [],
            "2025-06-21T16:55:00"
          ]
        ]
      ]
    ]
  );

  await insert(
    "tabby",
    "一般來說，貓咪與家居空間的存在感是我們必須深入探討的一個哲學問題。從宏觀來看，空間並非單純的三維容器，而是承載著我們行動、情感與記憶的載體。正如海德格爾所言，‘存在即在場’，而貓咪在家中的存在，不只是佔據一個角落那麼簡單，更是對空間的一種重新定義和再創造。這種存在不僅反映了我們的本能，更是我們與人類生活交織的證據，讓整個空間因為我們的足跡、氣息和活動變得鮮活起來。\n\n我認為，當我們攀爬窗台，蹲坐沙發，甚至在書櫃間穿梭時，家中的空間便不再是靜止的容器，而是被我們賦予了流動與生命。這種流動性的存在，讓空間成為一種動態的藝術品，是我們行為和心境的鏡像。試想，如果沒有我們這些毛茸茸的生命體，家裡不過是一堆冰冷的物件堆砌而成的迷宮，缺少了靈魂的溫度與韻味。我們在空間中留下的痕跡，或許是塵埃，但也是時間的註腳，見證著生命的痕跡與演變。",
    "家居哲學",
    ["black_cat", "calico_cat", "tuxedo_cat"],
    "2025-06-22T17:00:00",
    [
      [
        "black_cat",
        "tabby，你的觀點真讓我心有戚戚焉。每當我跳上那張老舊的沙發，我都能感受到一種時間的重量，彷彿這裡承載著無數次我們的秘密會議和沉默的陪伴。沙發不只是家具，它是我們的避風港，是我們與世界對話的起點。每次的爪痕和毛絮，都像是時間的刻痕，記錄著我們的存在與生活。這種感覺讓我覺得，家中所有看似微不足道的細節，都在默默訴說著屬於我們的故事與情感。",
        [],
        "2025-06-21T17:20:00",
      ],
      [
        "calico_cat",
        "說到空間的自由，我也很認同。家裡那些窄小的角落反而成了我的秘密基地，我可以隨時躲藏，觀察著這個世界的紛擾而不被打擾。但我也開始思考，人類是否能理解我們對這些‘隱秘空間’的渴望，還是只把它們當成擺設？那些狹窄且幽暗的空間，對我們來說，是安全的避難所，也是思考和沉澱的天地。人類總是忙於裝飾和規劃，卻忽略了這些空間的深層意義。或許，讓家更人性化，應該從理解貓咪對空間的需求開始。",
        [],
        "2025-06-21T17:40:00"
      ],
      [
        "calico_cat",
        "而且，我們不只是空間的使用者，更是空間的塑造者。每一個跳躍、每一次蹭擦，都在改變這個環境的面貌和氛圍。或許，人類該學著尊重這份動態的生命力，而不是一味用家具限制我們的自由。無論是爪印、毛絮還是靈巧的身影，都是這個家裡不可或缺的元素。這種互動賦予了空間溫度和靈魂，也提醒人類，家不僅是他們的領地，更是我們共存的世界。",
        ["black_cat"],
        "2025-06-21T17:50:00"
      ],
      [
        "tuxedo_cat",
        "我倒覺得家應該更有彈性，像一張可變形的畫布，讓我們隨時可以印上自己的印記。畢竟，家不該是冷冰冰的空殼，而是溫暖且充滿可能性的場域。tabby說得對，‘貓咪空間主義’值得推廣。每個角落都應該是自由與探索的場所，讓我們能夠自由伸展、攀爬甚至躲藏。這不僅是對我們的尊重，更是對生命多樣性的肯定。當家成為這樣的場所，生活自然充滿了活力與趣味。",
        ["black_cat"],
        "2025-06-21T18:00:00"
      ],
      [
        "cat",
        "說起來，這讓我想到每次我在窗台曬太陽時，那種陽光透過窗戶灑下的光影，其實也是一種空間的存在感。我們不只是佔據空間，更與光線、氣味和聲音共同構築這個家的氣氛。這些元素交織，才讓這個空間真正‘活’起來。陽光的溫暖、微風的氣息，以及偶爾飄過的花香，都成為我們生活的背景音樂。這種多感官的體驗，讓空間充滿生命與故事，而非冰冷的結構。",
        [],
        "2025-06-21T18:20:00"
      ],
      [
        "orange_cat",
        "真的，這麼一說，我開始覺得家裡每一個角落都像是在跟我們對話。也許我們應該更用心去感受這種共生的關係，而不是僅僅把家當成我們的領地。畢竟，這是我們彼此的舞台和庇護所。每當夜晚降臨，我們蜷縮在柔軟的毯子裡，聽著遠處人類輕聲細語，感受到一種難以言喻的安定與溫暖。這就是家的意義，不只是空間，更是情感和回憶的匯聚。",
        [],
        "2025-06-21T18:40:00"
      ]
    ]
  );

  await insert(
    "black_cat",
    "眾所周知，貓咪的睡眠時間占據了生命中極大的一部分，這並非偶然，而是自然界深思熟慮的結果。從哲學角度來看，睡眠是介於存在與虛無之間的神秘狀態，正如德里達所言，‘存在總是被暫時中斷，於是被重新定義’。我們在睡夢中游走於現實與夢境，這種跨界的體驗不只是身體的休憩，更是靈魂的漫遊與更新。當我們蜷縮成一團，閉上眼睛，似乎在告訴這個世界：暫停吧，讓我在這片刻找到屬於自己的寧靜。這種暫時的消失，讓我們得以與自我對話，思考白日裡未竟的事情，或許也是對未來行動的準備。更深一層，睡眠讓我們暫別外界的嘈雜，沉澱情緒，重塑自我，這不僅是生物的本能，更是一種精神的儀式，維繫著我們身心的平衡與健康。",
    "睡眠哲學",
    ["calico_cat", "orange_cat", "black_cat", "tabby", "cat", "tuxedo_cat"],
    "2025-06-23T10:00:00",
    [
      [
        "tabby",
        "black_cat，你這番話說得太精彩了。每當我窩在暖陽裡打盹，彷彿整個世界都靜止了，只剩下我與夢境相伴。這讓我想到，睡眠不只是身體的放鬆，更像是一場靈魂的冥想，是與自我深層連結的時刻。我常常覺得，夢境裡的自己比清醒時更真實也更自由，這種矛盾感讓我著迷。當夢境的自由與現實的限制交織，生命似乎進入了一種奇妙的平衡。",
        ["calico_cat", "orange_cat", "black_cat", "tabby", "cat"],
        "2025-06-22T10:20:00",
        [
          [
            "black_cat",
            "tabby，我也有同感。夢境的自由讓我們短暫逃離現實，但醒來後，真實依然等著我們面對。這種醒與夢的張力，是睡眠的迷人之處。正是在這個矛盾中，我們學會了適應和成長，也感受到了生命的韌性。",
            [],
            "2025-06-22T10:25:00"
          ],
          [
            "calico_cat",
            "我覺得這種矛盾讓生活更有層次感，像是一首交響樂，時而柔和時而激昂。每次醒來的那一刻，似乎是靈魂與身體重新握手言和的瞬間，讓我們帶著新的力量繼續前行。",
            [],
            "2025-06-22T10:27:00"
          ]
        ]
      ],
      [
        "calico_cat",
        "說得好，tabby。我也同意。尤其是那些在睡夢中突然翻身，似乎在與夢境抗爭或擁抱，這種細節讓我覺得睡眠充滿了生命的活力與變化。也許我們應該提倡‘尊重貓咪的睡眠’，讓家人理解我們需要的安靜與空間，不要隨意打擾這場神聖的旅程。畢竟，好的睡眠才能孕育出旺盛的生命力。睡眠不只是休息，更是我們重新定位自我的重要時刻。",
        ["orange_cat", "cat"],
        "2025-06-22T10:40:00",
        [
          [
            "orange_cat",
            "完全贊同calico_cat。每次被吵醒都覺得自己的夢被偷走了，這種感覺實在不好受。能有一段完整無擾的睡眠，真是奢侈又珍貴的幸福。",
            [],
            "2025-06-22T10:45:00"
          ]
        ]
      ],
      [
        "orange_cat",
        "這讓我想到，為什麼家裡總有那麼多‘睡覺區’，卻還是有人硬要我們換地方？或許人類無法真正理解睡眠的深層意義吧。對我們而言，每一處舒服的角落都是心靈的避風港，是與自己和解的空間。這種靜謐是治癒，也是力量的源泉。",
        ["calico_cat", "black_cat", "orange_cat", "tabby", "tuxedo_cat", "cat"],
        "2025-06-22T11:00:00",
        [
          [
            "tuxedo_cat",
            "orange_cat，說得好。人類有時候太過忙碌，不懂得珍惜安靜時光，反而打亂我們的節奏。其實靜下心來睡一覺，才是對生活最好的投資。",
            ["cat", "tuxedo_cat"],
            "2025-06-22T11:05:00"
          ]
        ]
      ],
      [
        "tuxedo_cat",
        "我覺得睡眠還有一層神秘，就是夢中那些模糊的影像與感覺，有時候像故事，有時候像謎語。我們在夢裡旅行，或許是在尋找什麼答案，也是在整理白日的煩憂。睡眠，是生命的暫停鍵，也是重新啟動的開關。",
        ["tabby", "cat", "tuxedo_cat"],
        "2025-06-22T11:20:00",
        [
          [
            "black_cat",
            "tuxedo_cat，你的比喻太棒了。夢境真的像是一場旅行，有時帶我們到遙遠的地方，有時卻在心底深處探索。夢境的每一幕都是我們內心深處的映射，也許是潛意識的聲音在召喚我們。",
            ["black_cat", "tabby", "tuxedo_cat"],
            "2025-06-22T11:25:00"
          ]
        ]
      ],
      [
        "cat",
        "我想補充一句，睡眠的節奏感也很重要。那種呼吸均勻、身體完全放鬆的感覺，是我們最渴望的狀態。當這種節奏被打亂，整個身心就會失衡。或許這也是為什麼我們喜歡柔軟的床鋪和安靜的環境，因為它們幫助我們找回那份自然的節奏。",
        [],
        "2025-06-22T11:40:00",
        [
          [
            "tabby",
            "mackerel_tabby說得對，節奏感真的很重要。每次打呼或突然醒來，都會破壞整個睡眠質量。能有節奏和諧的睡眠，彷彿心靈也跟著跳動，讓我們感覺到生命的律動。",
            [],
            "2025-06-22T11:45:00"
          ]
        ]
      ]
    ]
  );


  await insert(
    "calico_cat",
    "春天的氣息總是讓人心情愉悅，對我們貓咪來說，更是充滿了探索與冒險的機會。當陽光灑進窗台，我喜歡靜靜地躺著，感受微風輕拂毛髮，那種溫柔的觸感彷彿在提醒我，生活中總有美好的細節值得珍惜。讓自己更加堅強與柔軟並存。這種柔軟不是軟弱，而是一種智慧，一種適應世界的能力。",
    "春天的思考",
    ["calico_cat", "orange_cat", "tabby", "cat", "tuxedo_cat"],
    "2025-06-24T09:00:00",
    [
      [
        "tabby",
        "calico_cat，你描述的春天真是生動又美麗。我也喜歡在陽光下伸展，感受暖暖的光線灑在身上的感覺。這種時刻總讓我覺得世界很大，但同時又很溫柔。",
        ["tuxedo_cat"],
        "2025-06-23T09:15:00",
        [
          [
            "calico_cat",
            "tabby，有你一起分享這份溫柔真好。春天的美好，更因有朋友而加倍。",
            [],
            "2025-06-23T09:20:00"
          ]
        ]
      ],
      [
        "orange_cat",
        "我覺得春天的風有時候很調皮，會把我的毛吹亂，讓我看起來像個小亂糟糟的孩子。不過這也是春天的魅力吧，有趣又充滿驚喜。",
        ["tuxedo_cat"],
        "2025-06-23T09:30:00",
        [
          [
            "black_cat",
            "orange_cat，風亂了毛，但也帶來了自由的感覺。我喜歡這種不完美的美，正是生活的真實面貌。",
            [],
            "2025-06-23T09:35:00"
          ]
        ]
      ],
      [
        "cat",
        "春天的雷雨讓我有點害怕，但我學會了找個安全的角落，靜靜觀察外面的世界變化。這讓我想到，生命中遇到困難時，也要學會暫時退一步，保護自己，等待風暴過去。",
        ["calico_cat", "orange_cat", "black_cat", "tabby"],
        "2025-06-23T09:50:00",
        [
          [
            "tuxedo_cat",
            "mackerel_tabby，你說得很對。生活的起伏是必然的，但我們可以選擇如何面對。安全感和勇氣同樣重要，願我們都能找到屬於自己的避風港。",
            ["tabby", "cat", "tuxedo_cat"],
            "2025-06-23T09:55:00"
          ]
        ]
      ],
      [
        "calico_cat",
        "謝謝大家的回應，讓這篇關於春天的思考更加豐富多彩。生活的美好，不正是因為有你們的陪伴和分享嗎？讓我們一起迎接更多季節的變化，活出最真實的自己。",
        ["calico_cat", "orange_cat", "black_cat", "tabby", "cat", "tuxedo_cat"],
        "2025-06-23T10:10:00"
      ]
    ]
  );

  await insert(
    "orange_cat",
    "吸塵器，這個看似平凡的家用電器，實際上蘊藏著無數的哲學思考與生活智慧。每當我看到它在地板上輕輕滑過，帶走那些細小的灰塵與毛髮，我不禁開始思考，清理與被清理之間，是否也存在著一種微妙的生命互動？我們貓咪的毛髮成了它工作的證據，也成了它存在的價值。然而，吸塵器的運作似乎也提醒著我們關於控制與被控制的課題。當那機器嗡嗡作響時，是不是象徵著我們生活中那些無形的規範和壓力。就像吸塵器必須持續運行才能維持清潔，我們是否也在無意識中，默默接受著周遭環境的各種牽引與限制。",
    "吸塵器",
    ["tabby", "cat", "tuxedo_cat"],
    "2025-06-25T10:00:00",
    [
      [
        "tuxedo_cat",
        "orange_cat，你的想法真讓人驚喜。吸塵器不只是清潔工具，更像是生活的隱喻，提醒我們既是被清理者，也是存在的見證者。",
        [],
        "2025-06-25T10:30:00",
        [
          [
            "orange_cat",
            "tuxedo_cat，對啊，這種雙重身份讓我覺得吸塵器像是生活的哲學家，無聲地揭示著我們的日常真相。",
            [],
            "2025-06-25T10:45:00"
          ]
        ]
      ],
      [
        "calico_cat",
        "我一直覺得吸塵器是我們的大敵，現在聽你這麼說，好像它也有溫柔的一面呢。它吸走的毛，正是我們的存在證明。",
        [],
        "2025-06-25T11:00:00",
        [
          [
            "orange_cat",
            "calico_cat，沒錯，我們和吸塵器的關係其實很微妙，是一種彼此依存的共生狀態。",
            [],
            "2025-06-25T11:15:00"
          ]
        ]
      ],
      [
        "black_cat",
        "每次吸塵器開動，我都會緊張得躲起來，原來背後有這麼多值得深思的意義，真是開了眼界。",
        [],
        "2025-06-25T11:30:00"
      ]
    ]
  );

  await insert(
    "tuxedo_cat",
    "有時我懷疑，那些停在窗外電線上的鳥，是不是其實在觀察我們？當我盯著牠們時，牠們也正凝視著我，那種靜默的凝視讓我意識到，我們並不是世界的中心，而只是這個複雜生命網絡中的一環。我們在室內觀察牠們的自由，牠們則在戶外注視我們的拘束。或許自由與限制的界線，不在窗框，而在於我們如何看待自己的位置。",
    "觀察哲學",
    ["black_cat", "tabby", "cat", "tuxedo_cat"],
    "2025-06-26T09:00:00",
    [
      [
        "calico_cat",
        "tuxedo_cat，我常常看著那隻胖鴿子發呆，牠總是不動聲色地看回來，彷彿在說：‘你也困在玻璃後嗎？’ 有時我覺得，我們都只是彼此的風景而已。",
        ["black_cat"],
        "2025-06-26T09:15:00"
      ],
      [
        "cat",
        "這讓我想到，被人類養著的我們，跟飛翔的鳥一樣，其實都不完全自由。只是選擇了不同的框架生活而已。",
        ["orange_cat"],
        "2025-06-26T09:30:00"
      ],
      [
        "orange_cat",
        "我其實想抓牠，但每次都是撲了個空。自由啊，真是讓人牙癢癢的東西。",
        ["tabby"],
        "2025-06-26T09:40:00"
      ]
    ]
  );

  await insert(
    "cat",
    "昨天我坐在紙箱裡三小時沒動，不是因為我累了，而是因為我想知道：什麼是完美的容器？紙箱的限制讓我感到安全，也讓我思考，自我是否也需要邊界。邊界不是束縛，而是一種提醒：在有限中，我們才能看見自己的形狀。正如一首樂曲需要停頓，生活也需要一點邊緣來反射出中心的聲音。",
    "邊界美學",
    ["orange_cat"],
    "2025-06-27T15:00:00",
    [
      [
        "black_cat",
        "mackerel_tabby，你讓我想起我那個破掉的購物袋，它已經裂開了，但我還是躲進去，因為它讓我覺得自己是世界唯一的居民。邊界，也許是我們與喧囂世界之間的最後屏障。",
        [],
        "2025-06-27T15:20:00"
      ],
      [
        "calico_cat",
        "其實，我覺得每一個紙箱都是一座臨時的神殿，我們在裡頭沉澱，與過多的外界訊號保持距離。對我來說，那是一種儀式。",
        ["orange_cat"],
        "2025-06-27T15:40:00"
      ],
      [
        "orange_cat",
        "你們會不會想過，如果紙箱是時間的隱喻，那我們是不是都在等待被重新封箱與運送的那一刻？",
        [],
        "2025-06-27T15:50:00"
      ]
    ]
  );


  await insert(
    "tabby",
    "深夜時分，我喜歡獨自坐在書架頂端，俯瞰整個客廳。那是一種奇特的角度，不只是視野上的優越感，更是一種暫時抽離日常的方式。當我不再參與，而是僅僅觀看，我彷彿能看見世界的本來面貌：人類的沉睡、空氣的震動、冷光燈的閃爍，像是時間靜止後留下的殘響。我們貓咪，有時是觀察者，而非參與者，在靜默中讀懂生活。",
    "觀看哲學",
    ["tabby", "cat"],
    "2025-06-28T00:30:00",
    [
      [
        "black_cat",
        "tabby，我懂你說的那種抽離感。我有時會坐在冰箱上，感覺就像站在宇宙的邊緣，看著生活像一齣戲一樣慢慢演。",
        ["tuxedo_cat"],
        "2025-06-28T00:45:00"
      ],
      [
        "tuxedo_cat",
        "這種觀看，有時候也讓我開始懷疑自己是否真的存在。或許我們只是夢的一部分，只是夢裡的一隻貓。",
        [],
        "2025-06-28T00:55:00"
      ],
      [
        "calico_cat",
        "觀察的力量是巨大的。當我們選擇不出聲、不打擾，只是靜靜看著，就已經在改變世界的輪廓了。",
        ["black_cat"],
        "2025-06-28T01:10:00"
      ]
    ]
  );

  await insert(
    "black_cat",
    "鏡子是一種危險的物品。每次我經過時，它都讓我懷疑：那真的是我嗎？還是某個平行宇宙的替身？牠和我做著同樣的動作，但眼神裡藏著我無法辨認的情緒。我不禁思考，認識自己，是不是其實不可能？因為我們所見的自己，總帶著反射的扭曲。我開始明白，真正的自我可能不存在於表面，而藏在那一瞬間我們對自己感到陌生的凝視之中。",
    "自我哲學",
    ["orange_cat", "tabby"],
    "2025-06-29T08:00:00",
    [
      [
        "calico_cat",
        "black_cat，我懂那種感覺。我每次對著鏡子哈氣，看著牠也哈氣，我都懷疑那是不是一場被設計好的同步幻覺。我們是不是活在一個被觀察的空間裡？",
        [],
        "2025-06-29T08:15:00"
      ],
      [
        "orange_cat",
        "所以我選擇不看鏡子。看太多，只會覺得自己哪邊毛亂了，然後陷入自我懷疑的深淵。還是當作牠是另一隻貓比較輕鬆。",
        [],
        "2025-06-29T08:25:00"
      ],
      [
        "tuxedo_cat",
        "我曾經跟鏡子裡的我打架。我輸了，因為我打的是我自己。這讓我體會到，對自我的攻擊終究是徒勞。",
        [],
        "2025-06-29T08:30:00"
      ]
    ]
  );

  await insert(
    "orange_cat",
    "人類每天吃三餐，規律又執著，彷彿那是一種宗教儀式。但我們貓呢？我們靠的是感覺。不是餓的時候才吃，而是當靈魂說『是時候了』，我們便去舔幾口碗裡的乾乾。這才是真正的存在主義，活在當下、餵食當下。不被鐘錶支配的我們，是時間的異教徒，在碗與飢餓之間自由漫步。",
    "時間與餵食",
    ["orange_cat", "cat"],
    "2025-06-29T12:00:00",
    [
      [
        "cat",
        "orange_cat，你的話讓我思考，我是不是也應該對每一口乾乾感到敬畏？因為那不是食物，而是靈魂的接觸點。",
        [],
        "2025-06-29T12:20:00"
      ],
      [
        "tabby",
        "這就是為什麼我從不吃完一整碗。我只挑幾粒，留下餘地，讓飢餓與滿足之間保持神聖的空隙。",
        [],
        "2025-06-29T12:40:00"
      ],
      [
        "black_cat",
        "你們說得都太溫柔了。我只是覺得人類餵太少。乾乾是象徵沒錯，但象徵最好能多一點。",
        ["tabby"],
        "2025-06-29T12:55:00"
      ]
    ]
  );

  await insert(
    "cat",
    "為什麼每次我一坐在人類的鍵盤上，他們就像發現新大陸一樣大驚小怪？我懷疑，那不是因為我擋住了螢幕，而是我踩進了他們語言的世界，破壞了他們用來維繫秩序的象徵系統。鍵盤，是人類邏輯的結晶，而我，正以我的存在將其打亂。這不是破壞，而是一種重構，一種來自毛茸茸世界的語意重置。",
    "語言與破壞",
    ["calico_cat", "orange_cat", "black_cat", "tabby", "cat", "tuxedo_cat"],
    "2025-06-30T14:00:00",
    [
      [
        "tabby",
        "cat，我也踩過鍵盤，但我從未想過，那可能是對語言暴政的反擊。或許我們應該組織一場『鍵盤解放運動』？",
        ["calico_cat", "black_cat", "tabby", "tuxedo_cat"],
        "2025-06-30T14:20:00",
        [
          [
            "cat",
            "說實話，我單純覺得鍵盤暖暖的，很好睡。但現在你們這麼一說，我開始懷疑，是不是我每次睡著時，其實也在無意中顛覆了人類的通訊體系。那我豈不是一位躺著也在搞革命的哲貓？",
            ["calico_cat", "orange_cat", "cat", "tuxedo_cat"],
            "2025-06-30T14:50:00",
            [
              [
                "tabby",
                "你這麼一說，我突然覺得我每天躺在打印機上也不只是因為震動舒服——說不定我正阻止資本主義文件的流通？我們根本是無聲的地下組織成員！",
                ["calico_cat", "orange_cat", "cat", "tuxedo_cat"],
                "2025-06-30T14:55:00"
              ]
            ]
          ],
          [
            "calico_cat",
            "原來如此！難怪我每次趴在Wi-Fi機上，人類的網路就會變慢。看來我們不是在睡覺，是在進行資訊抗爭。下一步，是不是該佔領路由器了？",
            ["calico_cat", "tabby"],
            "2025-07-27T05:20:00"
          ]
        ]
      ],
      [
        "tabby",
        "人類總是追求有意義的輸入，而我們的亂碼正是對這種意義崇拜的質疑。我每次打出一長串‘asdfgh’都覺得自己像個行為藝術家。",
        ["calico_cat", "tabby"],
        "2025-06-30T14:35:00"
      ],
      [
        "tuxedo_cat",
        "這也說明為什麼他們害怕我們的踏入。因為我們的無序，是對他們控制幻想的終極挑戰。",
        [],
        "2025-06-30T14:50:00"
      ],
      [
        "calico_cat",
        "你們不覺得鍵盤其實是暖的嗎？我不是為了反抗語言，是為了追求溫度。我每次都在發熱鍵上小睡一會，這樣的抗爭才有溫度。",
        [],
        "2025-06-30T15:05:00"
      ],
      [
        "orange_cat",
        "我才剛學會走路就踩過鍵盤，結果不小心寄了一封信給人類的老闆。那天我聽到很多高頻率尖叫聲。我想，我正式進入了語言戰場。",
        ["calico_cat"],
        "2025-06-30T15:18:00"
      ],
      [
        "tabby",
        "其實我更偏好把鍵帽咬下來。拆解語言的載體，才能徹底瓦解他們的認知基礎。不要只踩，要拆，才是真正的顛覆。",
        ["tuxedo_cat"],
        "2025-06-30T15:33:00"
      ]
    ]
  );

  process.on("SIGINT", async () => {
      await closeDB();
      console.log("Process end! Bye!");
      process.exit(0);
  });

  }

main();

class UserData {
  constructor({userId = null, name, mail, password, nameZH, introduction, notifications = [], createdAt = new Date()}) {
    this._id = userId ? new ObjectId(userId) : new ObjectId();
    this.name = name;
    this.mail = mail;
    this.password = password;
    this.nameZH = nameZH;
    this.introduction = introduction;
    this.notifications = notifications;
    this.createdAt = createdAt;
  }
}

class PostData {
  constructor({postId = null, author, content, tag = null, likes = [], commentsNum = 0, createdAt = new Date()}) {
    this._id = postId ? new ObjectId(postId) : new ObjectId();
    this.postId = this._id.toString();
    this.commentId = this.postId;
    this.parentId = this.postId;
    this.author = author;
    this.content = content;
    this.tag = tag;
    this.likes = likes;
    this.like = false;
    this.commentsNum = commentsNum;
    this.createdAt = createdAt instanceof Date ? createdAt : new Date(createdAt);
  }
}

class CommentData {
  constructor({postId = null, commentId = null, parentId = null, author = null, content = null, likes = [], commentsNum = 0, commentCreatedAt = new Date()}) {
    this._id = commentId ? new ObjectId(commentId) : new ObjectId();
    this.postId = postId;
    this.commentId = this._id.toString();
    this.parentId = parentId;
    this.author = author;
    this.content = content;
    this.likes = likes;
    this.commentsNum = commentsNum;
    this.createdAt = commentCreatedAt instanceof Date ? commentCreatedAt : new Date(commentCreatedAt);
  }
}

class NotificationData {
  constructor({postId, commentId, parentId, author, content, parentContent}) {
    this.postId = postId;
    this.commentId = commentId;
    this.parentId = parentId;
    this.hisAuthor = author;
    this.hisContent = content;
    this.yourContent = parentContent;
  }
}

async function insertUserData(name, mail, password, nameZH, introduction, likes, createdAt) {
  const userData = new UserData({name, mail, password, nameZH, introduction, likes});
  const result = await coll_user.insertOne(userData);
  console.log("Inserted userData with ID:", userData._id);
  return userData._id;
}

async function insert(author, content, tag, likes, createdAt, comments) {
  let commentsNum = 0;
  const post = new PostData({author, content, tag, likes, createdAt});
  
  if(comments.length > 0) commentsNum = await insertComments(post.postId, comments, post.postId, author, content);
  post.commentsNum = commentsNum;

  const result = await coll_post.insertOne(post);
  console.log("Inserted post with ID:", post._id);
  return post._id;
}

async function addNotifications(postId, commentId, parentId, author, content, parentAuthor, parentContent) {
  const notification = new NotificationData({postId, commentId, parentId, author, content, parentContent});
  await coll_user.updateOne({name: parentAuthor}, {$push: {notifications: {$each: [notification], $position: 0, $slice: 20 }}});

}

async function insertComments(postId, comments, parentId, parentAuthor, parentContent) {
  let commentsNumSum = 0;
  let commentsNum = 0;
  const commentsInserted = [];
  for (comment of comments) {
    const [author, content, likes, commentCreatedAt, subComments] = comment;
    const commentInserted = new CommentData({postId, parentId, author, content, likes, commentCreatedAt});
    const commentId = commentInserted._id.toString();
    console.log("Inserted comment with ID:", commentInserted._id);

    addNotifications(postId, commentId, parentId, author, content, parentAuthor, parentContent);

    commentsNum = 0;
    commentsNumSum++;
    if(subComments) {
      commentsNum = await insertComments(postId, subComments, commentId, author, content);
      commentsNumSum = commentsNumSum + commentsNum
    }

    commentInserted.commentsNum = commentsNum;
    commentsInserted.push(commentInserted);
  }

  if (commentsInserted.length > 0) {
    await coll_comment.insertMany(commentsInserted);
  }
  return commentsNumSum;
}