import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlay,
  faRandom,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import TrackList from "./../components/features/TrackList";
import { useOutletContext } from "react-router-dom";

export default function LikedSongs() {
  const { libraryItems } = useOutletContext();

  const likedFolder = libraryItems.find(item => item.type === "liked");
  const likedTracks = likedFolder?.songs || [];

  return (
    <div className="p-8 bg-gradient-to-b from-indigo-600/30 to-[#1a1a1a] min-h-screen text-white rounded-md">
      {/* Hero Section */}
      <div className="flex items-end mb-8">
        <div className="w-48 h-48 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center mr-4">
          <FontAwesomeIcon icon={faHeart} className="text-white text-6xl" />
        </div>
        <div>
          <p className="uppercase text-sm text-gray-400 mb-1">Playlist</p>
          <h1 className="text-5xl font-bold mb-2">Liked Songs</h1>
          <p className="text-gray-400">{likedTracks.length} songs</p>
        </div>
      </div>

      {/* Playlist Controls */}
      <div className="flex items-center space-x-4 mb-6">
        <button className="!bg-green-500 !hover:bg-green-600 !p-4 !rounded-full !border-none hover:scale-110 transition">
          <FontAwesomeIcon icon={faPlay} className="!text-black text-xl" />
        </button>
        <button className="!p-3 !bg-transparent !border-none !outline-none hover:scale-110">
          <FontAwesomeIcon icon={faRandom} />
        </button>
        <button className="!p-3 !bg-transparent !border-none !outline-none hover:scale-110">
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>

      {/* Songs Table */}
      <div className="w-full">
        <TrackList tracks={likedTracks}/>
      </div>
    </div>
  );
}
