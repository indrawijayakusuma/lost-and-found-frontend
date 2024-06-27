const apiUrl = import.meta.env.VITE_API_URL;
import axiosJwt from "./axiosinterceptors";

export const verifyOtp = async (otp: string) => {
  return await axiosJwt.post(`${apiUrl}/otps/validate-user`, { otp });
};

export const postOtp = async (phone: string) => {
  return await axiosJwt.post(`${apiUrl}/otps`, { phone });
};
export const getOtpByPhoneAndOtpCode = async (phone: string, otp: string) => {
  return await axiosJwt.get(`${apiUrl}/otps?phone=${phone}&otp=${otp}`);
};
