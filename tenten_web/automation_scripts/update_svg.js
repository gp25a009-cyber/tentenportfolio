const fs = require('fs');

const svgArrow = `<svg width="80" height="24" viewBox="0 0 80 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle;">
  <path d="M74 2 L74 12 L6 12 M14 4 L6 12 L14 20" />
</svg>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace content inside <a ... class="back-btn-main">...</a>
    content = content.replace(/(<a[^>]*class=["'][^"']*back-btn-main[^"']*["'][^>]*>)([\s\S]*?)(<\/a>)/gi, `$1${svgArrow}$3`);
    
    // Replace content inside <a ... class="btn-homehome" ...>...</a> ONLY if it refers to index.html (the return home link)
    content = content.replace(/(<a[^>]*href=["']index\.html["'][^>]*class=["'][^"']*btn-homehome[^"']*["'][^>]*>)([\s\S]*?)(<\/a>)/gi, `$1${svgArrow}$3`);

    fs.writeFileSync(file, content, 'utf8');
});

console.log('All return buttons successfully updated to the new precise SVG arrow.');
