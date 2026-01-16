import DataTable from "react-data-table-component";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";
import { formatTime } from "../../utils/formatTime.js";
import { useMusic } from "../../hooks/useMusic.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useWindowWidth from "../../utils/useWindowWidth.js";

export default function TrackList({ tracks }) {
  const { playTrack, currentTrack, toggleLike, likedTrackIds } = useMusic();
  const windowWidth = useWindowWidth();

  const columns = [
    {
      name: <div className="w-full flex justify-center">#</div>,
      width: "60px",
      cell: (row, index) => {
        const isCurrent = currentTrack?.id === row.id;
        return (
          <span
            className={isCurrent ? "text-green-500 font-bold" : "text-gray-400"}
          >
            {isCurrent ? "▶" : index + 1}
          </span>
        );
      },
      style: {
        justifyContent: "center",
      },
    },

    {
      name: (
        <div className="w-full text-center sm:text-left">
          <span>Title</span>
        </div>
      ),
      selector: (row) => row.title,
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <img
            src={row.cover}
            alt={row.title}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded object-cover flex-shrink-0"
          />

          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
            <span className="font-medium text-white text-gray-200 !text-sm sm:text-base truncate">
              {row.title}
            </span>
            <span className="text-gray-400 text-xs sm:text-sm truncate">
              {row.artist}
            </span>
          </div>
        </div>
      ),
      style: {
        minWidth: "200px",
      },
    },

    ...(windowWidth >= 640
      ? [
          {
            name: (
              <div className="hidden sm:flex w-full flex items-center justify-center">
                Album
              </div>
            ),
            cell: (row) => (
              <div className="hidden sm:flex w-full text-center justify-center text-gray-400">
                {row.album}
              </div>
            ),
            style: { minWidth: 120 },
            omit: typeof window !== "undefined" && window.innerWidth < 640,
          },
        ]
      : []),

    {
      name: (
        <div className="w-full text-right">
          <FontAwesomeIcon icon={faClock} className="text-gray-500" />
        </div>
      ),
      cell: (row) => (
        <div className="w-full text-right text-gray-400">
          {formatTime(row.duration)}
        </div>
      ),
      style: { minWidth: "60px" },
    },
    {
      name: "",
      width: "60px",
      cell: (row) => (
        <button
          className="!p-2 like-btn opacity-0 transition-opacity duration-200"
          onClick={(e) => {
            e.stopPropagation(); // ⛔ prevent playTrack
            toggleLike(row.id); // Add/remove from liked tracks
            console.log("Liked:", likedTrackIds);
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={
              likedTrackIds.includes(row.id)
                ? "text-red-500" // Liked
                : "text-gray-400 hover:text-white" // Not Liked
            }
            size={18}
          />
        </button>
      ),
    },
  ];

  const customStyles = {
    table: { style: { backgroundColor: "transparent" } },
    headRow: {
      style: {
        backgroundColor: "transparent",
        borderBottom: "1px solid #374151",
      },
    },
    headCells: {
      style: {
        color: "#9ca3af",
        fontSize: "12px",
        fontWeight: "600",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    rows: {
      style: {
        backgroundColor: "transparent",
        color: "#e5e7eb",
        outline: "none",
        boxShadow: "none",
      },
      highlightOnHoverStyle: {
        borderBottom: "none",
        outline: "none",
        boxShadow: "none",
        backgroundColor: "#1f2937",
        cursor: "pointer",
      },
    },
    cells: {
      style: {
        paddingLeft: "12px",
        paddingRight: "12px",
      },
    },
  };

  return (
    <div className="mt-6">
      <h2 className="text-white font-extrabold text-2xl mt-8 mb-8">
        All Tracks
      </h2>

      <DataTable
        columns={columns}
        data={tracks}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        onRowClicked={(row) => playTrack(row, tracks)}
        conditionalRowStyles={[
          {
            when: (row) => row.id === currentTrack?.id,
          },
        ]}
      />
    </div>
  );
}
