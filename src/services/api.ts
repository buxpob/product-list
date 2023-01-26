import { BACKEND_URL, REQUEST_TIMEOUT } from '../consts/consts';
import { processErrorHandle } from './../process-error-handle';
import axios, { AxiosInstance } from 'axios';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        processErrorHandle(error.message);
      }

      throw error;
    },
  );

  return api;
};
