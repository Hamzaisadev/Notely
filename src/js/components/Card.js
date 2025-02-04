"use strict";

import { client } from "../client.js";
import { db } from "../db.js";
import { formateDate } from "../utils.js";
import { DeleteConfirmModal, NoteModal } from "./Modal.js";
import { Tooltip } from "./Tooltip.js";

export const Card = function (noteData) {
  const { id, title, text, postedOn, notebookId } = noteData;

  const $card = document.createElement("div");
  $card.classList.add("card");
  $card.setAttribute("data-note", id);

  $card.innerHTML = ` <h3 class="card-title text-title-medium">${title}</h3>
          <p class="card-text text-body-large">
            ${text}
          </p>
          <div class="wrapper">
            <span class="card-time text-label-large">${formateDate(
              postedOn
            )}</span>
            <button data-delete-btn data-tooltip='Delete Note' class="icon-btn large" aria-label="Delete note">
              <span class="material-symbols-rounded" aria-hidden='true' >delete</span>
              <div class="state-layer"></div>
            </button>
          </div>
          <div class="state-layer"></div>`;

  Tooltip($card.querySelector("[data-tooltip]"));

  $card.addEventListener("click", function () {
    const modal = NoteModal(title, text, formateDate(postedOn));
    modal.open();

    modal.onSubmit(function (noteData) {
      const updatedData = db.update.note(id, noteData);

      client.note.update(id, updatedData);
      modal.close();
    });
  });

  const $deleteBtn = $card.querySelector("[data-delete-btn]");
  $deleteBtn.addEventListener("click", function (event) {
    event.stopImmediatePropagation();
    const modal = DeleteConfirmModal(title);
    modal.open();
    modal.onSubmit(function (isConfirm) {
      if (isConfirm) {
        const existedNotes = db.delete.note(notebookId, id);
        client.note.delete(id, existedNotes.length);
      }
      modal.close();
    });
  });
  return $card;
};
