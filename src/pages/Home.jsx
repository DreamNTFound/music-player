import FeaturedSlider from "../components/features/FeaturedSlider.jsx";
import QuickPicks from "../components/features/QuickPicks.jsx";
import TrackList from "../components/features/TrackList.jsx";
import { SoundTracks } from "../data/Songs.jsx";

export default function Homepage() {
  return (
    <>
      {/* Featured Tracks */}
      <FeaturedSlider />
    
      {/* Quick Picks */}
      <QuickPicks />

      { /* All Tracks */ }
      <TrackList tracks={SoundTracks}/>
    </>
  );
}
