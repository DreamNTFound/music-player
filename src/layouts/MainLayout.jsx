import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import PlayerBar from "../components/player/PlayerBar.jsx";
import { useMusic } from "../hooks/useMusic.jsx";
import { LikedSongsModel } from "../models/LibraryModels.jsx";
import { loadLibrary, saveLibrary } from "../utils/localStorage.js";
import { SoundTracks } from "./../data/Songs";

export default function MainLayout() {
  const { currentTrack, likedTrackIds } = useMusic();
  const location = useLocation();
  //const params = useParams(); // Get item id from URL

  // Initialize libraryItems from localStorage or default Liked Songs
  const [libraryItems, setLibraryItems] = useState(() => {
    const saved = loadLibrary();
    return saved.length > 0 ? saved : [LikedSongsModel()];
  });

  // Save changes to localStorage whenever libraryItems updates
  useEffect(() => {
    saveLibrary(libraryItems);
  }, [libraryItems]);

  // Sync liked tracks into Liked Songs folder
  const libraryItemsWithLikes = libraryItems.map((item) => {
    if (item.type === "liked") {
      return {
        ...item,
        songs: SoundTracks.filter((track) => likedTrackIds.includes(track.id)),
      };
    }
    return item; // playlist/folders remains unchanged
  });

  return (
    <>
      <div className="h-screen w-screen flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          libraryItems={libraryItems}
          setlibraryItems={setLibraryItems}
        />
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-28 max-w-full bg-[#1a1a1a]">
            <div key={location.pathname} className="animate-fade-in">
              <Outlet context={{ libraryItems : libraryItemsWithLikes }} />
            </div>
          </main>
          {/* FOOTER PLAYER */}
          {currentTrack && (
            <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between">
              <PlayerBar />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
