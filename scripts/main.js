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
  $(honorContainerDiv).stop().animate(
    {
      top: "0",
    },
    500
  );
}

function animateBus(i) {
  $(busArray[i]).stop().animate(
    {
      left: busTargetAnimateArray[i],
    },
    1000
  );
}

function animateOtherSkill() {
  for (let i = 0; i < otherSkillArray.length; i++) {
    $(otherSkillArray[i])
      .stop()
      .delay(i * 600)
      .animate({
        bottom: ["10%", "easeOutElastic"],
      }),
      2000;
  }
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
          canAnimateNoteRoll
        ) {
          animateNoteRollContainer();
          canAnimateNoteRoll = false;
        } else if (
          informationContainerArray[i] === languageTableDiv &&
          canAnimateLanguageTable
        ) {
          animateRocket();
          canAnimateLanguageTable = false;
        } else if (
          informationContainerArray[i] === billboardAboutDiv &&
          canAnimateAboutText
        ) {
          animateOpacityText(aboutText);
          canAnimateAboutText = false;
        } else if (
          informationContainerArray[i] === billboardSkillDiv &&
          canAnimateSkillText
        ) {
          animateOpacityText(skillText);
          canAnimateSkillText = false;
        } else if (
          informationContainerArray[i] === honorContainerDiv &&
          canAnimateHonorConDiv
        ) {
          animateHonorContainer();
          canAnimateHonorConDiv = false;
        } else if (
          informationContainerArray[i] === certificationDiv &&
          canAnimateCertification
        ) {
          animateOpacityText(certificationText);
          canAnimateCertification = false;
        } else if (
          informationContainerArray[i] === otherSkillContainerDiv &&
          canAnimateOtherSkill
        ) {
          animateOtherSkill();
          canAnimateOtherSkill = false;
        } else if (informationContainerArray[i] === busStationDiv1) {
          animateBus(0);
          canAnimateBus1 = false;
        } else if (informationContainerArray[i] === busStationDiv2) {
          animateBus(1);
          canAnimateBus2 = false;
        } else if (informationContainerArray[i] === busStationDiv3) {
          animateBus(2);
          canAnimateBus3 = false;
        }
      }
    }
  }
}

function animateOpacityText(textClass) {
  $(textClass)
    .stop()
    .animate(
      { opacity: ["1", "swing"] },

      300
    );
}

function animateNoteRollContainer() {
  $(noteRollContainerDiv)
    .stop()
    .animate(
      {
        top: ["30%", "swing"],
      },
      {
        duration: 500,
        easing: "swing",
        complete: function () {
          $(midRoll).stop().animate(
            {
              width: "100%",
              opacity: "1",
            },
            {
              duration: 500,
              easing: "easeOutBounce",
            }
          );

          $(leftRoll).stop().animate(
            {
              left: "0",
            },
            {
              duration: 500,
              easing: "easeOutBounce",
            }
          );

          $(rightRoll).stop().animate(
            {
              right: "0",
            },
            {
              duration: 500,
              easing: "easeOutBounce",
            }
          );
        },
      }
    );
}

function animateBook() {
  // coverCheckbox.addEventListener("change", function () {
  //   if (coverCheckbox.checked) {
  //     cover.style.transition = "transform 1.5s, z-index 0.5s 0.5s";
  //     cover.style.transform = "rotateY(-180deg)";
  //     cover.style.zIndex = 1;
  //     pages.forEach(
  //       (page) => (page.style.boxShadow = "0 0 2px rgb(99, 98, 98)")
  //     );
  //   } else {
  //     pages.forEach((page, index) => {
  //       page.style.transform = "rotateY(0deg)";
  //       page.style.zIndex = initialZIndexPages[index];
  //     });
  //     page1Checkbox.checked = false;
  //     page2Checkbox.checked = false;
  //     cover.style.transition = "transform 2s";
  //     cover.style.transform = "rotateY(0deg)";
  //     cover.style.zIndex = 4;
  //   }
  // });
  // page1Checkbox.addEventListener("change", function () {
  //   if (page1Checkbox.checked) {
  //     pages[0].style.transform = "rotateY(-180deg)";
  //     pages[0].style.zIndex = 2;
  //   } else {
  //     pages[0].style.transform = "rotateY(0deg)";
  //     pages[0].style.zIndex = 3;
  //   }
  // });
  // page2Checkbox.addEventListener("change", function () {
  //   if (page2Checkbox.checked) {
  //     pages[1].style.transform = "rotateY(-180deg)";
  //     pages[1].style.zIndex = 3;
  //   } else {
  //     pages[1].style.transform = "rotateY(0deg)";
  //     pages[1].style.zIndex = 2;
  //   }
  // });
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

$(window).on("beforeunload", function () {
  $(window).scrollTop(0);
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
  animateBook();
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
