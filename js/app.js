/**
 * まもうな OFFICIAL WEB SITE 制御スクリプト (app.js)
 */

import { renderYouTubeSection } from './youtube.js';

/**
 * Key Visual スライドショー制御 (inoriminase.com style)
 */
function initKVSlider() {
  const slider = document.getElementById("kvSlider");
  const track = document.getElementById("kvTrack");
  const indicatorsContainer = document.getElementById("kvIndicators");
  const prevBtn = document.getElementById("kvPrev");
  const nextBtn = document.getElementById("kvNext");

  if (!slider || !track) return;

  const slides = Array.from(track.querySelectorAll(".kv-slide"));
  if (slides.length <= 1) return;

  let currentIndex = 0;
  let timer = null;
  const INTERVAL_MS = 5000;

  // インジケーター（ドット）の生成
  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = "";
    slides.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `kv-dot ${idx === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `スライド ${idx + 1}`);
      dot.addEventListener("click", () => {
        goToSlide(idx);
        resetAutoPlay();
      });
      indicatorsContainer.appendChild(dot);
    });
  }

  const dots = indicatorsContainer ? Array.from(indicatorsContainer.querySelectorAll(".kv-dot")) : [];

  function updateSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
        if (indicatorsContainer) {
          // ページ全体のスクロールを起こさず、ドットコンテナ内だけを横スクロールさせる
          const containerWidth = indicatorsContainer.clientWidth;
          const dotLeft = dot.offsetLeft;
          const dotWidth = dot.clientWidth;
          indicatorsContainer.scrollTo({
            left: dotLeft - containerWidth / 2 + dotWidth / 2,
            behavior: "smooth"
          });
        }
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    updateSlide(currentIndex);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoPlay() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, INTERVAL_MS);
  }

  function stopAutoPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  // ホバー時は自動送りを一時停止
  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);

  // タッチスワイプ対応 (スマホ)
  let startX = 0;
  let endX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopAutoPlay();
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoPlay();
  }, { passive: true });

  // 自動再生開始
  startAutoPlay();
}

document.addEventListener("DOMContentLoaded", () => {
  // Key Visual スライドショーの初期化
  initKVSlider();

  // YouTube 最新動画の自動同期
  renderYouTubeSection("movieGrid");
});

