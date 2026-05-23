// ==== DROPDOWN OVERLAY – single source of truth (hide when no dropdown open on desktop) ====
// ==== DROPDOWN + SEARCH OVERLAY ====
function updateDropdownOverlay() {
  const overlay = document.getElementById("dropdownOverlay");
  if (!overlay) return;

  const anyDropdownOpen = document.querySelector(
    ".dropdown-menu:not(.hidden)",
  );

  const searchBar = document.getElementById("searchBar");
  const isSearchOpen =
    searchBar && searchBar.classList.contains("search-open");

  // desktop only
  if ((anyDropdownOpen || isSearchOpen)) {
    overlay.classList.remove("hidden");
  } else {
    overlay.classList.add("hidden");
  }
}

// ==== OVERLAY CLICK CLOSE ====

const dropdownOverlay = document.getElementById("dropdownOverlay");

dropdownOverlay?.addEventListener("click", function () {

  document.querySelectorAll(".dropdown-menu").forEach((drop) => {
    drop.classList.add("hidden");
    drop.classList.remove("is-open");

    const trigger = drop.previousElementSibling;

    trigger?.classList.remove("dropdown-open");
    trigger?.querySelector("svg")?.classList.remove("rotate-180");
  });

  toggleSearchOverlay(false);

  updateDropdownOverlay();
});

function getOffset() {
  if (window.innerWidth < 1281) return 100;
  if (window.innerWidth < 1442) return 110;
  return 120;
}

// ==== DROPDOWN TOGLLE ====
function toggleDropdown(button) {
  const menu = button.nextElementSibling; // ✅ ONLY this dropdown
  const arrowIcon = button.querySelector("svg");
  const isMobile = window.innerWidth < 902;

  // 🔒 Close all other dropdowns
  document.querySelectorAll(".dropdown-menu").forEach((drop) => {
    if (drop !== menu) {
      drop.classList.remove("is-open");
      drop.classList.add("hidden");

      const btn = drop.previousElementSibling;
      btn?.classList.remove("dropdown-open");
      btn?.querySelector("svg")?.classList.remove("rotate-180");
    }
  });

  // 🔓 Toggle clicked dropdown
  if (isMobile) {
    menu.classList.toggle("is-open");
    menu.classList.remove("hidden");
  } else {
    menu.classList.toggle("hidden");
    menu.classList.remove("is-open");
  }

  // Keep dropdown-btn primary (text-primary) when dropdown is open
  const isOpen = isMobile
    ? menu.classList.contains("is-open")
    : !menu.classList.contains("hidden");
  if (isOpen) {
    button.classList.add("dropdown-open");
    arrowIcon?.classList.add("rotate-180");
  } else {
    button.classList.remove("dropdown-open");
    arrowIcon?.classList.remove("rotate-180");
  }

  updateDropdownOverlay();
}

function closeDropdown(el) {
  const menu = el.closest(".dropdown-menu");
  const trigger = menu.previousElementSibling;

  // Always close dropdown
  menu.classList.remove("is-open");
  menu.classList.add("hidden");

  trigger.classList.remove("dropdown-open");
  trigger.querySelector("svg")?.classList.remove("rotate-180");
  // trigger.querySelector("svg")?.classList.add("-rotate-90");

  // 🧠 Detect BACK arrow (first SVG inside dropdown-title)
  const titleBar = el.closest(".dropdown-title");
  const svgs = titleBar?.querySelectorAll("svg");

  const isBackArrow = svgs && svgs[0] === el;

  // ⬅ Back arrow → STOP here (one step only)
  if (isBackArrow) return;

  // ❌ Close icon → ALSO close mobile nav
  const nav = document.getElementById("nav-links");
  const burgerIcon = document.getElementById("burger-icon");
  const closeIcon = document.getElementById("close-icon");

  if (window.innerWidth < 902 && nav) {
    nav.classList.remove("is-open");
    nav.classList.add("hidden");

    burgerIcon?.classList.remove("hidden");
    closeIcon?.classList.add("hidden");
  }

  updateDropdownOverlay();
}

// Close dropdowns and search when clicking outside
window.addEventListener("click", function (e) {
  if (!e.target.closest(".relative")) {
    document.querySelectorAll(".dropdown-menu").forEach((drop) => {
      drop.classList.add("hidden");
      const button = drop.previousElementSibling;
      if (button) {
        button.classList.remove("dropdown-open");
        button.querySelector("svg")?.classList.remove("rotate-180");
      }
    });
    updateDropdownOverlay();
  }

  const searchBar = document.getElementById("searchBar");
  const isSearchVisible =
    searchBar && searchBar.classList.contains("search-open");
  if (
    isSearchVisible &&
    !e.target.closest("#searchBar") &&
    !e.target.closest("#searchBarMobile") &&
    !e.target.closest("#searchToggle") &&
    !e.target.closest("#searchToggleMobile") &&
    !e.target.closest("#searchToggleHeaderMobile")
  ) {
    toggleSearchOverlay(false);
  }
});

// ==================  HOME PAGE ================================
// ====  NAVBAR MENU TOGGLE ====
document.getElementById("burgerBtn").addEventListener("click", function () {
  const nav = document.getElementById("nav-links");
  const burgerIcon = document.getElementById("burger-icon");
  const closeIcon = document.getElementById("close-icon");

  nav.classList.toggle("hidden");
  burgerIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

// ==== SEARCH BAR ====
let isSearchOpen = false;

const searchIconMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="sm:size-5 size-4.5"><path d="M18.3333 18.3333L13.3333 13.3333" stroke="#353535" stroke-width="1.6" stroke-linecap="round"/><path d="M8.33333 15.8333C12.158 15.8333 15.1667 12.8247 15.1667 9C15.1667 5.17526 12.158 2.16667 8.33333 2.16667C4.50859 2.16667 1.5 5.17526 1.5 9C1.5 12.8247 4.50859 15.8333 8.33333 15.8333Z" stroke="#353535" stroke-width="1.6"/></svg>`;
const closeIconMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="size-5.5"><path d="M5.5 5.5L18.5 18.5M5.5 18.5L18.5 5.5" stroke="#353535" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const searchIconMobileMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" class="sm:size-5 size-4.5"><path d="M16.0925 16.0925L20.1666 20.1666M1.83325 9.9814C1.83325 12.1424 2.69172 14.2149 4.21979 15.743C5.74786 17.2711 7.82038 18.1295 9.9814 18.1295C12.1424 18.1295 14.2149 17.2711 15.743 15.743C17.2711 14.2149 18.1295 12.1424 18.1295 9.9814C18.1295 7.82038 17.2711 5.74786 15.743 4.21979C14.2149 2.69172 12.1424 1.83325 9.9814 1.83325C7.82038 1.83325 5.74786 2.69172 4.21979 4.21979C2.69172 5.74786 1.83325 7.82038 1.83325 9.9814Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function toggleSearchOverlay(force) {
  const searchBar = document.getElementById("searchBar");
  const searchBarMobile = document.getElementById("searchBarMobile");
  const input = document.getElementById("site-search-input");
  const inputMobile = document.getElementById("navSearchInputMobile");
  const searchToggle = document.getElementById("searchToggle");
  const searchToggleMobile = document.getElementById("searchToggleMobile");
  const searchToggleHeaderMobile = document.getElementById(
    "searchToggleHeaderMobile",
  );
  const isMobile = window.innerWidth < 902;
  if (!searchBar) return;

  if (typeof force === "boolean") {
    isSearchOpen = force;
  } else {
    isSearchOpen = !isSearchOpen;
  }

  searchBar.classList.toggle("search-open", isSearchOpen);

  if (isSearchOpen) {
    document.querySelectorAll(".dropdown-menu:not(.hidden)").forEach((drop) => {
      drop.classList.add("hidden");
      drop.classList.remove("is-open");

      const trigger = drop.previousElementSibling;
      trigger?.classList.remove("dropdown-open");
      trigger?.querySelector("svg")?.classList.remove("rotate-180");
    });
    updateDropdownOverlay();

    if (searchToggle) searchToggle.innerHTML = closeIconMarkup;
    if (searchToggleMobile) searchToggleMobile.innerHTML = closeIconMarkup;
    if (searchToggleHeaderMobile)
      searchToggleHeaderMobile.innerHTML = closeIconMarkup;

    if (isMobile && searchBarMobile) {
      /* Close nav menu when opening search so both are not open at once */
      const nav = document.getElementById("nav-links");
      const burgerIcon = document.getElementById("burger-icon");
      const closeIcon = document.getElementById("close-icon");
      if (nav && !nav.classList.contains("hidden")) {
        nav.classList.add("hidden");
        burgerIcon?.classList.remove("hidden");
        closeIcon?.classList.add("hidden");
      }
      searchBarMobile.classList.remove("hidden");
      inputMobile?.focus();
      if (window.innerWidth < 640)
        document.body.classList.add("mobile-search-open");
    } else {
      input?.focus();
    }
  } else {
    updateDropdownOverlay();

    if (searchToggle) searchToggle.innerHTML = searchIconMarkup;
    if (searchToggleMobile) searchToggleMobile.innerHTML = searchIconMarkup;
    if (searchToggleHeaderMobile)
      searchToggleHeaderMobile.innerHTML = searchIconMobileMarkup;

    if (isMobile && searchBarMobile) {
      searchBarMobile.classList.add("hidden");
      if (inputMobile) inputMobile.value = "";
      document.body.classList.remove("mobile-search-open");
    }

    input?.blur();
    inputMobile?.blur();
    if (input) input.value = "";

    /* Clear AJAX search panels when closing search (desktop + mobile) */
    ["combined-search-results", "combined-search-results-mobile"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) {
          el.innerHTML = "";
          el.classList.remove("show");
          el.classList.add("hidden");
        }
      },
    );
    ["search-loader", "search-loader-mobile"].forEach((id) => {
      document.getElementById(id)?.classList.add("hidden");
    });
    document.querySelectorAll(".toggle-view-btn").forEach((btn) => {
      const type = btn.getAttribute("data-type");
      if (type) {
        btn.setAttribute("href", `/${type}?s=`);
      }
    });
  }
}

["searchToggle", "searchToggleMobile", "searchToggleHeaderMobile"].forEach(
  (id) => {
    const btn = document.getElementById(id);
    btn?.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleSearchOverlay();
    });
  },
);

const searchBar = document.getElementById("searchBar");
searchBar?.addEventListener("click", function (e) {
  if (e.target === searchBar) toggleSearchOverlay(false);
});

document
  .getElementById("searchBarMobile")
  ?.addEventListener("click", function (e) {
    if (e.target === this) toggleSearchOverlay(false);
  });

// Close search bar with ESC
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    toggleSearchOverlay(false);
  }
});

document
  .getElementById("site-search-input")
  ?.addEventListener("click", function (e) {
    e.stopPropagation();
  });
document
  .getElementById("navSearchInputMobile")
  ?.addEventListener("click", function (e) {
    e.stopPropagation();
  });

// ==== Our Clients SWIPER ====
var swiper = new Swiper(".our-clients.swiper", {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 16,
  speed: 1000,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },

  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    575: {
      slidesPerView: 3,
    },
    769: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    1170: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

// ==== WHY-US SECTION SWIPER ====
const whyUsThumbs = new Swiper(".why-us .why-us-content", {
  spaceBetween: 10,
  slidesPerView: 1,
  freeMode: true,
  watchSlidesProgress: true,
  slideToClickedSlide: true,
});

const whyUsMain = new Swiper(".why-us .why-us-img", {
  spaceBetween: 60,
  slidesPerView: 1,
  effect: "fade",
  navigation: {
    nextEl: ".why-us .swiper-button-next",
    prevEl: ".why-us .swiper-button-prev",
  },
  pagination: {
    el: ".why-us .swiper-pagination",
    type: "fraction",
  },
  thumbs: {
    swiper: whyUsThumbs,
  },
});

// COOKIE STORAGE
// Track currently open section
(function () {
  let currentOpenSection = "essential";
  const $popup = $(".cookie-popup");

  function lockScroll() {
    document.body.classList.add("overflow-hidden");
  }

  function unlockScroll() {
    document.body.classList.remove("overflow-hidden");
  }

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 86400000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
  }

  function getCookie(name) {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  }

  function getAvailableCategories() {
    return Array.from(
      document.querySelectorAll('input[id$="-cookies"]')
    ).map((input) => input.id.replace(/-cookies$/, ""));
  }

  function hidePopup() {
    if ($popup.length) {
      $popup.removeClass("open").fadeOut(180, function () {
        $(this).remove();
      });
    }
    unlockScroll();
  }

  function handleConsent(selected = []) {
    setCookie("OptanonAlertBoxClosed", new Date().toISOString(), 365);

    if (selected === "all") {
      selected = getAvailableCategories().filter((key) => key !== "essential");
    }

    localStorage.setItem("cookieConsent", JSON.stringify(selected));

    const groups = {
      C0001: 1, // Necessary / Essential
      C0002: selected.includes("functional") ? 1 : 0,
      C0003: selected.includes("performance") ? 1 : 0,
      C0004: selected.includes("targeting") ? 1 : 0,
    };

    const groupsString = Object.entries(groups)
      .reverse()
      .map(([key, val]) => `${key}:${val}`)
      .join(",");

    const consent = `landingPath=NotLandingPage&datestamp=${encodeURIComponent(
      new Date().toString()
    )}&version=202403.1.0&groups=${groupsString}&hosts=`;

    setCookie("OptanonConsent", consent, 365);
    hidePopup();
  }

  $(window).on("load", function () {
    const $currentPopup = $(".cookie-popup");
    if (!$currentPopup.length) return;

    if (localStorage.getItem("cookieConsent") || getCookie("OptanonConsent")) {
      hidePopup();
      return;
    }

    $currentPopup.stop(true, true).fadeIn(180);
    lockScroll();
    currentOpenSection =
      document.querySelector(".cookie-section-content.active")?.id?.replace(
        "content-",
        ""
      ) || "essential";
  });

  window.openCookieSettings = function () {
    const sidebar = document.getElementById("cookie-settings-sidebar");
    const mainPopup = document.getElementById("cookie-popup");

    if (sidebar) {
      sidebar.classList.remove("translate-x-full");
      sidebar.classList.add("translate-x-0");
    }

    if (mainPopup) {
      mainPopup.classList.add("hidden");
    }

    requestAnimationFrame(function () {
      const openContent = document.querySelector(".cookie-section-content.active");
      if (openContent) {
        openContent.style.maxHeight = openContent.scrollHeight + "px";
      }
    });
  };

  window.closeCookieSettings = function () {
    const sidebar = document.getElementById("cookie-settings-sidebar");

    if (sidebar) {
      sidebar.classList.remove("translate-x-0");
      sidebar.classList.add("translate-x-full");
    }

    const mainPopup = document.getElementById("cookie-popup");
    if (mainPopup) {
      mainPopup.classList.remove("hidden");
    }
  };

  window.savePreferences = function () {
    const selected = getAvailableCategories().filter((key) => {
      if (key === "essential") return false;
      return document.getElementById(`${key}-cookies`)?.checked;
    });

    handleConsent(selected);
  };

  window.acceptCookies = function () {
    handleConsent("all");
  };

  window.rejectCookies = function () {
    handleConsent([]);
  };

  window.toggleCookieSection = function (sectionId) {
    const content = document.getElementById(`content-${sectionId}`);
    const chevron = document.getElementById(`chevron-${sectionId}`);

    if (!content || !chevron) return;

    const isOpen = content.classList.contains("active");

    if (currentOpenSection && currentOpenSection !== sectionId) {
      const prevContent = document.getElementById(
        `content-${currentOpenSection}`
      );
      const prevChevron = document.getElementById(
        `chevron-${currentOpenSection}`
      );
      if (prevContent && prevChevron) {
        prevContent.style.maxHeight = "0";
        prevContent.classList.remove("active");
        prevChevron.classList.remove("rotated");
      }
    }

    if (!isOpen) {
      content.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
      chevron.classList.add("rotated");
      currentOpenSection = sectionId;
    } else {
      content.style.maxHeight = "0";
      content.classList.remove("active");
      chevron.classList.remove("rotated");
      currentOpenSection = null;
    }
  };

})();

// ============================= HOME-2 =================================
// ====  TESTIMONILS ====
const testimonialSwiper = new Swiper(".testimonials-2 .testimonials", {
  spaceBetween: 15,
  slidesPerView: 1,
  navigation: {
    nextEl: ".testimonials-2 .swiper-button-next",
    prevEl: ".testimonials-2 .swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    769: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    1170: {
      slidesPerView: 2,
      spaceBetween: 32,
    },
  },
});

// CARDS SLIDER
// ==== CARDS COVERFLOW SWIPER with Navigation ====
const cardsSwiper = new Swiper(" .cards", {
  grabCursor: true,
  slidesPerView: "2.3",
  spaceBetween: 60,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".cards .swiper-pagination",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    439: {
      slidesPerView: 1.2,
      spaceBetween: 25,
    },
    550: {
      slidesPerView: 1.4,
      spaceBetween: 33,
    },
    618: {
      slidesPerView: 1.6,
      spaceBetween: 25,
    },
    769: {
      slidesPerView: 1.6,
      spaceBetween: 33,
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1170: {
      slidesPerView: 2.5,
      spaceBetween: 40,
    },
    1260: {
      spaceBetween: 50,
      slidesPerView: 2.5,
    },
  },
});

// ==== RANGE SLIDER CONTROLS ====
const range = document.getElementById("slideRange");

function updateRangeFill(value, max) {
  const percentage = (value / max) * 100;
  range.style.background = `linear-gradient(to right, orange ${percentage}%, #e5e7eb ${percentage}%)`;
}

if (range && cardsSwiper) {
  // Set initial background
  updateRangeFill(range.value, range.max);

  range.addEventListener("input", function () {
    const index = parseInt(this.value) - 1;
    cardsSwiper.slideTo(index);
    updateRangeFill(this.value, this.max);
  });

  cardsSwiper.on("slideChange", () => {
    const current = cardsSwiper.realIndex + 1;
    range.value = current;
    updateRangeFill(current, range.max);
  });
}

(function () {
  // ================= FAQ TOGGLE =================

  window.toggleFaq = function (button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector("svg");
    const isOpen = content.classList.contains("active");

    // Find the parent faq-outer-box
    const faqGroup = button.closest(".faq-outer-box");

    // 🔒 Close all FAQs within the same group
    if (faqGroup) {
      faqGroup.querySelectorAll(".faq-content").forEach((c) => {
        c.style.maxHeight = "0";
        c.classList.remove("active");
      });

      faqGroup.querySelectorAll(".faq-toggle-button svg").forEach((svg) => {
        svg.classList.remove("rotate-45");
      });
    }

    // 🔓 Open clicked FAQ
    if (!isOpen) {
      content.classList.add("active");
      content.style.maxHeight = content.scrollHeight + "px";
      icon.classList.add("rotate-45");
    }
  };

  // ========== OPEN FIRST FAQ BY DEFAULT ==========
  // ========== OPEN FIRST FAQ IN EACH OUTER BOX ==========
  document.addEventListener("DOMContentLoaded", function () {
    const faqGroups = document.querySelectorAll(".faq-outer-box");

    faqGroups.forEach((group) => {
      const firstButton = group.querySelector(
        ".faq-inner-box .faq-toggle-button",
      );

      if (firstButton) {
        const content = firstButton.nextElementSibling;
        const icon = firstButton.querySelector("svg");

        content.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
        icon.classList.add("rotate-45");
      }
    });
  });
})();

// ========================= ENX OVEWRVIEW =========================================
// TAB MENU

const tabButtons = document.querySelectorAll(".tab-btn");
const tabImage = document.getElementById("tabImage");

const ACTIVE_CLASSES = [
  "!text-primary",
  "border-primary",
  "2xl:pl-[34px]",
  "xl:pl-[22px]",
  "pl-[18px]",
];
const INACTIVE_CLASSES = ["!text-white/60", "border-transparent"];

// Mapping tab key to image
const TAB_IMAGES = {
  data: "../image/data-management.webp",
  networking: "../image/networking.webp",
  software: "../image/Software-development.webp",
  cloud: "../image/Cloud-computing.webp",
  mobile: "../image/Mobile-technology.webp",
  bi: "../image/Business-intelligence.webp",
  cybersecurity: "../image/Cybersecurity.webp",
};

// Set image on load
const defaultTab = document.querySelector(".tab-btn.text-white"); // active on load
if (defaultTab) {
  const defaultKey = defaultTab.dataset.tab;
  if (TAB_IMAGES[defaultKey]) {
    tabImage.src = TAB_IMAGES[defaultKey];
  }
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => {
      b.classList.remove(...ACTIVE_CLASSES);
      b.classList.add(...INACTIVE_CLASSES);
    });

    btn.classList.add(...ACTIVE_CLASSES);
    btn.classList.remove(...INACTIVE_CLASSES);

    const key = btn.dataset.tab;
    if (TAB_IMAGES[key]) {
      // Add fade-out class to trigger animation
      tabImage.classList.add("image-fade-out");

      // Wait for the fade-out animation to finish before changing the image
      setTimeout(() => {
        tabImage.src = TAB_IMAGES[key];
        tabImage.classList.remove("image-fade-out");
        tabImage.classList.add("image-fade-in"); // Add fade-in class

        // Remove fade-in class after the transition
        setTimeout(() => {
          tabImage.classList.remove("image-fade-in");
        }, 300); // Match this duration with the CSS transition duration
      }, 300); // Match this duration with the CSS transition duration
    }
  });
});

// ============================ HEALTHCARE SOLUTIONS ======================================
// OVERFLOW SWIPER
// ==== CARDS COVERFLOW SWIPER with Navigation ====
const healthcareSwiper = new Swiper(".trendHealthcare .healthcare", {
  grabCursor: true,
  // centeredSlides: true,
  slidesPerView: "3.2",
  spaceBetween: 41,
  navigation: {
    nextEl: ".trendHealthcare .swiper-button-next",
    prevEl: ".trendHealthcare .swiper-button-prev",
  },
  pagination: {
    el: ".trendHealthcare .healthcare .swiper-pagination",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    426: {
      slidesPerView: 1.1,
      spaceBetween: 16,
    },
    470: {
      slidesPerView: 1.6,
      spaceBetween: 16,
    },
    530: {
      slidesPerView: 1.8,
      spaceBetween: 16,
    },
    601: {
      slidesPerView: "2",
      spaceBetween: 25,
    },
    769: {
      slidesPerView: "2.3",
      spaceBetween: 28,
    },
    992: {
      slidesPerView: "2.7",
      spaceBetween: 28,
    },
    1170: {
      slidesPerView: "3.2",
      spaceBetween: 32,
    },
    1441: {
      spaceBetween: 41,
    },
  },
});

// VIDEO PLAY/PAUSE
const video = document.getElementById("mainVideo");
const playButton = document.getElementById("playButton");

if (video && playButton) {
  playButton.addEventListener("click", () => {
    video.play();
    playButton.classList.add("hidden");
  });

  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
}

var swiper = new Swiper(".logos", {
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      spaceBetween: 16,
      slidesPerView: 2,
    },
    321: {
      spaceBetween: 40,
      slidesPerView: 2,
    },
    500: {
      spaceBetween: 40,
      slidesPerView: 3,
    },
    591: {
      spaceBetween: 60,
      slidesPerView: 3,
    },
    992: {
      spaceBetween: 60,
      slidesPerView: 4,
    },
    1170: {
      spaceBetween: 60,
      slidesPerView: 5,
    },
    1260: {
      slidesPerView: 5,
      spaceBetween: 80,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  function formatNumberAbbreviated(value, decimals = 0) {
    if (value >= 1e9)
      return (value / 1e9).toFixed(decimals).replace(/\.0+$/, "") + "B";
    if (value >= 1e6)
      return (value / 1e6).toFixed(decimals).replace(/\.0+$/, "") + "M";
    if (value >= 1e3)
      return (value / 1e3).toFixed(decimals).replace(/\.0+$/, "") + "k";

    return value.toFixed(decimals).replace(/\.0+$/, "");
  }

  function animateValue(el, start, end, duration, suffix = "") {
    if (end < start) return;

    const decimals = (end.toString().split(".")[1] || "").length;
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;

      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = progress * (end - start) + start;

      el.innerHTML = formatNumberAbbreviated(current, decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          const start = parseFloat(el.dataset.start) || 0;
          const end = parseFloat(el.dataset.end) || 0;
          const duration = parseInt(el.dataset.duration) || 2000;
          const suffix = el.dataset.suffix || "";

          animateValue(el, start, end, duration, suffix);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.6 },
  );

  document.querySelectorAll(".count-up").forEach((el) => {
    observer.observe(el);
  });
});

// ========================= FOOTER MARQUEE (INDEX-2) ==========================
(function () {
  const slider = document.querySelector(".footer-marquee");
  const track = document.querySelector(".footer-marquee-track");
  if (!slider || !track) return;
  const originalHTML = track.innerHTML.trim();
  // Ensure one "set" is at least as wide as the slider
  while (track.scrollWidth < slider.offsetWidth) {
    track.innerHTML += originalHTML;
  }
  // Duplicate the whole set once more so we have two identical halves
  track.innerHTML += track.innerHTML;
  const singleSetWidth = track.scrollWidth / 2;
  // Distance to travel in one cycle (exact width of one set)
  track.style.setProperty("--footer-marquee-translate", -singleSetWidth + "px");
  // Optional: keep speed roughly constant regardless of width
  const pixelsPerSecond = 80; // adjust for faster/slower scroll
  const duration = singleSetWidth / pixelsPerSecond;
  track.style.setProperty("--footer-marquee-duration", duration + "s");
})();

// ISOLATED Custom Dropdown Script - Uses only "form-dropdown" class
// No inline CSS - All styling from external CSS file
(function () {
  "use strict";

  const FormDropdown = {
    init: function () {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () =>
          this.setupDropdowns(),
        );
      } else {
        this.setupDropdowns();
      }
    },
    setupDropdowns: function () {
      const formDropdowns = document.querySelectorAll(".form-dropdown");
      if (formDropdowns.length === 0) return;
      formDropdowns.forEach((dropdown) => {
        this.initializeDropdown(dropdown);
      });
      this.setupGlobalClickHandler();
    },

    initializeDropdown: function (dropdown) {
      const button = dropdown.querySelector(".form-dropdown-button");
      const menu = dropdown.querySelector(".form-dropdown-menu");
      const selected = dropdown.querySelector(".form-dropdown-selected");
      const arrow = dropdown.querySelector(".form-dropdown-arrow");
      const options = dropdown.querySelectorAll(".form-dropdown-option");

      if (!button || !menu || !selected || !options.length) return;

      // Check if already initialized
      if (dropdown.hasAttribute("data-dropdown-initialized")) return;
      dropdown.setAttribute("data-dropdown-initialized", "true");

      // Toggle dropdown
      button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleDropdown(dropdown, menu, arrow);
      });

      // Handle options - DON'T clone, just add listeners directly
      options.forEach((option) => {
        option.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.selectOption(dropdown, option, selected, menu, arrow);
        });
      });
    },

    toggleDropdown: function (currentDropdown, menu, arrow) {
      // Close all other dropdowns
      document.querySelectorAll(".form-dropdown").forEach((otherDropdown) => {
        if (otherDropdown !== currentDropdown) {
          const otherMenu = otherDropdown.querySelector(".form-dropdown-menu");
          const otherArrow = otherDropdown.querySelector(
            ".form-dropdown-arrow",
          );
          if (otherMenu) otherMenu.classList.remove("is-open");
          if (otherArrow) otherArrow.classList.remove("is-rotated");
        }
      });

      // Toggle current dropdown
      const isOpen = menu.classList.contains("is-open");
      if (isOpen) {
        menu.classList.remove("is-open");
        if (arrow) arrow.classList.remove("is-rotated");
      } else {
        menu.classList.add("is-open");
        if (arrow) arrow.classList.add("is-rotated");
      }
    },

    selectOption: function (
      dropdown,
      selectedOption,
      selectedSpan,
      menu,
      arrow,
    ) {
      const value = selectedOption.getAttribute("data-value");
      const text = selectedOption.textContent.trim();

      // Update displayed text
      selectedSpan.textContent = text;
      selectedSpan.classList.add("is-selected");

      // Remove is-active from all options in THIS dropdown
      dropdown.querySelectorAll(".form-dropdown-option").forEach((opt) => {
        opt.classList.remove("is-active");
      });

      // Add is-active to selected option
      selectedOption.classList.add("is-active");

      // Store selected value
      dropdown.setAttribute("data-selected-value", value);

      // Create or update hidden input
      let hiddenInput = dropdown.querySelector('input[type="hidden"]');
      if (!hiddenInput) {
        hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name =
          dropdown.getAttribute("data-name") || "dropdown-value";
        dropdown.appendChild(hiddenInput);
      }
      hiddenInput.value = value;

      // Close dropdown
      menu.classList.remove("is-open");
      if (arrow) arrow.classList.remove("is-rotated");

      // Dispatch event
      const event = new CustomEvent("form-dropdown-change", {
        detail: {
          value: value,
          text: text,
          dropdown: dropdown,
          group: selectedOption.getAttribute("data-group"),
          tab: selectedOption.getAttribute("data-tab"),
          image: selectedOption.getAttribute("data-image"),
        },
        bubbles: true,
      });
      dropdown.dispatchEvent(event);
    },

    setupGlobalClickHandler: function () {
      document.addEventListener(
        "click",
        (e) => {
          const clickedDropdown = e.target.closest(".form-dropdown");
          if (!clickedDropdown) {
            this.closeAllDropdowns();
          }
        },
        true,
      );
    },

    closeAllDropdowns: function () {
      document.querySelectorAll(".form-dropdown-menu").forEach((menu) => {
        menu.classList.remove("is-open");
      });
      document.querySelectorAll(".form-dropdown-arrow").forEach((arrow) => {
        arrow.classList.remove("is-rotated");
      });
    },
  };

  // Initialize
  FormDropdown.init();
  // Expose globally if needed
  window.FormDropdown = FormDropdown;
})();

// ================= INSIGHT PAGE DROPDOWN =================
// INSIGHTS DROPDOWN (isolated - no conflict)
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("insightDropdownBtn");
  const menu = document.getElementById("insightMenu");
  const chevron = document.getElementById("insightChevron");
  const wrapper = document.getElementById("insight-wrapper");

  if (!btn) return;

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    menu.classList.toggle("hidden");
    chevron.classList.toggle("rotate-180");
  });

  document.addEventListener("click", function (e) {
    if (!wrapper.contains(e.target)) {
      menu.classList.add("hidden");
      chevron.classList.remove("rotate-180");
    }
  });
});

// INSIGHT GRID CHANGE (insights-2.html only - guard to avoid errors on other pages)
const grid = document.getElementById("insightGrid");
const grid2 = document.getElementById("grid2Btn");
const grid3 = document.getElementById("grid3Btn");
if (grid && grid2 && grid3) {
  grid2.addEventListener("click", () => {
    grid.classList.remove("grid-3");
    grid2.classList.add("active");
    grid3.classList.remove("active");
  });
  grid3.addEventListener("click", () => {
    grid.classList.add("grid-3");
    grid3.classList.add("active");
    grid2.classList.remove("active");
  });
}


/* ==============================
   GLOBAL REPLY FORM
================================*/
const replyForm = document.getElementById("replyForm");



/* ==============================
   CANCEL REPLY
================================*/
function cancelReply(btn) {
  const parentComment = replyForm.parentNode;
  closeForm(replyForm);
  document.querySelectorAll(".reply-btn").forEach((b) => {
    b.classList.remove("text-primary");
    b.classList.add("text-slate-100");
  });

  replyForm.querySelectorAll("input,textarea").forEach((el) => {
    el.value = "";
  });
  updateCommentLine(parentComment);
}

/* ==============================
   VOTING
================================*/
function vote(btn, dir) {
  const item = btn.closest(".comment-item");
  const likeBtn = item.querySelector(".like-btn");
  const dislikeBtn = item.querySelector(".dislike-btn");
  const count = btn.querySelector(".vote-count");
  let num = parseInt(count.textContent);
  const prev = btn.dataset.voted ? parseInt(btn.dataset.voted) : null;

  // Determine opposite button
  const otherBtn = dir === 1 ? dislikeBtn : likeBtn;
  // remove vote if clicked again (same button)
  if (prev === dir) {
    num--;
    count.textContent = String(num).padStart(2, "0");
    delete btn.dataset.voted;
    btn.classList.remove("text-primary", "text-red-500");
    btn.classList.add("text-slate-100");
    return;
  }

  // If opposite button has a vote, remove it first
  if (otherBtn && otherBtn.dataset.voted) {
    const otherCount = otherBtn.querySelector(".vote-count");
    let otherNum = parseInt(otherCount.textContent);
    otherNum--;
    otherCount.textContent = String(otherNum).padStart(2, "0");
    delete otherBtn.dataset.voted;
    otherBtn.classList.remove("text-primary", "text-red-500");
    otherBtn.classList.add("text-slate-100");
  }

  // If current button already had a different vote, decrease its count
  if (prev) {
    num--;
  }

  // add vote
  num++;
  count.textContent = String(num).padStart(2, "0");
  btn.dataset.voted = String(dir);
  btn.classList.remove("text-slate-100");
  btn.classList.add(dir === 1 ? "text-primary" : "text-red-500");
}



/* ==============================
   SHOW TOAST NOTIFICATION
================================*/
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;

  // Show toast
  toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  // Auto hide after duration
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, duration);
}



// file choose name toggle
const fileInput = document.getElementById("fileUpload");
const fileText = document.getElementById("fileText");

if (fileInput && fileText) {
  fileInput.addEventListener("change", function () {
    if (this.files.length > 0) {
      fileText.textContent = this.files[0].name;
    } else {
      fileText.textContent = "No file selected";
    }
  });
}

$(document).ready(function () {
  /* =========================
     TAB SWITCH FUNCTION
  ========================= */
  function switchTab($section, group, tab, imageUrl = null) {
    if (!group || !$section.length) return;

    // Active state (buttons + dropdown options)
    $section.find(`[data-group="${group}"][data-tab]`).each(function () {
      $(this).toggleClass("tab--active", $(this).attr("data-tab") === tab);
    });

    // Show correct content
    $section.find(`.tab-content[data-group="${group}"]`).each(function () {
      $(this).toggleClass("hidden", $(this).attr("data-tab") !== tab);
    });

    // Update image
    const $imageElement = $section.find(`#tabImg-${group}`);
    if ($imageElement.length && imageUrl) {
      $imageElement.attr("src", imageUrl);
    }

    // Update dropdown label
    const $activeBtn = $section
      .find(`[data-group="${group}"][data-tab="${tab}"]`)
      .first();
    if ($activeBtn.length) {
      $section.find(".form-dropdown-selected").text($.trim($activeBtn.text()));
    }
  }

  /* =========================
     DEFAULT LOAD
  ========================= */
  $("section").each(function () {
    const $section = $(this);
    // Find the first active tab in this section to initialize
    const $firstActive = $section.find(".tab--active").first();
    if ($firstActive.length) {
      switchTab(
        $section,
        $firstActive.attr("data-group"),
        $firstActive.attr("data-tab"),
        $firstActive.attr("data-image"),
      );
    }
  });

  /* =========================
     TAB CLICK
  ========================= */
  $(document).on("click", ".tab, .form-dropdown-option", function (e) {
    e.preventDefault();
    const $btn = $(this);
    const $section = $btn.closest("section");

    const group = $btn.attr("data-group") || $section.attr("id");
    const tab = $btn.attr("data-tab") || $btn.attr("data-value") || $btn.text().trim();
    const imageUrl = $btn.attr("data-image") || $btn.data("image");

    if (!group || !tab) {
      return;
    }

    switchTab($section, group, tab, imageUrl);

    // Close dropdown after selection
    $section.find(".form-dropdown-menu").removeClass("open");
  });

  /* =========================
     DROPDOWN CHANGE EVENT
  ========================= */
  $(document).on("form-dropdown-change", function (e) {
    const detail = e.originalEvent ? e.originalEvent.detail : e.detail;
    if (!detail) return;

    const $dropdown = $(detail.dropdown);
    const $section = $dropdown.closest("section");
    const group = detail.group || $dropdown.attr("data-group") || $section.attr("id");
    const tab = detail.tab || detail.value || $dropdown.attr("data-tab") || $dropdown.attr("data-value");
    const imageUrl = detail.image || $dropdown.attr("data-image");

    if (!group || !tab) return;
    switchTab($section, group, tab, imageUrl);
  });

  /* =========================
     DROPDOWN TOGGLE
  ========================= */
  $(document).on("click", function (e) {
    const $button = $(e.target).closest(".form-dropdown-button");

    if ($button.length) {
      e.stopPropagation();
      const $section = $button.closest("section");
      const $menu = $button.siblings(".form-dropdown-menu");

      // Close other dropdowns in the same section
      $section.find(".form-dropdown-menu").not($menu).removeClass("open");
      $menu.toggleClass("open");
      return;
    }

    // Close all dropdowns on outside click
    $(".form-dropdown-menu").removeClass("open");
  });
});

$(document).ready(function () {
  document.querySelectorAll(".js-highlight").forEach((el) => {
    let words = el.dataset.words.split(",").map((w) => w.trim());
    let text = el.innerHTML;

    words.forEach((word) => {
      let regex = new RegExp(`(${word})`, "gi");
      text = text.replace(regex, `<span class="text-primary">$1</span>`);
    });

    el.innerHTML = text;
  });

  $(document).on("click", ".ajax-load-more-grid", function (e) {
    e.preventDefault();

    const $button = $(this);

    // ✅ Get URL from anywhere (parent OR child <a>)
    let nextPageUrl = $button.attr("href") || $button.find("a").attr("href");

    if (!nextPageUrl) return;

    $button.find("img").addClass("animate-spin");

    const appEnv = document
      .querySelector('meta[name="app-env"]')
      ?.getAttribute("content");

    if (appEnv === "production" && nextPageUrl.startsWith("http:")) {
      nextPageUrl = nextPageUrl.replace(/^http:/, "https:");
    }

    $button.prop("disabled", true).addClass("loading");

    $.ajax({
      url: nextPageUrl,
      type: "GET",
      dataType: "html",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      success: function (response) {
        const $response = $("<div>").html(response);
        const $newItems = $response.find(".grid-item-append");
        const $newModals = $response.find(".modal");
        const $newLoadMore = $response.find(".load-more-wrap");

        if ($newItems.length) {
          $(".grid-main-div").append($newItems);
          if (typeof Isotope !== "undefined") {
            $(".grid-main-div").isotope("appended", $newItems);
          }
        }

        if ($newModals.length) {
          $(".grid-main-div").append($newModals);
        }

        if ($newLoadMore.length) {
          $(".load-more-wrap").replaceWith($newLoadMore);
        } else {
          $(".load-more-wrap").remove();
        }
      },
      complete: function () {
        $button.prop("disabled", false).removeClass("loading");
      },
    });
  });

  $(
    ".blog-details-content h2 , .blog-details-content h1 , .blog-details-content h3 , .blog-details-content h4 , .blog-details-content h5",
  ).each(function (index, el) {
    var $el = $(el);
    // Generate an ID from the text
    var id = $el
      .text()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    $el.attr("id", id); // ensure uniqueness
  });

  const $toc = $("#toc-nav");

  $(
    ".blog-details-content h2 , .blog-details-content h1 , .blog-details-content h3 , .blog-details-content h4 , .blog-details-content h5",
  ).each(function () {
    const $heading = $(this);

    const id = $heading.attr("id");
    const text = $heading.text().trim();

    if (!id || !text) return;

    $toc.append(`
    <li class="cursor-pointer">
      <a href="#${id}" class="toc-item p2">
      ${text}
    </a>
    </li>
  `);
  });

  $(document).on("click", ".toc-item", function () {
    const targetId = $(this).data("target");

    const $target = $("#" + targetId);

    if (!$target.length) return;

    $("html, body").animate(
      {
        scrollTop: $target.offset().top - 120,
      },
      500,
    );
  });

  $(document).on("submit", "#commentForm, #repplyForm", function (e) {
    e.preventDefault();
    const $form = $(this);
    // find parent reply container

    var $message = $form.find(".form-message").addClass("hidden");
    $message.html("");
    $form.find(".error-message").addClass("hidden");
    $form.find(".error-message .field-error").html("");
    $form.find(".form-control").removeClass("error");

    const formData = new FormData(this);

    $.ajax({
      // Statamic sets form action automatically
      url: $form.attr("action"),
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        // You get a JSON response from Statamic
        if (response.success) {
          $form.trigger("reset");
          $("#fileLabel").html("");
          $message.removeClass("hidden");
          $message.text("Thank you! Your comment has been submitted.");
          location.reload();
        }
      },
      error: function (response) {
        if (response.responseJSON.error) {
          $.each(response.responseJSON.error, function (field, message) {
            const $input = $form.find('[name="' + field + '"]');
            const $errorWrapper = $form.find(
              '.error-message[data-error-for="' + field + '"]',
            );
            const $errorText = $errorWrapper.find(
              '.error-text[data-error-for="' + field + '"]',
            );
            // Add red border or error style to the input
            $input.addClass("error");
            // Set error message text inside <span>
            $errorText.html(
              Array.isArray(message) ? message.join("<br>") : message,
            );
            // Show the wrapper (was hidden initially)
            $errorWrapper
              .removeClass("hidden opacity-0")
              .addClass("flex opacity-100");
          });

          // Recalculate form height after errors become visible.
          requestAnimationFrame(() => adjustReplyFormMaxHeight($form));
        }
      },
    });
  });

  $(document).on("click", ".reply-btn", function () {
    const $btn = $(this);
    const $comment = $btn.closest(".comment-item");
    const $form = $("#repplyForm"); // ⚠️ match your HTML ID
    const $previousComment = $form.parent();

    /* =========================
       SET HIDDEN FIELD VALUES
    ========================= */
    const parentId = $btn.data("parent_id") || null;
    const insightId = $btn.data("insight_id") || null;

    $form.find('[name="parent_id"]').val(parentId);
    $form.find('[name="insight_id"]').val(insightId);

    /* =========================
       CHECK ALREADY OPEN
    ========================= */
    const alreadyOpen =
      $form.data("open") === 1 && $previousComment[0] === $comment[0];

    /* ===== SAME COMMENT → CLOSE ===== */
    if (alreadyOpen) {
      closeForm($form);
      $btn.removeClass("text-primary").addClass("text-slate-100");
      updateCommentLine($comment);
      return;
    }

    /* ===== CLOSE PREVIOUS ===== */
    if ($previousComment.length && $previousComment[0] !== $comment[0]) {
      const $prevBtn = $previousComment.find(".reply-btn");

      closeForm($form);
      $prevBtn.removeClass("text-primary").addClass("text-slate-100");
      updateCommentLine($previousComment);
    }

    /* =========================
       MOVE FORM TO COMMENT
    ========================= */
    $comment.append($form);

    /* =========================
       OPEN FORM
    ========================= */
    openForm($form);

    $btn.removeClass("text-slate-100").addClass("text-primary");

    updateCommentLine($comment);
  });

  /* =========================
     OPEN FORM
  ========================= */
  function openForm($form) {
    if (!$form.length) return;

    $form.data("open", 1);

    const height = $form[0].scrollHeight;

    $form
      .removeClass("h-0")
      .addClass("h-full")
      .css("max-height", height + "px")
      .removeClass("opacity-0 -translate-y-1.5 mt-0")
      .addClass("opacity-100 translate-y-0 mt-5");

    $form
      .find(".reply-body")
      .removeClass("border-transparent")
      .addClass("border-brand");
  }
  function adjustReplyFormMaxHeight($form) {
    if (!$form.length) return;
    const height = $form[0].scrollHeight;
    $form.css("max-height", height + "px");
  }

  /* =========================
     CLOSE FORM
  ========================= */
  function closeForm($form) {
    if (!$form.length) return;

    $form.data("open", 0);

    $form
      .removeClass("h-full")
      .addClass("h-0")
      .css("max-height", "0px")
      .removeClass("opacity-100 translate-y-0 mt-5")
      .addClass("opacity-0 -translate-y-1.5 mt-0");

    $form
      .find(".reply-body")
      .removeClass("border-brand")
      .addClass("border-transparent");
  }

  /* =========================
     UPDATE COMMENT LINE
  ========================= */
  function updateCommentLine($comment) {
    const $line = $comment.find(".comment-line");
    if (!$line.length) return;

    const hasReplies = $comment.find(".comment-item.ml-5").length > 0;

    const replyOpen =
      $("#repplyForm").data("open") === 1 &&
      $("#repplyForm").parent()[0] === $comment[0];

    if (hasReplies || replyOpen) {
      $line.removeClass("h-0");
    } else {
      $line.addClass("h-0");
    }
  }

  $(document).on("submit", "#contact-form", function (e) {
    e.preventDefault();
    const $form = $(this);
    const $messages = $form.find("#form-response");
    $messages.html("");
    $form.find(".field-error.text-danger").text("");
    const formData = new FormData(this);

    $.ajax({
      url: $form.attr("action"),
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        $form.find(".field-error.text-danger").text("");
        if (response.success) {
          $messages
            .text("Thank you! We'll be in touch shortly.")
            .css("color", "#087c45")
            .fadeIn();

          setTimeout(() => {
            $form[0].reset();
            $messages.html("");
          }, 1500);
        }
      },
      error: function (response) {
        if (response.responseJSON.error) {
          $.each(response.responseJSON.error, function (field, message) {
            const $input = $form.find('[name="' + field + '"]');
            const $errorContainer = $form.find(
              '[data-error-for="' + field + '"]',
            );

            $input.addClass("error");
            $errorContainer.html(
              Array.isArray(message) ? message.join("<br>") : message,
            );
          });

          // Recalculate form height after errors become visible.
          adjustReplyFormMaxHeight($form);
        }
      },
    });
  });

  const $searchInputs = $("#site-search-input, #navSearchInputMobile");

  if (typeof headerSearch === "undefined" || !headerSearch) {
    return;
  }

  if (!$searchInputs.length) {
    return;
  }

  let searchTimeout;
  let searchAjax = null;

  function getSearchUi($input) {
    if ($input.attr("id") === "navSearchInputMobile") {
      return {
        $result: $("#combined-search-results-mobile"),
        $loader: $("#search-loader-mobile"),
      };
    }
    return {
      $result: $("#combined-search-results"),
      $loader: $("#search-loader"),
    };
  }

  function resetAllSearchPanels() {
  //   $("#combined-search-results, #combined-search-results-mobile").each(
  //     function () {
  //       $(this).html("").removeClass("show").addClass("hidden");
  //     },
  //   );
  //   $("#search-loader, #search-loader-mobile").addClass("hidden");
  //   $(".toggle-view-btn").each(function () {
  //     const type = $(this).data("type");
  //     if (type) {
  //       $(this).attr("href", `/${type}?s=`);
  //     }
  //   });
  //   $(".search-menu-bar").css("overflow", "visible");
   }

  function fetchHeaderSearch($input, query, immediate) {
    const ui = getSearchUi($input);
    if (!ui.$result.length || !ui.$loader.length) {
      return;
    }

    const run = function () {
      if (searchAjax && searchAjax.abort) {
        searchAjax.abort();
        searchAjax = null;
      }

      ui.$loader.removeClass("hidden");
      $(".search-menu-bar").css("overflow", "visible");

      searchAjax = $.ajax({
        url: headerSearch + `?q=${encodeURIComponent(query)}`,
        method: "GET",
        success: function (html) {
          ui.$result.removeClass("hidden");
          ui.$result.html(html).addClass("show");

          $(".toggle-view-btn").each(function () {
            const type = $(this).data("type");
            console.log(query);
            if (type) {
              $(this).attr("href", `/${type}?s=${encodeURIComponent(query)}`);
              $(this).attr("data-query", query);
            }
          });
        },
        error: function (xhr) {
          if (xhr && xhr.statusText === "abort") {
            return;
          }
          ui.$result
            .removeClass("hidden")
            .html('<p class="text-red-600">Error loading results.</p>')
            .addClass("show");
        },
        complete: function () {
          ui.$loader.addClass("hidden");
          searchAjax = null;
        },
      });
    };

    clearTimeout(searchTimeout);
    if (immediate) {
      run();
    } else {
      searchTimeout = setTimeout(run, 500);
    }
  }

  $searchInputs.on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const $input = $(this);
      const query = $.trim($input.val());
      if (query.length < 2) {
        return;
      }
      fetchHeaderSearch($input, query, true);
    }
  });

  $searchInputs.on("keyup", function () {
    const $input = $(this);
    const query = $.trim($input.val());

    if (query.length < 2) {
      resetAllSearchPanels();
      return;
    }

    fetchHeaderSearch($input, query, false);
  });

  if (currentPage == "services") {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("s");

    if (searchValue) {
      $.ajax({
        url: serviceSearch,
        type: "GET",
        data: { s: searchValue },
        success: function (data) {
          let html = "";

          if (data.length === 0) {
            html =
              '<p class="text-center fw-bold fs-5">Oops! No servicesa here right now.</p>';
          } else {
            data.forEach(function (service) {
              html += `
                  <div class="flex flex-col items-start 1xl:py-12.5 1xl:px-[45px] xl:py-10 xl:px-[38px] lg:p-10 sm:p-7 py-7 border-b sm:border-r border-gray-100 grid-item-append" data-aos="fade-up">
                        <!-- Type logo -->
                       <img src="${service.image}" class="1xl:mb-[35px] lg:mb-8 mb-6 1xl:w-[60px] 1xl:h-[60px] xl:w-[55px] xl:h-[55px] lg:w-12.5 lg:h-12.5 md:w-11 md:h-11 w-10 h-10">
                        <!-- Type Title -->
                        <a class="hover:text-primary 3xl:mb-5 xl:mb-4 mb-3 h4 font-light"
                            href="${service.button_url}${service.slug}">${service.title}
                        </a>
                        <p class="p2">
                            ${service.short_description ?? ""}
                        </p>

                        <div class="lg:mt-[30px] mt-5">
                            <a class="read-more btn text-primary hover:text-black font-normal" href="${service.button_url}${service.slug}">${service.button_text}
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="ml-[10px] 1xl:w-4 w-3.5" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_7077_4647)">
                                        <path d="M0.376871 13.7997L12.6481 1.52849L2.12991 1.52849L2.03975 0.116041L15.0623 0.116043L15.0623 13.1386L13.6499 13.0484L13.6499 2.53022L1.37861 14.8015L0.376871 13.7997Z" fill="currentColor" />
                                    </g>
                                </svg>
                            </a>
                        </div>

                    </div>`;
            });
          }

          $(".service_search").html(html);
          $(".wc-service-section").find(".load-more-btn").remove();
        },
      });
    }
  }

  if (currentPage == "insights") {
    const params = new URLSearchParams(window.location.search);
    const searchValue = params.get("s");

    if (searchValue) {
      $.ajax({
        url: insightSearch,
        type: "GET",
        data: { s: searchValue },
        success: function (data) {
          let html = "";

          if (data.length === 0) {
            html =
              '<p class="text-center fw-bold fs-5">Oops! No servicesa here right now.</p>';
          } else {
            data.forEach(function (service) {
              html += `


                  <div class="tech-card group grid-item-append" data-aos="fade-up">
                        <div class="flex flex-col items-start justify-between h-auto 1xl:w-[630px] md:w-1/2 w-full">
                            <div>
                                <div class="flex items-start gap-3 1xl:mb-[25px] md:mb-5 mb-4">
                                    <span class="dash border border-primary mt-3"></span>

                                    <p class="p2"> By
                                        <span class="font-normal text-primary"> ${service.author_name}</span> —
                                        ${service.publish_date}
                                    </p>
                                </div>
                                <a href="insight/{{ slug }}" class="block">
                                    <h4 class="2xl:mb-5 sm:mb-4 mb-3 group-hover:text-primary transition-all ease-in-out">
                                        ${service.title}
                                    </h4>
                                </a>
                                <p class="p2">
                                    ${service.short_description}
                                </p>
                            </div>

                            <a href="${service.button_url}${service.slug}" class="btn btn-primary all-btn rounded-full group mt-6">
                               ${service.button_text}
                                <span class="btn btn-arrow rounded-full all-btn-arrow group-hover:rotate-45 transition-all ease-in-out duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none" class="1xl:size-5.5 xl:size-5 size-4">
                                        <g clip-path="url(#clip0_421_92)">
                                            <path d="M3.37663 17.7995L15.6479 5.52821L5.12966 5.52821L5.03951 4.11577L18.0621 4.11577L18.0621 17.1383L16.6496 17.0482L16.6496 6.52995L4.37836 18.8012L3.37663 17.7995Z" fill="currentColor" />
                                        </g>
                                    </svg>
                                </span>
                            </a>

                        </div>
                        <div class="1xl:w-[56.6%] md:w-1/2 w-full">
                            <a href="insight/{{ slug }}" class="block relative before:block before:content-[''] 3xl:before:pt-[440px] 2xl:before:pt-[400px] xl:before:pt-[390px] sm:before:pt-[350px] before:pt-[240px] w-full h-full">
                                <img loading="lazy" src="${service.image}" alt="Tech Trend Image" class="absolute top-0 left-0 w-full h-full object-cover" />
                            </a>
                        </div>
                    </div>`;
            });
          }

          $(".insight_search").html(html);
          $(".wc-insight-section").find(".load-more-btn").remove();
        },
      });
    }
  }

  $(document).on("submit", ".subscribed-form", function (e) {
    e.preventDefault();
    const $form = $(this);
    var $message = $form.find(".newsletter-message");
    const email = $form.find("#email").val();

    // Clear previous errors
    $form.find(".error").removeClass("error");
    $form.find("[data-error-for]").html("");
    $message.html("").hide();

    $.ajax({
      url: newsLetterUrl,
      method: "get",
      data: {
        email: email,
      },
      dataType: "json",
      success: function (response) {
        if (response.status == true) {
          $message.text(response.message).css("color", "#008300").fadeIn();
          setTimeout(() => {
            $form[0].reset();
            $message.html("").fadeOut();
          }, 3000);
        } else {
          $message.text(response.message).css("color", "#df5243").fadeIn();
        }
      },
      error: function (response) {
        if (response.responseJSON) {
          const errors =
            response.responseJSON.errors || response.responseJSON.error;
          if (errors) {
            $.each(errors, function (field, message) {
              const $input = $form.find('[name="' + field + '"]');
              const $errorContainer = $form.find(
                '[data-error-for="' + field + '"]',
              );

              $input.addClass("error");
              $errorContainer.html(
                Array.isArray(message) ? message.join("<br>") : message,
              );
            });
          } else if (response.responseJSON.message) {
            $message
              .text(response.responseJSON.message)
              .css("color", "#df5243")
              .fadeIn();
          }
        } else {
          $message
            .text("Something went wrong. Please try again.")
            .css("color", "#df5243")
            .fadeIn();
        }
      },
    });
  });

  $(document).on("click", ".job_btn", function (e) {
    e.preventDefault();

    const $btn = $(this);
    const jobId = $btn.data("job-id");
    const redirectUrl = $btn.data("url");
    const $enquiryForm = $("#open-position-form");

    // If enquiry form exists on same page → scroll
    if ($enquiryForm.length && jobId) {
      setTimeout(function () {
        const $position = $enquiryForm.find("#position");

        // Set selected option by value
        $position.val(jobId).trigger("change");

        const headerHeight = $("header").outerHeight() || 100;
        const offsetPosition = $enquiryForm.offset().top - headerHeight - 10;

        $("html, body").animate({ scrollTop: offsetPosition }, 600);
      }, 120);
      return;
    }
    // Otherwise → redirect
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  });
});

$(document).ready(function () {
  const $tocNav = $("#toc-nav");
  if (!$tocNav.length) return;

  const $tocLinks = $tocNav.find('a[href^="#"]');
  const $tocItems = $tocNav.find(".toc-item");

  // Build section list from TOC
  const sections = $tocLinks
    .map(function () {
      const href = $(this).attr("href") || "";
      const id = href.startsWith("#") ? href.substring(1) : "";
      return id ? document.getElementById(id) : null;
    })
    .get()
    .filter(Boolean)
    .sort((a, b) => {
      return $(a).offset().top - $(b).offset().top;
    });

  const PRIMARY_COLOR = "#ff8343";

  function setActive(id) {
    $tocItems.removeClass("toc-active");

    $tocLinks.css("color", "");

    const $activeLink = $tocNav.find(`a[href="#${CSS.escape(id)}"]`);
    const $activeItem = $activeLink.closest(".toc-item");

    if (!$activeItem.length) return;

    $activeItem.addClass("toc-active");
    $activeLink.css("color", PRIMARY_COLOR);
  }

  function updateActiveSection() {
    if (!sections.length) return;

    const refY =
      $(window).scrollTop() + Math.min(120, $(window).height() * 0.25);

    let currentSection = sections[0];

    sections.forEach((section) => {
      const $section = $(section);
      const sectionTop = $section.offset().top;
      const sectionBottom = sectionTop + $section.outerHeight();

      if (refY >= sectionTop && refY < sectionBottom) {
        currentSection = section;
        return false;
      }

      if (sectionTop <= refY) currentSection = section;
    });

    if (currentSection && currentSection.id) {
      setActive(currentSection.id);
    }
  }

  // Smooth scroll + active state
  $tocLinks.on("click", function (e) {
    e.preventDefault();

    const targetID = $(this).attr("href");
    const $target = $(targetID);

    if (!$target.length) return;

    setActive(targetID.substring(1));

    const offset = getOffset(); // keep your existing function
    const top = $target.offset().top - offset;

    $("html, body").animate({ scrollTop: top }, 400);
  });

  $(window).on("scroll", updateActiveSection);

  updateActiveSection();

  // Handle hash on load
  if (window.location.hash) {
    requestAnimationFrame(updateActiveSection);
    setTimeout(updateActiveSection, 100);

    $(window).on("load", function () {
      setTimeout(updateActiveSection, 50);
    });
  }

  $(window).on("hashchange", updateActiveSection);
});


$(document).ready(function () {

    // Support form custom file upload
    const $fileUpload = $("#fileUpload");
    const $fileText = $("#fileText");

    $fileUpload.on("change", function () {
        if (this.files.length > 0) {
            $fileText
                .text(this.files[0].name)
                .removeClass("text-[#868686]")
                .addClass("text-neutral-700");
        } else {
            $fileText
                .text("Upload files or screenshots")
                .removeClass("text-neutral-700")
                .addClass("text-[#868686]");
        }
    });

    // Career form file upload
    $(".resume-upload").on("change", function () {
        if (this.files.length > 0) {
            $(this)
                .removeClass("text-[#868686]")
                .addClass("text-neutral-700");
        } else {
            $(this)
                .removeClass("text-neutral-700")
                .addClass("text-[#868686]");
        }
    });

});