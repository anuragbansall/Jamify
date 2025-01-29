import React from "react";

function MusicPlaylist({
  songs = [],
  setCurrentSong = () => {},
  currentSong = null,
}) {
  return (
    <div className="shrink-0 h-full w-1/3 bg-zinc-800 p-4 rounded-xl overflow-y-auto">
      <div className="flex flex-col gap-y-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center gap-x-4 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
            onClick={() => setCurrentSong(song)}
          >
            <div className="h-16 w-16 shrink-0 bg-zinc-700 rounded-md overflow-hidden">
              <img
                src={song.snippet.thumbnails.default.url}
                alt="Album cover"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg line-clamp-2">{song.snippet.title}</h2>
              <h3 className="text-sm">{song.artist}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicPlaylist;
