import { categoryCover } from "../../utils/assetLoader";


export default function BrowseCategories() {  
  const categories = [
    { id: 1, name: "Pop", image: categoryCover["pop-cat"] },
    { id: 2, name: "Rock", image: categoryCover["rock-cat"] },
    { id: 3, name: "Jazz", image: categoryCover["jazz-cat"] },
    { id: 4, name: "Classical", image: categoryCover["classical-cat"] },
    { id: 5, name: "Hip-Hop", image: categoryCover["hiphop-cat"] },
    { id: 6, name: "Electronic", image: categoryCover["electronic-cat"] },
    { id: 7, name: "Country", image: categoryCover["country-cat"] },
    { id: 8, name: "Reggae", image: categoryCover["reggae-cat"] },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <p className="col-span-full text-2xl font-bold text-white">Browse All</p>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="relative rounded-md overflow-hidden cursor-pointer hover:scale-105 transition"
        >
          <img
            src={cat.image}
            alt={cat.image}
            className="w-full h-32 object-cover"
          />
          <div className="absolute top-2 left-2 text-white font-bold">
            {cat.name}
          </div>
        </div>
      ))}
    </div>
  );
}
