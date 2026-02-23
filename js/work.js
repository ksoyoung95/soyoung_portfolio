/* ==========================
   Work Page Logic
========================== */

function qs(sel, el = document) { return el.querySelector(sel); }
function qsa(sel, el = document) { return [...el.querySelectorAll(sel)]; }

function getQueryId() {
  const p = new URLSearchParams(location.search);
  return (p.get("id") || "").trim();
}

function guessType(src) {
  const s = String(src).toLowerCase();
  if (s.endsWith(".gif")) return "gif";
  if (s.endsWith(".mp4") || s.endsWith(".webm")) return "video";
  return "image";
}

/**
 * Work page에서는 "전체 보기"가 목적이라
 * fullImages(여러장) → fullImage(한장) → (fallback) popupImages/images 순서로 사용
 */
function normalizeMedia(work) {
  // 1) media 배열이 있으면 그대로 사용 (확장형)
  if (Array.isArray(work.media) && work.media.length) return work.media;

  // 2) fullImages (전체 페이지용 여러장)
  if (Array.isArray(work.fullImages) && work.fullImages.length) {
    return work.fullImages.map((src, idx) => ({
      type: guessType(src),
      src,
      alt: `${work.title} 전체 이미지 ${idx + 1}`
    }));
  }

  // 3) fullImage (전체 페이지용 한장)
  if (work.fullImage) {
    return [{
      type: guessType(work.fullImage),
      src: work.fullImage,
      alt: `${work.title} 전체 이미지`
    }];
  }

  // 4) fallback: popupImages/images (없으면 이것이라도)
  const fallbackArray = work.popupImages || work.images;
  if (Array.isArray(fallbackArray) && fallbackArray.length) {
    return fallbackArray.map((src, idx) => ({
      type: guessType(src),
      src,
      alt: `${work.title} 이미지 ${idx + 1}`
    }));
  }

  return [];
}

/* ---------- Lightbox ---------- */
const lightbox = qs("#lightbox");
const lightboxStage = qs("#lightboxStage");
const lightboxCount = qs("#lightboxCount");

let activeMedia = [];
let activeIndex = 0;

function createMediaNode(item, isLarge = false) {
  const { type, src, alt } = item;

  if (type === "video") {
    const v = document.createElement("video");
    v.src = src;
    v.controls = true;
    v.playsInline = true;
    v.preload = "metadata";
    v.setAttribute("aria-label", alt || "video");
    if (!isLarge) v.muted = true;
    return v;
  }

  // gif도 img로 처리
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "";
  if (!isLarge) img.loading = "lazy";
  return img;
}

function renderLightbox() {
  if (!activeMedia.length) return;

  const item = activeMedia[activeIndex];
  lightboxStage.innerHTML = "";
  lightboxStage.appendChild(createMediaNode(item, true));
  lightboxCount.textContent = `${activeIndex + 1} / ${activeMedia.length}`;
}

function openLightbox(mediaList, startIndex = 0) {
  activeMedia = mediaList;
  activeIndex = startIndex;

  lightbox.classList.add("isOpen");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  renderLightbox();
  document.addEventListener("keydown", onKeyDown);
}

function closeLightbox() {
  lightbox.classList.remove("isOpen");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  activeMedia = [];
  activeIndex = 0;

  document.removeEventListener("keydown", onKeyDown);
}

function prevMedia() {
  if (!activeMedia.length) return;
  activeIndex = (activeIndex - 1 + activeMedia.length) % activeMedia.length;
  renderLightbox();
}

function nextMedia() {
  if (!activeMedia.length) return;
  activeIndex = (activeIndex + 1) % activeMedia.length;
  renderLightbox();
}

function onKeyDown(e) {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevMedia();
  if (e.key === "ArrowRight") nextMedia();
}

lightbox?.addEventListener("click", (e) => {
  if (e.target.closest("[data-close='true']")) closeLightbox();
  if (e.target.closest("[data-prev]")) prevMedia();
  if (e.target.closest("[data-next]")) nextMedia();
});

/* ---------- Render Work ---------- */
function renderWork() {
  const id = getQueryId();
  const notice = qs("#workNotice");

  if (!Array.isArray(window.portfolioData)) {
    notice.hidden = false;
    notice.innerHTML = `
      <strong>오류:</strong> portfolioData를 찾을 수 없어요.<br/>
      work.html에서 <code>data.js</code>가 <code>work.js</code>보다 먼저 로드되는지 확인해줘.
    `;
    return;
  }

  const work = portfolioData.find(w => w.id === id);
  if (!work) {
    const ids = portfolioData.map(w => `<code>${w.id}</code>`).join(", ");
    notice.hidden = false;
    notice.innerHTML = `
      <strong>작품을 찾을 수 없어요.</strong><br/>
      현재 URL의 id: <code>${id || "(없음)"}</code><br/><br/>
      사용 가능한 id 목록: ${ids}<br/><br/>
      예: <code>work.html?id=${portfolioData[0]?.id || "your-id"}</code>
    `;
    return;
  }

  // 텍스트
  qs("#workTitle").textContent = work.title || "Untitled";
  qs("#workSubtitle").textContent = work.subtitle || work.desc || "";

  qs("#workTool").textContent = `Tool : ${work.tool || "-"}`;
  qs("#workContribution").textContent = `Contribution : ${work.contribution || "-"}`;
  qs("#workType").textContent = `Type : ${work.type || "-"}`;

  // 미디어
  const mediaList = normalizeMedia(work);
  const grid = qs("#galleryGrid");

  if (!mediaList.length) {
    notice.hidden = false;
    notice.innerHTML = `
      <strong>미디어가 등록되지 않았어요.</strong><br/>
      data.js의 해당 작품(<code>${work.id}</code>)에
      <code>fullImages</code> 또는 <code>fullImage</code>를 추가해줘.<br/>
      (fallback으로 <code>popupImages</code>도 가능)
    `;
    return;
  }

  notice.hidden = true;

  grid.innerHTML = mediaList.map((m, idx) => {
    const label = m.alt ? m.alt : `${work.title} ${idx + 1}`;
    return `
      <button class="galleryItem" type="button" data-open="${idx}" aria-label="${label}">
        <div class="galleryThumb">
          ${m.type === "video"
            ? `<video src="${m.src}" muted playsinline preload="metadata"></video>`
            : `<img src="${m.src}" alt="${label}" loading="lazy">`
          }
        </div>
        <div class="galleryCaption">${label}</div>
      </button>
    `;
  }).join("");

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    openLightbox(mediaList, Number(btn.dataset.open));
  }, { once: true }); // 중복 바인딩 방지
}

document.addEventListener("DOMContentLoaded", renderWork);