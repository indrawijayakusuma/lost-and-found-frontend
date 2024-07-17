import axios from "axios";
import { postRefreshToken } from "../auths";

const axiosJwt = axios.create();

axiosJwt.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
axiosJwt.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      localStorage.removeItem("token");
      try {
        const response = await postRefreshToken();
        const token = response.data.data.accessToken;
        localStorage.setItem("token", token);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        localStorage.removeItem("token");
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosJwt;
