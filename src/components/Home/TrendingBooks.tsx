import React, {useEffect, useState} from "react";
import {TrendingBook} from "./TrendingBookCard";
import TrendingBookCard from "./TrendingBookCard";
import DetailsPanel from "./DetailsPanel";
import {useTrendingBookFetch} from "../../hooks/useTrendingBookFetch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export interface TrendingBooksArray {
  works: TrendingBook[];
}

const TrendingBooks: React.FC = () => {
  const {data} = useTrendingBookFetch({
    API_URL: "http://openlibrary.org/trending/daily.json?limit=6",
  });

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();

  useEffect(() => {
    if (data && !activeBookCard) {
      setActiveBookCard(data?.works[0].key);
    }
  }, [data, activeBookCard]);

  return (
    <div className="flex w-full">
      {data ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-5">
          {data.works.map((book) => (
            <TrendingBookCard
              key={book.key}
              book={book}
              activeBookCard={activeBookCard}
              setActiveBookCard={setActiveBookCard}
            />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-5">
          <TrendingBookCard
            book={undefined}
            activeBookCard={undefined}
            setActiveBookCard={undefined}
          />
          <TrendingBookCard
            book={undefined}
            activeBookCard={undefined}
            setActiveBookCard={undefined}
          />
          <TrendingBookCard
            book={undefined}
            activeBookCard={undefined}
            setActiveBookCard={undefined}
          />
          <TrendingBookCard
            book={undefined}
            activeBookCard={undefined}
            setActiveBookCard={undefined}
          />
          <TrendingBookCard
            book={undefined}
            activeBookCard={undefined}
            setActiveBookCard={undefined}
          />
          <TrendingBookCard
            book={undefined}
            activeBookCard={undefined}
            setActiveBookCard={undefined}
          />
        </div>
      )}
      <DetailsPanel
        activeBook={activeBookCard}
        book={
          data
            ? data?.works.find((book) => book.key === activeBookCard)
            : undefined
        }
      />
    </div>
  );
};

export default TrendingBooks;
