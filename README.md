# Franklin Chapel Cinematic Noir Package

This package uses the selected Cinematic Noir broadcast identity: full-bleed Franklin Chapel worship photography, deep black overlays, editorial typography, restrained purple accents, and thin white framing.

Every full-screen scene uses different current Franklin Chapel website media selected for its purpose:

- Welcome: church fellowship video
- Starting Soon: seven photos randomly selected from a 19-image 2026 gallery each time the scene loads
- Scripture: the Word being shared in the sanctuary
- Announcements: church family video with three automatically updated events
- Offering: a current ministry and recognition moment
- Be Right Back: pastor video
- Service Ending: official First Family portrait with a custom purple gradient

The Live Worship overlay includes the supplied Franklin Chapel 150 Years logo
in the lower-right corner with animated rotating halo rings.

The five-minute countdown starts at `05:00` whenever its browser source loads,
uses the randomized 2026 photo rotation, displays a randomly selected Bible
verse beneath the timer, and holds at `WORSHIP BEGINS NOW`.

The Announcements scene reads the next three events from Franklin Chapel’s public
event feed when it opens and refreshes every 15 minutes. If the internet or website
is unavailable, three built-in event cards remain visible.

The Offering scene displays Website, Cash App, PayPal, and Givelify with local,
scannable QR codes containing the official giving links listed on the church website.

## Add to Streamlabs

1. Add a **Browser Source**.
2. Enable **Local file** and choose the numbered scene file you want.
3. Set the source to 1920 × 1080.
4. Add one Browser Source to each matching Streamlabs scene.

## Scenes

- `00-welcome.html`
- `01-starting-soon.html`
- `11-five-minute-countdown.html`
- `02-live-worship.html`
- `03-scripture.html`
- `04-announcements.html`
- `05-offering.html`
- `06-be-right-back.html`
- `07-service-ending.html`
- `08-pastor-lower-third.html`
- `09-sermon-lower-third.html`
- `10-scripture-lower-third.html`

For the **Live Worship** scene, place this browser source above the camera source. Its central area is transparent.

The three lower-third files are transparent and animated. Add them above the live camera source, then show or hide them as needed during worship.

The lower thirds use the supplied white Franklin Chapel church mark in `assets/franklin-lower-third-mark.png`.

## OBS six-preset controller

The `obs-tool` folder contains an OBS Custom Browser Dock that manages six lower-third presets from one panel. See `obs-tool/README.md` for setup.

To change the speaker, sermon title, scripture text, or reference, open the matching numbered HTML file in a text editor and replace the placeholder text in its `src=` line.
