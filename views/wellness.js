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
  gsap.to(".txt h1 span", {
    color: "#e3e3c4",
    stagger: 1,
    scrollTrigger: {
      trigger: ".txt h1",
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
      start: "top 90%",
      end: "top 50%",
      scrub: true,
    },
  });
}
//page 2

page2Animation();
function page2Animation() {
  downToUpAnimation(".page2 h3,.page2 p");
}
//page 3

page3Animation();
function page3Animation() {
  downToUpAnimation(".page3 img");
}
//page 4
page4Animation();
function page4Animation() {
  downToUpAnimation(".page4 h3,.page4 p");
}
//page 5 Animation();

page5Animation();
gsapAnimationPage5();
function page5Animation() {
  let alh1 = document.querySelectorAll(".page5 h1");
  textSplicting(alh1);
}
function gsapAnimationPage5() {
  gsap.to(".page5 h1 span", {
    color: "#556043",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page5 h1",
      scroller: ".main",
      start: "top 80%",
      end: "top 10%",
      scrub: 2,
      //markers:true
    },
  });
}
//page 6
page6Animation();
function page6Animation() {
  downToUpAnimation(".page6 h3, .page6 h1, .page6 p, .page6 img");
}
//page 7
page7Animation();
function page7Animation() {
  downToUpAnimation(".page7 h3, .page7 h1, .page7 p, .page7 img");
}
//page 8
page8Animation();
function page8Animation() {
  downToUpAnimation(".page8 h3, .page8 h1, .page8 p, .page8 img");
}
//page 9
page9Animation();
function page9Animation() {
  downToUpAnimation(
    ".page9LeftTop, .page9LeftBtm, .page9Right h2, .page9Right p,.page9Right h5"
  );
}
//page 10
page10Animation();
function page10Animation() {
  gsap.from(".page10 p", {
    opacity: 0,
    duration: 2,
    marginTop: "5vw",
    scrollTrigger: {
      trigger: ".page10 p",
      scroller: ".main",
      start: "top 100%",
      end: "top 70%",
      scrub: true,
      // markers: true,
    },
  });
}
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
