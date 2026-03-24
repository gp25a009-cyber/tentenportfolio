document.addEventListener('DOMContentLoaded', () => {
  const viewerItems = document.querySelectorAll('.main-viewer .viewer-item');
  const thumbItems = document.querySelectorAll('.thumbnail-list .thumb-item');

  if(viewerItems.length === 0 || thumbItems.length === 0) return;

  thumbItems.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      // 全てのサムネイルのactiveを外す
      thumbItems.forEach(t => t.classList.remove('active'));
      
      // クリックされたサムネイルをactiveにする
      thumb.classList.add('active');

      // ターゲットのインデックスを取得
      const targetIndex = thumb.getAttribute('data-target');

      // 全てのメインビューア要素を隠す
      viewerItems.forEach(viewer => {
        viewer.classList.remove('active');
        // 動画の場合は再生を止める
        if (viewer.tagName.toLowerCase() === 'video') {
          viewer.pause();
        }
      });

      // 対応するメインビューア要素を表示
      const targetViewer = document.querySelector(`.main-viewer .viewer-item[data-index="${targetIndex}"]`);
      if (targetViewer) {
        targetViewer.classList.add('active');
      }
    });
  });
});
