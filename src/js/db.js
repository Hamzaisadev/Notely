"use strict";
// imports
import { generateId } from "./utils.js";

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
  },
};
