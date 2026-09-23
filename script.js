document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  const intro = document.querySelector("#intro");
  const enterPortfolio = document.querySelector("#enterPortfolio");
  const skipIntro = document.querySelector("#skipIntro");

  const cursor = document.querySelector(".cursor");
  const progress = document.querySelector(".scroll-progress");
  const header = document.querySelector(".site-header");

  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-icon");

  const revealElements = document.querySelectorAll(".reveal");
  const navLinks = document.querySelectorAll(".main-nav a");

  const services = document.querySelectorAll(".service-card");


  /* INTRO */

  const introSeen =
    sessionStorage.getItem("portfolio-intro-seen");


  function closeIntro() {

    if (!intro) {
      return;
    }

    intro.classList.add("exit");

    body.classList.remove("intro-active");

    sessionStorage.setItem(
      "portfolio-intro-seen",
      "true"
    );

    setTimeout(() => {

      intro.style.display = "none";

    }, 1300);

  }


  if (introSeen === "true") {

    intro.style.display = "none";

    body.classList.remove("intro-active");

  } else {

    setTimeout(() => {

      closeIntro();

    }, 6500);

  }


  enterPortfolio?.addEventListener(
    "click",
    closeIntro
  );


  skipIntro?.addEventListener(
    "click",
    closeIntro
  );


  /* THEME */

  const savedTheme =
    localStorage.getItem("portfolio-theme");


  /*
    DARK MODE IS THE DEFAULT.

    Only switch to light mode if the user
    has previously selected light mode.
  */

  if (savedTheme === "light") {

    body.classList.add("light");

  } else {

    body.classList.remove("light");

    localStorage.setItem(
      "portfolio-theme",
      "dark"
    );

  }


  function updateThemeIcon() {

    if (body.classList.contains("light")) {

      themeIcon.textContent = "◐";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to dark mode"
      );

    } else {

      themeIcon.textContent = "◌";

      themeToggle.setAttribute(
        "aria-label",
        "Switch to light mode"
      );

    }

  }


  updateThemeIcon();


  themeToggle?.addEventListener(
    "click",
    () => {

      body.classList.toggle("light");

      const currentTheme =
        body.classList.contains("light")
          ? "light"
          : "dark";


      localStorage.setItem(
        "portfolio-theme",
        currentTheme
      );


      updateThemeIcon();

    }
  );


  /* CURSOR */

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let cursorX = mouseX;
  let cursorY = mouseY;


  window.addEventListener(
    "mousemove",
    event => {

      mouseX = event.clientX;
      mouseY = event.clientY;

    }
  );


  function animateCursor() {

    cursorX +=
      (mouseX - cursorX) * .16;

    cursorY +=
      (mouseY - cursorY) * .16;


    cursor.style.left =
      `${cursorX}px`;

    cursor.style.top =
      `${cursorY}px`;


    requestAnimationFrame(
      animateCursor
    );

  }


  animateCursor();


  document
    .querySelectorAll(
      "a, button, .project, .service-card"
    )
    .forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {

          if (
            element.classList.contains("project") ||
            element.classList.contains("service-card") ||
            element.classList.contains("intro-enter") ||
            element.classList.contains("intro-skip")
          ) {

            cursor.classList.add("active");

          }

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          cursor.classList.remove("active");

        }
      );

    });


  /* SERVICE CARD MOVEMENT */

  services.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        const rect =
          card.getBoundingClientRect();


        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;


        const rotateX =
          ((y / rect.height) - .5) * -5;

        const rotateY =
          ((x / rect.width) - .5) * 5;


        card.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-8px)
           scale(1.012)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


  /* SCROLL PROGRESS */

  function updateScrollProgress() {

    const scrollTop =
      window.scrollY;


    const height =
      document.documentElement.scrollHeight -
      window.innerHeight;


    const percentage =
      height > 0
        ? (scrollTop / height) * 100
        : 0;


    progress.style.width =
      `${percentage}%`;

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

  const revealObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: .12
      }

    );


  revealElements.forEach(element => {

    revealObserver.observe(element);

  });


  /* ACTIVE NAVIGATION */

  const sections =
    document.querySelectorAll(
      "#work, #about, #contact"
    );


  const sectionObserver =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            navLinks.forEach(link => {

              link.classList.remove(
                "active"
              );

            });


            const active =
              document.querySelector(
                `.main-nav a[data-section="${entry.target.id}"]`
              );


            active?.classList.add(
              "active"
            );

          }

        });

      },

      {
        rootMargin:
          "-35% 0px -55% 0px"
      }

    );


  sections.forEach(section => {

    sectionObserver.observe(section);

  });


  /* SMOOTH SCROLL */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* HERO PARALLAX */

  const heroImage =
    document.querySelector(
      ".hero-image"
    );


  const heroTitle =
    document.querySelector(
      ".hero-title"
    );


  window.addEventListener(
    "scroll",
    () => {

      const scroll =
        window.scrollY;


      if (
        scroll <
        window.innerHeight
      ) {

        heroImage.style.transform =
          `scale(1.07)
           translateY(${scroll * .08}px)`;


        heroTitle.style.transform =
          `translateY(${scroll * .035}px)`;

      }

    },
    {
      passive: true
    }
  );


  /* GLOBAL SCROLL */

  window.addEventListener(
    "scroll",
    () => {

      updateScrollProgress();

      updateHeader();

    },
    {
      passive: true
    }
  );


  updateScrollProgress();

  updateHeader();

});
