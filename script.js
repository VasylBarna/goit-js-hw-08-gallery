import gallery from "./gallery-items.js";

const galleryBox = document.querySelector(".js-gallery");
const lightBox = document.querySelector(".js-lightbox");
const lightBoxImg = document.querySelector(".lightbox__image");
const lightBoxBtn = document.querySelector('[data-action="close-lightbox"]');

function createImgMarkup(gallery) {
  return gallery.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  });
}

galleryBox.insertAdjacentHTML("beforeend", createImgMarkup(gallery).join(""));
galleryBox.addEventListener("click", onImgClick);

function onImgClick(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  lightBox.classList.add("is-open");
  getImageAttribute(event.target.dataset.source, event.target.alt);
  window.addEventListener("keydown", onArrowKeyPress);
  window.addEventListener("keydown", onEscKeyPress);
}

function getImageAttribute(src, alt) {
  lightBoxImg.src = src;
  lightBoxImg.alt = alt;
}

function onArrowKeyPress(event) {
  let currentIndex = gallery.findIndex((g) => g.original === lightBoxImg.src);

  if (currentIndex < 0) {
    return;
  }

  if (event.code === "ArrowLeft") {
    currentIndex -= 1;
    if (currentIndex === -1) {
      currentIndex = gallery.length - 1;
    }
    console.log(currentIndex);
  } else if (event.code === "ArrowRight") {
    currentIndex += 1;
    console.log(currentIndex);
    if (currentIndex === gallery.length) {
      currentIndex = 0;
    }
  }

  getImageAttribute(
    gallery[currentIndex].original,
    gallery[currentIndex].description
  );
}

const closeBtn = document.querySelector('[data-action="close-lightbox"]');
closeBtn.addEventListener("click", closeModal);
lightBoxBtn.addEventListener("click", closeModal);

function closeModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", onArrowKeyPress);
  lightBox.classList.remove("is-open");
  getImageAttribute("", "");
}
function onEscKeyPress(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}
