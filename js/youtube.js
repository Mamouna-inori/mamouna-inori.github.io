/**
 * YouTube 最新動画取得モジュール
 * チャンネルID: UCF4ZQBIbNjgcmIQMsHVF3rA (@Mamouna_Inori)
 */

export const YOUTUBE_CHANNEL_ID = "UCF4ZQBIbNjgcmIQMsHVF3rA";
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Mamouna_Inori";

/**
 * YouTube RSSから最新動画一覧を自動取得
 */
export async function fetchLatestYouTubeVideos(limit = 6) {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

  // 1. rss2json APIを試行 (パース済みJSON)
  try {
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    const res = await fetch(apiUrl);
    if (res.ok) {
      const data = await res.json();
      if (data.status === "ok" && Array.isArray(data.items) && data.items.length > 0) {
        return data.items.slice(0, limit).map(item => {
          const match = item.link.match(/[?&]v=([a-zA-Z0-9_-]+)/);
          const videoId = match ? match[1] : item.guid.replace("yt:video:", "");
          const dateStr = item.pubDate ? item.pubDate.split(" ")[0].replace(/-/g, ".") : "";
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
    console.warn("rss2json fetch failed, trying proxy fallback...", err);
  }

  // 2. allorigins proxyを試行
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const xmlText = await res.text();
      const videos = parseRssXml(xmlText, limit);
      if (videos.length > 0) return videos;
    }
  } catch (err) {
    console.warn("allorigins proxy failed, trying codetabs fallback...", err);
  }

  // 3. codetabs proxyを試行
  try {
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`;
    const res = await fetch(proxyUrl);
    if (res.ok) {
      const xmlText = await res.text();
      const videos = parseRssXml(xmlText, limit);
      if (videos.length > 0) return videos;
    }
  } catch (err) {
    console.warn("codetabs proxy failed.", err);
  }

  // すべて失敗した場合は空配列を返す（架空・過去のタイトルはハードコードしない）
  return [];
}

/**
 * RSS XML文字列をパースして動画一覧を抽出
 */
function parseRssXml(xmlText, limit) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const entries = Array.from(xmlDoc.querySelectorAll("entry")).slice(0, limit);

    return entries.map(entry => {
      const videoId = entry.querySelector("videoId")?.textContent || "";
      const title = entry.querySelector("title")?.textContent || "";
      const rawDate = entry.querySelector("published")?.textContent?.slice(0, 10) || "";
      const dateStr = rawDate.replace(/-/g, ".");
      return {
        id: videoId,
        title: title,
        published: dateStr,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      };
    }).filter(v => v.id && v.title);
  } catch (e) {
    console.error("Failed to parse RSS XML:", e);
    return [];
  }
}

/**
 * YouTube動画グリッドを描画
 */
export async function renderYouTubeSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const videos = await fetchLatestYouTubeVideos(6);

  // 取得に成功した場合：最新動画で置き換える
  if (videos && videos.length > 0) {
    container.innerHTML = videos.map(v => `
      <article class="movie-card">
        <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="movie-thumb-wrap" title="${v.title}">
          <img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy" onerror="this.src='https://i.ytimg.com/vi/${v.id}/mqdefault.jpg'">
          <div class="movie-play-overlay">▶</div>
        </a>
        <div class="movie-info">
          <span class="movie-date">${v.published}</span>
          <h3 class="movie-title">
            <a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a>
          </h3>
        </div>
      </article>
    `).join("");
  } else {
    // 取得に失敗した場合：偽のタイトルを出さず、明瞭に案内を表示
    container.innerHTML = `
      <div class="movie-error-box">
        <p>最新の動画を直接取得できませんでした。</p>
        <p style="margin-top: 6px;">最新の動画は公式YouTubeチャンネルにてご覧いただけます。</p>
      </div>
    `;
  }
}
