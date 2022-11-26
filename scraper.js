const logoClass = ".liKqY2CEkAKTwX2SfNCu";
const lyricsClass = ".esRByMgBY3TiENAsbDHA";
const INTERVAL = 500;
const URL = "http://127.0.0.1:6966/update";

let lastSentence = "...";

function sendLyric(sentence) {
  const params = new URLSearchParams({
    sentence: sentence,
  });
  url = URL + "?" + params.toString();
  fetch(url).catch((error) => console.log(error));
}

dominate();

setInterval(() => {
  const lyric = getLyric();
  if (lastSentence != lyric) {
    // lyric changed
    lastSentence = lyric;
    console.log(lyric);
    sendLyric(lyric);
  }
}, INTERVAL);

document.body.style.border = "2px solid red";

function dominate() {
  document.body.style.border = "2px solid yellow";

  const logo = document.querySelector(logoClass);
  logo.style.color = "yellow";
}

function getLyric() {
  const container = document.querySelector(lyricsClass);
  const sentences = container.childNodes;

  let prev = null;
  for (const sentence of sentences) {
    const clazz = sentence.className;
    if (clazz.includes(" ")) {
      prev = sentence;
    } else {
      break;
    }
  }

  if (prev != null) {
    return prev.innerHTML;
  }
}
