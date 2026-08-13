import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const app = await readFile(new URL('../app.js', import.meta.url), 'utf8');
const serviceWorker = await readFile(new URL('../sw.js', import.meta.url), 'utf8');

assert.match(app, /const navItems=\[\['today'.*'meetings'.*'insights'.*'settings'/s);
assert.match(app, /function importEodToHuddle\(\)/);
assert.match(app, /workflowKey=`eod:/);
assert.match(app, /Moved to Today’s Work/);
assert.match(app, /event==='Completed'/);
assert.match(app, /aria-current=/);
assert.match(app, /routeFromHash\(\)/);
assert.match(app, /root==='dashboard'.*return'today'/s);
assert.match(app, /root==='tasks'.*todayContext='work'/s);
assert.match(app, /aria-live="polite" class="insights-exceptions/);
assert.match(app, /Import outstanding work/);
assert.match(serviceWorker, /talentisos-v3/);
assert.match(serviceWorker, /\.\/app\.js/);
assert.match(serviceWorker, /\.\/styles\.css/);

console.log('TalentisOS source integrity checks passed');
