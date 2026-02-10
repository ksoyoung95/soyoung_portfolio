(() => {
  const sliders = document.querySelectorAll("[data-slider]");
  if (!sliders.length) return;

  sliders.forEach((root) => {
    const viewport = root.querySelector("[data-viewport]");
    const track = root.querySelector("[data-track]");
    const prevBtn = root.querySelector("[data-prev]");
    const nextBtn = root.querySelector("[data-next]");
    const dotsWrap = root.querySelector("[data-dots]");
    const currentEl = root.querySelector("[data-current]");
    const totalEl = root.querySelector("[data-total]");

    const slides = Array.from(track?.children || []).filter((el) => el.classList.contains("slide"));
    if (!viewport || !track || slides.length === 0) return;

    let index = 0;
    let pageCount = 1;
    let pageWidth = 0;
    let gap = 0;

    // drag state
    let isDown = false;
    let startX = 0;
    let startTranslate = 0;
    let currentTranslate = 0;

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    const px = (v) => {
      const n = Number(String(v).replace("px", ""));
      return Number.isFinite(n) ? n : 0;
    };

    const getGap = () => {
      const styles = window.getComputedStyle(track);
      return px(styles.columnGap || styles.gap || "0px");
    };

    const getSlideWidth = () => slides[0].getBoundingClientRect().width;

    const setTranslate = (x, withTransition = true) => {
      track.style.transition = withTransition ? "transform .35s ease" : "none";
      track.style.transform = `translate3d(${x}px,0,0)`;
      currentTranslate = x;
    };

    const renderDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      for (let i = 0; i < pageCount; i++) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "dotbtn";
        b.setAttribute("aria-label", `슬라이드 ${i + 1}`);
        b.setAttribute("aria-current", i === index ? "true" : "false");
        b.addEventListener("click", () => {
          index = i;
          update();
        });
        dotsWrap.appendChild(b);
      }
    };

    const update = () => {
      const x = -(index * pageWidth);
      setTranslate(x, true);

      if (prevBtn) prevBtn.disabled = index <= 0;
      if (nextBtn) nextBtn.disabled = index >= pageCount - 1;

      if (currentEl) currentEl.textContent = String(index + 1);
      if (totalEl) totalEl.textContent = String(pageCount);

      if (dotsWrap) {
        const btns = dotsWrap.querySelectorAll("button");
        btns.forEach((b, i) => b.setAttribute("aria-current", i === index ? "true" : "false"));
      }
    };

    const compute = () => {
      gap = getGap();
      const slideW = getSlideWidth();
      const viewportW = viewport.getBoundingClientRect().width;

      const perView = Math.max(1, Math.round((viewportW + gap) / (slideW + gap)));
      pageWidth = perView * (slideW + gap);
      pageCount = Math.max(1, Math.ceil(slides.length / perView));

      index = clamp(index, 0, pageCount - 1);

      renderDots();
      update();
    };

    // controls
    prevBtn?.addEventListener("click", () => {
      index = clamp(index - 1, 0, pageCount - 1);
      update();
    });
    nextBtn?.addEventListener("click", () => {
      index = clamp(index + 1, 0, pageCount - 1);
      update();
    });

    // focus + keyboard
    root.tabIndex = 0;
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prevBtn?.click();
      if (e.key === "ArrowRight") nextBtn?.click();
    });

    // drag/swipe
    const pointerDown = (clientX) => {
      isDown = true;
      startX = clientX;

      const match = track.style.transform.match(/translate3d\(([-0-9.]+)px/);
      startTranslate = match ? Number(match[1]) : -(index * pageWidth);

      track.style.transition = "none";
    };

    const pointerMove = (clientX) => {
      if (!isDown) return;
      const dx = clientX - startX;
      let next = startTranslate + dx;

      const min = -(pageWidth * (pageCount - 1)) - 80;
      const max = 80;
      next = clamp(next, min, max);

      setTranslate(next, false);
    };

    const pointerUp = () => {
      if (!isDown) return;
      isDown = false;

      const moved = currentTranslate - (-(index * pageWidth));
      const threshold = Math.min(120, pageWidth * 0.25);

      if (moved > threshold) index = clamp(index - 1, 0, pageCount - 1);
      else if (moved < -threshold) index = clamp(index + 1, 0, pageCount - 1);

      update();
    };

    viewport.addEventListener("touchstart", (e) => pointerDown(e.touches[0].clientX), { passive: true });
    viewport.addEventListener("touchmove", (e) => pointerMove(e.touches[0].clientX), { passive: true });
    viewport.addEventListener("touchend", pointerUp);

    viewport.addEventListener("mousedown", (e) => pointerDown(e.clientX));
    window.addEventListener("mousemove", (e) => pointerMove(e.clientX));
    window.addEventListener("mouseup", pointerUp);

    window.addEventListener("resize", compute);

    compute();
  });
})();
