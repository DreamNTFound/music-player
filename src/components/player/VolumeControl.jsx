import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMusic } from "../../hooks/useMusic.jsx";

export default function VolumeControl() {
  const { volume, setVolume } = useMusic();

  const handleVolume = (e) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div className="flex items-center">
      <FontAwesomeIcon icon={faVolumeHigh} />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolume}
        className="w-24 accent-white cursor-pointer custom-range"
      />
    </div>
  );
}
