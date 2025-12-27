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

//animation for all
function downToUpAnimation(pageNumber) {
  gsap.from(pageNumber, {
    opacity: 0,
    duration: 2,
    marginTop: "25vw",
    scrollTrigger: {
      trigger: pageNumber,
      scroller: ".main",
      start: "top 95%",
      end: "top 60%",
      scrub: true,
    },
  });
}

//all page 1
page1();
function page1() {
  let tl = gsap.timeline();
  tl.from(".nav svg ", {
    y: -100,
    duration: 0.5,
  });
  tl.from(".page1 img", {
    scale: 0.5,
    duration: 2,
    delay: 0.5,
  });
  tl.from(".navRight,.icon", {
    opacity: 0,
    y: -500,
  });
}

//all page 2
textSplicting();
gsapAnimation();
function textSplicting() {
  let alh1 = document.querySelectorAll(".page2 h1");
  alh1.forEach((elem) => {
    let clutter = "";
    elem.textContent.split("").forEach((latter) => {
      clutter += `<span>${latter}</span>`;
    });
    elem.innerHTML = clutter;
  });
}

function gsapAnimation() {
  gsap.to(".page2 h1 span", {
    color: "#e3e3c4",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page2 h1",
      scroller: ".main",
      start: "top 90%",
      end: "top 0%",
      scrub: 2,
      // markers:true
    },
  });
}

//all page 3
textSplicting3();
gsapAnimation3();
function textSplicting3() {
  let alh1 = document.querySelectorAll(".page3 h1");
  alh1.forEach((elem) => {
    let clutter = "";
    elem.textContent.split("").forEach((latter) => {
      clutter += `<span>${latter}</span>`;
    });
    elem.innerHTML = clutter;
  });
}

downToUpAnimation(
  ".page3Info1 p,.page3Info1 h4,page3Info1 button,.page3Info1 img"
);

function gsapAnimation3() {
  gsap.to(".page3 h1 span", {
    color: "#434b34",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page3 h1",
      scroller: ".main",
      start: "top 50%",
      end: "top 50%",
      scrub: 2,
    },
  });
}

//page 4 starts here
pageFour();
function pageFour() {
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

//page 5
pageFive();
function pageFive() {
  let leftBtn = document.querySelector(".page5Buttons #left");
  let rightBtn = document.querySelector(".page5Buttons #right");
  let numOne = document.querySelector(".page5Buttons .numOne");
  let left = document.querySelector(".page5ImgBoxLeft");
  let mid = document.querySelector(".page5ImgBoxMid ");
  let right = document.querySelector(".page5ImgBoxRight");
  let images = ["/ass/1.jpg", "/ass/2.jpg", "/ass/3.jpg"];
  let index = 1;

  rightBtn.addEventListener("click", () => {
    if (index == 1) {
      left.style.backgroundImage = ` url(${images[index - 1]})`;
      mid.style.backgroundImage = ` url(${images[index]})`;
      right.style.backgroundImage = ` url(${images[index + 1]})`;
      index++;
      numOne.textContent = index;
      leftBtn.style.opacity = 1;
    } else if (index == 2) {
      left.style.backgroundImage = ` url(${images[index - 1]})`;
      mid.style.backgroundImage = ` url(${images[index]})`;
      right.style.backgroundImage = ` url()`;
      index++;
      numOne.textContent = index;
      rightBtn.style.opacity = 0.6;
    }
  });

  leftBtn.addEventListener("click", () => {
    if (index == 2) {
      left.style.backgroundImage = ` url()`;
      mid.style.backgroundImage = ` url(${images[index - 2]})`;
      right.style.backgroundImage = ` url(${images[index - 1]})`;
      index--;
      numOne.textContent = index;
      leftBtn.style.opacity = 0.6;
    } else if (index == 3) {
      left.style.backgroundImage = ` url(${images[index - 3]})`;
      mid.style.backgroundImage = ` url(${images[index - 2]})`;
      right.style.backgroundImage = ` url(${images[index - 1]})`;
      index--;
      numOne.textContent = index;
      rightBtn.style.opacity = 1;
    }
  });
}

//page 6
//heading text
page6Animation();
function page6Animation() {
  let alh1 = document.querySelectorAll(".page6 .txt h1");
  textSplictingPage6(alh1);
}
gsapAnimationPage6();
function textSplictingPage6(alh1) {
  alh1.forEach((elem) => {
    let clutter = "";
    elem.textContent.split("").forEach((latter) => {
      clutter += `<span>${latter}</span>`;
    });
    elem.innerHTML = clutter;
  });
}

function gsapAnimationPage6() {
  gsap.to(".page6 .txt h1 span", {
    color: "#E3E3C4",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page6 .txt h1",
      scroller: ".main",
      start: "top 90%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}
downToUpAnimation(".page6Mid");

//page 7
page7Animation();
gsapAnimationPage7();
function page7Animation() {
  let alh1 = document.querySelectorAll(".page7 h1");
  textSplictingPage6(alh1);
}
function gsapAnimationPage7() {
  gsap.to(".page7 h1 span", {
    color: "#556043",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page7 h1",
      scroller: ".main",
      start: "top 80%",
      end: "top 10%",
      scrub: 2,
      //markers:true
    },
  });
}
//page 8
page8Animation();
function page8Animation() {
  gsap.to(".page8Left img", {
    x: "-50%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page8Left img",
      scroller: ".main",
      start: "top 60%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
  gsap.to(".page8Right img", {
    x: "50%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page8Right img",
      scroller: ".main",
      start: "top 60%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
  gsap.from(".page8Mid", {
    y: "50%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page8Mid",
      scroller: ".main",
      start: "top 85%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}

//page 9
//heading text
page9Animation();
function page9Animation() {
  let alh1 = document.querySelectorAll(".page9 .txt h1");
  textSplictingPage6(alh1);
}
gsapAnimationPage9();
function gsapAnimationPage9() {
  gsap.to(".page9 .txt h1 span", {
    color: "#E3E3C4",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page9 .txt h1",
      scroller: ".main",
      start: "top 90%",
      end: "top 70%",
      scrub: 2,
      //markers: true,
    },
  });
}

downToUpAnimation9(".page9 img");
function downToUpAnimation9(pageNumber) {
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

//page 12 Animation
page12Animation();
function page12Animation() {
  gsap.from(".page12Container", {
    y: "65%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".page12Container",
      scroller: ".main",
      start: "top 85%",
      end: "top 20%",
      scrub: 2,
      //markers: true,
    },
  });
}
