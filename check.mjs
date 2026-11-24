// Sanity check for this repo: node check.mjs
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';

const fails = [];
const ok = m => console.log('ok   ' + m);
const bad = m => { fails.push(m); console.log('FAIL ' + m); };

const src = readFileSync('game.js', 'utf8');
try { new Function(src); ok('game.js parses'); } catch (e) { bad('game.js: ' + e.message); }

const clipBlock = src.slice(src.indexOf('const CLIPS='), src.indexOf('const VP='));
const used = [...new Set([...clipBlock.matchAll(/"audio\/([^"]+\.ogg)"/g)].map(m => m[1]))];
if (!used.length) bad('no audio paths found in CLIPS');
const missing = used.filter(f => !existsSync('audio/' + f) || statSync('audio/' + f).size < 1000);
if (missing.length) bad('missing or empty clips: ' + missing.join(', '));
else ok(used.length + ' voice clips present');

const orphans = readdirSync('audio').filter(f => f.endsWith('.ogg') && !used.includes(f));
if (orphans.length) bad('unused audio: ' + orphans.join(', '));
else ok('no unused .ogg');

if (!existsSync('three.min.js') || statSync('three.min.js').size < 300000) bad('three.min.js missing or too small');
else ok('three.min.js vendored');

for (const p of ['pc.html', 'mobile.html']) {
  const h = readFileSync(p, 'utf8');
  const miss = ['src="three.min.js"', 'src="game.js"'].filter(s => !h.includes(s));
  if (miss.length) bad(p + ' missing ' + miss.join(', '));
  else if (h.includes('const CLIPS')) bad(p + ' still contains the inline game script');
  else ok(p + ' loads the shared scripts');
}

if (!src.includes('THREE')) bad('game.js does not use THREE');

for (const s of ['function rewind(', "e.code==='KeyX'", "press('bRewind'", "set('bRewind'"]) {
  if (!src.includes(s)) bad('game.js missing rewind wiring: ' + s);
}
for (const s of ['function moonY(', 'function spawnMeteor(', 'function meteorHit(', 'earthPlanet']) {
  if (!src.includes(s)) bad('game.js missing space wiring: ' + s);
}
if (!readFileSync('pc.html', 'utf8').includes('X rewind')) bad('pc.html does not mention X rewind');
if (!readFileSync('mobile.html', 'utf8').includes('id="bRewind"')) bad('mobile.html missing the rewind button');
if (!readFileSync('pc.html', 'utf8').includes('Moon')) bad('pc.html does not mention the Moon');
if (!readFileSync('mobile.html', 'utf8').includes('meteor')) bad('mobile.html does not mention the meteor');
if (fails.length) { console.log('\n' + fails.length + ' problem(s)'); process.exit(1); }
console.log('\nall checks passed');
