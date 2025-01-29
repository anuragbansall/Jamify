import React, { useEffect, useState } from "react";
import MusicPlayer from "./components/MusicPlayer";
import axios from "axios";
import MusicPlaylist from "./components/MusicPlaylist";

const API_KEY = import.meta.env.VITE_YT_API_KEY;
const PLAYLIST_ID = import.meta.env.VITE_PLAYLIST_ID;
const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const response = await axios.get(API_URL);
        setSongs(response.data.items);
        setCurrentSong(response.data.items[0]);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    }
    fetchPlaylist();
  }, []);

  if (!songs.length) {
    return (
      <div className="h-screen w-full flex justify-center items-center text-white bg-gradient-to-r from-zinc-950 to-cyan-950">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen w-full px-[8rem] py-[4rem] text-white flex justify-between items-center bg-gradient-to-r from-zinc-950 to-cyan-950">
      <MusicPlayer currentSong={currentSong} setCurrentSong={setCurrentSong} />
      <MusicPlaylist
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
      />
    </div>
  );
}

export default App;
