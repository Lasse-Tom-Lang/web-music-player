import express from "express";
const app = express();
import fs from "fs";
import {addArtist, getArtists} from "./database.js"

app.listen(80, () => {
  console.log("Server started on port 80");
});

app.use('/', express.static('./public/'));

app.get("/api/getAllArtists", (req, res) => {
  let allArtists = getArtists.all();
  res.status(200).json(allArtists);
});