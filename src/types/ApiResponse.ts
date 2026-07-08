export interface ApiResponse<T> {
  isSuccess: boolean;
  isError: boolean;
  message: string;
  data: T | null;
}
