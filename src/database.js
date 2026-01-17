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
`;

database.exec(initDatabase);

const addArtist = database.prepare(`
  INSERT INTO artists (artist_id, artist_name, artist_cover_image)
  VALUES (?, ?, ?)
`);

const getArtists = database.prepare('SELECT * FROM artists');

export {
  addArtist,
  getArtists
};