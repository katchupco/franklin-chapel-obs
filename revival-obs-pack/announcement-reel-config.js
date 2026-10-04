/*
  Add future announcements to this list.
  - image: path to the flyer image
  - label: short label shown beside the progress bar
  - accent: color used for the glow and transition
  - duration: milliseconds on screen, including narration and the closing pause
  - voiceover: audio path for the matching announcement
*/
window.FRANKLIN_ANNOUNCEMENT_AUDIO = {
  backgroundMusic: 'assets/announcements/music/intro-track.mp3',
  musicVolume: 0.24,
  duckedMusicVolume: 0.10,
  voiceLeadIn: 1000,
  fadeMilliseconds: 500
};

window.FRANKLIN_ANNOUNCEMENTS = [
  {
    image: 'assets/announcements/breast-cancer-awareness.png',
    label: 'BREAST CANCER AWARENESS MONTH',
    accent: '#ff4f92',
    duration: 14000,
    voiceover: 'assets/announcements/voiceovers/breast-cancer.mp3'
  },
  {
    image: 'assets/announcements/clergy-appreciation.png',
    label: 'CLERGY APPRECIATION MONTH',
    accent: '#d9a83f',
    duration: 19000,
    voiceover: 'assets/announcements/voiceovers/clergy-month.mp3'
  },
  {
    image: 'assets/announcements/homecoming.png',
    label: 'HOMECOMING — LEGACY IN MOTION',
    accent: '#8b58ff',
    duration: 17500,
    voiceover: 'assets/announcements/voiceovers/homecoming.mp3'
  },
  {
    image: 'assets/announcements/feed-the-band.png',
    label: 'FEED THE BAND — OCTOBER 16',
    accent: '#e33a34',
    duration: 26500,
    voiceover: 'assets/announcements/voiceovers/feed-the-band.mp3'
  },
  {
    image: 'assets/announcements/associate-ministers-appreciation.png',
    label: 'ASSOCIATE MINISTERS APPRECIATION — OCTOBER 18',
    accent: '#d6a84a',
    duration: 23500,
    voiceover: 'assets/announcements/voiceovers/associate-ministers-appreciation.mp3'
  },
  {
    image: 'assets/announcements/awareness-action-day.png',
    label: 'AWARENESS & ACTION DAY — OCTOBER 24',
    accent: '#f34e98',
    duration: 36500,
    voiceover: 'assets/announcements/voiceovers/awareness-action-day.mp3'
  },
  {
    image: 'assets/announcements/purpose-in-pink.png',
    label: 'PURPOSE IN PINK — OCTOBER 25',
    accent: '#ff5aa7',
    duration: 34000,
    voiceover: 'assets/announcements/voiceovers/purpose-in-pink.mp3'
  },
  {
    image: 'assets/announcements/pastor-appreciation.png',
    label: 'PASTOR APPRECIATION SUNDAY',
    accent: '#b867ff',
    duration: 18500,
    voiceover: 'assets/announcements/voiceovers/pastor-appreciation.mp3'
  },
  {
    image: 'assets/announcements/fall-fest.png',
    label: 'FALL FEST — OCTOBER 31',
    accent: '#ff8a24',
    duration: 26750,
    voiceover: 'assets/announcements/voiceovers/fall-fest.mp3'
  }
];
