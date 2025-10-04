
import axios from "axios";
import config from "../config";
// axios.defaults.baseURL = "http://localhost:8080/api/v1/";
const apiEndPoint =
  process.env.NODE_ENV === "development"
    ? config.development.baseurl
    : config.production.baseurl;

export const urlBase = axios.create({
  baseURL: `${apiEndPoint}/api/v1/`, //all end points that require refreshertoken
});
export const authUrl = axios.create({
  baseURL: `${apiEndPoint}/api/v1/auth/`, //all endpoint that doesn't require refreshertoken
});
export const baseurl = axios.create({
  baseURL: "${apiEndPoint}/api/v1/",
});
let isRefreshed: boolean = false;
urlBase.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.status === 401 && !isRefreshed) {
      isRefreshed = true;
      const response = await urlBase.post(
        "auth/refreshToken",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("accc" + response.data.accessToken);
        urlBase.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return urlBase(error.config);
      }
    }
    isRefreshed = false;
    return error;
  }
);
