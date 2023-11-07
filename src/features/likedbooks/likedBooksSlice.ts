import { useSelector } from "react-redux";
import { apiSlice } from "../../app/api/apiSlice";
import { selectCurrentToken } from "../auth/authSlice";

const getHeader = (token: string) => {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const likedBooksSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLikedBooks: builder.query({
      query: ({ token, page }) => {
        return {
          url: `/likedbooks?page=${page}`,
          method: "GET",
          headers: getHeader(token),
        };
      },
    }),
    addLike: builder.mutation({
      query: ({ body, token }) => {
        return {
          url: "/likedbooks/add",
          method: "POST",
          body: {
            ...body,
          },
          headers: getHeader(token),
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
          headers: getHeader(token),
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
        headers: getHeader(token),
      }),
    }),
  }),
});

export const {
  useAddLikeMutation,
  useCheckLikeQuery,
  useRemoveLikeMutation,
  useGetLikedBooksQuery,
} = likedBooksSlice;
