const CHANNEL = "franklin-chapel-lower-thirds-v1";
const STORAGE = "franklin-chapel-presets-v1";
const COMMAND_STORAGE = "franklin-chapel-lower-third-command-v1";
const bus = new BroadcastChannel(CHANNEL);
const defaults = [
  ["Pastor","SENIOR PASTOR","PASTOR / SPEAKER","FRANKLIN CHAPEL AME ZION CHURCH"],
  ["Sermon","TODAY’S MESSAGE","MESSAGE TITLE","PASTOR / SPEAKER"],
  ["Scripture","SCRIPTURE","BOOK 1:1","SCRIPTURE TEXT"],
  ["Guest","GUEST SPEAKER","GUEST NAME","TITLE / CHURCH"],
  ["Announcement","ANNOUNCEMENT","ANNOUNCEMENT TITLE","DETAILS"],
  ["Custom","FRANKLIN CHAPEL LIVE","PRIMARY TEXT","SECONDARY TEXT"]
];
let saved;
try { saved = JSON.parse(localStorage.getItem(STORAGE)); } catch {}
const data = Array.isArray(saved) && saved.length === 6 ? saved : defaults;
const root = document.querySelector("#presets");
const tpl = document.querySelector("#presetTemplate");

function persist() { localStorage.setItem(STORAGE, JSON.stringify(data)); }
function send(message) {
  const command = {...message, sentAt:Date.now()};
  localStorage.setItem(COMMAND_STORAGE, JSON.stringify(command));
  bus.postMessage(command);
}
function hideVisuals() {
  document.querySelectorAll(".preset").forEach(card => {
    card.classList.remove("live","looping");
    card.querySelector(".status").textContent = "READY";
    const toggle = card.querySelector(".onair");
    if (toggle) toggle.checked = false;
    const toggleLabel = card.querySelector(".air-toggle b");
    if (toggleLabel) toggleLabel.textContent = "OFF";
  });
}

data.forEach((preset,index) => {
  const card = tpl.content.firstElementChild.cloneNode(true);
  card.querySelector(".number").textContent = index + 1;
  const fields = ["label","kicker","primary","secondary"];
  fields.forEach((field,i) => {
    const input = card.querySelector("." + field);
    input.value = preset[i];
    input.addEventListener("input", () => { data[index][i] = input.value; persist(); });
  });
  const onAirToggle = card.querySelector(".onair");
  onAirToggle.addEventListener("change", () => {
    if (onAirToggle.checked) {
      hideVisuals();
      onAirToggle.checked = true;
      card.querySelector(".air-toggle b").textContent = "ON";
      card.classList.add("live","looping");
      card.querySelector(".status").textContent = "LOOPING";
      send({
        action:"show",
        id:index,
        ...Object.fromEntries(fields.slice(1).map((f,i)=>[f,data[index][i+1]])),
        duration:12,
        loop:true,
        interval:45
      });
    } else {
      send({action:"hide",id:index});
      card.classList.remove("live","looping");
      card.querySelector(".status").textContent = "READY";
      card.querySelector(".air-toggle b").textContent = "OFF";
    }
  });
  root.append(card);
});

try {
  const previousCommand = JSON.parse(localStorage.getItem(COMMAND_STORAGE));
  if (previousCommand?.action === "show" && Number.isInteger(previousCommand.id)) {
    const card = root.children[previousCommand.id];
    if (card) {
      card.classList.add("live","looping");
      card.querySelector(".status").textContent = "LOOPING";
      card.querySelector(".onair").checked = true;
      card.querySelector(".air-toggle b").textContent = "ON";
    }
  }
} catch {}

document.querySelector("#hideAll").addEventListener("click", () => {
  send({action:"hideAll"});
  hideVisuals();
});
