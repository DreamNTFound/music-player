import { NavLink, useOutletContext } from "react-router-dom";
import { faHeart, faFolder, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MusicLibrary() {
  const { libraryItems } = useOutletContext();
  console.log(libraryItems);
  
  return (
    <>
      <div className="p-4">
        <div className="p-4 border-b border-gray-800">
          <h1 className="!text-2xl font-bold">Your Library</h1>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {libraryItems.map((item) => (
            <NavLink
              key={item.id}
              to={`/your-library/${item.id}`}
              className="bg-[#1a1a1a] p-4 !rounded-lg hover:bg-gray-700 cursor-pointer !text-white"
            >
              <div className="flex items-center justify-center h-28 mb-3 rounded bg-gradient-to-br from-purple-600 to-purple-400">
                <FontAwesomeIcon
                  icon={
                    item.type === "liked"
                      ? faHeart
                      : item.type === "folder"
                      ? faFolder
                      : faMusic
                  }
                  size="2x"
                />
              </div>
              <p className="font-semibold truncate">{item.name}</p>
              <p className="text-sm text-gray-400 truncate">
                {item.type === "liked" && `${item.songs.length} Liked Songs`}
                {item.type === "folder" && `${item.playlists.length} Playlist`}
                {item.type === "playlist" && `${item.songs.length} Songs`}
              </p>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
