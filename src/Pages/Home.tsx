import React, { useEffect, useState } from "react";
import TrendingBooks from "../components/Home/TrendingBooks";
import DetailsPanel from "../components/Home/DetailsPanel";
import { useTrendingBookFetch } from "../hooks/useTrendingBookFetch";
import { TrendingBook } from "../components/Home/TrendingBookCard";
export interface TrendingBooksArray {
  works: TrendingBook[];
}

const Home: React.FC = () => {
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
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <TrendingBooks
          data={data}
          activeBookCard={activeBookCard}
          setActiveBookCard={setActiveBookCard}
        />
        <div className="hidden lg:block lg:w-[25rem]">
          <DetailsPanel
            activeBook={activeBookCard}
            book={
              data
                ? data?.works.find(
                    (book: TrendingBook) => book.key === activeBookCard
                  )
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
