const CHANNEL = "franklin-chapel-scripture-v1";
const COMMAND_STORAGE = "franklin-chapel-scripture-command-v1";
const bus = new BroadcastChannel(CHANNEL);
const overlay = document.querySelector("#scriptureOverlay");
const verse = document.querySelector("#scriptureText");
const reference = document.querySelector("#scriptureReference");
let lastSentAt = 0;

function fitText() {
  verse.classList.toggle("long", verse.textContent.length > 145);
  verse.classList.toggle("extra-long", verse.textContent.length > 250);
}
function handle(message) {
  if (!message?.action) return;
  if (message.sentAt && message.sentAt <= lastSentAt) return;
  lastSentAt = message.sentAt || Date.now();
  if (message.reference) reference.textContent = message.reference;
  if (message.text) verse.textContent = message.text;
  fitText();
  if (message.action === "hide") overlay.classList.remove("show");
  if (message.action === "show") {
    overlay.classList.remove("show");
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add("show")));
  }
}
bus.addEventListener("message", event => handle(event.data));
function readSavedCommand() {
  try {
    const command = JSON.parse(localStorage.getItem(COMMAND_STORAGE));
    if (command) handle(command);
  } catch {}
}
window.addEventListener("storage", event => {
  if (event.key === COMMAND_STORAGE && event.newValue) {
    try { handle(JSON.parse(event.newValue)); } catch {}
  }
});
readSavedCommand();
setInterval(readSavedCommand, 500);
bus.postMessage({action:"requestCurrent",sentAt:Date.now()});
