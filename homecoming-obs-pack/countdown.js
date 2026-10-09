(() => {
  const display = document.getElementById('countdown');
  const label = document.getElementById('countdownLabel');
  if (!display) return;
  const params = new URLSearchParams(window.location.search);
  const requested = Number(params.get('minutes'));
  const minutes = Number.isFinite(requested) && requested > 0 ? requested : 15;
  const deadline = Date.now() + minutes * 60 * 1000;

  const update = () => {
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (remaining === 0) {
      display.textContent = 'WELCOME HOME';
      display.classList.add('countdown-ready');
      if (label) label.textContent = 'WORSHIP BEGINS NOW';
      return;
    }
    const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
    const secs = String(remaining % 60).padStart(2, '0');
    display.textContent = `${mins}:${secs}`;
    window.requestAnimationFrame(() => window.setTimeout(update, 250));
  };
  update();
})();
