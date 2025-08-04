import { type ApiResponse } from "@/types/ApiResponse";
import Api from "@/types/Api"; 

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

export async function apiPost<T>(endpoint: string, payload: any): Promise<ApiResponse<T>> {
  try {
    const response = await Api.post<ApiResponse<T>>(endpoint, payload); 
    return response.data;
  } catch (error) {
    console.error("POST error:", error);
    return {
      isSuccess: false,
      isError: true,
      message: "An error occurred during POST.",
      data: null,
    };
  }
}
