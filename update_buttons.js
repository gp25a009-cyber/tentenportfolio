const fs = require('fs');

const svgArrow = `<svg width="80" height="30" viewBox="0 0 80 30" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;">
  <path d="M70 4 L70 20 L6 20 M18 8 L6 20 L18 32" />
</svg>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Pattern for "ホームへ戻る"
    content = content.replace(/>ホームへ戻る<\/a>/g, `>${svgArrow}</a>`);
    
    // Pattern for "RETURN TO ALL WORKS"
    content = content.replace(/>RETURN TO ALL WORKS<\/a>/g, `>${svgArrow}</a>`);

    // Just in case there are nested tags or spaces, use a broader regex if needed, but direct text match is safest first.
    
    fs.writeFileSync(file, content, 'utf8');
});

console.log('All return buttons replaced to long ↲ SVG arrows.');
