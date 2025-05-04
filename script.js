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
