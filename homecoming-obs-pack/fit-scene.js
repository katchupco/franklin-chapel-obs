(() => {
  const scene = document.querySelector('.scene');
  if (!scene) return;

  const fitScene = () => {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    const renderedWidth = 1920 * scale;
    const renderedHeight = 1080 * scale;

    scene.style.position = 'absolute';
    scene.style.left = `${(window.innerWidth - renderedWidth) / 2}px`;
    scene.style.top = `${(window.innerHeight - renderedHeight) / 2}px`;
    scene.style.transformOrigin = '0 0';
    scene.style.transform = `scale(${scale})`;
  };

  if (!document.body.classList.contains('overlay')) {
    document.body.style.background = '#05050f';
  }

  window.addEventListener('resize', fitScene);
  fitScene();
})();
