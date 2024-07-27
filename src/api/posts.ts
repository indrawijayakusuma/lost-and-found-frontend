// import axiosJwt from "./axiosinterceptors";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import axiosJwt from "./axiosinterceptors";

export const createPost = async (data: FormData) => {
  return await axiosJwt.post(`${apiUrl}/posts`, data);
};

export const getposts = async (data: object) => {
  return await axios.get(`${apiUrl}/posts`, {
    params: data,
  });
};

export const getPostByid = async (id: string) => {
  return await axiosJwt.get(`${apiUrl}/posts/${id}`);
};

export const getPostUpdateById = async (id: string) => {
  return await axiosJwt.get(`${apiUrl}/posts/${id}/update`);
};

export const getClaimValidationByUserId = async () => {
  return await axiosJwt.get(`${apiUrl}/claim-validation`);
};

export const getMyClaim = async () => {
  return await axiosJwt.get(`${apiUrl}/claim-validation/me`);
};
export const getPostByuserId = async () => {
  return await axiosJwt.get(`${apiUrl}/posts/user`);
};
