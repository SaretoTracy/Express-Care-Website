import axios from "axios";
import type { ICaregiverSignup } from "../Interfaces/ICaregiverSignUp";
import type { IProviderSignup } from "../Interfaces/IProviderSignUp";
import type { ILogin } from "../validation/signupValidation";
import type { ICareRequirements } from "../Interfaces/ICareRequirements";

// Base URL of backend
const API_BASE_URL = "https://api.expresscareteam.com/api";

// CENTRALIZED ERROR HANDLER
const handleError = (error: any) => {
  if (error.response) {
    throw new Error(error.response.data.message || "Backend error occurred");
  } else if (error.request) {
    throw new Error("No response from server. Check your network.");
  } else {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// ---------------------------------------------------------
// REGISTER CAREGIVER
// ---------------------------------------------------------
export const registerCaregiver = async (data: Partial<ICaregiverSignup>) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register/caregiver`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// REGISTER PROVIDER
// ---------------------------------------------------------
export const registerProvider = async (data: IProviderSignup) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register/provider`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// LOGIN USER
// ---------------------------------------------------------
export const loginUser = async (data: ILogin) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// REQUEST RESET OTP

// ---------------------------------------------------------
export const requestResetOtp = async (email: string) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/auth/requestResetOtp`,
      { email },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error: any) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// VERIFY RESET OTP

// ---------------------------------------------------------
export const verifyResetOtp = async (email: string, otp: string) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/auth/verifyResetOtp`,
      { email, otp },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error: any) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// RESET PASSWORD

// ---------------------------------------------------------
export const resetPassword = async (
  email: string,
  otp: string,
  password: string,
  confirmPassword: string
) => {
  const response = await axios.post(`${API_BASE_URL}/auth/resetPassword`, {
    email,
    otp,
    password,
    confirmPassword,
  });
  return response.data;
};

// ---------------------------------------------------------
// UPLOAD CAREGIVER REQUIREMENT DOCUMENTS
// ---------------------------------------------------------

export const uploadCaregiverRequirements = async (data: ICareRequirements) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/caregiver-requirements/upload`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};