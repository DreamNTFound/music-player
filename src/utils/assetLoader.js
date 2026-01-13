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

// Import all cover files from image/categories
const categoryFiles = import.meta.glob(
    "../assets/images/categories/*.{png,jpg,jpeg}",
    { eager : true}
);

export const categoryCover = Object.fromEntries(
    Object.entries(categoryFiles).map(([path, mod]) => {
        const fileName = path
        .split("/")
        .pop()
        .replace(/\.(png|jpg|jpeg)$/i, "")
        .toLowerCase()
        .replace(/\s+/g, "-")

        return [fileName, mod.default];
    })
);

//console.log("path", categoryFiles);
