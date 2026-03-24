const fs = require('fs');

const worksHTMLFiles = ['works.html', 'index.html'];

// For works.html and index.html cards: inject image before title.
worksHTMLFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Mapping of titles to images
  const map = {
    'とりまかえろ。': 'torimakaero_1.png',
    'Buster Juck': 'busterjack_1.png',
    'にゃんこ衰弱': 'nyankosuijaku_1.png',
    'LUMINA': 'lumina_1.png',
    '自作マウス': 'jisakumausu_1.jpg'
  };

  // Find all <h3 class="work-title">...</h3> and insert image before
  Object.keys(map).forEach(title => {
    const rx = new RegExp(`(<h3 class="work-title">${title}<\\/h3>)`, 'g');
    if (!content.includes(`<img class="work-card-img" src="images/${map[title]}"`)) { // avoid double injection
      content = content.replace(rx, `<img class="work-card-img" src="images/${map[title]}" alt="${title}">\n            $1`);
    }
  });

  fs.writeFileSync(file, content, 'utf8');
});

// For detail pages: remove .capsule-img
const detailFiles = ['work-torimakaero.html', 'work-buster-juck.html', 'work-nyanko-suijaku.html', 'work-lumina.html', 'work-mouse.html'];

detailFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<div class="capsule-img"[\s\S]*?<\/div>\s*/, '');
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Update Complete.');
