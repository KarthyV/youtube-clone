import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMySubscriptions } from "../../redux/actions/subscriptions";
import "./Subscriptions.css";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import ChannelRow from "../Search/ChannelRow";

const Subscriptions = () => {
  const dispatch = useDispatch();

  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(getMySubscriptions());
  }, [dispatch]);

  const { channels, nextPageToken } = useSelector(
    (state) => state.subscriptions
  ); // Getting the channels and next page token from subscriptions state

  useEffect(() => {
    if (nextPageToken === undefined) setHasMore(false);
  }, [nextPageToken, hasMore]);

  const fetchData = () => {
    dispatch(getMySubscriptions());
  };

  return (
    <div className="subscription__page">
      <h1>Subscriptions</h1>

      <div className="subscription__results">
        <InfiniteScroll
          dataLength={channels.length}
          next={() => fetchData()}
          hasMore={hasMore}
          loader={<CircularProgress />}
          className="RecommendVdo__scroller"
        >
          {channels.map((channel) => (
            <ChannelRow
              key={channel.snippet.resourceId.channelId}
              id={channel.snippet.resourceId.channelId}
              thumbnail={channel.snippet.thumbnails.medium.url}
              title={channel.snippet.title}
              description={channel.snippet.description}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Subscriptions;
