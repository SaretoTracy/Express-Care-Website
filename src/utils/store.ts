
import type { ILoginRes } from "../Interfaces/apiREsponse/ILoginRes";
import { decryptData, encryptData } from "./dataEncryption";
const _USERID = "_US_IF_ID";
const _USER_ROLE = "_US_IF_RE";
const _USERINFO = "_US_IF_PS";
export const setUserInfo = (userInfo: ILoginRes) => {
  const data = encryptData(userInfo.user);
  localStorage.setItem(_USERINFO, data);
};
export const setUserRole = (role: string) => {
  const data = encryptData(role);
  localStorage.setItem(_USER_ROLE, data);
};
export const setUserId = (id: number) => {
  const data = encryptData(id);
  localStorage.setItem(_USERID, data);
};
export const getUserInfo = () => {
  const data = localStorage.getItem(_USERINFO);
  if (data !== null) return(decryptData(data)) 
  else return null;
};
export const getUserRole = () => {
  const data = localStorage.getItem(_USER_ROLE);
  if (data !== null) return decryptData(data);
  else return null;
};
export const getUserId = () => {
  const data = localStorage.getItem(_USERID);
  if (data !== null) return decryptData(data);
  else return null;
};
export const clearStore = () => localStorage.clear();
