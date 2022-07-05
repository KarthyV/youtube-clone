const SearchResultsInitialState = {
  results: [],
  loading: true,
};

const searchResultsReducer = (state = SearchResultsInitialState, action) => {
  switch (action.type) {
    case "SEARCH_RESULTS_REQUEST":
      return { ...state, loading: true };
    case "SEARCH_RESULTS_SUCCESS":
      return { ...state, results: action.payload, loading: false };
    case "SEARCH_RESULTS_FAIL":
      return { ...state, results: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export default searchResultsReducer;
