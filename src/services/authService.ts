
import axios from "axios";
import type { ICaregiverSignup } from "../Interfaces/ICaregiverSignUp";
import type { IProviderSignup } from "../Interfaces/IProviderSignUp";
import type { ILogin } from "../validation/signupValidation";

// Base URL of backend
const API_BASE_URL = "https://expresscareteam-backend-api.onrender.com/api/auth";

// Function to register a caregiver
export const registerCaregiver = async (data: Partial<ICaregiverSignup>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/caregiver`, data, {
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

export const registerProvider = async (data: IProviderSignup) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register/provider`, data, {
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


export const loginUser = async (data: ILogin) => {
    const res = await axios.post(`${API_BASE_URL}/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
  
    return res.data;
  };