document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const loader = document.querySelector(".page-loader");
  const cursor = document.querySelector(".cursor");
  const progress = document.querySelector(".scroll-progress");
  const header = document.querySelector(".site-header");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");
  const navLinks = document.querySelectorAll(".main-nav a");
  const revealElements = document.querySelectorAll(".reveal");


  /* PAGE LOADER */

  window.addEventListener("load", () => {

    setTimeout(() => {
      loader.classList.add("hidden");
    }, 700);

  });


  /* THEME */

  const savedTheme = localStorage.getItem("portfolio-theme");

  if (savedTheme === "light") {
    body.classList.add("light");
  }

  function updateThemeIcon() {

    if (body.classList.contains("light")) {
      themeIcon.textContent = "◐";
    } else {
      themeIcon.textContent = "◌";
    }

  }

  updateThemeIcon();


  themeToggle.addEventListener("click", () => {

    body.classList.toggle("light");

    const theme = body.classList.contains("light")
      ? "light"
      : "dark";

    localStorage.setItem("portfolio-theme", theme);

    updateThemeIcon();

  });


  /* CUSTOM CURSOR */

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

  });


  function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.16;
    cursorY += (mouseY - cursorY) * 0.16;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  const interactiveElements = document.querySelectorAll(
    "a, button, .project"
  );

  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

      if (element.classList.contains("project")) {
        cursor.classList.add("active");
      }

    });

    element.addEventListener("mouseleave", () => {

      cursor.classList.remove("active");

    });

  });


  /* SCROLL PROGRESS */

  function updateScrollProgress() {

    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progress.style.width = `${percentage}%`;

  }


  /* HEADER */

  function updateHeader() {

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }


  /* REVEAL */

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.12
    }
  );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* ACTIVE NAVIGATION */

  const sections = document.querySelectorAll(
    "#work, #about, #contact"
  );

  const sectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          navLinks.forEach((link) => {
            link.classList.remove("active");
          });

          const activeLink = document.querySelector(
            `.main-nav a[data-section="${entry.target.id}"]`
          );

          if (activeLink) {
            activeLink.classList.add("active");
          }

        }

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );


  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* SMOOTH INTERNAL LINKS */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* HERO PARALLAX */

  const heroImage = document.querySelector(".hero-image");
  const heroTitle = document.querySelector(".hero-title");

  window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    if (scroll < window.innerHeight) {

      heroImage.style.transform =
        `scale(1.06) translateY(${scroll * 0.08}px)`;

      heroTitle.style.transform =
        `translateY(${scroll * 0.035}px)`;

    }

  });


  /* SCROLL EVENTS */

  window.addEventListener(
    "scroll",
    () => {

      updateScrollProgress();
      updateHeader();

    },
    { passive: true }
  );


  updateScrollProgress();
  updateHeader();

});
