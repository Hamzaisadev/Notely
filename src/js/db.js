"use strict";
// imports
import {
  findNote,
  findNotebook,
  findNotebookIndex,
  findNoteIndex,
  generateId,
} from "./utils.js";

// DB OBJECT

let /** {Object} */ notekeeperDB = {};

const initDB = function () {
  const /** {JSON | undefined } */ db = localStorage.getItem("notekeeperDB");

  if (db) {
    notekeeperDB = JSON.parse(db);
  } else {
    notekeeperDB.notebooks = [];
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
  }
};

initDB();

/**Reads and loads the localStorage data in the global variable `notekeeperDb` */

const readDb = function () {
  notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
};

const writeDb = function () {
  localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
};

/** 
 * collection of functuon for performing crud operations (Create, Read , Update , Delete) operation on database{
 * The database is state is managed by global variables and local storage
 * 
 * @namespace
 * @property {object} get = function from retrieving data from database
 * 
 * @property {object} post = function for creating data in database
 * 
 * @property {object} update - function for updating data in database
 * 
 * @property {object} delete - function  for deleting data in database
  
 }
 * */

export const db = {
  post: {
    /** Adds a new notebook to the database
     * @function
     * @param {string} name = the name of the new notebook
     * @returns {object} The newly created notebook
     *
     */
    notebook(name) {
      readDb();
      const /*{object} */ notebookData = {
          id: generateId(),
          name,
          notes: [],
        };
      notekeeperDB.notebooks.push(notebookData);

      writeDb();

      return notebookData;
    },

    note(notebookId, object) {
      readDb();
      const notebook = findNotebook(notekeeperDB, notebookId);
      const noteData = {
        id: generateId(),
        notebookId,
        ...object,
        postedOn: new Date().getTime(),
      };
      notebook.notes.unshift(noteData);
      writeDb();
      return noteData;
    },
  },
  get: {
    notebook() {
      readDb();
      return notekeeperDB.notebooks;
    },
    note(notebookId) {
      readDb();
      const notebook = findNotebook(notekeeperDB, notebookId);
      return notebook.notes;
    },
  },
  update: {
    notebook(notebookId, name) {
      readDb();
      const notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;
      writeDb();
      return notebook;
    },
    note(noteId, object) {
      readDb();
      const oldNote = findNote(notekeeperDB, noteId);
      const newNote = Object.assign(oldNote, object);
      writeDb();
      return newNote;
    },
  },
  delete: {
    notebook(notebookId) {
      readDb();
      const notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
      console.log(notebookIndex);

      notekeeperDB.notebooks.splice(notebookIndex, 1);
      writeDb();
    },
    note(notebookId, noteId) {
      readDb();

      const notebook = findNotebook(notekeeperDB, notebookId);
      const noteIndex = findNoteIndex(notebook, noteId);
      notebook.notes.splice(noteIndex, 1);
      writeDb();
      return notebook.notes;
    },
  },
};
