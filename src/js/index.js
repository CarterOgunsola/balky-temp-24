import "../styles/index.css";
import { initAll } from "./utils/initAll";
import { initTransitions } from "./animations/transitions"; // Import the transitions

document.addEventListener("DOMContentLoaded", () => {
  initTransitions(); // Initialize Barba.js transitions
  initAll();
});

console.log("Hello, Balky!");
