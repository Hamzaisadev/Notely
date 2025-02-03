// moduel Imports;
import { client } from "../client.js";
import { db } from "../db.js";
import { activeNotebook, makeElemEditable } from "../utils.js";
import { DeleteConfirmModal } from "./Modal.js";
import { Tooltip } from "./Tooltip.js";

const $notePanelTitle = document.querySelector("[data-note-panel-title]");

export const NavItem = function (id, name) {
  const $navItem = document.createElement("div");
  $navItem.classList.add("nav-item");
  $navItem.setAttribute("data-notebook", id);

  $navItem.innerHTML = `
   <span class="text text-label-large" data-notebook-field
  >${name}</span
>
<button
  class="icon-btn small"
  aria-label="Edit notebook"
  data-tooltip="Edit notebook"
  data-edit-button
>
  <span class="material-symbols-rounded" aria-hidden="true"
    >edit</span
  >
  <div class="state-layer"></div>
</button>
<button
  class="icon-btn small"
  aria-label="Delete notebook"
  data-tooltip="Delete notebook"
  data-delete-button
>
  <span class="material-symbols-rounded" aria-hidden="true"
    >delete</span
  >
  <div class="state-layer"></div>
</button>

<div class="state-layer"></div>`;

  const /** {Array<HTMLElement>} */ $tooltipElems =
      $navItem.querySelectorAll("[data-tooltip]");
  $tooltipElems.forEach(($elem) => Tooltip($elem));

  $navItem.addEventListener("click", function () {
    $notePanelTitle.textContent = name;
    activeNotebook.call(this);

    const noteList = db.get.note(this.dataset.notebook);
    client.note.read(noteList);
  });

  const $navEditBtn = $navItem.querySelector("[data-edit-button]");
  const $navItemField = $navItem.querySelector("[data-notebook-field]");
  $navEditBtn.addEventListener(
    "click",
    makeElemEditable.bind(null, $navItemField)
  );
  $navItemField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      this.removeAttribute("contenteditable");

      const updateNotebookData = db.update.notebook(id, this.textContent);

      client.notebook.update(id, updateNotebookData);
    }
  });

  const $navItemDeleteBtn = $navItem.querySelector("[data-delete-button]");
  $navItemDeleteBtn.addEventListener("click", function () {
    const modal = DeleteConfirmModal(name);
    modal.open();
    modal.onSubmit(function (isConfirm) {
      if (isConfirm) {
        db.delete.notebook(id);
        client.notebook.delete(id);
      }
      modal.close();
    });
  });
  return $navItem;
};
