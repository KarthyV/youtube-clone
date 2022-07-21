import React from "react";
import "./SideBar.css";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HistoryIcon from "@mui/icons-material/History";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SideBarRow from "./SideBarRow";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="SideBar_inner">
        <Link style={{ textDecoration: "none" }} to="/">
          <SideBarRow selected title="Home" Icon={HomeIcon} />
        </Link>
        <Link style={{ textDecoration: "none" }} to="/subscriptions">
          <SideBarRow title="Subscriptions" Icon={SubscriptionsIcon} />
        </Link>
        <hr />
        <Link style={{ textDecoration: "none" }} to="/history">
          <SideBarRow title="History" Icon={HistoryIcon} />
        </Link>
        <Link style={{ textDecoration: "none" }} to="/likedVideos">
          <SideBarRow title="Liked Videos" Icon={ThumbUpIcon} />
        </Link>
        <hr />
      </div>
    </div>
  );
};

export default SideBar;
