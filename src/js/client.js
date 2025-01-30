"use strict";

// moduel imports
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";

const $sidebarList = document.querySelector("[data-sidebar-list]");

const $notePanelTitle = document.querySelector("[data-note-panel-title]");

export const client = {
  notebook: {
    create(notebookData) {
      const $navItem = NavItem(notebookData.id, notebookData.name);
      $sidebarList.appendChild($navItem);
      activeNotebook.call($navItem);
      $notePanelTitle.textContent = notebookData.name;
    },
    // Moved read method inside notebook
    read(notebookList) {
      notebookList.forEach((notebookData, index) => {
        const $navItem = NavItem(notebookData.id, notebookData.name);
        if (index === 0) {
          activeNotebook.call($navItem);
          $notePanelTitle.textContent = notebookData.name;
        }
        $sidebarList.appendChild($navItem);
      });
    },
  },
};
