let menuIcon = document.querySelector(".menu-icon");
let slider = document.querySelector(".slider");

menuIcon.onclick = function () {
  slider.classList.toggle("show");
};
// hadith function
let hadithBox = document.querySelector(".hadith-box");
let next = document.querySelector(".next");
let prave = document.querySelector(".prave");
let hadithIndex = 0;
hadithChange();
function hadithChange() {
  fetch("https://api.hadith.gading.dev/books/muslim?range=1-150")
    .then((response) => response.json())
    .then((data) => {
      let hadiths = data.data.hadiths;
      next.addEventListener("click", () => {
        hadithIndex == 140 ? (hadithIndex = 0) : hadithIndex++;
        hadithBox.innerText = hadiths[hadithIndex].arab;
      });
      prave.addEventListener("click", () => {
        hadithIndex == 0 ? (hadithIndex = 140) : hadithIndex--;
        hadithBox.innerText = hadiths[hadithIndex].arab;
      });
    });
}
// getsura function
let suraBox = document.querySelector(".sura-box");
getSura();
function getSura() {
  fetch("https://api.alquran.cloud/v1/meta")
    .then((response) => response.json())
    .then((data) => {
      let suras = data.data.surahs.references;
      let surasNumbers = 114;
      for (let i = 0; i < surasNumbers; i++) {
        suraBox.innerHTML += `
        <div class="sura">
          <p>${suras[i].name}</p>
          <p>${suras[i].englishName}</p>
        </div>
        `;
      }
      let suraTitle = document.querySelectorAll(".sura");
      let popup = document.querySelector(".sura-popup");
      let ayat = document.querySelector(".ayat");
      suraTitle.forEach((title, index) => {
        title.addEventListener("click", () => {
          fetch(`https://api.alquran.cloud/v1/surah/ ${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              ayat.innerHTML = "";
              let ayats = data.data.ayahs;
              ayats.forEach((aya) => {
                popup.classList.add("active");
                ayat.innerHTML += `
                <p>${aya.numberInSurah} - ${aya.text}</p>
                `;
              });
            });
        });
      });
      let closeBtn = document.querySelector(".close-btn");
      closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    });
}
