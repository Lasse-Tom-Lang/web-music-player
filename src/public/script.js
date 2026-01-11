const playButton = document.getElementById("playButton");
const playBar = document.getElementById("playBar");
const playBarFill = document.getElementById("playBarFill");
const mainAudioSource = document.getElementById("mainAudioSource");

let audioIsPlaying = true

function toggleAudio() {
  if (audioIsPlaying) {
    playButton.src = "icons/pause.svg";
    audioIsPlaying = false;
    mainAudioSource.play()
    return;
  }
  playButton.src = "icons/play.svg";
  audioIsPlaying = true;
    mainAudioSource.pause()
}

function setPlayBarFill(scaleFactor) {
  playBarFill.style.width = `${scaleFactor*100}%`;
}

function audioPlaying() {
  setPlayBarFill(mainAudioSource.currentTime / mainAudioSource.duration);
  if (mainAudioSource.currentTime >= mainAudioSource.duration) {
    toggleAudio();
  }
}

playBar.addEventListener("mousedown", (event) => {
  let newAudioPosition = ((event.clientX-playBar.getBoundingClientRect().left) / playBar.scrollWidth);
  setPlayBarFill(newAudioPosition);
  mainAudioSource.currentTime = mainAudioSource.duration * newAudioPosition;
})

playButton.onclick = toggleAudio;

mainAudioSource.ontimeupdate = audioPlaying;