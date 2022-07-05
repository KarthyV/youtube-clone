import axios from "../../API/axios";

export const watchVideosById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "WATCH_VIDEO_REQUEST" });

    const { data } = await axios.get("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });

    dispatch({ type: "WATCH_VIDEO_SUCCESS", payload: data.items[0] });
  } catch (error) {
    dispatch({ type: "WATCH_VIDEO_FAIL", payload: error.message });
  }
};
