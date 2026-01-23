from mutagen.easyid3 import EasyID3
import os
from colorama import init as colorama_init
from colorama import Fore
from colorama import Style
import sqlite3
import re

connection = sqlite3.connect("analyser.db")
cursor = connection.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS artists (artist_id TEXT PRIMARY KEY UNIQUE,artist_name TEXT,artist_cover_image TEXT)")
cursor.execute("CREATE TABLE IF NOT EXISTS albums (album_id TEXT PRIMARY KEY UNIQUE,album_name TEXT,album_cover_image TEXT,artist_id TEXT,FOREIGN KEY (artist_id) REFERENCES artists(artist_id))")
cursor.execute("CREATE TABLE IF NOT EXISTS audioTracks (audioTrack_id TEXT PRIMARY KEY UNIQUE,audioTrack_name TEXT,audioTrack_number Int,audioTrack_location TEXT,album_id TEXT,FOREIGN KEY (album_id) REFERENCES albums(album_id))")

basedir = ""


def getArtists():
  artists = os.listdir(basedir)[0:7]
  artists.sort()
  return artists


def getAlbumsByArtist(artist):
  albums = os.listdir(basedir + artist)
  albums.sort()
  return albums


def getTracksByAlbum(artist, album):
  tracks = os.listdir(basedir + artist + "/" + album)
  tracks.sort()
  return tracks


def saveArtistToDatabase(artist):
  command = f"INSERT INTO artists (artist_id, artist_name, artist_cover_image) VALUES ('{re.sub('\\W+','', artist.lower())}', '{artist}', NULL)"
  cursor.execute(command)
  connection.commit()


def saveAlbumToDatabase(artist, album):
  command = f"INSERT INTO albums (album_id, album_name, album_cover_image, artist_id) VALUES ('{re.sub('\\W+','', artist.lower()) + re.sub('\\W+','', album.lower())}', '{album}', NULL, '{re.sub('\\W+','', artist.lower())}')"
  cursor.execute(command)
  connection.commit()


artists = getArtists()

for artist in artists:
  if artist == ".DS_Store":
    continue
  print(Fore.GREEN + artist + Style.RESET_ALL)
  saveArtistToDatabase(artist)

  if not os.path.isdir(basedir + artist):
    continue

  albums = getAlbumsByArtist(artist)
  for album in albums:
    if album == ".DS_Store":
      continue
    print(Fore.BLUE + album + Style.RESET_ALL)
    saveAlbumToDatabase(artist, album)

    if not os.path.isdir(basedir + artist + "/" + album):
      continue

    tracks = getTracksByAlbum(artist, album)
    for track in tracks:
      if track == ".DS_Store":
        continue
      audio = EasyID3(basedir + artist + "/" + album + "/" + track)
      if audio != {}:
        # print(audio)
        print(f"File '{track}': '{audio["title"][0]}' by '{audio["artist"][0]}', Album '{audio["album"][0]}'")
      else:
        print(track)

connection.commit()