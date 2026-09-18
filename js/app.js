/**
 * まもうな シンプルポートフォリオ制御スクリプト (app.js)
 */

import { works } from './works.js';
import { generateLcdSvg } from './lcd-generator.js';
import { renderYouTubeSection } from './youtube.js';

let currentFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  // 1. YouTube最新動画の自動取得
  renderYouTubeSection("youtubeGrid");

  // 2. 作品ギャラリーの初期描画
  renderWorks();

  // 3. フィルタタブのイベント紐付け
  bindFilterTabs();

  // 4. モーダル初期化
  initModal();
});

function bindFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.filter;
      renderWorks();
    });
  });
}

function renderWorks() {
  const grid = document.getElementById("worksGrid");
  if (!grid) return;

  const filtered = works.filter(w => {
    if (currentFilter === "all") return true;
    if (currentFilter === "video") return w.type === "video";
    if (currentFilter === "still") return w.type === "still";
    if (currentFilter === "article-book") return w.type === "article" || w.type === "book";
    return true;
  });

  grid.innerHTML = filtered.map(work => {
    const typeLabelMap = {
      still: "静止画",
      video: "動画",
      article: "記事",
      book: "同人誌"
    };
    const typeLabel = typeLabelMap[work.type] || "再現";
    const badgeClass = `badge-${work.type}`;

    return `
      <article class="work-card" data-slug="${work.slug}">
        <div class="work-thumb-wrap">
          ${generateLcdSvg(work, 640, 360)}
        </div>
        <div class="work-info">
          <div class="work-meta-row">
            <span class="work-type-badge ${badgeClass}">${typeLabel}</span>
            <span class="work-lines">${work.lines.join(" / ")}</span>
          </div>
          <h3 class="work-title">${work.title}</h3>
          <p class="work-excerpt">${work.excerpt}</p>
        </div>
      </article>
    `;
  }).join("");

  // カードクリックでモーダルを開く
  grid.querySelectorAll(".work-card").forEach(card => {
    card.addEventListener("click", () => {
      const slug = card.dataset.slug;
      openModal(slug);
    });
  });
}

function initModal() {
  const backdrop = document.getElementById("workModal");
  const closeBtn = document.getElementById("modalClose");

  if (!backdrop) return;

  function close() {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      close();
    }
  });
}

function openModal(slug) {
  const work = works.find(w => w.slug === slug);
  if (!work) return;

  const backdrop = document.getElementById("workModal");
  const titleEl = document.getElementById("modalTitle");
  const thumbEl = document.getElementById("modalThumb");
  const tableEl = document.getElementById("modalSpecs");
  const bodyEl = document.getElementById("modalBody");
  const linksEl = document.getElementById("modalLinks");

  titleEl.textContent = work.title;
  thumbEl.innerHTML = generateLcdSvg(work, 1280, 720);

  tableEl.innerHTML = `
    <tr><th>車両形式</th><td>${work.train}</td></tr>
    <tr><th>事業者・路線</th><td>${work.operator}（${work.lines.join("、")}）</td></tr>
    <tr><th>表示メーカー</th><td>${work.makerDetail}</td></tr>
    <tr><th>画面比率</th><td>${work.ratio}</td></tr>
    <tr><th>制作ツール</th><td><strong>Microsoft PowerPoint</strong></td></tr>
  `;

  bodyEl.textContent = work.body;

  const linkButtons = [];
  if (work.links?.youtube) {
    linkButtons.push(`<a href="${work.links.youtube}" target="_blank" rel="noopener noreferrer" class="sns-btn btn-yt"><span>YouTubeで動画を見る</span> ↗</a>`);
  }
  if (work.links?.article) {
    linkButtons.push(`<a href="${work.links.article}" target="_blank" rel="noopener noreferrer" class="sns-btn"><span>Freedom Train 記事</span> ↗</a>`);
  }
  if (work.links?.x) {
    linkButtons.push(`<a href="${work.links.x}" target="_blank" rel="noopener noreferrer" class="sns-btn"><span>X (Twitter)</span> ↗</a>`);
  }

  linksEl.innerHTML = linkButtons.join(" ");

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}
