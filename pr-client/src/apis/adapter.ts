import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";
import { setMessage } from "../store/error";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_BASE_PATH,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

// axiosInstance.interceptors.request.use(
//   (config: AxiosRequestConfig) => {},
//   (error: AxiosError) => {
//     store.dispatch(setMessage({ message: error.message }));

//     console.log("\x1b[32m", "\n--------------Debug----------------\n");
//     console.log("\x1b[36m", "req error = ", error);
//     console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   // eslint-disable-next-line arrow-body-style
//   (response: AxiosResponse) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     store.dispatch(setMessage({ message: error.message }));

//     console.log("\x1b[32m", "\n--------------Debug----------------\n");
//     console.log("\x1b[36m", "req error = ", error);
//     console.log("\x1b[32m", "\n-----------------------------------", "\x1b[0m");
//     return Promise.reject(error);

//   }
// );

export default axiosInstance;
