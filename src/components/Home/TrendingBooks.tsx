import React from "react";
import { LOADING_TRENDING_BOOKS_DATASET } from "../../Datasets";
import TrendingBookCard, { TrendingBook } from "./TrendingBookCard";
import { TrendingBooksArray } from "../../Pages/Home";

interface TrendingBookProps {
  data: TrendingBooksArray | undefined;
  activeBookCard: string | undefined;
  setActiveBookCard: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TrendingBooks: React.FC<TrendingBookProps> = ({
  data,
  activeBookCard,
  setActiveBookCard,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 flex-1">
        {data ? (
          <>
            {data.works.map((book) => (
              <TrendingBookCard
                key={book.key}
                book={book}
                activeBookCard={activeBookCard}
                setActiveBookCard={setActiveBookCard}
              />
            ))}
          </>
        ) : (
          <>
            {LOADING_TRENDING_BOOKS_DATASET.map((item, index) => {
              return (
                <TrendingBookCard
                  key={item.index}
                  book={undefined}
                  activeBookCard={undefined}
                  setActiveBookCard={undefined}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default TrendingBooks;
