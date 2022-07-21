import axios from "../../API/axios";

export const getRelatedVideos = (id) => async (dispatch) => {
  // Getting related Videos based on the current video Id
  try {
    dispatch({ type: "RELATED_VIDEOS_REQUEST" });
    const { data } = await axios.get("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 10,
        type: "video",
      },
    });
    dispatch({ type: "RELATED_VIDEOS_SUCCESS", payload: data.items });
  } catch (error) {
    dispatch({ type: "RELATED_VIDEOS_FAIL", payload: error.message });
  }
};
