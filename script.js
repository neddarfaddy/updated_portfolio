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
// CLASS ELEMENTS
const CLASS_HIDDEN = ".hidden";
// DOM ELEMENTS
const exploreButton = document.querySelector(".explore_button");
const closeButton = document.querySelector(".header_bottom");
// EVENT CALLERS
closeButton.addEventListener("click", () => tl.reverse());
exploreButton.addEventListener("click", () => tl.restart());
// GSAP ANIMATION
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

const tl = gsap.timeline({ paused: true });
tl.add("start") // optional label
  // Step 1: Overlay comes in with rounded edge
  .from(
    ".header_overlay",
    {
      delay: 0,
      x: 600,
      duration: 1,
      ease: "power1.inOut",
    },
    "start"
  )

  // Step 2: List comes in
  .from(
    ".header_list",
    {
      opacity: 0,
      x: 600,
      duration: 1,
      ease: "power1.inOut",
    },
    "start+=0.6"
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
      scale: 0.1,
      opacity: 0,
      duration: 2,
      transformOrigin: "bottom center",
      ease: "back.out(1.5)",
    },
    "start+=1.1"
  )

  // Step 2: Looping pulse animation
  .to(
    ".header_bottom",
    {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    },
    "start+=3.1" // Start after entrance ends
  );
