const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const ts = Date.now();

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/href="css\/works.css(\?v=\d+)?"/g, `href="css/works.css?v=${ts}"`);
  content = content.replace(/href="css\/work-template.css(\?v=\d+)?"/g, `href="css/work-template.css?v=${ts}"`);
  fs.writeFileSync(file, content, 'utf8');
});

console.log('Cache bust applied for works.css and work-template.css to all HTML files.');
