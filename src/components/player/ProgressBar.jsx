import { useEffect, useState } from "react";
import { useMusic } from "../../hooks/useMusic.jsx";

export default function ProgressBar() {
  const { audioRef } = useMusic();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const update = () => setProgress(audioEl.currentTime);
    const load = () => setDuration(audioEl.duration || 0);

    audioEl.addEventListener("timeupdate", update);
    audioEl.addEventListener("loadedmetadata", load);

    if(!isNaN(audioEl.duration)) {
      setDuration(audioEl.duration);
    }

    return () => {
      audioEl.removeEventListener("timeupdate", update);
      audioEl.removeEventListener("loadedmetadata", load);
    };
  }, [audioRef]);

  const handleSeek = (e) => {
    if(!audioRef.current) return;
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setProgress(value);
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = String(Math.floor(time % 60)).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <div className="w-full flex items-center space-x-2">
      {/* Current Time */}
      <span className="text-xs text-gray-400 w-10">
        {formatTime(progress)}
      </span>

      <input
        type="range"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={handleSeek}
        className="w-full accent-white cursor-pointer custom-range"
      />

      {/* Total Time */}
      <span className="text-xs text-gray-400 w-10 text-right">
        {formatTime(duration)}
      </span>
    </div>
  );
}
