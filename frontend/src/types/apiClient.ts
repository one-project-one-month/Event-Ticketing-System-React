import { type ApiResponse } from "@/types/ApiResponse";
import Api from "@/types/Api";
import type { AxiosError } from "axios";

export async function apiGet<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await Api.get<ApiResponse<T>>(endpoint);
    return response.data;
  } catch (error) {
    console.error("GET error:", error);
    return {
      isSuccess: false,
      isError: true,
      message: "An error occurred during GET.",
      data: null,
    };
  }
}

export async function apiPost<T>(
  endpoint: string,
  payload: any,
): Promise<ApiResponse<T>> {
  try {
    const response = await Api.post<ApiResponse<T>>(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("POST error:", error);
    return {
      isSuccess: false,
      isError: true,
      message: error.response.data.message || "An error occurred during POST.",
      data: null,
    };
  }
}

export async function apiPostFormWithQuery<
  TResponse,
  TQuery extends Record<string, string | number | boolean | string[]>,
>(
  endpoint: string,
  query: TQuery,
  formData: FormData,
): Promise<ApiResponse<TResponse>> {
  try {
    const queryString = new URLSearchParams();

    for (const key in query) {
      const value = query[key];
      if (Array.isArray(value)) {
        value.forEach((v) => queryString.append(key, v));
      } else {
        queryString.append(key, value.toString());
      }
    }

    const response = await Api.post<ApiResponse<TResponse>>(
      `${endpoint}?${queryString.toString()}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return response.data;
  } catch (error) {
    console.error("POST with query error:", error);
    return {
      isSuccess: false,
      isError: true,
      message: "An error occurred during POST with query.",
      data: null,
    };
  }
}
