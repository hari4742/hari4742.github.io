window.addEventListener("load", (event) => {
  const loading = document.querySelector(".loading");
  loading.style.display = "none";
  document.querySelector("body").style.overflow = "visible";
});
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
if (navClose) {
  {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }
}

const navLink = document.querySelectorAll(".nav_link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

// Skills

const skillsContent = document.getElementsByClassName("skills_content");
const skillsHeader = document.querySelectorAll(".skills_header");

function toggleSkills() {
  let itemClass = this.parentNode.className;
  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills_content skills_close";
  }
  if (itemClass === "skills_content skills_close") {
    this.parentNode.className = "skills_content skills_open";
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills);
});

// Qualification
const tabs = document.querySelectorAll("[data-target]");
const tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("qualification_active");
    });
    target.classList.add("qualification_active");
    tabs.forEach((tab) => {
      tab.classList.add("qualification_active");
    });
    tab.classList.add("qualification_active");
  });
});

// Services
const modalViews = document.querySelectorAll(".services_modal");
const modalBtns = document.querySelectorAll(".services_button");
const modalCloses = document.querySelectorAll(".services_modal-close");
3;
let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener("click", () => {
    modal(i);
  });
});

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener("click", () => {
    modalViews.forEach((modalView) => {
      modalView.classList.remove("active-modal");
    });
  });
});

// Portfolio Swiper

let swiper = new Swiper(".swiper-container", {
  cssMode: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Scroll sections active link

const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector('.nav_menu a[href="#' + sectionId + '"]')
        .classList.add("active-link");
    } else {
      document
        .querySelector('.nav_menu a[href="#' + sectionId + '"]')
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// Change Background Header
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) {
    nav.classList.add("scroll-header");
  } else {
    nav.classList.remove("scroll-header");
  }
}

window.addEventListener("scroll", scrollHeader);

// Show scroll up
function scrollUp() {
  const scrollup = document.getElementById("scroll-up");
  if (this.scrollY >= 560) {
    scrollup.classList.add("show-scroll");
  } else {
    scrollup.classList.remove("show-scroll");
  }
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// text animations
// Wrap every letter in a span
var textWrapper = document.querySelector(".ml9 .letters");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml9 .letter",
    scale: [0, 1],
    duration: 2000,
    elasticity: 600,
    delay: (el, i) => 45 * (i + 1),
  })
  .add({
    targets: ".ml9",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

var textWrapperSubHeading = document.querySelector(".ml11 .letters");
textWrapperSubHeading.innerHTML = textWrapperSubHeading.textContent.replace(
  /([^\x00-\x80]|\w)/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml11 .line",
    scaleY: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
  })
  .add({
    targets: ".ml11 .line",
    translateX: [
      0,
      document.querySelector(".ml11 .letters").getBoundingClientRect().width +
        10,
    ],
    easing: "linear",
    duration: 600,
    delay: 500,
  })
  .add({
    targets: ".ml11 .letter",
    opacity: [0, 1],
    easing: "linear",
    duration: 600,
    offset: "-=700",
    delay: (el, i) => 34 * (i + 1),
  })
  .add({
    targets: ".ml11",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 2000,
  });
