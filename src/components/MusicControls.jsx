import React from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";

function MusicControls({
  isPlaying,
  togglePlay,
  playNextSong = () => {},
  playPreviousSong = () => {},
}) {
  return (
    <div className="flex items-center space-x-4 mt-6">
      <span
        className="text-white text-3xl cursor-pointer"
        onClick={playPreviousSong}
      >
        <MdSkipPrevious />
      </span>
      <span className="text-white text-3xl cursor-pointer" onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </span>
      <span
        className="text-white text-3xl cursor-pointer"
        onClick={playNextSong}
      >
        <MdSkipNext />
      </span>
    </div>
  );
}

export default MusicControls;
