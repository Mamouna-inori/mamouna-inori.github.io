/**
 * 作品詳細静的HTML生成スクリプト (Node.js版)
 * works.js から全作品の静的詳細ページ works/*.html を一括生成します。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { works } from '../js/works.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const worksDir = path.resolve(__dirname, '../works');

if (!fs.existsSync(worksDir)) {
  fs.mkdirSync(worksDir, { recursive: true });
}

function generateWorkHtml(work) {
  const linksHtml = [];
  if (work.links?.article) {
    linksHtml.push(`<a href="${work.links.article}" target="_blank" rel="noopener noreferrer" class="ext-link-btn btn-article"><span>Freedom Train 解説記事を読む</span><span>↗</span></a>`);
  }
  if (work.links?.youtube) {
    linksHtml.push(`<a href="${work.links.youtube}" target="_blank" rel="noopener noreferrer" class="ext-link-btn btn-youtube"><span>YouTubeで動画を視聴する</span><span>▶</span></a>`);
  }
  if (work.links?.x) {
    linksHtml.push(`<a href="${work.links.x}" target="_blank" rel="noopener noreferrer" class="ext-link-btn btn-x"><span>X (Twitter) で投稿を見る</span><span>↗</span></a>`);
  }

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${work.title} | まもうなのLCD再現ギャラリー</title>
  <meta name="description" content="${work.excerpt}">
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="../css/lcd.css">
  <link rel="stylesheet" href="../css/components.css">
</head>
<body data-slug="${work.slug}">

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
          ITEM NO: ${work.slug.toUpperCase()}
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
              <div class="lcd-plate">${work.ratio}</div>
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
              <h1 class="spec-train-title">${work.title}</h1>
              <div class="spec-subtitle">${work.subtitle}</div>
            </div>

            <!-- 本人記事に準拠した項目スペック表 -->
            <table class="spec-table">
              <tbody>
                <tr>
                  <th>導入事業者</th>
                  <td>${work.operator}</td>
                </tr>
                <tr>
                  <th>車両形式</th>
                  <td>${work.train}</td>
                </tr>
                <tr>
                  <th>導入路線</th>
                  <td>${work.lines.join(", ")}</td>
                </tr>
                <tr>
                  <th>画面サイズ・比率</th>
                  <td class="mono">${work.ratio}</td>
                </tr>
                <tr>
                  <th>表示制作メーカー</th>
                  <td>${work.makerDetail}</td>
                </tr>
                <tr>
                  <th>アニメーション</th>
                  <td>${work.animation}</td>
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
              <p class="commentary-text">${work.body}</p>
            </div>

            <!-- 外部リンクボタン -->
            <div class="external-links-group">
              ${linksHtml.join("\n")}
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
      <div class="lightbox-title-text" id="lightboxTitle">${work.title}</div>
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
</html>`;
}

for (const work of works) {
  const filePath = path.resolve(worksDir, `${work.slug}.html`);
  fs.writeFileSync(filePath, generateWorkHtml(work), 'utf-8');
  console.log(`Generated: ${filePath}`);
}

const indexPath = path.resolve(worksDir, 'index.html');
fs.writeFileSync(indexPath, `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=../index.html">
  <title>作品一覧 | まもうなのLCD再現ギャラリー</title>
</head>
<body>
  <p>ギャラリー一覧へ移動します... <a href="../index.html">トップページへ</a></p>
</body>
</html>`, 'utf-8');
console.log(`Generated: ${indexPath}`);
