const fs = require("node:fs/promises");

const OUTPUT_FILE = "model-candidates.json";
const EXISTING_MODELS_FILE = "data.json";
const MAX_CANDIDATES = 12;
const REQUEST_TIMEOUT_MS = 15000;

const searches = [
  "Elektro SUV Österreich 2026 Preis Reichweite",
  "Elektro-SUV Österreich 2027 angekündigt Preis",
  "neuer Elektro SUV Österreich 2026 40000 60000 Euro",
  "BYD XPENG MG Leapmotor Elektro SUV Österreich 2026 Preis",
  "Skoda VW Kia Hyundai Toyota Elektro SUV Österreich 2027"
];

async function main() {
  const existingNames = await loadExistingModelNames();
  const discovered = [];
  const diagnostics = [];

  for (const query of searches) {
    const result = await fetchBingRss(query);
    diagnostics.push(result.diagnostic);

    for (const item of result.items) {
      if (!looksRelevant(item) || isKnownModel(item, existingNames) || isDuplicate(discovered, item)) {
        continue;
      }
      discovered.push({
        title: item.title,
        reason: summarizeReason(item, query),
        url: item.link,
        sourceQuery: query
      });
    }
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    items: discovered.slice(0, MAX_CANDIDATES),
    diagnostics,
    note: "Automatisch recherchierte Kandidaten. Neue Modelle werden erst nach Pruefung vollstaendiger Fahrzeugdaten in die Hauptliste uebernommen."
  };

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(payload, null, 2) + "\n");
  console.log(`${payload.items.length} moegliche Kandidaten gespeichert.`);

  const failedSearches = diagnostics.filter((entry) => entry.status !== "ok");
  if (failedSearches.length) {
    console.warn(`${failedSearches.length} Suchabfragen konnten nicht geladen werden, der Lauf wurde aber stabil abgeschlossen.`);
  }
}

async function loadExistingModelNames() {
  try {
    const data = JSON.parse(await fs.readFile(EXISTING_MODELS_FILE, "utf8"));
    const cars = Array.isArray(data.cars) ? data.cars : Array.isArray(data) ? data : [];
    return cars.map((car) => normalize([car.brand, car.model, car.name, car.title].filter(Boolean).join(" ")));
  } catch (error) {
    console.warn(`Bestehende Modelldaten konnten nicht gelesen werden: ${error.message}`);
    return [];
  }
}

async function fetchBingRss(query) {
  const url = `https://www.bing.com/search?format=rss&q=${encodeURIComponent(query)}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 Elektro-SUV-Radar/1.0"
      },
      signal: controller.signal
    });

    if (!response.ok) {
      return {
        items: [],
        diagnostic: {
          query,
          status: "http-error",
          detail: `HTTP ${response.status}`
        }
      };
    }

    const xml = await response.text();
    const items = parseRssItems(xml);
    return {
      items,
      diagnostic: {
        query,
        status: "ok",
        count: items.length
      }
    };
  } catch (error) {
    return {
      items: [],
      diagnostic: {
        query,
        status: "network-error",
        detail: error.name === "AbortError" ? "timeout" : error.message
      }
    };
  } finally {
    clearTimeout(timeout);
  }
}

function parseRssItems(xml) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => {
    const itemXml = match[1];
    return {
      title: decodeXml(extractTag(itemXml, "title")),
      link: decodeXml(extractTag(itemXml, "link")),
      description: stripTags(decodeXml(extractTag(itemXml, "description")))
    };
  });
}

function looksRelevant(item) {
  const text = normalize(`${item.title} ${item.description}`);
  const hasElectric = /(elektro|electric|bev|strom|e-suv|elektrisch)/.test(text);
  const hasSuv = /(suv|crossover|kompakt-suv|familien-suv)/.test(text);
  const hasYear = /(2026|2027|modelljahr|neu|ankuendig|kommt|startet|vorverkauf)/.test(text);
  const hasAustriaOrEurope = /(oesterreich|österreich|austria|at\b|europa|euro)/.test(text);

  return hasElectric && hasSuv && hasYear && hasAustriaOrEurope;
}

function isKnownModel(item, existingNames) {
  const text = normalize(`${item.title} ${item.description}`);
  return existingNames.some((name) => name && (text.includes(name) || name.includes(text)));
}

function isDuplicate(items, item) {
  const normalizedTitle = normalize(item.title);
  return items.some((existing) => normalize(existing.title) === normalizedTitle || existing.url === item.link);
}

function summarizeReason(item, query) {
  const description = item.description.replace(/\s+/g, " ").trim();
  if (description) {
    return description.slice(0, 190);
  }
  return `Gefunden ueber: ${query}`;
}

function extractTag(xml, tagName) {
  const match = xml.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? match[1].trim() : "";
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalize(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
