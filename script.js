/* =========================================================
   理工白門祭トップページ用 JavaScript
   - スマホメニュー開閉
   - 隠しコマンド：hakumonkey
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     固定ページID 1188 以外では動かさない
     WordPress以外の通常HTMLで使う場合も動くようにする
  ========================================================= */

  const isWordPressPage1188 = document.body.classList.contains("page-id-1188");
  const isNormalHtml = !document.body.className.includes("page-id-");

  if (!isWordPressPage1188 && !isNormalHtml) {
    return;
  }

  /* =========================================================
     スマホメニュー開閉
  ========================================================= */

  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("mobile-menu-open");

      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    });

    const mobileMenuLinks = mobileMenu.querySelectorAll("a");

    mobileMenuLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("mobile-menu-open");
        mobileMenuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================================================
     ページ内リンクのスムーズスクロール補助
     href="#about" などを押した時にナビ分だけ少し上に余白を取る
  ========================================================= */

  const pageLinks = document.querySelectorAll('a[href^="#"]');

  pageLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      const nav = document.querySelector("nav");
      const navHeight = nav ? nav.offsetHeight : 80;
      const adminBar = document.getElementById("wpadminbar");
      const adminBarHeight = adminBar ? adminBar.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight -
        adminBarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    });
  });

  /* =========================================================
     隠しコマンド：hakumonkey
     ページ上で hakumonkey と入力すると指定ページへ移動
  ========================================================= */

  const SECRET_WORD = "hakumonkey";
  const SECRET_URL = "https://x.com/hakumonkey_2";

  let typedText = "";

  document.addEventListener("keydown", function (event) {
    /*
      Ctrl / Shift / Alt / Command を押している時は無視
      例：Ctrl + C、Command + R などを邪魔しない
    */
    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
      return;
    }

    /*
      入力フォームでは反応させない
      WordPressの検索窓やフォーム入力中の誤作動防止
    */
    const target = event.target;
    const tagName = target.tagName ? target.tagName.toLowerCase() : "";

    if (
      tagName === "input" ||
      tagName === "textarea" ||
      tagName === "select" ||
      target.isContentEditable
    ) {
      return;
    }

    const key = event.key.toLowerCase();

    /*
      a〜z 以外は無視
    */
    if (!/^[a-z]$/.test(key)) {
      return;
    }

    typedText += key;
    typedText = typedText.slice(-SECRET_WORD.length);

    if (typedText === SECRET_WORD) {
      window.location.href = SECRET_URL;
    }
  });
});