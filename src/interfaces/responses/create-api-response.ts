export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  data?: T;
}

export const createApiResponse = (
  message: string,
  statusCode: number,
  data: any,
) => ({
  message,
  statusCode,
  data,
});
