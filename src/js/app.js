// USING STRICT

"use strict";

// --------------------===========<<  IMPORTS >>===========--------------------
// Importing utility functions from utils.js
import { addEventOnElems, getGreetingMsg } from "./utils.js";

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

/** show greeting message on homepage */
const /** {HTMLElement} */ $greetElement =
    document.querySelector("[data-greeting]");

// getting current hour using Date()

const /**{number} */ currentHour = new Date().getHours();

// Using the getGreetingMsg function from utils.js to get the greeting message

$greetElement.textContent = getGreetingMsg(currentHour);
