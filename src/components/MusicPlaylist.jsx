import React from "react";

function MusicPlaylist({
  songs = [],
  setCurrentSong = () => {},
  currentSong = null,
}) {
  const currentSongId = currentSong?.id;

  return (
    <div className="shrink-0 h-full w-full md:w-1/3 max-h-[90vh] bg-zinc-800 p-4 rounded-xl overflow-y-auto">
      <div className="flex flex-col gap-y-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className={`flex items-center gap-x-4 cursor-pointer hover:bg-zinc-700 p-2 rounded-md ${
              currentSongId === song.id ? "bg-zinc-700" : ""
            }`}
            onClick={() => setCurrentSong(song)}
          >
            <div className="h-16 w-16 shrink-0 bg-zinc-700 rounded-md overflow-hidden">
              <img
                src={song?.snippet?.thumbnails?.default?.url}
                alt="Album cover"
                className="h-full w-full object-cover scale-150"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg line-clamp-2">{song?.snippet?.title}</h2>
              <h3 className="text-sm">{song.artist}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicPlaylist;
