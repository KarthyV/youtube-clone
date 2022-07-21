import { ThumbDown, ThumbUp } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import moment from "moment";
import numeral from "numeral";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShowMore from "react-show-more-text";
import {
  getChannelInfo,
  getSubscriptionStatus,
} from "../../redux/actions/channelInfo";

// This component shows the metaData of the video based on the videoId and channelId

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { publishedAt, channelId, title, description, channelTitle } = snippet;
  const { viewCount, likeCount } = statistics;

  useEffect(() => {
    dispatch(getChannelInfo(channelId));
    dispatch(getSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  const { channel, subscriptionStatus } = useSelector(
    (state) => state.channelInfo
  );
  const { statistics: channelStats, snippet: channelSnippet } = channel;

  const handleRedirectChannel = () => {
    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="watch_leftBottom">
      <h1 className="title">{title}</h1>
      <div className="watch_info">
        <div className="watch_infoLeft">
          <p className="info_views">
            {numeral(viewCount).format("0.a")} views |{" "}
            {moment(publishedAt).fromNow()}
          </p>
        </div>
        <div className="like_wrap">
          <ThumbUp className="watch_icon" />
          <span>{numeral(likeCount).format("0.a")}</span>
          <ThumbDown className="watch_icon" />
          <span>DISLIKE</span>
        </div>
      </div>
      <hr />
      <div className="watch_details">
        <div onClick={handleRedirectChannel} className="watch_detailsContainer">
          <Avatar
            src={channelSnippet?.thumbnails?.default?.url}
            sx={{ width: 46, height: 46 }}
          />
          <div className="video_channel">
            <h3 className="video_channelTitle">{channelTitle}</h3>
            <p className="video_channelSub">
              {numeral(channelStats?.subscriberCount).format("0.a")} Subscribers
            </p>
          </div>
        </div>
        <div className="watch_subBtn">
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
      <div className="video_description">
        <h3>Description</h3>
        <ShowMore
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="video_description_showMoreText"
          expanded={false}
        >
          {description}
        </ShowMore>
      </div>
      <hr />
    </div>
  );
};

export default VideoMetaData;
