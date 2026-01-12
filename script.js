// Aseta nykyinen vuosi footerissa
document.getElementById('current-year').textContent = new Date().getFullYear();

// Galleria-popup logiikka
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryImages = document.querySelectorAll('.gallery-img');
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const imgCounter = document.getElementById('img-counter');

let currentImageIndex = 0;

// Avaa popup kun kuvaa klikataan
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentImageIndex = index;
    updatePopupImage();
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

// Päivitä popup-kuva
function updatePopupImage() {
  const imgSrc = galleryImages[currentImageIndex].src;
  popupImg.src = imgSrc;
  imgCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
}

// Sulje popup
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Näppäimistön kontrollit
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && popup.style.display === 'flex') {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  if (popup.style.display === 'flex') {
    if (e.key === 'ArrowLeft') {
      showPrevImage();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    }
  }
});

// Edellinen kuva
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showPrevImage();
});

function showPrevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  updatePopupImage();
}

// Seuraava kuva
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  showNextImage();
});

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  updatePopupImage();
}

// Sulje popup taustaa klikkaamalla
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// YKSITTÄISEN KUVAN AVAUS - TÄRKEÄ! Tämä puuttui
function openSingleImage(imageSrc) {
  popupImg.src = imageSrc;
  imgCounter.textContent = '1 / 1';
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  // Piilota nuolet kun on vain yksi kuva
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
}

// 16:9 Grid-kuvien klikkaus
const gridItems16_9 = document.querySelectorAll('.grid-item-16-9');
gridItems16_9.forEach((item) => {
  item.addEventListener('click', function () {
    const imgInside = this.querySelector('img');
    if (imgInside && imgInside.src) {
      // Avaa vain tämä yksi kuva
      openSingleImage(imgInside.src);
    }
  });
});

// Normaalin grid-kuvien klikkaus (1:1 grid)
const normalGridItems = document.querySelectorAll('.grid-item');
normalGridItems.forEach((item) => {
  item.addEventListener('click', function () {
    const imgInside = this.querySelector('img');
    if (imgInside && imgInside.src) {
      // Avaa vain tämä yksi kuva
      openSingleImage(imgInside.src);
    }
  });
});

// Image-container kuvien klikkaus (iso yksittäinen kuva)
const imageContainers = document.querySelectorAll(
  '.image-container:not(.gallery-container)'
);
imageContainers.forEach((container) => {
  container.addEventListener('click', function () {
    const imgInside = this.querySelector('img');
    if (imgInside && imgInside.src) {
      // Avaa vain tämä yksi kuva
      openSingleImage(imgInside.src);
    }
  });
});

// GIF-kontrollit
const prototypeGif = document.getElementById('prototypeGif');
const gifControls = document.getElementById('gifControls');

if (prototypeGif && gifControls) {
  gifControls.addEventListener('click', function () {
    if (prototypeGif.src.includes('.gif')) {
      // Vaihda staattiseen kuvaan
      const staticSrc = prototypeGif.src.replace('.gif', '.png');
      prototypeGif.src = staticSrc;
      gifControls.innerHTML = '<span>▶ Play</span>';
    } else {
      // Vaihda takaisin GIF:ään
      const gifSrc = prototypeGif.src.replace('.png', '.gif');
      prototypeGif.src = gifSrc;
      gifControls.innerHTML = '<span>⏸ Pause</span>';
    }
  });
}

// GIF-elementin klikkaus avaa popup-ikkunan
if (prototypeGif) {
  prototypeGif.addEventListener('click', function () {
    openSingleImage(this.src);
  });
}
// Frontend-grid kuvien klikkaus
const frontendImages = document.querySelectorAll('.frontend-img');
frontendImages.forEach((img) => {
  img.addEventListener('click', function (e) {
    e.stopPropagation(); // Estää parent elementin klikkauksen
    openSingleImage(this.src);
  });
});

// Frontend-image-container klikkaus (jos haluat että koko alue on klikattava)
const frontendContainers = document.querySelectorAll(
  '.frontend-image-container'
);
frontendContainers.forEach((container) => {
  container.addEventListener('click', function () {
    const imgInside = this.querySelector('img');
    if (imgInside && imgInside.src) {
      openSingleImage(imgInside.src);
    }
  });
});
