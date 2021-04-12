// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.


import images from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  baskdrop: document.querySelector(".lightbox__overlay"),
  lightbox: document.querySelector(".lightbox"),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  modal: document.querySelector(".lightbox__content"),
  lightbox__image: document.querySelector(".lightbox__image"),
};

const imagesContainer = document.querySelector(".gallery js-gallery");
const elementImages = ({ preview, original, description }) => {
    return `
    <li class="gallery__item">
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
</li>
`;
};

const imagesTemplateStrings = images.map(elementImages).join(" ");
refs.gallery.insertAdjacentHTML('afterbegin', imagesTemplateStrings);




refs.gallery.addEventListener('click', onOpenModal);
refs.baskdrop.addEventListener('click', closeLightBox);
refs.btn.addEventListener('click', onCloseModal);


function onOpenModal(evt) {
  evt.preventDefault();
  document.body.style.overflow = 'hidden';
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  
    refs.lightbox.classList.add("is-open");
    refs.lightbox__image.src = evt.target.getAttribute("data-source");
    refs.lightbox__image.alt = evt.target.getAttribute("alt");
  
    
  window.addEventListener("keydown", escapeClickKey);
  // window.addEventListener("keydown", onArrowPress);
  
}


function onCloseModal(evt) {
  document.body.removeAttribute('Style');
    refs.lightbox.classList.remove("is-open");
    refs.lightbox__image.src = " ";
    refs.lightbox__image.alt = " ";
  window.removeEventListener('keydown', escapeClickKey);
  // window.removeEventListener('keydown', onArrowPress);
  
}

function closeLightBox(evt) {
  if (evt.target === evt.currentTarget) {
    onCloseModal();
  }
}

function escapeClickKey(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}

// function onArrowPress(e) {
//   changeImage(e);
// }

// function changeImage(e) {
//   const ArrowRight = e.code === 'ArrowRight';
//   const ArrowLeft = e.code === 'ArrowLeft';
//   let LightBoxImage = refs.lightbox__image.src; 

//   images.forEach((item, index, arr) => {
//     const nextImg = arr[index + 1]; 
//     const prevImg = arr[index - 1]; 
//     const originalImg = item.original; 

//     if (ArrowRight && nextImg && refs.lightbox__image.src === originalImg) {
//       LightBoxImage = nextImg.original;
//     }

//     if (ArrowLeft && prevImg && refs.lightbox__image === originalImg) {
//       LightBoxImage = prevImg.original;
//     }
//   });

//   if (refs.lightbox__image !== LightBoxImage) {
//     refs.lightbox__image = LightBoxImage;
//   }
// }

// document.addEventListener('keydown', eve => {
//   const divCloseModal = document.querySelector('.lightbox__image');

//   // Кнопка Esc //
//   if (eve.code === 'Escape') {
//     isOpen()
//   }
//   if (divEl.className.includes('is-open')) {
//     const mapDefEl = defaultEl.map(value => value.original);
//     const indElNum = Number(mapDefEl.indexOf(divCloseModal.src));

//     // Кнопка влево, вверх //
//     const mapDelLight = Number(mapDefEl.length) - 1;
//     if (eve.code === 'ArrowLeft' || eve.code === 'ArrowUp') {
//       if (eve.target.className === imgEl.className) {
//         return;
//       }
//       const indLeftEl = indElNum - 1;
//       divCloseModal.src = mapDefEl[indLeftEl];
//       if (indElNum === 0) {
//         divCloseModal.src = mapDefEl[mapDelLight];
//       }
//     }
//     // Кнопка вправо, вниз //
//     if (
//       eve.code === 'ArrowRight' ||
//       eve.code === 'ArrowDown' ||
//       eve.code === 'Space'
//     ) {
//       if (eve.target.className === imgEl.className) {
//         return;
//       }
//       const indEl = indElNum + 1;
//       divCloseModal.src = mapDefEl[indEl];
//       if (indEl === mapDefEl.length) {
//         divCloseModal.src = mapDefEl[0];
//       }
//     }
//   }
// });


