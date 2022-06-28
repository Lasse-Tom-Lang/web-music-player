audio = document.getElementById("audio");

progress = document.getElementById("progress");
progress.addEventListener("click", (e) => {
  audio.currentTime = (e.pageX - progress.getBoundingClientRect().x) * (audio.duration / progress.clientWidth);
});
progressBar = document.querySelector("#progress div");

musicClips = ["testMusic.mp3", "Test", "Hallo"]

currentClip = 0

isPlaying = false;

function setClip() {
  audio.src = "music/" + musicClips[currentClip];
  title.innerHTML = musicClips[currentClip];
}

document.getElementById("btn-backward").addEventListener("click", () => {
  currentClip = ((currentClip - 1) <0)?(musicClips.length - 1):currentClip -= 1;
  setClip();
  isPlaying?audio.play():audio.pause();
});
document.getElementById("btn-forward").addEventListener("click", () => {
  currentClip = ((currentClip + 1) == musicClips.length)?0:currentClip += 1;
  setClip();
  isPlaying?audio.play():audio.pause();
});

document.getElementById("btn-forward");

title = document.getElementById("title");

btnPlaypause_img = document.querySelector("#btn-playpause img");

audio.addEventListener("timeupdate", (e) => {
  currentPercent =  e.srcElement.currentTime / e.srcElement.duration * 100;
  progressBar.style.transform = "translateX(" + (currentPercent - 100) + "%)";
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

setClip()