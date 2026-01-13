export const PlaylistModel = ( name ) => {
    return {
        id: `pl_${Date.now()}`, // unique id based on timestamp
        type: "playlist",
        name,
        createdAt: Date.now(), // timestamp of creation
        songs: [],
    }
}

export const FolderModel = ( name ) => {
  return {
    id: `folder_${Date.now()}`, // unique id based on timestamp
    type: "folder",
    name,
    createdAt: Date.now(), // timestamp of creation
    playlists: [],
  };
}

export const LikedSongsModel = () => {
    return {
        id: `liked_${Date.now()}`, // unique id based on timestamp
        type: "liked",
        name: "Liked Songs",
        createdAt: Date.now(), // timestamp of creation
        songs: [],
    }
}


