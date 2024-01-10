import axios from "axios";

import { AppError } from "@utils/AppError";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_API;

export const api = axios.create({ baseURL: API_URL });

api.interceptors.response.use(
  response => response,

  error => {
    if (error.response ?? error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(
        new AppError(
          "Something went wrong with the server. Please try again later."
        )
      );
    }
  }
);
