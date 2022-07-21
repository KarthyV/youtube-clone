import axios from "../../API/axios";

export const homeVideos = () => async (dispatch, getState) => {
  // Getting the recommended Videos based on the regionCode
  try {
    dispatch({ type: "HOME_VIDEOS_REQUEST" });

    const { data } = await axios.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    const home = {
      videos: data.items,
      nextPageToken: data.nextPageToken,
      category: "All",
    };
    dispatch({ type: "HOME_VIDEOS_SUCCESS", payload: home });
  } catch (error) {
    dispatch({ type: "HOME_VIDEOS_FAIL", payload: error.message });
  }
};
