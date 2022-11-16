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

autoplay = false;

playbackSpeed = document.getElementById("btn-playbackSpeed");
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

autoplayImg = document.querySelector("#btn-autoplay img");
document.getElementById("btn-autoplay").addEventListener("click", () => {
  autoplay = autoplay?false:true;
  autoplayImg.src = autoplay?"icons/playWhite.png":"icons/playNot.png";
});

function setClip() {
  playbackRate = audio.playbackRate;
  audio.src = "music/" + musicClips[currentClip].audio;
  cover.src = "music/" + musicClips[currentClip].cover;
  title.innerHTML = musicClips[currentClip].name;
  audio.playbackRate = playbackRate;
}

function loadSong(song) {
  currentClip = song;
  setClip();
  isPlaying?audio.play():audio.pause();
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

audio.addEventListener("timeupdate", () => {
  currentPercent =  audio.currentTime / audio.duration * 100;
  progressBar.style.transform = "translateX(" + (currentPercent - 100) + "%)";
  if (audio.currentTime == audio.duration && autoplay) {
    currentClip = ((currentClip + 1) == musicClips.length)?0:currentClip += 1;
    setClip();
    audio.play();
  }
  if (audio.currentTime == audio.duration && !autoplay) {
    isPlaying = false;
    btnPlaypause_img.src = "icons/play.png";
    audio.pause();
  }
});

document.getElementById("btn-playpause").addEventListener("click", () => {
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