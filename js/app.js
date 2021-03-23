const sections = document.getElementsByTagName("section");
const ul = document.getElementById("navList");
const ul_array = document.getElementById("navList").childNodes;
const burgerMenu = document.querySelector(".menu");
const header = document.querySelector(".header");

const sectionsOffsetTopVAL = [];
let activeSection;
let activeSection_idx;

function renderNav() {
  for (let section of sections) {
    let li = section.attributes["data-nav"].nodeValue;
    ul.innerHTML += `<li><a href="" class="menu__link">${li}</a></li>`;
    sectionsOffsetTopVAL.push(section.offsetTop);
  }
  ul.childNodes[0].classList.add("active-nav");
}

renderNav();

window.addEventListener("scroll", (e) => {
  if (sectionsOffsetTopVAL && window.pageYOffset >= sectionsOffsetTopVAL[0]) {
    sectionsOffsetTopVAL.map((value, index) => {
      if (value <= window.pageYOffset + 150) {
        activeSection = sections[index];
        activeSection_idx = index;
      }
    });

    if (activeSection.classList.contains("your-active-class")) {
      return;
    } else {
      for (let section of sections) {
        section.classList.remove("your-active-class");
      }
      for (let li of ul_array) {
        li.classList.remove("active-nav");
      }
      activeSection.classList.add("your-active-class");
      ul_array[activeSection_idx].classList.add("active-nav");
    }
  }
});

burgerMenu.addEventListener("click", (e) => {
  header.classList.toggle("slide-out");
});

ul.addEventListener("click", (e) => {
  e.preventDefault();
  console.dir(e.target.nodeName);
  if (e.target.nodeName == "A") {
    for (let section of sections) {
      if (e.target.outerText == section.attributes["data-nav"].nodeValue) {
        window.scrollTo({
          top: section.offsetTop,
          left: section.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  }
});
