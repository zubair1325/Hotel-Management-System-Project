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

//page 7Animation
page7Animation();
function page7Animation() {
  gsap.from(".page7Container", {
    y: "65%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page7Container",
      scroller: ".main",
      start: "top 85%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}
//page 8 Animation
page8Animation();
function page7Animation() {
  gsap.from(".page8Container", {
    y: "65%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page7Container",
      scroller: ".main",
      start: "top 85%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}
