const WatchVideoInitialState = {
  video: [],
  loading: true,
};

const watchVideoReducer = (state = WatchVideoInitialState, action) => {
  switch (action.type) {
    case "WATCH_VIDEO_REQUEST":
      return { ...state, loading: true };
    case "WATCH_VIDEO_SUCCESS":
      return { ...state, video: action.payload, loading: false };
    case "WATCH_VIDEO_FAIL":
      return { ...state, video: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export default watchVideoReducer;
