import axios from "../../API/axios";

export const getVideosByChannel = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CHANNEL_VIDEOS_REQUEST" });

    const {
      data: { items },
    } = await axios.get("/channels", {
      params: {
        part: "contentDetails",
        id,
      },
    });
    const playlistId = items[0].contentDetails.relatedPlaylists.uploads;

    const { data } = await axios.get("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId,
        maxResults: 30,
        pageToken: getState().channelVideos.nextPageToken,
      },
    });
    console.log(data);
    dispatch({
      type: "CHANNEL_VIDEOS_SUCCESS",
      payload: {
        videos: data.items,
        playlistId,
        nextPageToken: data.nextPageToken,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "CHANNEL_VIDEOS_FAIL", payload: error.message });
  }
};
