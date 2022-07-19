import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoCard from "../RecommendVdo.js/VideoCard";
import SkeletonCard from "../Skeleton/Skeleton";
import "./LikedVideos.css";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../../redux/actions/likedVideos";

const LikedVideos = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);

  const { videos, loading } = useSelector((state) => state.likedVideos);

  const fetchData = () => {
    dispatch(getLikedVideos());
  };

  return (
    <div className="LikedVdo">
      <h1>Liked Videos</h1>
      <InfiniteScroll
        dataLength={videos.length}
        next={() => fetchData()}
        hasMore={true}
        loader={<CircularProgress />}
        className="RecommendVdo__scroller"
      >
        <div className="LikedVdo__videos">
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

export default LikedVideos;
