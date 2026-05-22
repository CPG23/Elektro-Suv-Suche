(function () {
  const grid = document.querySelector("#carGrid");

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
    text.textContent = `Die Suche ist fuer ${carName} vorbereitet: Standort Oesterreich, Baujahr ab ${criteria.sinceYear}, maximal 5.000 km.`;

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

    content.append(text, links);
    details.append(summary, content);
    return details;
  }

  function getOfferCriteria() {
    const since = new Date();
    since.setFullYear(since.getFullYear() - 1);

    return {
      sinceYear: since.getFullYear()
    };
  }

  function buildOfferSearches(carName, criteria) {
    const autoscoutPath = getAutoscoutPath(carName);

    return [
      {
        label: "AutoScout24 oeffnen",
        hint: `mit Oesterreich, maximal 5.000 km und Erstzulassung ab ${criteria.sinceYear}`,
        url: `https://www.autoscout24.at/lst/${autoscoutPath}?atype=C&cy=A&kmto=5000&fregfrom=${criteria.sinceYear}&sort=standard&desc=0`
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

  injectOfferLookups();

  new MutationObserver(injectOfferLookups).observe(grid, {
    childList: true,
    subtree: true
  });
})();
