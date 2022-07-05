import React, { useState, useEffect } from "react";
import "./RecommendVdo.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate } from "react-router-dom";
import axios from "../../API/axios";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";

const VideoCard = ({ video, id }) => {
  const { title, publishedAt, thumbnails, channelId } = video.snippet;
  const navigate = useNavigate();

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const [channelTitle, setChannelTitle] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await axios.get("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id,
        },
      });
      console.log(items);
      setViews(items[0]?.statistics.viewCount);
      setDuration(items[0]?.contentDetails.duration);
    };
    getVideoDetails();
  }, [id, channelId]);

  useEffect(() => {
    const getChannelDetails = async () => {
      const {
        data: { items },
      } = await axios.get("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.high.url);
      setChannelTitle(items[0].snippet.title);
    };
    getChannelDetails();
  }, [channelId]);

  return (
    <Card
      onClick={() => navigate(`/watch/${id}`)}
      className="videoCard"
      sx={{ maxWidth: 290 }}
    >
      <LazyLoadImage
        className="lazy_load_thumb"
        height="180px"
        width="100%"
        src={thumbnails.medium.url}
        alt={title}
        effect="blur"
      />
      <span className="videoCard_duration">{_duration}</span>
      <CardHeader
        className="video__meta"
        avatar={
          <LazyLoadImage
            className="lazy_load_avatar"
            height="40px"
            width="40px"
            src={channelIcon}
            effect="blur"
          />
        }
        title={title}
        subheader={`${channelTitle} |  ${numeral(views).format(
          "0.a"
        )} views | ${moment(publishedAt).fromNow()} `}
      />
    </Card>
  );
};

export default VideoCard;
