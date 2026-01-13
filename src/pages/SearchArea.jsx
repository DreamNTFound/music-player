import { useState } from "react";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BrowseCategories from "../components/features/BrowseCategories";
import SearchResults from "../components/features/SearchResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchArea() {
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="p-4 flex flex-col space-y-4">
        <div className="relative w-full">
          {/* Search Icon */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
          />
          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for songs, artists, albums..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 bg-white text-black placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {query.trim() === "" ? (
          <BrowseCategories />
        ) : (
          <SearchResults query={query} />
        )}
      </div>
    </>
  );
}
