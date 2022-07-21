import axios from "../../API/axios";

export const getChannelInfo = (id) => async (dispatch) => {
  // Getting channel Info by id
  try {
    dispatch({ type: "CHANNEL_INFO_REQUEST" });

    const { data } = await axios.get("/channels", {
      params: {
        part: "snippet,statistics,contentDetails",
        id,
      },
    });

    dispatch({ type: "CHANNEL_INFO_SUCCESS", payload: data.items[0] });
  } catch (error) {
    dispatch({ type: "CHANNEL_INFO_FAIL", payload: error.message });
  }
};

export const getSubscriptionStatus = (id) => async (dispatch, getState) => {
  // Getting the subscriptions status by channel Id
  try {
    const { data } = await axios.get("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        // Based on the accessToken provided by google
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: "SUBSCRIPTION_STATUS_SUCCESS",
      payload: {
        subscriptionStatus: data.items.length !== 0,
        subscriptionId: data?.items[0]?.id,
      },
    });
  } catch (error) {
    dispatch({ type: "CHANNEL_INFO_FAIL", payload: error.message });
    // console.log(error.message);
  }
};
