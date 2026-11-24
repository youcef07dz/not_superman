# Mistakes

- Arabic text swap broke a JS string: the map entry ate the closing quote in the
  "Carrying: safe zone ..." line, so the page failed to parse. Fix: run
  `node --check` on every inline script after bulk replacing text, and fix quotes.
- Picked Orpheus TTS before checking its languages; it has no Arabic model at all.
  Fix: check the model list on Hugging Face for the target language first.
- Two downloads wrote the same file at once (two curl jobs plus a ranged script),
  which corrupted it. Fix: one writer per file, download to `.part`, check sha256.
- Hugging Face Xet download stalled at 0 bytes for 25 min. Fix: plain HTTP/curl
  (`HF_HUB_DISABLE_XET=1`); link was ~0.23 MB/s.
- Chatterbox appends a quiet breath/noise tail after the speech (up to 3 s).
  Fix: trim at -35 dBFS on both ends before encoding.
- PowerShell 5.1 `Get-Content` reads UTF-8 as ANSI, so the Arabic lines looked
  like mojibake. Fix: use `-Encoding UTF8` or Python when checking those files.
- Chatterbox voice cloning: `prepare_conditionals` overwrites `model.conds`, so
  caching one conds dict per voice needs the dict filled inside the loop.
- Chatterbox sometimes talks past the line: it repeats the sentence or adds a
  made-up one. Fix: compare clip length to the old clip, retry with steadier
  sampling, and as a last resort cut at the first pause (`cut_repeat.py`).
- Meteor aim used `1` for the y component instead of `target.y - start.y`, so it
  flew up instead of falling. Fix: subtract the full start position from the
  target, then normalize.
- `createRadialGradient` called with 5 arguments (missing the final radius) threw
  at top level, aborting the rest of game.js. That also produced a fake "Cannot
  access 'LT' before initialization" from the music timer, because `LT` was never
  declared. Fix: pass all 6 args; `check.mjs` now checks the arity.
- Throttled the rotating minimap to 12 Hz as a "cheap" win; it stepped visibly
  and read as lag. Fix: draw it every frame. Keep throttling only text that does
  not animate.
- Placed outskirts scenery with `Math.hypot` checks that pushed houses inside the
  city: a scattered house at 45 degrees has |x|,|z| below the city half-size even
  though its radius is large. Fix: push out on the largest axis, not the radius.
- Scattered houses landed on the roads and inside each other: placement only
  checked the city square. Fix: `onRoad`/`onRiver` tests plus a placed list with
  a minimum gap, retried up to 30 times (about 1.3 tries per house).
