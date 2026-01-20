import { useState, useEffect } from "react";
import Sidebar from "../components/navigation/Sidebar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import PlayerBar from "../components/player/PlayerBar.jsx";
import { useMusic } from "../hooks/useMusic.jsx";
import { LikedSongsModel } from "../models/LibraryModels.jsx";
import { loadLibrary, saveLibrary } from "../utils/localStorage.js";
import { SoundTracks } from "./../data/Songs";
import TopNavBar from "../components/navigation/TopNavbar.jsx";
import CreatePlaylistModal from "../components/modals/CreatePlaylistModal";

export default function MainLayout() {
  const { currentTrack, likedTrackIds } = useMusic();
  const location = useLocation();
  const [isCreatePLModalOpen, setIsCreatePLModalOpen] = useState(false);
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

  const handleCreateLibraryItem = (items) => {
    //console.log("Creating playlist:", items);
    setLibraryItems((prev) => [...prev, items]);
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-col overflow-hidden">
        {/* Mobile TopNav */}
        <div className="md:hidden sticky top-0 z-40">
          <TopNavBar />
        </div>

        {/* BODY */}
        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex flex-shrink-0 bg-black overflow-visible">
            <Sidebar
              libraryItems={libraryItems}
              setlibraryItems={setLibraryItems}
              isCreatePLModalOpen={isCreatePLModalOpen}
              setIsCreatePLModalOpen={setIsCreatePLModalOpen}
              handleCreateLibraryItem={handleCreateLibraryItem}
            />
          </aside>
          {/* Right Side */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto px-6 md:p-6 pt-6 md:pt-6 pb-28 md:pb-28 max-w-full bg-[#1a1a1a]">
              <div key={location.pathname} className="animate-fade-in">
                <Outlet
                  context={{
                    libraryItems: libraryItemsWithLikes,
                    setIsCreatePLModalOpen,
                  }}
                />
              </div>
              <div className="bg-gray-800"></div>
            </main>
            {/* FOOTER PLAYER */}
            {currentTrack && (
              <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
                <PlayerBar />
              </div>
            )}
          </div>
        </div>

        {/* Create Playlist Modal */}
        <CreatePlaylistModal
          isOpen={isCreatePLModalOpen}
          onClose={() => setIsCreatePLModalOpen(false)}
          onCreate={handleCreateLibraryItem}
        />
      </div>
    </>
  );
}
