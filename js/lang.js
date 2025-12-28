(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    const langSwitchers = document.querySelectorAll(".lang-switcher a[data-lang]");
    const localArticleSwitchers = document.querySelectorAll('.lang-switcher a[data-switch-type="article-local"]');
    const getLangAwareURL = (path, targetLang) => {
      const langPrefixRegex = /^\/(en|ua)(\/|$)/;
      let newPath = path.replace(langPrefixRegex, "/");
      if (targetLang !== "en") {
        newPath = `/${targetLang}${newPath}`;
      }
      newPath = newPath.replace(/\/\//g, "/");
      const originalHasTrailingSlash = path.endsWith("/");
      const newHasTrailingSlash = newPath.endsWith("/");
      if (newPath !== "/") {
        if (originalHasTrailingSlash && !newHasTrailingSlash) {
          newPath += "/";
        } else if (!originalHasTrailingSlash && newHasTrailingSlash) {
          newPath = newPath.slice(0, -1);
        }
      }
      return newPath;
    };
    const handleLangChange = (event) => {
      event.preventDefault();
      const selectedLang = event.currentTarget.dataset.lang;
      if (selectedLang) {
        localStorage.setItem("userLang", selectedLang);
        const newPath = getLangAwareURL(window.location.pathname, selectedLang);
        window.location.href = newPath + window.location.search + window.location.hash;
      }
    };
    langSwitchers.forEach((switcher) => switcher.addEventListener("click", handleLangChange));
    localArticleSwitchers.forEach((switcher) => {
      switcher.addEventListener("click", (event) => {
        event.preventDefault();
        sessionStorage.setItem("isLocalArticleSwitch", "true");
        window.location.href = event.currentTarget.dataset.targetUrl;
      });
    });
    const savedLang = localStorage.getItem("userLang");
    const isLocalArticleSwitch = sessionStorage.getItem("isLocalArticleSwitch");
    if (isLocalArticleSwitch) {
      sessionStorage.removeItem("isLocalArticleSwitch");
    } else if (savedLang && savedLang !== document.documentElement.lang) {
      const currentPath = window.location.pathname;
      const isHomepage = currentPath === "/" || /^\/(en|ua)\/$/.test(currentPath);
      const isArticlePage = /^\/(en|ua)?\/articles(\/|$)/.test(currentPath);
      if (isHomepage || isArticlePage) {
        const newPath = getLangAwareURL(currentPath, savedLang);
        if (newPath !== currentPath) {
          window.location.replace(newPath + window.location.search + window.location.hash);
        }
      }
    }
    if (savedLang) {
      const menuLinksToUpdate = [
        document.querySelector(".home-icon-container a"),
        document.querySelector('.menu-items-container ul li a[href*="/articles"]')
      ];
      menuLinksToUpdate.forEach((link) => {
        if (link) {
          link.href = getLangAwareURL(link.getAttribute("href"), savedLang);
        }
      });
    }
  });
})();
