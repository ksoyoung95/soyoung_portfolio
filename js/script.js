/* script.js */

/**
 * =========================
 * Helpers
 * =========================
 */
function escapeHTML(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * =========================
 * UI: Mobile nav
 * =========================
 */
const header = document.querySelector(".header");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle?.addEventListener("click", () => {
  const opened = header?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(!!opened));
});

nav?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  header?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
});

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

/**
 * =========================
 * Portfolio Data
 * =========================
 */
const projects = [
  {
    id: "p01",
    title: "브랜드 상세페이지 리뉴얼",
    category: "detail",
    tag: "상세페이지",
    thumb: "./assets/portfolio-01.jpg",
    images: ["./assets/portfolio-01.jpg", "./assets/portfolio-01-2.jpg", "./assets/portfolio-01-3.jpg"],
    desc: "기획 의도에 맞춘 정보 구조 재정리, 구매 전환을 고려한 레이아웃 개선.",
    meta: ["Tool: PS / AI", "Contribution: 100%", "Type: E-commerce"],
    links: [{ label: "작업 링크", href: "#" }],
  },
  {
    id: "p02",
    title: "패키지 디자인 시리즈",
    category: "package",
    tag: "패키지",
    thumb: "./assets/portfolio-02.jpg",
    images: ["./assets/portfolio-02.jpg", "./assets/portfolio-02-2.jpg"],
    desc: "브랜드 톤 유지 + 진열 환경에서 눈에 띄는 컬러/타이포 전략 적용.",
    meta: ["Tool: AI", "Deliverable: Print", "Output: Box / Label"],
    links: [],
  },
  {
    id: "p03",
    title: "SNS 콘텐츠 템플릿",
    category: "sns",
    tag: "SNS",
    thumb: "./assets/portfolio-03.jpg",
    images: ["./assets/portfolio-03.jpg", "./assets/portfolio-03-2.jpg"],
    desc: "운영 효율을 높이는 컴포넌트화(그리드/타이포/아이콘)로 제작 시간 단축.",
    meta: ["Tool: PS", "Output: Feed / Story", "System: Components"],
    links: [],
  },
  {
    id: "p04",
    title: "웹 랜딩 페이지 퍼블리싱",
    category: "web",
    tag: "웹",
    thumb: "./assets/portfolio-04.jpg",
    images: ["./assets/portfolio-04.jpg", "./assets/portfolio-04-2.jpg"],
    desc: "모바일 우선 반응형, 섹션 흐름과 CTA 배치로 전환 동선 최적화.",
    meta: ["Tech: HTML / CSS", "Type: Responsive", "Role: Design+Publish"],
    links: [],
  },
];

const categoryLabel = { detail: "상세페이지", package: "패키지", sns: "SNS", web: "웹" };

/**
 * =========================
 * Render: Portfolio Cards
 * =========================
 */
const portfolioGrid = document.getElementById("portfolioGrid");

function portfolioCardTemplate(p) {
  const metaPreview = (p.meta || []).slice(0, 2).map((m) => `<li>${escapeHTML(m)}</li>`).join("");
  return `
    <article class="card" data-category="${escapeHTML(p.category)}">
      <button class="card__thumb card__button" type="button" data-open="${escapeHTML(p.id)}" aria-label="${escapeHTML(
        p.title
      )} 상세 보기">
        <img src="${escapeHTML(p.thumb)}" alt="${escapeHTML(p.title)} 썸네일" loading="lazy" />
      </button>

      <div class="card__body">
        <div class="card__top">
          <h3 class="card__title">${escapeHTML(p.title)}</h3>
          <span class="tag">${escapeHTML(p.tag || categoryLabel[p.category] || "")}</span>
        </div>
        <p class="card__desc">${escapeHTML(p.desc || "")}</p>
        <ul class="card__meta">${metaPreview}</ul>
      </div>
    </article>
  `;
}

function renderPortfolioCards(list) {
  if (!portfolioGrid) return;
  portfolioGrid.innerHTML = list.map(portfolioCardTemplate).join("");
}
renderPortfolioCards(projects);

// Filter pills
document.querySelectorAll(".pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach((x) => x.classList.remove("is-active"));
    pill.classList.add("is-active");

    const f = pill.dataset.filter;
    const list = f === "all" ? projects : projects.filter((p) => p.category === f);
    renderPortfolioCards(list);
  });
});

/**
 * =========================
 * Portfolio Modal + Carousel
 * =========================
 */
const portfolioModal = document.getElementById("portfolioModal");
const modalTitle = document.getElementById("modalTitle");
const modalTag = document.getElementById("modalTag");
const modalDesc = document.getElementById("modalDesc");
const modalMeta = document.getElementById("modalMeta");
const modalLinks = document.getElementById("modalLinks");

const track = document.getElementById("carouselTrack");
const dots = document.getElementById("carouselDots");
const count = document.getElementById("carouselCount");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let lastPortfolioFocus = null;
let activeProject = null;
let slideIndex = 0;

function setSlide(i) {
  if (!activeProject || !track || !dots || !count || !prevBtn || !nextBtn) return;

  const total = (activeProject.images || []).length;
  if (total <= 0) return;

  slideIndex = (i + total) % total;
  track.style.transform = `translateX(${-slideIndex * 100}%)`;

  dots.querySelectorAll("button").forEach((b, idx) => {
    b.classList.toggle("is-active", idx === slideIndex);
    b.setAttribute("aria-current", idx === slideIndex ? "true" : "false");
  });

  count.textContent = `${slideIndex + 1} / ${total}`;

  const single = total === 1;
  prevBtn.disabled = single;
  nextBtn.disabled = single;
}

function buildCarousel(images = [], title = "") {
  if (!track || !dots) return;

  const safeImages = images.length ? images : [""];

  track.innerHTML = safeImages
    .map(
      (src, idx) => `
      <div class="carousel__slide">
        <img src="${escapeHTML(src)}" alt="${escapeHTML(title)} 이미지 ${idx + 1}" loading="lazy" />
      </div>
    `
    )
    .join("");

  dots.innerHTML = safeImages
    .map((_, idx) => `<button class="dot" type="button" aria-label="이미지 ${idx + 1}로 이동" data-dot="${idx}"></button>`)
    .join("");

  setSlide(0);
}

function openPortfolioModal(project) {
  if (!portfolioModal) return;

  lastPortfolioFocus = document.activeElement;
  activeProject = project;

  portfolioModal.classList.add("is-open");
  portfolioModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.body.classList.add("modal-open");

  if (modalTitle) modalTitle.textContent = project.title || "";
  if (modalTag) modalTag.textContent = project.tag || categoryLabel[project.category] || "";
  if (modalDesc) modalDesc.textContent = project.desc || "";
  if (modalMeta) modalMeta.innerHTML = (project.meta || []).map((m) => `<li>${escapeHTML(m)}</li>`).join("");

  if (modalLinks) {
    const links = (project.links || []).filter((l) => l.href && l.href !== "#");
    modalLinks.innerHTML = links
      .map(
        (l) =>
          `<a class="modal__link" href="${escapeHTML(l.href)}" target="_blank" rel="noreferrer">${escapeHTML(
            l.label || "링크"
          )}</a>`
      )
      .join("");
  }

  buildCarousel(project.images || [project.thumb], project.title || "");
  portfolioModal.querySelector(".modal__close")?.focus();
}

function closePortfolioModal() {
  if (!portfolioModal) return;

  portfolioModal.classList.remove("is-open");
  portfolioModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.body.classList.remove("modal-open");

  activeProject = null;
  slideIndex = 0;

  if (track) track.innerHTML = "";
  if (dots) dots.innerHTML = "";
  if (count) count.textContent = "";

  lastPortfolioFocus?.focus?.();
}

// Carousel prev/next
prevBtn?.addEventListener("click", () => setSlide(slideIndex - 1));
nextBtn?.addEventListener("click", () => setSlide(slideIndex + 1));

/**
 * =========================
 * Career Data + Career Modal
 * =========================
 * ✅ duties 문자열엔 "-" 붙이지 마! (CSS가 자동으로 붙임)
 */
const careers = [
  {
    id: "c01",
    company: "키스템프",
    type: "파견 계약직",
    period: "기간 : 2025.09 ~ ing",
    duties: [
      "자사 홈페이지 운영 전반의 디자인을 담당하며, 메인 및 서브 페이지의 비주얼 개선과 유지·보수 진행",
      "프로모션, 이벤트, 캠페인 일정에 맞춰 배너 및 콘텐츠 디자인 기획·제작",
      "브랜드 가이드에 맞춘 디자인 일관성 관리 및 사용자 경험을 고려한 화면 구성 개선",
      "유관 부서와의 협업을 통해 콘텐츠 업데이트 및 운영 효율을 높이는 디자인 지원",
    ],
  },
  {
    id: "c02",
    company: "(주)플로우스",
    type: "상주 프리랜서",
    period: "기간 : 2025.01 ~ 2025.03",
    duties: [
      "카페24 플랫폼을 활용해 홈페이지 리뉴얼과 유지보수를 담당하며, 계절별 메인 비주얼과 콘텐츠를 기획 및 제작",
      "브랜드 아이덴티티 강화를 위한 크리에이티브 광고 디자인과 프로모션 콘텐츠 제작",
      "신제품 출시 프로젝트에 참여하여 상세페이지, 패키지 디자인 등 다양한 디자인 자산을 기획 및 제작",
    ],
  },
  {
    id: "c03",
    company: "(주)올인원뱅크",
    type: "정규직",
    period: "기간 : 2024.04 ~ 2024.12",
    duties: [
      "카페24 플랫폼을 기반으로 자사 홈페이지를 구축하고 유지보수 전반을 담당",
      "상품 상세페이지 및 온라인 홍보 콘텐츠를 기획·제작",
      "영업 지원을 위한 오프라인 홍보물과 영상 콘텐츠 제작",
      "브랜드의 일관성을 유지하기 위한 디자인 가이드라인 관리",
    ],
  },
  {
    id: "c04",
    company: "딜라잇플랜트",
    type: "상주 프리랜서",
    period: "기간 : 2023.05 ~ 2024.01",
    duties: ["(작성 예정)", "(작성 예정)"],
  },
  {
    id: "c05",
    company: "(주)위드내추럴",
    type: "정규직",
    period: "기간 : 2021.10 ~ 2022.09",
    duties: [
      "병원·여성용품·식품 등 다양한 산업군의 홈페이지 디자인과 운영을 담당",
      "상세페이지, 이벤트 배너, 온·오프라인 광고 콘텐츠를 기획 및 제작",
      "브랜드북 제작과 자사몰 유지보수를 통한 브랜드 이미지 관리",
      "협업 부서와의 커뮤니케이션을 통한 프로젝트 일정 조율과 결과물 품질 관리",
    ],
  },
  {
    id: "c06",
    company: "(주)엠앤비",
    type: "정규직",
    period: "기간 : 2020.07 ~ 2021.06",
    duties: [
      "자사 홈페이지 및 오픈마켓 사이트의 디자인과 상세페이지 제작 업무 담당",
      "다양한 상품 카테고리에 적합한 비주얼 콘셉트와 레이아웃 설계",
    ],
  },
  {
    id: "c07",
    company: "(주)한국앤컴퍼니",
    type: "정규직",
    period: "기간 : 2017.10 ~ 2020.03",
    duties: [
      "자사 온라인몰 및 오픈마켓 홈페이지 디자인을 기획·제작",
      "상세페이지, 프로모션 배너, 외주 광고물 등 다양한 디자인 콘텐츠 제작",
      "브랜드 아이덴티티를 고려한 디자인 일관성 유지",
    ],
  },
  {
    id: "c08",
    company: "(주)산돌리빙",
    type: "정규직",
    period: "기간 : 2016.02 ~ 2017.08",
    duties: [
      "스타트업 자사몰 디자인 및 전반적인 온라인 채널 구축 업무 담당",
      "홈페이지와 상세페이지 기획·제작, CS업무 및 관리 시스템 운영",
    ],
  },
];

const careerGrid = document.getElementById("careerGrid");
const careerModal = document.getElementById("careerModal");
const careerModalTitle = document.getElementById("careerModalTitle");
const careerModalType = document.getElementById("careerModalType");
const careerModalPeriod = document.getElementById("careerModalPeriod");
const careerModalList = document.getElementById("careerModalList");

let lastCareerFocus = null;

function careerCardTemplate(c) {
  return `
    <button class="career-card" type="button" data-career-open="${escapeHTML(c.id)}" aria-label="${escapeHTML(
      c.company
    )} 경력 상세 보기">
      <div class="career-card__row">
        <p class="career-card__company">${escapeHTML(c.company)}</p>
        <p class="career-card__type">${escapeHTML(c.type)}</p>
      </div>
      <p class="career-card__period">${escapeHTML(c.period)}</p>
    </button>
  `;
}

function renderCareerCards() {
  if (!careerGrid) return;
  careerGrid.innerHTML = careers.map(careerCardTemplate).join("");
}
renderCareerCards();

function openCareerModal(c) {
  if (!careerModal) return;

  lastCareerFocus = document.activeElement;

  careerModal.classList.add("is-open");
  careerModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (careerModalTitle) careerModalTitle.textContent = c.company || "";
  if (careerModalType) careerModalType.textContent = c.type || "";
  if (careerModalPeriod) careerModalPeriod.textContent = c.period || "";

  if (careerModalList) {
    careerModalList.innerHTML = (c.duties || []).map((t) => `<li>${escapeHTML(t)}</li>`).join("");
  }

  careerModal.querySelector(".career-modal__close")?.focus();
}

function closeCareerModal() {
  if (!careerModal) return;

  careerModal.classList.remove("is-open");
  careerModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  lastCareerFocus?.focus?.();
}

/**
 * =========================
 * Global Click Delegation
 * =========================
 */
document.addEventListener("click", (e) => {
  // Portfolio open
  const openPortfolioBtn = e.target.closest("[data-open]");
  if (openPortfolioBtn) {
    const id = openPortfolioBtn.getAttribute("data-open");
    const project = projects.find((p) => p.id === id);
    if (project) openPortfolioModal(project);
    return;
  }

  // Portfolio close
  const portfolioCloseEl = e.target.closest("[data-close]");
  if (portfolioCloseEl && portfolioModal?.classList.contains("is-open")) {
    closePortfolioModal();
    return;
  }

  // Portfolio dot
  const dotBtn = e.target.closest("[data-dot]");
  if (dotBtn && portfolioModal?.classList.contains("is-open")) {
    const idx = Number(dotBtn.getAttribute("data-dot"));
    setSlide(idx);
    return;
  }

  // Career open
  const openCareerBtn = e.target.closest("[data-career-open]");
  if (openCareerBtn) {
    const id = openCareerBtn.getAttribute("data-career-open");
    const c = careers.find((x) => x.id === id);
    if (c) openCareerModal(c);
    return;
  }

  // Career close
  const closeCareerBtn = e.target.closest("[data-career-close]");
  if (closeCareerBtn && careerModal?.classList.contains("is-open")) {
    closeCareerModal();
    return;
  }
});

/**
 * =========================
 * Keyboard: ESC + arrows
 * =========================
 */
document.addEventListener("keydown", (e) => {
  if (careerModal?.classList.contains("is-open")) {
    if (e.key === "Escape") closeCareerModal();
    return;
  }

  if (!portfolioModal?.classList.contains("is-open")) return;

  if (e.key === "Escape") closePortfolioModal();
  if (e.key === "ArrowLeft") setSlide(slideIndex - 1);
  if (e.key === "ArrowRight") setSlide(slideIndex + 1);
});

/**
 * =========================
 * Floating Top Button
 * =========================
 */
const topBtn = document.querySelector(".footer__top");
const SHOW_AFTER = 300;

function updateTopButton() {
  if (!topBtn) return;
  const y = window.scrollY || document.documentElement.scrollTop;
  topBtn.classList.toggle("is-visible", y > SHOW_AFTER);
}

window.addEventListener("scroll", updateTopButton, { passive: true });
window.addEventListener("load", updateTopButton);