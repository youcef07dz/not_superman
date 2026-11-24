# Task

Goal: AEGIS, a 3D superhero wave game: `pc.html` (mouse/keyboard) and `mobile.html` (touch) share one `game.js`; English, voiced.

Done:
- Both shells load the same `game.js`; `index.html` routes, with `?pc=1` / `?mobile=1` override.
- Three.js r128 vendored as `three.min.js`: no network needed to play.
- Arabic build removed (still in commit 33ce48b, one checkout away).
- Dead assets removed: 57 `.mp3`, `audio/clips.js`, 3 `AEGIS-zai*.html`, 16 unused `.ogg`.
- `node check.mjs`: syntax, all clips exist, no orphan clips, pages load the vendored scripts, every `createRadialGradient` has its 6 arguments.
- Rescue arrow now shows on both builds (it was invisible on both), dispatch panel on both, "Reset progress" in the powerups panel.
- README fixed.
- Rewind (X on desktop, top-right button on mobile): repairs buildings that collapsed in the last 20 s to 1/4 height and brings back citizens lost in that window; 45 s cooldown. `check.mjs` checks the wiring.
- Space: above ~350 m the town fades out onto the Earth planet (ground, buildings, lamps, park, trees share `townMats`); the moon is a real second ground you can fly to and walk on (`MOON` at x 1150, top 1250 m). HUD says "On the Moon". The moon has a crater texture, boulders, peaks and crater discs on the surface, plus three drifting satellites in the sky box.
- Meteor special mission from wave 4, every 4th wave: a big meteor falls toward the city. Shoot or punch it down; if it lands, it collapses buildings, kills nearby citizens and hurts you (rewind can undo it). HUD shows the countdown.
- Perf: the minimap and HP/EN bars draw every frame again (the throttled minimap stepped visibly); only the score/citizen text refreshes at ~7 Hz. The 250 sparks only upload to the GPU while alive; renderer asks for the high-performance GPU; the space fade snaps to 0 so the town stops lingering as transparent; removed unreachable enemy-build branches and dead `drawMapOld`.
- Graphics: soft vignette on both shells, a halo around the Moon, stars twinkle at night, minimap backdrop fills the whole map.
- PC start screen now has the same Music/Voice/Graphics/Mode panel as mobile, and the graphics level drives pixel ratio on both (the PC used to ignore it).
- LOD: the Moon is a textured sphere with boulders/peaks/craters only when the camera is within 720 m (MOON.r\*1.6); farther away it is one gray disc sprite plus the halo. That hides ~93 moon meshes most of the time.
- The space sun is one additive billboard sprite (yellow disc + glow) instead of two spheres.
- Culling pass every 0.35 s: roof clutter and antennas hidden past 240 m, building meshes past `fog.far` (matters at night, when fog closes in), cars past ~390 m, ambient citizens past 300 m. The citizen flee test uses squared distances now.
- Outskirts around the city, random per load and static (no updates, no collision): 84 cottages (stone plinth, plaster walls, gabled thatch/shingle roof), 200 oaks, 140 pines, 180 bushes, 12 road strips, a wavy river, 4 ground planes. About 13 draw calls. Houses look like the village pack in `siege-wing-offline` (same stone/plaster/timber/thatch palette); the models there are a 3.4 MB `.glb`, which `file://` cannot fetch, so the shapes are rebuilt from primitives. Houses and plants are kept off the roads, out of the river, out of the city and out of each other.

Next:
- Play both pages on a real phone and a desktop browser; no browser test was possible in this session (Edge headless needs elevation).
- Biggest remaining perf cost: about 480 building meshes plus the near roof props (roughly 600 draw calls). Next step is instancing the static roof props and merging the city into chunks; do it with a profiler open.
- Try ACES tone mapping with sRGB output, but only after a screenshot pass: it shifts every colour in the scene.
- Gameplay ideas not started: guardian front shield, aliens that carry citizens off, moon reward, integrity-linked score.

