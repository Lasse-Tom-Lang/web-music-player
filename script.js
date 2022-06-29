audio = document.getElementById("audio");
cover = document.getElementById("cover");

progress = document.getElementById("progress");
progress.addEventListener("click", (e) => {
  audio.currentTime = (e.pageX - progress.getBoundingClientRect().x) * (audio.duration / progress.clientWidth);
});
progressBar = document.querySelector("#progress div");

trackList = document.getElementById("track-list");

musicClips = [{name: "test Audio", audio: "testMusic.mp3", cover: "testCover.png"}, {name: "Song 2", audio: "song2.mp3", cover: "cover2.png"}, {name: "Song 3", audio: "song3.mp3", cover: "cover3.png"}];

currentClip = 0;

isPlaying = false;

function setClip() {
  audio.src = "music/" + musicClips[currentClip].audio;
  cover.src = "music/" + musicClips[currentClip].cover;
  title.innerHTML = musicClips[currentClip].name;
}

function loadSong(song) {
  currentClip = song;
  setClip();
}

function setTrackList() {
  a = 0;
  musicClips.forEach(element => {
    trackList.innerHTML += "<a onclick=loadSong(" + a + ")>" + element.name + "</a>";
    a++;
  });
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

setClip();
setTrackList();