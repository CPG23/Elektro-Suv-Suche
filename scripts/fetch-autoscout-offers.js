const fs = require("node:fs/promises");
const { chromium } = require("playwright");

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
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ locale: "de-AT" });

  for (const [name, path] of models) {
    const url = buildSearchUrl(path, criteria);
    try {
      const text = await fetchRenderedText(page, url);
      offers[name] = parseRenderedText(text, name, criteria, url).slice(0, MAX_OFFERS_PER_MODEL);
      debug[name] = buildDebug(text, name, url);
      console.log(`${name}: ${offers[name].length} Treffer`);
    } catch (error) {
      offers[name] = [];
      debug[name] = { url, error: error.message };
      console.warn(`${name}: keine Treffer geladen (${error.message})`);
    }
  }

  await browser.close();

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

async function fetchRenderedText(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
  await dismissConsent(page);
  await page.waitForTimeout(4500);
  return page.locator("body").innerText({ timeout: 15000 });
}

async function dismissConsent(page) {
  const labels = [/Alle akzeptieren/i, /Akzeptieren/i, /Zustimmen/i, /Einverstanden/i];
  for (const label of labels) {
    const button = page.getByRole("button", { name: label }).first();
    if (await button.count()) {
      try {
        await button.click({ timeout: 1500 });
        await page.waitForTimeout(1200);
        return;
      } catch (_) {
        // Ignore missing or covered consent buttons.
      }
    }
  }
}

function parseRenderedText(text, modelName, criteria, searchUrl) {
  const lines = text
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
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

function buildDebug(text, modelName, url) {
  const lines = text
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const modelToken = modelName.split(/\s+/)[1] || modelName;
  const normalized = text.toLowerCase();

  return {
    url,
    textLength: text.length,
    lineCount: lines.length,
    hasAutoscout: normalized.includes("autoscout"),
    hasModelToken: normalized.includes(modelToken.toLowerCase()),
    sampleLines: lines.slice(110, 145)
  };
}

function isDuplicate(offers, offer) {
  return offers.some((existing) => existing.title === offer.title && existing.mileage === offer.mileage);
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
