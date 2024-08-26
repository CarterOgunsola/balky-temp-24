import { gsap } from "gsap";
import SplitType from "split-type"; // Import SplitType if using it as an external library

export function animateHome() {
  const tl = gsap.timeline({
    defaults: { duration: 1.4, ease: "expo.out" },
  });

  // Control the start time for header and social tag animations
  const headerStartTime = 0.5; // Adjust this value to delay the header animation
  const socialTagStartTime = 0.6; // Adjust this value to delay the social tag animation

  // Split the header into lines
  const heroHeader = new SplitType('[data-load="header-home"]', {
    types: "lines",
  });

  // Ensure the parent of the header has overflow hidden
  const headerParent = document.querySelector(
    '[data-load="header-home"]'
  ).parentElement;
  headerParent.style.overflow = "hidden";

  // Animate project links with stagger
  const projectLinks = document.querySelectorAll(
    '[data-load="project-link-home"]'
  );
  tl.from(projectLinks, { y: 100, opacity: 0, stagger: 0.13 }, 0);

  // Clip mask effect: Animate the lines by translating them in from the bottom
  tl.from(
    heroHeader.lines,
    {
      y: "100%",
      opacity: 0,
      stagger: 0.1,
      ease: "expo.out",
    },
    headerStartTime
  );

  // Animate social tags with stagger, using adjustable start time
  const socialTags = document.querySelectorAll('[data-load="social-tag-home"]');
  tl.from(
    socialTags,
    { y: 100, opacity: 0, stagger: 0.05 },
    socialTagStartTime
  );

  return tl;
}

export function animateHomeLeave() {
  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "expo.in" },
  });

  // Reverse animation: move elements out of view with stagger
  const socialTags = document.querySelectorAll('[data-load="social-tag-home"]');
  tl.to(socialTags, { y: 100, opacity: 0, stagger: 0.1 }, 0);

  const heroLines = document.querySelectorAll(
    '[data-load="header-home"] .line'
  );
  tl.to(heroLines, { y: "100%", stagger: 0.1 }, 0.2); // Reverse clip mask effect

  const projectLinks = document.querySelectorAll(
    '[data-load="project-link-home"]'
  );
  tl.to(projectLinks, { y: 100, opacity: 0, stagger: 0.1 }, 0.4);

  return tl;
}
