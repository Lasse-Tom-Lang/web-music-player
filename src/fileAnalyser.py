from mutagen.easyid3 import EasyID3
import os
from colorama import init as colorama_init
from colorama import Fore
from colorama import Style

basedir = ""

artists = os.listdir(basedir)[0:7]
artists.sort()

for artist in artists:
  if artist == ".DS_Store":
    continue
  print(Fore.GREEN + artist + Style.RESET_ALL)
  if not os.path.isdir(basedir + artist):
    continue
  albums = os.listdir(basedir + artist)
  albums.sort()
  for album in albums:
    if album == ".DS_Store":
      continue
    print(Fore.BLUE + album + Style.RESET_ALL)
    if not os.path.isdir(basedir + artist + "/" + album):
      continue
    tracks = os.listdir(basedir + artist + "/" + album)
    tracks.sort()
    for track in tracks:
      if track == ".DS_Store":
        continue
      audio = EasyID3(basedir + artist + "/" + album + "/" + track)
      if audio != {}:
        print(f"File '{track}': '{audio["title"][0]}' by '{audio["artist"][0]}', Album '{audio["album"][0]}'")
      else:
        print(track)