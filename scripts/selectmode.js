// Dark Light theme button
let modeBtn = document.getElementById("mode-select");
let modeImg = document.getElementById("mode-img");
let logoTitle = document.getElementById("title-text");
let rootSelect = document.querySelector(":root");
let imgToggle = true;
modeBtn.addEventListener("click", function () {
  imgToggle = !imgToggle;
  if (imgToggle) {
    modeImg.src = "./assets/images/icon-sun.svg";
    modeBtn.style.backgroundColor = "var(--neutral-600)";
    logoTitle.style.fill = "var(--neutral-0)";
    rootSelect.style.setProperty("--backgroundcolor", "hsl(225, 23%, 24%)");
    rootSelect.style.setProperty("--text-color", "hsl(200, 60%, 99%)");
  } else {
    modeImg.src = "./assets/images/icon-moon.svg";
    modeBtn.style.backgroundColor = "var(--neutral-100)";
    logoTitle.style.fill = "var(--neutral-900)";
    rootSelect.style.setProperty("--backgroundcolor", "hsl(200, 60%, 99%)");
    rootSelect.style.setProperty("--text-color", "hsl(225, 23%, 24%)");
  }
  document.querySelector("body").classList.toggle("dark");
  document.querySelector("body").classList.toggle("light");
});
