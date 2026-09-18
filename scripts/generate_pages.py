import os
import json

# 作品データ定義
WORKS = [
  {
    "slug": "e233-2000-mato7",
    "title": "E233系2000番台 マト7編成の「新」LCD",
    "subtitle": "常磐線各駅停車 / 千代田線 / 小田急",
    "type": "still",
    "operator": "JR東日本",
    "train": "E233系2000番台 マト7編成",
    "lines": ["JR", "メトロ", "小田急"],
    "maker": "日立",
    "makerDetail": "日立（後期）",
    "ratio": "17インチ 16:9",
    "animation": "あり（ドア開扉方向案内）",
    "year": 2026,
    "featured": True,
    "excerpt": "日立後期のUD新ゴと、旧来の新ゴが共存している。パッと見では気づかないフォント沼。",
    "body": "まもうなのLCD再現ギャラリー第1弾。機器更新および表示改修後の松戸車両センター所属マト7編成を再現。日立後期型特有のUD新ゴ表示と、一部に残る旧来の新ゴ表示の混在バランスをスライド上で極限までトレース。矢印アイコンの角度や、駅ナンバリング枠の1pxの余白までこだわり抜いた至極のパワポ再現です。",
    "images": ["e233-2000-1.svg"],
    "links": {
      "article": "https://freedomtrain.jp/mamouna_owo/48152/",
      "x": "https://x.com/Mamouna_inori"
    }
  },
  {
    "slug": "e233-7000",
    "title": "E233系7000番台 LCD",
    "subtitle": "埼京線・川越線 / 相鉄・JR直通線",
    "type": "still",
    "operator": "JR東日本",
    "train": "E233系7000番台",
    "lines": ["JR", "相鉄"],
    "maker": "三菱",
    "makerDetail": "三菱（後期）",
    "ratio": "15インチ 5:3（15:9）",
    "animation": "あり（2段スクロール・乗換案内）",
    "year": 2025,
    "featured": False,
    "excerpt": "三菱後期特有のゆったりしたアニメーションと5:3比率の絶妙なレイアウトバランス。",
    "body": "埼京線・相鉄直通対応に伴う表示変更後のE233系7000番台。横長16:9ではなく懐かしさと独特の凝縮感がある15インチ5:3比率の画面レイアウトを完全再現。相鉄線内の案内フォーマットとJR線内フォーマットの差異、乗り換え案内時のドットマトリクス風アイコンの配置まで徹底的に検証・再現しています。",
    "images": ["e233-7000-1.svg"],
    "links": {
      "article": "https://freedomtrain.jp/mamouna_owo/48334/",
      "x": "https://x.com/Mamouna_inori"
    }
  },
  {
    "slug": "e235-1000",
    "title": "E235系1000番台 LCD",
    "subtitle": "横須賀・総武快速線",
    "type": "still",
    "operator": "JR東日本",
    "train": "E235系1000番台",
    "lines": ["JR"],
    "maker": "日立",
    "makerDetail": "日立（次世代立体構内図型）",
    "ratio": "21.5インチ 16:9",
    "animation": "あり（号車案内・立体フロアマップ）",
    "year": 2026,
    "featured": True,
    "excerpt": "まるでゲーム画面のような立体構内図と超高精細レイアウト。パワポの図形結合の限界に挑む。",
    "body": "横須賀・総武快速線に導入された次世代大型21.5インチLCD。東京駅や錦糸町駅の複雑極まる地下駅構内図が、まるでクォータービューのシミュレーションゲームのように立体的に描画される圧巻の画面。すべてPowerPointの「頂点の編集」と「図形の結合」のみで描き起こされた、作者の情熱と狂気が宿る代表作です。",
    "images": ["e235-1000-1.svg"],
    "links": {
      "article": "https://freedomtrain.jp/",
      "x": "https://x.com/Mamouna_inori"
    }
  },
  {
    "slug": "tokyo-metro-13000",
    "title": "東京メトロ13000系 3画面ワイドLCD",
    "subtitle": "日比谷線・東武スカイツリーライン直通",
    "type": "still",
    "operator": "東京メトロ",
    "train": "13000系",
    "lines": ["メトロ", "東武"],
    "maker": "三菱",
    "makerDetail": "三菱（3画面トレインビジョン）",
    "ratio": "17インチ 16:9 × 3画面",
    "animation": "あり（3画面シームレス連携）",
    "year": 2026,
    "featured": False,
    "excerpt": "扉上に並ぶ圧巻の3画面LCD。日比谷線独特の洗練されたシルバー基調グラフィック。",
    "body": "ドア上に贅沢に3面並んだ東京メトロ日比谷線13000系の案内装置。右側の走行位置・乗換案内、中央の運行情報・号車詳細、左側の広告用画面が美しく連動するレイアウトを再現。メトロ独特の視認性の高いピクトグラムや細身のフォントチョイス、グラデーションの質感まで忠実にパワポ化しています。",
    "images": ["tokyo-metro-13000-1.svg"],
    "links": {
      "article": "https://freedomtrain.jp/",
      "x": "https://x.com/Mamouna_inori"
    }
  },
  {
    "slug": "sotetsu-yokohama-sync",
    "title": "相鉄線 横浜ゆき 全区間放送＋LCD同期ズレ再現",
    "subtitle": "相鉄本線 各停 横浜ゆき",
    "type": "video",
    "operator": "相模鉄道",
    "train": "12000系 / 20000系",
    "lines": ["相鉄"],
    "maker": "交通電業社",
    "makerDetail": "交通電業社 / 日立系",
    "ratio": "17インチ 16:9",
    "animation": "あり（実車放送完全同期＋ズレ再現）",
    "year": 2025,
    "featured": True,
    "excerpt": "自動放送チャイムとLCD切り替えがコンマ数秒ズレる「あの実車のクセ」まで完全再現。",
    "body": "相鉄の洗練されたネイビーブルーの案内画面。本作品の真骨頂はグラフィックの美しさだけでなく、実車収録した自動アナウンス音源に対して、画面切り替えアニメーションの開始タイミングが「コンマ数秒微妙に遅れてやってくる」実車の挙動・同期ズレまでも再現している点にあります。PowerPointのアニメーション遅延時間を0.05秒単位で調整した狂気の動画です。",
    "images": ["sotetsu-yokohama-1.svg"],
    "links": {
      "youtube": "https://www.youtube.com/@Mamouna_Inori",
      "x": "https://x.com/Mamouna_inori"
    }
  },
  {
    "slug": "odakyu-hon-atsugi",
    "title": "小田急小田原線 急行 本厚木ゆき 車内放送＋LCD",
    "subtitle": "新宿〜本厚木 全区間完全再現",
    "type": "video",
    "operator": "小田急電鉄",
    "train": "3000形 / 4000形",
    "lines": ["小田急"],
    "maker": "三菱",
    "makerDetail": "小田急TV（三菱電機）",
    "ratio": "17インチ 16:9",
    "animation": "あり（全区間フルアニメーション走行）",
    "year": 2025,
    "featured": True,
    "excerpt": "小田急特有の青白グラデーションと独特な駅ナンバリング表示。新宿発車から終点までの旅。",
    "body": "地元・小田急電鉄の急行本厚木ゆきを全区間フル尺で制作。小田急特有の澄んだスカイブルーグラデーション、代々木上原での千代田線乗り換え表示、登戸や町田での緩急接続案内など、沿線住民ならではの解像度で完璧に再現。YouTube公開中の大人気動画です。",
    "images": ["odakyu-hon-atsugi-1.svg"],
    "links": {
      "youtube": "https://www.youtube.com/watch?v=zcoL4yaIPhw",
      "x": "https://x.com/Mamouna_inori"
    }
  },
  {
    "slug": "powerpoint-talent",
    "title": "バズり動画「怖いか？私のパワポの才能が」",
    "subtitle": "PowerPoint限界突破シリーズ",
    "type": "video",
    "operator": "JR / 私鉄各線",
    "train": "各種通勤型電車",
    "lines": ["JR", "小田急", "東急"],
    "maker": "まもうな",
    "makerDetail": "自作PowerPointアニメーション",
    "ratio": "16:9",
    "animation": "あり（アニメーションウィンドウ1000行超）",
    "year": 2025,
    "featured": True,
    "excerpt": "「プレゼンソフトで何やってんの？」Xで数万いいねを獲得した、パワポだけで動く実物級LCD。",
    "body": "「PowerPointはただのスライド資料作成ツールではない、最強の2Dモーショングラフィックスエンジンである」ことを世に知らしめた話題作。複雑に絡み合うアニメーションタイミング、図形パスの緻密な配置、スライドショー再生時に一切カクつかない最適化など、パワポ芸の極致がここに凝縮されています。",
    "images": ["powerpoint-talent-1.svg"],
    "links": {
      "x": "https://x.com/Mamouna_inori",
      "youtube": "https://www.youtube.com/@Mamouna_Inori"
    }
  },
  {
    "slug": "doujin-book-vol1",
    "title": "同人誌『PowerPointではじめる車内LCD再現』",
    "subtitle": "コミックマーケット C106 / C108 頒布作品",
    "type": "book",
    "operator": "まもうな工房",
    "train": "車内案内表示器全般",
    "lines": ["JR", "小田急", "メトロ", "東急", "相鉄"],
    "maker": "まもうな",
    "makerDetail": "技術同人誌（B5判 フルカラー）",
    "ratio": "B5判 書籍",
    "animation": "なし（解説・図解・Tips集）",
    "year": 2025,
    "featured": True,
    "excerpt": "初心者でも作れる！グリッド設定からフォント選定、図形結合の裏技、同期の極意まで網羅。",
    "body": "「どうやってパワポでLCDを作っているのか？」という疑問にすべて答える技術同人誌。基本のキャンバス比率設定から、UD新ゴ等のフォント選び、ドット再現の手順、実車取材のポイント、そしてアニメーションの滑らかなタイミング設定までをフルカラーで詳細解説。即売会で大反響を呼んだ一冊。",
    "images": ["doujin-book-1.svg"],
    "links": {
      "article": "https://freedomtrain.jp/",
      "x": "https://x.com/Mamouna_inori"
    }
  },
  {
    "slug": "powerpoint-strongest",
    "title": "記事「PowerPointは最強トレインビジョン再現ソフト」",
    "subtitle": "Freedom Train 寄稿記事",
    "type": "article",
    "operator": "Freedom Train",
    "train": "トレインビジョン全般",
    "lines": ["JR", "小田急", "東急"],
    "maker": "まもうな",
    "makerDetail": "Web技術解説記事",
    "ratio": "Web記事",
    "animation": "なし",
    "year": 2024,
    "featured": False,
    "excerpt": "なぜIllustratorやAfter Effectsではなくパワポなのか？軽量性・スナップ機能の強みを熱弁。",
    "body": "鉄道メディア「Freedom Train」に寄稿した解説記事。Illustratorなどの高価なプロ用ツールを使わず、学生でも身近なPowerPointがなぜ車内LCD再現において圧倒的な操作性とグリッド吸着力を発揮するのかを論理的に紐解きます。多くの再現鉄クリエイターを刺激した必読記事です。",
    "images": ["powerpoint-strongest-1.svg"],
    "links": {
      "article": "https://freedomtrain.jp/mamouna_owo/5425/",
      "x": "https://x.com/Mamouna_inori"
    }
  },
  {
    "slug": "school-guidance-lcd",
    "title": "学校ガイダンス資料のLCD化",
    "subtitle": "高校の提出スライドを本気でトレインビジョン風にした結果",
    "type": "still",
    "operator": "学校・日常",
    "train": "高校生日常系LCD",
    "lines": ["小田急", "JR"],
    "maker": "まもうな",
    "makerDetail": "自作TIMS / パワポ",
    "ratio": "16:9",
    "animation": "なし（静止画スライド）",
    "year": 2025,
    "featured": False,
    "excerpt": "「学校のガイダンス資料でLCDベースに作ってる人、多分世界に私だけ」",
    "body": "高校のオリエンテーション発表資料で本領を発揮してしまった一作。種別欄を「通常授業」、行先を「進路指導室」、次駅表示を「次の提出物」に仕立て上げ、完璧な車内案内表示器のレイアウトで学業連絡を行ったところ、教室と教卓が静まり返ったというエピソードを持つ伝説のスライドです。",
    "images": ["school-guidance-1.svg"],
    "links": {
      "x": "https://x.com/Mamouna_inori"
    }
  }
]

def generate_work_html(work):
    links_html = []
    if "article" in work.get("links", {}):
        links_html.append(f'<a href="{work["links"]["article"]}" target="_blank" rel="noopener noreferrer" class="ext-link-btn btn-article"><span>Freedom Train 解説記事を読む</span><span>↗</span></a>')
    if "youtube" in work.get("links", {}):
        links_html.append(f'<a href="{work["links"]["youtube"]}" target="_blank" rel="noopener noreferrer" class="ext-link-btn btn-youtube"><span>YouTubeで動画を視聴する</span><span>▶</span></a>')
    if "x" in work.get("links", {}):
        links_html.append(f'<a href="{work["links"]["x"]}" target="_blank" rel="noopener noreferrer" class="ext-link-btn btn-x"><span>X (Twitter) で投稿を見る</span><span>↗</span></a>')
    
    links_str = "\n".join(links_html)
    
    html = f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{work["title"]} | まもうなのLCD再現ギャラリー</title>
  <meta name="description" content="{work["excerpt"]}">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/lcd.css">
  <link rel="stylesheet" href="../css/components.css">
</head>
<body data-slug="{work["slug"]}">

  <!-- 固定ヘッダー -->
  <div class="site-header-wrapper">
    <header class="site-header">
      <div class="site-logo">
        <a href="../index.html" style="display:flex; align-items:center; gap:10px;">
          <span class="logo-badge">LCD VIS</span>
          <span>まもうなのLCD再現ギャラリー</span>
          <span class="logo-title-en">Mamouna LCD Gallery</span>
        </a>
      </div>
      <nav class="site-nav">
        <ul>
          <li><a href="../index.html" class="active">GALLERY</a></li>
          <li><a href="../about.html">ABOUT</a></li>
          <li><a href="../book.html">BOOK</a></li>
          <li><a href="../links.html">LINKS</a></li>
        </ul>
      </nav>
    </header>

    <!-- 路線図ステータスバー (現在地: GALLERY) -->
    <div class="line-status-bar">
      <div class="line-status-inner">
        <div class="line-track"></div>
        <div class="station-nodes">
          <div class="station-node current">
            <span class="station-lamp"></span>
            <span class="station-code">M01</span>
            <span>GALLERY / 図録</span>
          </div>
          <div class="station-node">
            <span class="station-lamp"></span>
            <span class="station-code">M02</span>
            <span>ABOUT / まもうな</span>
          </div>
          <div class="station-node">
            <span class="station-lamp"></span>
            <span class="station-code">M03</span>
            <span>BOOK / 教科書</span>
          </div>
          <div class="station-node">
            <span class="station-lamp"></span>
            <span class="station-code">M04</span>
            <span>LINKS / 連絡先</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <main>
    <div class="work-detail-container">
      <!-- ナビゲーションバー -->
      <div class="detail-nav-bar">
        <a href="../index.html" class="back-to-gallery-link">
          <span>←</span> <span>ギャラリー一覧へ戻る</span>
        </a>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-text-sub);">
          ITEM NO: {work["slug"].upper()}
        </div>
      </div>

      <!-- 2カラムコンテンツ -->
      <div class="detail-columns">
        <!-- 左カラム: 大画面LCDビューア -->
        <div class="viewer-column">
          <div class="lcd-bezel main-lcd-display" id="mainLcdDisplay" title="クリックで全画面拡大">
            <div class="zoom-hint">🔍 クリックで全画面拡大（Escで閉じる）</div>
            <div class="lcd-screen-container" id="mainLcdScreen">
              <!-- JSで高精細LCDベクターがレンダリングされます -->
            </div>
            <div class="lcd-bezel-footer">
              <div class="lcd-pilot-lamp">
                <span class="lamp-dot"></span>
                <span>STATUS: TIMS ONLINE / ACTIVE</span>
              </div>
              <div class="lcd-plate">{work["ratio"]}</div>
            </div>
          </div>

          <div class="viewer-seal-bar">
            <span>描画解像度: ベクターネイティブ</span>
            <span class="ppt-guarantee-badge">★ PowerPointで再現</span>
          </div>
        </div>

        <!-- 右カラム: スペックパネル（車内路線図・銘板風） -->
        <div class="spec-column">
          <div class="spec-board">
            <div class="spec-board-header">
              <h1 class="spec-train-title">{work["title"]}</h1>
              <div class="spec-subtitle">{work["subtitle"]}</div>
            </div>

            <!-- 本人記事に準拠した項目スペック表 -->
            <table class="spec-table">
              <tbody>
                <tr>
                  <th>導入事業者</th>
                  <td>{work["operator"]}</td>
                </tr>
                <tr>
                  <th>車両形式</th>
                  <td>{work["train"]}</td>
                </tr>
                <tr>
                  <th>導入路線</th>
                  <td>{", ".join(work["lines"])}</td>
                </tr>
                <tr>
                  <th>画面サイズ・比率</th>
                  <td class="mono">{work["ratio"]}</td>
                </tr>
                <tr>
                  <th>表示制作メーカー</th>
                  <td>{work["makerDetail"]}</td>
                </tr>
                <tr>
                  <th>アニメーション</th>
                  <td>{work["animation"]}</td>
                </tr>
                <tr>
                  <th>制作ソフトウェア</th>
                  <td class="mono"><strong>Microsoft PowerPoint</strong></td>
                </tr>
              </tbody>
            </table>

            <!-- 本人のこだわり解説文 -->
            <div class="spec-commentary">
              <div class="commentary-label">Recreation Notes / 解説</div>
              <p class="commentary-text">{work["body"]}</p>
            </div>

            <!-- 外部リンクボタン -->
            <div class="external-links-group">
              {links_str}
            </div>
          </div>
        </div>
      </div>

      <!-- 関連作品 -->
      <section class="related-works-section">
        <div class="section-heading-bar">
          <h2 class="section-heading-title">関連作品（同系路線・メーカー）</h2>
        </div>
        <div class="works-grid" id="relatedWorksList">
          <!-- JSで自動配置されます -->
        </div>
      </section>
    </div>
  </main>

  <!-- 全画面ライトボックスモーダル -->
  <div class="lightbox-overlay" id="lightboxOverlay" role="dialog" aria-modal="true">
    <div class="lightbox-header">
      <div class="lightbox-title-text" id="lightboxTitle">{work["title"]}</div>
      <button class="lightbox-close-btn" id="lightboxClose" aria-label="閉じる">✕ 閉じる (Esc)</button>
    </div>
    <button class="lightbox-nav-btn prev" id="lightboxPrev" aria-label="前の作品">‹</button>
    <div class="lightbox-content-box" id="lightboxTarget">
      <!-- 拡大LCD描画エリア -->
    </div>
    <button class="lightbox-nav-btn next" id="lightboxNext" aria-label="次の作品">›</button>
    <div class="lightbox-instructions">
      キーボード [←] [→] で前後の作品へ / [Esc] または余白クリックで閉じる
    </div>
  </div>

  <!-- フッター -->
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="footer-top">
        <div class="footer-announcement">
          <span class="footer-chime-icon">♪</span>
          <span>まもなく、終点です。お忘れ物のないようご注意ください。</span>
        </div>
        <div class="footer-links">
          <a href="../index.html">GALLERY</a>
          <a href="../about.html">ABOUT</a>
          <a href="../book.html">BOOK</a>
          <a href="../links.html">LINKS</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copyright">
          © まもうな (@Mamouna_inori) / Mamouna LCD Gallery
        </div>
        <div class="footer-sysinfo">
          ALL LCD GRAPHICS REPRODUCED WITH MICROSOFT POWERPOINT
        </div>
      </div>
    </div>
  </footer>

  <script type="module" src="../js/detail.js"></script>
</body>
</html>
"""
    return html

def main():
    works_dir = os.path.join(os.path.dirname(__file__), "..", "works")
    os.makedirs(works_dir, exist_ok=True)
    
    # 全作品の詳細HTMLを生成
    for work in WORKS:
        filepath = os.path.join(works_dir, f"{work['slug']}.html")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(generate_work_html(work))
        print(f"Generated: {filepath}")

    # works/index.html （一覧へのリダイレクトまたはフォールバック）
    index_path = os.path.join(works_dir, "index.html")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write("""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=../index.html">
  <title>作品一覧 | まもうなのLCD再現ギャラリー</title>
</head>
<body>
  <p>ギャラリー一覧へ移動します... <a href="../index.html">トップページへ</a></p>
</body>
</html>
""")
    print(f"Generated: {index_path}")

if __name__ == "__main__":
    main()
