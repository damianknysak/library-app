import { apiSlice } from "../../app/api/apiSlice";

const authHeaders = {
  "Content-Length": "<calculated when request is sent>",
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => {
        return {
          url: "/users/login",
          method: "POST",
          body: {
            ...credentials,
          },
          headers: authHeaders,
        };
      },
    }),
    register: builder.mutation({
      query: (credentials) => {
        return {
          url: "/users/register",
          method: "POST",
          body: {
            ...credentials,
          },
          headers: authHeaders,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
