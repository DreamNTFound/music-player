export const formatTime = (sec) =>
    `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;