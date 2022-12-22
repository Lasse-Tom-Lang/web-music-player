const audio = document.getElementById("audio") as HTMLAudioElement;
const cover = document.getElementById("cover") as HTMLImageElement;
const title = document.getElementById("title") as HTMLParagraphElement;
const btnPlaypause_img = document.querySelector("#btn-playpause img") as HTMLImageElement;
const progress = document.getElementById("progress") as HTMLDivElement;
const progressBar = document.querySelector("#progress div") as HTMLDivElement;
const trackList = document.getElementById("track-list") as HTMLDivElement;
const playbackSpeed = document.getElementById("btn-playbackSpeed") as HTMLButtonElement;
const autoplayImg = document.querySelector("#btn-autoplay img") as HTMLImageElement;
const btnAutoplay = document.getElementById("btn-autoplay") as HTMLButtonElement;
const btnBackward = document.getElementById("btn-backward") as HTMLButtonElement;
const btnForward = document.getElementById("btn-forward") as HTMLButtonElement;
const btnPlayPause = document.getElementById("btn-playpause") as HTMLButtonElement;

let musicClips = [
  { name: "test Audio", audio: "testMusic.mp3", cover: "testCover.png" },
  { name: "Song 2", audio: "song2.mp3", cover: "cover2.png" },
  { name: "Song 3", audio: "song3.mp3", cover: "cover3.png" }
];

let currentClip = 0;
let isPlaying = false;
let autoplay = false;

function setClip() {
  let playbackRate = audio.playbackRate;
  audio.src = "music/" + musicClips[currentClip].audio;
  cover.src = "music/" + musicClips[currentClip].cover;
  title.innerHTML = musicClips[currentClip].name;
  audio.playbackRate = playbackRate;
}

function loadSong(song:number) {
  currentClip = song;
  setClip();
  isPlaying ? audio.play() : audio.pause();
}

function setTrackList() {
  let a = 0;
  musicClips.forEach(element => {
    trackList.innerHTML += "<a onclick=loadSong(" + a + ")>" + element.name + "</a>";
    a++;
  });
}

progress.addEventListener("click", (e) => {
  audio.currentTime = (e.pageX - progress.getBoundingClientRect().x) * (audio.duration / progress.clientWidth);
});

playbackSpeed.addEventListener("click", () => {
  switch (audio.playbackRate) {
    case 1:
      audio.playbackRate = 1.5;
      break;
    case 1.5:
      audio.playbackRate = 2;
      break;
    case 2:
      audio.playbackRate = 0.5;
      break
    case 0.5:
      audio.playbackRate = 1;
      break;
  }
  playbackSpeed.innerHTML = audio.playbackRate + "x";
});

btnAutoplay.addEventListener("click", () => {
  autoplay = autoplay ? false : true;
  autoplayImg.src = autoplay ? "icons/playWhite.png" : "icons/playNot.png";
});

btnBackward.addEventListener("click", () => {
  currentClip = ((currentClip - 1) < 0) ? (musicClips.length - 1) : currentClip -= 1;
  setClip();
  isPlaying ? audio.play() : audio.pause();
});
btnForward.addEventListener("click", () => {
  currentClip = ((currentClip + 1) == musicClips.length) ? 0 : currentClip += 1;
  setClip();
  isPlaying ? audio.play() : audio.pause();
});

audio.addEventListener("timeupdate", () => {
  let currentPercent = audio.currentTime / audio.duration * 100;
  progressBar.style.transform = "translateX(" + (currentPercent - 100) + "%)";
  if (audio.currentTime == audio.duration && autoplay) {
    currentClip = ((currentClip + 1) == musicClips.length) ? 0 : currentClip += 1;
    setClip();
    audio.play();
  }
  if (audio.currentTime == audio.duration && !autoplay) {
    isPlaying = false;
    btnPlaypause_img.src = "icons/play.png";
    audio.pause();
  }
});

btnPlayPause.addEventListener("click", () => {
  switch (isPlaying) {
    case true:
      isPlaying = false;
      btnPlaypause_img.src = "icons/play.png";
      audio.pause();
      break;
    case false:
      isPlaying = true;
      btnPlaypause_img.src = "icons/pause.png";
      audio.play();
      break;
  }
});

setClip();
setTrackList();