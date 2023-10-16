import React, { useEffect } from "react";
import {
  CategoryBook,
  useCategoryBookWorkFetch,
} from "../../hooks/useCategoryBookWorkFetch";
import TrendingBookCard from "../Home/TrendingBookCard";
import BookFromCategoryCard from "./BookFromCategoryCard";
import { LOADING_TRENDING_BOOKS_DATASET } from "../../Datasets";

interface BooksFromCategoriesProps {
  categorySubject: string;
  activeBookCard: string | undefined;
  setActiveBookCard: React.Dispatch<React.SetStateAction<string | undefined>>;
  data: { works: CategoryBook[] } | undefined;
}
const BooksFromCategories: React.FC<BooksFromCategoriesProps> = ({
  categorySubject,
  activeBookCard,
  setActiveBookCard,
  data,
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
      {data ? (
        <>
          {data?.works.map((book) => {
            return (
              <BookFromCategoryCard
                key={book.key}
                book={book}
                setActiveBookCard={setActiveBookCard}
                activeBookCard={activeBookCard}
              />
            );
          })}
        </>
      ) : (
        <>
          {LOADING_TRENDING_BOOKS_DATASET.map((item, index) => {
            return (
              <BookFromCategoryCard
                key={item.index}
                book={undefined}
                setActiveBookCard={setActiveBookCard}
                activeBookCard={activeBookCard}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default BooksFromCategories;
