import React, { useEffect, useState } from "react";
import { TrendingBook } from "./TrendingBookCard";
import TrendingBookCard from "./TrendingBookCard";
import DetailsPanel from "./DetailsPanel";
import { useTrendingBookFetch } from "../../hooks/useTrendingBookFetch";
import "react-loading-skeleton/dist/skeleton.css";
import { LOADING_TRENDING_BOOKS_DATASET } from "../../Datasets";
export interface TrendingBooksArray {
  works: TrendingBook[];
}

const TrendingBooks: React.FC = () => {
  const { data } = useTrendingBookFetch({
    API_URL: "http://openlibrary.org/trending/daily.json?limit=20",
  });

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();

  useEffect(() => {
    if (data && !activeBookCard) {
      setActiveBookCard(data?.works[0].key);
    }
  }, [data, activeBookCard]);

  return (
    <div className="flex lg:ml-[15rem]">
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
      <div className="hidden lg:block lg:w-[25rem]">
        <DetailsPanel
          activeBook={activeBookCard}
          book={
            data
              ? data?.works.find((book) => book.key === activeBookCard)
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default TrendingBooks;
