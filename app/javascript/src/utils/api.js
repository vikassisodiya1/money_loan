import axiosInstance from "../utils/axiosInstance";

const api = axiosInstance;

api.interceptors.request.use(
  (config) => {
    // You can modify the request configuration here (e.g., add authorization tokens)
    const token = localStorage.getItem("token");
    if (token && token.includes('Bearer')){
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = async (url, params = {}) => {
  const response = await api.get(url, { params });
  return response.data;
};

export const post = async (url, data) => {
  const response = await api.post(url, data);
  return response.data;
};

export const put = async (url, data) => {
  const response = await api.put(url, data);
  return response.data;
};

export const del = async (url) => {
  // Shorter syntax for delete
  const response = await api.delete(url);
  return response.data;
};
