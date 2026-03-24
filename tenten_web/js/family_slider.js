document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.getElementById('slider-mugi');
  if (!sliderContainer) return;

  const images = sliderContainer.querySelectorAll('.slider-img');
  const dots = sliderContainer.querySelectorAll('.dot');
  const prevBtn = sliderContainer.querySelector('.prev-btn');
  const nextBtn = sliderContainer.querySelector('.next-btn');
  let currentIndex = 0;

  function showImage(index) {
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    images[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
    });
  });

  // Automatically slide every 5 seconds
  setInterval(nextImage, 5000);
});
