let DATA_UPDATED_AT = "2026-05-06";

let cars = [
  {
    name: "BYD SEALION 7",
    origin: "China",
    modelYear: "MJ 2026",
    status: "neu verfügbar",
    price: 42990,
    priceLabel: "ab € 42.990 Aktionspreis",
    range: 502,
    chargeMinutes: 18,
    chargeLabel: "30-80 % ab 18 min",
    power: 530,
    powerLabel: "313 oder 530 PS",
    battery: "BYD Blade Battery",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/BYD_Sealion_7%2C_Frankfurt_%2820251115-P1074666%29.jpg",
    source: "https://www.bydauto.at/modelle/sealion-7",
    extras: ["bis 230 kW DC", "Panoramadach", "bis 1.789 l Ladevolumen", "Komfortsitze"],
    note: "Der sichtbarste BYD-Kandidat in der Zielklasse: stark, schnell ladend und preislich direkt im Sweet Spot.",
    score: 97
  },
  {
    name: "Toyota C-HR+",
    origin: "Japan",
    modelYear: "MJ 2026",
    status: "seit April im Handel",
    price: 40990,
    priceLabel: "ab € 40.990",
    range: 607,
    chargeMinutes: 28,
    chargeLabel: "10-80 % ca. 28 min",
    power: 343,
    powerLabel: "167 bis 343 PS",
    battery: "57,7 oder 77 kWh",
    image: "https://scene7.toyota.eu/is/image/toyotaeurope/93817-toyotac-hrdplline-up-at-hotel-05-web-lr?wid=900",
    source: "https://www.toyota.at/unternehmen/news/2026/der-neue-toyota-c-hr",
    extras: ["Wärmepumpe", "Batterievorkonditionierung", "Toyota T-Mate", "bis 22 kW AC"],
    note: "Sehr starker Allrounder: hohe Reichweite, kompakte SUV-Form und kurze DC-Ladezeit.",
    score: 96
  },
  {
    name: "Kia EV5",
    origin: "Südkorea",
    modelYear: "MJ 2026",
    status: "neu bestellbar",
    price: 42590,
    priceLabel: "ab € 42.590 Aktionspreis",
    range: 530,
    chargeMinutes: 30,
    chargeLabel: "10-80 % ca. 30 min",
    power: 218,
    powerLabel: "218 PS",
    battery: "81,4 kWh",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/2024_Kia_EV5_EV_in_Sky_Blue%2C_front_right.jpg",
    source: "https://www.kia.com/at/kaufberater/aktuelle-aktionen/ev5-2026/",
    extras: ["7 Jahre Garantie", "viel Innenraum", "Assistenzsysteme", "Infotainment"],
    note: "Sehr familiennaher Kauf: großer Akku, gute Garantie und ein noch moderater Einstiegspreis.",
    score: 92
  },
  {
    name: "XPENG G6",
    origin: "China",
    modelYear: "MJ 2026",
    status: "neu in Österreich",
    price: 43600,
    priceLabel: "ab € 43.600",
    range: 455,
    chargeMinutes: 10,
    chargeLabel: "20-80 % ca. 10 min",
    power: 286,
    powerLabel: "ca. 286 PS Standard Range",
    battery: "800-V-Plattform",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/38/XPeng_G6_facelift_China_2025-03-31.jpg",
    source: "https://www.xpeng.com/at/model/g6",
    extras: ["800 V", "XPILOT Assist", "Massage-/Klima-Sitze", "15,6 Zoll Display"],
    note: "Tech-Favorit aus China: sehr schnelles Laden und viel Serienkomfort, Reichweite solide statt rekordverdächtig.",
    score: 91
  },
  {
    name: "MG MGS6 EV",
    origin: "China",
    modelYear: "MJ 2026",
    status: "Österreich-Start",
    price: 40000,
    priceLabel: "ca. € 40.000 erwartet",
    range: 530,
    chargeMinutes: 38,
    chargeLabel: "10-80 % ca. 38 min",
    power: 362,
    powerLabel: "244 oder 362 PS",
    battery: "77 kWh",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a3/%28SGP-Singapore%29_Showcar_MGS6_EV_No-plate_2026-01-09.jpg",
    source: "https://www.weekend.at/motor/mg-mgs6-ev-elektro-suv-reichweite-preis",
    estimated: true,
    extras: ["Head-up-Display optional", "12,8 Zoll Touchscreen", "360 Grad Kamera", "Panoramadach je nach Linie"],
    note: "Preis-Leistungs-Kandidat: viel Leistung und Reichweite, Preis aktuell noch als Erwartung.",
    score: 90
  },
  {
    name: "Hyundai IONIQ 9",
    origin: "Südkorea",
    modelYear: "MJ 2026",
    status: "neu verfügbar",
    price: 59490,
    priceLabel: "ab € 59.490 Aktionspreis",
    range: 620,
    chargeMinutes: 24,
    chargeLabel: "10-80 % ca. 24 min",
    power: 428,
    powerLabel: "218 bis 428 PS",
    battery: "110,3 kWh",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/2026_Hyundai_Ioniq_9%2C_front_NYIAS_2025.jpg",
    source: "https://www.hyundai.at/ioniq-9/technik",
    extras: ["6 oder 7 Sitze", "800 V Technik", "V2L", "bis 2.500 kg Anhängelast"],
    note: "Langstrecken- und Familien-Luxus: am oberen Preislimit, dafür mit der größten Reichweite und viel Platz.",
    score: 89
  },
  {
    name: "Mazda CX-6e",
    origin: "Japan",
    modelYear: "MJ 2026",
    status: "Vorverkauf seit April",
    price: 46990,
    priceLabel: "ab € 46.990",
    range: 484,
    chargeMinutes: 24,
    chargeLabel: "10-80 % ca. 24 min",
    power: 258,
    powerLabel: "258 PS",
    battery: "78 kWh",
    image: "https://at.mazda-press.com/globalassets/generic-cms-images/02-heroes/2026/all-new-mazda-cx-6e/hero-mazda_cx-6e-03-mob.jpg/highdefinitionhalfsize?token=hvl7YCs1sZRGMIxNU383JXb6IbQQ9DhFC25bDGIJoKg1",
    source: "https://at.mazda-press.com/news/2026/mazda-cx-6e-vorverkauf-startet-mit-1.-april/",
    extras: ["Head-up-Display", "26 Zoll Display", "Panoramaglasdach", "23 Lautsprecher"],
    note: "Komfort- und Design-Wahl: sehr gute Serienausstattung und schnelle 10-80-Prozent-Ladung.",
    score: 87
  },
  {
    name: "Jeep Compass Elektro",
    origin: "USA/Stellantis",
    modelYear: "MJ 2026",
    status: "neue Generation",
    price: 43280,
    priceLabel: "ab € 43.280 Aktionspreis",
    range: 500,
    chargeMinutes: 30,
    chargeLabel: "ca. 30 min geschätzt",
    power: 213,
    powerLabel: "213 PS",
    battery: "74 kWh",
    image: "https://www.jeep.at/content/dam/jeep/crossmarket/compass-my26/electric/hero/desktop/jeep-compass-bev-hero-desktop.jpg",
    source: "https://www.jeep.at/neuer-jeep-compass/elektro",
    estimated: true,
    extras: ["STLA Medium", "4 Jahre Garantie bei Finanzierung", "robustes SUV-Design", "kompakte Klasse"],
    note: "Interessant für Jeep-Fans: solide Reichweite und markentypischer Auftritt zu fairem Aktionspreis.",
    score: 84
  },
  {
    name: "Leapmotor C10 ProMax",
    origin: "China",
    modelYear: "MJ 2026",
    status: "neue ProMax-Varianten",
    price: 40900,
    priceLabel: "ab ca. € 40.900",
    range: 510,
    chargeMinutes: 30,
    chargeLabel: "30-80 % ca. 30 min",
    power: 598,
    powerLabel: "299 oder 598 PS",
    battery: "81,9 kWh",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Leapmotor_C10_IAA_2023_1X7A0247.jpg",
    source: "https://leapmotor.autos/leapmotor-c10/",
    estimated: true,
    extras: ["Wärmepumpe", "Panoramadach", "360 Grad Kamera", "bis 800 V bei AWD"],
    note: "Der aggressive China-Preisbrecher: sehr viel Leistung oder Reichweite für wenig Geld, Händlerlage prüfen.",
    score: 86
  },
  {
    name: "VW ID.4 GTX",
    origin: "Deutschland",
    modelYear: "MJ 2026",
    status: "neu verfügbar",
    price: 45590,
    priceLabel: "ab € 45.590",
    range: 522,
    chargeMinutes: 26,
    chargeLabel: "10-80 % ca. 26 min",
    power: 340,
    powerLabel: "340 PS AWD",
    battery: "77 kWh",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Volkswagen_ID.4_GTX_1X7A0301.jpg",
    source: "https://www.volkswagen.at/id4/id4-gtx",
    extras: ["4MOTION Allrad", "bis 185 kW DC", "250 kW Systemleistung", "GTX-Sportfahrwerk"],
    note: "Bewährter Allrounder aus Deutschland: 522 km WLTP, 340 PS AWD und 185-kW-Schnellladen zu fairem Einstiegspreis.",
    score: 89
  },
  {
    name: "Škoda Enyaq 85",
    origin: "VW Konzern",
    modelYear: "MJ 2026",
    status: "Facelift verfügbar",
    price: 48900,
    priceLabel: "ab € 48.900",
    range: 566,
    chargeMinutes: 28,
    chargeLabel: "10-80 % ca. 28 min",
    power: 286,
    powerLabel: "286 PS",
    battery: "77 kWh",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/2025_Skoda_Enyaq_sportline_%28facelift%29_-_front.jpg",
    source: "https://www.skoda.at/enyaq/enyaq",
    extras: ["Wärmepumpe serienmäßig", "Frunk", "Modern Solid Design", "175 kW DC"],
    note: "Hohe Reichweite und VW-Qualität: Das Enyaq-Facelift liefert 566 km WLTP und 175-kW-DC-Laden zu einem ausgewogenen Preis.",
    score: 90
  },
  {
    name: "BMW iX1 eDrive20",
    origin: "Deutschland",
    modelYear: "MJ 2026",
    status: "neu verfügbar",
    price: 49410,
    priceLabel: "ab € 49.410",
    range: 514,
    chargeMinutes: 30,
    chargeLabel: "10-80 % ca. 30 min",
    power: 204,
    powerLabel: "204 PS",
    battery: "65,2 kWh",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/BMW_iX1_1X7A6827.jpg",
    source: "https://www.bmw.at/de/all-models/bmw-i/ix1/bmw-ix1.html",
    extras: ["M Sport serienmäßig", "SiC-Inverter 2026", "bis 130 kW DC", "Live Cockpit Plus"],
    note: "BMW-Premium zum vernünftigen Preis: 514 km WLTP dank 2026-Facelift – 130 kW DC-Maximum ist der einzige Schwachpunkt.",
    score: 83
  }
];

let upcoming = [
  {
    date: "Sommer 2026",
    name: "Mazda CX-6e Händlerstart",
    text: "Der Vorverkauf läuft seit April; die ersten Fahrzeuge sollen ab Sommer in österreichischen Schauräumen stehen.",
    price: "ab € 46.990"
  },
  {
    date: "2026",
    name: "MG MGS6 EV breite Verfügbarkeit",
    text: "Österreich-Start ist angekündigt; Preis wird noch final bestätigt, erwartet wird die Einstiegsversion um die untere Grenze der Zielklasse.",
    price: "ca. € 40.000"
  },
  {
    date: "2026",
    name: "Leapmotor C10 ProMax / AWD",
    text: "Die stärkeren 81,9-kWh-Varianten liegen je nach Händlerangebot knapp über € 40.000 und sind damit für diese Auswahl relevanter als die günstigere Basis.",
    price: "ca. € 40.900-42.900"
  },
  {
    date: "Ausgeblendet",
    name: "Unter € 40.000",
    text: "BYD SEAL U, Škoda Epiq, Toyota Urban Cruiser und VW ID. Cross sind interessant, liegen aber nach aktuellem Stand unter der gewünschten Preisspanne. VW ID.4 GTX, Škoda Enyaq 85 und BMW iX1 eDrive20 sind bereits in der Hauptliste.",
    price: "nicht in Liste"
  }
];

const grid = document.querySelector("#carGrid");
const sortSelect = document.querySelector("#sortSelect");
const rangeFilter = document.querySelector("#rangeFilter");
const upcomingList = document.querySelector("#upcomingList");
const updateButton = document.querySelector("#updateButton");
const updatePanel = document.querySelector("#updatePanel");

function renderCars() {
  const minRange = Number(rangeFilter.value);
  const sort = sortSelect.value;
  const sorted = cars
    .filter((car) => car.price >= 40000 && car.price <= 60000 && car.range >= minRange)
    .sort((a, b) => {
      if (sort === "range") return b.range - a.range;
      if (sort === "price") return a.price - b.price;
      if (sort === "power") return b.power - a.power;
      if (sort === "charge") return a.chargeMinutes - b.chargeMinutes;
      return b.score - a.score;
    });

  grid.innerHTML = sorted.map((car) => `
    <article class="car-card">
      <img src="${car.image}" alt="${car.name}" loading="lazy" onerror="this.style.visibility='hidden'">
      <div class="card-body">
        <div class="card-title">
          <h3>${car.name}</h3>
          <span class="badge">${car.status}</span>
        </div>
        <div class="meta-row">
          <span class="origin">${car.origin}</span>
          <span class="badge">${car.modelYear}</span>
        </div>
        <div class="price">${car.priceLabel}</div>
        <div class="specs">
          <div class="spec"><span>Reichweite</span><strong>bis ${car.range} km WLTP</strong></div>
          <div class="spec"><span>Ladedauer</span><strong>${car.chargeLabel}</strong></div>
          <div class="spec"><span>Leistung</span><strong>${car.powerLabel}</strong></div>
          <div class="spec"><span>Batterie</span><strong>${car.battery}</strong></div>
        </div>
        <div class="extras">${car.extras.map((extra) => `<span>${extra}</span>`).join("")}</div>
        <p class="note">${car.note}</p>
        <a class="source-link" href="${car.source}" target="_blank" rel="noreferrer">Quelle prüfen</a>
      </div>
    </article>
  `).join("");
}

function renderUpcoming() {
  upcomingList.innerHTML = upcoming.map((item) => `
    <article class="timeline-item">
      <time>${item.date}</time>
      <div>
        <h3>${item.name}</h3>
        <p>${item.text}</p>
      </div>
      <div class="mini-price">${item.price}</div>
    </article>
  `).join("");
}

sortSelect.addEventListener("change", renderCars);
rangeFilter.addEventListener("change", renderCars);
updateButton.addEventListener("click", () => runUpdateCheck({ automatic: false }));

renderCars();
renderUpcoming();
runUpdateCheck({ automatic: true });

async function runUpdateCheck({ automatic }) {
  updateButton.disabled = true;
  updateButton.textContent = automatic ? "Prüfe Daten..." : "Suche läuft...";
  updatePanel.hidden = false;
  updatePanel.innerHTML = `
    <h3>${automatic ? "Automatische Aktualitätsprüfung" : "Aktualisierungen werden gesucht"}</h3>
    <p>Die Seite lädt die neueste hinterlegte Fahrzeugliste und übernimmt neue Modelle automatisch, sobald sie in der Datendatei verfügbar sind.</p>
  `;

  const result = await loadFreshData();
  const checkedAt = new Intl.DateTimeFormat("de-AT", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date());
  const volatileCars = cars.filter((car) => car.estimated || /Aktionspreis|erwartet|ca\./i.test(car.priceLabel));
  const sourceLinks = volatileCars
    .map((car) => `<li><a href="${car.source}" target="_blank" rel="noreferrer">${car.name}</a></li>`)
    .join("");
  const updateText = result.loaded
    ? `${result.carCount} Modelle wurden aus der aktuellen Datendatei geladen.`
    : "Die Online-Datendatei konnte nicht geladen werden; die Seite nutzt die eingebauten Fallback-Daten.";

  updatePanel.innerHTML = `
    <h3>Update-Check abgeschlossen</h3>
    <p>
      ${updateText} Datenstand: ${formatDataDate(DATA_UPDATED_AT)}. Prüfung am ${checkedAt}.
      Besonders prüfenswert sind ${volatileCars.length} Modelle mit Aktionspreis, Schätzwert oder angekündigter Verfügbarkeit.
    </p>
    <ul class="update-list">${sourceLinks}</ul>
  `;
  updateButton.disabled = false;
  updateButton.textContent = "Aktualisierungen suchen";
}

async function loadFreshData() {
  if (!window.fetch) {
    return { loaded: false, carCount: cars.length };
  }

  try {
    const response = await fetch(`data.json?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Datendatei nicht erreichbar");
    }
    const data = await response.json();
    if (!Array.isArray(data.cars) || !Array.isArray(data.upcoming)) {
      throw new Error("Datendatei ist unvollständig");
    }

    cars = data.cars;
    upcoming = data.upcoming;
    DATA_UPDATED_AT = data.updatedAt || DATA_UPDATED_AT;
    renderCars();
    renderUpcoming();
    return { loaded: true, carCount: cars.length };
  } catch (error) {
    return { loaded: false, carCount: cars.length, error };
  }
}

function formatDataDate(value) {
  return new Intl.DateTimeFormat("de-AT", { dateStyle: "medium" }).format(new Date(`${value}T12:00:00`));
}
