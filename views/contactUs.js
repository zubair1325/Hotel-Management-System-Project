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
  textSplicting1(alh1);
}
gsapAnimationPage1();
function textSplicting1(alh1) {
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
      start: "top 90%",
      end: "top 50%",
      scrub: true,
    },
  });
}
//page 3
//downToUpAnimation(".page3 h1,.page3 p");
//page 4
//heading text
page4Animation();
function page4Animation() {
  let alh1 = document.querySelectorAll(".page4 .txt h1");
  textSplicting2(alh1);
}
gsapAnimationPage4();
function textSplicting2(alh1) {
  alh1.forEach((elem) => {
    let clutter = "";
    elem.textContent.split("").forEach((latter) => {
      clutter += `<span>${latter}</span>`;
    });
    elem.innerHTML = clutter;
  });
}

function gsapAnimationPage4() {
  gsap.to(".page4 .txt h1 span", {
    color: "#434b34",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page4 .txt h1",
      scroller: ".main",
      start: "top 90%",
      end: "top 70%",
      scrub: 2,
      // markers: true,
    },
  });
}

downToUpAnimation3(".page4 img");
function downToUpAnimation3(pageNumber) {
  gsap.from(pageNumber, {
    opacity: 0,
    duration: 2,
    marginTop: "25vw",
    scrollTrigger: {
      trigger: pageNumber,
      scroller: ".main",
      start: "top 140%",
      end: "top 70%",
      scrub: true,
    },
  });
}
//page 5
//page 5 Animation
page5Animation();
function page5Animation() {
  gsap.from(".page5Container", {
    y: "65%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page5Container",
      scroller: ".main",
      start: "top 85%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}
