// import axiosJwt from "./axiosinterceptors";
const apiUrl = import.meta.env.VITE_API_URL;
import axiosJwt from "./axiosinterceptors";

export const getQuestion = async (postId: string | undefined) => {
  return await axiosJwt.get(`${apiUrl}/questions/${postId}`);
};
