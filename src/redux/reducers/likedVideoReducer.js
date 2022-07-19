const initialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  totalResults: null,
  activeCategory: "All",
};

const likedVideosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKED_VIDEOS_REQUEST":
      return { ...state, loading: true };
    case "LIKED_VIDEOS_SUCCESS":
      return {
        ...state,
        loading: false,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        nextPageToken: action.payload.nextPageToken,
        totalResults: action.payload.totalResults,
      };
    case "LIKED_VIDEOS_FAIL":
      return {
        ...state,
        loading: false,
        videos: [],
        nextPageToken: null,
        totalResults: null,
      };
    default:
      return state;
  }
};

export default likedVideosReducer;
