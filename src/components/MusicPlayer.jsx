import React, { useEffect, useState, useRef } from "react";
import { Play, Pause } from "lucide-react"; // Import Play/Pause icons
import MusicControls from "./MusicControls";
import convertToAudio from "../utils/convertToAudio";

function MusicPlayer({
  currentSong = null,
  setCurrentSong = () => {},
  playNextSong = () => {},
  playPreviousSong = () => {},
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (currentSong) {
      convertToAudio(
        currentSong.snippet.resourceId.videoId,
        setLoading,
        setAudioUrl
      );
    }
  }, [currentSong]);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [audioUrl, isPlaying]);

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

        {/* Loading Spinner */}
        {loading && <div>Loading...</div>}

        {/* Hidden Audio Player */}
        {audioUrl && (
          <audio
            ref={audioRef}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
        )}

        {/* Music Controls */}
        {audioUrl && !loading && (
          <MusicControls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            playNextSong={playNextSong}
            playPreviousSong={playPreviousSong}
          />
        )}
      </div>
    </div>
  );
}

export default MusicPlayer;
