audio = document.getElementById("audio");
progress = document.querySelector("#progress div");
title = document.getElementById("title");

musicClips = ["testMusic.mp3"]

currentClip = 0

btnPlaypause_img = document.querySelector("#btn-playpause img");

isPlaying = false;

audio.addEventListener("timeupdate", (e) => {
  currentPercent =  e.srcElement.currentTime / e.srcElement.duration * 100;
  progress.style.transform = "translateX(" + (currentPercent - 100) + "%)";
});

document.getElementById("btn-playpause").addEventListener("click", () => {
  switch (isPlaying) {
    case true: isPlaying = false;
      btnPlaypause_img.src = "icons/play.png";
      audio.pause();
      break;
    case false: isPlaying = true;
      btnPlaypause_img.src = "icons/pause.png";
      audio.play();
      break;
  }
});

function setClip() {
  audio.src = "music/" + musicClips[currentClip];
  title.innerHTML = musicClips[currentClip];
}

setClip()