/* =========================
   INTRO
========================= */

const intro = document.getElementById("intro");
const introEnter = document.getElementById("introEnter");
const introSkip = document.getElementById("introSkip");

const INTRO_KEY = "portfolio-intro-seen-v3";

function closeIntro() {
  if (!intro) return;

  intro.classList.add("hidden");
  sessionStorage.setItem(INTRO_KEY, "true");

  setTimeout(() => {
    intro.style.display = "none";
  }, 950);
}


if (sessionStorage.getItem(INTRO_KEY)) {
  intro.classList.add("hidden");

  setTimeout(() => {
    intro.style.display = "none";
  }, 50);
}


if (introEnter) {
  introEnter.addEventListener("click", closeIntro);
}


if (introSkip) {
  introSkip.addEventListener("click", closeIntro);
}


/* =========================
   THEME
========================= */

const themeToggle = document.getElementById("themeToggle");

const THEME_KEY = "portfolio-theme-v2";

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");

    if (themeToggle) {
      themeToggle.textContent = "◑";
    }
  } else {
    document.body.classList.remove("light");

    if (themeToggle) {
      themeToggle.textContent = "◐";
    }
  }
}


/*
  Dark is the default.

  The new storage key intentionally ignores
  the old theme preference so the website
  opens dark for existing visitors too.
*/

const savedTheme = localStorage.getItem(THEME_KEY);

applyTheme(savedTheme === "light" ? "light" : "dark");


if (themeToggle) {
  themeToggle.addEventListener("click", () => {

    const isLight = document.body.classList.contains("light");

    const nextTheme = isLight ? "dark" : "light";

    applyTheme(nextTheme);

    localStorage.setItem(THEME_KEY, nextTheme);
  });
}


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.getElementById("cursor");

if (cursor && window.matchMedia("(pointer: fine)").matches) {

  window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });


  const interactiveElements = document.querySelectorAll(
    "a, button, .project, .service-card"
  );


  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
    });

  });
}


/* =========================
   TYPEWRITER
========================= */

const typewriterText = document.getElementById("typewriterText");

const phrases = [
  "I design",
  "I create",
  "I'm Artivator"
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeWriter() {

  if (!typewriterText) return;

  const currentPhrase = phrases[phraseIndex];

  if (!deleting) {

    typewriterText.textContent =
      currentPhrase.slice(0, characterIndex + 1);

    characterIndex++;

    if (characterIndex === currentPhrase.length) {

      deleting = true;

      setTimeout(typeWriter, 1300);
      return;
    }

    setTimeout(typeWriter, 85);

  } else {

    typewriterText.textContent =
      currentPhrase.slice(0, characterIndex - 1);

    characterIndex--;

    if (characterIndex === 0) {

      deleting = false;

      phraseIndex++;

      if (phraseIndex >= phrases.length) {
        phraseIndex = 0;
      }

      setTimeout(typeWriter, 400);
      return;
    }

    setTimeout(typeWriter, 48);
  }
}


setTimeout(typeWriter, 900);


/* =========================
   CONTACT EMAIL INTERACTION
========================= */

const contactEmail = document.getElementById("contactEmail");

if (
  contactEmail &&
  window.matchMedia("(pointer: fine)").matches
) {

  contactEmail.addEventListener("mousemove", (event) => {

    const rect = contactEmail.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const moveX =
      ((x / rect.width) - 0.5) * 14;

    const moveY =
      ((y / rect.height) - 0.5) * 8;

    contactEmail.style.setProperty(
      "--mx",
      `${percentX}%`
    );

    contactEmail.style.setProperty(
      "--my",
      `${percentY}%`
    );

    contactEmail.style.transform =
      `translate(${moveX}px, ${moveY}px)`;
  });


  contactEmail.addEventListener("mouseleave", () => {

    contactEmail.style.transform =
      "translate(0, 0)";

    contactEmail.style.setProperty(
      "--mx",
      "50%"
    );

    contactEmail.style.setProperty(
      "--my",
      "50%"
    );
  });
}


/* =========================
   SERVICE CARD TILT
========================= */

const serviceCards =
  document.querySelectorAll(".service-card");


if (window.matchMedia("(pointer: fine)").matches) {

  serviceCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

      const rect = card.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      const rotateY =
        ((x / rect.width) - 0.5) * 4;

      const rotateX =
        ((y / rect.height) - 0.5) * -4;

      card.style.transform =
        `perspective(900px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-4px)`;
    });


    card.addEventListener("mouseleave", () => {

      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });

  });
}


/* =========================
   PROJECT HOVER
========================= */

const projects =
  document.querySelectorAll(".project");


projects.forEach((project) => {

  project.addEventListener("mouseenter", () => {
    project.classList.add("is-hovered");
  });

  project.addEventListener("mouseleave", () => {
    project.classList.remove("is-hovered");
  });

});


/* =========================
   HEADER SCROLL
========================= */

const header =
  document.querySelector(".site-header");


window.addEventListener(
  "scroll",
  () => {

    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  },
  { passive: true }
);


/* =========================
   SMOOTH NAVIGATION
========================= */

const navLinks =
  document.querySelectorAll(
    '.nav a[href^="#"], .hero-link[href^="#"], .logo[href^="#"]'
  );


navLinks.forEach((link) => {

  link.addEventListener("click", (event) => {

    const targetId =
      link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target =
      document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================
   REVEAL ON SCROLL
========================= */

const revealElements =
  document.querySelectorAll(
    ".section-heading, .project, .service-card, .about-copy, .contact-inner"
  );


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        observer.unobserve(entry.target);
      });

    },
    {
      threshold: 0.08
    }
  );


revealElements.forEach((element) => {

  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition =
    "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)";

  revealObserver.observe(element);
});


/* =========================
   HERO PARALLAX
========================= */

const heroImage =
  document.querySelector(".hero-background img");


if (
  heroImage &&
  window.matchMedia("(pointer: fine)").matches
) {

  window.addEventListener(
    "mousemove",
    (event) => {

      const x =
        (event.clientX / window.innerWidth - 0.5);

      const y =
        (event.clientY / window.innerHeight - 0.5);

      heroImage.style.transform =
        `scale(1.04)
         translate(${x * -10}px, ${y * -10}px)`;
    }
  );
}


/* =========================
   IMAGE LOADING
========================= */

document.querySelectorAll("img").forEach((image) => {

  image.addEventListener("load", () => {
    image.classList.add("loaded");
  });

});
