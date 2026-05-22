const fs = require("node:fs/promises");

const MAX_OFFERS_PER_MODEL = 5;
const OUTPUT_FILE = "autoscout-offers.json";

const models = [
  ["BYD SEALION 7", "byd/sealion-7"],
  ["Toyota C-HR+", "toyota/c-hr"],
  ["Kia EV5", "kia/ev5"],
  ["XPENG G6", "xpeng/g6"],
  ["MG MGS6 EV", "mg/mgs6"],
  ["Hyundai IONIQ 9", "hyundai/ioniq-9"],
  ["Mazda CX-6e", "mazda/cx-6e"],
  ["Jeep Compass Elektro", "jeep/compass"],
  ["Leapmotor C10 ProMax", "leapmotor/c10"],
  ["VW ID.4 GTX", "volkswagen/id-4"],
  ["Skoda Enyaq 85", "skoda/enyaq"],
  ["BMW iX1 eDrive20", "bmw/ix1"]
];

async function main() {
  const criteria = getCriteria();
  const offers = {};
  const debug = {};

  for (const [name, path] of models) {
    const url = buildSearchUrl(path, criteria);
    try {
      const html = await fetchHtml(url);
      offers[name] = parseOffers(html, name, criteria, url).slice(0, MAX_OFFERS_PER_MODEL);
      debug[name] = buildDebug(html, name, url);
      console.log(`${name}: ${offers[name].length} Treffer`);
    } catch (error) {
      offers[name] = [];
      debug[name] = { url, error: error.message };
      console.warn(`${name}: keine Treffer geladen (${error.message})`);
    }
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify({
    updatedAt: new Date().toISOString(),
    criteria,
    offers,
    debug
  }, null, 2) + "\n");
}

function getCriteria() {
  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);

  return {
    country: "AT",
    maxMileageKm: 5000,
    fromYear: since.getFullYear()
  };
}

function buildSearchUrl(path, criteria) {
  const params = new URLSearchParams({
    atype: "C",
    cy: criteria.country,
    sort: "standard",
    desc: "0"
  });

  return `https://www.autoscout24.at/lst/${path}/re_${criteria.fromYear}?${params.toString()}`;
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "de-AT,de;q=0.9,en;q=0.7",
      "user-agent": "Mozilla/5.0 (compatible; ElektroSUVSuche/1.0; +https://cpg23.github.io/Elektro-Suv-Suche/)"
    }
  });

  if (!response.ok) {
    throw new Error(`AutoScout antwortete mit ${response.status}`);
  }

  return response.text();
}

function parseOffers(html, modelName, criteria, searchUrl) {
  const linkedOffers = parseLinkedOffers(html, criteria);
  if (linkedOffers.length) {
    return linkedOffers;
  }

  return parseTextOffers(html, modelName, criteria, searchUrl);
}

function buildDebug(html, modelName, url) {
  const lines = textLinesFromHtml(html);
  const normalized = html.toLowerCase();
  const modelToken = modelName.split(/\s+/)[1] || modelName;

  return {
    url,
    htmlLength: html.length,
    lineCount: lines.length,
    hasAutoscout: normalized.includes("autoscout"),
    hasModelToken: normalized.includes(modelToken.toLowerCase()),
    offerLinkCount: [...html.matchAll(/href="([^"]*\/angebote\/[^"]+)"/g)].length,
    sampleLines: lines.slice(100, 125)
  };
}

function parseLinkedOffers(html, criteria) {
  const matches = [...html.matchAll(/href="([^"]*\/angebote\/[^"]+)"/g)];
  const seen = new Set();
  const offers = [];

  for (const match of matches) {
    const url = absolutize(match[1]);
    const cleanUrl = url.split("?")[0];
    if (seen.has(cleanUrl)) {
      continue;
    }
    seen.add(cleanUrl);

    const start = Math.max(0, match.index - 1800);
    const end = Math.min(html.length, match.index + 3200);
    const chunk = decodeEntities(stripTags(html.slice(start, end))).replace(/\s+/g, " ").trim();
    const title = extractTitle(chunk);
    const offer = {
      title: title || "AutoScout-Angebot",
      price: extractFirst(chunk, [/€\s?[\d. ]{4,}/, /[\d. ]{4,}\s?€/]),
      mileage: extractFirst(chunk, [/\b\d{1,3}(?:[.\s]\d{3})?\s?km\b/i]),
      year: extractFirst(chunk, [/\b(?:0[1-9]|1[0-2])\/20(?:25|26|27)\b/, /\b20(?:25|26|27)\b/]),
      location: extractLocation(chunk),
      url: cleanUrl
    };

    if (matchesCriteria(offer, criteria)) {
      offers.push(offer);
    }

    if (offers.length >= MAX_OFFERS_PER_MODEL) {
      break;
    }
  }

  return offers;
}

function parseTextOffers(html, modelName, criteria, searchUrl) {
  const lines = textLinesFromHtml(html);
  const modelTerms = modelName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/\s+/)
    .filter((term) => term.length > 2 && !/^(85|gtx|ev|suv|elektro)$/.test(term));
  const offers = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const normalizedLine = line
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (!modelTerms.every((term) => normalizedLine.includes(term))) {
      continue;
    }

    const windowLines = lines.slice(i, i + 12);
    const joined = windowLines.join(" ");
    const offer = {
      title: line,
      price: extractFirst(joined, [/€\s?[\d. ]{4,}/, /[\d. ]{4,}\s?€/]),
      mileage: extractFirst(joined, [/\b\d{1,3}(?:[.\s]\d{3})?\s?km\b/i]),
      year: extractFirst(joined, [/\b(?:0[1-9]|1[0-2])\/20(?:25|26|27)\b/, /\b20(?:25|26|27)\b/]),
      location: extractLocation(joined),
      url: searchUrl
    };

    if (offer.price && matchesCriteria(offer, criteria) && !isDuplicate(offers, offer)) {
      offers.push(offer);
    }

    if (offers.length >= MAX_OFFERS_PER_MODEL) {
      break;
    }
  }

  return offers;
}

function isDuplicate(offers, offer) {
  return offers.some((existing) => existing.title === offer.title && existing.mileage === offer.mileage);
}

function absolutize(url) {
  if (url.startsWith("http")) {
    return url;
  }
  return `https://www.autoscout24.at${url.startsWith("/") ? "" : "/"}${url}`;
}

function stripTags(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

function textLinesFromHtml(value) {
  return decodeEntities(value)
    .replace(/<script[\s\S]*?<\/script>/gi, "\n")
    .replace(/<style[\s\S]*?<\/style>/gi, "\n")
    .replace(/<(h1|h2|h3|h4|p|div|li|span|article|section|br)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&euro;/g, "€");
}

function extractTitle(chunk) {
  const compact = chunk.replace(/\s+/g, " ").trim();
  const titleMatch = compact.match(/([A-Z0-9][A-Za-z0-9+\-. ]{2,80}(?:Elektro|EV|BEV|AWD|GTX|eDrive20|Enyaq|SEALION|IONIQ|Compass)[A-Za-z0-9+\-. ]{0,80})/);
  return titleMatch ? titleMatch[1].trim() : "";
}

function extractFirst(chunk, patterns) {
  for (const pattern of patterns) {
    const match = chunk.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }
  return "";
}

function extractLocation(chunk) {
  const match = chunk.match(/\b(1010|1020|1030|1040|1050|1060|1070|1080|1090|1100|1110|1120|1130|1140|1150|1160|1170|1180|1190|1200|[2-9]\d{3})\s+[A-ZÄÖÜ][A-Za-zÄÖÜäöüß.\- ]{2,40}/);
  return match ? match[0].trim() : "";
}

function matchesCriteria(offer, criteria) {
  return parseMileage(offer.mileage) <= criteria.maxMileageKm && parseYear(offer.year) >= criteria.fromYear;
}

function parseMileage(value) {
  if (!value) {
    return Number.POSITIVE_INFINITY;
  }

  const normalized = value.replace(/[^\d]/g, "");
  return normalized ? Number(normalized) : Number.POSITIVE_INFINITY;
}

function parseYear(value) {
  if (!value) {
    return 0;
  }

  const match = value.match(/20(?:25|26|27)/);
  return match ? Number(match[0]) : 0;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
