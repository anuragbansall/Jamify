import axios from "axios";
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const convertToAudio = async (videoId, setLoading, setAudioUrl) => {
  setLoading(true);
  const options = {
    method: "GET",
    url: "https://youtube-mp36.p.rapidapi.com/dl",
    params: { id: videoId },
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data.status === "ok") {
      setAudioUrl(response.data.link);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

export default convertToAudio;
