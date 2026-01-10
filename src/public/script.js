const playButton = document.getElementById("playButton");
const playBar = document.getElementById("playBar");
const playBarFill = document.getElementById("playBarFill");

function playAudio(event) {
  playButton.src = "icons/pause.svg";
}

function setPlayBarFill(scaleFactor) {
  playBarFill.style.width = `${scaleFactor*100}%`;
}

playBar.addEventListener("click", (event) => {
  let newAudioPosition = ((event.clientX-playBar.getBoundingClientRect().left) / playBar.scrollWidth);
  setPlayBarFill(newAudioPosition);
})

playButton.onclick = playAudio;