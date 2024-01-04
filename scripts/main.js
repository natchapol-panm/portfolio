const pageDiv = document.getElementById("page");
const containerDiv = document.getElementById("container");
const playerContainerDiv = document.getElementById("player-container");
const playerFramesDiv = document.getElementById("player-slide");
const startProfileDiv = document.getElementById("start-profile");
const languageTableDiv = document.getElementById("language-table");
const noteRollContainerDiv = document.getElementById("note-roll-container");
const thailandContainerDiv = document.getElementById("thailand-container");
const billboardAboutDiv = document.getElementById("billboard-about");
const billboardSkillDiv = document.getElementById("billboard-skill");
const honorContainerDiv = document.getElementById("honor-container");
const coverCheckbox = document.getElementById("checkbox-cover");
const page1Checkbox = document.getElementById("checkbox-page1");
const page2Checkbox = document.getElementById("checkbox-page2");
const otherSkillContainerDiv = document.getElementById("other-skill-container");
const busStationDiv1 = document.getElementById("bus-station-1");
const busStationDiv2 = document.getElementById("bus-station-2");
const busStationDiv3 = document.getElementById("bus-station-3");
const stageDiv = document.getElementById("stage");

const midRoll = document.querySelector(".mid-roll");
const leftRoll = document.querySelector(".left-roll");
const rightRoll = document.querySelector(".right-roll");
const aboutText = document.querySelector(".about-text");
const skillText = document.querySelector(".skill-text");
const rollText = document.querySelector(".roll-text");
const certificationDiv = document.querySelector(".certification");
const certificationText = document.querySelector(".certification-text");
const book = document.querySelector(".book");
const cover = document.querySelector(".cover");
const pages = document.querySelectorAll(".page");

const rocketTargetAnimateArray = ["870px", "870px", "640px", "640px", "350px"];
const busTargetAnimateArray = ["13500px", "15500px", "17500px"];
const busStartPointAnimateArray = ["15500px", "17500px", "19500px"];
const initialZIndexPages = [3, 2, 1];

const itemsHorizontalSpeedArray = [];
const itemsVerticalSpeedArray = [];
const itemsHorizontalArray = [];
const rocketArray = [];
const otherSkillArray = [];
const busArray = [];

const informationContainerArray = [
  languageTableDiv,
  thailandContainerDiv,
  billboardAboutDiv,
  billboardSkillDiv,
  honorContainerDiv,
  certificationDiv,
  otherSkillContainerDiv,
  busStationDiv1,
  busStationDiv2,
  busStationDiv3,
];

let pageVerticalPosition = 0;
let previousPageVerticalPosition = 0;
let deltaPageVerticalPosition = 0;
let scrollingTimeout;
let openBookTimeout;
let canAnimateLanguageTable;
let canAnimateNoteRoll;
let canAnimateAboutText;
let canAnimateSkillText;
let canAnimateHonorConDiv;
let canAnimateCertification;
let canAnimateOtherSkill;
let canAnimateBus;
let canAnimateBus1;
let canAnimateBus2;
let canAnimateBus3;
let canScrollOrSwipe;

function handlePageScroll() {
  previousPageVerticalPosition = pageVerticalPosition;
  pageVerticalPosition = window.scrollY;
  deltaPageVerticalPosition =
    pageVerticalPosition - previousPageVerticalPosition;

  if (pageVerticalPosition <= 0) {
    resetVariables();
    resetFunctions();
  }
}

function resetVariables() {
  if (pageVerticalPosition === 0) {
    canAnimateLanguageTable =
      canAnimateNoteRoll =
      canAnimateAboutText =
      canAnimateSkillText =
      canAnimateHonorConDiv =
      canAnimateCertification =
      canAnimateOtherSkill =
      canAnimateBus1 =
      canAnimateBus2 =
      canAnimateBus3 =
        true;
  }
}

function resetFunctions() {
  setAllAnimation();
}

function runFunctionAfterScroll() {
  moveLayers();

  orientPlayer();
  animateInformation();
}

function moveLayers() {
  for (let i = 0; i < itemsHorizontalArray.length; i++) {
    itemsHorizontalArray[i].style.left = `${
      -1 * itemsHorizontalSpeedArray[i] * pageVerticalPosition
    }px`;
  }
}

function setItemsSpeed() {
  itemsHorizontalSpeedArray.length = 0;
  itemsVerticalSpeedArray.length = 0;

  for (let i = 0; i < itemsHorizontalArray.length; i++) {
    const horizontalSpeedRatio =
      (itemsHorizontalArray[i].offsetWidth - containerDiv.offsetWidth) /
      (itemsHorizontalArray[itemsHorizontalArray.length - 1].offsetWidth -
        containerDiv.offsetWidth);
    itemsHorizontalSpeedArray.push(horizontalSpeedRatio);
  }
}

function setPageHeight() {
  const pageHeight =
    itemsHorizontalArray[itemsHorizontalArray.length - 1].offsetWidth -
    containerDiv.offsetWidth;
  pageDiv.style.height = pageHeight + "px";
}

function setPositionStartProfile() {
  startProfileDiv.style.width = containerDiv.offsetWidth + "px";
}

function animateRocket() {
  for (let i = 0; i < rocketArray.length; i++) {
    rocketArray[i].style.left = rocketTargetAnimateArray[i];
  }
}

function animateHonorContainer() {
  honorContainerDiv.style.transition = "top 0.5s ease-out";

  honorContainerDiv.style.top = "0";
}

function animateBus(i) {
  busArray[i].style.transition = "left 0.5s ease-out";

  // Apply the animation effect by changing the 'left' property
  busArray[i].style.left = busTargetAnimateArray[i];
}

function animateOtherSkill() {
  otherSkillArray.forEach((element, i) => {
    element.style.transition = "bottom 1s cubic-bezier(0.4, 0, 0.2, 1.5)";

    setTimeout(() => {
      element.style.bottom = "10%";
    }, i * 400);
  });
}

function positionOtherSkill() {
  for (let i = 0; i < otherSkillArray.length; i++) {
    otherSkillArray[i].style.bottom = canAnimateOtherSkill ? "-100%" : "10%";
  }
}

function positionRockets() {
  for (let i = 0; i < rocketArray.length; i++) {
    rocketArray[i].style.left = canAnimateLanguageTable
      ? "10%"
      : rocketTargetAnimateArray[i];
  }
}

function positionItemsAnimate() {
  noteRollContainerDiv.style.top = canAnimateNoteRoll ? "0" : "30%";
  midRoll.style.width = canAnimateNoteRoll ? "0" : "100%";
  midRoll.style.opacity = canAnimateNoteRoll ? "0" : "1";
  leftRoll.style.left = canAnimateNoteRoll ? "50%" : "0";
  rightRoll.style.right = canAnimateNoteRoll ? "50%" : "0";
  honorContainerDiv.top = canAnimateHonorConDiv ? "-100%" : "0";
  for (i = 0; i < busArray.length; i++) {
    if (i === 0) canAnimateBus = canAnimateBus1;
    else if (i === 1) canAnimateBus = canAnimateBus2;
    else if (i === 2) canAnimateBus = canAnimateBus3;
    busArray[i].style.left = canAnimateBus
      ? busStartPointAnimateArray[i]
      : busTargetAnimateArray[i];
  }
}

function opacityText() {
  aboutText.style.opacity = canAnimateAboutText ? "0" : "1";
  skillText.style.opacity = canAnimateSkillText ? "0" : "1";
  certificationText.style.opacity = canAnimateCertification ? "0" : "1";
}

function setAllAnimation() {
  positionItemsAnimate();
  positionRockets();
  positionOtherSkill();
  opacityText();
}

function animateInformation() {
  for (let i = 0; i < informationContainerArray.length; i++) {
    if (
      previousPageVerticalPosition + 0.5 * containerDiv.offsetWidth <
        informationContainerArray[i].offsetLeft ||
      previousPageVerticalPosition + 0.5 * containerDiv.offsetWidth >
        informationContainerArray[i].offsetLeft +
          informationContainerArray[i].offsetWidth
    ) {
      if (
        pageVerticalPosition + 0.5 * containerDiv.offsetWidth >
          informationContainerArray[i].offsetLeft &&
        pageVerticalPosition + 0.5 * containerDiv.offsetWidth <
          informationContainerArray[i].offsetLeft +
            informationContainerArray[i].offsetWidth
      ) {
        if (
          informationContainerArray[i] === thailandContainerDiv &&
          canAnimateNoteRoll &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            thailandContainerDiv.offsetLeft
        ) {
          animateNoteRollContainer();
          canAnimateNoteRoll = false;
        } else if (
          informationContainerArray[i] === languageTableDiv &&
          canAnimateLanguageTable &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            languageTableDiv.offsetLeft
        ) {
          animateRocket();
          canAnimateLanguageTable = false;
        } else if (
          informationContainerArray[i] === billboardAboutDiv &&
          canAnimateAboutText &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            billboardAboutDiv.offsetLeft
        ) {
          animateOpacityText(aboutText);
          canAnimateAboutText = false;
        } else if (
          informationContainerArray[i] === billboardSkillDiv &&
          canAnimateSkillText &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            billboardSkillDiv.offsetLeft
        ) {
          animateOpacityText(skillText);
          canAnimateSkillText = false;
        } else if (
          informationContainerArray[i] === honorContainerDiv &&
          canAnimateHonorConDiv &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            honorContainerDiv.offsetLeft
        ) {
          animateHonorContainer();
          canAnimateHonorConDiv = false;
        } else if (
          informationContainerArray[i] === certificationDiv &&
          canAnimateCertification &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            certificationDiv.offsetLeft
        ) {
          animateOpacityText(certificationText);
          canAnimateCertification = false;
        } else if (
          informationContainerArray[i] === otherSkillContainerDiv &&
          canAnimateOtherSkill &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            otherSkillContainerDiv.offsetLeft
        ) {
          animateOtherSkill();
          canAnimateOtherSkill = false;
        } else if (
          informationContainerArray[i] === busStationDiv1 &&
          canAnimateBus1 &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            busStationDiv1.offsetLeft
        ) {
          animateBus(0);
          canAnimateBus1 = false;
        } else if (
          informationContainerArray[i] === busStationDiv2 &&
          canAnimateBus2 &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            busStationDiv2.offsetLeft
        ) {
          animateBus(1);
          canAnimateBus2 = false;
        } else if (
          informationContainerArray[i] === busStationDiv3 &&
          canAnimateBus3 &&
          pageVerticalPosition + 0.5 * containerDiv.offsetWidth >=
            busStationDiv3.offsetLeft
        ) {
          animateBus(2);
          canAnimateBus3 = false;
        }
      }
    }
  }
}

function animateOpacityText(textClass) {
  textClass.style.transition = "opacity 0.3s ease-in-out";
  textClass.style.opacity = "1";

  clearTimeout(textClass.timeoutId);

  textClass.timeoutId = setTimeout(() => {
    textClass.style.transition = "";
  }, 300);
}

function animateNoteRollContainer() {
  noteRollContainerDiv.style.transition = "top 0.5s ease-out";

  setTimeout(() => {
    noteRollContainerDiv.style.top = "250px";

    setTimeout(() => {
      midRoll.style.transition = "width 0.5s ease-out, opacity 0.5s ease-out";
      midRoll.style.width = "100%";
      midRoll.style.opacity = "1";

      setTimeout(() => {
        rollText.style.opacity = "1";
      }, 250);

      leftRoll.style.transition = "left 0.5s ease-out";
      leftRoll.style.left = "0";

      rightRoll.style.transition = "right 0.5s ease-out";
      rightRoll.style.right = "0";
    }, 500);
  }, 0);
}

function storeDivs() {
  const divs = document.getElementsByTagName("div");

  for (let t = 0; t < divs.length; t++) {
    const className = divs[t].getAttribute("class");
    switch (className) {
      case "items-horizontal":
        itemsHorizontalArray.push(divs[t]);
        break;
      case "rocket":
        rocketArray.push(divs[t]);
        break;
      case "other-skill":
        otherSkillArray.push(divs[t]);
        break;
      case "bus":
        busArray.push(divs[t]);
        break;
    }
  }
}

function pauseAnimationPlayer() {
  playerFramesDiv.style.animationPlayState = "paused";
  playerFramesDiv.classList.remove("walk-animation");

  setPlayerToFront();
}

function playAnimationPlayer() {
  playerFramesDiv.style.animationPlayState = "running";
}

function setPlayerToFront() {
  playerFramesDiv.style.top = "-500px";
  playerFramesDiv.style.left = "0";
}

function orientPlayer() {
  playerFramesDiv.classList.add("walk-animation");
  if (deltaPageVerticalPosition > 0) {
    // Scrolling down
    playerFramesDiv.style.top = "0";
  } else {
    // Scrolling up
    playerFramesDiv.style.top = "-250px";
  }
}

function initTouchEvents() {
  document.addEventListener("touchstart", handleStart);
  document.addEventListener("touchmove", handleMove);
  document.addEventListener("touchend", handleEnd);
}
function handleStart(e) {
  touchStartX = e.targetTouches[0].pageX;
  pageVerticalPositionOnTouch = pageVerticalPosition;
}
function handleMove(e) {
  e.preventDefault();
  touchCurrentX = e.targetTouches[0].pageX;

  if (canScrollOrSwipe === true) {
    // detectPageVerticalPosition();
    runTheseFunctionsAfterScrollOrSwipe();
  }
}
function handleEnd(e) {
  e.preventDefault();
  touchEndX = e.changedTouches[0].pageX;
}

window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

function onLoad() {
  initTouchEvents();
  storeDivs();
  setPageHeight();
  setItemsSpeed();
  setPlayerToFront();
  setPositionStartProfile();
  resetVariables();
  resetFunctions();
}

window.addEventListener("load", onLoad);

function onScroll() {
  handlePageScroll();
  runFunctionAfterScroll();
  playAnimationPlayer();
  clearTimeout(scrollingTimeout);

  scrollingTimeout = setTimeout(function () {
    pauseAnimationPlayer();
  }, 300);
}

window.addEventListener("scroll", onScroll);

function onResize() {
  setPageHeight();
  setItemsSpeed();
  moveLayers();
  setPositionStartProfile();
  pauseAnimationPlayer();
  setAllAnimation();
  animateInformation();
  handlePageScroll();
}

window.addEventListener("resize", onResize);
