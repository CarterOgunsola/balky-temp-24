import { initGenAnimations } from "../animations/general";
import { initHomeAnimations } from "../animations/home";
import { startUtahClock } from "./time";

function initAll() {
  // Always run general scripts
  initGenAnimations();

  // Get the current page path
  const path = window.location.pathname;
  //console.log("Current page path:", path); // Debugging log

  // Conditionally run page-specific scripts based on the path
  if (path === "/" || path === "/home") {
    //console.log("Initializing home page animations...");
    initHomeAnimations();
  }

  if (path === "/about") {
    //console.log("Initializing about page animations...");
    startUtahClock();
  }

  if (path === "/contact") {
    //console.log("Initializing contact page animations...");
    startUtahClock();
  }

  if (path === "/work") {
    //console.log("Initializing work page animations...");
    // Add specific work page initialization here
  }
}

export { initAll };
