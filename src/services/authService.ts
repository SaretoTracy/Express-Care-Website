
import axios from "axios";
import type { ICaregiverSignup } from "../Interfaces/ICaregiverSignUp";

// Base URL of backend
const API_BASE_URL = "https://expresscareteam-backend-api.onrender.com";

// Function to register a caregiver
export const registerCaregiver = async (data: Partial<ICaregiverSignup>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register/caregiver`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
  
    if (error.response) {
  
      throw new Error(error.response.data.message || "Backend error occurred");
    } else if (error.request) {
   
      throw new Error("No response from server. Check your network.");
    } else {
    
      throw new Error(error.message || "An unexpected error occurred");
    }
  }
};
