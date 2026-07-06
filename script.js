/* =========================================================
理工白門祭トップページ用 JavaScript
- Tailwind CDN 設定
- スマホメニュー開閉
- ページ内リンク押下時のスマホメニュー自動クローズ
- 隠しコマンド：hakumonkey
========================================================= */

/* =========================================================
Tailwind CDN 設定
※ index.html では Tailwind CDN の直後にこの script.js を読み込む
========================================================= */
tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#03006f",
                        "primary-container": "#1d2088",
                        "on-primary": "#ffffff",
                        "background": "#fcf9f8",
                        "on-background": "#1c1b1b",
                        "surface": "#fcf9f8",
                        "surface-container-lowest": "#ffffff",
                        "surface-container-low": "#f6f3f2",
                        "surface-container": "#f0eded",
                        "surface-container-high": "#eae7e7",
                        "surface-container-highest": "#e5e2e1",
                        "surface-variant": "#e5e2e1",
                        "outline": "#767684",
                        "outline-variant": "#c7c5d4",
                        "secondary": "#605e5e",
                        "tertiary": "#1a1c1d",
                        "on-surface": "#1c1b1b",
                        "on-surface-variant": "#464652"
                    },
                    borderRadius: {
                        DEFAULT: "0.125rem",
                        lg: "0.25rem",
                        xl: "0.5rem",
                        full: "0.75rem"
                    },
                    spacing: {
                        "margin-desktop": "48px",
                        "container-max": "1280px",
                        "margin-mobile": "16px",
                        "gutter": "24px",
                        "section-gap": "80px"
                    },
                    fontFamily: {
                        "headline-lg-mobile": ["IBM Plex Sans"],
                        "headline-xl": ["IBM Plex Sans"],
                        "headline-lg": ["IBM Plex Sans"],
                        "headline-md": ["IBM Plex Sans"],
                        "body-lg": ["IBM Plex Sans"],
                        "body-md": ["IBM Plex Sans"],
                        "label-md": ["IBM Plex Sans"],
                        "label-sm": ["IBM Plex Sans"]
                    },
                    fontSize: {
                        "headline-lg-mobile": ["28px", { lineHeight: "36px", fontWeight: "600" }],
                        "headline-xl": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "600" }],
                        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
                        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "500" }],
                        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "500" }],
                        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }]
                    }
                }
            }
        };

/* =========================================================
ページ用スクリプト
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const isWordPressPage1188 = document.body.classList.contains("page-id-1188");
    const isNormalHtml = !document.body.className.includes("page-id-");

    if (!isWordPressPage1188 && !isNormalHtml) {
        return;
    }

    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("mobile-menu-open");
        });
    }

    const pageLinks = document.querySelectorAll('a[href^="#"]');

    pageLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (mobileMenu && mobileMenu.classList.contains("mobile-menu-open")) {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("mobile-menu-open");
            }
        });
    });

    const SECRET_WORD = "hakumonkey";
    const SECRET_URL = "https://x.com/hakumonkey_2";
    let typedText = "";

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
            return;
        }

        if (event.key.length !== 1) {
            return;
        }

        typedText += event.key.toLowerCase();
        typedText = typedText.slice(-SECRET_WORD.length);

        if (typedText === SECRET_WORD) {
            window.location.href = SECRET_URL;
        }
    });
});
