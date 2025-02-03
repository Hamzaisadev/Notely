"use strict";

// moduel imports
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const $sidebarList = document.querySelector("[data-sidebar-list]");

const $notePanelTitle = document.querySelector("[data-note-panel-title]");
const $notePanelContent = document.querySelector("[data-note-panel]");
const emptyNotesTemplate = ` <div class="empty-notes">
        <span class="material-symbols-rounded" aria-hidden="true"
          >note_stack</span
        >

        <div class="text-headline-small">No notes</div>
      </div> `;

const $noteCreateBtns = document.querySelectorAll("[data-note-create-btn]");

const disabledNoteCreateBtns = function (isThereAnyNotebook) {
  $noteCreateBtns.forEach(($item) => {
    // Ensure the button is enabled if there are notebooks, otherwise disable it
    if (isThereAnyNotebook) {
      $item.removeAttribute("disabled");
    } else {
      $item.setAttribute("disabled", "true");
    }
  });
};

export const client = {
  notebook: {
    create(notebookData) {
      const $navItem = NavItem(notebookData.id, notebookData.name);
      $sidebarList.appendChild($navItem);
      activeNotebook.call($navItem);
      $notePanelTitle.textContent = notebookData.name;
      $notePanelContent.innerHTML = emptyNotesTemplate;
      disabledNoteCreateBtns(true);
    },
    // Moved read method inside notebook
    read(notebookList) {
      disabledNoteCreateBtns(notebookList.length);
      notebookList.forEach((notebookData, index) => {
        const $navItem = NavItem(notebookData.id, notebookData.name);
        if (index === 0) {
          activeNotebook.call($navItem);
          $notePanelTitle.textContent = notebookData.name;
        }
        $sidebarList.appendChild($navItem);
      });
    },
    update(notebookId, notebookData) {
      const $oldNotebook = document.querySelector(
        `[data-notebook="${notebookId}"`
      );
      const $newNotebook = NavItem(notebookData.id, notebookData.name);
      $notePanelTitle.textContent = notebookData.name;
      $sidebarList.replaceChild($newNotebook, $oldNotebook);
      activeNotebook.call($newNotebook);
    },
    delete(notebookId) {
      const $deletedNotebook = document.querySelector(
        `[data-notebook="${notebookId}"]`
      );
      const $activeNavItem =
        $deletedNotebook.nextElementSibling ??
        $deletedNotebook.previousElementSibling;

      if ($activeNavItem) {
        $activeNavItem.click();
      } else {
        $notePanelTitle.innerHTML = "";
        $notePanelContent.innerHTML = "";
        disabledNoteCreateBtns(false);
      }

      $deletedNotebook.remove();
    },
  },
  note: {
    create(noteData) {
      if (!$notePanelContent.querySelector("[data-note]"))
        $notePanelContent.innerHTML = "";
      const $card = Card(noteData);
      $notePanelContent.appendChild($card);
    },
    read(noteList) {
      if (noteList.length) {
        $notePanelContent.innerHTML = "";

        noteList.forEach((noteData) => {
          const $card = Card(noteData);
          $notePanelContent.appendChild($card);
        });
      } else {
        $notePanelContent.innerHTML = empyNotesTemplate;
      }
    },
  },
};
