"use strict";

// DB OBJECT

let /** {Object} */ notekeeperDB = {};

const initDB = function () {
  const /** {JSON | undefined } */ db = localStorage.getItem("notekeeperDB");

  if (db) {
    notekeeperDB = JSON.parse(db);
  } else {
    notekeeperDB.notekeeper = [];
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
  }
};

initDB();

export const db = {};
