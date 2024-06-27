import axiosJwt from "./axiosinterceptors";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const getUser = async () => {
  return await axiosJwt.get(`${apiUrl}/users`);
};

export const updateUser = async (data: object) => {
  return await axiosJwt.post(`${apiUrl}/users/update`, data);
};

export const updatePassword = async (data: object) => {
  return await axiosJwt.post(`${apiUrl}/users/update/password`, data);
};

export const createUser = async (data: object) => {
  return await axios.post(`${apiUrl}/users`, data);
};

export const updateImageProfile = async (data: object) => {
  return await axiosJwt.post(`${apiUrl}/users/update-image`, data);
};
export const updateForgetPassword = async (data: object) => {
  return await axiosJwt.post(`${apiUrl}/users/update/password-forget`, data);
};
