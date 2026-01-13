import { useRef, useState, useEffect, useCallback } from "react";
import { MusicContext } from "../context/MusicContext.jsx";
import { QuickPicks } from "../data/QuickPicks.jsx"; // Default recommendation tracks
import { SoundTracks } from "../data/Songs.jsx"; // All songs data

export function MusicProvider({ children }) {
  // Initialize state from local storage directly
  const [recommendation, setRecommendation] = useState(() => {
    try {
      const stored = localStorage.getItem("recommendation");
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : QuickPicks; // Fallback to QuickPicks if not an array
      }
      return QuickPicks; // Default value
    } catch (error) {
      console.error("Error parsing recommendation from localStorage:", error);
      return QuickPicks; // Fallback on error
    }
  });

  // Update local storage whenever recommendation changes
  useEffect(() => {
    localStorage.setItem("recommendation", JSON.stringify(recommendation));
  }, [recommendation]);

  const audioRef = useRef(null); // Reference to the audio element
  const MasterTracks = SoundTracks; // All songs data
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(MasterTracks);
  const [isPlaying, setIsPlaying] = useState(false);

  // Function for Volume
  const [volume, setVolume] = useState(() => {
    const stored = localStorage.getItem("volume");
    return stored ? Number(stored) : 0.5;
  });

  // Save volume whenever it changes
  useEffect(() => {
    if(audioRef.current) {
      audioRef.current.volume = volume;
    }
    localStorage.setItem("volume", volume);
  }, [volume]);

  // Ensure volume is applied when a new track loads
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const applyVolume = () => {
      audio.volume = volume;
    };
    
    audio.addEventListener("loadedmetadata", applyVolume);
    return () => {
      audio.removeEventListener("loadedmetadata", applyVolume);
    }
  }, [volume]);

  // Function for liked tracks
  const [likedTrackIds, setLikedTrackIds] = useState(() => {
    try {
      const stored = localStorage.getItem("likedTracks");
      if (stored) return JSON.parse(stored);
      return []; // Default empty
    } catch (err) {
      console.error("Failed to parse liked tracks", err);
      return [];
    }
  });

  // Save liked tracks whenever it changes
  useEffect(() => {
    localStorage.setItem("likedTracks", JSON.stringify(likedTrackIds));
  }, [likedTrackIds]);

  // Function that handle like tracks
  const toggleLike = useCallback((trackId) =>
    setLikedTrackIds((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    ),
    []
  );

  // Function to a play button
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      //console.log("Pausing audio");
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Failed to resume audio.", err);
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // Function to play a specific track in Featured Tracks
  const playTrack = useCallback(
    (track, playlist = MasterTracks) => {
      if (!audioRef.current) return;

      if (currentTrack?.id === track.id) {
        togglePlay();
        return;
      }

      setCurrentPlaylist(playlist);

      audioRef.current.pause(); //Stop previous track
      // Load new track
      audioRef.current.src = track.audio;
      audioRef.current.currentTime = 0;

      audioRef.current
        .play()
        .then(() => {
          setCurrentTrack(track);
          setIsPlaying(true);

          setRecommendation((prev) => {
            const filtered = prev.filter((s) => s.id !== track.id);
            return [track, ...filtered].slice(0, 6);
          });
        })
        .catch((err) => {
          console.error("Failed to play audio.", err);
        });
    },
    [currentTrack, togglePlay, MasterTracks]
  );

  // Function for Playing Next Track
  const playNextTrack = useCallback(() => {
    if (!currentTrack || currentPlaylist.length === 0) return;

    const currentIndex = currentPlaylist.findIndex(
      (t) => t.id === currentTrack.id
    );

    if (currentIndex === -1) return;

    const nextIndex = (currentIndex + 1) % currentPlaylist.length;
    playTrack(currentPlaylist[nextIndex], currentPlaylist);
  }, [currentTrack, currentPlaylist, playTrack]);

  // Function for Playing Previous Track
  const playPrevTrack = useCallback(() => {
    if (!currentTrack || currentPlaylist.length === 0) return;

    const currentIndex = currentPlaylist.findIndex(
      (t) => t.id === currentTrack.id
    );

    if (currentIndex === -1) return;

    const prevIndex =
      (currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    playTrack(currentPlaylist[prevIndex], currentPlaylist);
  }, [currentTrack, currentPlaylist, playTrack]);

  // Auto play next track when current ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNextTrack();
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNextTrack]);

  return (
    <MusicContext.Provider
      value={{
        audioRef,
        volume,
        setVolume,
        currentTrack,
        isPlaying,
        playTrack,
        playNextTrack,
        playPrevTrack,
        togglePlay,
        recommendation,
        likedTrackIds,
        toggleLike,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </MusicContext.Provider>
  );
}
