/**
 * まもうなのLCD再現ギャラリー 作品データ定義
 * PowerPointで再現された車内LCD（トレインビジョン）図録データ
 */

export const works = [
  {
    slug: "e233-2000-mato7",
    title: "E233系2000番台 マト7編成の「新」LCD",
    subtitle: "常磐線各駅停車 / 千代田線 / 小田急",
    type: "still", // still | video | article | book
    operator: "JR東日本",
    train: "E233系2000番台 マト7編成",
    lines: ["JR", "メトロ", "小田急"],
    maker: "日立",
    makerDetail: "日立（後期）",
    ratio: "17インチ 16:9",
    animation: "あり（ドア開扉方向案内）",
    year: 2026,
    featured: true,
    excerpt: "日立後期のUD新ゴと、旧来の新ゴが共存している。パッと見では気づかないフォント沼。",
    body: "まもうなのLCD再現ギャラリー第1弾。機器更新および表示改修後の松戸車両センター所属マト7編成を再現。日立後期型特有のUD新ゴ表示と、一部に残る旧来の新ゴ表示の混在バランスをスライド上で極限までトレース。矢印アイコンの角度や、駅ナンバリング枠の1pxの余白までこだわり抜いた至極のパワポ再現です。",
    images: ["e233-2000-1.svg"],
    links: {
      article: "https://freedomtrain.jp/mamouna_owo/48152/",
      x: "https://x.com/Mamouna_inori"
    },
    lcdDesign: {
      lineColor: "#008000",
      lineName: "常磐線各駅停車",
      typeBadge: "各駅停車",
      typeColor: "#008000",
      destination: "取手",
      destinationEn: "Toride",
      nextStation: "北千住",
      nextStationEn: "Kita-Senju",
      stationNumber: "JL 19",
      doorSide: "左側が開きます / Door opens on left",
      carNumber: "4号車",
      aspectRatio: "16:9"
    }
  },
  {
    slug: "e233-7000",
    title: "E233系7000番台 LCD",
    subtitle: "埼京線・川越線 / 相鉄・JR直通線",
    type: "still",
    operator: "JR東日本",
    train: "E233系7000番台",
    lines: ["JR", "相鉄"],
    maker: "三菱",
    makerDetail: "三菱（後期）",
    ratio: "15インチ 5:3（15:9）",
    animation: "あり（2段スクロール・乗換案内）",
    year: 2025,
    featured: false,
    excerpt: "三菱後期特有のゆったりしたアニメーションと5:3比率の絶妙なレイアウトバランス。",
    body: "埼京線・相鉄直通対応に伴う表示変更後のE233系7000番台。横長16:9ではなく懐かしさと独特の凝縮感がある15インチ5:3比率の画面レイアウトを完全再現。相鉄線内の案内フォーマットとJR線内フォーマットの差異、乗り換え案内時のドットマトリクス風アイコンの配置まで徹底的に検証・再現しています。",
    images: ["e233-7000-1.svg"],
    links: {
      article: "https://freedomtrain.jp/mamouna_owo/48334/",
      x: "https://x.com/Mamouna_inori"
    },
    lcdDesign: {
      lineColor: "#007A3D",
      lineName: "埼京線・相鉄直通線",
      typeBadge: "各駅停車",
      typeColor: "#007A3D",
      destination: "海老名",
      destinationEn: "Ebina",
      nextStation: "武蔵小杉",
      nextStationEn: "Musashi-Kosugi",
      stationNumber: "JS 15",
      doorSide: "右側が開きます / Door opens on right",
      carNumber: "7号車",
      aspectRatio: "5:3"
    }
  },
  {
    slug: "e235-1000",
    title: "E235系1000番台 LCD",
    subtitle: "横須賀・総武快速線",
    type: "still",
    operator: "JR東日本",
    train: "E235系1000番台",
    lines: ["JR"],
    maker: "日立",
    makerDetail: "日立（次世代立体構内図型）",
    ratio: "21.5インチ 16:9",
    animation: "あり（号車案内・立体フロアマップ）",
    year: 2026,
    featured: true,
    excerpt: "まるでゲーム画面のような立体構内図と超高精細レイアウト。パワポの図形結合の限界に挑む。",
    body: "横須賀・総武快速線に導入された次世代大型21.5インチLCD。東京駅や錦糸町駅の複雑極まる地下駅構内図が、まるでクォータービューのシミュレーションゲームのように立体的に描画される圧巻の画面。すべてPowerPointの「頂点の編集」と「図形の結合」のみで描き起こされた、作者の情熱と狂気が宿る代表作です。",
    images: ["e235-1000-1.svg"],
    links: {
      article: "https://freedomtrain.jp/",
      x: "https://x.com/Mamouna_inori"
    },
    lcdDesign: {
      lineColor: "#002B66",
      lineName: "横須賀・総武快速線",
      typeBadge: "普通",
      typeColor: "#002B66",
      destination: "逗子",
      destinationEn: "Zushi",
      nextStation: "品川",
      nextStationEn: "Shinagawa",
      stationNumber: "JO 17",
      doorSide: "左側が開きます / Door opens on left",
      carNumber: "11号車",
      aspectRatio: "16:9"
    }
  },
  {
    slug: "tokyo-metro-13000",
    title: "東京メトロ13000系 3画面ワイドLCD",
    subtitle: "日比谷線・東武スカイツリーライン直通",
    type: "still",
    operator: "東京メトロ",
    train: "13000系",
    lines: ["メトロ", "東武"],
    maker: "三菱",
    makerDetail: "三菱（3画面トレインビジョン）",
    ratio: "17インチ 16:9 × 3画面",
    animation: "あり（3画面シームレス連携）",
    year: 2026,
    featured: false,
    excerpt: "扉上に並ぶ圧巻の3画面LCD。日比谷線独特の洗練されたシルバー基調グラフィック。",
    body: "ドア上に贅沢に3面並んだ東京メトロ日比谷線13000系の案内装置。右側の走行位置・乗換案内、中央の運行情報・号車詳細、左側の広告用画面が美しく連動するレイアウトを再現。メトロ独特の視認性の高いピクトグラムや細身のフォントチョイス、グラデーションの質感まで忠実にパワポ化しています。",
    images: ["tokyo-metro-13000-1.svg"],
    links: {
      article: "https://freedomtrain.jp/",
      x: "https://x.com/Mamouna_inori"
    },
    lcdDesign: {
      lineColor: "#A69DA1",
      lineName: "日比谷線 直通",
      typeBadge: "普通",
      typeColor: "#555555",
      destination: "中目黒",
      destinationEn: "Naka-meguro",
      nextStation: "六本木",
      nextStationEn: "Roppongi",
      stationNumber: "H 04",
      doorSide: "右側が開きます / Door opens on right",
      carNumber: "3号車",
      aspectRatio: "16:9"
    }
  },
  {
    slug: "sotetsu-yokohama-sync",
    title: "相鉄線 横浜ゆき 全区間放送＋LCD同期ズレ再現",
    subtitle: "相鉄本線 各停 横浜ゆき",
    type: "video",
    operator: "相模鉄道",
    train: "12000系 / 20000系",
    lines: ["相鉄"],
    maker: "交通電業社",
    makerDetail: "交通電業社 / 日立系",
    ratio: "17インチ 16:9",
    animation: "あり（実車放送完全同期＋ズレ再現）",
    year: 2025,
    featured: true,
    excerpt: "自動放送チャイムとLCD切り替えがコンマ数秒ズレる「あの実車のクセ」まで完全再現。",
    body: "相鉄の洗練されたネイビーブルーの案内画面。本作品の真骨頂はグラフィックの美しさだけでなく、実車収録した自動アナウンス音源に対して、画面切り替えアニメーションの開始タイミングが「コンマ数秒微妙に遅れてやってくる」実車の挙動・同期ズレまでも再現している点にあります。PowerPointのアニメーション遅延時間を0.05秒単位で調整した狂気の動画です。",
    images: ["sotetsu-yokohama-1.svg"],
    links: {
      youtube: "https://www.youtube.com/@Mamouna_Inori",
      x: "https://x.com/Mamouna_inori"
    },
    lcdDesign: {
      lineColor: "#1C3B6C",
      lineName: "相鉄本線",
      typeBadge: "各駅停車",
      typeColor: "#1C3B6C",
      destination: "横浜",
      destinationEn: "Yokohama",
      nextStation: "二俣川",
      nextStationEn: "Futamatagawa",
      stationNumber: "SO 05",
      doorSide: "左側が開きます / Door opens on left",
      carNumber: "10号車",
      aspectRatio: "16:9"
    }
  },
  {
    slug: "odakyu-hon-atsugi",
    title: "小田急小田原線 急行 本厚木ゆき 車内放送＋LCD",
    subtitle: "新宿〜本厚木 全区間完全再現",
    type: "video",
    operator: "小田急電鉄",
    train: "3000形 / 4000形",
    lines: ["小田急"],
    maker: "三菱",
    makerDetail: "小田急TV（三菱電機）",
    ratio: "17インチ 16:9",
    animation: "あり（全区間フルアニメーション走行）",
    year: 2025,
    featured: true,
    excerpt: "小田急特有の青白グラデーションと独特な駅ナンバリング表示。新宿発車から終点までの旅。",
    body: "地元・小田急電鉄の急行本厚木ゆきを全区間フル尺で制作。小田急特有の澄んだスカイブルーグラデーション、代々木上原での千代田線乗り換え表示、登戸や町田での緩急接続案内など、沿線住民ならではの解像度で完璧に再現。YouTube公開中の大人気動画です。",
    images: ["odakyu-hon-atsugi-1.svg"],
    links: {
      youtube: "https://www.youtube.com/watch?v=zcoL4yaIPhw",
      x: "https://x.com/Mamouna_inori"
    },
    lcdDesign: {
      lineColor: "#E65520",
      lineName: "小田急小田原線",
      typeBadge: "急行",
      typeColor: "#E65520",
      destination: "本厚木",
      destinationEn: "Hon-Atsugi",
      nextStation: "登戸",
      nextStationEn: "Noborito",
      stationNumber: "OH 18",
      doorSide: "右側が開きます / Door opens on right",
      carNumber: "5号車",
      aspectRatio: "16:9"
    }
  },
  {
    slug: "powerpoint-talent",
    title: "バズり動画「怖いか？私のパワポの才能が」",
    subtitle: "PowerPoint限界突破シリーズ",
    type: "video",
    operator: "JR / 私鉄各線",
    train: "各種通勤型電車",
    lines: ["JR", "小田急", "東急"],
    maker: "まもうな",
    makerDetail: "自作PowerPointアニメーション",
    ratio: "16:9",
    animation: "あり（アニメーションウィンドウ1000行超）",
    year: 2025,
    featured: true,
    excerpt: "「プレゼンソフトで何やってんの？」Xで数万いいねを獲得した、パワポだけで動く実物級LCD。",
    body: "「PowerPointはただのスライド資料作成ツールではない、最強の2Dモーショングラフィックスエンジンである」ことを世に知らしめた話題作。複雑に絡み合うアニメーションタイミング、図形パスの緻密な配置、スライドショー再生時に一切カクつかない最適化など、パワポ芸の極致がここに凝縮されています。",
    images: ["powerpoint-talent-1.svg"],
    links: {
      x: "https://x.com/Mamouna_inori",
      youtube: "https://www.youtube.com/@Mamouna_Inori"
    },
    lcdDesign: {
      lineColor: "#FFC14A",
      lineName: "PowerPoint限界突破線",
      typeBadge: "快速急行",
      typeColor: "#FF5500",
      destination: "パワポの極地",
      destinationEn: "PPT Mastery",
      nextStation: "才能開花",
      nextStationEn: "Genius Next",
      stationNumber: "PT 01",
      doorSide: "両側が開きます / Both doors open",
      carNumber: "1号車",
      aspectRatio: "16:9"
    }
  },
  {
    slug: "doujin-book-vol1",
    title: "同人誌『PowerPointではじめる車内LCD再現』",
    subtitle: "コミックマーケット C106 / C108 頒布作品",
    type: "book",
    operator: "まもうな工房",
    train: "車内案内表示器全般",
    lines: ["JR", "小田急", "メトロ", "東急", "相鉄"],
    maker: "まもうな",
    makerDetail: "技術同人誌（B5判 フルカラー）",
    ratio: "B5判 書籍",
    animation: "なし（解説・図解・Tips集）",
    year: 2025,
    featured: true,
    excerpt: "初心者でも作れる！グリッド設定からフォント選定、図形結合の裏技、同期の極意まで網羅。",
    body: "「どうやってパワポでLCDを作っているのか？」という疑問にすべて答える技術同人誌。基本のキャンバス比率設定から、UD新ゴ等のフォント選び、ドット再現の手順、実車取材のポイント、そしてアニメーションの滑らかなタイミング設定までをフルカラーで詳細解説。即売会で大反響を呼んだ一冊。",
    images: ["doujin-book-1.svg"],
    links: {
      article: "https://freedomtrain.jp/",
      x: "https://x.com/Mamouna_inori"
    },
    lcdDesign: {
      lineColor: "#1A3A8A",
      lineName: "同人技術書案内",
      typeBadge: "特製教本",
      typeColor: "#1A3A8A",
      destination: "即売会会場",
      destinationEn: "Comic Market",
      nextStation: "東京ビッグサイト",
      nextStationEn: "Tokyo Big Sight",
      stationNumber: "BK 106",
      doorSide: "ブースにて頒布中 / Now on sale",
      carNumber: "B5版",
      aspectRatio: "16:9"
    }
  },
  {
    slug: "powerpoint-strongest",
    title: "記事「PowerPointは最強トレインビジョン再現ソフト」",
    subtitle: "Freedom Train 寄稿記事",
    type: "article",
    operator: "Freedom Train",
    train: "トレインビジョン全般",
    lines: ["JR", "小田急", "東急"],
    maker: "まもうな",
    makerDetail: "Web技術解説記事",
    ratio: "Web記事",
    animation: "なし",
    year: 2024,
    featured: false,
    excerpt: "なぜIllustratorやAfter Effectsではなくパワポなのか？軽量性・スナップ機能の強みを熱弁。",
    body: "鉄道メディア「Freedom Train」に寄稿した解説記事。Illustratorなどの高価なプロ用ツールを使わず、学生でも身近なPowerPointがなぜ車内LCD再現において圧倒的な操作性とグリッド吸着力を発揮するのかを論理的に紐解きます。多くの再現鉄クリエイターを刺激した必読記事です。",
    images: ["powerpoint-strongest-1.svg"],
    links: {
      article: "https://freedomtrain.jp/mamouna_owo/5425/",
      x: "https://x.com/Mamouna_inori"
    },
    lcdDesign: {
      lineColor: "#2A78C5",
      lineName: "Freedom Train 連載",
      typeBadge: "技術寄稿",
      typeColor: "#2A78C5",
      destination: "読者のみなさま",
      destinationEn: "Dear Readers",
      nextStation: "再現の深淵",
      nextStationEn: "Deep Obsession",
      stationNumber: "FT 54",
      doorSide: "記事全文公開中 / Read Article",
      carNumber: "Web",
      aspectRatio: "16:9"
    }
  },
  {
    slug: "school-guidance-lcd",
    title: "学校ガイダンス資料のLCD化",
    subtitle: "高校の提出スライドを本気でトレインビジョン風にした結果",
    type: "still",
    operator: "学校・日常",
    train: "高校生日常系LCD",
    lines: ["小田急", "JR"],
    maker: "まもうな",
    makerDetail: "自作TIMS / パワポ",
    ratio: "16:9",
    animation: "なし（静止画スライド）",
    year: 2025,
    featured: false,
    excerpt: "「学校のガイダンス資料でLCDベースに作ってる人、多分世界に私だけ」",
    body: "高校のオリエンテーション発表資料で本領を発揮してしまった一作。種別欄を「通常授業」、行先を「進路指導室」、次駅表示を「次の提出物」に仕立て上げ、完璧な車内案内表示器のレイアウトで学業連絡を行ったところ、教室と教卓が静まり返ったというエピソードを持つ伝説のスライドです。",
    images: ["school-guidance-1.svg"],
    links: {
      x: "https://x.com/Mamouna_inori"
    },
    lcdDesign: {
      lineColor: "#808285",
      lineName: "学業ガイダンス線",
      typeBadge: "通常授業",
      typeColor: "#E65520",
      destination: "進路指導室",
      destinationEn: "Career Office",
      nextStation: "課題提出日",
      nextStationEn: "Assignment Due",
      stationNumber: "SCH 01",
      doorSide: "職員室側が開きます / Doors to Staff Room",
      carNumber: "2年B組",
      aspectRatio: "16:9"
    }
  }
];

export function getWorkBySlug(slug) {
  return works.find(w => w.slug === slug) || null;
}

export function getRelatedWorks(work, limit = 3) {
  return works
    .filter(w => w.slug !== work.slug)
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.maker === work.maker) scoreA += 2;
      if (b.maker === work.maker) scoreB += 2;
      const commonA = a.lines.filter(line => work.lines.includes(line)).length;
      const commonB = b.lines.filter(line => work.lines.includes(line)).length;
      scoreA += commonA;
      scoreB += commonB;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}
