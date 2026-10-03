# Duckannon — polished showcase

A local redesign of WilfredRuck/duck_cannon, retaining the rubber duck, launch-timing concept, bouncing flight, boosts, and spikes.

The showcase uses `index.html`, `css/main.css`, and `js/entry.js`. The other original JavaScript files are preserved but are no longer loaded. No build step or package installation is needed.

Run from this folder:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/. Press Space or click Launch duck. The gold zone gives the strongest launch. Golden orbs grant lift and 200 bonus points; spikes end the flight. Select Fly again or press Space after a flight to reset. Personal best stores total distance plus bonus in this browser. Sound starts muted and can be enabled with the sound button.

Changes include responsive forest-and-gold styling, custom canvas scenery with parallax hills, a drawn cannon, particle trails, single-use boosts, frame-time-based animation, an external HUD, a results overlay, and local personal-best storage. Flight physics were retuned to support the new presentation. Typography loads from Google Fonts with system fallbacks.

Original source: https://github.com/WilfredRuck/duck_cannon
