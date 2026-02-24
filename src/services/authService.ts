import { api } from "./api";
import type { ICaregiverSignup } from "../Interfaces/ICaregiverSignUp";
import type { IProviderSignup } from "../Interfaces/IProviderSignUp";
import type { ILogin } from "../validation/signupValidation";
import type { ICareRequirements } from "../Interfaces/ICareRequirements";

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
    const response = await api.post("/auth/register/caregiver", data);
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
    const response = await api.post("/auth/register/provider", data);
    return response.data;
  } catch (error: any) {
    console.log("FULL ERROR:", error.response?.data);
    console.log("STATUS:", error.response?.status);
    throw error;
  }
};
// ---------------------------------------------------------
// LOGIN USER
// ---------------------------------------------------------
export const loginUser = async (data: ILogin) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error: any) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// LOGOUT USER
// ---------------------------------------------------------
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// GET CURRENT USER (Silent Session Restore)
// ---------------------------------------------------------
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// REQUEST RESET OTP
// ---------------------------------------------------------
export const requestResetOtp = async (email: string) => {
  try {
    const res = await api.post("/auth/requestResetOtp", { email });
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
    const res = await api.post("/auth/verifyResetOtp", { email, otp });
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
  try {
    const response = await api.post("/auth/resetPassword", {
      email,
      otp,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// UPLOAD CAREGIVER REQUIREMENT DOCUMENTS
// ---------------------------------------------------------
export const uploadCaregiverRequirements = async (
  data: ICareRequirements
) => {
  try {
    const response = await api.post(
      "/caregiver-requirements/upload",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};
