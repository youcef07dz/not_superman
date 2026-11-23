# Task

Goal: mobile.html touch controls, landscape HUD, settings, fire and space.

Done:
- Icon buttons in a quarter-circle arc; FLY is the center button. Cooldown badges.
- Messages in corners; rescue arrow fixed.
- HUD: minimap top-left, flying info under it, HP/EN top center, boss bar just below.
- Settings on the start/pause screen: Music and Voice sliders, Graphics high/medium/low/potato, Mode easy/medium/hard/nightmare. Saved to localStorage.
- Graphics set pixel ratio + fog draw distance. Mode sets enemy HP, damage taken, spawn count.
- Laser sets cars, trees and buildings on fire and damages them. Fire burns for a few seconds. Ice breath puts fires out.
- Flying above ~350m fades in space: dark sky, brighter stars, longer view, Earth, Moon and Sun. Same in pc.html.

Next:
- Test on a real phone in landscape.
- Tune difficulty and fire numbers after playtesting.
