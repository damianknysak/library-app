import { apiSlice } from "../../app/api/apiSlice";

const libraryBooksSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBookToLibrary: builder.mutation({
      query: ({ body, token }) => {
        return {
          url: "/librarybooks/add",
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
    removeBookFromLibrary: builder.mutation({
      query: ({ body, token }) => {
        return {
          url: "/librarybooks/remove",
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
    checkBookInLibrary: builder.query({
      query: ({ body, token }) => ({
        url: "/librarybooks/check",
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

export const {
  useAddBookToLibraryMutation,
  useCheckBookInLibraryQuery,
  useRemoveBookFromLibraryMutation,
} = libraryBooksSlice;
