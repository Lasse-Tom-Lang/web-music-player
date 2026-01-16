import { DatabaseSync } from 'node:sqlite';

const database = new DatabaseSync('./database.db');

const initDatabase = `
  CREATE TABLE IF NOT EXISTS atrists (
    artist_name TEXT PRIMARY KEY UNIQUE,
    artist_cover_image TEXT
  );
`;

database.exec(initDatabase);