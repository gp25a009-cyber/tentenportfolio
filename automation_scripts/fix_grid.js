const fs = require('fs');

let content = fs.readFileSync('works.html', 'utf8');

if (!content.includes('<div class="works-section">')) {
    content = content.replace(/<!-- ギャラリーグリッド -->\r?\n(\s+<!-- 作品1 -->)/, '<!-- ギャラリーグリッド -->\n    <div class="works-section">\n$1');
    content = content.replace(/(\s*)(<div style="margin-top: 60px;">)/, '$1</div>$1$2');
    fs.writeFileSync('works.html', content, 'utf8');
    console.log('works.html fixed');
} else {
    console.log('Already has works-section');
}
