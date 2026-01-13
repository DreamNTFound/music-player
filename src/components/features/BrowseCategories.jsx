export default function BrowseCategories() {
  const categories = [
    { id: 1, name: "Pop", image: "/src/assets/images/categories/pop-cat.jpg" },
    { id: 2, name: "Rock", image: "/src/assets/images/categories/rock-cat.jpg" },
    { id: 3, name: "Jazz", image: "/src/assets/images/categories/jazz-cat.jpg" },
    { id: 4, name: "Classical", image: "/src/assets/images/categories/classical-cat.jpg" },
    { id: 5, name: "Hip-Hop", image: "/src/assets/images/categories/hiphop-cat.jpg" },
    { id: 6, name: "Electronic", image: "/src/assets/images/categories/electronic-cat.jpg" },
    { id: 7, name: "Country", image: "/src/assets/images/categories/country-cat.jpg" },
    { id: 8, name: "Reggae", image: "/src/assets/images/categories/reggae-cat.jpg" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <p className="col-span-full text-2xl font-bold">Browse All</p>
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
