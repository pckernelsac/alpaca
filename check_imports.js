const fs = require('fs');
const path = require('path');
const glob = require('glob');
const files = glob.sync('src/**/*.{jsx,js}', { ignore: '**/node_modules/**' });
let issues = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    const m = line.match(/from\s+['"]([^'"]+)['"]/);
    if (!m) return;
    const imp = m[1];
    if (imp.startsWith('@/')) {
      const resolved = path.resolve('src', imp.slice(2));
      const candidates = [
        resolved, resolved + '.jsx', resolved + '.js',
        resolved + '/index.jsx', resolved + '/index.js'
      ];
      const exists = candidates.some(c => { try { return fs.existsSync(c); } catch(e) { return false; } });
      if (!exists) {
        issues.push(f + ':' + (i+1) + ' - BROKEN: ' + imp);
      }
    } else if (imp.startsWith('.')) {
      const resolved = path.resolve(path.dirname(path.resolve(f)), imp);
      const candidates = [
        resolved, resolved + '.jsx', resolved + '.js',
        resolved + '/index.jsx', resolved + '/index.js'
      ];
      const dirCheck = path.dirname(resolved);
      const exists = candidates.some(c => { try { return fs.existsSync(c); } catch(e) { return false; } });
      if (!exists && fs.existsSync(dirCheck)) {
        issues.push(f + ':' + (i+1) + ' - BROKEN: ' + imp);
      }
    }
  });
});
if (issues.length === 0) {
  console.log('NO BROKEN IMPORTS FOUND');
} else {
  console.log(issues.length + ' BROKEN IMPORTS:');
  issues.forEach(i => console.log('  ' + i));
}
