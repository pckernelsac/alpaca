const fs = require('fs');
const css = fs.readFileSync('src/styles/variables.css', 'utf8');
const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
const darkMatch = css.match(/\[data-theme="dark"\]\s*\{([^}]+)\}/);
if (!rootMatch) { console.log('FAIL: :root block not found'); process.exit(1); }
if (!darkMatch) { console.log('FAIL: [data-theme=dark] block not found'); process.exit(1); }
const rootVars = rootMatch[1].match(/--[\w-]+/g) || [];
const darkVars = darkMatch[1].match(/--[\w-]+/g) || [];
const rootSet = new Set(rootVars);
const darkSet = new Set(darkVars);
const missingInDark = rootVars.filter(v => !darkSet.has(v));
const missingInRoot = darkVars.filter(v => !rootSet.has(v));
console.log('Root vars: ' + rootVars.length);
console.log('Dark vars: ' + darkVars.length);
if (missingInDark.length === 0 && missingInRoot.length === 0) {
  console.log('PASS: Both themes define the same CSS custom properties');
} else {
  if (missingInDark.length > 0) console.log('Missing in dark: ' + missingInDark.join(', '));
  if (missingInRoot.length > 0) console.log('Missing in root: ' + missingInRoot.join(', '));
}
console.log('');
console.log('Font family check:');
const getVar = (css, block, name) => {
  const re = new RegExp(block + '[\\s\\S]*?--' + name + ':\\s*([^;]+)');
  const m = css.match(re);
  return m ? m[1].trim() : 'NOT_FOUND';
};
console.log('Light --font-display: ' + getVar(css, ':root', 'font-display'));
console.log('Dark   --font-display: ' + getVar(css, '\\[data-theme="dark"\\]', 'font-display'));
console.log('Light --font-body: ' + getVar(css, ':root', 'font-body'));
console.log('Dark   --font-body: ' + getVar(css, '\\[data-theme="dark"\\]', 'font-body'));
console.log('Light --font-label: ' + getVar(css, ':root', 'font-label'));
console.log('Dark   --font-label: ' + getVar(css, '\\[data-theme="dark"\\]', 'font-label'));
