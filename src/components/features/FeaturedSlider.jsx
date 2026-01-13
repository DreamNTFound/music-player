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
            className={`p-4 w-full rounded-xl bg-gray-200 bg-gradient-to-b from-purple-700 to-black p-6 overflow-hidden transition-opacity duration-1000 ${
              i === index
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 absolute pointer-events-none"
            }`}
          >
            <h3 className="text-gray-400 text-xs font-extrabold ml-55">
              FEATURED TRACK
            </h3>
            <div className="flex items-center space-x-6">
              <img
                src={track.cover}
                alt={track.title}
                className="w-48 h-48 rounded-md"
              />
              <div className="">
                <h1 className="font-extrabold !text-5xl mt-2 mb-4 text-white">
                  {track.title}
                </h1>
                <div className="flex text-gray-400 font-extrabold text-sm mb-6">
                  <p className="mr-4">
                    <FontAwesomeIcon icon={track.icon[0]} className="mr-2" />
                    {track.artist}
                  </p>
                  <p className="mr-4">
                    <FontAwesomeIcon icon={track.icon[1]} className="mr-2"/>
                    {track.yearAdded}
                  </p>
                </div>
                {i === index && (
                  <div className="mt-4 mb-4 flex items-center transition-opacity duration-700 opacity-100">
                    <button
                      onClick={() => playTrack(activeTracks)}
                      className="!bg-green-500 p-2 !rounded-full text-black !font-bold hover:!bg-green-600 focus:!outline-none"
                    >
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      <span className="">Play Now</span>
                    </button>
                    <button className="!bg-gray-900 ml-4 p-2 !rounded-full text-white !font-bold border border-white hover:!bg-gray-800 focus:!outline-none">
                      Save to Library
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
