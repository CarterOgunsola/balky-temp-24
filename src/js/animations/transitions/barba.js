// barba.js inside src/js/animations/transitions/

import barba from "@barba/core";
import { gsap } from "gsap";
import { initAll } from "../../utils/initAll"; // Import the centralized initAll

// Function to initialize Barba.js transitions
export function initBarba() {
  barba.init({
    preventRunning: true,
    transitions: [
      {
        sync: true, // Ensures smoother, simultaneous transitions
        enter(data) {
          // Create a timeline for coordinated transitions
          let tl = gsap.timeline({
            defaults: { duration: 1, ease: "expo.out" },
          });
          tl.to(data.current.container, { opacity: 0, scale: 0.9 });
          tl.from(data.next.container, { y: "100vh" }, "<"); // Slide-in effect
          return tl;
        },
      },
    ],
  });

  barba.hooks.enter((data) => {
    gsap.set(data.next.container, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "auto",
    });
  });

  barba.hooks.after((data) => {
    gsap.set(data.next.container, { position: "relative" });
    window.scrollTo(0, 0);
    resetWebflowInteractions(data);
    initAll(); // Re-initialize animations after transitions
  });

  barba.hooks.afterEnter(() => {
    initAll(); // Ensure everything is re-initialized after page transitions
  });
}

// Function to reset Webflow interactions (you already have this)
function resetWebflowInteractions(data) {
  const dom = new DOMParser().parseFromString(data.next.html, "text/html");
  const newHtml = dom.querySelector("html");

  document.documentElement.setAttribute(
    "data-wf-page",
    newHtml.getAttribute("data-wf-page")
  );

  if (window.Webflow) {
    window.Webflow.destroy();
    window.Webflow.ready();
    window.Webflow.require("ix2").init();
  }

  document
    .querySelectorAll(".w--current")
    .forEach((el) => el.classList.remove("w--current"));
  document.querySelectorAll("a").forEach((link) => {
    if (link.getAttribute("href") === window.location.pathname) {
      link.classList.add("w--current");
    }
  });

  dom.querySelectorAll("[data-barba-script]").forEach((scriptEl) => {
    let codeString = scriptEl.textContent;
    if (codeString.includes("DOMContentLoaded")) {
      let newCodeString = codeString.replace(
        /window\.addEventListener\("DOMContentLoaded",\s*\(\s*event\s*\)\s*=>\s*{\s*/,
        ""
      );
      codeString = newCodeString.replace(/\s*}\s*\);\s*$/, "");
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    if (scriptEl.src) {
      script.src = scriptEl.src;
    } else {
      script.text = codeString;
    }
    document.body.appendChild(script).remove();
  });
}
