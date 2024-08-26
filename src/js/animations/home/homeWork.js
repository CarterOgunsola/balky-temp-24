import { gsap } from "gsap";

export function initHomeWork() {
  const projectLinks = document.querySelectorAll("[data-project-link]");
  let currentImage = null; // Track the currently visible image

  // Set the initial position of all active texts using GSAP
  projectLinks.forEach((link) => {
    const activeText = link.querySelector("[data-project-text='active']");
    if (activeText) {
      gsap.set(activeText, { yPercent: 100 });
    }
  });

  projectLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const projectName = link.getAttribute("data-project-link");
      const imageToShow = document.querySelector(
        `[data-project-img="${projectName}"]`
      );

      // ———— Handle the image opacity animation
      if (currentImage && currentImage !== imageToShow) {
        gsap.killTweensOf(currentImage);
        gsap.to(currentImage, {
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
          overwrite: "auto",
        });
      }

      if (imageToShow) {
        gsap.killTweensOf(imageToShow);
        gsap.to(imageToShow, {
          opacity: 1,
          duration: 0.5,
          ease: "expo.out",
          overwrite: "auto",
        });
        currentImage = imageToShow; // Update the current image reference
      }

      // ———— Handle the text animations
      const defaultText = link.querySelector("[data-project-text='default']");
      const activeText = link.querySelector("[data-project-text='active']");

      if (defaultText && activeText) {
        gsap.to(defaultText, {
          yPercent: -100,
          duration: 0.5,
          ease: "expo.out",
          overwrite: "auto",
        });
        gsap.to(activeText, {
          yPercent: 0,
          duration: 0.5,
          ease: "expo.out",
          overwrite: "auto",
        });
      }
    });

    // ———— Handle hover out animations
    link.addEventListener("mouseleave", () => {
      const imageToHide = currentImage;

      if (imageToHide) {
        gsap.killTweensOf(imageToHide);
        gsap.to(imageToHide, {
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
          overwrite: "auto",
        });
        currentImage = null; // Reset the current image reference
      }

      const defaultText = link.querySelector("[data-project-text='default']");
      const activeText = link.querySelector("[data-project-text='active']");

      if (defaultText && activeText) {
        gsap.to(defaultText, {
          yPercent: 0,
          duration: 0.5,
          ease: "expo.out",
          overwrite: "auto",
        });
        gsap.to(activeText, {
          yPercent: 100,
          duration: 0.5,
          ease: "expo.out",
          overwrite: "auto",
        });
      }
    });
  });

  document
    .querySelector("[data-project-link='parent-flex']")
    .addEventListener("mouseleave", () => {
      // Only animate if currentImage is valid
      if (currentImage) {
        gsap.killTweensOf(currentImage);
        gsap.to(currentImage, {
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
          overwrite: "auto",
        });
        currentImage = null; // Reset the current image when leaving the container
      }
    });
}
