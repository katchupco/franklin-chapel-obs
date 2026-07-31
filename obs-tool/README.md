# Franklin Chapel OBS Lower-Third Controller

This is a cross-platform OBS Browser Dock tool. It manages six editable lower-third presets from one control panel.
The same dock also includes a Scripture Scene editor for the full-screen scripture.

## Install

1. Double-click `START-FRANKLIN-CONTROLS.command` and keep its Terminal window open.
2. In OBS, choose **Docks → Custom Browser Docks**.
3. Name the dock `Franklin Chapel Lower Thirds`.
4. Use `http://127.0.0.1:8765/obs-tool/control-panel.html` as the dock URL.
5. Add a **Browser Source** to the live scene.
6. Leave **Local file** unchecked.
7. Use `http://127.0.0.1:8765/obs-tool/on-air-overlay.html` as the source URL.
8. Set the Browser Source size to **1920 × 1080**.
9. Keep the Browser Source above the live camera source.
10. Leave **Shutdown source when not visible** unchecked.
11. Leave **Refresh browser when scene becomes active** unchecked.

## Use

- Edit any of the six presets in the dock.
- Switch a preset slider **ON** to begin its automatic lower-third loop.
- The lower third remains visible for 8 seconds, hides, and returns every 30 seconds.
- Switch the slider **OFF**, or click **Hide All**, to stop the loop immediately.
- Preset text saves automatically in OBS's browser storage.
- In **Scripture Scene**, enter the book and verse, paste the scripture text,
  and click **Update Scripture** while the Scripture scene is open.

For live Scripture editing, the `FC • Scripture` Browser Source must use
`http://127.0.0.1:8765/03-scripture.html` with **Local file** unchecked.

## Center Scripture dock

1. Add another Custom Browser Dock named `Franklin Chapel Scripture`.
2. Use `http://127.0.0.1:8765/obs-tool/scripture-control.html`.
3. In the Live Worship scene, add a Browser Source named
   `FC • Center Scripture Overlay`.
4. Leave **Local file** unchecked and use
   `http://127.0.0.1:8765/obs-tool/scripture-overlay.html`.
5. Set it to 1920 × 1080 and keep it above the live camera.

Both pages are served from the same private address on your computer so their
local broadcast channel can communicate reliably.
The controller also saves the most recent Show/Hide command, allowing the overlay
to recover after a scene switch or browser-source refresh.
