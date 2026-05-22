(function () {
  const updateButton = document.querySelector("#updateButton");
  const updatePanel = document.querySelector("#updatePanel");

  if (!updateButton || !updatePanel) {
    return;
  }

  updateButton.addEventListener("click", () => {
    window.setTimeout(renderModelResearchStatus, 700);
  });

  async function renderModelResearchStatus() {
    const candidates = await loadCandidates();
    const block = document.createElement("div");
    block.className = "model-research-status";

    if (!candidates || !Array.isArray(candidates.items) || candidates.items.length === 0) {
      block.innerHTML = `
        <h3>Modellrecherche</h3>
        <p>Es sind aktuell keine neuen Elektro-SUV-Kandidaten gespeichert. Die Recherche laeuft automatisch woechentlich im Hintergrund; sobald passende Modelle gefunden und gespeichert wurden, erscheinen sie hier.</p>
      `;
      appendResearchBlock(block);
      return;
    }

    const updatedAt = candidates.updatedAt ? formatDate(candidates.updatedAt) : "unbekannt";
    block.innerHTML = `
      <h3>Moegliche neue Modelle</h3>
      <p>Letzte Recherche: ${updatedAt}. Wenn ein Kandidat vollstaendige Daten zu Preis, Reichweite, Ladezeit, Leistung und Oesterreich-Bezug hat, wird er in die Vergleichsliste uebernommen.</p>
      <div class="research-candidates">
        ${candidates.items.slice(0, 5).map(renderCandidate).join("")}
      </div>
    `;
    appendResearchBlock(block);
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

    return `
      <article class="research-candidate">
        <strong>${escapeHtml(candidate.title || "Neuer Kandidat")}</strong>
        <span>${escapeHtml(candidate.reason || "Moeglicherweise relevant fuer die Preis- und Modelljahr-Auswahl.")}</span>
        ${source}
      </article>
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
