import * as dotenv from 'dotenv';
import { development, local } from '../configs/constant';
dotenv.config();

// const apiBaseUrl =
//   process.env.NODE_ENV === development
//     ? process.env.WN_BACKEND_DEV_URL
//     : process.env.NODE_ENV === local
//       ? process.env.WN_BACKEND_LOCAL_URL
//       : process.env.WN_BACKEND_LIVE_URL;

const apiBaseUrl = 'localhost:3000/api/v1';

export class PaginationLink {
  first: string = '';
  previous: string | null = null;
  next: string | null = null;
  last: string = '';

  constructor(
    currentPage: number,
    totalPages: number,
    itemsPerPage: number,
    baseUrl?: string,
  ) {
    this.first = `${apiBaseUrl}?page=1&limit=${itemsPerPage}`;
    this.previous =
      currentPage > 1
        ? `${apiBaseUrl}?page=${currentPage - 1}&limit=${itemsPerPage}`
        : null;
    this.next =
      currentPage < totalPages
        ? `${baseUrl}?page=${currentPage + 1}&limit=${itemsPerPage}`
        : null;
    this.last = `${apiBaseUrl}?page=${totalPages}&limit=${itemsPerPage}`;
  }
}
