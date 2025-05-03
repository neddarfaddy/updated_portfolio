"use strict";

// GSAP STUFF
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ smooth: true, lerp: 0.1 });

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// DOM ELEMENTS
const exploreButton = document.querySelector(".explore_button");
const closeButton = document.querySelector(".header_bottom");

// INFINITE PULSE ANIMATION (separated from timeline)
const pulse = gsap.to(".header_bottom", {
  scale: 1.2,
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  paused: true,
  ease: "sine.inOut",
});

// MAIN TIMELINE
const tl = gsap.timeline({
  paused: true,
  onComplete: () => pulse.play(), // Start pulse after intro
  onReverseComplete: () => pulse.pause(), // Stop pulse on close
});

tl.add("start")
  // Step 1: Overlay comes in
  .from(
    ".header_overlay",
    {
      x: 600,
      duration: 1.7,
      ease: "power3.inOut",
    },
    "start"
  )

  // Step 2: List comes in
  .from(
    ".header_list",
    {
      opacity: 0,
      x: 600,
      duration: 1.7,
      ease: "power1.inOut",
    },
    "start+=0.3"
  )

  // Step 3: Top content
  .from(
    ".header_top",
    {
      opacity: 0,
      x: 600,
      duration: 1.8,
      ease: "power3.inOut",
    },
    "start+=0.3"
  )

  // Step 4: Bottom content
  .from(
    ".header_bottom",
    {
      scale: 0.8,
      opacity: 0,
      duration: 2,
      transformOrigin: "bottom center",
      ease: "back.out(1.5)",
    },
    "start+=0.1"
  );

// BUTTON ANIMATIONS
gsap.fromTo(
  ".explore_button",
  { rotate: -9 },
  {
    rotate: 9,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  }
);

// EVENT CALLERS
exploreButton.addEventListener("click", () => {
  pulse.pause(); // Reset pulse in case it's still active
  tl.timeScale(1).restart(true); // Force restart immediately
});

closeButton.addEventListener("click", () => {
  tl.pause(tl.duration()); // Jump to end
  tl.timeScale(2).reverse(); // Reverse from end with speed
});
