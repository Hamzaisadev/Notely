// moduel Imports;
import { Tooltip } from "./Tooltip.js";

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

  return $navItem;
};
