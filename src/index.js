import express from "express";
const app = express();
import fs from "fs";
import {addArtist, getArtists, addAlbum, getAlbums, addAudioTrack, getAudioTracks} from "./database.js"

app.listen(80, () => {
  console.log("Server started on port 80");
});

app.use('/', express.static('./public/'));

app.get("/api/getAllArtists", (req, res) => {
  let allArtists = getArtists.all();
  res.status(200).json(allArtists);
});

app.get("/api/getAlbumsFromArtist", (req, res) => {
  let albumsByArtist = getAlbums.all(req.query.artistID);
  res.status(200).json(albumsByArtist);
});

app.get("/api/getAudioTrackFromAlbum", (req, res) => {
  let audioTracksByAlbum = getAudioTracks.all(req.query.albumID);
  res.status(200).json(audioTracksByAlbum);
});