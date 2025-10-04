import axios from "axios";
import type { ILoginRes } from "../Interfaces/apiREsponse/ILoginRes";
import type { ICaregiverAddress } from "../Interfaces/IAddress";
import type { ILogin } from "../Interfaces/Ilogin";
import type { IHomeInfo } from "../Interfaces/IProviderSignUp";
import type { ISignup } from "../Interfaces/ISignUp";

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
