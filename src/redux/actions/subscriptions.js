import axios from "../../API/axios";

export const getMySubscriptions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "SUBSCRIPTIONS_CHANNEL_REQUEST" });
    const { data } = await axios.get("/subscriptions", {
      // Getting the subscriptions of the user based on google accessToken
      params: {
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 10,
        pageToken: getState().subscriptions.nextPageToken,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: "SUBSCRIPTIONS_CHANNEL_SUCCESS",
      payload: {
        channels: data.items,
        nextPageToken: data.nextPageToken,
        kind: data.kind,
      },
    });
  } catch (error) {
    dispatch({ type: "SUBSCRIPTIONS_CHANNEL_FAIL", payload: error.message });
    console.log(error.message);
  }
};
