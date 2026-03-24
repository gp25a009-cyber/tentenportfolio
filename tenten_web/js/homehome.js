document.addEventListener('DOMContentLoaded', () => {
  const wrappers = document.querySelectorAll('.homehome-wrapper');
  
  wrappers.forEach(wrapper => {
    const homehomeBtn = wrapper.querySelector('.btn-homehome');
    const homehomeCountDisplay = wrapper.querySelector('.count-text');
    
    if(!homehomeBtn) return;

    // ページごとの固有IDを取得（作品詳細ページなどでも独立してカウントできるように）
    const workId = homehomeBtn.getAttribute('data-work-id') || 'global';
    const storageKey = `homehome_count_${workId}`;

    // 初期値の読み込み
    let count = parseInt(localStorage.getItem(storageKey)) || 0;
    
    const updateDisplay = () => {
      if(homehomeCountDisplay) {
        homehomeCountDisplay.textContent = `❤︎ ${count}`;
      }
    };

    updateDisplay();

    homehomeBtn.addEventListener('click', () => {
      // カウントアップして保存
      count++;
      localStorage.setItem(storageKey, count);
      updateDisplay();

      // クリック時の病みかわいいサイバーネオンリアクション
      homehomeBtn.style.transform = 'scale(0.9)';
      homehomeBtn.style.boxShadow = '0 0 30px rgba(0, 255, 255, 1)'; // シアンに強発光
      
      // ちょっとブルッと震えさせる
      setTimeout(() => {
        homehomeBtn.style.transform = 'scale(1.1)';
        homehomeBtn.style.boxShadow = '0 0 20px rgba(255, 0, 127, 0.8)';
      }, 100);
      setTimeout(() => {
        homehomeBtn.style.transform = 'scale(1)';
        // css/button.cssの方のデフォルト影に戻すためリセット
        homehomeBtn.style.boxShadow = ''; 
      }, 250);
    });
  });
});
