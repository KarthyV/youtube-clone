const ChannelInfoInitialState = {
  loading: true,
  channel: {},
  subscriptionStatus: false,
  subscriptionId: "",
};

const channelInfoReducer = (state = ChannelInfoInitialState, action) => {
  switch (action.type) {
    case "CHANNEL_INFO_REQUEST":
      return { ...state, loading: true };
    case "CHANNEL_INFO_SUCCESS":
      return { ...state, channel: action.payload, loading: false };
    case "CHANNEL_INFO_FAIL":
      return {
        ...state,
        channelInfo: null,
        loading: false,
        error: action.payload,
      };
    case "SUBSCRIPTION_STATUS_SUCCESS":
      return {
        ...state,
        subscriptionStatus: action.payload.subscriptionStatus,
        subscriptionId: action.payload.subscriptionId,
      };
    default:
      return state;
  }
};

export default channelInfoReducer;
