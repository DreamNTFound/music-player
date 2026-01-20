import { useRef, useState, useEffect } from "react";
import { useMusic } from "../../hooks/useMusic.jsx";

export default function QuickPicks() {
  const { recommendation, playTrack } = useMusic();
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButton = () => {
    if (!carouselRef.current) return;

    const left = carouselRef.current.scrollLeft > 0;
    const right = carouselRef.current.scrollLeft + carouselRef.current.clientWidth <
        carouselRef.current.scrollWidth - 1;
    

    setCanScrollLeft((prev) => (prev !== left ? left : prev));
    setCanScrollRight((prev) => (prev !== right ? right : prev));
  };

  useEffect(() => {
    updateScrollButton();
  }, [recommendation]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new ResizeObserver(updateScrollButton);
    observer.observe(carouselRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollByAmount = (dir) => {
    if (!carouselRef.current) return;

    const card = carouselRef.current.querySelector("[data-card]");
    if (!card) return;

    const cardWidth = card.offsetWidth + 16;
    carouselRef.current.scrollBy({
      left: dir === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* <section className="mt-6">
        <h2 className="text-white font-extrabold text-2xl mt-8 mb-8">
          Quick Picks
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 truncate">
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
              <div className="ml-4 truncate">
                <p className="text-white dark:text-white font-medium">{quick_picks.title}</p>
              </div>
            </button>
          ))}
        </div>
      </section> */}

      <section className="mt-6">
        <h2 className="text-white font-extrabold text-2xl mt-8 mb-6">
          Quick Picks
        </h2>
        <div className="relative">
          <div
            ref={carouselRef}
            onScroll={updateScrollButton}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
          >
            {/* Slides */}
            {recommendation.map((slide) => (
              <button
                data-card
                key={slide.id}
                onClick={() => playTrack(slide)}
                className="flex flex-col md:flex-row flex-shrink-0 items-center gap-4 !p-3 !bg-gray-800/20 !rounded-xl hover:!bg-gray-700/30 transition"
              >
                <img
                  src={slide.cover}
                  alt={slide.cover}
                  className="wu-full h-32 md:w-14 md:h-14 rounded-lg object-cover flex-shrink-0"
                />

                <div className="w-full text-center truncate md:text-left min-w-0">
                  <p className="text-white font-medium truncate">
                    {slide.title}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {slide.artist}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Prev Button */}
          {canScrollLeft && (
            <button
              onClick={() => scrollByAmount("prev")}
              className="
                      flex
                      absolute left-2 top-1/2 -translate-y-1/2
                      !bg-black/60 text-white w-8 h-8
                      !rounded-full items-center justify-center
                      hover:bg-black
                    "
            >
              ‹
            </button>
          )}

          {/* Next Button */}
          {canScrollRight && (
            <button
              onClick={() => scrollByAmount("next")}
              className="
                      flex
                      absolute right-2 top-1/2 -translate-y-1/2
                      !bg-black/60 text-white w-8 h-8
                      !rounded-full items-center justify-center
                      hover:bg-black
                    "
            >
              ›
            </button>
          )}
        </div>
      </section>
    </>
  );
}
