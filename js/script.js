/* ==========================
   APP LOGIC
========================== */

/** ---------- Scroll Lock (Safari Safe) ---------- */
let scrollY = 0;

/** ---------- Helpers ---------- */
function qs(sel, el = document) { return el.querySelector(sel); }
function qsa(sel, el = document) { return [...el.querySelectorAll(sel)]; }

function openModal(modalEl) {
  scrollY = window.scrollY;

  modalEl.classList.add("isOpen");
  modalEl.setAttribute("aria-hidden", "false");

  // Safari 완전 대응 스크롤 차단
  document.body.classList.add("modalOpen");
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  const onKeyDown = (e) => { 
    if (e.key === "Escape") closeModal(modalEl); 
  };

  modalEl._onKeyDown = onKeyDown;
  document.addEventListener("keydown", onKeyDown);
}

function closeModal(modalEl) {
  modalEl.classList.remove("isOpen");
  modalEl.setAttribute("aria-hidden", "true");

  // 스크롤 복구
  document.body.classList.remove("modalOpen");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  window.scrollTo(0, scrollY);

  if (modalEl._onKeyDown) {
    document.removeEventListener("keydown", modalEl._onKeyDown);
    modalEl._onKeyDown = null;
  }
}

function wireModalClose(modalEl) {
  modalEl.addEventListener("click", (e) => {
    if (e.target.closest("[data-close='true']")) closeModal(modalEl);
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

/** ---------- Career Render + Modal ---------- */
function renderCareers() {
  const grid = qs("#careerGrid");
  if (!grid) return;

  grid.innerHTML = careerData.map(c => `
    <button class="careerCard" type="button" data-career-id="${c.id}">
      <div class="careerTop">
        <div class="careerCompany">${c.company}</div>
        <span class="pill">${c.tag}</span>
      </div>
      <div class="careerPeriod">${c.period}</div>
    </button>
  `).join("");
}

function initCareerModal() {
  const modal = qs("#careerModal");
  const grid = qs("#careerGrid");
  if (!modal || !grid) return;

  wireModalClose(modal);

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-career-id]");
    if (!btn) return;

    const c = careerData.find(x => x.id === btn.dataset.careerId);
    if (!c) return;

    const titleEl = qs("#careerModalTitle");
    const tagEl = qs("#careerModalTag");
    const periodEl = qs("#careerModalPeriod");
    const tasksEl = qs("#careerModalTasks");

    if (!titleEl || !tagEl || !periodEl || !tasksEl) {
      console.error("Career modal element missing:", { titleEl, tagEl, periodEl, tasksEl });
      return;
    }

    titleEl.textContent = c.company;
    tagEl.textContent = c.tag;
    periodEl.textContent = c.period;
    tasksEl.innerHTML = (c.tasks || []).map(t => `<li>${t}</li>`).join("");

    openModal(modal);
  });
}

/** ---------- Portfolio Render + Modal ---------- */
let activeFilter = "all";
let visibleCount = 4;
let currentWork = null;
let currentIndex = 0;

function getFilteredWorks() {
  if (activeFilter === "all") return portfolioData;
  return portfolioData.filter(w => w.category === activeFilter);
}

function renderPortfolio() {
  const grid = qs("#workGrid");
  const loadMoreBtn = qs("#loadMoreBtn");
  if (!grid) return;

  const filtered = getFilteredWorks();
  const slice = filtered.slice(0, visibleCount);

  grid.innerHTML = slice.map(w => `
    <article class="workCard" role="button" tabindex="0" data-work-id="${w.id}">
      <div class="workThumb">
        <img src="${w.thumb}" alt="${w.title} 썸네일" loading="lazy" />
      </div>
      <h3 class="workTitle">${w.title}</h3>
      <p class="workDesc">${w.desc}</p>
      <div class="workMeta">
        <span>Tool : ${w.tool}</span>
        <span>Contribution : ${w.contribution}</span>
      </div>
    </article>
  `).join("");

  if (loadMoreBtn) loadMoreBtn.hidden = visibleCount >= filtered.length;
}

function renderDots(active, total) {
  const el = qs("#workDots");
  if (!el) return;
  el.innerHTML = Array.from({ length: total }).map((_, i) =>
    `<span class="dot ${i === active ? "isActive" : ""}"></span>`
  ).join("");
}

function updateWorkImage() {
  if (!currentWork) return;

  const imgs = currentWork.popupImages || currentWork.images || [];
  if (!imgs.length) return;

  if (currentIndex < 0) currentIndex = imgs.length - 1;
  if (currentIndex >= imgs.length) currentIndex = 0;

  const img = qs("#workImg");
  img.src = imgs[currentIndex];
  img.alt = `${currentWork.title} 이미지 ${currentIndex + 1}`;

  renderDots(currentIndex, imgs.length);
}

function openWorkModal(id) {
  const modal = qs("#workModal");
  if (!modal) return;

  const w = portfolioData.find(x => x.id === id);
  if (!w) return;

  currentWork = w;
  currentIndex = 0;

  qs("#workTitle").textContent = w.title;
  qs("#workDesc").textContent = w.desc;
  qs("#workTool").textContent = `Tool : ${w.tool}`;
  qs("#workContribution").textContent = `Contribution : ${w.contribution}`;
  qs("#workType").textContent = `Type : ${w.type}`;
  qs("#workLink").href = `work.html?id=${encodeURIComponent(w.id)}`;

  updateWorkImage();
  openModal(modal);
}

function initPortfolio() {
  const modal = qs("#workModal");
  if (modal) wireModalClose(modal);

  qsa(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      qsa(".tab").forEach(t => {
        t.classList.remove("isActive");
        t.setAttribute("aria-selected", "false");
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

  qs("#workGrid")?.addEventListener("click", (e) => {
    const card = e.target.closest("[data-work-id]");
    if (!card) return;
    openWorkModal(card.dataset.workId);
  });

  qs("#workGrid")?.addEventListener("keydown", (e) => {
    const card = e.target.closest("[data-work-id]");
    if (!card) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openWorkModal(card.dataset.workId);
    }
  });

  modal?.addEventListener("click", (e) => {
    if (e.target.closest("[data-img-prev]")) { currentIndex--; updateWorkImage(); }
    if (e.target.closest("[data-img-next]")) { currentIndex++; updateWorkImage(); }
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