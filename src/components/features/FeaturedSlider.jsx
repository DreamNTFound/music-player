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
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        {FeaturedTracks.map((track, i) => (
          <div
            key={track.id}
            className={`p-4 w-full rounded-xl bg-gray-200 bg-gradient-to-br from-purple-800 to-black p-6 overflow-hidden transition-opacity duration-1000 ${
              i === index
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 absolute pointer-events-none"
            }`}
          >
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-gray-400 text-xs font-extrabold mb-2">
                FEATURED TRACK
              </h3>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={track.cover}
                alt={track.title}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-md object-cover"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="!text-2xl sm:!text-3xl md:!text-5xl font-extrabold mt-2 mb-4 text-white">
                  {track.title}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 text-gray-400 font-extrabold text-sm mb-6">
                  <p className="mr-4 flex items-center">
                    <FontAwesomeIcon icon={track.icon[0]} className="mr-2" />
                    {track.artist}
                  </p>
                  <p className="mr-4 flex items-center">
                    <FontAwesomeIcon icon={track.icon[1]} className="mr-2" />
                    {track.yearAdded}
                  </p>
                </div>
                {i === index && (
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 mb-4 transition-opacity duration-700 opacity-100 truncate">
                    <button
                      onClick={() => playTrack(activeTracks)}
                      className="!bg-green-500 p-2 !rounded-full text-black !font-bold hover:!bg-green-600 focus:!outline-none"
                    >
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      <span className="">Play Now</span>
                    </button>
                    <button className="!bg-gray-900 p-2 !rounded-full text-white !font-bold border border-white hover:!bg-gray-800 focus:!outline-none">
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
