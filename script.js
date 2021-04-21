import gallery from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightBox: document.querySelector(".js-lightbox"),
  lightBoxImg: document.querySelector(".lightbox__image"),
  lightBoxBtn: document.querySelector('[data-action="close-lightbox"]'),
};

let currentIndex = 0;

function createImgMarkup(images) {
  return images.map((img) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${img.original}"
  >
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
      alt="${img.description}"
    />
  </a>
</li>`;
  });
}

refs.gallery.insertAdjacentHTML("beforeend", createImgMarkup(gallery).join(""));
refs.gallery.addEventListener("click", onImgClick);

function onImgClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  refs.lightBox.classList.add("is-open");
  refs.lightBoxImg.src = event.target.dataset.source;
  createImgMarkup(gallery).forEach((el, index) => {
    if (el.includes(event.target.src)) {
      currentIndex = index;
      document.addEventListener("keydown", imgMove);
    }
  });
}
function imgMove(event) {
  if (event.key == "ArrowLeft") {
    if (currentIndex > 0) {
      refs.lightBoxImg.src = gallery[currentIndex - 1].original;
      currentIndex -= 1;
      console.log(currentIndex);
    } else {
      currentIndex = gallery.length;
    }
  } else if (event.key == "ArrowRight") {
    if (currentIndex < gallery.length - 1) {
      refs.lightBoxImg.src = gallery[currentIndex + 1].original;
      currentIndex += 1;
      console.log(currentIndex);
    } else {
      currentIndex = -1;
    }
  }
}
refs.lightBox.addEventListener("click", (event) => {
  if (event.target.nodeName == "IMG") {
    return;
  }
  refs.lightBox.classList.remove("is-open");
  refs.lightBoxImg.src = "";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    refs.lightBox.classList.remove("is-open");
    refs.lightBoxImg.src = "";
  }
});
