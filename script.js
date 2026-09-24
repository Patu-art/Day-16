"use strict";
(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const navToggle = document.querySelector("#navToggle");
  const mobileNav = document.querySelector("#mobileNav");
  const header = document.querySelector(".site-header");
  const progress = document.querySelector("#scrollProgress");
  const mobileCta = document.querySelector("#mobileContactCta");
  const contact = document.querySelector("#contact");
  let lastFocused = null;

  function setMenu(open, restoreFocus = false) {
    if (!navToggle || !mobileNav) return;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.classList.toggle("is-open", open);
    mobileNav.inert = !open;
    document.body.classList.toggle("nav-open", open);
    if (open) {
      lastFocused = document.activeElement;
      mobileNav.querySelector("a")?.focus({ preventScroll: true });
    } else if (restoreFocus && lastFocused instanceof HTMLElement) {
      lastFocused.focus({ preventScroll: true });
      lastFocused = null;
    }
  }

  navToggle?.addEventListener("click", () => {
    setMenu(navToggle.getAttribute("aria-expanded") !== "true", true);
  });
  mobileNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navToggle?.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
    }
    if (event.key !== "Tab" || navToggle?.getAttribute("aria-expanded") !== "true") return;
    const items = [...mobileNav.querySelectorAll("a")].filter(el => !el.hasAttribute("disabled"));
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  document.addEventListener("pointerdown", event => {
    if (navToggle?.getAttribute("aria-expanded") === "true" && !header.contains(event.target)) {
      setMenu(false);
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1170 && navToggle?.getAttribute("aria-expanded") === "true") setMenu(false);
  }, { passive: true });

  const revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -22px 0px" });
    revealTargets.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) el.classList.add("is-visible");
      revealObserver.observe(el);
    });
    document.documentElement.classList.add("motion-ready");
  }

  let rafPending = false;
  function updateScrollUi() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.width = String(Math.max(0, Math.min(100, window.scrollY / maxScroll * 100))) + "%";
    if (mobileCta && contact) {
      const contactTop = contact.getBoundingClientRect().top;
      const contactBottom = contact.getBoundingClientRect().bottom;
      const inContact = contactTop < window.innerHeight * .72 && contactBottom > 0;
      mobileCta.classList.toggle("is-visible", window.scrollY > 450 && !inContact);
    }
    rafPending = false;
  }
  window.addEventListener("scroll", () => {
    if (rafPending) return;
    rafPending = true;
    window.requestAnimationFrame(updateScrollUi);
  }, { passive: true });
  window.addEventListener("resize", updateScrollUi, { passive: true });
  updateScrollUi();

  const gallery = {
    kitchen: {
      image: "assets/kitchen-detail.webp",
      alt: "Illustrative warm-toned contemporary kitchen interior",
      caption: "KITCHEN / DESIGN REFERENCE",
      count: "01 / 02",
      detail: "A kitchen is more than a place to cook. Think about movement, storage and how you want to use the space each day."
    },
    bathroom: {
      image: "assets/bathroom-main.webp",
      alt: "Illustrative modern bathroom interior",
      caption: "BATHROOM / DESIGN REFERENCE",
      count: "02 / 02",
      detail: "A bathroom should feel comfortable in everyday use. Consider the layout, practical details and materials that fit your home."
    }
  };
  const photo = document.querySelector("#spacePhoto");
  const caption = document.querySelector("#spaceCaption");
  const number = document.querySelector("#spaceNumber");
  const description = document.querySelector("#spaceDescription");
  const galleryButtons = [...document.querySelectorAll(".space-tab")];
  let photoChangeId = 0;

  function selectSpace(key) {
    const next = gallery[key];
    if (!next || !photo) return;
    photoChangeId += 1;
    const changeId = photoChangeId;
    galleryButtons.forEach(button => {
      const active = button.dataset.space === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    photo.classList.add("is-changing");
    const loaded = new Image();
    loaded.onload = () => {
      if (changeId !== photoChangeId) return;
      photo.src = next.image;
      photo.alt = next.alt;
      if (caption) caption.firstChild.textContent = next.caption + " ";
      if (number) number.textContent = next.count;
      if (description) description.textContent = next.detail;
      window.requestAnimationFrame(() => photo.classList.remove("is-changing"));
    };
    loaded.onerror = () => {
      if (changeId !== photoChangeId) return;
      photo.classList.remove("is-changing");
      if (description) description.textContent = "This reference image could not be loaded. Please try again.";
    };
    loaded.src = next.image;
  }
  galleryButtons.forEach(button => button.addEventListener("click", () => selectSpace(button.dataset.space)));

  const form = document.querySelector("#enquiryForm");
  const status = document.querySelector("#formStatus");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const safeValue = field => String(data.get(field) || "").trim().replace(/[\r\n]+/g, " ");
    const subject = "Installation enquiry: " + safeValue("project");
    const body = [
      "Name: " + safeValue("name"),
      "Email: " + safeValue("email"),
      "Phone: " + (safeValue("phone") || "Not provided"),
      "Project: " + safeValue("project"),
      "",
      "Project details:",
      String(data.get("message") || "").trim()
    ].join("\n");
    const url = "mailto:polbudandson@gmail.com?subject=" +
      encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    if (status) status.textContent = "Your email app should open with a draft. Review and send it yourself; if it does not open, use the email link on this page.";
    window.location.href = url;
  });
})();
