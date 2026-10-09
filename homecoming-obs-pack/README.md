# Franklin Chapel Homecoming OBS Package

This package is designed for a 1920 × 1080 OBS canvas and matches the supplied Homecoming flyer: deep purple fabric, gold and orange light, black-and-white portrait styling, church architecture, and the 150 Years / Legacy In Motion identity.

## Fast OBS import

1. Download `obs-scene-collection/Franklin-Chapel-Homecoming-OBS.json`.
2. In OBS, choose **Scene Collection → Import**.
3. Select the JSON and import **Franklin Chapel • Homecoming 150 Years**.
4. Open `03 • Live Worship`.
5. Add the church camera above `HC • CAMERA SETUP - REPLACE ME` and below `HC • Live Worship Overlay`.
6. Hide or delete the camera placeholder, then confirm the church microphones.

## Included scenes

- `01-event-flyer.html` - flyer presentation
- `02-starting-soon.html` - Homecoming starting screen
- `03-countdown.html` - 15-minute countdown
- `04-live-worship.html` - transparent live overlay
- `05-guest-lower-third.html` - Dr. Otis T. McMillian lower third
- `06-host-lower-third.html` - Rev. John T. Morrison, Jr. lower third
- `07-scripture.html` - editable Homecoming scripture
- `08-giving-slide.html` - full-screen giving
- `09-giving-overlay.html` - giving over camera
- `10-be-right-back.html` - break screen
- `11-service-ending.html` - closing screen
- `13-transition.html` - branded transition bumper

## Countdown options

The countdown defaults to 15 minutes. Add `?minutes=10` or another number to the Browser Source URL to change it. Enable **Refresh browser when scene becomes active** to restart it.

## Scripture options

The hosted Scripture Browser Source accepts text and reference settings in its URL:

`07-scripture.html?text=Your%20verse%20text&ref=Reference`

## Notes

- All scenes use hosted Browser Sources and update automatically.
- The lower thirds animate in, remain visible, and animate out over 12 seconds.
- Transparent scenes belong above the church camera.
- The imported scene collection does not change the Main or Revival collections.
