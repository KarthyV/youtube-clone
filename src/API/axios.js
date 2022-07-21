import axios from "axios";
import { YT_URL } from "./yt_api";

export default axios.create({
  //axios instance setup
  baseURL: YT_URL,
  params: {
    key: "AIzaSyDuC1xi-z7uLom67I6oCQeWVWLf3o2prYE",
  },
});
