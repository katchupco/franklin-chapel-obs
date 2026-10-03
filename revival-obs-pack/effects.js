(function () {
  const root = document.querySelector('.scene');
  if (!root || document.body.classList.contains('overlay')) return;

  const amount = Number(document.body.dataset.particles || 28);
  for (let i = 0; i < amount; i += 1) {
    const p = document.createElement('i');
    p.className = 'particle';
    p.style.setProperty('--size', `${2 + Math.random() * 7}px`);
    p.style.setProperty('--left', `${Math.random() * 100}%`);
    p.style.setProperty('--alpha', `${0.2 + Math.random() * 0.6}`);
    p.style.setProperty('--duration', `${11 + Math.random() * 16}s`);
    p.style.setProperty('--delay', `${-Math.random() * 25}s`);
    root.appendChild(p);
  }
})();

