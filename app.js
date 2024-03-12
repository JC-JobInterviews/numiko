const titles = ["One", "Two", "Three", "Four", "Five", "Six", "Seven"];
const navbar = document.querySelector("nav");
const navPosition = navbar.offsetTop;
const navBTN = document.querySelector("#navButton");
const accordianContainer = document.querySelector("#accordianContainer");
const accordianNode = document.querySelector("#accordianNav");
const progressBarNode = document.querySelector("#progressBar");
const navTitleNode = document.querySelector("#navSection");
let navTrayState = false;

function createSections() {
  const mainNode = document.querySelector("main");

  createElement = (titleNum) => {
    const sectionNode = document.createElement("section");
    sectionNode.setAttribute("id", titleNum);
    const textNode = document.createElement("h4");
    textNode.textContent = `Section ${titleNum}`;
    sectionNode.appendChild(textNode);
    return sectionNode;
  };

  for (let i = 0; i < titles.length; i++) {
    const newNode = createElement(titles[i]);
    if (i === 0) {
      newNode.setAttribute("style", "margin-top: 0;");
    }
    mainNode.appendChild(newNode);
  }
}

function navBarPositioning() {
  // console.log(navPosition, window.scrollY);
  const position = window.scrollY;
  updateProgressBar(position);
  updateNavTitle(position);
  if (position >= navPosition && position < 6000) {
    navbar.classList.add("navBarStick");
  } else {
    navbar.classList.remove("navBarStick");
  }
}

function updateProgressBar(position) {
  const widthCalc = (position / appTotalHeight) * 100;
  // console.log(widthCalc);
  progressBarNode.style.width = `${widthCalc + 15}dvw`;
}

function updateNavTitle(position) {
  const positionId =
    Math.floor((position - 775) / 660) < 1
      ? 0
      : Math.floor((position - 775) / 660);
  const titleNum = titles[positionId];
  // console.log(positionId);
  navTitleNode.innerHTML = `Section ${titleNum}`;
}

function navAccordianLinks() {
  createElement = (titleNum) => {
    const anchorNode = document.createElement("a");
    anchorNode.setAttribute("href", `#${titleNum}`);
    const textNode = document.createElement("h4");
    textNode.textContent = `Section ${titleNum}`;
    anchorNode.appendChild(textNode);
    return anchorNode;
  };

  for (let i = 0; i < titles.length; i++) {
    const newNode = createElement(titles[i]);
    accordianNode.appendChild(newNode);
  }
}

// event listners
navBTN.addEventListener("click", () => {
  navTrayState = !navTrayState;
  if (navTrayState) {
    navBTN.innerHTML = "Hide";
    accordianContainer.removeAttribute("class");
  } else {
    navBTN.innerHTML = "Show";
    accordianContainer.setAttribute("class", "accordHide");
  }
});

// Lifecyle events
createSections();
navAccordianLinks();
window.onscroll = () => navBarPositioning();

let appTotalHeight = document.body.scrollHeight;
