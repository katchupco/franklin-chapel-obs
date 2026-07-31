const CHANNEL = "franklin-chapel-scripture-v1";
const STORAGE = "franklin-chapel-scripture-content-v2";
const COMMAND_STORAGE = "franklin-chapel-scripture-command-v1";
const API = "https://bible-api.com/";
const BOOKS = [
  "Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
  "1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra",
  "Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon",
  "Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos",
  "Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah",
  "Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians",
  "2 Corinthians","Galatians","Ephesians","Philippians","Colossians",
  "1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon",
  "Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"
];
const LABELS = {kjv:"KJV",web:"WEB",asv:"ASV"};
const bus = new BroadcastChannel(CHANNEL);
const translation = document.querySelector("#translation");
const book = document.querySelector("#book");
const passage = document.querySelector("#passage");
const visible = document.querySelector("#visible");
const autoAdvance = document.querySelector("#autoAdvance");
const interval = document.querySelector("#interval");
const status = document.querySelector("#status");
const toggleLabel = document.querySelector(".toggle b");
const previewReference = document.querySelector("#previewReference");
const previewText = document.querySelector("#previewText");
const verseCount = document.querySelector("#verseCount");
let verses = [];
let currentIndex = 0;
let timer = null;

BOOKS.forEach(name => book.add(new Option(name, name)));
book.value = "John";

function clean(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}
function currentVerse(action = "update") {
  const item = verses[currentIndex] || {
    reference:`${book.value} ${passage.value}`,
    text:"Choose Find Scripture to load this passage."
  };
  return {
    action,
    reference:`${item.reference} • ${LABELS[translation.value]}`,
    text:clean(item.text),
    index:currentIndex,
    total:verses.length,
    sentAt:Date.now()
  };
}
function save() {
  localStorage.setItem(STORAGE, JSON.stringify({
    translation:translation.value,
    book:book.value,
    passage:passage.value,
    verses,
    currentIndex,
    autoAdvance:autoAdvance.checked,
    interval:interval.value
  }));
}
function send(action = "update") {
  const message = currentVerse(action);
  localStorage.setItem(COMMAND_STORAGE, JSON.stringify(message));
  bus.postMessage(message);
}
function render(sendUpdate = true) {
  const item = verses[currentIndex];
  if (!item) return;
  previewReference.textContent = `${item.reference} • ${LABELS[translation.value]}`;
  previewText.textContent = clean(item.text);
  verseCount.textContent = `VERSE ${currentIndex + 1} OF ${verses.length}`;
  save();
  if (sendUpdate) send(visible.checked ? "show" : "update");
}
function resetTimer() {
  clearInterval(timer);
  timer = null;
  if (!visible.checked || !autoAdvance.checked || verses.length < 2) return;
  timer = setInterval(() => {
    currentIndex = (currentIndex + 1) % verses.length;
    render(true);
  }, Number(interval.value) * 1000);
}
async function loadPassage() {
  const query = `${book.value} ${passage.value.trim()}`;
  if (!passage.value.trim()) return;
  status.textContent = "LOADING";
  status.classList.remove("live");
  document.querySelector("#load").disabled = true;
  try {
    const response = await fetch(`${API}${encodeURIComponent(query)}?translation=${translation.value}`);
    if (!response.ok) throw new Error("Passage not found");
    const data = await response.json();
    if (!data.verses?.length) throw new Error("Passage not found");
    verses = data.verses.map(v => ({
      reference:`${v.book_name} ${v.chapter}:${v.verse}`,
      text:clean(v.text)
    }));
    currentIndex = 0;
    render(true);
    resetTimer();
    status.textContent = visible.checked ? "ON AIR" : "LOADED";
    status.classList.toggle("live", visible.checked);
  } catch {
    status.textContent = "NOT FOUND";
    previewText.textContent = "Check the book, chapter, and verse, then try again.";
  } finally {
    document.querySelector("#load").disabled = false;
  }
}
document.querySelector("#load").addEventListener("click", loadPassage);
passage.addEventListener("keydown", event => {
  if (event.key === "Enter") loadPassage();
});
document.querySelector("#previous").addEventListener("click", () => {
  if (!verses.length) return;
  currentIndex = (currentIndex - 1 + verses.length) % verses.length;
  render(true);
  resetTimer();
});
document.querySelector("#next").addEventListener("click", () => {
  if (!verses.length) return;
  currentIndex = (currentIndex + 1) % verses.length;
  render(true);
  resetTimer();
});
visible.addEventListener("change", () => {
  send(visible.checked ? "show" : "hide");
  toggleLabel.textContent = visible.checked ? "ON" : "OFF";
  status.textContent = visible.checked ? "ON AIR" : "READY";
  status.classList.toggle("live", visible.checked);
  resetTimer();
});
autoAdvance.addEventListener("change", () => { save(); resetTimer(); });
interval.addEventListener("change", () => { save(); resetTimer(); });
[translation,book,passage].forEach(input => input.addEventListener("change", save));
bus.addEventListener("message", event => {
  if (event.data?.action === "requestCurrent") {
    bus.postMessage(currentVerse(visible.checked ? "show" : "update"));
  }
});
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE));
  if (saved) {
    translation.value = saved.translation || "kjv";
    book.value = saved.book || "John";
    passage.value = saved.passage || "3:16";
    verses = Array.isArray(saved.verses) ? saved.verses : [];
    currentIndex = Math.min(saved.currentIndex || 0, Math.max(verses.length - 1, 0));
    autoAdvance.checked = saved.autoAdvance !== false;
    interval.value = saved.interval || "10";
    if (verses.length) render(false);
  }
  const command = JSON.parse(localStorage.getItem(COMMAND_STORAGE));
  if (command?.action === "show") {
    visible.checked = true;
    toggleLabel.textContent = "ON";
    status.textContent = "ON AIR";
    status.classList.add("live");
  }
} catch {}
resetTimer();
