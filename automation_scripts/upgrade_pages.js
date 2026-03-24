const fs = require('fs');

// Append CSS to work-template.css
const cssFile = 'css/work-template.css';
let cssContent = fs.readFileSync(cssFile, 'utf8');

const additionalCSS = `
/* ==========================================
   Work Slider Styles (like Mugi)
   ========================================== */
.work-slider-container {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.8);
  background: #000;
  aspect-ratio: 16 / 9; 
}

.work-slider-images {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; 
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
}

.slider-img.active {
  opacity: 1;
  pointer-events: auto;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.2s;
}

.slider-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.prev-btn { left: 15px; }
.next-btn { right: 15px; }

.slider-dots {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.dot.active {
  background: var(--cyan-glitch);
  box-shadow: 0 0 10px var(--cyan-glitch);
  transform: scale(1.2);
}
`;

if (!cssContent.includes('.work-slider-container')) {
  fs.writeFileSync(cssFile, cssContent + '\n' + additionalCSS, 'utf8');
}

// Now rewrite the HTML files
const works = [
  { id: 'torimakaero', images: ['torimakaero_1.png', 'torimakaero_2.png'] },
  { id: 'buster-juck', images: ['busterjack_1.png', 'busterjuck_2.png'] },
  { id: 'nyanko-suijaku', images: ['nyankosuijaku_1.png'] },
  { id: 'lumina', images: ['lumina_1.png', 'lumina_2.png'] },
  { id: 'mouse', images: ['jisakumausu_1.jpg', 'jisakumausu_2.png'] }
];

works.forEach(w => {
  const file = 'work-' + w.id + '.html';
  let content = fs.readFileSync(file, 'utf8');
  
  // Script tag inject
  if (!content.includes('js/work_slider.js')) {
    content = content.replace('<script src="js/slider.js" defer></script>', '<script src="js/work_slider.js" defer></script>');
  }

  // Generate Slider HTML
  let imagesHtml = '';
  let dotsHtml = '';
  w.images.forEach((img, i) => {
    let active = i === 0 ? 'active' : '';
    imagesHtml += '      <img src="images/' + img + '" alt="Image ' + (i+1) + '" class="slider-img ' + active + '">\n';
    dotsHtml += '      <span class="dot ' + active + '"></span>\n';
  });

  const sliderHtml = [
    '  <div class="work-slider-container">',
    '    <button class="slider-btn prev-btn">‹</button>',
    '    <div class="work-slider-images">',
    imagesHtml,
    '    </div>',
    '    <button class="slider-btn next-btn">›</button>',
    '    <div class="slider-dots">',
    dotsHtml,
    '    </div>',
    '  </div>'
  ].join('\n');

  // Replace media column entirely
  // Find <div class="media-column"> up to <div class="info-column">
  content = content.replace(/<div class="media-column">([\s\S]*?)<div class="info-column">/g, 
    '<div class="media-column">\n' + sliderHtml + '\n</div>\n\n<!-- 右側カラム：作品情報 -->\n<div class="info-column ngo-frame" style="margin: 0;">\n<div class="ngo-frame-inner" style="height: 100%; display: flex; flex-direction: column;">\n'
  );

  // Terminate the double div of info-column
  content = content.replace(/<\/div>\s*<\/div>\s*<!-- 枠の外に目立つ戻るボタン -->/g, 
    '</div>\n</div>\n</div>\n\n<!-- 枠の外に目立つ戻るボタン -->'
  );

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Done upgrading HTML pages.');
