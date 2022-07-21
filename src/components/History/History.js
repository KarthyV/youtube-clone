import React, { useEffect, useState } from "react";
import "./History.css";
import HistoryCard from "./HistoryCard";
import firebase from "firebase/compat/app";
import { onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const History = () => {
  const [videos, setVideos] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const db = firebase.firestore(); // Firebase Firestore
    // db.collection("history").where("userId", "==", user.id).get().then((snapshot) => setVideos(snapshot.docs.map(doc => doc.data())));
    onSnapshot(
      // Query for getting the watch history based on the user Id
      db.collection("history").where("userId", "==", user.id),
      (snapshot) => setVideos(snapshot.docs.map((doc) => doc.data()).reverse())
    );
  }, [user.id]);

  return (
    <div className="History">
      <h1>History</h1>
      <div
        className="History__videos"
        style={{ borderTop: "1px solid lightgray" }}
      >
        {videos.length > 0 ? ( // If videos are available
          videos.map((video) => {
            return <HistoryCard id={video.id} video={video} key={video.id} />;
          })
        ) : (
          // If not available
          <h3>No Videos Found...Please watch</h3>
        )}
      </div>
    </div>
  );
};

export default History;
