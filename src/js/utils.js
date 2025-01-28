"use strict";

// lets make a event listner function to use in app.js

// this function will take three arguments an element to target , event type and function that will be called when the event is triggered
const addEventOnElems = function ($elements, eventType, callback) {
  // loop through each element and add the event listener
  $elements.forEach(($element) =>
    $element.addEventListener(eventType, callback)
  );
};

/**
 * Generate a greeting message based on the current hour of the day
 * @param {number} currentHour - The current hour (1 to 24) to determine the appropriate 
 * @returns {string} - The greeting message

 */

const getGreetingMsg = function (currentHour) {
  const /**{String} */ greeting =
      currentHour < 5
        ? "Night"
        : currentHour < 12
        ? "Morning"
        : currentHour < 15
        ? "Noon"
        : currentHour < 17
        ? "Afternoon"
        : currentHour < 20
        ? "Evening"
        : "Night";

  return `Good ${greeting}`;
};

// SHOW CURRENT DATE IN HOMEPAGE

const /**{HTMLElement} */ $currentDateElem = document.querySelector(
    "[data-current-date]"
  );
$currentDateElem.textContent = new Date().toDateString().replace(" ", ", ");

// Export this

export { addEventOnElems, getGreetingMsg };
