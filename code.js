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
  
    
  window.addEventListener("keydown", onCloseModal);
  // window.addEventListener("keydown", changeImage);
  
}


function onCloseModal(evt) {
  
    refs.lightbox.classList.remove("is-open");
    refs.lightbox__image.src = " ";
  refs.lightbox__image.alt = " ";
  
  document.body.removeAttribute('Style');
  window.removeEventListener('keydown', onCloseModal);
  // window.removeEventListener('keydown', changeImage);
  
}

function closeLightBox(evt) {
  if (evt.target === evt.currentTarget || evt.code === "Escape") {
    onCloseModal();
  }
}







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


