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
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-90 text-white p-3 sm:p-4 md:p-5 z-50 shadow-lg">
      {/* Track Info */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 flex-[1.2] min-w-0">
          {currentTrack && (
            <img
              src={currentTrack.cover}
              alt={currentTrack.title}
              className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover shadow-md flex-shrink-0"
            />
          )}
          <div className="min-w-0 flex flex-col">
            <p className="marquee font-semibold truncate !text-sm md:!text-base">
              <span>{currentTrack?.title || "No Track"}</span>
            </p>
            <p className="marquee text-sm text-gray-400 truncate !text-xs md:!text-sm">
              <span>{currentTrack?.artist}</span>
            </p>
          </div>
        </div>

        {/* Controls + ProgressBar */}
        <div className="flex items-center gap-3 flex-[1]">
          {/* Shuffle */}
          <button className="w-8 h-8 !p-0 !bg-transparent focus:!outline-none !border-none hover:scale-110 transition">
            <FontAwesomeIcon
              icon={faShuffle}
              className="text-gray-400 hover:text-white cursor-pointer"
            />
          </button>

          {/* Backward Button */}
          <button
            onClick={playPrevTrack}
            className="w-8 h-8 !p-0 !bg-transparent focus:!outline-none !border-none hover:scale-110 transition"
          >
            <FontAwesomeIcon
              icon={faBackward}
              className="text-gray-300 hover:text-white cursor-pointer"
            />
          </button>

          {/* Play Button */}
          <button
            onClick={togglePlay}
            className="w-12 h-12 !bg-white text-black !rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>

          {/* Forward Button */}
          <button
            onClick={playNextTrack}
            className="w-8 h-8 !p-0 !bg-transparent focus:!outline-none !border-none hover:scale-110 transition"
          >
            <FontAwesomeIcon
              icon={faForward}
              className="text-gray-300 hover:text-white cursor-pointer"
            />
          </button>

          {/* Repeat */}
          <button className="w-8 h-8 !p-0 !bg-transparent focus:!outline-none !border-none hover:scale-110 transition">
            <FontAwesomeIcon
              icon={faRepeat}
              className="text-gray-400 hover:text-white cursor-pointer"
            />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-4 flex-shrink-0 min-w-[50px] justify-end text-gray-300">
          <FontAwesomeIcon
            icon={faList}
            className="hover:text-white cursor-pointer"
          />
          <div className="hidden md:flex items-center gap-4">
            <div className="min-w-[120px]">
              <VolumeControl />
            </div>
            <FontAwesomeIcon
              icon={faExpand}
              className="hover:text-white cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="w-full mt-2 px-2">
        <ProgressBar />
      </div>
    </div>
  );
}
