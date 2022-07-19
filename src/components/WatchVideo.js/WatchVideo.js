import React, { useEffect } from "react";
import "./WatchVideo.css";
import RelatedVdo from "./RelatedVdo";
import VideoMetaData from "./VideoMetaData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { watchVideosById } from "../../redux/actions/watchVideo";
import { getRelatedVideos } from "../../redux/actions/relatedVideos";
import SkeletonCard from "../Skeleton/Skeleton";

const WatchVideo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(watchVideosById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { video, loading } = useSelector((state) => state.watchVideo);
  const { video: relatedVideos, loading: relatedVideosLoading } = useSelector(
    (state) => state.relatedVideos
  );

  return (
    <div className="watch">
      <div className="watch_wrap">
        <div className="watch_left">
          <iframe
            title={video?.snippet?.title}
            allowFullScreen
            width="100%"
            height="400px"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
          ></iframe>
          {!loading ? (
            <VideoMetaData video={video} videoId={id} />
          ) : (
            <h5>Loading...</h5>
          )}
        </div>
        <div className="watch_right">
          <h3>Related Videos ⬇</h3>
          {!relatedVideosLoading
            ? relatedVideos
                ?.filter((video) => video.snippet)
                .map((video) => (
                  <RelatedVdo video={video} key={video.id.videoId} />
                ))
            : [...Array(10)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
