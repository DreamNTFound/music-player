import DreamMusicCover from "../assets/images/dream-music.png";

// Import all mp3 files from audio
const audioFiles = import.meta.glob(
    "../assets/audio/DreamMusic/*.mp3",
    { eager : true }
);

// Convert into a usable map
export const audioMap = Object.fromEntries(
    Object.entries(audioFiles).map(([path, mod]) => {
        const fileName = path
        .split("/")
        .pop()
        .replace(".mp3", "")
        .toLowerCase()
        .replace(/\s+/g, "-");

        return [fileName, mod.default];
    })
);

//console.log("Audio map keys and URLs:", Object.entries(audioFiles));

export const coverImage = DreamMusicCover;