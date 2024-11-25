import axios from "axios";
import { baseApiUrl } from "../constants/env";

console.log(baseApiUrl);
const AxiosInstance = axios.create({
  baseURL: "https://linkedoutapp.com/api",
});

AxiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    config.headers["x-refresh-token"] = refreshToken;
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default AxiosInstance;
