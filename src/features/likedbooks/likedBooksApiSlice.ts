import { useSelector } from "react-redux";
import { apiSlice } from "../../app/api/apiSlice";
import { selectCurrentToken } from "../auth/authSlice";

export const likedBooksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLike: builder.mutation({
      query: ({ credentials, token }) => {
        return {
          url: "/likedbooks/add",
          method: "POST",
          body: {
            ...credentials,
          },
          headers: {
            Accept: "application/json",
            Authorization: `Bearer: ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useAddLikeMutation } = likedBooksApiSlice;
