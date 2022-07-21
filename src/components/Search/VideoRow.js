import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../API/axios";

const VideoRow = ({
  id,
  channelId,
  videoTitle,
  channelTitle,
  thumbnail,
  publishedAt,
}) => {
  const navigate = useNavigate();

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);

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
      setViews(items[0].statistics.viewCount);
      setDuration(items[0].contentDetails.duration);
    };
    getVideoDetails();
  }, [id]);

  return (
    // RelatedVideo Component with css adjusted
    <div className="RelatedVdo" onClick={() => navigate(`/watch/${id}`)}>
      <div className="RelatedVdo_left">
        <img src={thumbnail} alt="thumb" />
        <span className="videoCard_duration">{_duration}</span>
      </div>
      <div className="RelatedVdo_right">
        <p>{`${videoTitle.substring(0, 40)}...`}</p>
        <p>{channelTitle}</p>
        <p>
          {numeral(views).format("0.a")} views ⋅ {moment(publishedAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default VideoRow;
