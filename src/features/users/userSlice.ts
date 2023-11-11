import { apiSlice } from "../../app/api/apiSlice";

const getHeader = (token: string) => {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};
const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProfileImage: builder.mutation({
      query: ({ image, token }) => {
        const formData = new FormData();
        formData.append("image", image);

        return {
          url: "users/addProfileImage",
          method: "POST",
          headers: getHeader(token),
          body: formData,
          formData: true,
        };
      },
    }),
    getCurrentUser: builder.query({
      query: ({ userId }) => {
        return {
          url: `users/${userId}`,
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        };
      },
    }),
  }),
});

export const { useAddProfileImageMutation, useGetCurrentUserQuery } = userSlice;
