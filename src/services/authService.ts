import { api } from "./api";
import type { ICaregiverSignup } from "../Interfaces/ICaregiverSignUp";
import type { IProviderSignup } from "../Interfaces/IProviderSignUp";
import type { ILogin } from "../validation/signupValidation";
import type { ICareRequirements } from "../Interfaces/ICareRequirements";
import type { ICreateJob, IJob, IJobList } from "../Interfaces/IJobs";

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


// ---------------------------------------------------------
// CREATE JOB
// ---------------------------------------------------------

export const createJob = async (data: ICreateJob) => {
  try {
    const response = await api.post("/jobs", data);
    return response.data;
  } catch (error: any) {
    console.log("CREATE JOB ERROR:", JSON.stringify(error.response?.data, null, 2));
    console.log("STATUS:", error.response?.status);
    console.log("PAYLOAD SENT:", JSON.stringify(data, null, 2));
    throw error;
  }
};


// ---------------------------------------------------------
// Get Jobs By Home ID
// ---------------------------------------------------------


export const getJobsByHome = async (adultHomeId: string): Promise<IJobList> => {
  try {
    const response = await api.get("/jobs/home", { params: { homeId: adultHomeId } });
    return response.data;
  } catch (error: any) {
    console.log("GET JOBS BY HOME ERROR:", JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
};


// ---------------------------------------------------------
// Get Single Job by ID
// ---------------------------------------------------------

export const getJobById = async (jobId: string): Promise<IJob> => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error: any) {
    console.log("GET JOB BY ID ERROR:", JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
};




// ---------------------------------------------------------
// Update Is Filled
// ---------------------------------------------------------



export const updateJobIsFilled = async (
  jobId: string,
  homeId: string,
  isJobFilled: boolean
): Promise<void> => {
  try {
    await api.patch("/jobs/update/isFilled", { isJobFilled }, { params: { jobId, homeId } });
  } catch (error: any) {
    console.log("UPDATE IS FILLED ERROR:", JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
};


// ---------------------------------------------------------
//Update a Job
// ---------------------------------------------------------





export const updateJob = async (
  jobId: string,
  homeId: string,
  data: Partial<ICreateJob>
): Promise<IJob> => {
  try {
    const response = await api.patch("/jobs/update", data, {
      params: { jobId, homeId },
    });
    return response.data;
  } catch (error: any) {
    console.log("UPDATE JOB ERROR:", JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
};



// ---------------------------------------------------------
//Delete a job
// ---------------------------------------------------------

export const deleteJob = async (jobId: string): Promise<void> => {
  try {
    const response = await api.delete("/jobs", { params: { jobId } });
    console.log("DELETE JOB SUCCESS:", response.status, JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.log("DELETE JOB ERROR status:", error.response?.status);
    console.log("DELETE JOB ERROR body:", JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
};