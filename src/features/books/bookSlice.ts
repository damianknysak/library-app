import { createSlice } from "@reduxjs/toolkit";
import { DetailedBookProps } from "../../components/Home/DetailsPanel";

type BookSlice = {
  currentBook: DetailedBookProps | undefined;
};

const initialState: BookSlice = {
  currentBook: undefined,
};

const bookSlice = createSlice({
  name: "books",
  reducers: {
    setCurrentBook: (state, action: { payload: DetailedBookProps }) => {
      state.currentBook = { ...action.payload };
    },
  },
  initialState: initialState,
});

export default bookSlice.reducer;

export const { setCurrentBook } = bookSlice.actions;

export const selectCurrentBook = (state: { books: BookSlice }) =>
  state.books.currentBook;
