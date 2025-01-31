import React, { useEffect, useState } from "react";
import MusicPlayer from "./components/MusicPlayer";
import axios from "axios";
import MusicPlaylist from "./components/MusicPlaylist";

const API_KEY = import.meta.env.VITE_YT_API_KEY;
const PLAYLIST_ID = import.meta.env.VITE_PLAYLIST_ID;
const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await axios.get(API_URL);
        // console.log(response.data.items);
        setSongs(response.data.items || []);
        setCurrentSong(response.data.items[0] || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setError("Failed to fetch playlist");
        setLoading(false);
      }
    }

    fetchPlaylist();
  }, []);

  const playNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const playPreviousSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[previousIndex]);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-white bg-gradient-to-r from-zinc-950 to-cyan-950">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-white bg-gradient-to-r from-zinc-950 to-cyan-950">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-4 text-white flex flex-col md:flex-row items-center gap-y-[3rem] bg-gradient-to-r from-zinc-950 to-cyan-950">
      <MusicPlayer
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
      />
      <MusicPlaylist
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
      />
    </div>
  );
}

export default App;
