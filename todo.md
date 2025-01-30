# TODO List

## 1. Implement React Context / Redux

- Set up React Context or Redux to manage global state for the music player.
- Manage the current song, play/pause status, and other player states globally.

## 2. Backend for Sending Audio Instead of Rendering iframe

- Set up a backend server to send audio directly to the frontend instead of embedding YouTube iframes.
- Create API endpoints that return audio streams or URLs for the audio files.
- Modify the frontend to play audio from the backend.

## 3. Make Music Player Controller

- Create a music player controller with functionality such as play/pause, next, and previous.
- Implement the play/pause toggle button.
- Implement the next/previous song navigation.
- Show song details like title, artist, and album in the player UI.

## 4. Autoplay Next Music Once Over

- Implement autoplay functionality so that when the current song ends, the next song starts automatically.
- Ensure that once the current song finishes, it triggers a state update that selects the next song.