const CHANNEL = "franklin-chapel-lower-thirds-v1";
const COMMAND_STORAGE = "franklin-chapel-lower-third-command-v1";
const bus = new BroadcastChannel(CHANNEL);
const panel = document.querySelector("#lowerThird");
let timer;
let loopTimer;
let activeId = null;
let lastSentAt = 0;

function hide() {
  clearTimeout(timer);
  clearTimeout(loopTimer);
  activeId = null;
  panel.classList.remove("show");
}

function handleCommand(data) {
  if (!data || !data.action) return;
  if (data.sentAt && data.sentAt <= lastSentAt) return;
  lastSentAt = data.sentAt || Date.now();
  if (data.action === "hide" || data.action === "hideAll") return hide();
  if (data.action !== "show") return;
  document.querySelector("#kicker").textContent = data.kicker || "";
  document.querySelector("#primary").textContent = data.primary || "";
  document.querySelector("#secondary").textContent = data.secondary || "";
  clearTimeout(timer);
  clearTimeout(loopTimer);
  activeId = data.id;
  panel.classList.remove("show");
  const reveal = () => {
    if (activeId !== data.id) return;
    panel.classList.remove("show");
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add("show")));
    if (data.duration) timer = setTimeout(() => {
      panel.classList.remove("show");
      if (data.loop && activeId === data.id) {
        const wait = Math.max(1, data.interval - data.duration);
        loopTimer = setTimeout(reveal, wait * 1000);
      } else {
        activeId = null;
      }
    }, data.duration * 1000);
  };
  reveal();
}

bus.onmessage = ({data}) => handleCommand(data);

function readSavedCommand() {
  try {
    const command = JSON.parse(localStorage.getItem(COMMAND_STORAGE));
    if (command) handleCommand(command);
  } catch {}
}
window.addEventListener("storage", event => {
  if (event.key === COMMAND_STORAGE && event.newValue) {
    try { handleCommand(JSON.parse(event.newValue)); } catch {}
  }
});
const previewMode = new URLSearchParams(location.search).get("preview") === "1";
if (previewMode) {
  panel.classList.add("show");
} else {
  readSavedCommand();
  setInterval(readSavedCommand, 500);
}
