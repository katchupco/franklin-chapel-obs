(function () {
  const slides = Array.isArray(window.FRANKLIN_ANNOUNCEMENTS)
    ? window.FRANKLIN_ANNOUNCEMENTS.filter(item => item && item.image)
    : [];

  const scene = document.getElementById('announcementScene');
  const stage = document.getElementById('announcementStage');
  const card = document.getElementById('announcementCard');
  const image = document.getElementById('announcementImage');
  const backdrop = document.getElementById('announcementBackdrop');
  const reflection = document.getElementById('announcementReflection');
  const count = document.getElementById('announcementCount');
  const label = document.getElementById('announcementLabel');
  const progress = document.getElementById('announcementProgress');
  const audio = document.getElementById('announcementAudio');
  const music = document.getElementById('announcementMusic');
  const audioStart = document.getElementById('announcementAudioStart');
  const audioSettings = window.FRANKLIN_ANNOUNCEMENT_AUDIO || {};
  const musicVolume = Math.min(1, Math.max(0, Number(audioSettings.musicVolume) || 0.24));
  const duckedMusicVolume = Math.min(musicVolume, Math.max(0, Number(audioSettings.duckedMusicVolume) || 0.10));
  const voiceLeadIn = Math.max(0, Number(audioSettings.voiceLeadIn) || 1000);
  const fadeMilliseconds = Math.max(100, Number(audioSettings.fadeMilliseconds) || 500);

  if (!slides.length) {
    label.textContent = 'ADD ANNOUNCEMENTS IN announcement-reel-config.js';
    return;
  }

  slides.forEach(slide => {
    const preload = new Image();
    preload.src = slide.image;
  });

  let activeIndex = 0;
  let changeTimer;
  let voiceTimer;
  let musicFadeTimer;

  function restartAnimation(element, animationValue) {
    element.style.animation = 'none';
    void element.offsetWidth;
    element.style.animation = animationValue;
  }

  function fadeMusic(targetVolume) {
    window.clearInterval(musicFadeTimer);
    const startVolume = music.volume;
    const difference = targetVolume - startVolume;
    const startedAt = performance.now();

    musicFadeTimer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const progressValue = Math.min(1, elapsed / fadeMilliseconds);
      music.volume = Math.min(1, Math.max(0, startVolume + (difference * progressValue)));
      if (progressValue >= 1) window.clearInterval(musicFadeTimer);
    }, 30);
  }

  function startBackgroundMusic() {
    const path = audioSettings.backgroundMusic;
    if (!path) return;
    music.src = path;
    music.volume = 0;
    music.play()
      .then(() => fadeMusic(musicVolume))
      .catch(() => { audioStart.hidden = false; });
  }

  function restartWithSound() {
    audioStart.hidden = true;
    window.clearTimeout(changeTimer);
    stopVoiceover();
    activeIndex = 0;
    music.currentTime = 0;
    music.volume = 0;
    music.play()
      .then(() => {
        fadeMusic(musicVolume);
        activate(activeIndex, true);
      })
      .catch(() => { audioStart.hidden = false; });
  }

  function stopVoiceover() {
    window.clearTimeout(voiceTimer);
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    fadeMusic(musicVolume);
  }

  function playVoiceover(path) {
    stopVoiceover();
    if (!path) return;
    voiceTimer = window.setTimeout(() => {
      audio.src = path;
      audio.currentTime = 0;
      fadeMusic(duckedMusicVolume);
      audio.play().catch(() => fadeMusic(musicVolume));
    }, voiceLeadIn);
  }

  audio.addEventListener('ended', () => fadeMusic(musicVolume));
  audioStart.addEventListener('click', restartWithSound);

  function activate(index, firstRun) {
    window.clearTimeout(changeTimer);
    const slide = slides[index];
    const duration = Math.max(4000, Number(slide.duration) || 10000);
    const accent = slide.accent || '#7b51ff';

    scene.style.setProperty('--announcement-accent', accent);
    scene.style.setProperty('--announcement-duration', `${duration}ms`);
    image.src = slide.image;
    image.alt = slide.label || 'Church announcement';
    backdrop.style.backgroundImage = `url("${slide.image}")`;
    reflection.style.backgroundImage = `url("${slide.image}")`;
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    label.textContent = slide.label || 'UPCOMING AT FRANKLIN CHAPEL';

    card.classList.remove('is-leaving');
    stage.classList.remove('is-leaving');
    restartAnimation(card, 'announcement-card-in 1.15s cubic-bezier(.16,.84,.2,1) both, announcement-card-drift var(--announcement-duration) ease-in-out 1.15s both');
    restartAnimation(backdrop, 'announcement-backdrop-drift var(--announcement-duration) ease-in-out both');
    restartAnimation(progress, `announcement-progress ${duration}ms linear both`);
    playVoiceover(slide.voiceover);

    if (!firstRun) {
      scene.classList.remove('scene-flash');
      void scene.offsetWidth;
      scene.classList.add('scene-flash');
    }

    changeTimer = window.setTimeout(() => {
      card.classList.add('is-leaving');
      stage.classList.add('is-leaving');
      window.setTimeout(() => {
        activeIndex = (activeIndex + 1) % slides.length;
        activate(activeIndex, false);
      }, 850);
    }, duration - 850);
  }

  activate(activeIndex, true);
  startBackgroundMusic();
})();
