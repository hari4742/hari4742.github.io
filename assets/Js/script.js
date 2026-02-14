// Load and render portfolio data from JSON
let portfolioData = {};

async function loadPortfolioData() {
  try {
    const response = await fetch("./assets/data/portfolio.json");
    portfolioData = await response.json();
    renderContent();
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }
}

window.addEventListener("load", (event) => {
  const loading = document.querySelector(".loading");
  loading.style.display = "none";
  document.querySelector("body").style.overflow = "visible";

  // Load data after page load
  loadPortfolioData();
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

// Portfolio Swiper - will be reinitialized after rendering content

let swiper = null;

function initSwiper() {
  const containers = document.querySelectorAll(".swiper-container");
  if (containers.length > 0 && typeof Swiper !== "undefined") {
    swiper = new Swiper(containers[0], {
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
  }
}

// Scroll sections active link
function attachScrollListener() {
  const sections = document.querySelectorAll("section[id]");
  function scrollActive() {
    const scrollY = window.scrollY;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute("id");
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        const link = document.querySelector(
          '.nav_menu a[href="#' + sectionId + '"]'
        );
        if (link) link.classList.add("active-link");
      } else {
        const link = document.querySelector(
          '.nav_menu a[href="#' + sectionId + '"]'
        );
        if (link) link.classList.remove("active-link");
      }
    });
  }
  window.addEventListener("scroll", scrollActive);
}
attachScrollListener();

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

// Submit to google forms

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyXAohg2Z0YKlTt0IWgZGLTJYw3NwP99C_82Jt7ZrvJEyrseBn2fgN_5eN9viakKzg1CA/exec";
const form = document.forms["submit-to-google-sheet"];
const formSubmit = document.querySelector(".form-submit");

formSubmit.addEventListener("click", () => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const subject = document.querySelector("#subject").value;
  const message = document.querySelector("#message").value;
  let sent_msg = document.querySelector("#sent_msg");
  formSubmit.innerHTML = 'Send Message <i class="custom-loader"></i>';
  if ((name === "") | (email === "") | (subject === "") | (message === "")) {
    sent_msg.classList.add("insert-text");
    sent_msg.innerText = "Input fields can't be empty...";
    sent_msg.style.color = "#d35400";
    setTimeout(() => {
      sent_msg.innerText = "";
      sent_msg.classList.remove("insert-text");
      formSubmit.innerHTML =
        'Send Message <i class="uil uil-message button_icon"></i>';
    }, 3000);
  } else {
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        sent_msg.classList.add("insert-text");
        sent_msg.style.color = "green";
        sent_msg.innerHTML = "Message sent successfully!";
        setTimeout(() => {
          formSubmit.innerHTML =
            'Send Message <i class="uil uil-message button_icon"></i>';
        }, 1000);
        setTimeout(() => {
          sent_msg.innerText = "";
          sent_msg.classList.remove("insert-text");
        }, 5000);
        form.reset();
        console.log("Success!", response);
      })
      .catch((error) => {
        sent_msg.classList.add("insert-text");
        sent_msg.innerText = "Error Occured! Try Again...";
        sent_msg.style.color = "#d35400";
        setTimeout(() => {
          sent_msg.innerText = "";
          sent_msg.classList.remove("insert-text");
          formSubmit.innerHTML =
            'Send Message <i class="uil uil-message button_icon"></i>';
        }, 3000);
        form.reset();
        console.error("Error!", error.message);
      });
  }
});
// Yeah! I know, the code for form validation is a shit.

/*==================== RENDER CONTENT FROM JSON ====================*/

function renderContent() {
  renderHome();
  renderAbout();
  renderSkills();
  renderQualifications();
  renderBlogs();
  renderProjects();
  renderContact();
  renderFooter();

  // Re-initialize event listeners after content is rendered
  reinitializeEventListeners();
}

function renderHome() {
  const homeData = portfolioData.home;
  const homeDataDiv = document.querySelector(".home_data");

  // Update title
  const titleEl = homeDataDiv.querySelector(".home_title .text-wrapper");
  if (titleEl) {
    titleEl.innerHTML = `<div class="letters">${homeData.title}</div>`;
  }

  // Update subtitle
  const subtitleEl = homeDataDiv.querySelector(".home_subtitle .text-wrapper");
  if (subtitleEl) {
    subtitleEl.innerHTML = `<span class="line line1"></span><span class="letters">${homeData.subtitle}</span>`;
  }

  // Update description
  const descEl = homeDataDiv.querySelector(".home_description");
  if (descEl) {
    descEl.textContent = homeData.description;
  }

  // Render social links
  const socialDiv = document.querySelector(".home_social");
  socialDiv.innerHTML = homeData.socials
    .map(
      (social) =>
        `<a href="${social.url}" class="home_social-icon">
      <i class="uil ${social.icon}"></i>
    </a>`
    )
    .join("");
}

function renderAbout() {
  const aboutData = portfolioData.about;
  const aboutContainer = document.querySelector(".about_container");

  // Update image
  const img = aboutContainer.querySelector(".about_img");
  if (img) {
    img.src = aboutData.image;
  }

  // Update description
  const descEl = aboutContainer.querySelector(".about_description");
  if (descEl) {
    descEl.innerHTML = aboutData.description;
  }

  // Update resume link
  const resumeBtn = aboutContainer.querySelector(".about_buttons a");
  if (resumeBtn) {
    resumeBtn.href = aboutData.resumeUrl;
  }
}

function renderSkills() {
  const skillsData = portfolioData.skills;
  const skillsContainer = document.querySelector(".skills_container");

  let leftColumn = "";
  let rightColumn = "";

  skillsData.forEach((skillGroup, index) => {
    const skillsHTML = `
      <div class="skills_content skills_close">
        <div class="skills_header">
          <i class="uil ${skillGroup.icon} skills_icon"></i>
          <div>
            <h1 class="skills_title">${skillGroup.title}</h1>
            <span class="skills_subtitle">${skillGroup.subtitle}</span>
          </div>
          <i class="uil uil-angle-down skills_arrow"></i>
        </div>
        <div class="skills_list grid">
          ${skillGroup.skills
            .map(
              (skill) => `
            <div class="skill_data">
              <div class="skills_titles">
                <h3 class="skills_name">${skill.name}</h3>
                <span class="skills_number">${skill.percentage}%</span>
              </div>
              <div class="skills_bar">
                <span class="skills_percentage" style="width: ${skill.percentage}%"></span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    if (index < 4) {
      leftColumn += skillsHTML;
    } else {
      rightColumn += skillsHTML;
    }
  });

  skillsContainer.innerHTML = `<div>${leftColumn}</div><div>${rightColumn}</div>`;

  // Re-attach event listeners for skill toggles
  const skillsContent = document.getElementsByClassName("skills_content");
  const skillsHeader = document.querySelectorAll(".skills_header");

  skillsHeader.forEach((el) => {
    el.addEventListener("click", toggleSkills);
  });

  function toggleSkills() {
    let itemClass = this.parentNode.className;
    for (let i = 0; i < skillsContent.length; i++) {
      skillsContent[i].className = "skills_content skills_close";
    }
    if (itemClass === "skills_content skills_close") {
      this.parentNode.className = "skills_content skills_open";
    }
  }
}

function renderQualifications() {
  const qualData = portfolioData.qualifications;
  const educationDiv = document.querySelector("#education");
  const workDiv = document.querySelector("#work");

  // Render education - alternating left/right pattern
  educationDiv.innerHTML = qualData.education
    .map((qual, index) => {
      const isEven = index % 2 === 0;
      const hasLine = index < qualData.education.length - 1;

      if (isEven) {
        // Even index: [empty][rounder+line][content] - RIGHT aligned
        return `
    <div class="qualification_data">
      <div></div>
      <div>
        <span class="qualification_rounder"></span>
        ${hasLine ? '<span class="qualification_line"></span>' : ""}
      </div>
      <div>
        <h3 class="qualification_title">${qual.title}</h3>
        <span class="qualification_subtitle">${qual.subtitle}</span>
        <div class="qualification_calender">
          <i class="uil uil-calender-alt"></i>
          ${qual.date}
        </div>
      </div>
    </div>
  `;
      } else {
        // Odd index: [content][rounder+line] - LEFT aligned
        return `
    <div class="qualification_data">
      <div>
        <h3 class="qualification_title">${qual.title}</h3>
        <span class="qualification_subtitle">${qual.subtitle}</span>
        <div class="qualification_calender">
          <i class="uil uil-calender-alt"></i>
          ${qual.date}
        </div>
      </div>
      <div>
        <span class="qualification_rounder"></span>
        ${hasLine ? '<span class="qualification_line"></span>' : ""}
      </div>
    </div>
  `;
      }
    })
    .join("");

  // Render work - alternating left/right pattern
  workDiv.innerHTML = qualData.work
    .map((qual, index) => {
      const isEven = index % 2 === 0;
      const hasLine = index < qualData.work.length - 1;

      if (isEven) {
        // Even index: [empty][rounder+line][content] - RIGHT aligned
        return `
    <div class="qualification_data">
      <div></div>
      <div>
        <span class="qualification_rounder"></span>
        ${hasLine ? '<span class="qualification_line"></span>' : ""}
      </div>
      <div>
        <h3 class="qualification_title">${qual.title}</h3>
        <span class="qualification_subtitle">${qual.subtitle}</span>
        <div class="qualification_calender">
          <i class="uil uil-calender-alt"></i>
          ${qual.date}
        </div>
      </div>
    </div>
  `;
      } else {
        // Odd index: [content][rounder+line] - LEFT aligned
        return `
    <div class="qualification_data">
      <div>
        <h3 class="qualification_title">${qual.title}</h3>
        <span class="qualification_subtitle">${qual.subtitle}</span>
        <div class="qualification_calender">
          <i class="uil uil-calender-alt"></i>
          ${qual.date}
        </div>
      </div>
      <div>
        <span class="qualification_rounder"></span>
        ${hasLine ? '<span class="qualification_line"></span>' : ""}
      </div>
    </div>
  `;
      }
    })
    .join("");
}

function renderBlogs() {
  const blogsData = portfolioData.blogs;
  const blogsContainer = document.querySelector("#blogs .services_container");

  blogsContainer.innerHTML = blogsData
    .map(
      (blog) => `
    <div class="blog_content">
      <div>
        <img src="${blog.image}" />
        <h3 class="services_title">${blog.title}</h3>
      </div>
      <span class="button button--flex button-small button--link">
        <a href="${blog.url}" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
        <i class="uil uil-arrow-right button_icon"></i>
      </span>
    </div>
  `
    )
    .join("");
}

function renderProjects() {
  const projectsData = portfolioData.projects;
  const portfolioWrapper = document.querySelector(".portfolio-wrapper");

  portfolioWrapper.innerHTML = projectsData
    .map(
      (project) => `
    <div class="portfolio_content grid">
      <div class="portfolio_img-container">
        <div class="portfolio_view-more services_button">
          Click to View <br />
          More
        </div>
        <img
          src="${project.image}"
          class="portfolio_img"
          alt="${project.title}"
        />
      </div>
      <div class="services_modal">
        <div class="services_modal-content">
          <i class="uil uil-times services_modal-close"></i>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              ${project.gallery
                .map(
                  (img) => `
                <div class="swiper-slide">
                  <img src="${img}" alt="" />
                </div>
              `
                )
                .join("")}
            </div>
            <div class="swiper-button-next">
              <i class="uil uil-angle-right-b swiper-portfolio-icon"></i>
            </div>
            <div class="swiper-button-prev">
              <i class="uil uil-angle-left-b swiper-portfolio-icon"></i>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="portfolio_data">
        <h3 class="portfolio_title">${project.title}</h3>
        <p class="portfolio_description">${project.description}</p>
        <div class="portfolio_btns">
          ${project.buttons
            .map(
              (btn) => `
            <a
              href="${btn.url}"
              ${btn.target ? `target="${btn.target}"` : ""}
              class="button button--flex button--small portfolio_button"
            >
              ${btn.text}
              <i class="uil ${btn.icon} button_icon"></i>
            </a>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function renderContact() {
  const contactData = portfolioData.contact;
  const contactContainer = document.querySelector(
    ".contact_container > div:first-child"
  );

  contactContainer.innerHTML = `
    <div class="contact_information">
      <i class="uil uil-phone contact_icon"></i>
      <div>
        <h3 class="contact_title">Call Me</h3>
        <span class="contact_subtitle">${contactData.phone}</span>
      </div>
    </div>
    <div class="contact_information">
      <i class="uil uil-envelope contact_icon"></i>
      <div>
        <h3 class="contact_title">Email</h3>
        <span class="contact_subtitle">${contactData.email}</span>
      </div>
    </div>
    <div class="contact_information">
      <i class="uil uil-map-marker contact_icon"></i>
      <div>
        <h3 class="contact_title">Location</h3>
        <span class="contact_subtitle">${contactData.location}</span>
      </div>
    </div>
  `;
}

function renderFooter() {
  const footerData = portfolioData.footer;
  const footerContainer = document.querySelector(".footer_container");

  if (footerContainer) {
    footerContainer.innerHTML = `
      <div>
        <h1 class="footer_title">${footerData.name}</h1>
        <span class="footer_subtitle">${footerData.role}</span>
      </div>

      <ul class="footer_links">
        <li><a href="#" class="footer_link">Portfolio</a></li>
        <li><a href="#contact" class="footer_link">Contact Me</a></li>
      </ul>
      <div class="footer_socials">
        ${footerData.socials
          .map(
            (social) => `
          <a href="${social.url}" class="footer_social">
            <i class="uil ${social.icon}"></i>
          </a>
        `
          )
          .join("")}
      </div>
    `;
  }
}

function reinitializeEventListeners() {
  // Re-initialize services modal (projects)
  const modalViews = document.querySelectorAll(".services_modal");
  const modalBtns = document.querySelectorAll(".portfolio_view-more");
  const modalCloses = document.querySelectorAll(".services_modal-close");

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

  // Re-initialize swiper for each modal
  initSwiper();
}

// Initialize text animations after data loads
function initializeTextAnimations() {
  if (typeof anime !== "undefined") {
    // Wrap every letter in a span for first animation
    var textWrapper = document.querySelector(".ml9 .letters");
    if (textWrapper && textWrapper.textContent) {
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
    }

    var textWrapperSubHeading = document.querySelector(".ml11 .letters");
    if (textWrapperSubHeading && textWrapperSubHeading.textContent) {
      textWrapperSubHeading.innerHTML =
        textWrapperSubHeading.textContent.replace(
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
            document.querySelector(".ml11 .letters").getBoundingClientRect()
              .width + 10,
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
          delay: (el, i) => 33 * (i + 1),
        })
        .add({
          targets: ".ml11",
          opacity: 0,
          duration: 1000,
          easing: "easeOutExpo",
          delay: 2000,
        });
    }
  }
}

// Update renderContent to include animation initialization
const originalRenderContent = renderContent;
renderContent = function () {
  originalRenderContent();
  initializeTextAnimations();
};
