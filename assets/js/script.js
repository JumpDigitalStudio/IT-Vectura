// Variable initialization
let isMobile = false;
let scrollPoint1;
let scrollPoint2;

// Start session
const startSessionTime = Date.now();

// Target language initialization
const yatranslate = {
  lang: "en",
};

// Components initialization
const site = document.querySelector("html");
const pageName = document.title;
let pageLang;
let page;
let blackout;
let preloader;

let intro;
let introHeight;

let header;
let hMenuBtn;

let mobile;
let mMenuBtn;
let mMenuNavigation;
let mMenuLinks;
let mMenuLangs;

// Device client size initialization
const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;
const deviceType = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      deviceType.Android() ||
      deviceType.BlackBerry() ||
      deviceType.iOS() ||
      deviceType.Opera() ||
      deviceType.Windows()
    );
  },
};
deviceType.any() || windowWidth <= 767 ? (isMobile = true) : (isMobile = false);

// Functions
function add(elem, modifier) {
  elem.classList.add(modifier);
}
function rem(elem, modifier) {
  elem.classList.remove(modifier);
}
function tog(elem, modifier) {
  elem.classList.toggle(modifier);
}

// Yandex Switch-lang functions
function yaTranslateInit() {
  if (localStorage.getItem("yt-widget") != null) {
    const ytWidgetValidate = JSON.parse(localStorage.getItem("yt-widget"));
    blockRegion = "ru";

    if (ytWidgetValidate.lang === blockRegion) {
      yaTranslateSetLang("en");
    }
  }

  // Connect yandex translate
  let script = document.createElement("script");
  script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${yatranslate.lang}&widgetTheme=light&autoMode=false`;
  document.getElementsByTagName("head")[0].appendChild(script);

  let code = yaTranslateGetCode();
  pageLang = code;

  yaTranslateHtmlHandler(code);
  yaTranslatePCHtmlHandler(code);

  yaTranslateEventHandler("click", "[data-ya-lang]", function (el) {
    yaTranslateSetLang(el.getAttribute("data-ya-lang"));
    window.location.reload();
  });

  yaTranslateEventHandler("click", "[data-pc-ya-lang]", function (el) {
    yaTranslateSetLang(el.getAttribute("data-pc-ya-lang"));
    window.location.reload();
  });
}
function yaTranslateSetLang(lang) {
  localStorage.setItem(
    "yt-widget",
    JSON.stringify({
      lang: lang,
      active: true,
    })
  );
}
function yaTranslateGetCode() {
  return localStorage["yt-widget"] != undefined &&
    JSON.parse(localStorage["yt-widget"]).lang != undefined
    ? JSON.parse(localStorage["yt-widget"]).lang
    : yatranslate.lang;
}
function yaTranslateEventHandler(event, selector, handler) {
  document.addEventListener(event, function (e) {
    let el = e.target.closest(selector);
    if (el) handler(el);
  });
}
function yaTranslateHtmlHandler(code) {
  let langName;

  switch (code) {
    case "en":
      langName = "English";
      break;
    case "kk":
      langName = "Kazakh";
      break;
    case "az":
      langName = "Azerbaijani";
      break;
    case "uz":
      langName = "Uzbek";
      break;
    case "ar":
      langName = "Arabian";
      break;
    case "tr":
      langName = "Turkish";
      break;
    default:
      langName = "Language selection not available";
      break;
  }

  document.querySelector(
    "[data-lang-active]"
  ).innerHTML = `<button class="lang-switch__item active"><img src="/assets/images/flags/icon-flag-${code}.svg">${langName}</button><span class="mobile__open"></span>`;
  document.querySelector(`[data-ya-lang="${code}"]`).remove();
}
function yaTranslatePCHtmlHandler(code) {
  let langPCName = code.toUpperCase();

  document.querySelector(
    "[data-pc-lang-active]"
  ).innerHTML = `<img src="/assets/images/flags/icon-flag-${code}.svg">${langPCName}`;
  document.querySelector(`[data-pc-ya-lang="${code}"]`).remove();
}

// Basic logic
document.addEventListener("DOMContentLoaded", () => {
  // Start Yandex Switch-lang
  yaTranslateInit();

  // All components
  if (document.querySelector(".preloader")) {
    // Preloader
    NProgress.start();

    preloader = document.getElementById("preloader");
    preloader.play();

    preloader.addEventListener("ended", function () {
      preloader.pause();
    });
  }
  if (document.querySelector(".page")) {
    page = document.querySelector(".page");
  }
  if (document.querySelector(".blackout")) {
    blackout = document.querySelector(".blackout");
  }
  if (document.querySelector(".intro")) {
    intro = document.querySelector(".intro");
    introHeight = getComputedStyle(intro).height;
  }
  if (document.querySelector(".header")) {
    header = document.querySelector(".header");
    hMenuBtn = header.querySelector(".header__mobile");
  }
  if (document.querySelector(".mobile")) {
    mobile = document.querySelector(".mobile");
    mMenuBtn = mobile.querySelector(".mobile__button");
    mMenuNavigation = mobile.querySelector(".mobile__nav");
    mMenuLinks = mobile.querySelectorAll(".mobile__item");
    mMenuLangs = mobile.querySelector(".lang-switch");
  }
  if (document.querySelectorAll(".modal")) {
    $(".modal").iziModal({
      width: 600,
      zindex: 100,
      background: null,
      transitionIn: "fadeInUp",
      transitionOut: "fadeOutDown",
    });
    $(document).on("click", ".btn-connect-with-us", function (event) {
      event.preventDefault();
      $("#connect-with-us").iziModal("open");
    });
    $(document).on("click", ".btn-license", function (event) {
      event.preventDefault();
      $("#license").iziModal("open");
    });
    $(document).on("click", ".btn-components", function (event) {
      event.preventDefault();
      $("#components").iziModal("open");
    });
  }

  // Header + mobile + blackout
  if (header) {
    // Set state on window load
    if (window.pageYOffset > 50) add(header, "theme-dark");
    if (window.pageYOffset > introHeight.slice(0, -2))
      add(header, "theme-light");

    // Change state on scroll
    window.addEventListener("scroll", () => {
      scrollPoint1 = 50;
      introHeight = getComputedStyle(intro).height;

      if (isMobile === true) {
        scrollPoint2 = Math.round(introHeight.slice(0, -2)) - 100;
      } else {
        scrollPoint2 = Math.round(introHeight.slice(0, -2)) - 75;
      }

      let scroll = Math.round(window.pageYOffset);
      scroll >= scrollPoint1
        ? add(header, "theme-dark")
        : rem(header, "theme-dark");
      scroll >= scrollPoint2
        ? add(header, "theme-light")
        : rem(header, "theme-light");
      scroll >= scrollPoint2
        ? add(site, "theme-light")
        : rem(site, "theme-light");
    });
  }
  if (mobile) {
    // Open mobile menu from header
    hMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      add(page, "lock");
      add(mobile, "open");
    });

    // On mobile button click
    mMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();

      rem(page, "lock");
      rem(mobile, "open");

      mMenuLinks.forEach((link) => {
        rem(link, "active");
      });
    });

    // On menu catalog click
    mMenuNavigation.addEventListener("click", function (e) {
      let target = e.target;

      if (target.classList.contains("sub-cat")) {
        if (!target.classList.contains("open")) {
          for (let i = 0; i < mMenuLinks.length; i++) {
            rem(mMenuLinks[i], "open");
          }
          add(target, "open");
        } else {
          for (let i = 0; i < mMenuLinks.length; i++) {
            rem(mMenuLinks[i], "open");
          }
        }
      }
    });

    // On langs choise click
    mMenuLangs.addEventListener("click", () => {
      mMenuLangs.classList.toggle("open");
    });
  }
  if (blackout && mobile) {
    blackout.addEventListener("click", function (e) {
      e.preventDefault();

      rem(page, "lock");
      rem(mobile, "open");

      mMenuLinks.forEach((link) => {
        rem(link, "active");
      });
    });
  }

  // Page navigation
  if (document.querySelectorAll(".scr-list")) {
    const getSectionId = (link) => link.getAttribute("href").replace("#", "");
    const navLists = document.querySelectorAll(".scr-list");

    navLists.forEach((lists) =>
      lists.addEventListener("click", (event) => {
        if (event.target.classList.contains("scr-link")) {
          event.preventDefault();
          if (isMobile === true) {
            rem(page, "lock");
            rem(mobile, "open");

            window.scrollTo({
              top:
                document.getElementById(getSectionId(event.target)).offsetTop -
                30,
              behavior: "smooth",
            });
          } else {
            window.scrollTo({
              top:
                document.getElementById(getSectionId(event.target)).offsetTop -
                40,
              behavior: "smooth",
            });
          }
        }
      })
    );
  }

  // Solutions cards
  if (document.querySelector(".solutions")) {
    const solMain = document.querySelector(".decisions__cards");
    const solCards = solMain.querySelectorAll(".decisions__card");
    const solTabs = document.querySelectorAll(".decisions__features");

    solMain.addEventListener("click", (e) => {
      let target = e.target;

      if (target.classList.contains("decisions__card")) {
        for (let i = 0; i < solCards.length; i++) {
          solCards[i].classList.remove("active");
        }

        let solTabID = target.getAttribute("data-index");
        target.classList.add("active");

        for (let i = 0; i < solTabs.length; i++) {
          solTabs[i].classList.remove("active");
        }

        document.getElementById(solTabID).classList.add("active");
      }
    });
  }

  // Mobile solutions cards
  if (document.querySelector(".mob-dec")) {
    // Start on page load
    $("#mob-card-base").slideToggle(0);
    $("#mob-card-advanced").slideToggle(0);
    $("#mob-card-enterprise").slideToggle(0);

    // Base
    $("#mob-base").click(function () {
      $("#mob-base").toggleClass("active");
      $("#mob-card-base").slideToggle(300);
    });

    // Advanced
    $("#mob-advanced").click(function () {
      $("#mob-advanced").toggleClass("active");
      $("#mob-card-advanced").slideToggle(300);
    });

    // Enterprise
    $("#mob-enterprise").click(function () {
      $("#mob-enterprise").toggleClass("active");
      $("#mob-card-enterprise").slideToggle(300);
    });
  }

  // Commerce props show/hide
  if (document.querySelector(".props__button")) {
    // Start on page load
    $(".props__main").slideToggle(0);

    // Onclick
    $(".props__button").click(function () {
      $(".props").toggleClass("prop-open");
      $(".props__main").slideToggle(300);
    });
  }

  // Forms functionallity
  document.querySelectorAll(".form").forEach((item) => {
    item.addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      const formBtn = form.querySelector(".form-button");

      let error = formValidate(form);

      if (error === 0) {
        const clientName = form.querySelector('input[name="clientName"]').value;
        const clientMail = form.querySelector('input[name="clientMail"]').value;
        const clientCompany = form.querySelector(
          'input[name="clientCompany"]'
        ).value;
        const clientJobTitle = form.querySelector(
          'input[name="clientJobTitle"]'
        ).value;
        const clientComment = form.querySelector(
          'textarea[name="clientComment"]'
        ).value;

        const endSessionTime = Date.now();
        const targetSessionTime =
          Math.abs(startSessionTime - endSessionTime) / 60000;
        const convertSession = targetSessionTime.toFixed(0);

        let request = `<b>Сайт:</b> ITV (Иностранная версия)\n`;
        request += `<u><b>Основная информация</b></u>\n`;
        request += `<b>Имя:</b> ${clientName}\n`;
        request += `<b>E-mail:</b> ${clientMail}\n`;
        request += `<b>Компания:</b> ${clientCompany}\n`;
        request += `<b>Должность:</b> ${clientJobTitle}\n`;
        request += `<b>Комментарий:</b> ${clientComment}\n`;
        request += `<u><b>Аналитика</b></u>\n`;
        request += `<b>Язык:</b> ${pageLang}\n`;
        request += `<b>Страница:</b> ${pageName}\n`;
        request += `<b>Время на сайте:</b> ${convertSession}мин.`;

        const token = "6245420458:AAEkQx0ziECmtjwz_Nx9sVvHEE99AD3lBBM";
        const chatId = "-1001525366365";

        axios
          .post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chatId,
            parse_mode: "html",
            text: request,
          })
          .then((response) => {
            formBtn.value = "Thank you! Request has been sent";
          })
          .catch((error) => {
            formBtn.value = "Server error";
          });
      }

      // Validate errors
      function formValidate(form) {
        let error = 0;
        let formReq = form.querySelectorAll("._req");

        for (let i = 0; i < formReq.length; i++) {
          const input = formReq[i];
          formRemoveError(input);

          if (input.classList.contains("_email")) {
            if (emailTest(input)) {
              formAddError(input);
              error++;
            }
          } else {
            if (input.value === "") {
              formAddError(input);
              error++;
            }
          }
        }
        return error;
      }

      function formAddError(input) {
        input.classList.add("error");
      }

      function formRemoveError(input) {
        input.classList.remove("error");
      }

      function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
          input.value
        );
      }
    });
  });
});

// Done preloader on full loading
window.addEventListener("load", () => {
  this.setTimeout(function () {
    NProgress.done();

    anime
      .timeline({}) // Создание новой анимационной последовательности
      .add({
        targets: ".preloader__inner",
        opacity: 0, // Установка целевого значения свойства opacity
        easing: "easeInOutQuad",
        duration: 300, // Длительность анимации в миллисекундах
      })
      .add({
        targets: ".preloader",
        opacity: 0,
        easing: "easeInOutQuad",
        duration: 500,
        delay: 100, // Задержка перед началом анимации в миллисекундах
      });

    setTimeout(function () {
      $(".preloader").addClass("hidden");
    }, 750);
  }, 800);
});
