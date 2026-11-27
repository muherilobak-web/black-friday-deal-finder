// Friday Verdict — list rendering, search, filters, sorting, and routing.
// One job: keep what the visitor sees in sync with the controls and the URL hash.

var state = {
  query: "",
  category: "all",
  store: "all",
  minDiscount: 0,
  sort: "verdict"
};

function discountPercent(deal) {
  return Math.round((deal.was - deal.sale) / deal.was * 100);
}

function money(amount) {
  return "$" + amount.toFixed(2).replace(/\.00$/, "");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function dealMatches(deal) {
  if (state.query) {
    const hay = (deal.name + " " + deal.store).toLowerCase();
    if (hay.indexOf(state.query.toLowerCase()) === -1) return false;
  }
  if (state.category !== "all" && deal.category !== state.category) return false;
  if (state.store !== "all" && deal.store !== state.store) return false;
  if (discountPercent(deal) < state.minDiscount) return false;
  return true;
}

function sortDeals(list) {
  const copy = list.slice();
  if (state.sort === "discount") {
    copy.sort(function (a, b) { return discountPercent(b) - discountPercent(a); });
  } else if (state.sort === "price") {
    copy.sort(function (a, b) { return a.sale - b.sale; });
  } else {
    copy.sort(function (a, b) {
      const rank = VERDICT_RANK[a.verdict] - VERDICT_RANK[b.verdict];
      return rank !== 0 ? rank : discountPercent(b) - discountPercent(a);
    });
  }
  return copy;
}

function cardHtml(deal) {
  const pct = discountPercent(deal);
  return "" +
    '<article class="card">' +
      '<div class="card-top">' +
        '<span class="card-store">' + escapeHtml(deal.store) + '</span>' +
        '<span class="card-cat">' + escapeHtml(deal.category) + '</span>' +
      '</div>' +
      '<span class="badge ' + deal.verdict + '">' + VERDICT_LABEL[deal.verdict] + '</span>' +
      '<h3 class="card-name"><a href="#deal-' + deal.id + '">' + escapeHtml(deal.name) + '</a></h3>' +
      '<div class="price-row">' +
        '<span class="price-sale">' + money(deal.sale) + '</span>' +
        '<span class="price-was">' + money(deal.was) + '</span>' +
        '<span class="price-off">' + pct + '% off</span>' +
      '</div>' +
      '<p class="card-meta">Price read by ' + escapeHtml(deal.source) + ' &middot; checked ' + escapeHtml(SITE.checkedAt) + '</p>' +
      '<div class="card-actions">' +
        '<a class="btn-store" href="' + escapeHtml(deal.url) + '" target="_blank" rel="noopener">See it at ' + escapeHtml(deal.store) + '</a>' +
        '<a class="link-detail" href="#deal-' + deal.id + '">Why this verdict?</a>' +
      '</div>' +
    '</article>';
}

function renderStats() {
  const stores = {};
  let totalPct = 0;
  DEALS.forEach(function (deal) {
    stores[deal.store] = true;
    totalPct += discountPercent(deal);
  });
  const avg = Math.round(totalPct / DEALS.length);
  document.getElementById("stat-deals").textContent = String(DEALS.length);
  document.getElementById("stat-stores").textContent = String(Object.keys(stores).length);
  document.getElementById("stat-avg").textContent = avg + "%";
  document.getElementById("stat-checked").textContent = SITE.checkedAt;
}

function renderList() {
  const filtered = sortDeals(DEALS.filter(dealMatches));
  const grid = document.getElementById("deal-grid");
  const count = document.getElementById("result-count");
  count.innerHTML = "Showing <strong>" + filtered.length + "</strong> of <strong>" +
    DEALS.length + "</strong> deals";
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="empty">No deals match those filters. Try clearing the search or lowering the minimum discount.</p>';
    return;
  }
  grid.innerHTML = filtered.map(cardHtml).join("");
}

function renderCategoryButtons() {
  const box = document.getElementById("cat-buttons");
  const cats = ["all"];
  DEALS.forEach(function (deal) {
    if (cats.indexOf(deal.category) === -1) cats.push(deal.category);
  });
  box.innerHTML = cats.map(function (cat) {
    const label = cat === "all" ? "All categories" : cat;
    const pressed = state.category === cat ? "true" : "false";
    return '<button type="button" class="cat-btn" data-cat="' + escapeHtml(cat) +
      '" aria-pressed="' + pressed + '">' + escapeHtml(label) + '</button>';
  }).join("");
}

function renderStoreOptions() {
  const select = document.getElementById("store-filter");
  const stores = [];
  DEALS.forEach(function (deal) {
    if (stores.indexOf(deal.store) === -1) stores.push(deal.store);
  });
  stores.sort();
  let html = '<option value="all">All stores</option>';
  stores.forEach(function (store) {
    html += '<option value="' + escapeHtml(store) + '">' + escapeHtml(store) + '</option>';
  });
  select.innerHTML = html;
}

function showList() {
  document.getElementById("list-view").hidden = false;
  document.getElementById("detail-view").hidden = true;
  document.getElementById("detail-view").innerHTML = "";
}

function showDetail(id) {
  const deal = DEALS.find(function (d) { return d.id === id; });
  if (!deal) { showList(); return; }
  document.getElementById("list-view").hidden = true;
  const detail = document.getElementById("detail-view");
  detail.hidden = false;
  detail.innerHTML = renderDetail(deal);
  window.scrollTo(0, 0);
}

function route() {
  const hash = window.location.hash || "";
  if (hash.indexOf("#deal-") === 0) {
    showDetail(hash.slice(6));
  } else {
    showList();
  }
}

function bindControls() {
  document.getElementById("search").addEventListener("input", function (event) {
    state.query = event.target.value.trim();
    renderList();
  });
  document.getElementById("cat-buttons").addEventListener("click", function (event) {
    const btn = event.target.closest("[data-cat]");
    if (!btn) return;
    state.category = btn.getAttribute("data-cat");
    renderCategoryButtons();
    renderList();
  });
  document.getElementById("store-filter").addEventListener("change", function (event) {
    state.store = event.target.value;
    renderList();
  });
  document.getElementById("min-discount").addEventListener("change", function (event) {
    state.minDiscount = parseInt(event.target.value, 10) || 0;
    renderList();
  });
  document.getElementById("sort").addEventListener("change", function (event) {
    state.sort = event.target.value;
    renderList();
  });
  window.addEventListener("hashchange", route);
}

renderStats();
renderCategoryButtons();
renderStoreOptions();
bindControls();
renderList();
route();
