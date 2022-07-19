import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../API/axios";
import { doc, setDoc } from "firebase/firestore";
import db from "../../firebase";
import { useSelector } from "react-redux";

const RelatedVdo = ({ video }) => {
  const navigate = useNavigate();
  const {
    id,
    snippet: { thumbnails, channelTitle, title, publishedAt, channelId },
  } = video;

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
          id: id.videoId,
        },
      });
      setViews(items[0].statistics.viewCount);
      setDuration(items[0].contentDetails.duration);
    };
    getVideoDetails();
  }, [id]);

  const { user } = useSelector((state) => state.auth);

  const handleWatch = async () => {
    const docRef = doc(db, "history", id.videoId + user.id);
    const payload = {
      id: id.videoId,
      title,
      publishedAt,
      channelId,
      thumbnails,
      userId: user.id,
    };
    await setDoc(docRef, payload);

    navigate(`/watch/${id.videoId}`);
  };

  return (
    <div className="RelatedVdo" onClick={handleWatch}>
      <div className="RelatedVdo_left">
        <img src={thumbnails.medium.url} alt="thumb" />
        <span className="videoCard_duration">{_duration}</span>
      </div>
      <div className="RelatedVdo_right">
        <p>{`${title.substring(0, 40)}...`}</p>
        <p>{channelTitle}</p>
        <p>
          {numeral(views).format("0.a")} views ⋅ {moment(publishedAt).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default RelatedVdo;
