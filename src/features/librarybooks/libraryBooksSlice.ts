import { apiSlice } from "../../app/api/apiSlice";
import { LibraryBooksStats } from "../../components/MyLibrary/MyLibraryStats";
import { ExtendedBookProps } from "../likedbooks/likedBooksSlice";

export type LibraryBook = {
  _id: string;
  bookUrl: string;
  userId: string;
  book: ExtendedBookProps;
  isRead: boolean;
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
      query: ({ token, page = 1 }) => {
        console.log(`/librarybooks?page=${page}`);
        return {
          url: `/librarybooks?page=${page}`,
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["LibraryBooksList"],
      transformResponse: (response: GetLibraryBooksProps) => {
        return response;
      },
    }),
    getLibraryBooksStats: builder.query({
      query: ({ token }) => {
        return {
          url: "/librarybooks/stats",
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["LibraryBooksStats"],
      transformResponse: (response: LibraryBooksStats) => {
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
      invalidatesTags: ["LibraryBooksList", "LibraryBooksStats"],
    }),
    removeBookFromLibrary: builder.mutation({
      query: ({ body, token }) => {
        console.log(`/librarybooks/remove`);
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
      invalidatesTags: ["LibraryBooksList", "LibraryBooksStats"],
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
    updateLibraryBook: builder.mutation({
      query: ({ body, token }) => {
        return {
          url: "/librarybooks/update",
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
      invalidatesTags: ["LibraryBooksStats"],
    }),
  }),
});

export const {
  useAddBookToLibraryMutation,
  useCheckBookInLibraryQuery,
  useRemoveBookFromLibraryMutation,
  useGetBooksFromLibraryQuery,
  useUpdateLibraryBookMutation,
  useGetLibraryBooksStatsQuery,
} = libraryBooksSlice;
