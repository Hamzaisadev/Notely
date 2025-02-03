"use strict";

import { formateDate } from "../utils.js";
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
            <button data-tooltip='Delete Note' class="icon-btn large" aria-label="Delete note">
              <span class="material-symbols-rounded" aria-hidden='true' >delete</span>
              <div class="state-layer"></div>
            </button>
          </div>
          <div class="state-layer"></div>`;

  Tooltip($card.querySelector("[data-tooltip]"));

  return $card;
};
