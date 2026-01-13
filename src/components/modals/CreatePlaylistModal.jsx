import { useState } from "react";
import { PlaylistModel, FolderModel } from "../../models/LibraryModels.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faFolderPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function CreatePlaylistModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("playlist"); // "playlist" or "folder"

  const handleCreate = () => {
    if (!name.trim()) return;

    const newItem =
      type === "playlist"
        ? PlaylistModel(name.trim())
        : FolderModel(name.trim());
    onCreate(newItem);
    setName("");
    onClose();
  };

  // Do not render if not open
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-6 rounded-lg w-150 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-2xl font-semibold">Create New</h2>

            <button
              onClick={onClose}
              className="!bg-transparent text-gray-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faXmark} size="md" />
            </button>
          </div>
          <div className="flex items-center mb-4 space-x-2">
            <button
              onClick={() => setType("playlist")}
              className={`flex-1 !py-2 !px-4 rounded ${
                type === "playlist"
                  ? "!bg-purple-600 text-white"
                  : "!bg-gray-700 !hover:bg-gray-600 text-white"
              }`}
            >
              <FontAwesomeIcon icon={faMusic} className="mr-2" />
              Playlist
            </button>
            <button
              onClick={() => setType("folder")}
              className={`flex-1 !py-2 !px-4 rounded ${
                type === "folder"
                  ? "!bg-purple-600 text-white"
                  : "!bg-gray-700 !hover:bg-gray-600 text-white"
              }`}
            >
              <FontAwesomeIcon icon={faFolderPlus} className="mr-2" />
              Folder
            </button>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={type === "playlist" ? "Playlist Name" : "Folder Name"}
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCreate}
              disabled={!name.trim()}
              className={`!bg-green-500 !hover:bg-purple-700 !text-white w-full py-2 px-4 rounded 
                ${!name.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
