(function () {
  const grid = document.querySelector("#carGrid");
  let autoscoutDataPromise;

  if (!grid) {
    return;
  }

  function injectOfferLookups() {
    document.querySelectorAll(".car-card").forEach((card) => {
      if (card.querySelector(".offer-lookup")) {
        return;
      }

      const title = card.querySelector(".card-title h3");
      const sourceLink = card.querySelector(".source-link");
      if (!title || !sourceLink) {
        return;
      }

      sourceLink.insertAdjacentElement("beforebegin", buildOfferLookup(title.textContent.trim()));
    });
  }

  function buildOfferLookup(carName) {
    const criteria = getOfferCriteria();
    const details = document.createElement("details");
    details.className = "offer-lookup";

    const summary = document.createElement("summary");
    const label = document.createElement("span");
    const hint = document.createElement("small");
    label.textContent = "Fast neue Angebote abrufen";
    hint.textContent = `Oesterreich - Baujahr ab ${criteria.sinceYear} - max. 5.000 km`;
    summary.append(label, hint);

    const content = document.createElement("div");
    content.className = "offer-content";

    const text = document.createElement("p");
    text.textContent = `Gesucht wird nach ${carName} mit Baujahr ab ${criteria.sinceYear}, Erstzulassung ab ${criteria.sinceLabel}, maximal 5.000 km und Standort Oesterreich.`;

    const links = document.createElement("div");
    links.className = "offer-links";
    buildOfferSearches(carName, criteria).forEach((search) => {
      const link = document.createElement("a");
      const strong = document.createElement("strong");
      const span = document.createElement("span");
      link.href = search.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      strong.textContent = search.label;
      span.textContent = search.hint;
      link.append(strong, span);
      links.append(link);
    });

    const results = document.createElement("div");
    results.className = "autoscout-results";
    results.dataset.carName = carName;
    results.innerHTML = `<p class="offers-status">AutoScout-Angebote werden beim Aufklappen geladen.</p>`;

    details.addEventListener("toggle", () => {
      if (details.open && !results.dataset.loaded) {
        results.dataset.loaded = "true";
        renderAutoscoutOffers(results, carName, links.firstElementChild?.href);
      }
    });

    content.append(text, results, links);
    details.append(summary, content);
    return details;
  }

  async function renderAutoscoutOffers(container, carName, fallbackUrl) {
    container.innerHTML = `<p class="offers-status">Lade gespeicherte AutoScout-Treffer...</p>`;

    try {
      const data = await loadAutoscoutData();
      const offers = findStoredOffers(data, carName);

      if (!offers.length) {
        container.innerHTML = `
          <p class="offers-status">Noch keine gespeicherten AutoScout-Treffer fuer dieses Modell vorhanden. Die direkte Suche ist vorbereitet.</p>
        `;
        return;
      }

      const updatedAt = data.updatedAt ? formatDate(data.updatedAt) : "unbekannt";
      container.innerHTML = `
        <div class="offers-head">
          <strong>${offers.length} AutoScout-Treffer</strong>
          <span>Stand: ${updatedAt}</span>
        </div>
        <div class="offer-cards">
          ${offers.map((offer) => renderOfferCard(offer)).join("")}
        </div>
      `;
    } catch (error) {
      container.innerHTML = `
        <p class="offers-status">Die gespeicherten AutoScout-Treffer konnten gerade nicht geladen werden.</p>
      `;
    }
  }

  function renderOfferCard(offer) {
    const facts = [
      offer.price,
      offer.mileage,
      offer.year,
      offer.location
    ].filter(Boolean);

    return `
      <article class="offer-card">
        <h4>${escapeHtml(offer.title || "AutoScout-Angebot")}</h4>
        <p>${facts.map(escapeHtml).join(" · ") || "Details bei AutoScout ansehen"}</p>
        <a href="${offer.url}" target="_blank" rel="noreferrer">Bei AutoScout ansehen</a>
      </article>
    `;
  }

  function loadAutoscoutData() {
    if (!autoscoutDataPromise) {
      autoscoutDataPromise = fetch(`autoscout-offers.json?ts=${Date.now()}`, { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Keine AutoScout-Daten gefunden");
          }
          return response.json();
        });
    }

    return autoscoutDataPromise;
  }

  function findStoredOffers(data, carName) {
    if (!data || !data.offers) {
      return [];
    }

    const exact = data.offers[carName];
    if (Array.isArray(exact)) {
      return exact;
    }

    const normalized = normalizeName(carName);
    const matchedKey = Object.keys(data.offers).find((key) => normalizeName(key) === normalized);
    return matchedKey && Array.isArray(data.offers[matchedKey]) ? data.offers[matchedKey] : [];
  }

  function getOfferCriteria() {
    const since = new Date();
    since.setFullYear(since.getFullYear() - 1);

    return {
      sinceYear: since.getFullYear(),
      sinceLabel: new Intl.DateTimeFormat("de-AT", {
        month: "2-digit",
        year: "numeric"
      }).format(since)
    };
  }

  function buildOfferSearches(carName, criteria) {
    const autoscoutPath = getAutoscoutPath(carName);
    const query = encodeURIComponent(`${carName} Baujahr ${criteria.sinceYear} 5000 km`);
    const detailedQuery = encodeURIComponent(`"${carName}" Oesterreich "5000 km" "Baujahr" "${criteria.sinceYear}" "Erstzulassung"`);

    return [
      {
        label: "AutoScout24 oeffnen",
        hint: `mit Oesterreich, maximal 5.000 km und Erstzulassung ab ${criteria.sinceYear}`,
        url: `https://www.autoscout24.at/lst/${autoscoutPath}?atype=C&cy=A&kmto=5000&fregfrom=${criteria.sinceYear}&sort=standard&desc=0`
      },
      {
        label: "willhaben suchen",
        hint: `mit Baujahr ${criteria.sinceYear} und Kilometerlimit als Suchbegriff`,
        url: `https://www.willhaben.at/iad/gebrauchtwagen/auto/gebrauchtwagenboerse?keyword=${query}`
      },
      {
        label: "Websuche starten",
        hint: "zusaetzliche Haendler- und Vorfuehrwagen-Treffer",
        url: `https://www.google.com/search?q=${detailedQuery}`
      }
    ];
  }

  function getAutoscoutPath(carName) {
    const normalized = normalizeName(carName);
    const paths = [
      ["byd sealion 7", "byd/sealion-7"],
      ["toyota c-hr", "toyota/c-hr"],
      ["kia ev5", "kia/ev5"],
      ["xpeng g6", "xpeng/g6"],
      ["mg mgs6", "mg/mgs6"],
      ["hyundai ioniq 9", "hyundai/ioniq-9"],
      ["mazda cx-6e", "mazda/cx-6e"],
      ["jeep compass", "jeep/compass"],
      ["leapmotor c10", "leapmotor/c10"],
      ["vw id.4", "volkswagen/id-4"],
      ["skoda enyaq", "skoda/enyaq"],
      ["bmw ix1", "bmw/ix1"]
    ];
    const match = paths.find(([name]) => normalized.includes(name));
    return match ? match[1] : encodeURIComponent(normalized.replace(/\s+/g, "-"));
  }

  function normalizeName(value) {
    return value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat("de-AT", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(value));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  injectOfferLookups();

  new MutationObserver(injectOfferLookups).observe(grid, {
    childList: true,
    subtree: true
  });
})();
