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
- Rewind (X on desktop, top-right button on mobile): repairs buildings that collapsed in the last 20 s to 1/4 height and brings back citizens lost in that window; 45 s cooldown. `check.mjs` checks the wiring.
- Space: above ~350 m the town fades onto the Earth planet; the moon is a real second ground you can fly to and walk on (`MOON` at x 1150, top 1250 m). HUD says "On the Moon".
- Meteor special mission from wave 4, every 4th wave: a big meteor falls toward the city. Shoot or punch it down; if it lands, it collapses buildings, kills nearby citizens and hurts you (rewind can undo it). HUD shows the countdown.

Next:
- Play both pages on a real phone and a desktop browser; no browser test was possible in this session (Edge headless needs elevation).
- PC has no graphics/difficulty controls and follows whatever the mobile build saved.
