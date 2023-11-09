import { apiSlice } from "../../app/api/apiSlice";
import { ExtendedBookProps } from "../likedbooks/likedBooksSlice";

export type LibraryBook = {
  _id: string;
  bookUrl: string;
  userId: string;
  book: ExtendedBookProps;
};

export type GetLibraryBooksProps = {
  length: number;
  libraryBooks: LibraryBook[];
  message: string;
  page: number;
};

const libraryBooksSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooksFromLibrary: builder.query({
      query: ({ token, page }) => {
        return {
          url: `/librarybooks?page=${page}`,
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response: GetLibraryBooksProps) => {
        return response;
      },
    }),
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
  useGetBooksFromLibraryQuery,
} = libraryBooksSlice;
