import "./App.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import RecommendVdo from "./components/RecommendVdo.js/RecommendVdo";
import SideBar from "./components/SideBar/SideBar";
import { Routes, Route, useNavigate } from "react-router-dom";
import WatchVideo from "./components/WatchVideo.js/WatchVideo";
import ChannelDetail from "./components/ChannelDetail/ChannelDetail";
import Login from "./components/Login/Login";
import History from "./components/History/History";
import Search from "./components/Search/Search";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import LikedVideos from "./components/LikedVideos/LikedVideos";

function App() {
  const navigate = useNavigate();
  const { accessToken, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken && !loading) {
      navigate("/login");
    }
  }, [accessToken, loading]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <Header />
            <div className="app__page">
              <SideBar />
              <RecommendVdo />
            </div>
          </div>
        }
      />
      <Route
        path="/likedVideos"
        element={
          <div className="app">
            <Header />
            <div className="app__page">
              <SideBar />
              <LikedVideos />
            </div>
          </div>
        }
      />
      <Route
        path="/history"
        element={
          <div className="app">
            <Header />
            <div className="app__page">
              <SideBar />
              <History />
            </div>
          </div>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <div className="app">
            <Header />
            <div className="app__page">
              <SideBar />
              <Subscriptions />
            </div>
          </div>
        }
      />
      <Route
        path="/search/:query"
        element={
          <div className="app">
            <Header />
            <div className="app__page">
              <SideBar />
              <Search />
            </div>
          </div>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/channel/:id"
        element={
          <div className="app">
            <Header />
            <div className="app__page">
              <SideBar />
              <ChannelDetail />
            </div>
          </div>
        }
      />
      <Route
        path="/watch/:id"
        element={
          <>
            <Header />
            <div className="app__page">
              <SideBar />
              <WatchVideo />
            </div>
          </>
        }
      />
    </Routes>
  );
}

export default App;
