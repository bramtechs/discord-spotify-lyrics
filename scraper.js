const logoClass = ".liKqY2CEkAKTwX2SfNCu";
const lyricsClass = ".esRByMgBY3TiENAsbDHA";
const INTERVAL = 500;
const URL = "http://127.0.0.1:6966/update";

let lastSentence = "...";

function timeTextToSeconds(text) {
  const members = text.split(":");
  if (members.length == 2) {
    return parseInt(members[0]) * 60 + parseInt(members[1]);
  } else {
    console.error("Invalid timestamp");
    return 0;
  }
}

function sendLyric(sentence) {
  const title = document.title;
  const timePos = document.querySelector("[data-testid='playback-position'");
  const timeDuration = document.querySelector(
    "[data-testid='playback-duration'"
  );

  const sinceEpoch = Math.floor(Date.now() / 1000);
  const ends =
    sinceEpoch +
    timeTextToSeconds(timeDuration.innerHTML) -
    timeTextToSeconds(timePos.innerHTML);

  const params = new URLSearchParams({
    sentence: sentence,
    title: title,
    ends: ends,
  });

  url = URL + "?" + params.toString();
  fetch(url)
    .catch((error) => console.log(error))
    .then((r) => console.log(params.toString()));
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
  if (logo != null) {
    console.warn("Couldn't find Spotify logo.");
  } else {
    logo.style.color = "yellow";
    console.log("dominated");
  }
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
