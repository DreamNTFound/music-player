export const LibraryContent = ({ item }) => {
  if (!item)
    return <p className="text-gray-400">Select a playlist or folder.</p>;

  if (item.type === "playlist" || item.type === "liked") {
    return (
      <div>
        <h1 className="text-4xl font-bold text-white mb-4">{item.name}</h1>
        {item.songs.length > 0 ? (
          <ul className="space-y-2">
            {item.songs.map((song) => (
              <li key={song.id} className="flex justify-between text-gray-300">
                <span>{song.title}</span>
                <span>{song.duration}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">This playlist is empty.</p>
        )}
      </div>
    );
  }
}
