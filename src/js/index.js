import "../styles/index.css";
import { initAll } from "./utils/initAll";
import { initTransitions } from "./animations/transitions"; // Import the transitions
import { initMobNav } from "./animations/general/mobNav";

document.addEventListener("DOMContentLoaded", () => {
  initTransitions(); // Initialize Barba.js transitions
  initAll();
  initMobNav();
});

console.log("Hello, Balky!");
