# Sanctuary announcements — October 23, 2026

The existing `04c-announcement-reel.html` link now plays narrated 1920 × 1080 MP4 segments in a continuous loop. Use a 1920 × 1080 OBS Browser Source and enable **Control audio via OBS**. The normal view has no counters or operator controls on the sanctuary screens. Add `?controls=1` for manual pause, sound, next and full-screen controls; add `?mute=1` for a silent preview. Embedded use is muted by default, matching the previous reel's behavior.

The October 11 Homecoming, October 16 Feed the Band, and October 18 Associate Ministers announcements are removed from the active reel. October awareness and clergy appreciation, October 24 Awareness & Action Day, October 25 Purpose in Pink and Pastor Appreciation, and October 31 Fall Fest remain. The new November 1 worship announcement uses the supplied new voiceover and the complete Bishop W. Darin Moore / Pastor John T. Morrison, Jr. flyer.

The supplied BIG-Z TV promo is rebuilt in landscape with large titles and imagery taken from the supplied video. Its original 60-second narration and Spring 2027 wording are preserved. This is a true widescreen edit rather than a stretched or cropped portrait video.

Dated clips automatically leave the web playlist after the listed day in **America/New_York**. The downloadable master MP4 is a dated 4 minute 13 second edit and cannot update itself; use the web reel for automatic event expiry. All files use H.264 video, AAC stereo audio at 48 kHz, 30 fps, and fast-start MP4.

Validation: full master decode with no errors; frame and duration inspection; local browser playback, next control, 1920 × 1080 media dimensions, and empty browser error log; inclusive event-date filtering and Eastern-time date boundary checks.

Files and display labels are in `sanctuary-reel-playlist.json`. Update each clip's `expires` field when replacing an event; an empty value keeps an evergreen clip in rotation.
