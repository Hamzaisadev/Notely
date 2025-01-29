// USING STRICT

"use strict";

// --------------------===========<<  IMPORTS >>===========--------------------
// Importing utility functions from utils.js
import {
  addEventOnElems,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
} from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";

// --------------------===========<<  SIDEBAR TOGGLE >>===========--------------------

// Selecting the sidebar toggle button using query selector
const /**{HTMLElement} */ $sidebar = document.querySelector("[data-sidebar]");
// Selecting all elements that can toggle the sidebar
const /**{Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll(
    "[data-sidebar-toggler]"
  );
// Selecting the overlay element that covers the main content when the sidebar is active
const /**{HTMLElement} */ $overlay = document.querySelector(
    "[data-sidebar-overlay]"
  );

// using dollar sign for variable to imply that it's a DOM element

// Adding event listeners to the sidebar toggle buttons and overlay
// The addEventOnElems function is created in utils.js to handle event binding
addEventOnElems($sidebarTogglers, "click", function () {
  // Toggle the 'active' class on the sidebar to show/hide it
  $sidebar.classList.toggle("active");
  // Toggle the 'active' class on the overlay to show/hide it
  $overlay.classList.toggle("active");
});

// --------------------===========<<  INITIALIZE TOOLTIP >>===========--------------------
// Selecting the tooltip element
const /** {Array<HTMLElement>} */ $tooltipElems =
    document.querySelectorAll("[data-tooltip]");
$tooltipElems.forEach(($elem) => Tooltip($elem));

// --------------------===========<<  GREETING MESSAGE >>===========--------------------

/** show greeting message on homepage */
const /** {HTMLElement} */ $greetElement =
    document.querySelector("[data-greeting]");

// getting current hour using Date()

const /**{number} */ currentHour = new Date().getHours();

// Using the getGreetingMsg function from utils.js to get the greeting message

$greetElement.textContent = getGreetingMsg(currentHour);

// SHOW CURRENT DATE IN HOMEPAGE

const /**{HTMLElement} */ $currentDateElem = document.querySelector(
    "[data-current-date]"
  );
$currentDateElem.textContent = new Date().toDateString().replace(" ", ", ");

// --------------------===========<<  NOTEBOOK CREATE >>===========--------------------

const /**{HTMLElement} */ $sidebarList = document.querySelector(
    "[data-sidebar-list]"
  );
const /**{HTMLElement} */ $addNotebookBtn = document.querySelector(
    "[data-add-notebook]"
  );

const showNotebookField = function () {
  const /** {HTMLElement} */ $navItem = document.createElement("div");
  $navItem.classList.add("nav-item");
  $navItem.innerHTML = `
  <span class='text text-label-large' data-notebook-field> </span>
  <div class='state-layer' ></div>
  `;
  $sidebarList.appendChild($navItem);

  const /** {HTMLElement} */ $navItemField = $navItem.querySelector(
      "[data-notebook-field]"
    );
  activeNotebook.call($navItem);

  makeElemEditable($navItemField);

  $navItemField.addEventListener("keydown", createNotebook);
};

$addNotebookBtn.addEventListener("click", showNotebookField);

const createNotebook = function (event) {
  if (event.key === "enter") {
  }
};
