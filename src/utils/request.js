import axios from "axios";

let _env = import.meta.env;
// 开发环境走代理，生产环境走服务端
let url = _env.VITE_HOST_URL;
// let url = _env.MODE == "development" ? _env.VITE_HOST_URL : _env.VITE_HOST_URL;

const service = axios.create({
  baseURL: url,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // config.headers.icode = ''
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use((response) => {
  const { success, message, data } = response.data;
  if (success) {
    return data;
  } else {
    return Promise.reject(new Error(message));
  }
});

export default service;
