import axios from "../../API/axios";

export const getSearchResults = (query) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_RESULTS_REQUEST" });
    const { data } = await axios.get("/search", {
      // Getting results based on query,
      params: {
        part: "snippet",
        maxResults: 20,
        q: query,
        type: "video,channel",
      },
    });

    dispatch({ type: "SEARCH_RESULTS_SUCCESS", payload: data.items });
  } catch (error) {
    dispatch({ type: "SEARCH_RESULTS_FAIL", payload: error.message });
  }
};
