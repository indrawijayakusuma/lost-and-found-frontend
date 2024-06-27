import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (data: object) => {
  return await axios.post(`${apiUrl}/login`, data);
};

export const postRefreshToken = async () => {
  return await axios.post(`${apiUrl}/refresh-token`);
};
