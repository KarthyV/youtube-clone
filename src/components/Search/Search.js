import React, { useEffect } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import ChannelRow from "./ChannelRow";
import VideoRow from "./VideoRow";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "../../redux/actions/searchResults";

const Search = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchResults(query));
  }, [query, dispatch]);

  const { results, loading } = useSelector((state) => state.searchResults);

  return (
    <div className="search__page">
      <h1>Search Results for "{query}"</h1>

      <div className="search__results">
        {!loading &&
          results.map((result) => {
            return result.id.kind === "youtube#channel" ? (
              <ChannelRow
                key={result.id.channelId}
                title={result.snippet.channelTitle}
                id={result.snippet.channelId}
                thumbnail={result.snippet.thumbnails.medium.url}
                description={result.snippet.description}
              />
            ) : (
              <VideoRow
                key={result.id.videoId}
                id={result.id.videoId}
                channelId={result.snippet.channelId}
                thumbnail={result.snippet.thumbnails.medium.url}
                videoTitle={result.snippet.title}
                channelTitle={result.snippet.channelTitle}
                publishedAt={result.snippet.publishedAt}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Search;
