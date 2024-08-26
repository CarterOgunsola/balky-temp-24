import { gsap } from "gsap";
import SplitType from "split-type"; // Import SplitType for splitting the subhead

export function animateContact() {
  const tl = gsap.timeline({
    defaults: { duration: 1.4, ease: "expo.out" },
  });

  // Control the start time for different animations
  const timeStartTime = 0;
  const infoWrapStartTime = 0;
  const socialTagStartTime = 0.7;

  // Animate the time element first
  const timeElement = document.querySelectorAll('[data-load="time-contact"]');
  tl.from(timeElement, { y: 100, opacity: 0, stagger: 0.1 }, timeStartTime);

  // Animate each info-wrap group
  const infoWraps = document.querySelectorAll(
    '[data-load="info-wrap-contact"]'
  );
  infoWraps.forEach((wrap, index) => {
    const heads = wrap.querySelectorAll('[data-load="info-head-contact"]');
    const subheads = wrap.querySelectorAll(
      '[data-load="info-subhead-contact"]'
    );
    const texts = wrap.querySelectorAll('[data-load="info-text-contact"]');

    // Split the subhead for better control
    subheads.forEach((subhead) => {
      new SplitType(subhead, { types: "lines" });
    });

    // Animate the heads and subheads almost simultaneously
    tl.from(
      [
        ...heads,
        ...wrap.querySelectorAll('[data-load="info-subhead-contact"] .line'),
      ],
      { y: 105, opacity: 0, stagger: 0.1 },
      infoWrapStartTime + index * 0.3
    );

    // Animate the texts with a stagger
    tl.from(
      texts,
      { y: 105, opacity: 0, stagger: 0.1 },
      infoWrapStartTime + 0.4 + index * 0.3
    );
  });

  // Animate the social tags with stagger
  const socialTags = document.querySelectorAll(
    '[data-load="social-tag-contact"]'
  );
  tl.from(socialTags, { y: 100, opacity: 0, stagger: 0.1 }, socialTagStartTime);

  return tl;
}

export function animateContactLeave() {
  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "expo.in" },
  });

  // Reverse animation: move elements out of view with stagger
  const socialTags = document.querySelectorAll(
    '[data-load="social-tag-contact"]'
  );
  tl.to(socialTags, { y: 100, opacity: 0, stagger: 0.05 }, 0);

  const infoWraps = document.querySelectorAll(
    '[data-load="info-wrap-contact"]'
  );
  infoWraps.forEach((wrap, index) => {
    const heads = wrap.querySelectorAll('[data-load="info-head-contact"]');
    const subheads = wrap.querySelectorAll(
      '[data-load="info-subhead-contact"] .line'
    );
    const texts = wrap.querySelectorAll('[data-load="info-text-contact"]');

    tl.to(
      [heads, subheads],
      { y: 105, opacity: 0, stagger: 0.1 },
      0.2 + index * 0.3
    );
    tl.to(texts, { y: 105, opacity: 0, stagger: 0.1 }, 0.4 + index * 0.3);
  });

  const timeElement = document.querySelectorAll('[data-load="time-contact"]');
  tl.to(timeElement, { y: 100, opacity: 0, stagger: 0.1 }, 0);

  return tl;
}
