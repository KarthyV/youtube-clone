import React, { useState, useEffect } from "react";
import "./RecommendVdo.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useNavigate } from "react-router-dom";
import axios from "../../API/axios";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase";
import { useSelector } from "react-redux";

const VideoCard = ({ video, id }) => {
  // Getting the video details and id as props
  const { title, publishedAt, thumbnails, channelId } = video.snippet; // Destructing the video details
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
        // Getting the live status of the video by id
        params: {
          part: "contentDetails,statistics",
          id: id,
        },
      });
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
        // Getting the channel details  by channel id
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

  const { user } = useSelector((state) => state.auth);

  const handleWatch = async () => {
    // Whenever the user clicks to watch a video, same data is saved in fireStore as well
    const docRef = doc(db, "history", id + user.id);
    const payload = {
      id,
      title,
      publishedAt,
      channelId,
      thumbnails,
      userId: user.id,
    };
    await setDoc(docRef, payload);

    navigate(`/watch/${id}`);
  };

  return (
    <Card onClick={handleWatch} className="videoCard" sx={{ maxWidth: 290 }}>
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
