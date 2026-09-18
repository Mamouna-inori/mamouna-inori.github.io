/**
 * まもうな YouTubeチャンネル最新動画 自動取得モジュール
 * チャンネルID: UCF4ZQBIbNjgcmIQMsHVF3rA (@Mamouna_Inori)
 */

export const YOUTUBE_CHANNEL_ID = "UCF4ZQBIbNjgcmIQMsHVF3rA";
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Mamouna_Inori";

// ネットワーク遮断時やCORS制限時のフォールバック用（実在の最新動画データ）
const FALLBACK_VIDEOS = [
  {
    id: "fY1LlkKLDvU",
    title: "【LCD再現・更新】小田急線 各駅停車 成城学園前ゆき 全区間車内放送＋LCD再現",
    published: "2026-09-18",
    url: "https://www.youtube.com/watch?v=fY1LlkKLDvU",
    thumbnail: "https://i.ytimg.com/vi/fY1LlkKLDvU/hqdefault.jpg"
  },
  {
    id: "IbcvxRTiyA4",
    title: "【高音質】相鉄線 快速 横浜ゆき 全区間車内放送＋LCD再現",
    published: "2026-08-31",
    url: "https://www.youtube.com/watch?v=IbcvxRTiyA4",
    thumbnail: "https://i.ytimg.com/vi/IbcvxRTiyA4/hqdefault.jpg"
  },
  {
    id: "e-bu9EcsCgY",
    title: "【実車同期】小田急線 快速急行 新宿ゆき 全区間車内放送＋LCD同期ズレ再現",
    published: "2026-07-20",
    url: "https://www.youtube.com/watch?v=e-bu9EcsCgY",
    thumbnail: "https://i.ytimg.com/vi/e-bu9EcsCgY/hqdefault.jpg"
  },
  {
    id: "Hs6AryFPiAU",
    title: "【動画】東急東横線 急行 元町・中華街ゆき 全区間放送＋LCD再現",
    published: "2026-07-15",
    url: "https://www.youtube.com/watch?v=Hs6AryFPiAU",
    thumbnail: "https://i.ytimg.com/vi/Hs6AryFPiAU/hqdefault.jpg"
  },
  {
    id: "zcoL4yaIPhw",
    title: "小田急小田原線 急行 本厚木ゆき 車内放送＋LCD再現（新宿〜本厚木）",
    published: "2025-10-12",
    url: "https://www.youtube.com/watch?v=zcoL4yaIPhw",
    thumbnail: "https://i.ytimg.com/vi/zcoL4yaIPhw/hqdefault.jpg"
  },
  {
    id: "Dg4TMuqxXNw",
    title: "【全区間再現】相鉄・JR直通線 各駅停車 新宿ゆき 海老名→新宿 車内放送＋LCD再現",
    published: "2025-05-29",
    url: "https://www.youtube.com/watch?v=Dg4TMuqxXNw",
    thumbnail: "https://i.ytimg.com/vi/Dg4TMuqxXNw/hqdefault.jpg"
  }
];

/**
 * YouTube RSSから最新動画一覧を自動取得
 */
export async function fetchLatestYouTubeVideos(limit = 6) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

  // 1. rss2json APIを試行 (CORSフリーのパース済みJSON)
  try {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      if (data.status === "ok" && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.slice(0, limit).map(item => {
          // item.link から videoId を抽出
          const videoIdMatch = item.link.match(/[?&]v=([a-zA-Z0-9_-]+)/);
          const videoId = videoIdMatch ? videoIdMatch[1] : item.guid.replace("yt:video:", "");
          const dateStr = item.pubDate ? item.pubDate.split(" ")[0] : "";
          return {
            id: videoId,
            title: item.title,
            published: dateStr,
            url: item.link,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
          };
        });
      }
    }
  } catch (err) {
    console.warn("rss2json API fetch failed, trying proxy fallback...", err);
  }

  // 2. allorigins.win プロキシを試行
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const xmlText = await res.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");
      const entries = Array.from(xmlDoc.querySelectorAll("entry")).slice(0, limit);

      if (entries.length > 0) {
        return entries.map(entry => {
          const videoId = entry.querySelector("videoId")?.textContent || "";
          const title = entry.querySelector("title")?.textContent || "";
          const published = entry.querySelector("published")?.textContent?.slice(0, 10) || "";
          return {
            id: videoId,
            title: title,
            published: published,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
          };
        });
      }
    }
  } catch (err) {
    console.warn("Proxy XML fetch failed, using fallback videos.", err);
  }

  // 3. すべて失敗した場合はフォールバック実在データを返す
  return FALLBACK_VIDEOS.slice(0, limit);
}

/**
 * YouTube動画グリッドを描画
 */
export async function renderYouTubeSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // ローディング表示
  container.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 40px 0; color: #64748B;">
      <p style="font-size: 0.95rem;">YouTube 最新動画を取得中...</p>
    </div>
  `;

  try {
    const videos = await fetchLatestYouTubeVideos(6);
    if (!videos || videos.length === 0) {
      container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #64748B;">動画の読み込みに失敗しました。</p>`;
      return;
    }

    container.innerHTML = videos.map(v => `
      <article class="youtube-card">
        <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="youtube-thumb-wrap" title="${v.title}">
          <img src="${v.thumbnail}" alt="${v.title}" loading="lazy" onerror="this.src='https://i.ytimg.com/vi/${v.id}/mqdefault.jpg'">
          <div class="youtube-play-icon">▶</div>
        </a>
        <div class="youtube-info">
          <div class="youtube-date">${v.published}</div>
          <h3 class="youtube-title">
            <a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a>
          </h3>
        </div>
      </article>
    `).join("");
  } catch (e) {
    console.error("Failed to render youtube section:", e);
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #64748B;">動画を読み込めませんでした。</p>`;
  }
}
