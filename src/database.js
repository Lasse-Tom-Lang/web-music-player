import Database from 'better-sqlite3';

const database = new Database('./database.db');

const initDatabase = `
  CREATE TABLE IF NOT EXISTS artists (
    artist_id TEXT PRIMARY KEY UNIQUE,
    artist_name TEXT,
    artist_cover_image TEXT
  );
  CREATE TABLE IF NOT EXISTS albums (
    album_id TEXT PRIMARY KEY UNIQUE,
    album_name TEXT,
    album_cover_image TEXT,
    artist_id TEXT,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
  );
  CREATE TABLE IF NOT EXISTS audioTracks (
    audioTrack_id TEXT PRIMARY KEY UNIQUE,
    audioTrack_name TEXT,
    audioTrack_number Int,
    audioTrack_location TEXT,
    album_id TEXT,
    FOREIGN KEY (album_id) REFERENCES albums(album_id)
  );
`;

database.exec(initDatabase);

const addArtist = database.prepare(`
  INSERT INTO artists (artist_id, artist_name, artist_cover_image)
  VALUES (?, ?, ?)
`);

const addAlbum = database.prepare(`
  INSERT INTO albums (album_id, album_name, album_cover_image, artist_id)
  VALUES (?, ?, ?, ?)
`);

const addAudioTrack = database.prepare(`
  INSERT INTO audioTracks (audioTrack_id, audioTrack_name, audioTrack_number, audioTrack_location, album_id)
  VALUES (?, ?, ?, ?, ?)
`);

const getArtists = database.prepare('SELECT * FROM artists');
const getAlbums = database.prepare('SELECT * FROM albums WHERE artist_id == ?');
const getAudioTracks = database.prepare('SELECT * FROM audioTracks WHERE album_id == ? ORDER BY audioTrack_number');

export {
  addArtist,
  getArtists,
  addAlbum,
  getAlbums,
  addAudioTrack,
  getAudioTracks
};