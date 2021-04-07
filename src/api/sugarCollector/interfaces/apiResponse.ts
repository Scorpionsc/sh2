export interface ApiResponse<T> {
  isLoading: boolean;
  data: T | null;
  error: Error | null;
  reFetch: () => void;
}
