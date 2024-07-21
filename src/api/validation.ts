const apiUrl = import.meta.env.VITE_API_URL;
import axiosJwt from "./axiosinterceptors";

export const postValidation = async (data: object) => {
  return await axiosJwt.post(`${apiUrl}/claim-validation`, data);
};

export const getValidationQuestionAnswer = async (id: string) => {
  return await axiosJwt.get(`${apiUrl}/claim-validation/${id}`);
};

export const postAccValidation = async (id?: string) => {
  return await axiosJwt.post(`${apiUrl}/claim-validation/${id}/accept`);
};

export const postRejValidation = async (id?: string) => {
  return await axiosJwt.post(`${apiUrl}/claim-validation/${id}/reject`);
};
export const postCompleteValidation = async (id?: string) => {
  return await axiosJwt.post(`${apiUrl}/claim-validation/${id}/complete`);
};

export const checkValidationUser = async (
  postId: string,
  validationUserId: string
) => {
  return await axiosJwt.get(
    `${apiUrl}/claim-validation/check-validation?postId=${postId}&validationUserId=${validationUserId}`
  );
};
