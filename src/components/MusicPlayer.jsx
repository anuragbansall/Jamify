import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react"; // Import Play/Pause icons

function MusicPlayer({ currentSong = null, setCurrentSong = () => {} }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="h-[20rem] w-[20rem] rounded-4xl overflow-hidden">
        <img
          src={
            currentSong?.snippet?.thumbnails?.high?.url ||
            "https://via.placeholder.com/300"
          }
          alt={currentSong?.snippet?.title || "Song Thumbnail"}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl text-center line-clamp-1 max-w-[30ch]">
          {currentSong?.snippet?.title || "Select a song"}
        </h2>
        <h3 className="text-xl">
          {currentSong?.snippet?.channelTitle || "Unknown Artist"}
        </h3>

        {/* Hidden Audio Player */}
        {currentSong && (
          <iframe
            width="1"
            height="1"
            style={{ visibility: "hidden", position: "absolute" }}
            src={`https://www.youtube.com/embed/${
              currentSong?.snippet?.resourceId?.videoId
            }?autoplay=${isPlaying ? 1 : 0}&controls=0&loop=1`}
            allow="autoplay"
          ></iframe>
        )}

        {/* Music Controls */}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
