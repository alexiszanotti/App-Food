import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const usersApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

usersApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default usersApi;
