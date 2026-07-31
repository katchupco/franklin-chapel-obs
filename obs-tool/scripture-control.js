const CHANNEL = "franklin-chapel-scripture-v1";
const STORAGE = "franklin-chapel-scripture-content-v1";
const COMMAND_STORAGE = "franklin-chapel-scripture-command-v1";
const bus = new BroadcastChannel(CHANNEL);
const reference = document.querySelector("#reference");
const text = document.querySelector("#text");
const visible = document.querySelector("#visible");
const status = document.querySelector("#status");
const toggleLabel = document.querySelector(".toggle b");

try {
  const saved = JSON.parse(localStorage.getItem(STORAGE));
  if (saved?.reference) reference.value = saved.reference;
  if (saved?.text) text.value = saved.text;
  const command = JSON.parse(localStorage.getItem(COMMAND_STORAGE));
  if (command?.action === "show") {
    visible.checked = true;
    toggleLabel.textContent = "ON";
    status.textContent = "ON AIR";
    status.classList.add("live");
  }
} catch {}

function content(action = "update") {
  return {
    action,
    reference:reference.value.trim() || "BOOK 1:1",
    text:text.value.trim() || "SCRIPTURE TEXT GOES HERE.",
    sentAt:Date.now()
  };
}
function persist() {
  localStorage.setItem(STORAGE, JSON.stringify(content("update")));
}
function send(action) {
  const message = content(action);
  persist();
  localStorage.setItem(COMMAND_STORAGE, JSON.stringify(message));
  bus.postMessage(message);
}
reference.addEventListener("input", persist);
text.addEventListener("input", persist);
document.querySelector("#update").addEventListener("click", () => {
  send("update");
  status.textContent = visible.checked ? "ON AIR" : "UPDATED";
  setTimeout(() => {
    status.textContent = visible.checked ? "ON AIR" : "READY";
  }, 1500);
});
visible.addEventListener("change", () => {
  if (visible.checked) {
    send("show");
    toggleLabel.textContent = "ON";
    status.textContent = "ON AIR";
    status.classList.add("live");
  } else {
    send("hide");
    toggleLabel.textContent = "OFF";
    status.textContent = "READY";
    status.classList.remove("live");
  }
});
bus.addEventListener("message", event => {
  if (event.data?.action === "requestCurrent") {
    bus.postMessage(content(visible.checked ? "show" : "update"));
  }
});
