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
      start: "top 60%",
      end: "top 20%",
      scrub: true,
      // markers: true,
    },
  });
}
//page 2
pageTwo();
function pageTwo() {
  let pageRooms = document.querySelectorAll(".pageRoom");
  pageRooms.forEach((pageRoom) => {
    pageRoom.addEventListener("mouseenter", () => {
      imgCome(pageRoom);
    });
    pageRoom.addEventListener("mouseleave", () => {
      imgLeft(pageRoom);
    });
  });
}

function imgCome(pageRoom) {
  let tl = gsap.timeline();
  tl.to(pageRoom.querySelector(".pageRoomLeft"), {
    x: "80%",
    duration: 0.3,
  });
  tl.to(
    pageRoom.querySelector("#showImg"),
    {
      x: "545%",
      duration: 0.3,
    },
    "-=0.3"
  );
  pageRoom.querySelector("h2").style.color = "white";
}

function imgLeft(pageRoom) {
  let tl = gsap.timeline();
  tl.to(pageRoom.querySelector("#showImg"), {
    x: "-100%",
    duration: 0.3,
  });
  tl.to(
    pageRoom.querySelector(".pageRoomLeft"),
    {
      x: "0",
      duration: 0.3,
    },
    "-=0.15"
  );
  pageRoom.querySelector("h2").style.color = "black";
}

function services(allP) {
  allP.forEach((p) => {
    p.addEventListener("mouseenter", () => {
      p.style.color = "#5d6849";
      p.style.backgroundColor = "#E3E3C4";
    });
    p.addEventListener("mouseleave", () => {
      p.style.color = "rgba(255, 255, 255, 0.819)";
      p.style.backgroundColor = "#5d6849";
    });
  });
}
//page 6 starts here
function pageSix() {
  let allP = document.querySelectorAll(".page6Btm p");
  services(allP);
}
pageSix();
//page 7
function pageSeven() {
  let allP = document.querySelectorAll(".page7Btm p");
  services(allP);
}
pageSeven();
//page 8
function pageEight() {
  let allP = document.querySelectorAll(".page8Btm p");
  services(allP);
}
pageEight();
//page 11
page11Animation();
gsapAnimationPage11();
function page11Animation() {
  let alh1 = document.querySelectorAll(".page11 h1");
  textSplicting(alh1);
}
function gsapAnimationPage11() {
  gsap.to(".page11 h1 span", {
    color: "#556043",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page11 h1",
      scroller: ".main",
      start: "top 80%",
      end: "top 10%",
      scrub: 2,
      //markers:true
    },
  });
}
//page 12
page12Animation();
function page12Animation() {
  gsap.to(".page12Left img", {
    x: "-50%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page12Left img",
      scroller: ".main",
      start: "top 60%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
  gsap.to(".page12Right img", {
    x: "50%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page12Right img",
      scroller: ".main",
      start: "top 60%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
  gsap.from(".page12Mid", {
    y: "50%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page12Mid",
      scroller: ".main",
      start: "top 85%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}
//page 13 Animation
page13Animation();
function page13Animation() {
  gsap.from(".page13Container", {
    y: "65%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page13Container",
      scroller: ".main",
      start: "top 85%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}
