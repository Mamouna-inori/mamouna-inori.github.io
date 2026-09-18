/**
 * 車内LCD（トレインビジョン）モック生成スクリプト
 * 画像が未配置の場合に、実車さながらの高精細な車内案内表示器SVGを生成します。
 */

export function getLineDefaultColor(lines = []) {
  if (lines.includes("小田急")) return "#1A3A8A";
  if (lines.includes("JR")) return "#008000";
  if (lines.includes("東急")) return "#DA0442";
  if (lines.includes("相鉄")) return "#1C3B6C";
  if (lines.includes("メトロ")) return "#9B7CB6";
  return "#0072BC";
}

export function generateLcdSvg(work, width = 1280, height = 720) {
  const d = work.lcdDesign || {};
  const lineColor = d.lineColor || getLineDefaultColor(work.lines);
  const typeBadge = d.typeBadge || "各駅停車";
  const typeColor = d.typeColor || lineColor;
  const lineName = d.lineName || (work.lines ? work.lines.join("・") + "線" : "案内表示");
  const destination = d.destination || "行先";
  const destinationEn = d.destinationEn || "Destination";
  const nextStation = d.nextStation || "次駅";
  const nextStationEn = d.nextStationEn || "Next Station";
  const stationNumber = d.stationNumber || "01";
  const doorSide = d.doorSide || "左側が開きます";
  const carNumber = d.carNumber || "1号車";

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" class="lcd-screen-svg">
  <defs>
    <linearGradient id="bgGrad-${work.slug}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#07111C" />
      <stop offset="100%" stop-color="#020810" />
    </linearGradient>
    <linearGradient id="headerGrad-${work.slug}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#142232" />
      <stop offset="100%" stop-color="#0B1420" />
    </linearGradient>
    <linearGradient id="lineBarGrad-${work.slug}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${lineColor}" stop-opacity="0.8" />
      <stop offset="50%" stop-color="${lineColor}" />
      <stop offset="100%" stop-color="${lineColor}" stop-opacity="0.9" />
    </linearGradient>
    <filter id="lcdGlow-${work.slug}" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <pattern id="scanlines" width="100" height="4" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="100" y2="0" stroke="#000000" stroke-width="1" opacity="0.15" />
    </pattern>
  </defs>

  <!-- 背景 -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad-${work.slug})" />

  <!-- 最上部ステータスバー -->
  <rect x="0" y="0" width="${width}" height="60" fill="url(#headerGrad-${work.slug})" />
  <rect x="0" y="58" width="${width}" height="2" fill="${lineColor}" opacity="0.6" />

  <!-- 号車表示 -->
  <rect x="24" y="12" width="90" height="36" rx="4" fill="#1C2F42" stroke="#375573" stroke-width="1.5" />
  <text x="69" y="36" fill="#E8F4FF" font-family="'Zen Kaku Gothic New', sans-serif" font-size="19" font-weight="700" text-anchor="middle">
    ${carNumber}
  </text>

  <!-- 路線名 -->
  <circle cx="134" cy="30" r="7" fill="${lineColor}" />
  <text x="152" y="37" fill="#E8F4FF" font-family="'Zen Kaku Gothic New', sans-serif" font-size="20" font-weight="700">
    ${lineName}
  </text>

  <!-- ドア案内 & 時計 -->
  <g transform="translate(${width - 240}, 16)">
    <rect x="0" y="0" width="130" height="28" rx="3" fill="#152839" />
    <polygon points="12,14 20,8 20,20" fill="#FFC14A" />
    <polygon points="118,14 110,8 110,20" fill="#FFC14A" />
    <text x="65" y="19" fill="#FFC14A" font-family="'Zen Kaku Gothic New', sans-serif" font-size="13" font-weight="700" text-anchor="middle">
      DOOR
    </text>
  </g>
  <text x="${width - 30}" y="38" fill="#9FBAD3" font-family="'Share Tech Mono', monospace" font-size="22" font-weight="700" text-anchor="end">
    12:34
  </text>

  <!-- メインセクション：行先案内エリア -->
  <g transform="translate(40, 90)">
    <!-- 種別バッジ -->
    <rect x="0" y="0" width="150" height="64" rx="6" fill="${typeColor}" />
    <text x="75" y="43" fill="#FFFFFF" font-family="'Zen Kaku Gothic New', sans-serif" font-size="30" font-weight="900" text-anchor="middle" letter-spacing="2">
      ${typeBadge}
    </text>

    <!-- 行先 -->
    <text x="180" y="48" fill="#E8F4FF" font-family="'Zen Kaku Gothic New', sans-serif" font-size="44" font-weight="900" letter-spacing="3">
      ${destination} <tspan font-size="26" fill="#9FBAD3" font-weight="500">ゆき</tspan>
    </text>
    <text x="182" y="74" fill="#7E9EB8" font-family="'Share Tech Mono', sans-serif" font-size="20" font-weight="500" letter-spacing="1">
      for ${destinationEn}
    </text>
  </g>

  <!-- 中央部：次駅案内大パネル -->
  <rect x="40" y="200" width="${width - 80}" height="320" rx="10" fill="#0C1B2B" stroke="#1C3852" stroke-width="2" />

  <!-- 「次は」ラベル -->
  <g transform="translate(80, 240)">
    <rect x="0" y="0" width="110" height="42" rx="4" fill="#FFC14A" />
    <text x="55" y="29" fill="#07111C" font-family="'Zen Kaku Gothic New', sans-serif" font-size="24" font-weight="900" text-anchor="middle">
      次は
    </text>
    <text x="130" y="30" fill="#9FBAD3" font-family="'Share Tech Mono', sans-serif" font-size="22" font-weight="700">
      Next
    </text>
  </g>

  <!-- 駅ナンバリング記号 -->
  <g transform="translate(80, 310)">
    <rect x="0" y="0" width="140" height="130" rx="14" fill="#07111C" stroke="${lineColor}" stroke-width="6" />
    <rect x="0" y="0" width="140" height="38" rx="8" fill="${lineColor}" />
    <text x="70" y="27" fill="#FFFFFF" font-family="'Share Tech Mono', sans-serif" font-size="20" font-weight="700" text-anchor="middle">
      ${stationNumber.split(" ")[0] || "ST"}
    </text>
    <text x="70" y="100" fill="#E8F4FF" font-family="'Share Tech Mono', monospace" font-size="54" font-weight="900" text-anchor="middle">
      ${stationNumber.split(" ")[1] || "01"}
    </text>
  </g>

  <!-- 駅名（巨大漢字 & 英語） -->
  <g transform="translate(250, 380)">
    <text x="0" y="0" fill="#E8F4FF" font-family="'Zen Kaku Gothic New', sans-serif" font-size="76" font-weight="900" letter-spacing="4" filter="url(#lcdGlow-${work.slug})">
      ${nextStation}
    </text>
    <text x="5" y="52" fill="#9FBAD3" font-family="'Share Tech Mono', sans-serif" font-size="32" font-weight="700" letter-spacing="1">
      ${nextStationEn}
    </text>
  </g>

  <!-- 開扉案内 -->
  <g transform="translate(${width - 380}, 440)">
    <rect x="0" y="0" width="300" height="48" rx="6" fill="#122538" stroke="#254668" stroke-width="1.5" />
    <polygon points="20,24 36,12 36,36" fill="#FFC14A" />
    <text x="50" y="31" fill="#FFC14A" font-family="'Zen Kaku Gothic New', sans-serif" font-size="17" font-weight="700">
      ${doorSide}
    </text>
  </g>

  <!-- 路線図バー（下部） -->
  <rect x="40" y="550" width="${width - 80}" height="14" rx="7" fill="#16293D" />
  <rect x="40" y="550" width="${(width - 80) * 0.45}" height="14" rx="7" fill="url(#lineBarGrad-${work.slug})" />

  <!-- 路線図駅プロット -->
  <g transform="translate(40, 535)">
    <!-- 前駅 -->
    <circle cx="${(width - 80) * 0.15}" cy="22" r="10" fill="#1C3852" stroke="#9FBAD3" stroke-width="3" />
    <text x="${(width - 80) * 0.15}" y="48" fill="#7E9EB8" font-family="'Zen Kaku Gothic New', sans-serif" font-size="14" font-weight="700" text-anchor="middle">前駅</text>

    <!-- 当駅（点滅・ハイライト） -->
    <circle cx="${(width - 80) * 0.45}" cy="22" r="14" fill="#FFC14A" stroke="#FFFFFF" stroke-width="4" />
    <text x="${(width - 80) * 0.45}" y="52" fill="#FFC14A" font-family="'Zen Kaku Gothic New', sans-serif" font-size="17" font-weight="900" text-anchor="middle">${nextStation}</text>

    <!-- 次駅 -->
    <circle cx="${(width - 80) * 0.75}" cy="22" r="10" fill="#122436" stroke="#3D5F80" stroke-width="3" />
    <text x="${(width - 80) * 0.75}" y="48" fill="#5F7E9C" font-family="'Zen Kaku Gothic New', sans-serif" font-size="14" font-weight="700" text-anchor="middle">次駅</text>
  </g>

  <!-- 最下部テロップバー -->
  <rect x="0" y="${height - 64}" width="${width}" height="64" fill="#060C14" />
  <rect x="0" y="${height - 64}" width="${width}" height="2" fill="#1A344D" />
  <text x="30" y="${height - 24}" fill="#FFC14A" font-family="'Zen Kaku Gothic New', sans-serif" font-size="21" font-weight="700" letter-spacing="1">
    [案内] まもうなのPowerPoint車内LCD再現ギャラリーへようこそ。本作品はPowerPointのみで描画・アニメーション構成されています。
  </text>

  <!-- パワポ再現ウォーターマーク -->
  <g transform="translate(${width - 190}, ${height - 24})">
    <rect x="0" y="-18" width="170" height="26" rx="4" fill="#D83B01" opacity="0.9" />
    <text x="85" y="0" fill="#FFFFFF" font-family="'Share Tech Mono', sans-serif" font-size="13" font-weight="700" text-anchor="middle">
      REPRODUCED IN PPT
    </text>
  </g>

  <!-- 微細スキャンラインオーバーレイ -->
  <rect width="${width}" height="${height}" fill="url(#scanlines)" pointer-events="none" />
</svg>
  `.trim();
}

/**
 * HTML文字列またはDOMノードとしてプレースホルダーを挿入
 */
export function renderLcdPlaceholder(container, work) {
  if (!container) return;
  const svgString = generateLcdSvg(work);
  container.innerHTML = svgString;
}
