import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export function initMobNav() {
  document.querySelectorAll("[data-nav='wrap']").forEach((navWrap) => {
    const hamburgerEl = navWrap.querySelector("[data-nav='hamburger-wrap']");
    const menuContainEl = navWrap.querySelector("[data-nav='menu-contain']");
    const flipItemEl = navWrap.querySelector("[data-nav='hamburger-base']");
    const menuWrapEl = navWrap.querySelector("[data-nav='menu-wrap']");
    const menuBaseEl = navWrap.querySelector("[data-nav='menu-base']");
    const menuLinkEls = navWrap.querySelectorAll("[data-nav='menu-link']");

    const flipDuration = 0.4;

    function flip(forwards) {
      const state = Flip.getState(flipItemEl);
      if (forwards) {
        menuContainEl.appendChild(flipItemEl);
      } else {
        hamburgerEl.appendChild(flipItemEl);
      }
      Flip.from(state, { duration: flipDuration });
    }

    const tl = gsap.timeline({ paused: true });
    tl.set(menuWrapEl, { display: "flex" });
    tl.from(menuBaseEl, {
      opacity: 0,
      duration: flipDuration,
      ease: "none",
      onStart: () => {
        flip(true);
      },
    });
    tl.from(menuLinkEls, {
      opacity: 0,
      yPercent: 120,
      duration: 0.6,
      delay: -0.2,
      ease: "expo.out",
      stagger: { amount: 0.2 },
      onReverseComplete: () => {
        flip(false);
      },
    });

    function openMenu(open) {
      if (!tl.isActive()) {
        if (open) {
          tl.play();
          hamburgerEl.setAttribute("data-nav-open", "true");
        } else {
          tl.reverse();
          hamburgerEl.removeAttribute("data-nav-open");
        }
      }
    }

    hamburgerEl.addEventListener("click", function () {
      if (hamburgerEl.getAttribute("data-nav-open") === "true") {
        openMenu(false);
      } else {
        openMenu(true);
      }
    });

    menuBaseEl.addEventListener("mouseenter", function () {
      openMenu(false);
    });

    menuBaseEl.addEventListener("click", function () {
      openMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        openMenu(false);
      }
    });
  });
}
