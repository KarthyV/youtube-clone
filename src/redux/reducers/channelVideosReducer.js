const ChannelVideos = {
  loading: true,
  videos: [],
  nextPageToken: "",
  playlistId: null,
  activeCategory: "All",
};

const channelVideosReducer = (state = ChannelVideos, action) => {
  switch (action.type) {
    case "CHANNEL_VIDEOS_REQUEST":
      return { ...state, loading: true };
    case "CHANNEL_VIDEOS_SUCCESS":
      if (action.payload.playlistId !== state.playlistId)
        state.activeCategory = "All";
      return {
        ...state,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        loading: false,
        playlistId: action.payload.playlistId,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
      };
    case "CHANNEL_VIDEOS_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default channelVideosReducer;
