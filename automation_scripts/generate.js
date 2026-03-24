const fs = require('fs');

const template = fs.readFileSync('work-template.html', 'utf8');

const works = [
  {
    id: 'torimakaero',
    title: 'とりまかえろ。',
    date: '2025/5頃',
    creator: 'てんてん',
    genre: 'ゲーム、ホラー、迷路',
    desc: '<p>てんてんが初めて製作したゲームです。</p><p>Unityでの制作。クリーチャーに追われながら家を目指します。</p>',
    images: ['torimakaero_1.png', 'torimakaero_2.png'],
    capsule: 'torimakaero_1.png'
  },
  {
    id: 'buster_juck',
    title: 'Buster Juck',
    date: '2025/10頃',
    creator: 'てんてん',
    genre: 'ゲーム、２Dシューティング、ハロウィーン',
    desc: '<p>大学のハロウィン祭に展示するために制作。</p>',
    images: ['busterjack_1.png', 'busterjuck_2.png'],
    capsule: 'busterjack_1.png'
  },
  {
    id: 'nyanko_suijaku',
    title: 'にゃんこ衰弱',
    date: '2025',
    creator: 'L氏、てんてん',
    genre: 'ゲーム、神経衰弱、猫',
    desc: '<p>猫に邪魔をされる神経衰弱です。特に猫がかわいそうなことになるわけではありません。</p>',
    images: ['nyankosuijaku_1.png'],
    capsule: 'nyankosuijaku_1.png'
  },
  {
    id: 'lumina',
    title: 'LUMINA',
    date: '2026/1/21',
    creator: 'てんてん',
    genre: 'アプリ、ノート、AI',
    desc: '<p>授業の音声をアップロードしたり、録音することでノートを自動でまとめてくれるアプリです。</p>',
    images: ['lumina_1.png', 'lumina_2.png'],
    capsule: 'lumina_1.png'
  },
  {
    id: 'mouse',
    title: '自作マウス',
    date: '2026/3/1',
    creator: 'L氏、てんてん',
    genre: '電子工作、マウス',
    desc: '<p>ESP32を使用して制作しました。側はCadで設計、３Dプリンターで出力。</p>',
    images: ['jisakumausu_1.jpg', 'jisakumausu_2.png'],
    capsule: 'jisakumausu_1.jpg'
  }
];

works.forEach(w => {
  let content = template;
  
  // Replace title tag
  content = content.replace(/<title>作品詳細 - てんてんのポートフォリオ<\/title>/, `<title>${w.title} - てんてんのポートフォリオ</title>`);
  
  // Replace main viewer
  let mainViewerHtml = '';
  let thumbHtml = '';
  w.images.forEach((img, i) => {
    let activeClass = i === 0 ? 'active' : '';
    mainViewerHtml += `          <img src="images/${img}" class="viewer-item ${activeClass}" data-index="${i}" alt="Image ${i+1}" style="width:100%; height:100%; object-fit:contain;">\n`;
    thumbHtml += `          <div class="thumb-item ${activeClass}" data-target="${i}" style="background-image:url('images/${img}'); background-size:cover; background-position:center; border: 1px solid #555; color:transparent; font-size:0;">Img${i+1}</div>\n`;
  });
  
  content = content.replace(/<div class="main-viewer">[\s\S]*?<\/div>\s*<!-- サムネイル群 -->/, `<div class="main-viewer">\n${mainViewerHtml}        </div>\n\n        <!-- サムネイル群 -->`);
  content = content.replace(/<div class="thumbnail-list">[\s\S]*?<\/div>/, `<div class="thumbnail-list">\n${thumbHtml}        </div>`);
  
  // Replace capsule img
  content = content.replace(/<div class="capsule-img" style=".*?">[\s\S]*?<\/div>/, `<div class="capsule-img" style="display:flex; align-items:center; justify-content:center; padding:0; overflow:hidden;">\n          <img src="images/${w.capsule}" alt="capsule" style="width:100%; height:100%; object-fit:cover;">\n        </div>`);
  
  // Replace Title
  content = content.replace(/<h1 class="detail-title">.*?<\/h1>/, `<h1 class="detail-title">${w.title}</h1>`);
  
  // Replace Meta
  content = content.replace(/<td class="meta-label">Release:<\/td>\s*<td class="meta-value">2026\.03\.11<\/td>/, `<td class="meta-label">Release:</td>\n            <td class="meta-value">${w.date}</td>`);
  content = content.replace(/<td class="meta-label">Creator:<\/td>\s*<td class="meta-value">てんてん<\/td>/, `<td class="meta-label">Creator:</td>\n            <td class="meta-value">${w.creator}</td>`);
  content = content.replace(/<td class="meta-label">Genre:<\/td>\s*<td class="meta-value">Cyberpunk RPG<\/td>/, `<td class="meta-label">Genre:</td>\n            <td class="meta-value">${w.genre}</td>`);
  
  // Replace Description
  content = content.replace(/<div class="detail-text">[\s\S]*?<\/div>/, `<div class="detail-text">\n          ${w.desc}\n        </div>`);
  
  // Replace Data Work ID
  content = content.replace(/data-work-id="work_game_a"/g, `data-work-id="work_${w.id}"`);
  
  fs.writeFileSync(`work-${w.id.replace('_', '-')}.html`, content, 'utf8');
});

console.log("Pages generated successfully.");
