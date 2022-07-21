import { Avatar, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VideoCard from "../RecommendVdo.js/VideoCard";
import { getChannelInfo } from "../../redux/actions/channelInfo";
import "./ChannelDetail.css";
import numeral from "numeral";
import { getVideosByChannel } from "../../redux/actions/channelVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCard from "../Skeleton/Skeleton";

const ChannelDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); //Getting the channel id from the URL
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(getChannelInfo(id)); // dispatching getChannelInfo action
    dispatch(getVideosByChannel(id)); // dispatching getVideosByChannel action
  }, [id, dispatch]);

  const {
    channel: { snippet, statistics },
    subscriptionStatus,
  } = useSelector((state) => state.channelInfo); // Destructing the required fields from the channelInfo state

  const { videos, nextPageToken, loading } = useSelector(
    (state) => state.channelVideos
  ); // Getting the videos and next page token from channelVideos state

  useEffect(() => {
    if (nextPageToken === "") setHasMore(false); //If nextPageToken is not available changing the hasMore state to false
  }, [nextPageToken, hasMore]);

  const fetchData = () => {
    // Helper function for infiniteScroll runs every-time when the data is scrolled to the length set
    dispatch(getVideosByChannel(id));
  };

  return (
    <div className="channelDetails">
      <div className="channel_info">
        <div className="channel_detailsContainer">
          <Avatar
            src={snippet?.thumbnails?.medium.url}
            sx={{ width: 75, height: 75 }}
          />
          <div className="channel_meta">
            <h3 className="channelTitle">{snippet?.title}</h3>
            <p className="channelSub">
              {numeral(statistics?.subscriberCount).format("0.a")} Subscribers
            </p>
          </div>
        </div>
        <div className="channel_subBtn">
          <Button
            className="video_subBtn"
            color={subscriptionStatus ? "success" : "primary"}
            variant={subscriptionStatus ? "outlined" : "contained"}
          >
            {subscriptionStatus ? "Subscribed" : "Subscribe"}
          </Button>
        </div>
      </div>
      <hr />
      <div className="channel_video">
        <h2>Channel Videos</h2>
        <InfiniteScroll
          dataLength={videos.length}
          next={() => fetchData()}
          hasMore={hasMore}
          loader={<CircularProgress />}
          className="RecommendVdo__scroller"
        >
          <div className="video_section">
            {!loading
              ? videos.map((video) => {
                  return (
                    //If videos are available rendering them by VideoCard component
                    <VideoCard
                      id={video.snippet.resourceId.videoId}
                      video={video}
                      key={video.id}
                    />
                  );
                })
              : [...Array(20)].map((_, i) => {
                  // if not available rendering a skeletonCard
                  return <SkeletonCard key={i} />;
                })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ChannelDetail;
