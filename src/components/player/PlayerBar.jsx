import { useMusic } from "../../hooks/useMusic.jsx";
import {
  faBackward,
  faForward,
  faPlay,
  faPause,
  faShuffle,
  faRepeat,
  faList,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProgressBar from "../player/ProgressBar.jsx";
import VolumeControl from "../player/VolumeControl.jsx";

export default function PlayerBar() {
  const { currentTrack, isPlaying, togglePlay, playNextTrack, playPrevTrack } =
    useMusic();
  //console.log("Rendering PlayerBar:", { currentTrack, isPlaying });

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-90 text-white p-4 flex items-center justify-between z-50 shadow-lg">
      {/* Track Info */}

      <div className="flex items-center space-x-4 w-1/4">
        {currentTrack && (
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-lg object-cover shadow-md"
          />
        )}
        <div>
          <p className="font-semibold">{currentTrack?.title || "No Track"}</p>
          <p className="text-sm text-gray-400">{currentTrack?.artist}</p>
        </div>
      </div>

      {/* Controls + ProgressBar */}
      <div className="w-2/4 flex flex-col items-center">
        <div className="flex items-center space-x-6 mb-2">
          <FontAwesomeIcon
            icon={faShuffle}
            className="text-gray-400 hover:text-white cursor-pointer"
          />

          {/* Backward Button */}
          <button
            onClick={playPrevTrack}
            className="!p-0 !bg-transparent !outline-none !border-none hover:scale-110 transition"
          >
            <FontAwesomeIcon
              icon={faBackward}
              className="text-gray-300 hover:text-white cursor-pointer"
            />
          </button>

          {/* Play Button */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 !bg-white text-black !rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>

          {/* Forward Button */}
          <button
            onClick={playNextTrack}
            className="!p-0 !bg-transparent !outline-none !border-none hover:scale-110 transition"
          >
            <FontAwesomeIcon
              icon={faForward}
              className="text-gray-300 hover:text-white cursor-pointer"
            />
          </button>

          <FontAwesomeIcon
            icon={faRepeat}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
        </div>

        <ProgressBar />
      </div>

      {/* Volume Control */}
      <div className="w-1/4 flex items-center justify-end space-x-6 text-gray-300">
        <FontAwesomeIcon
          icon={faList}
          className="hover:text-white cursor-pointer"
        />

        <VolumeControl />

        <FontAwesomeIcon
          icon={faExpand}
          className="hover:text-white cursor-pointer"
        />
      </div>
    </div>
  );
}
