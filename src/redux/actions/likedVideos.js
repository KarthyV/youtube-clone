import axios from "../../API/axios";

export const getLikedVideos = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "LIKED_VIDEOS_REQUEST" });

    const { data } = await axios.get("/videos", {
      // Getting the liked Videos of the user based on google access token
      params: {
        part: "snippet,contentDetails,statistics",
        myRating: "like",
        maxResults: 20,
        pageToken: getState().likedVideos.nextPageToken,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: "LIKED_VIDEOS_SUCCESS",
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        totalResults: data.pageInfo.totalResults,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LIKED_VIDEOS_FAIL" });
  }
};
