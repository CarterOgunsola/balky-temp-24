import SplitType from "split-type";
import { gsap } from "gsap";

let splitText;

export function initNav() {
  // ———— Function to split text into words and characters
  function runSplit() {
    splitText = new SplitType("[data-stagger-link]", {
      types: "words, chars",
    });
  }
  runSplit();

  // ———— Update split text on window resize
  let windowWidth = window.innerWidth;
  window.addEventListener("resize", function () {
    if (windowWidth !== window.innerWidth) {
      windowWidth = window.innerWidth;
      splitText.revert(); // Reset the split
      runSplit(); // Re-run the split for the new window size
    }
  });

  // ———— Animation for staggered text
  const staggerLinks = document.querySelectorAll("[data-stagger-link]");
  staggerLinks.forEach((link) => {
    const letters = link.querySelectorAll("[data-stagger-link-text] .char");

    // ———— Hover in (stagger text animation)
    link.addEventListener("mouseenter", function () {
      gsap.to(letters, {
        yPercent: -100,
        duration: 0.6,
        ease: "expo.out",
        stagger: { each: 0.02, from: "start" },
        overwrite: true,
      });
    });

    // ———— Hover out (reverse stagger text animation)
    link.addEventListener("mouseleave", function () {
      gsap.to(letters, {
        yPercent: 0,
        duration: 0.6,
        ease: "expo.out",
        stagger: { each: 0.02, from: "end" },
      });
    });
  });

  // ———— Animation for nav links opacity
  const navLinks = document.querySelectorAll("[data-nav='link']");
  navLinks.forEach((link) => {
    // ———— Hover in (fade out other links)
    link.addEventListener("mouseenter", function () {
      gsap.to(navLinks, {
        opacity: 0.4,
        duration: 0.3,
        stagger: 0.01,
        ease: "power1.out",
        overwrite: true,
      });
      gsap.to(link, {
        opacity: 1,
        duration: 0.3,
        overwrite: true,
      });
    });

    // ———— Hover out (reset opacity of all links)
    link.addEventListener("mouseleave", function () {
      gsap.to(navLinks, {
        opacity: 1,
        duration: 0.3,
        stagger: 0.01,
        ease: "power1.out",
        overwrite: true,
      });
    });
  });
}
