(function () {
  const DEFAULT_MINUTES = 15;
  const params = new URLSearchParams(window.location.search);
  const requestedMinutes = Number(params.get('minutes'));
  const requestedSeconds = Number(params.get('seconds'));
  const duration = Number.isFinite(requestedSeconds) && requestedSeconds > 0
    ? requestedSeconds
    : (Number.isFinite(requestedMinutes) && requestedMinutes > 0 ? requestedMinutes : DEFAULT_MINUTES) * 60;

  const minuteNode = document.getElementById('minutes');
  const secondNode = document.getElementById('seconds');
  const timerNode = document.getElementById('countdown');
  const deadline = Date.now() + duration * 1000;

  let tick;

  function update() {
    const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    minuteNode.textContent = String(minutes).padStart(2, '0');
    secondNode.textContent = String(seconds).padStart(2, '0');
    if (remaining === 0) {
      timerNode.classList.add('complete');
      timerNode.innerHTML = '<em>LIVE NOW</em>';
      if (tick) window.clearInterval(tick);
    }
  }

  update();
  tick = window.setInterval(update, 250);
})();
