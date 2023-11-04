import { useSelector } from "react-redux";
import { apiSlice } from "../../app/api/apiSlice";
import { selectCurrentToken } from "../auth/authSlice";

export const likedBooksSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLike: builder.mutation({
      query: ({ body, token }) => {
        return {
          url: "/likedbooks/add",
          method: "POST",
          body: {
            ...body,
          },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    removeLike: builder.mutation({
      query: ({ body, token }) => {
        return {
          url: "/likedbooks/remove",
          method: "POST",
          body: {
            ...body,
          },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    checkLike: builder.query({
      query: ({ body, token }) => ({
        url: "/likedbooks/check",
        method: "POST",
        body: {
          ...body,
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useAddLikeMutation, useCheckLikeQuery, useRemoveLikeMutation } =
  likedBooksSlice;
