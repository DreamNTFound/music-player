import { useState } from "react";
import SonicWaveCover from "../../assets/images/music-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faLayerGroup,
  faCirclePlus,
  faHeart,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import CreatePlaylistModal from "../modals/CreatePlaylistModal.jsx";

export default function Sidebar({ setIsCreatePLModalOpen }) {
  const getInitialCollapsed = () => {
    if(typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width >= 768 && width < 1024) return true; // Show collapsed if tablet
      if (width >= 1024) return false; // Hides collapsed if laptop+
    }
    return true; // fallback (tablet default)
  }

  const [collapsed, setCollapsed] = useState(getInitialCollapsed);

  // Handle creating a new playlist (by the Modal)
  

  const sections = [
    {
      label: "Menu",
      items: [
        { icon: faHouse, label: "Home", path: "/" },
        { icon: faSearch, label: "Search", path: "search" },
        { icon: faLayerGroup, label: "Your Library", path: "your-library" },
      ],
    },

    {
      label: "Playlists",
      items: [
        { icon: faCirclePlus, label: "Create Playlist", isCreate: true },
        { icon: faHeart, label: "Liked Songs", path: "liked-songs" },
      ],
    },
  ];

  return (
    <div
      className={`relative h-full flex-shrink-0 bg-black text-white p-4 transition-[width] duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-11 -right-4 !p-2 
        !rounded-full text-black !bg-purple-600
        flex items-center justify-center
        shadow-md hover:scale-105
        transition-all duration-300
        z-50 !outline-none
        md:block lg:hidden"
      >
        <FontAwesomeIcon
          icon={collapsed ? faChevronRight : faChevronLeft}
          size="sm"
        />
      </button>

      {/* Logo */}
      <div className="mt-6 flex items-center justify-center">
        <img
          src={SonicWaveCover}
          alt={SonicWaveCover}
          className="w-10 h-10 rounded-md"
        />
        {!collapsed && (
          <span className="ml-2 font-bold text-2xl truncate">SonicWave</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex flex-col gap-8">
        {sections.map((section, sidx) => (
          <div key={sidx}>
            {/* Section Label */}
            {!collapsed && (
              <p className="px-2 mb-3 text-xs uppercase text-gray-400 font-semibold">
                {section.label}
              </p>
            )}

            {/* Section Items */}
            <div className="flex flex-col gap-2">
              {section.items.map((item, idx) => {
                if (item.isCreate) {
                  return (
                    <button
                      key={idx}
                      onClick={() => setIsCreatePLModalOpen(true)}
                      className="flex items-center gap-3 !px-3 !py-2 rounded-md transition text-white !bg-gray-800/70 hover:!bg-purple-700/30 hover:scale-105"
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-[#646cff]"
                      />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </button>
                  );
                }
                return (
                  <NavLink
                    key={idx}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-md transition !text-white
                     hover:scale-105 transition
                     ${
                       isActive
                         ? "bg-purple-700/40 text-white"
                         : "text-gray-300 hover:text-white hover:bg-purple-700/30"
                     }`
                    }
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-[#646cff]"
                    />
                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
