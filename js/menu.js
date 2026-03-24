document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const fullscreenMenu = document.getElementById('fullscreen-menu');
  const menuLinks = document.querySelectorAll('.menu-list a');

  if(menuToggle && fullscreenMenu) {
    // アイコンクリックでメニュー開閉
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      fullscreenMenu.classList.toggle('open');
    });

    // リンククリック時にメニューを自動で閉じる
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        fullscreenMenu.classList.remove('open');
      });
    });
  }
});
