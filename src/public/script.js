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
const albumView = document.getElementById("albumView");
const albumViewAlbumCover = document.getElementById("albumViewAlbumCover");
const albumViewAlbumName = document.getElementById("albumViewAlbumName");
const albumViewTrackList = document.getElementById("albumViewTrackList");

let artistsInfoList = {};
let albumInfoList = {};
let trackList = {};

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
      albumInfoList[data[i].album_id] = {"albumName": data[i].album_name, "albumCoverImage": data[i].album_cover_image, "artistID": data[i].artist_id};
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
  newAlbumForGrid.onclick = loadAlbumPage;
  artistViewAlbumList.appendChild(newAlbumForGrid);
}

function loadAlbumPage(event) {
  let selectedAlbumID = event.target.getAttribute("albumID");
  allArtistsGrid.style.display = "none";
  artistView.style.display = "none";
  albumView.style.display = "block";
  albumViewAlbumCover.src = albumInfoList[selectedAlbumID].albumCoverImage;
  albumViewAlbumName.innerText = albumInfoList[selectedAlbumID].albumName;
  getAlbum(selectedAlbumID);
}

function getAlbum(albumID) {
  fetch("/api/getAudioTrackFromAlbum?albumID=" + albumID).then(function(response) {
    return response.json();
  }).then(function(data) {
    trackList = {};
    for (let i = 0; i<data.length; i++) {
      addTrackToAlbumTrackList(data[i]);
      trackList[data[i].audioTrack_id] = {"audioTrackName": data[i].audioTrack_name, "audioTrackLocation": data[i].audioTrack_location, "audioTrackNumber": data[i].audioTrack_number, "albumID": data[i].album_id};
    }
  }).catch(function(err) {
    console.warn('Fetch Error :-S', err);
  });
}

function addTrackToAlbumTrackList(audioTrack) {
  let newTrackForList = document.createElement("div");
  newTrackForList.classList.add("trackListItem")
  newTrackForList.setAttribute("audioTrackID", audioTrack.audioTrack_id);
  newTrackForList.onclick = setSelectedAudioTrack;
  let newTrackForListSpan = document.createElement("span");
  newTrackForListSpan.innerText = audioTrack.audioTrack_number;
  newTrackForListSpan.setAttribute("audioTrackID", audioTrack.audioTrack_id);
  let newTrackForListP = document.createElement("p");
  newTrackForListP.innerText = audioTrack.audioTrack_name;
  newTrackForListP.setAttribute("audioTrackID", audioTrack.audioTrack_id);
  newTrackForList.appendChild(newTrackForListSpan);
  newTrackForList.appendChild(newTrackForListP);
  albumViewTrackList.appendChild(newTrackForList);
}

function setSelectedAudioTrack(event) {
  let selectedAudioTrackID = event.target.getAttribute("audioTrackID");
  setCurrentAudioTrack(trackList[selectedAudioTrackID].audioTrackName, albumInfoList[trackList[selectedAudioTrackID].albumID].albumName, albumInfoList[trackList[selectedAudioTrackID].albumID].albumCoverImage, trackList[selectedAudioTrackID].audioTrackLocation);
}

function toggleAudio() {
  if (mainAudioSource.paused) {
    playAudio();
    return;
  }
  pauseAudio();
}

function pauseAudio() {
  playButton.src = "icons/play.svg";
  mainAudioSource.pause()
}

function playAudio() {
  playButton.src = "icons/pause.svg";
  mainAudioSource.play()
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
  setPlayBarFill(0);
  playAudio();
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

mainAudioSource.onpause = pauseAudio;

mainAudioSource.onplay = playAudio;

getAllArtists();