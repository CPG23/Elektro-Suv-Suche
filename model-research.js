(function () {
  const updateButton = document.querySelector("#updateButton");
  const updatePanel = document.querySelector("#updatePanel");

  if (!updateButton || !updatePanel) {
    return;
  }

  renderEmbeddedCandidates();

  updateButton.addEventListener("click", () => {
    window.setTimeout(renderModelResearchStatus, 700);
  });

  async function renderModelResearchStatus() {
    const candidates = await loadCandidates();
    const block = document.createElement("div");
    block.className = "model-research-status";

    if (!hasCandidates(candidates)) {
      block.innerHTML = `
        <h3>Modellrecherche</h3>
        <p>Es sind aktuell keine neuen Elektro-SUV-Kandidaten gespeichert. Die Recherche laeuft automatisch woechentlich im Hintergrund; sobald passende Modelle gefunden wurden, erscheinen sie direkt auf dieser Seite.</p>
      `;
      appendResearchBlock(block);
      return;
    }

    const updatedAt = candidates.updatedAt ? formatDate(candidates.updatedAt) : "unbekannt";
    block.innerHTML = `
      <h3>Neue Funde</h3>
      <p>Letzte Recherche: ${updatedAt}. Die gefundenen Modelle werden unten im Bereich "Neu gefunden" mit den aktuell verfuegbaren Infos angezeigt.</p>
      <div class="research-candidates">
        ${candidates.items.slice(0, 5).map(renderCandidate).join("")}
      </div>
    `;
    appendResearchBlock(block);
  }

  async function renderEmbeddedCandidates() {
    const candidates = await loadCandidates();
    if (!hasCandidates(candidates)) {
      removeEmbeddedSection();
      return;
    }

    const existing = document.querySelector("#researchCandidatesSection");
    const section = existing || document.createElement("section");
    section.id = "researchCandidatesSection";
    section.className = "section research-section";
    section.innerHTML = `
      <div class="section-head">
        <p class="eyebrow">Automatisch gefunden</p>
        <h2>Neu gefundene Kandidaten</h2>
      </div>
      <p class="research-intro">Diese Modelle wurden bei der automatischen Recherche gefunden. Sie werden hier bereits angezeigt, auch wenn noch nicht alle Vergleichsdaten vollstaendig sind.</p>
      <div class="research-candidates research-candidates-grid">
        ${candidates.items.map(renderCandidate).join("")}
      </div>
    `;

    if (!existing) {
      const sources = document.querySelector("#quellen");
      const main = document.querySelector("main");
      if (sources) {
        sources.insertAdjacentElement("beforebegin", section);
      } else if (main) {
        main.append(section);
      }
    }
  }

  function removeEmbeddedSection() {
    document.querySelector("#researchCandidatesSection")?.remove();
  }

  async function loadCandidates() {
    try {
      const response = await fetch(`model-candidates.json?ts=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) {
        return null;
      }
      return response.json();
    } catch (_) {
      return null;
    }
  }

  function hasCandidates(candidates) {
    return candidates && Array.isArray(candidates.items) && candidates.items.length > 0;
  }

  function appendResearchBlock(block) {
    const existing = updatePanel.querySelector(".model-research-status");
    if (existing) {
      existing.replaceWith(block);
      return;
    }
    updatePanel.append(block);
  }

  function renderCandidate(candidate) {
    const source = candidate.url
      ? `<a href="${escapeAttribute(candidate.url)}" target="_blank" rel="noreferrer">Quelle ansehen</a>`
      : "";
    const facts = renderFacts(candidate);

    return `
      <article class="research-candidate">
        <strong>${escapeHtml(candidate.title || "Neuer Kandidat")}</strong>
        <span>${escapeHtml(candidate.reason || "Moeglicherweise relevant fuer die Preis- und Modelljahr-Auswahl.")}</span>
        ${facts}
        ${source}
      </article>
    `;
  }

  function renderFacts(candidate) {
    const facts = [
      ["Preis", candidate.price],
      ["Reichweite", candidate.range],
      ["Laden", candidate.charging],
      ["Leistung", candidate.power],
      ["Marktstart", candidate.launch],
      ["Status", candidate.status]
    ].filter(([, value]) => Boolean(value));

    if (!facts.length) {
      return `<small class="research-facts-empty">Weitere technische Daten werden ergaenzt, sobald sie verlaesslich verfuegbar sind.</small>`;
    }

    return `
      <dl class="research-facts">
        ${facts.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
      </dl>
    `;
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

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }
})();
