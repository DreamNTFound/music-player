import { useEffect, useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FeaturedTracks } from "../../data/FeaturedTracks.jsx";
import { useMusic } from "../../hooks/useMusic.jsx";

function FeaturedSlider() {
  const [index, setIndex] = useState(0);
  const { playTrack } = useMusic();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevTimer) => (prevTimer + 1) % FeaturedTracks.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const activeTracks = FeaturedTracks[index];

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-purple-800 to-black">
        {FeaturedTracks.map((track, i) => (
          <div
            key={track.id}
            className={`p-4 w-full rounded-xl transition-opacity duration-1000 ${
              i === index
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 absolute pointer-events-none"
            }`}
          >
            {/* Track Image */}
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6 p-4 w-full rounded-xl">

              <div className="flex justify-center md:justify-start w-full md:w-auto">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-64 sm:h-72 md:w-48 md:h-48 rounded-md object-cover"
                />
              </div>

              {/* Text and Buttons */}
              <div className="flex-1 flex flex-col md:flex-col text-left justify-start mt-4 md:mt-0">
                <h3 className="text-gray-400 text-xs font-extrabold mb-2">
                  FEATURED TRACK
                </h3>

                <h1 className="!text-3xl sm:!text-3xl md:!text-5xl font-extrabold mb-2 text-white truncate">
                  {track.title}
                </h1>

                <div className="flex flex-col md:flex-row flex-wrap md:justify-start gap-2 text-gray-400 font-semibold text-sm mb-2">
                  <p className="flex items-center gap-1">
                    <FontAwesomeIcon icon={track.icon[0]} className="mr-2" />
                    {track.artist}
                  </p>
                  <p className="flex items-center gap-1">
                    <FontAwesomeIcon icon={track.icon[1]} className="mr-2" />
                    {track.yearAdded}
                  </p>
                </div>

                {i === index && (
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-2 md:mt-4 justify-center md:justify-start">
                    <button
                      onClick={() => playTrack(activeTracks)}
                      className="!bg-green-500 p-2 !rounded-full text-black !font-bold hover:!bg-green-600 focus:!outline-none flex items-center justify-center gap-2"
                    >
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      <span className="">Play Now</span>
                    </button>
                    <button className="hidden md:inline !bg-gray-900 p-2 !rounded-full text-white !font-bold border border-white hover:!bg-gray-800 focus:!outline-none">
                      <span>Save to Library</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default FeaturedSlider;
