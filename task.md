# Task

Goal: AEGIS, a 3D superhero wave game: `pc.html` (mouse/keyboard) and `mobile.html` (touch) share one `game.js`; English, voiced.

Done:
- Both shells load the same `game.js`; `index.html` routes, with `?pc=1` / `?mobile=1` override.
- Three.js r128 vendored as `three.min.js`: no network needed to play.
- Arabic build removed (still in commit 33ce48b, one checkout away).
- Dead assets removed: 57 `.mp3`, `audio/clips.js`, 3 `AEGIS-zai*.html`, 16 unused `.ogg`.
- `node check.mjs`: syntax, all clips exist, no orphan clips, pages load the vendored scripts.
- Rescue arrow now shows on both builds (it was invisible on both), dispatch panel on both, "Reset progress" in the powerups panel.
- README fixed.

Next:
- Play both pages on a real phone and a desktop browser; no browser test was possible in this session.
- PC has no graphics/difficulty controls and follows whatever the mobile build saved.
