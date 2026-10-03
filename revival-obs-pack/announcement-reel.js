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

  function restartAnimation(element, animationValue) {
    element.style.animation = 'none';
    void element.offsetWidth;
    element.style.animation = animationValue;
  }

  function playVoiceover(path) {
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    if (!path) return;
    audio.src = path;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

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
})();

