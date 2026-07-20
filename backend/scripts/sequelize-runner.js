#!/usr/bin/env node
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { execSync } = require('child_process');
const args = process.argv.slice(2).join(' ');
const cmd = `npx sequelize-cli ${args}`;
try {
  execSync(cmd, { stdio: 'inherit', cwd: require('path').resolve(__dirname, '..') });
} catch (e) {
  process.exit(e.status);
}
