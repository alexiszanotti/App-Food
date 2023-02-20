import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const recipesApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

recipesApi.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default recipesApi;
