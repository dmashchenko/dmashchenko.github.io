(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
    const themeSwitcher = document.querySelector('a[href="#"][data-name="Mode"]');
    if (!themeSwitcher) return;
    const icon = themeSwitcher.querySelector("i");
    function updateIcon() {
      if (document.documentElement.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    }
    function setTheme(theme) {
      if (theme === "dark") {
        document.documentElement.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
      updateIcon();
    }
    updateIcon();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
    themeSwitcher.addEventListener("click", function(e) {
      e.preventDefault();
      const isDark = document.documentElement.classList.contains("dark-mode");
      setTheme(isDark ? "light" : "dark");
    });
  });
})();
