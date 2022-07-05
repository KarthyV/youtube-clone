import { Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ChannelRow = ({ title, thumbnail, description, id }) => {
  const navigate = useNavigate();

  return (
    <div className="channelRow_info" onClick={() => navigate(`/channel/${id}`)}>
      <div className="channelRow_detailsContainer">
        <Avatar src={thumbnail} sx={{ width: 90, height: 90 }} />
        <div className="subscriptionRow_meta">
          <h3 className="channelTitle">{title}</h3>
          <p className="channelSub">{description.substring(0, 200)}...</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelRow;
