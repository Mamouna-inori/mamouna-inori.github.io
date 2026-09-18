# まもうなのLCD再現ギャラリー (Mamouna LCD Gallery)

PowerPointだけで本物の通勤電車車内案内表示器（車内LCD / トレインビジョン）を再現するクリエイター「まもうな」の作品図録・ポートフォリオサイトです。

AI生成特有の画一的なデザイン（派手なグラデーションや浮遊する円など）を徹底的に排除し、本物の通勤電車の車内案内装置・トレインビジョンや鉄道図録の設計思想に基づいたリアルで緻密なUI/UXを実現しています。

---

## 主な特徴

- **車内LCDベゼル & スクリーン**:
  - 実車の車内LCDモニターのようなマットブラックベゼル、四隅の固定ボルト、ステータスランプ、反射スキャンラインを再現。
  - 画像ファイルが未配置の場合でも、路線別（JR・小田急・東急・相鉄・メトロ）のカラーバーや種別幕、次駅ナンバリングなどを備えた高精細LCDベクター画面を即席生成して表示。
- **直感的なフィルタ & 検索**:
  - 駅の種別幕（ロールサイン）を模したフィルタチップ（媒体・路線・メーカー別）。
  - インクリメンタル検索とソート（新しい順 / 路線順）。
  - URLクエリパラメータとの同期（`?type=video&line=odakyu` などで状態を復元・シェア可能）。
- **リアルな作品詳細ページ**:
  - 全画面ライトボックス（キーボードの `Esc` で閉じる、`←` `→` キーで前後の作品へ移動可能）。
  - 車両スペック表、本人の観察眼が光るこだわり解説文、外部リンク（X、YouTube、Freedom Train）。
  - 路線やメーカーに基づく関連作品レコメンド。
- **鉄道ギミック**:
  - 固定ヘッダー下の細い路線図ステータスバー（現在滞在しているページの駅ランプが点灯）。
  - 車内LEDテロップ（新着・注目作品が流れる電光掲示板）。
  - 駅名標スタイルのSNSリンク集 & 車内マナー案内風の二次利用規約。

---

## 開発と実行方法

### 1. ローカル開発（Node.js / Vite をお持ちの場合）

```bash
# 依存パッケージのインストール
npm install

# 開発用サーバー起動（ホットリロード対応）
npm run dev

# プロダクションビルド
npm run build

# 静的詳細ページ（works/*.html）の一括再生成
npm run generate
```

### 2. ローカルプレビュー（Python をお使いの場合）

当プロジェクトは純粋なバニラHTML/CSS/JS（ES Modules）で記述されているため、Pythonの簡易サーバーでもそのまま即時動作します。

```bash
# ローカルHTTPサーバーの起動
py -m http.server 8000
# または
python -m http.server 8000

# ブラウザで開く
http://localhost:8000
```

### 3. GitHub Pages へのデプロイ

リポジトリルートに静的ファイルが配置されているため、GitHubにプッシュするだけでGitHub Pages（CNAME: `mamouna.net`）にて直ちに完全動作します。ビルドステップは不要です。

---

## 画像の足し方（後工程）

作品のスクリーンショット画像を差し替える手順は以下の通りです：

1. X (Twitter) や Freedom Train 記事から、再現作品のスクリーンショット画像（PNG, JPG, SVG, WebP等）を保存します。
2. 保存した画像を `public/works/` ディレクトリに配置します。
   - 例: `public/works/e233-2000-1.png`
3. `js/works.js` を開き、該当する作品オブジェクトの `images` 配列にファイル名を指定します。
   ```javascript
   images: ["e233-2000-1.png"],
   ```
4. ブラウザを更新すると、プレースホルダーから実画像に切り替わります。

---

## 作品を追加する手順

新しいLCD再現作品や動画、記事を追加する手順です：

### ステップ 1: `js/works.js` に作品オブジェクトを追加

`js/works.js` の `works` 配列に、新しいオブジェクトを追加します。

```javascript
{
  slug: "e231-500-yamanote", // URLの一部となる一意のID
  title: "E231系500番台 初代トレインビジョン",
  subtitle: "山手線 外回り",
  type: "still", // "still"（静止画） | "video"（動画） | "article"（記事） | "book"（同人誌）
  operator: "JR東日本",
  train: "E231系500番台",
  lines: ["JR"],
  maker: "三菱", // フィルタ用（"三菱" | "日立" | "交通電業社" | "まもうな" など）
  makerDetail: "三菱（初期トレインビジョン）",
  ratio: "15インチ 4:3",
  animation: "あり（矢印点滅）",
  year: 2026,
  featured: true,
  excerpt: "4:3比率の懐かしい初期型トレインビジョン。緑の帯とカクカクした矢印表示。",
  body: "山手線に初めて導入された初期型トレインビジョンの画面構成を徹底再現。当時のフォントのジャギー感や、次駅案内の独特なアニメーションを再現しています。",
  images: ["e231-500-1.svg"], // public/works/ 配下の画像名
  links: {
    x: "https://x.com/Mamouna_inori",
    youtube: "https://www.youtube.com/@Mamouna_Inori",
    article: "https://freedomtrain.jp/"
  },
  // 画像未配置時に自動生成される高精細LCDモックの設定
  lcdDesign: {
    lineColor: "#008000",
    lineName: "山手線 外回り",
    typeBadge: "各駅停車",
    typeColor: "#008000",
    destination: "東京・上野方面",
    destinationEn: "Tokyo & Ueno",
    nextStation: "新宿",
    nextStationEn: "Shinjuku",
    stationNumber: "JY 17",
    doorSide: "左側が開きます / Door opens on left",
    carNumber: "10号車",
    aspectRatio: "4:3"
  }
}
```

### ステップ 2: 静的詳細ページを生成

以下のコマンドのいずれかを実行すると、`works/[slug].html` が自動生成されます：

```bash
# Pythonの場合
py scripts/generate_pages.py

# Node.jsの場合
npm run generate
```

これで一覧画面、検索・フィルタ、詳細ページ、関連作品レコメンドのすべてに新作品が自動反映されます。

---

## ディレクトリ構成

```
.
├── index.html                  # ギャラリーTOP
├── about.html                  # プロフィール・自己紹介
├── book.html                   # 同人誌特設ページ
├── links.html                  # 駅名標スタイルSNSハブ・二次利用規約
├── works/                      # 作品詳細静的ページディレクトリ
│   ├── index.html              # 一覧リダイレクト / フォールバック
│   ├── e233-2000-mato7.html    # 作品詳細ページ (全10件)
│   └── ...
├── css/
│   ├── style.css               # 共通リセット、ヘッダー、路線図バー、フッター
│   ├── lcd.css                 # LCDベゼル筐体、LCDヒーロー、スクリーン効果
│   └── components.css          # 種別幕フィルタ、スペックパネル、ライトボックス
├── js/
│   ├── works.js                # 作品データ集約モジュール
│   ├── lcd-generator.js        # 路線別リアル車内LCDベクター生成器
│   ├── main.js                 # TOP検索・フィルタ・URLパラメータ制御
│   └── detail.js               # 詳細ページ制御・ライトボックス・キーボード操作
├── public/
│   └── works/                  # スクリーンショット画像配置ディレクトリ
├── scripts/
│   ├── generate_pages.py       # 詳細静的HTML生成スクリプト (Python版)
│   └── generate-pages.js       # 詳細静的HTML生成スクリプト (Node.js版)
├── package.json
├── vite.config.js
├── CNAME                       # mamouna.net
└── README.md
```

---

## ライセンス / 著作権

© まもうな (@Mamouna_inori) / Mamouna LCD Gallery  
無断転載・再配布・類似動画への音声流用は原則禁止です。
二次利用に関する詳細は [LINKS ページのガイドライン](links.html) をご確認ください。
