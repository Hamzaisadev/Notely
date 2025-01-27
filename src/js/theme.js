"use strict";

const toggleTheme = function () {
  const /** {string} */ currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
  const /** {string} */ newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

// --------------------===========<<  Initialize Themes >>===========--------------------
// Retrieve the stored theme from local storage, which may be undefined if not set
const /**   {string | undefined } */ storedTheme =
    localStorage.getItem("theme");

// Check if the user's system preference is set to dark mode
const /** boolean */ systemThemeIsDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

// Determine the initial theme to apply: use stored theme or default to system preference
const /**{string} */ initialTheme =
    storedTheme ?? (systemThemeIsDark ? "dark" : "light");

// Set the data-theme attribute on the document's root element to apply the theme
document.documentElement.setAttribute("data-theme", initialTheme);

// ATTACH TOOGLE THEM TO THEME BUTTON EVENT

window.addEventListener("DOMContentLoaded", function () {
  const /**{HTMLElement} */ $themeBtn =
      document.querySelector("[data-theme-btn]");
  if ($themeBtn) $themeBtn.addEventListener("click", toggleTheme);
});
