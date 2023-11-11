import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
import { RootState } from "../store";

export const BASE_API_URL = "http://localhost:8080";
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
  endpoints: (builder) => ({}),
});
