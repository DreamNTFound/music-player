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
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-90 text-white p-3 sm:p-4 md:p-5 flex items-center z-50 shadow-lg">
      
      {/* Track Info */}
      <div className="flex items-center gap-3 flex-1 min-w-[140px] max-w-[280px]">
        {currentTrack && (
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover shadow-md flex-shrink-0"
          />
        )}
        <div className="min-w-0">
          <p className="font-semibold truncate">
            {currentTrack?.title || "No Track"}
          </p>
          <p className="text-sm text-gray-400 truncate">
            {currentTrack?.artist}
          </p>
        </div>
      </div>

      {/* Controls + ProgressBar */}
      <div className="flex flex-col items-center flex-2 mx-2 sm:mx-4 min-w-[200px]">
        <div className="flex items-center gap-5 mb-1">
          {/* Shuffle (hidden on mobile) */}
          <div className="hidden sm:block">
            <FontAwesomeIcon
              icon={faShuffle}
              className="text-gray-400 hover:text-white cursor-pointer"
            />
          </div>

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
          {/* Repeat (hidden on mobile) */}
          <div className="hidden sm:block">
            <FontAwesomeIcon
              icon={faRepeat}
              className="text-gray-400 hover:text-white cursor-pointer"
            />
          </div>
        </div>
        <div className="w-full px-2">
          <ProgressBar />
        </div>
      </div>

      {/* Volume Control */}
      <div className="hidden md:flex items-center gap-4 flex-shrink-0 min-w-[240px] justify-end text-gray-300">
        <FontAwesomeIcon
          icon={faList}
          className="hover:text-white cursor-pointer"
        />
        <div className="min-w-[120px]">
          <VolumeControl />
        </div>

        <FontAwesomeIcon
          icon={faExpand}
          className="hover:text-white cursor-pointer"
        />
      </div>
    </div>
  );
}
