const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.textContent = "☼";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    if (isDark) {
        themeIcon.textContent = "☼";
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.textContent = "◐";
        localStorage.setItem("theme", "light");
    }

});
