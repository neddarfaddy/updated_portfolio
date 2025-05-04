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
const headerButton = document.querySelector(".header_button");
const animation = gsap.timeline({ paused: true });
animation
  .from(".header_overlay", {
    x: "100vw",
    duration: 1,
    ease: "power1.inOut",
  })
  .from(
    ".header_list",
    {
      delay: 0,
      x: "100vw",
      opacity: 0,
      duration: 1,
    },
    "-=0.8"
  )
  .from(
    ".header_footer",
    {
      x: "100vw",
      opacity: 0,
      duration: 1,
    },
    "-=0.7"
  );

const buttonAnimation = gsap.timeline();

headerButton.addEventListener("click", function () {
  if (animation.reversed()) {
    animation.play();
  } else {
    animation.reverse();
  }
});
buttonAnimation.to(".header_button", {
  scale: 1.15,
  repeat: -1,
  yoyo: true,
  duration: 1,
  ease: "power1.inOut",
});
