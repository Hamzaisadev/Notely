"use strict";

// lets make a event listner function to use in app.js

// this function will take three arguments an element to target , event type and function that will be called when the event is triggered
const addEventOnElems = function ($elements, eventType, callback) {
  // loop through each element and add the event listener
  $elements.forEach(($element) =>
    $element.addEventListener(eventType, callback)
  );
};

// Export this

export { addEventOnElems };
