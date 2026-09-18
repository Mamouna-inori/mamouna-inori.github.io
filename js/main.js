/**
 * まもうなのLCD再現ギャラリー TOPページ制御スクリプト (main.js)
 * 検索、駅種別幕フィルタ、URLパラメータ同期、グリッド描画
 */

import { works } from './works.js';
import { generateLcdSvg } from './lcd-generator.js';

let activeFilters = {
  type: "all",
  line: "all",
  maker: "all",
  search: "",
  sort: "newest"
};

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initTelop();
  parseUrlParams();
  bindFilterEvents();
  renderWorks();
});

/**
 * ヒーロー時計（実車の案内器風）
 */
function initClock() {
  const clockEl = document.getElementById("heroClock");
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = now.getSeconds();
    clockEl.textContent = `${h}${s % 2 === 0 ? ':' : ' '}${m}`;
  }
  update();
  setInterval(update, 1000);
}

/**
 * ヒーロー下部LED電光テロップ
 */
function initTelop() {
  const track = document.getElementById("telopTrack");
  if (!track) return;

  const items = works.map(w => {
    return `<span class="telop-item">【${w.train}】${w.title} （${w.makerDetail} / ${w.year}年）</span>`;
  }).join("");

  // ループアニメーション用に2重化
  track.innerHTML = items + items;
}

/**
 * URLパラメータの解析と初期状態設定
 */
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("type")) activeFilters.type = params.get("type");
  if (params.has("line")) activeFilters.line = params.get("line");
  if (params.has("maker")) activeFilters.maker = params.get("maker");
  if (params.has("q")) activeFilters.search = params.get("q");
  if (params.has("sort")) activeFilters.sort = params.get("sort");

  // UIに反映
  const searchInput = document.getElementById("searchInput");
  if (searchInput && activeFilters.search) {
    searchInput.value = activeFilters.search;
  }

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect && activeFilters.sort) {
    sortSelect.value = activeFilters.sort;
  }

  updateFilterChipsUI();
}

/**
 * URLパラメータの更新
 */
function updateUrlParams() {
  const params = new URLSearchParams();
  if (activeFilters.type !== "all") params.set("type", activeFilters.type);
  if (activeFilters.line !== "all") params.set("line", activeFilters.line);
  if (activeFilters.maker !== "all") params.set("maker", activeFilters.maker);
  if (activeFilters.search.trim()) params.set("q", activeFilters.search.trim());
  if (activeFilters.sort !== "newest") params.set("sort", activeFilters.sort);

  const query = params.toString();
  const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, "", newUrl);
}

/**
 * フィルタチップのイベント紐付け
 */
function bindFilterEvents() {
  // 検索入力
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeFilters.search = e.target.value;
      updateUrlParams();
      renderWorks();
    });
  }

  // 並び替え
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeFilters.sort = e.target.value;
      updateUrlParams();
      renderWorks();
    });
  }

  // フィルタチップクリック
  document.querySelectorAll(".rollsign-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const group = chip.dataset.filterGroup;
      const value = chip.dataset.filterValue;

      if (group === "type") {
        activeFilters.type = activeFilters.type === value && value !== "all" ? "all" : value;
      } else if (group === "line") {
        activeFilters.line = activeFilters.line === value && value !== "all" ? "all" : value;
      } else if (group === "maker") {
        activeFilters.maker = activeFilters.maker === value && value !== "all" ? "all" : value;
      }

      updateFilterChipsUI();
      updateUrlParams();
      renderWorks();
    });
  });
}

/**
 * フィルタチップのアクティブ表示切り替え
 */
function updateFilterChipsUI() {
  document.querySelectorAll(".rollsign-chip").forEach(chip => {
    const group = chip.dataset.filterGroup;
    const value = chip.dataset.filterValue;

    let isActive = false;
    if (group === "type") isActive = activeFilters.type === value;
    if (group === "line") isActive = activeFilters.line === value;
    if (group === "maker") isActive = activeFilters.maker === value;

    if (isActive) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });
}

/**
 * 作品一覧のフィルタ・ソート・描画
 */
export function renderWorks() {
  const grid = document.getElementById("worksGrid");
  const countEl = document.getElementById("worksCount");
  if (!grid) return;

  // フィルタリング
  let filtered = works.filter(w => {
    // タイプ
    if (activeFilters.type !== "all" && w.type !== activeFilters.type) return false;
    // 路線
    if (activeFilters.line !== "all" && !w.lines.includes(activeFilters.line)) return false;
    // メーカー
    if (activeFilters.maker !== "all" && w.maker !== activeFilters.maker) return false;

    // 検索語
    if (activeFilters.search.trim()) {
      const q = activeFilters.search.toLowerCase().trim();
      const matchTitle = w.title.toLowerCase().includes(q);
      const matchTrain = w.train.toLowerCase().includes(q);
      const matchOperator = w.operator.toLowerCase().includes(q);
      const matchLines = w.lines.some(l => l.toLowerCase().includes(q));
      const matchMaker = w.makerDetail.toLowerCase().includes(q);
      const matchExcerpt = w.excerpt.toLowerCase().includes(q);
      if (!matchTitle && !matchTrain && !matchOperator && !matchLines && !matchMaker && !matchExcerpt) {
        return false;
      }
    }
    return true;
  });

  // ソート
  if (activeFilters.sort === "newest") {
    filtered.sort((a, b) => b.year - a.year);
  } else if (activeFilters.sort === "line") {
    filtered.sort((a, b) => a.lines[0].localeCompare(b.lines[0], 'ja'));
  }

  // 件数表示
  if (countEl) {
    countEl.textContent = filtered.length;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--color-panel); border: 1px dashed var(--color-metal-border); border-radius: 8px;">
        <p style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--color-text);">該当する作品が見つかりませんでした。</p>
        <p style="font-size: 0.88rem; color: var(--color-text-sub); margin-top: 8px;">検索条件やフィルタを変更してお試しください。</p>
      </div>
    `;
    return;
  }

  // カードDOM生成
  grid.innerHTML = filtered.map(work => createWorkCardHtml(work)).join("");
}

/**
 * 1件の作品カードHTML
 */
function createWorkCardHtml(work) {
  const typeLabels = {
    still: "再現静止画",
    video: "動画",
    article: "記事",
    book: "同人誌"
  };

  const badgeClass = `badge-${work.type}`;
  const typeLabel = typeLabels[work.type] || "再現";

  // 画像プレースホルダーまたはSVG
  const svgContent = generateLcdSvg(work, 640, 360);

  return `
    <article class="work-card lcd-bezel" onclick="location.href='works/${work.slug}.html'">
      <div class="card-screen-wrap">
        ${svgContent}
        <div class="card-hover-telop">
          <span class="card-hover-telop-tag">EXCERPT</span>
          <span>${work.excerpt}</span>
        </div>
      </div>
      <div class="card-info">
        <div class="card-title-row">
          <h3 class="card-title">${work.title}</h3>
          <span class="card-badge ${badgeClass}">${typeLabel}</span>
        </div>
        <div class="card-sub-row">
          <div class="card-lines">
            ${work.lines.map(l => `<span class="card-line-pill">${l}</span>`).join("")}
          </div>
          <span class="card-maker">${work.makerDetail}</span>
        </div>
      </div>
      <div class="lcd-bezel-footer">
        <div class="lcd-pilot-lamp">
          <span class="lamp-dot"></span>
          <span>ONLINE</span>
        </div>
        <div class="lcd-plate">PPT VIS 2026</div>
      </div>
    </article>
  `;
}
