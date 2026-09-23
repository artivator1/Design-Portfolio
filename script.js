const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.remove("dark");

    themeIcon.textContent = "◐";

} else {

    document.body.classList.add("dark");

    themeIcon.textContent = "☼";

    localStorage.setItem("theme", "dark");

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");


    if (isDark) {

        themeIcon.textContent = "☼";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeIcon.textContent = "◐";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});
