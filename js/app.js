/**
 * まもうな 個人サイト制御スクリプト (app.js)
 */

import { articles } from './articles.js';
import { renderYouTubeSection } from './youtube.js';

document.addEventListener("DOMContentLoaded", () => {
  // YouTube 最新動画の描画
  renderYouTubeSection("youtubeGrid");

  // Freedom Train 記事一覧の描画
  renderArticles();
});

function renderArticles() {
  const grid = document.getElementById("articlesGrid");
  if (!grid) return;

  grid.innerHTML = articles.map(item => `
    <article class="article-card">
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="thumb-wrap" title="${item.title}">
        <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" onerror="this.src='https://freedomtrain.jp/wp-content/uploads/2024/08/e3d6010f22f6b14780efe35a9a072685.png'">
      </a>
      <div class="card-body">
        <div class="article-meta">
          <span class="card-date">${item.date}</span>
          ${item.category ? `<span class="article-category">${item.category}</span>` : ''}
        </div>
        <h3 class="card-title">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>
        </h3>
        <p class="article-snippet">${item.snippet}</p>
      </div>
    </article>
  `).join("");
}
