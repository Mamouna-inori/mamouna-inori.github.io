# まもうな 個人サイト

PowerPointで車内LCD（トレインビジョン）を再現するクリエイター「まもうな」の個人サイトです。

---

## 構成

- **プロフィール**: 自己紹介、SNSリンク（YouTube, X, Freedom Train, Mail）
- **YouTube 最新動画**: 公式チャンネル（`@Mamouna_Inori`）から最新の動画を自動取得して表示
- **記事一覧**: [Freedom Train 著者ページ](https://freedomtrain.jp/author/mamouna_owo/) の執筆記事一覧とサムネイルを表示
- **同人誌**: 『PowerPointではじめる車内LCD再現』（C106 / C108）の紹介
- **連絡先 & ガイドライン**: お問い合わせ先、二次利用のルール

---

## 開発と実行

静的HTML/CSS/JavaScriptで動作するため、Pythonの簡易サーバー等ですぐにプレビュー可能です：

```bash
py -m http.server 8000
```

GitHub Pages（CNAME: `mamouna.net`）にてそのまま配信されます。

---

## 記事データの更新方法

Freedom Trainで新しい記事を公開した際は、以下のスクリプトを実行することで `js/articles.js` が更新されます：

```bash
py scripts/extract_articles.py
```
