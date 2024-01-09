import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const BASE_API_URL = "http://35.240.73.109";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const authState = (getState() as RootState).auth;
    const token = authState!.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: [
    "LibraryBooksStats",
    "LibraryBooksList",
    "LikedBooksStats",
    "LikedBooksList",
  ],
  endpoints: (builder) => ({}),
});
