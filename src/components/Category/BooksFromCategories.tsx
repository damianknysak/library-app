import React from "react";
import { CategoryBook } from "../../hooks/useCategoryBookWorkFetch";
import BookFromCategoryCard from "./BookFromCategoryCard";
import { LOADING_TRENDING_BOOKS_DATASET } from "../../Datasets";

interface BooksFromCategoriesProps {
  activeBookCard: string | undefined;
  setActiveBookCard: React.Dispatch<React.SetStateAction<string | undefined>>;
  data: CategoryBook[];
}
const BooksFromCategories: React.FC<BooksFromCategoriesProps> = ({
  activeBookCard,
  setActiveBookCard,
  data,
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
      {data ? (
        <>
          {data?.map((book) => {
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
