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

let /** {HTMLElement | Undefined} */ $lastActiveNavItem;

/**
 * Activate a navigation item by adding a active class and deactivates the last active item
 */

const activeNotebook = function () {
  $lastActiveNavItem?.classList.remove("active");
  this.classList.add("active");
  $lastActiveNavItem = this;
};

const makeElemEditable = function ($element) {
  $element.contentEditable = "true";
  $element.focus();
};

/**
 *
 * Generate a unique id based on current timestamp
 * @returns {string} - The unique id
 */
const generateId = function () {
  return new Date().getTime().toString();
};

const findNotebook = function (db, notebookId) {
  return db.notebooks.find((notebook) => notebook.id === notebookId);
};

const findNotebookIndex = function (db, notebookId) {
  return db.notebooks.findIndex((item) => item.id === notebookId);
};

const formateDate = function (milliseconds) {
  const currentTime = new Date().getTime();
  const minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);

  return minute < 1
    ? "Just now"
    : minute < 60
    ? `${minute} minutes ago`
    : hour < 24
    ? `${hour} hours ago`
    : `${day} day ago`;
};

const findNote = (db, noteId) => {
  let note;
  for (const notebook of db.notebooks) {
    note = notebook.notes.find((note) => note.id === noteId);
    if (note) break;
  }
  return note;
};

const findNoteIndex = function (notebook, noteId) {
  return notebook.notes.findIndex((note) => note.id === noteId);
};

// Export this

export {
  addEventOnElems,
  getGreetingMsg,
  activeNotebook,
  makeElemEditable,
  generateId,
  findNotebook,
  findNotebookIndex,
  formateDate,
  findNote,
  findNoteIndex,
};
