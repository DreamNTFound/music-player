import { useMusic } from "../../hooks/useMusic.jsx";

export default function QuickPicks() {
  const { recommendation, playTrack } = useMusic();

  return (
    <>
      <section className="mt-6">
        <h2 className="text-white font-extrabold text-2xl mt-8 mb-8">
          Quick Picks
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {recommendation.map((quick_picks) => (
            <button
              key={quick_picks.id}
              onClick={() => playTrack(quick_picks)}
              className="flex items-center !p-0 !bg-gray-800"
            >
              <img
                src={quick_picks.cover}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="ml-4">
                <p className="text-white dark:text-white font-medium">{quick_picks.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
