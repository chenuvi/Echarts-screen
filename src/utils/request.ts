import axios, { AxiosResponse, AxiosInstance } from "axios";

let _env = import.meta.env;
let url = _env.VITE_HOST_URL;

interface ResponseData<T = any> {
  success: boolean;
  message: string;
  data: T;
}

const service: AxiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use((response: AxiosResponse<ResponseData>) => {
  const { success, message, data } = response.data;
  if (success) {
    return data;
  } else {
    return Promise.reject(new Error(message));
  }
});

export default service;
