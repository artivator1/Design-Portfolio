document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;

  const header =
    document.querySelector(".project-header");

  const themeToggle =
    document.querySelector(".project-theme");

  const themeIcon =
    document.querySelector(".project-theme-icon");

  const cursor =
    document.querySelector(".project-cursor");

  const revealElements =
    document.querySelectorAll(".reveal-project");

  const heroImage =
    document.querySelector(".project-hero-image");

  const parallaxElements =
    document.querySelectorAll("[data-parallax]");

  const hoverTargets =
    document.querySelectorAll(
      ".project-back, .project-theme, .next-project-link, .project-hero-image, .large-visual-frame"
    );


  /* =========================================================
     THEME
  ========================================================= */

  const savedTheme =
    localStorage.getItem("portfolio-theme");


  if (savedTheme === "light") {

    body.classList.add("light");

  } else {

    body.classList.remove("light");

  }


  function updateThemeIcon() {

    if (!themeIcon) return;


    if (body.classList.contains("light")) {

      themeIcon.textContent = "◐";

      themeToggle?.setAttribute(
        "aria-label",
        "Switch to dark mode"
      );

    } else {

      themeIcon.textContent = "◌";

      themeToggle?.setAttribute(
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


      const theme =
        body.classList.contains("light")
          ? "light"
          : "dark";


      localStorage.setItem(
        "portfolio-theme",
        theme
      );


      updateThemeIcon();

    }
  );



  /* =========================================================
     HEADER
  ========================================================= */

  function updateHeader() {

    if (!header) return;


    if (window.scrollY > 40) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );



  /* =========================================================
     CURSOR
  ========================================================= */

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;


  if (finePointer && cursor) {

    body.classList.add("cursor-ready");


    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    document.addEventListener(
      "mousemove",
      (event) => {

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


    hoverTargets.forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            cursor.classList.add(
              "active"
            );

          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            cursor.classList.remove(
              "active"
            );

          }
        );

      }
    );

  }



  /* =========================================================
     REVEAL
  ========================================================= */

  if (
    "IntersectionObserver"
    in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: .12,
          rootMargin: "0px 0px -60px 0px"
        }
      );


    revealElements.forEach(
      (element) => {

        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      (element) => {

        element.classList.add(
          "visible"
        );

      }
    );

  }



  /* =========================================================
     HERO IMAGE REVEAL
  ========================================================= */

  if (
    heroImage &&
    "IntersectionObserver" in window
  ) {

    const heroObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                heroImage.classList.add(
                  "visible"
                );

                heroObserver.unobserve(
                  heroImage
                );

              }

            }
          );

        },
        {
          threshold: .1
        }
      );


    heroObserver.observe(
      heroImage
    );

  } else if (heroImage) {

    heroImage.classList.add(
      "visible"
    );

  }



  /* =========================================================
     PARALLAX
  ========================================================= */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    !reducedMotion &&
    parallaxElements.length
  ) {

    let ticking = false;


    function updateParallax() {

      const viewportHeight =
        window.innerHeight;


      parallaxElements.forEach(
        (element) => {

          const rect =
            element.getBoundingClientRect();


          const speed =
            parseFloat(
              element.dataset.parallax
            ) || .05;


          const center =
            rect.top +
            rect.height / 2;


          const distance =
            center -
            viewportHeight / 2;


          const movement =
            distance * speed * -1;


          element.style.transform =
            `translate3d(0, ${movement}px, 0)`;

        }
      );


      ticking = false;

    }


    function requestParallax() {

      if (!ticking) {

        requestAnimationFrame(
          updateParallax
        );

        ticking = true;

      }

    }


    window.addEventListener(
      "scroll",
      requestParallax,
      { passive: true }
    );


    window.addEventListener(
      "resize",
      requestParallax
    );


    requestParallax();

  }



  /* =========================================================
     HERO IMAGE MOUSE MOVEMENT
  ========================================================= */

  const heroVisual =
    document.querySelector(
      ".project-hero-image"
    );


  if (
    heroVisual &&
    finePointer &&
    !reducedMotion
  ) {

    heroVisual.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          heroVisual.getBoundingClientRect();


        const x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width -
          .5;


        const y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height -
          .5;


        const content =
          heroVisual.querySelector(
            ".hero-image-content"
          );


        if (content) {

          content.style.transform =
            `translate3d(${x * 10}px, ${y * 10}px, 0)`;

        }

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        const content =
          heroVisual.querySelector(
            ".hero-image-content"
          );


        if (content) {

          content.style.transform =
            "translate3d(0,0,0)";

        }

      }
    );

  }



  /* =========================================================
     SMOOTH INTERNAL LINKS
  ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            const targetId =
              link.getAttribute(
                "href"
              );


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


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
              behavior:
                reducedMotion
                  ? "auto"
                  : "smooth"
            });

          }
        );

      }
    );



  /* =========================================================
     MAGNETIC BACK BUTTON
  ========================================================= */

  const backButton =
    document.querySelector(
      ".project-back"
    );


  if (
    backButton &&
    finePointer &&
    !reducedMotion
  ) {

    backButton.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          backButton.getBoundingClientRect();


        const x =
          event.clientX -
          rect.left -
          rect.width / 2;


        const y =
          event.clientY -
          rect.top -
          rect.height / 2;


        backButton.style.transform =
          `translate(${x * .12}px, ${y * .12}px)`;

      }
    );


    backButton.addEventListener(
      "mouseleave",
      () => {

        backButton.style.transform =
          "";

      }
    );

  }



  /* =========================================================
     PAGE LOAD
  ========================================================= */

  window.setTimeout(
    () => {

      document.body.classList.add(
        "project-loaded"
      );

    },
    100
  );

});
