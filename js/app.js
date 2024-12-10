document.getElementById("show-content-btn").addEventListener("click", function () {
    const content = document.getElementById("dynamic-content");
    content.classList.remove("hidden");
});


document.getElementById("close-content-btn").addEventListener("click", function () {
    const content = document.getElementById("dynamic-content");
    content.classList.add("hidden");
});






const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const indicatorsContainer = document.querySelector('.carousel-indicators');

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

// Dinamik tarzda nuqtachalar yaratish
slides.forEach((_, index) => {
  const button = document.createElement('button');
  if (index === 0) button.classList.add('active');
  indicatorsContainer.appendChild(button);
});

// Nuqtalar va slaydlarni sinxronlash
const indicators = Array.from(indicatorsContainer.children);
const updateIndicators = () => {
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentIndex);
  });
};

// Slayd pozitsiyasini boshqarish
const setSlidePositions = () => {
  slides.forEach((slide, index) => {
    slide.style.left = `${slide.offsetWidth * index}px`;
  });
};

// Drag boshlanishi
const startDrag = (e) => {
  isDragging = true;
  startPos = getPositionX(e);
  animationID = requestAnimationFrame(animation);
  track.style.cursor = 'grabbing';
};

// Drag davomida
const dragging = (e) => {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  currentTranslate = prevTranslate + currentPosition - startPos;
};

// Drag tugashi
const endDrag = () => {
  isDragging = false;
  cancelAnimationFrame(animationID);
  track.style.cursor = 'grab';

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
};

// Harakatga mos pozitsiyani belgilash
const setPositionByIndex = () => {
  currentTranslate = -currentIndex * slides[0].offsetWidth;
  prevTranslate = currentTranslate;
  track.style.transform = `translateX(${currentTranslate}px)`;
  updateIndicators();
};

// X pozitsiyasini olish
const getPositionX = (e) => (e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);

// Animation
const animation = () => {
  track.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
};

// Eventlar
track.addEventListener('mousedown', startDrag);
track.addEventListener('mousemove', dragging);
track.addEventListener('mouseup', endDrag);
track.addEventListener('mouseleave', endDrag);

track.addEventListener('touchstart', startDrag);
track.addEventListener('touchmove', dragging);
track.addEventListener('touchend', endDrag);

// Boshlang'ich sozlash
setSlidePositions();
updateIndicators();
setPositionByIndex();
