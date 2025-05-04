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
const headerListButtons = document.querySelectorAll(".header_list_point");
const headerAnimation = gsap.timeline({ paused: true });

document.querySelectorAll(".header_list_point a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    lenis.scrollTo(target, {
      offset: 0,
      duration: 3.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo feel
    });

    headerAnimation.reverse();
  });
});

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
    ">-1"
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

const numbers00 = document.querySelector(".loading_1");
const numbers25 = document.querySelector(".loading_2");
const numbers50 = document.querySelector(".loading_3");
const numbers75 = document.querySelector(".loading_4");
const numbers100 = document.querySelector(".loading_5");

const introAnimation = gsap.timeline();

introAnimation
  .to(".loading_1", {
    opacity: 1,
    duration: 1,
  })
  .to(".loading_1", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      numbers00.style.display = "none";
    },
  })
  .to(".loading_2", {
    opacity: 1,
    duration: 1,
  })
  .to(".loading_2", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      numbers25.style.display = "none";
    },
  })
  .to(".loading_3", {
    opacity: 1,
    duration: 1,
  })
  .to(".loading_3", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      numbers50.style.display = "none";
    },
  })
  .to(".loading_4", {
    opacity: 1,
    duration: 1,
  })
  .to(".loading_4", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      numbers75.style.display = "none";
    },
  })
  .to(".loading_5", {
    opacity: 1,
    duration: 1,
  })
  .to(".loading_5", {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      numbers100.style.display = "none";
    },
  })
  .to(".loading_overlay", {
    duration: 2,
    ease: "power4.inOut",
    opacity: 0,
  })
  .from(
    ".site-header",
    {
      y: "-100%",
      duration: 1,
    },
    ">-0.8"
  )
  .from(".about-container", {
    y: "50%",
    duration: 1,
  })
  .from(".hero_footer", {
    opacity: 0,
    duration: 1,
  })
  .from(".hero_header", {
    x: "-110%",
    duration: 1,
  });
