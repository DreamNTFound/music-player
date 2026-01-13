import "./App.css";
import Homepage from "./pages/Home.jsx";
import SearchArea from "./pages/SearchArea.jsx";
import MusicLibrary from "./pages/MusicLibrary";
import MainLayout from "./layouts/MainLayout.jsx";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LikedSongs from "./pages/LikedSongs.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Sidebar path */}
            <Route index element={<Homepage />} />
            <Route path="search" element={<SearchArea />} />
            <Route path="your-library" element={<MusicLibrary />} />
            <Route path="liked-songs" element={<LikedSongs />} />

            {/* Library Items path */}
            <Route path="your-library/:id" element={<LikedSongs />} />
            <Route path="playlist/:id" element={<MusicLibrary />} />
            <Route path="folder/:id" element={<MusicLibrary />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
