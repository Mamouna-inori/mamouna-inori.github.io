/**
 * まもうな OFFICIAL WEB SITE 制御スクリプト (app.js)
 */

import { renderYouTubeSection } from './youtube.js';

document.addEventListener("DOMContentLoaded", () => {
  // YouTube 最新動画の自動同期
  renderYouTubeSection("movieGrid");
});
