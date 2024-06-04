import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // adjust baseURL to your Rails API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
