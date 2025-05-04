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
const headerButton = document.querySelector(".menu_button");
const headerAnimation = gsap.timeline({ paused: true });

headerAnimation
  .from(".header_overlay", {
    y: "-100%",
    duration: 1.3,
    ease: "power2.inOut",
  })
  .from(
    ".header_overlay_footer",
    {
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
    },
    ">-0.6"
  )
  .from(
    ".header_list_point",
    {
      opacity: 0,
      duration: 0.5,
      stagger: { each: 0.1, from: "end" }, // ← this reverses the order
    },
    ">-0.7"
  );
let isPlayingForward = true; // ← You need this outside

headerButton.addEventListener("click", function () {
  if (isPlayingForward) {
    headerAnimation.restart();
  } else {
    headerAnimation.reverse();
  }

  isPlayingForward = !isPlayingForward;
});
