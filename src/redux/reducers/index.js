import { combineReducers } from "redux";

import authReducer from "./authReducer";
import homeVideoReducer from "./homeVideoReducer";
import watchVideoReducer from "./watchVideoReducer";
import channelInfoReducer from "./channelInfoReducer";
import relatedVideoReducer from "./relatedVideoReducer";
import searchResultsReducer from "./searchResultReducer";
import subscriptionsReducer from "./subscriptionsReducer";
import channelVideosReducer from "./channelVideosReducer";

export default combineReducers({
  auth: authReducer,
  homeVideos: homeVideoReducer,
  watchVideo: watchVideoReducer,
  channelInfo: channelInfoReducer,
  relatedVideos: relatedVideoReducer,
  searchResults: searchResultsReducer,
  subscriptions: subscriptionsReducer,
  channelVideos: channelVideosReducer,
});
