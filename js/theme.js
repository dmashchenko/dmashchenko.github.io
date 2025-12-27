(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", function() {
    const themeSwitcher = document.querySelector('a[href="#"][data-name="Mode"]');
    const icon = themeSwitcher.querySelector("i");
    function setTheme(theme) {
      if (theme === "dark") {
        document.body.classList.add("dark-mode");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
      }
    }
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }
    });
    if (themeSwitcher) {
      themeSwitcher.addEventListener("click", function(e) {
        e.preventDefault();
        const currentThemeIsDark = document.body.classList.contains("dark-mode");
        if (currentThemeIsDark) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      });
    }
  });
})();
