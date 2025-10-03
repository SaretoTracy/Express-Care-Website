import axios from "axios";
import { ILogin } from "../Interfaces/ILogin";
import { ILoginRes } from "../Interfaces/apiResponse/ILoginRes";
import { authUrl, urlBase } from "../intercepters/axios";
import { ICaregiverSignup } from "../Interfaces/ICaregiverSignUp";
import { ISignup } from "../Interfaces/ISignup";
import { ICaregiverAddress } from "../Interfaces/IAddress";
import { IHomeInfo } from "../Interfaces/IProviderSignup";
export const login = async (data: ILogin) => {
  const response = await authUrl.post<ILoginRes>("login", data, {
    headers: { Authorization: "" },
    withCredentials: true,
  });
  return response;
};
export const signup = async (data: ISignup) => {
  const response = await authUrl.post<ILoginRes>("signup", data, {
    withCredentials: true,
  });
  return response;
};
export const postCaregiverAddress = async (data: ICaregiverAddress) => {
  const res = await urlBase.post<any, any>("caregiver/address/new", data);
  return res;
};
export const postProviderAddress = async (data: IHomeInfo) => {
  const res = await urlBase.post<IHomeInfo,any>("provider/address", data);
  return res
};
