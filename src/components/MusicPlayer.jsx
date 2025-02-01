import React, { useEffect, useState, useRef } from "react";
import { Play, Pause } from "lucide-react"; // Import Play/Pause icons
import MusicControls from "./MusicControls";

function MusicPlayer({
  currentSong = null,
  setCurrentSong = () => {},
  playNextSong = () => {},
  playPreviousSong = () => {},
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const playerRef = useRef(null);
  const playerInstance = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      playerInstance.current.pauseVideo();
    } else {
      playerInstance.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const onPlayerReady = (event) => {
    setLoading(false);
  };

  const handleVideoEnds = () => {
    playNextSong();
  };

  const loadYouTubeIframeAPI = () => {
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }
  };

  const createPlayer = () => {
    if (playerInstance.current) {
      playerInstance.current.destroy();
    }

    playerInstance.current = new window.YT.Player(playerRef.current, {
      videoId: currentSong?.snippet?.resourceId?.videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          } else if (event.data === window.YT.PlayerState.ENDED) {
            handleVideoEnds();
          }
        },
      },
    });
  };

  useEffect(() => {
    loadYouTubeIframeAPI();
    setLoading(true);
    setIsPlaying(false);
    return () => {
      if (playerInstance.current) {
        playerInstance.current.destroy();
      }
    };
  }, [currentSong]);

  return (
    <div className="flex grow-1 flex-col items-center space-y-4">
      <div className="h-[20rem] w-[20rem] rounded-4xl overflow-hidden">
        <img
          src={
            currentSong?.snippet?.thumbnails?.high?.url ||
            "https://via.placeholder.com/300"
          }
          alt={currentSong?.snippet?.title || "Song Thumbnail"}
          className="h-full w-full object-cover object-center scale-150"
        />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-3xl text-center line-clamp-1 max-w-[30ch]">
          {currentSong?.snippet?.title || "Select a song"}
        </h2>
        <h3 className="text-xl">
          {currentSong?.snippet?.channelTitle || "Unknown Artist"}
        </h3>

        {/* YouTube Iframe Player */}
        {currentSong && (
          <div
            ref={playerRef}
            className="invisible w-0 h-0 absolute top-0 left-0"
          ></div>
        )}

        <MusicControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          playNextSong={playNextSong}
          playPreviousSong={playPreviousSong}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default MusicPlayer;
