import React, { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react"; // Import Play/Pause icons
import MusicControls from "./MusicControls";

function MusicPlayer({
  currentSong = null,
  setCurrentSong = () => {},
  playNextSong = () => {},
  playPreviousSong = () => {},
}) {
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
        <MusicControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playNextSong={playNextSong}
          playPreviousSong={playPreviousSong}
        />
      </div>
    </div>
  );
}

export default MusicPlayer;
