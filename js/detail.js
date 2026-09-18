/**
 * まもうなのLCD再現ギャラリー 作品詳細ページ制御スクリプト (detail.js)
 * ライトボックス、キーボードナビゲーション、サムネイル切り替え
 */

import { works, getWorkBySlug, getRelatedWorks } from './works.js';
import { generateLcdSvg } from './lcd-generator.js';

let currentWork = null;
let currentImageIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  initDetailPage();
  initLightbox();
});

function initDetailPage() {
  // slugの特定: URLのpathnameまたは?slug=から取得
  const pathParts = window.location.pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];
  let slug = lastPart.replace('.html', '');

  const params = new URLSearchParams(window.location.search);
  if (params.has('slug')) {
    slug = params.get('slug');
  }

  // HTMLのbodyにdata-slugがある場合
  if (document.body.dataset.slug) {
    slug = document.body.dataset.slug;
  }

  currentWork = getWorkBySlug(slug) || works[0];

  // メイン画面のプレースホルダー描画（もし画像未配置ならSVG）
  const displayContainer = document.getElementById("mainLcdScreen");
  if (displayContainer) {
    displayContainer.innerHTML = generateLcdSvg(currentWork, 1280, 720);
  }

  // 関連作品の描画
  renderRelatedWorks();
}

function renderRelatedWorks() {
  const container = document.getElementById("relatedWorksList");
  if (!container || !currentWork) return;

  const related = getRelatedWorks(currentWork, 3);
  container.innerHTML = related.map(w => {
    return `
      <article class="work-card lcd-bezel" onclick="location.href='${w.slug}.html'">
        <div class="card-screen-wrap">
          ${generateLcdSvg(w, 640, 360)}
          <div class="card-hover-telop">
            <span class="card-hover-telop-tag">RELATED</span>
            <span>${w.excerpt}</span>
          </div>
        </div>
        <div class="card-info">
          <div class="card-title-row">
            <h4 class="card-title" style="font-size: 0.95rem;">${w.title}</h4>
          </div>
          <div class="card-sub-row">
            <span class="card-maker">${w.makerDetail}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function initLightbox() {
  const overlay = document.getElementById("lightboxOverlay");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  const targetImage = document.getElementById("lightboxTarget");
  const titleText = document.getElementById("lightboxTitle");
  const openTarget = document.getElementById("mainLcdDisplay");

  if (!overlay) return;

  function openLightbox() {
    if (!currentWork) return;
    titleText.textContent = `${currentWork.title} - 車内実物ビューア`;
    targetImage.innerHTML = generateLcdSvg(currentWork, 1920, 1080);
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function navigateWork(direction) {
    if (!currentWork) return;
    const currentIndex = works.findIndex(w => w.slug === currentWork.slug);
    if (currentIndex === -1) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = works.length - 1;
    if (newIndex >= works.length) newIndex = 0;

    const nextWork = works[newIndex];
    window.location.href = `${nextWork.slug}.html`;
  }

  if (openTarget) {
    openTarget.addEventListener("click", openLightbox);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navigateWork(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navigateWork(1);
    });
  }

  // 背景クリックで閉じる
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest("#lightboxClose")) {
      closeLightbox();
    }
  });

  // キーボード操作 (Esc, 左右矢印)
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) {
      // ライトボックス非表示時でも左右キーで作品遷移
      if (e.key === "ArrowLeft") navigateWork(-1);
      if (e.key === "ArrowRight") navigateWork(1);
      return;
    }

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowLeft") {
      navigateWork(-1);
    } else if (e.key === "ArrowRight") {
      navigateWork(1);
    }
  });
}
