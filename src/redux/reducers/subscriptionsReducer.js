const SubscriptionsInitialState = {
  loading: true,
  channels: [],
  nextPageToken: "",
  kind: null,
};

const subscriptionsReducer = (state = SubscriptionsInitialState, action) => {
  switch (action.type) {
    case "SUBSCRIPTIONS_CHANNEL_REQUEST":
      return { ...state, loading: true };
    case "SUBSCRIPTIONS_CHANNEL_SUCCESS":
      return {
        ...state,
        loading: false,
        channels:
          state.kind === action.payload.kind
            ? [...state.channels, ...action.payload.channels]
            : action.payload.channels,
        kind: action.payload.kind,
        nextPageToken: action.payload.nextPageToken,
      };
    case "SUBSCRIPTIONS_CHANNEL_FAIL":
      return {
        ...state,
        loading: false,
        channels: [],
        nextPageToken: null,
        kind: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default subscriptionsReducer;
