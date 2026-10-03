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
    image: 'assets/announcements/pastor-appreciation.png',
    label: 'PASTOR APPRECIATION SUNDAY',
    accent: '#b867ff',
    duration: 18500,
    voiceover: 'assets/announcements/voiceovers/pastor-appreciation.mp3'
  }
];
