locoScroll();
//this function is responsible for locomotive Scroll-bar
function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

//heading text
page1Animation();
function page1Animation() {
  let alh1 = document.querySelectorAll(".page1 .txt h1");
  textSplicting(alh1);
}
gsapAnimationPage1();
function textSplicting(alh1) {
  alh1.forEach((elem) => {
    let clutter = "";
    elem.textContent.split("").forEach((latter) => {
      clutter += `<span>${latter}</span>`;
    });
    elem.innerHTML = clutter;
  });
}

function gsapAnimationPage1() {
  gsap.to(".page1 .txt h1 span", {
    color: "#e3e3c4",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page1 .txt h1",
      scroller: ".main",
      start: "top 10%",
      end: "top 20%",
      scrub: 2,
      //   markers: true,
    },
  });
}
//img animation
imgAnimation();
function imgAnimation() {
  gsap.to(".image img", {
    height: "100%",
    width: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    duration: 2,
    scrollTrigger: {
      trigger: ".image img",
      scroller: ".main",
      start: "top 50%",
      end: "top 25%",
      scrub: true,
      // markers: true,
    },
  });
}

//animation for all
function downToUpAnimation(pageNumber) {
  gsap.from(pageNumber, {
    opacity: 0,
    duration: 2,
    marginTop: "25vw",
    scrollTrigger: {
      trigger: pageNumber,
      scroller: ".main",
      start: "top 120%",
      end: "top 50%",
      scrub: true,
      //markers: true,
    },
  });
}
//page2
downToUpAnimation(".page2 p");
//page 3
//heading text
page3Animation();
function page3Animation() {
  let alh1 = document.querySelectorAll(".page3 .txt h1");
  textSplicting(alh1);
}
gsapAnimationPage3();

function gsapAnimationPage3() {
  gsap.to(".page3 .txt h1 span", {
    color: "#434B34",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page3 .txt h1",
      scroller: ".main",
      start: "top 80%",
      end: "top 30%",
      scrub: 2,
      // markers: true,
    },
  });
}
//page5
downToUpAnimation(".page5 p");
//page 6
page6Animation();
function page6Animation() {
  let alh1 = document.querySelectorAll(".page6 .txt h1");
  textSplicting(alh1);
}
gsapAnimationPage6();

function gsapAnimationPage6() {
  gsap.to(".page6 .txt h1 span", {
    color: "#434B34",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page6 .txt h1",
      scroller: ".main",
      start: "top 70%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}
//page7
downToUpAnimation(".page7 img");
//page8
downToUpAnimation(".page8 p");
//page9
downToUpAnimation(".page9 img");
//page 10
downToUpAnimation(".page10 p");
//page 11
page11Animation();
function page11Animation() {
  gsap.from(".page11Container", {
    y: "65%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page11Container",
      scroller: ".main",
      start: "top 85%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}
