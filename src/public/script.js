const playButton = document.getElementById("playButton");
const playBar = document.getElementById("playBar");
const playBarFill = document.getElementById("playBarFill");
const mainAudioSource = document.getElementById("mainAudioSource");
const currentTrackTitle = document.getElementById("currentTrackTitle");
const currentAlbumTitle = document.getElementById("currentAlbumTitle");
const currentAlbumCover = document.getElementById("currentAlbumCover");
const setPlaybackSpeed = document.getElementById("setPlaybackSpeed");

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

function setCurrentAudioTrack(trackTitle, albumTitle, albumCoverImage, audioFile) {
  currentTrackTitle.innerText = trackTitle;
  currentAlbumTitle.innerText = albumTitle;
  currentAlbumCover.src = albumCoverImage;
  mainAudioSource.src = audioFile; 
}

function togglePlaybackSpeed() {
  mainAudioSource.playbackRate += 0.5;
  if (mainAudioSource.playbackRate > 2) {
    mainAudioSource.playbackRate = 0.5
  }
  setPlaybackSpeed.innerText = mainAudioSource.playbackRate + "x";
}

playBar.addEventListener("mousedown", (event) => {
  let newAudioPosition = ((event.clientX-playBar.getBoundingClientRect().left) / playBar.scrollWidth);
  setPlayBarFill(newAudioPosition);
  mainAudioSource.currentTime = mainAudioSource.duration * newAudioPosition;
})

playButton.onclick = toggleAudio;

mainAudioSource.ontimeupdate = audioPlaying;