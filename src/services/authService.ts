import { api } from "./api";
import type { ICaregiverSignup } from "../Interfaces/ICaregiverSignUp";
import type { IProviderSignup } from "../Interfaces/IProviderSignUp";
import type { ILogin } from "../validation/signupValidation";
import type { ICareRequirements } from "../Interfaces/ICareRequirements";
import type {
  IApplyJob,
  ICreateJob,
  IJob,
  IJobApplication,
  IJobList,
} from "../Interfaces/IJobs";
import axios from "axios";

// ---------------------------------------------------------
// CUSTOM API ERROR CLASS
// ---------------------------------------------------------
export class ApiError extends Error {
  public readonly status: number | undefined;
  public readonly data: unknown;
  public readonly originalError: unknown;

  constructor(message: string, originalError: unknown) {
    super(message);
    this.name = "ApiError";
    this.originalError = originalError;

    if (axios.isAxiosError(originalError)) {
      this.status = originalError.response?.status;
      this.data = originalError.response?.data;
    }
  }
}

// ---------------------------------------------------------
// CENTRALIZED ERROR HANDLER
// Re-throws original Axios error so interceptor chain works
// ---------------------------------------------------------
const handleError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw error;
  }

  if (error instanceof Error) {
    throw new ApiError(error.message, error);
  }

  throw new ApiError("An unexpected error occurred", error);
};

// ---------------------------------------------------------
// REGISTER CAREGIVER
// ---------------------------------------------------------
export const registerCaregiver = async (
  data: Partial<ICaregiverSignup>
) => {
  try {
    const response = await api.post(
      "/api/auth/register/caregiver",
      data
    );
    return response.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// REGISTER PROVIDER
// ---------------------------------------------------------
export const registerProvider = async (data: IProviderSignup) => {
  try {
    const response = await api.post(
      "/api/auth/register/provider",
      data
    );
    return response.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// LOGIN USER
// ---------------------------------------------------------
export const loginUser = async (data: ILogin) => {
  try {
    const res = await api.post("/api/auth/login", data);
    return res.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// LOGOUT USER
// ---------------------------------------------------------
export const logoutUser = async () => {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// GET CURRENT USER
// No /me endpoint exists — returns from localStorage only
// ---------------------------------------------------------
export const getCurrentUser = async () => {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
};

// ---------------------------------------------------------
// REQUEST RESET OTP
// ---------------------------------------------------------
export const requestResetOtp = async (email: string) => {
  try {
    const res = await api.post("/api/auth/requestResetOtp", {
      email,
    });
    return res.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// VERIFY RESET OTP
// ---------------------------------------------------------
export const verifyResetOtp = async (
  email: string,
  otp: string
) => {
  try {
    const res = await api.post("/api/auth/verifyResetOtp", {
      email,
      otp,
    });
    return res.data;
  } catch (error: unknown) {
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
    const response = await api.post("/api/auth/resetPassword", {
      email,
      otp,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error: unknown) {
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
      "/api/caregiver-requirements/upload",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error: unknown) {
    handleError(error);
  }
};

// ---------------------------------------------------------
// CREATE JOB
// ---------------------------------------------------------
export const createJob = async (data: ICreateJob) => {
  try {
    const response = await api.post("/api/jobs", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("CREATE JOB ERROR:", JSON.stringify(error.response?.data, null, 2));
      console.log("STATUS:", error.response?.status);
    }
    throw error;
  }
};

// ---------------------------------------------------------
// GET JOBS BY HOME ID
// ---------------------------------------------------------
export const getJobsByHome = async (
  adultHomeId: string
): Promise<IJobList> => {
  try {
    const response = await api.get("/api/jobs/home", {
      params: { homeId: adultHomeId },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("GET JOBS BY HOME ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// GET SINGLE JOB BY ID
// ---------------------------------------------------------
export const getJobById = async (jobId: string): Promise<IJob> => {
  try {
    const response = await api.get(`/api/jobs/${jobId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("GET JOB BY ID ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// UPDATE IS FILLED
// ---------------------------------------------------------
export const updateJobIsFilled = async (
  jobId: string,
  homeId: string,
  isJobFilled: boolean
): Promise<void> => {
  try {
    await api.patch(
      "/api/jobs/update/isFilled",
      { isJobFilled },
      { params: { jobId, homeId } }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("UPDATE IS FILLED ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// UPDATE A JOB
// ---------------------------------------------------------
export const updateJob = async (
  jobId: string,
  homeId: string,
  data: Partial<ICreateJob>
): Promise<IJob> => {
  try {
    const response = await api.patch("/api/jobs/update", data, {
      params: { jobId, homeId },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("UPDATE JOB ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// DELETE A JOB
// ---------------------------------------------------------
export const deleteJob = async (jobId: string): Promise<void> => {
  try {
    const response = await api.delete("/api/jobs", {
      params: { jobId },
    });
    console.log("DELETE JOB SUCCESS:", response.status);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("DELETE JOB ERROR status:", error.response?.status);
      console.log("DELETE JOB ERROR body:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// GET ALL JOBS
// ---------------------------------------------------------
export const getAllJobs = async (): Promise<IJobList> => {
  try {
    const response = await api.get("/api/jobs");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("GET ALL JOBS ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// APPLY FOR A JOB
// ---------------------------------------------------------
export const applyForJob = async (
  data: IApplyJob
): Promise<IJobApplication> => {
  try {
    const response = await api.post("/api/jobs/application", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("APPLY JOB ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// GET APPLICATION BY ID
// ---------------------------------------------------------
export const getApplicationById = async (
  applicationId: string
): Promise<IJobApplication> => {
  try {
    const response = await api.get(
      `/api/jobs/application/${applicationId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("GET APPLICATION ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// GET ALL APPLICATIONS BY JOB
// ---------------------------------------------------------
export const getApplicationsByJob = async (
  jobId: string
): Promise<IJobApplication[]> => {
  try {
    const response = await api.get("/api/jobs/application/job", {
      params: { jobId },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("GET APPLICATIONS BY JOB ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// GET ALL APPLICATIONS BY CAREGIVER
// ---------------------------------------------------------
export const getApplicationsByCaregiver = async (
  caregiverId: string
): Promise<IJobApplication[]> => {
  try {
    const response = await api.get(
      "/api/jobs/application/caregiver",
      { params: { caregiverId } }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("GET APPLICATIONS BY CAREGIVER ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// ACCEPT APPLICATION
// ---------------------------------------------------------
export const acceptApplication = async (
  applicationId: string,
  homeId: string,
  caregiverId: string
): Promise<IJobApplication> => {
  try {
    const response = await api.patch(
      "/api/jobs/application/accept",
      { applicationId, homeId, caregiverId }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("ACCEPT APPLICATION ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// REJECT APPLICATION
// ---------------------------------------------------------
export const rejectApplication = async (
  applicationId: string,
  homeId: string,
  caregiverId: string
): Promise<IJobApplication> => {
  try {
    const response = await api.patch(
      "/api/jobs/application/reject",
      { applicationId, homeId, caregiverId }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("REJECT APPLICATION ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};

// ---------------------------------------------------------
// GET CAREGIVER BY ID
// ---------------------------------------------------------
export const getCaregiverById = async (caregiverId: string) => {
  try {
    const response = await api.get(`/api/caregiver/${caregiverId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("GET CAREGIVER BY ID ERROR:", JSON.stringify(error.response?.data, null, 2));
    }
    throw error;
  }
};