import { gsap } from "gsap";
import SplitType from "split-type"; // Import SplitType if using it as an external library

export function animateAbout() {
  const tl = gsap.timeline({
    defaults: { duration: 1.4, ease: "expo.out" },
  });

  // Control the start time for different animations
  const headerStartTime = 0.4;
  const timeStartTime = 0.4;
  const infoWrapStartTime = 0.5;

  // Split the header into lines (this setup is still useful for more complex animations)
  const heroHeader = new SplitType('[data-load="header-about"]', {
    types: "lines",
  });

  // Ensure the parent of the header has overflow hidden
  const headerParent = document.querySelector(
    '[data-load="header-about"]'
  ).parentElement;
  headerParent.style.overflow = "hidden";

  // Clip mask effect: Animate the lines by translating them in from the bottom
  tl.from(
    heroHeader.lines,
    {
      y: "100%",
      opacity: 0,
      stagger: 0.1,
      ease: "expo.out",
      duration: 1.6,
    },
    headerStartTime
  );

  // Animate the time element with y and opacity
  const timeElement = document.querySelectorAll('[data-load="time-about"]');
  tl.from(timeElement, { y: 100, opacity: 0, stagger: 0.1 }, timeStartTime);

  // Animate each info-wrap group
  const infoWraps = document.querySelectorAll('[data-load="info-wrap-about"]');
  infoWraps.forEach((wrap, index) => {
    const line = wrap.querySelector('[data-load="info-line-about"]');
    const head = wrap.querySelector('[data-load="info-head-about"]');
    const texts = wrap.querySelectorAll('[data-load="info-text-about"]');

    // Animate the line's height for the "info-line" element
    tl.from(line, { height: 0 }, infoWrapStartTime + index * 0.3);

    // Animate the head and text within the wrap with stagger
    tl.from(
      [head, ...texts],
      { y: 105, opacity: 0, stagger: 0.1 },
      infoWrapStartTime + index * 0.3
    );
  });

  return tl;
}

export function animateAboutLeave() {
  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "expo.in" },
  });

  // Reverse animation: move elements out of view with stagger
  const infoWraps = document.querySelectorAll('[data-load="info-wrap-about"]');
  infoWraps.forEach((wrap, index) => {
    const line = wrap.querySelector('[data-load="info-line-about"]');
    const head = wrap.querySelector('[data-load="info-head-about"]');
    const texts = wrap.querySelectorAll('[data-load="info-text-about"]');

    tl.to(
      [head, ...texts],
      { y: 105, opacity: 0, stagger: 0.1 },
      0 + index * 0.3
    );
    tl.to(line, { height: 0 }, 0 + index * 0.3);
  });

  const timeElement = document.querySelectorAll('[data-load="time-about"]');
  tl.to(timeElement, { y: 100, opacity: 0, stagger: 0.1 }, 0);

  const heroLines = document.querySelectorAll(
    '[data-load="header-about"] .line'
  );
  tl.to(heroLines, { y: "100%", stagger: 0.1 }, 0.2); // Apply the clip mask effect in reverse

  return tl;
}
