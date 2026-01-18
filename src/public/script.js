const playButton = document.getElementById("playButton");
const playBar = document.getElementById("playBar");
const playBarFill = document.getElementById("playBarFill");
const mainAudioSource = document.getElementById("mainAudioSource");
const currentTrackTitle = document.getElementById("currentTrackTitle");
const currentAlbumTitle = document.getElementById("currentAlbumTitle");
const currentAlbumCover = document.getElementById("currentAlbumCover");
const setPlaybackSpeed = document.getElementById("setPlaybackSpeed");
const currentPlayTime = document.getElementById("currentPlayTime");
const allArtistsGrid = document.getElementById("allArtistsGrid");
const artistView = document.getElementById("artistView");
const artistViewArtistCover = document.getElementById("artistViewArtistCover");
const artistViewArtistName = document.getElementById("artistViewArtistName");
const artistViewAlbumList = document.getElementById("artistViewAlbumList");

let audioIsPlaying = true;
let artistsInfoList = {};

function getAllArtists() {
  fetch("/api/getAllArtists").then(function(response) {
    return response.json();
  }).then(function(data) {
    for (let i = 0; i<data.length; i++) {
      addArtistToGrid(data[i]);
      artistsInfoList[data[i].artist_id] = {"artistName": data[i].artist_name, "artistCoverImage": data[i].artist_cover_image};
    }
  }).catch(function(err) {
    console.warn('Fetch Error :-S', err);
  });
}

function addArtistToGrid(artist) {
  let newArtistForGrid = document.createElement("img");
  newArtistForGrid.classList.add("canBeClicked", "smallHover");
  newArtistForGrid.src = artist.artist_cover_image;
  newArtistForGrid.setAttribute("artistID", artist.artist_id);
  newArtistForGrid.onclick = loadArtistPage;
  allArtistsGrid.appendChild(newArtistForGrid);
}

function loadArtistPage(event) {
  let selectedArtistID = event.target.getAttribute("artistID");
  allArtistsGrid.style.display = "none";
  artistView.style.display = "block";
  artistViewArtistCover.src = artistsInfoList[selectedArtistID].artistCoverImage;
  artistViewArtistName.innerText = artistsInfoList[selectedArtistID].artistName;
  getAlbumsFromArtist(selectedArtistID);
}

function getAlbumsFromArtist(artistID) {
  fetch("/api/getAlbumsFromArtist?artistID=" + artistID).then(function(response) {
    return response.json();
  }).then(function(data) {
    for (let i = 0; i<data.length; i++) {
      addAlbumToArtistGrid(data[i])
    }
  }).catch(function(err) {
    console.warn('Fetch Error :-S', err);
  });
}

function addAlbumToArtistGrid(album) {
  let newAlbumForGrid = document.createElement("img");
  newAlbumForGrid.classList.add("canBeClicked", "smallHover");
  newAlbumForGrid.src = album.album_cover_image;
  newAlbumForGrid.setAttribute("albumID", album.album_id);
  // newAlbumForGrid.onclick = none;
  artistViewAlbumList.appendChild(newAlbumForGrid);
}

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
  currentPlayTime.innerHTML = Math.floor(mainAudioSource.currentTime / 60) + ":" + Math.floor(mainAudioSource.currentTime % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + " <br> " + Math.floor(mainAudioSource.duration / 60) + ":" + Math.floor(mainAudioSource.duration % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
  if (mainAudioSource.currentTime >= mainAudioSource.duration) {
    toggleAudio();
  }
}

function setCurrentAudioTrack(trackTitle, albumTitle, albumCoverImage, audioFile) {
  currentTrackTitle.innerText = trackTitle;
  currentAlbumTitle.innerText = albumTitle;
  currentAlbumCover.src = albumCoverImage;
  mainAudioSource.src = audioFile;
  setTimeout(() => {
    currentPlayTime.innerHTML = "0:00 <br> " + Math.floor(mainAudioSource.duration / 60) + ":" + Math.floor(mainAudioSource.duration % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
  }, 300); // TODO: Find solution
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

getAllArtists();