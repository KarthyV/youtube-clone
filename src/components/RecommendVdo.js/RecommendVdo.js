import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeVideos } from "../../redux/actions/homeVideos";
import "./RecommendVdo.css";
import VideoCard from "./VideoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import SkeletonCard from "../Skeleton/Skeleton";

const RecommendVdo = () => {
  // Same as liked videos component
  const dispatch = useDispatch();
  const { videos, loading } = useSelector((state) => state.homeVideos);

  useEffect(() => {
    dispatch(homeVideos());
  }, [dispatch]);

  const fetchData = () => {
    dispatch(homeVideos());
  };

  return (
    <div className="RecommendVdo">
      <h1>Recommended Videos</h1>
      <InfiniteScroll
        dataLength={videos.length}
        next={() => fetchData()}
        hasMore={true}
        loader={<CircularProgress />}
        className="RecommendVdo__scroller"
      >
        <div className="RecommendVdo__videos">
          {!loading
            ? videos.map((video) => {
                return <VideoCard id={video.id} video={video} key={video.id} />;
              })
            : [...Array(20)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default RecommendVdo;
