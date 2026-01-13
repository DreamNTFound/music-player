import { SoundTracks } from "../../data/Songs.jsx";
import { useMusic } from "../../hooks/useMusic.jsx";

export default function SearchResults({ query }) {
  const { playTrack, currentTrack } = useMusic();

  const result = SoundTracks.filter(
    (track) =>
      track.title.toLowerCase().includes(query.toLowerCase()) ||
      track.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
        {result.map((song) => (
          <div
            key={song.id}
            onClick={() => playTrack(song)}
            className={`p-2 bg-gray-800 rounded-md hover:bg-gray-700 cursor-pointer
              ${currentTrack?.id === song.id ? "bg-blue-600" : "bg-gray-800"}
              `}
          >
            <img
              src={song.cover}
              alt={song.cover}
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-white mt-2">{song.title}</p>
            <p className="text-gray-400 text-sm">{song.artist}</p>
          </div>
        ))}
      </div>
    </>
  );
}
