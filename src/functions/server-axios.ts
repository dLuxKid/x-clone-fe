"use server";

import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.BACKEND_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const authToken = (await cookies()).get("jwt")?.value;

    if (authToken) config.headers["Authorization"] = `Bearer ${authToken}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
