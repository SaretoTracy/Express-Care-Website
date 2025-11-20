import axios from "axios";
import type { ICaregiverSignup } from "../Interfaces/ICaregiverSignUp";
import type { IProviderSignup } from "../Interfaces/IProviderSignUp";
import type { ILogin } from "../validation/signupValidation";

// Base URL of backend
const API_BASE_URL = "https://expresscareteam-backend-api.onrender.com/api/auth";

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
      `${API_BASE_URL}/register/caregiver`,
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
      `${API_BASE_URL}/register/provider`,
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
    const res = await axios.post(`${API_BASE_URL}/login`, data, {
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
      `${API_BASE_URL}/requestResetOtp`,
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
      `${API_BASE_URL}/verifyResetOtp`,
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
  password: string,
  confirmPassword: string
) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/resetPassword`,
      { email, password, confirmPassword },
      { headers: { "Content-Type": "application/json" } }
    );
    return res.data;
  } catch (error: any) {
    handleError(error);
  }
};
