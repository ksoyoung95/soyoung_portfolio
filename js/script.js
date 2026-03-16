/* ==========================
   APP LOGIC
   - Career: modal open
   - Portfolio: go to work.html
========================== */

/** ---------- Helpers ---------- */
function qs(sel, el = document) {
  return el.querySelector(sel);
}

function qsa(sel, el = document) {
  return [...el.querySelectorAll(sel)];
}

/** ---------- Modal ---------- */
function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add("isOpen");
  modalEl.setAttribute("aria-hidden", "false");
  document.body.classList.add("modalOpen");
}

function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove("isOpen");
  modalEl.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modalOpen");
}

function wireModalClose(modalEl) {
  if (!modalEl) return;

  modalEl.addEventListener("click", (e) => {
    if (e.target.closest("[data-close='true']")) {
      closeModal(modalEl);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalEl.classList.contains("isOpen")) {
      closeModal(modalEl);
    }
  });
}

/** ---------- Header (mobile nav) ---------- */
function initMobileNav() {
  const toggleBtn = qs(".navToggle");
  const mobileNav = qs(".mobileNav");

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener("click", () => {
    const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
    toggleBtn.setAttribute("aria-expanded", String(!expanded));
    mobileNav.hidden = expanded;
  });

  mobileNav.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      toggleBtn.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    }
  });
}

/** ---------- Career ---------- */
function renderCareers() {
  const grid = qs("#careerGrid");
  if (!grid) return;

  if (!Array.isArray(window.careerData)) {
    console.error("careerData not found. Check data.js load order.");
    return;
  }

  grid.innerHTML = window.careerData.map((c) => `
    <button class="careerMiniItem" type="button" data-career-id="${c.id}">
      <div class="careerMiniTop">
        <div class="careerMiniCompany">${c.company}</div>
        <span class="careerMiniTag">${c.tag}</span>
      </div>
      <div class="careerMiniPeriod">${c.period}</div>
    </button>
  `).join("");
}

function initCareerModal() {
  const modal = qs("#careerModal");
  const grid = qs("#careerGrid");

  if (!modal || !grid) return;
  wireModalClose(modal);

  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-career-id]");
    if (!card) return;

    const item = window.careerData.find((c) => c.id === card.dataset.careerId);
    if (!item) return;

    qs("#careerModalTitle").textContent = item.company;
    qs("#careerModalTag").textContent = item.tag;
    qs("#careerModalPeriod").textContent = item.period;

    const taskEl = qs("#careerModalTasks");
    taskEl.innerHTML = (item.tasks || []).map((task) => `<li>${task}</li>`).join("");

    openModal(modal);
  });
}

/** ---------- Portfolio ---------- */
let activeFilter = "all";
let visibleCount = 4;

function getFilteredWorks() {
  if (!Array.isArray(window.portfolioData)) {
    console.error("portfolioData not found. Check data.js load order.");
    return [];
  }

  const validWorks = window.portfolioData.filter((w) => {
    return w.id && w.title && w.thumb && w.desc;
  });

  if (activeFilter === "all") return validWorks;
  return validWorks.filter((w) => w.category === activeFilter);
}

function renderPortfolio() {
  const grid = qs("#workGrid");
  const loadMoreBtn = qs("#loadMoreBtn");
  if (!grid) return;

  const filtered = getFilteredWorks();
  const slice = filtered.slice(0, visibleCount);

  grid.innerHTML = slice.map((w) => `
    <a class="workCard" href="work.html?id=${encodeURIComponent(w.id)}" data-work-id="${w.id}">
      <div class="workThumb">
        <img src="${w.thumb}" alt="${w.title} 썸네일" loading="lazy" />
      </div>
      <h3 class="workTitle">${w.title}</h3>
      <p class="workDesc">${w.desc}</p>
      <div class="workMeta">
        <span>Tool : ${w.tool}</span>
        <span>Contribution : ${w.contribution}</span>
      </div>
    </a>
  `).join("");

  if (loadMoreBtn) {
    loadMoreBtn.hidden = visibleCount >= filtered.length;
  }
}

function initPortfolio() {
  qsa(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      qsa(".tab").forEach((tab) => {
        tab.classList.remove("isActive");
        tab.setAttribute("aria-selected", "false");
      });

      btn.classList.add("isActive");
      btn.setAttribute("aria-selected", "true");

      activeFilter = btn.dataset.filter;
      visibleCount = 4;
      renderPortfolio();
    });
  });

  qs("#loadMoreBtn")?.addEventListener("click", () => {
    visibleCount += 4;
    renderPortfolio();
  });
}

/** ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  renderCareers();
  initCareerModal();
  renderPortfolio();
  initPortfolio();
});