import axios from "axios";

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

AxiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["x-access-token"];
    if (newAccessToken) {
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", newAccessToken);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
