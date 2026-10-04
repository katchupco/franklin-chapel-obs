# One Night of Revival — OBS Overlay Pack

This package is designed for a **1920 × 1080** OBS canvas and matches the navy, teal, silver, light-ray, and atmospheric style of the supplied event flyer.

## Included scenes

1. `01-flyer-display.html` — original flyer in a polished widescreen presentation
2. `02-starting-soon.html` — animated opening screen
3. `03-be-right-back.html` — animated intermission screen
4. `04-stream-ending.html` — animated closing screen
5. `05-service-live-overlay.html` — minimal transparent live overlay based on the main Franklin Chapel broadcast style
6. `06-guest-lower-third.html` — animated Dr. Jamal Harrison Bryant lower third
7. `07-host-lower-third.html` — animated Rev. John T. Morrison, Jr. lower third
8. `08-event-corner-bug.html` — standalone orbiting event-to-church logo bug
9. `09-countdown.html` — animated 15-minute countdown screen
10. `10-giving-slide.html` — full-screen giving presentation
11. `11-giving-overlay.html` — transparent giving lower overlay
12. `12-announcement-reel.html` — nine-slide cinematic announcement reel with timed voiceovers and background music
13. `index.html` — package launcher and preview page

## Add a scene to OBS

### Fast import method

1. Download `obs-scene-collection/One-Night-of-Revival-OBS.json`.
2. In OBS, choose **Scene Collection → Import**.
3. Select the downloaded JSON file and import **Franklin Chapel • One Night of Revival**.
4. In `03 • Live Worship`, add the church camera above the setup placeholder and below `REV • Live Overlay`, then hide or remove the placeholder.

### Manual method

1. In **Sources**, click **+** and choose **Browser**.
2. Choose **Create new**, name the source, and click **OK**.
3. Check **Local file** and browse to the desired `.html` file.
4. Set **Width** to `1920` and **Height** to `1080`.
5. For lower thirds, enable **Refresh browser when scene becomes active** so the entrance animation restarts each time.
6. Full-screen scenes should be placed at the bottom of the source list. Transparent overlays and lower thirds should be above the camera source.
7. For the announcement reel, enable **Control audio via OBS** so its narration and music appear together in the OBS Audio Mixer.

## Change the countdown length

The countdown defaults to 15 minutes. For a different permanent default, open `countdown.js` and change `DEFAULT_MINUTES = 15` to the number you want.

For advanced setup, the page also accepts a duration in its URL:

- `09-countdown.html?minutes=10` for 10 minutes
- `09-countdown.html?minutes=30` for 30 minutes

Enable **Refresh browser when scene becomes active** to restart the countdown when you switch to that scene.

## Recommended scene setup

- **PRE-SHOW COUNTDOWN:** `09-countdown.html`
- **STARTING SOON:** `02-starting-soon.html`
- **FLYER:** `01-flyer-display.html`
- **SERVICE LIVE:** camera source + `05-service-live-overlay.html`
- **GIVING FULL SCREEN:** `10-giving-slide.html`
- **GIVING OVER CAMERA:** camera source + `11-giving-overlay.html`
- **ANNOUNCEMENTS:** `12-announcement-reel.html`
- **GUEST SPEAKER:** camera source + `06-guest-lower-third.html`
- **HOST:** camera source + `07-host-lower-third.html`
- **BREAK:** `03-be-right-back.html`
- **END:** `04-stream-ending.html`

## Notes

- All animation is built into the browser sources; no video codec or looping media setup is required.
- Lower thirds animate in, remain visible, and animate out over 12 seconds.
- Giving graphics list the official Website, Cash App (`$FRANKLINCHAPELNC`), PayPal, and Givelify options.
- The announcement reel loops automatically with continuous music, one-second visual lead-ins, and a music duck beneath each voiceover.
- When previewing the hosted reel in a regular browser, click **START AUDIO** if the browser blocks automatic sound. OBS playback starts automatically.
- Add or reorder flyers in `announcement-reel-config.js`. Voiceovers live in `assets/announcements/voiceovers`, and the music bed lives in `assets/announcements/music`.
- Keep the `assets` folder beside the HTML files so the background and flyer load correctly.
- Open `index.html` in a browser to preview every item in the package.
