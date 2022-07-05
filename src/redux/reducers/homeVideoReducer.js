const HomeVideoInitialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: "All",
};

const homeVideoReducer = (state = HomeVideoInitialState, action) => {
  switch (action.type) {
    case "HOME_VIDEOS_REQUEST":
      return { ...state, loading: true };
    case "HOME_VIDEOS_SUCCESS":
      return {
        ...state,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        loading: false,
        nextPageToken: action.payload.nextPageToken,
      };
    case "HOME_VIDEOS_FAIL":
      return { ...state, videos: [], loading: false, nextPageToken: null };
    default:
      return state;
  }
};

export default homeVideoReducer;
