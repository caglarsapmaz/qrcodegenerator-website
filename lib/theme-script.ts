/**
 * Runs synchronously in <head> before first paint so the theme class is
 * applied before hydration, preventing a flash of the wrong theme.
 */
export const THEME_SCRIPT = `(function () {
  try {
    var theme = localStorage.getItem("qr-studio:theme");
    document.documentElement.classList.add(theme === "light" ? "light" : "dark");
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();`;
