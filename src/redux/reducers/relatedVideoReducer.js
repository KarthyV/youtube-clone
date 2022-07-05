const RelatedVideoInitialState = {
  video: [],
  loading: true,
};

const relatedVideoReducer = (state = RelatedVideoInitialState, action) => {
  switch (action.type) {
    case "RELATED_VIDEOS_REQUEST":
      return { ...state, loading: true };
    case "RELATED_VIDEOS_SUCCESS":
      return { ...state, video: action.payload, loading: false };
    case "RELATED_VIDEOS_FAIL":
      return { ...state, video: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export default relatedVideoReducer;
