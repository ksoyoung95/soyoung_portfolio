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
  const opened = header.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(opened));
});

nav?.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a) return;
  header.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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
  {
    id: "p05",
    title: "상세페이지 A/B 레이아웃 개선",
    category: "detail",
    tag: "상세페이지",
    thumb: "./assets/portfolio-05.jpg",
    images: ["./assets/portfolio-05.jpg", "./assets/portfolio-05-2.jpg"],
    desc: "핵심 USP 위치 재배치와 정보 밀도 조정으로 가독성 강화.",
    meta: ["Tool: PS", "Focus: Readability", "Contribution: 100%"],
    links: [],
  },
  {
    id: "p06",
    title: "프로모션 상세페이지 템플릿",
    category: "detail",
    tag: "상세페이지",
    thumb: "./assets/portfolio-06.jpg",
    images: ["./assets/portfolio-06.jpg", "./assets/portfolio-06-2.jpg"],
    desc: "프로모션 반복 요소를 템플릿화하여 제작 시간을 단축.",
    meta: ["Tool: PS", "System: Template", "Output: Campaign"],
    links: [],
  },
  {
    id: "p07",
    title: "신제품 패키지 키비주얼 확장",
    category: "package",
    tag: "패키지",
    thumb: "./assets/portfolio-07.jpg",
    images: ["./assets/portfolio-07.jpg", "./assets/portfolio-07-2.jpg"],
    desc: "키비주얼 기반 라인업 확장 규칙을 설계하고 적용.",
    meta: ["Tool: AI", "Output: Print", "Deliverable: Guide"],
    links: [],
  },
  {
    id: "p08",
    title: "패키지 라벨 타이포 시스템",
    category: "package",
    tag: "패키지",
    thumb: "./assets/portfolio-08.jpg",
    images: ["./assets/portfolio-08.jpg", "./assets/portfolio-08-2.jpg"],
    desc: "정보 위계와 가독성을 고려한 라벨 타이포 규칙 정리.",
    meta: ["Tool: AI", "Focus: Typography", "Output: Label"],
    links: [],
  },
  {
    id: "p09",
    title: "SNS 시즌 캠페인 콘텐츠",
    category: "sns",
    tag: "SNS",
    thumb: "./assets/portfolio-09.jpg",
    images: ["./assets/portfolio-09.jpg", "./assets/portfolio-09-2.jpg", "./assets/portfolio-09-3.jpg"],
    desc: "시즌 무드 반영 + 브랜드 톤을 유지한 시리즈 제작.",
    meta: ["Tool: PS", "Output: 12 posts", "Role: Design"],
    links: [],
  },
  {
    id: "p10",
    title: "SNS 카드뉴스 템플릿",
    category: "sns",
    tag: "SNS",
    thumb: "./assets/portfolio-10.jpg",
    images: ["./assets/portfolio-10.jpg", "./assets/portfolio-10-2.jpg"],
    desc: "카드뉴스 제작을 빠르게 하기 위한 레이아웃/타이포 템플릿 구성.",
    meta: ["Tool: PS", "Output: Carousel", "System: Grid"],
    links: [],
  },
  {
    id: "p11",
    title: "웹 배너/썸네일 디자인 세트",
    category: "web",
    tag: "웹",
    thumb: "./assets/portfolio-11.jpg",
    images: ["./assets/portfolio-11.jpg", "./assets/portfolio-11-2.jpg"],
    desc: "플랫폼별 규격을 고려해 일관된 메시지 구조로 배너 세트 제작.",
    meta: ["Tool: PS", "Output: Banner set", "Focus: Consistency"],
    links: [],
  },
  {
    id: "p12",
    title: "브랜드 소개 랜딩(디자인)",
    category: "web",
    tag: "웹",
    thumb: "./assets/portfolio-12.jpg",
    images: ["./assets/portfolio-12.jpg", "./assets/portfolio-12-2.jpg"],
    desc: "브랜드 스토리 흐름에 맞춘 섹션 구조/비주얼 리듬 설계.",
    meta: ["Tool: Figma/PS", "Type: Landing", "Role: Design"],
    links: [],
  },
  {
    id: "p13",
    title: "상세페이지 썸네일 개선",
    category: "detail",
    tag: "상세페이지",
    thumb: "./assets/portfolio-13.jpg",
    images: ["./assets/portfolio-13.jpg", "./assets/portfolio-13-2.jpg"],
    desc: "작은 영역에서도 메시지가 명확히 전달되도록 타이포/대비 조정.",
    meta: ["Tool: PS", "Focus: CTR", "Contribution: 100%"],
    links: [],
  },
  {
    id: "p14",
    title: "웹 UI 컴포넌트 스타일 정리",
    category: "web",
    tag: "웹",
    thumb: "./assets/portfolio-14.jpg",
    images: ["./assets/portfolio-14.jpg", "./assets/portfolio-14-2.jpg"],
    desc: "버튼/태그/카드 등 반복 요소를 컴포넌트 기준으로 정리.",
    meta: ["Tech: HTML/CSS", "Focus: System", "Role: Design+Publish"],
    links: [],
  },
];

const categoryLabel = { detail: "상세페이지", package: "패키지", sns: "SNS", web: "웹" };

/**
 * =========================
 * Render: Portfolio Cards
 * =========================
 */
const grid = document.getElementById("portfolioGrid");

function cardTemplate(p) {
  const metaPreview = (p.meta || []).slice(0, 2).map((m) => `<li>${escapeHTML(m)}</li>`).join("");
  return `
    <article class="card" data-category="${escapeHTML(p.category)}">
      <button class="card__thumb card__button" type="button" data-open="${escapeHTML(p.id)}"
        aria-label="${escapeHTML(p.title)} 상세 보기">
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

function renderCards(list) {
  if (!grid) return;
  grid.innerHTML = list.map(cardTemplate).join("");
}
renderCards(projects);

/**
 * =========================
 * Filter
 * =========================
 */
document.querySelectorAll(".pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".pill").forEach((x) => x.classList.remove("is-active"));
    pill.classList.add("is-active");

    const f = pill.dataset.filter;
    const list = f === "all" ? projects : projects.filter((p) => p.category === f);
    renderCards(list);
  });
});

/**
 * =========================
 * Modal + Carousel (Portfolio)
 * =========================
 */
const modal = document.getElementById("portfolioModal");

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

let lastFocus = null;
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
    .map(
      (_, idx) => `
      <button class="dot" type="button" aria-label="이미지 ${idx + 1}로 이동" data-dot="${idx}"></button>
    `
    )
    .join("");

  slideIndex = 0;
  setSlide(0);
}

function openModal(project) {
  if (!modal) return;

  lastFocus = document.activeElement;
  activeProject = project;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
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
  } else {
    modalLinks.innerHTML = "";
  }

  buildCarousel(project.images || [project.thumb], project.title || "");
  modal.querySelector(".modal__close")?.focus();
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.body.classList.remove("modal-open");

  activeProject = null;
  slideIndex = 0;

  if (track) track.innerHTML = "";
  if (dots) dots.innerHTML = "";
  if (count) count.textContent = "";

  lastFocus?.focus?.();
}

document.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-open]");
  if (openBtn) {
    const id = openBtn.getAttribute("data-open");
    const project = projects.find((p) => p.id === id);
    if (project) openModal(project);
    return;
  }

  const closeEl = e.target.closest("[data-close]");
  if (closeEl && modal?.classList.contains("is-open")) closeModal();

  const dotBtn = e.target.closest("[data-dot]");
  if (dotBtn && modal?.classList.contains("is-open")) {
    const idx = Number(dotBtn.getAttribute("data-dot"));
    setSlide(idx);
  }
});

prevBtn?.addEventListener("click", () => setSlide(slideIndex - 1));
nextBtn?.addEventListener("click", () => setSlide(slideIndex + 1));

document.addEventListener("keydown", (e) => {
  if (!modal?.classList.contains("is-open")) return;

  if (e.key === "Escape") closeModal();
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

/**
 * =========================
 * Career Section + Modal (최종 1개만)
 * - HTML 기준 ID:
 *   careerGrid, careerModal, careerModalTitle, careerModalMeta, careerModalList
 * =========================
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
    company: "(주)위드내추럴",
    type: "정규직",
    period: "기간 : 2021.10 ~ 2022.09",
    duties: ["주요 업무를 여기에 입력", "주요 업무를 여기에 입력"],
  },
  {
    id: "c03",
    company: "(주)플로우스",
    type: "상주 프리랜서",
    period: "기간 : 2025.01 ~ 2025.03",
    duties: ["주요 업무를 여기에 입력", "주요 업무를 여기에 입력"],
  },
  {
    id: "c04",
    company: "(주)엠앤비",
    type: "정규직",
    period: "기간 : 2020.07 ~ 2021.06",
    duties: ["주요 업무를 여기에 입력", "주요 업무를 여기에 입력"],
  },
  {
    id: "c05",
    company: "(주)올인원뱅크",
    type: "정규직",
    period: "기간 : 2024.04 ~ 2024.12",
    duties: ["주요 업무를 여기에 입력", "주요 업무를 여기에 입력"],
  },
  {
    id: "c06",
    company: "(주)한국앤컴퍼니",
    type: "정규직",
    period: "기간 : 2017.10 ~ 2020.03",
    duties: ["주요 업무를 여기에 입력", "주요 업무를 여기에 입력"],
  },
  {
    id: "c07",
    company: "딜라잇플랜트",
    type: "상주 프리랜서",
    period: "기간 : 2023.01 ~ 2023.06",
    duties: ["주요 업무를 여기에 입력", "주요 업무를 여기에 입력"],
  },
  {
    id: "c08",
    company: "(주)산돌리빙",
    type: "정규직",
    period: "기간 : 2016.02 ~ 2017.08",
    duties: ["주요 업무를 여기에 입력", "주요 업무를 여기에 입력"],
  },
];

const careerGrid = document.getElementById("careerGrid");
function careerCardTemplate(c) {
  return `
    <button class="career-card" type="button"
      data-career-open="${escapeHTML(c.id)}"
      aria-label="${escapeHTML(c.company)} 경력 상세 보기">
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

// Career modal
const careerModal = document.getElementById("careerModal");
const careerModalTitle = document.getElementById("careerModalTitle");
const careerModalMeta = document.getElementById("careerModalMeta");
const careerModalList = document.getElementById("careerModalList");

let lastCareerFocus = null;

function openCareerModal(c) {
  if (!careerModal) return;

  lastCareerFocus = document.activeElement;

  careerModal.classList.add("is-open");
  careerModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (careerModalTitle) careerModalTitle.textContent = `${c.company}   ${c.type}`;
  if (careerModalMeta) careerModalMeta.textContent = c.period || "";
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

  if (careerModalTitle) careerModalTitle.textContent = "";
  if (careerModalMeta) careerModalMeta.textContent = "";
  if (careerModalList) careerModalList.innerHTML = "";

  lastCareerFocus?.focus?.();
}

document.addEventListener("click", (e) => {
  const openBtn = e.target.closest("[data-career-open]");
  if (openBtn) {
    const id = openBtn.getAttribute("data-career-open");
    const c = careers.find((x) => x.id === id);
    if (c) openCareerModal(c);
    return;
  }

  const closeBtn = e.target.closest("[data-career-close]");
  if (closeBtn && careerModal?.classList.contains("is-open")) closeCareerModal();
});

document.addEventListener("keydown", (e) => {
  if (!careerModal?.classList.contains("is-open")) return;
  if (e.key === "Escape") closeCareerModal();
});
