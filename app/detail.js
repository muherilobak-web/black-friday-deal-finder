// Friday Verdict — the deal detail view.
// One job: turn a single deal object into the detail page's HTML.

function money(amount) {
  return "$" + amount.toFixed(2).replace(/\.00$/, "");
}

function discountPercent(deal) {
  return Math.round((deal.was - deal.sale) / deal.was * 100);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderDetail(deal) {
  const pct = discountPercent(deal);
  const saved = deal.was - deal.sale;
  const termsRow = deal.terms
    ? "<tr><th>Terms</th><td>" + escapeHtml(deal.terms) + "</td></tr>"
    : "";
  return "" +
    '<article class="detail-card">' +
      '<a class="back-link" href="#">&larr; All deals</a>' +
      '<h2>' + escapeHtml(deal.name) + '</h2>' +
      '<p class="detail-sub">' + escapeHtml(deal.store) + ' &middot; ' + escapeHtml(deal.category) + '</p>' +
      '<span class="badge ' + deal.verdict + '">' + VERDICT_LABEL[deal.verdict] + '</span>' +
      '<div class="detail-prices">' +
        '<span class="price-sale">' + money(deal.sale) + '</span>' +
        '<span class="price-was">' + money(deal.was) + '</span>' +
        '<span class="price-off">' + pct + '% off</span>' +
        '<span class="price-save">You save ' + money(saved) + '</span>' +
      '</div>' +
      '<div class="verdict-box ' + deal.verdict + '">' +
        '<h3>Our verdict: ' + VERDICT_LABEL[deal.verdict] + '</h3>' +
        '<p>' + escapeHtml(deal.reason) + '</p>' +
      '</div>' +
      '<table class="facts">' +
        '<tr><th>Store</th><td>' + escapeHtml(deal.store) + '</td></tr>' +
        '<tr><th>Category</th><td>' + escapeHtml(deal.category) + '</td></tr>' +
        '<tr><th>Sale price</th><td>' + money(deal.sale) + '</td></tr>' +
        '<tr><th>Regular price</th><td>' + money(deal.was) + '</td></tr>' +
        '<tr><th>Discount</th><td>' + pct + '% (' + money(saved) + ' off)</td></tr>' +
        '<tr><th>Price source</th><td>' + escapeHtml(deal.source) + '</td></tr>' +
        '<tr><th>Price checked</th><td>' + escapeHtml(SITE.checkedAt) + '</td></tr>' +
        termsRow +
      '</table>' +
      '<div class="card-actions">' +
        '<a class="btn-store" href="' + escapeHtml(deal.url) + '" target="_blank" rel="noopener">See it at ' + escapeHtml(deal.store) + '</a>' +
      '</div>' +
      '<p class="terms-note">Prices move fast on Black Friday. Confirm the price on the store page before you buy — the price at checkout is the one that counts.</p>' +
    '</article>';
}
