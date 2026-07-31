const CHANNEL = "franklin-chapel-sermon-scene-v1";
const STORAGE = "franklin-chapel-sermon-scene-command-v1";
const bus = new BroadcastChannel(CHANNEL);
const fields = ["kicker","title","speaker","scripture"];
const visible = document.querySelector("#visible");

function current(action = "update") {
  return Object.fromEntries([
    ["action",action],
    ...fields.map(id => [id,document.querySelector("#" + id).value.trim()])
  ]);
}
function send(action) {
  const command = {...current(action),sentAt:Date.now()};
  localStorage.setItem(STORAGE,JSON.stringify(command));
  bus.postMessage(command);
}
function saveDraft() {
  localStorage.setItem("franklin-chapel-sermon-scene-draft-v1",JSON.stringify(current()));
}

try {
  const draft = JSON.parse(localStorage.getItem("franklin-chapel-sermon-scene-draft-v1"));
  fields.forEach(id => {
    if (draft?.[id]) document.querySelector("#" + id).value = draft[id];
  });
} catch {}

fields.forEach(id => document.querySelector("#" + id).addEventListener("input",saveDraft));
document.querySelector("#update").addEventListener("click",() => {
  visible.checked = true;
  send("update");
});
visible.addEventListener("change",() => send(visible.checked ? "show" : "hide"));
