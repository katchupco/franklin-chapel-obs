(() => {
  const field = document.querySelector('.particles');
  if (!field) return;
  for (let i = 0; i < 30; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${38 + Math.random() * 70}%`;
    particle.style.setProperty('--d', `${8 + Math.random() * 11}s`);
    particle.style.setProperty('--delay', `${-Math.random() * 15}s`);
    particle.style.transform = `scale(${0.45 + Math.random() * 1.2})`;
    field.appendChild(particle);
  }
})();
