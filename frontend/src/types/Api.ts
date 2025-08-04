import axios from 'axios';
import { RefreshToken } from "@/services/AuthServices"; 

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

Api.interceptors.request.use((config) => {
  const accessToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('access_token='))?.split('=')[1];

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

Api.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refresh_token='))?.split('=')[1];

      if (!refreshToken) {
        console.log('No refresh token available.');
        return Promise.reject(error); 
      }

      try {
        const refreshResponse = await RefreshToken({ refreshToken });

        if (refreshResponse.data && refreshResponse.data.token && refreshResponse.data.refreshToken) {
          document.cookie = `access_token=${refreshResponse.data.token}; path=/; SameSite=Strict`;
          document.cookie = `refresh_token=${refreshResponse.data.refreshToken}; path=/; HttpOnly; Secure; SameSite=Strict`;

          error.config.headers['Authorization'] = `Bearer ${refreshResponse.data.token}`;
          return axios(error.config);
        } else {
          console.log('Failed to refresh token: Missing response data');
          return Promise.reject(new Error("Failed to refresh token: response data is missing."));
        }
      } catch (refreshError) {
        console.log('Error during token refresh:', refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError); 
      }
    }
    return Promise.reject(error); 
  }
);

export default Api;
