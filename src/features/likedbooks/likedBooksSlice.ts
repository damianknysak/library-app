import { apiSlice } from "../../app/api/apiSlice";
import { DetailedBookProps } from "../../components/Home/DetailsPanel";
import { TrendingBook } from "../../components/Home/TrendingBookCard";
import { AuthorProps } from "../../components/Shared/BookCardDetailsModal";

const getHeader = (token: string) => {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export type ExtendedBookProps = {
  bookDetails: DetailedBookProps;
  authorDetails: AuthorProps;
};

export type LikedBook = {
  _id: string;
  bookUrl: string;
  userId: string;
  book: ExtendedBookProps;
};

export type GetLikedBooksProps = {
  length: number;
  likedBooks: LikedBook[];
  message: string;
  page: number;
};

export type LikedBooksStats = {
  topSubjects: { el: string; count: number }[];
  topAuthors: { el: string; count: number }[];
  totalAmount: number;
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
      providesTags: ["LikedBooksList"],
      transformResponse: (response: GetLikedBooksProps) => {
        return response;
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
      invalidatesTags: ["LikedBooksList", "LikedBooksStats"],
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
      invalidatesTags: ["LikedBooksList", "LikedBooksStats"],
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
    getLikedBooksRecommendations: builder.query({
      query: ({ token }) => {
        return {
          url: "/likedbooks/recommendations",
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      transformResponse: (response: {
        length: number;
        recommendedBooks: TrendingBook[];
        userId: string;
      }) => {
        return response;
      },
    }),
    getLikedBooksStats: builder.query({
      query: ({ token }) => {
        return {
          url: "/likedbooks/stats",
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["LikedBooksStats"],
      transformResponse: (response: LikedBooksStats) => {
        return response;
      },
    }),
  }),
});

export const {
  useAddLikeMutation,
  useCheckLikeQuery,
  useRemoveLikeMutation,
  useGetLikedBooksQuery,
  useGetLikedBooksStatsQuery,
  useGetLikedBooksRecommendationsQuery,
} = likedBooksSlice;
