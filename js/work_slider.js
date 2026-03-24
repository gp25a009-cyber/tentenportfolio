document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.work-slider-container');
  
  sliders.forEach(slider => {
    const images = slider.querySelectorAll('.slider-img');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    let currentIndex = 0;
    
    // If only 1 image, hide controls
    if (images.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      const dotsContainer = slider.querySelector('.slider-dots');
      if (dotsContainer) dotsContainer.style.display = 'none';
      return;
    }

    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      images[index].classList.add('active');
      if(dots[index]) dots[index].classList.add('active');
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }

    function prevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }

    if (nextBtn) nextBtn.addEventListener('click', nextImage);
    if (prevBtn) prevBtn.addEventListener('click', prevImage);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
      });
    });

    setInterval(nextImage, 5000);
  });
});
