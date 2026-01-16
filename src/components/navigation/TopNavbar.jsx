import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLayerGroup,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import SonicWaveCover from "../../assets/images/music-logo.png";
import { NavLink } from "react-router-dom";

export default function TopNavBar() {
  return (
    <>
      <header className="h-16 bg-black border-b border-white/10 flex items-center justify-between px-4">
        {/* Left Logo */}
        <div className="flex items-center gap-2">
          <img
            src={SonicWaveCover}
            alt={SonicWaveCover}
            className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center"
          />
          <span className="text-lg font-bold text-white">SonicWave</span>
        </div>

        {/* Right Navigation */}
        <nav className="flex items-center gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-white" : "text-gray-400"}`
            }
          >
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-white" : "text-gray-400"}`
            }
          >
            <FontAwesomeIcon icon={faSearch} />
          </NavLink>
          <NavLink
            to="/your-library"
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-white" : "text-gray-400"}`
            }
          >
            <FontAwesomeIcon icon={faLayerGroup} />
          </NavLink>
        </nav>
      </header>
    </>
  );
}
