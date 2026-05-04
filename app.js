const DATA_UPDATED_AT = "2026-05-04";

const cars = [
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
    image: "https://cdn.prod.website-files.com/66347b470d661c296385362e/671a26581f3a9897eaaaa9a5_WFSEALION%207_LHD_Exterior_Atlantis%20grey_Left%20Front%2045.avif",
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
    image: "https://www.kia.com/content/dam/kwcms/kme/global/en/assets/vehicles/ev5-my26/discover/kia-EV5-GTL-my26-packshot-header-w.jpg?auto=compress&cs=tinysrgb&w=1200",
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
    image: "https://s-cdn.xpeng.com/commoncms/prod/2025-07-11/255a30f387674e88a8f3dafb26b49210.jpg?x-oss-process=image%2Fresize%2Cw_1920%2Fquality%2Cq_80%2Finterlace%2C1",
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
    image: "https://s3.eu-central-1.amazonaws.com/at-wknd-s3/production/s3fs-public/sites/default/files/2026-04/11.11.25-MGS6EV--34.JPG",
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
    image: "https://hyundai.azureedge.net/media/4emcznku/hyundai-ioniq-9-exterior-vehicle-to-load-eu-19.jpg?autoorient=true&format=webp&height=1200&quality=90",
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
    image: "https://leapmotor.autos/wp-content/uploads/2025/04/C10_Style-01.png",
    source: "https://leapmotor.autos/leapmotor-c10/",
    estimated: true,
    extras: ["Wärmepumpe", "Panoramadach", "360 Grad Kamera", "bis 800 V bei AWD"],
    note: "Der aggressive China-Preisbrecher: sehr viel Leistung oder Reichweite für wenig Geld, Händlerlage prüfen.",
    score: 86
  }
];

const upcoming = [
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
    text: "BYD SEAL U, Škoda Epiq, Toyota Urban Cruiser und VW ID. Cross sind interessant, liegen aber nach aktuellem Stand unter der gewünschten Preisspanne.",
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
      <img src="${car.image}" alt="${car.name}" loading="lazy">
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
updateButton.addEventListener("click", runUpdateCheck);

renderCars();
renderUpcoming();

function runUpdateCheck() {
  updateButton.disabled = true;
  updateButton.textContent = "Suche läuft...";
  updatePanel.hidden = false;
  updatePanel.innerHTML = `
    <h3>Aktualisierungen werden vorbereitet</h3>
    <p>Ich prüfe den lokalen Datenstand und markiere Einträge, bei denen Preis oder Verfügbarkeit besonders wahrscheinlich neu kontrolliert werden sollten.</p>
  `;

  window.setTimeout(() => {
    const checkedAt = new Intl.DateTimeFormat("de-AT", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date());
    const volatileCars = cars.filter((car) => car.estimated || /Aktionspreis|erwartet|ca\./i.test(car.priceLabel));
    const sourceLinks = volatileCars
      .map((car) => `<li><a href="${car.source}" target="_blank" rel="noreferrer">${car.name}</a></li>`)
      .join("");

    updatePanel.innerHTML = `
      <h3>Update-Check abgeschlossen</h3>
      <p>
        Datenstand der Seite: ${formatDataDate(DATA_UPDATED_AT)}. Lokale Prüfung am ${checkedAt}.
        Besonders prüfenswert sind ${volatileCars.length} Modelle mit Aktionspreis, Schätzwert oder angekündigter Verfügbarkeit.
      </p>
      <ul class="update-list">${sourceLinks}</ul>
    `;
    updateButton.disabled = false;
    updateButton.textContent = "Aktualisierungen suchen";
  }, 700);
}

function formatDataDate(value) {
  return new Intl.DateTimeFormat("de-AT", { dateStyle: "medium" }).format(new Date(`${value}T12:00:00`));
}
