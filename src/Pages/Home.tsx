import React, { useEffect, useState } from "react";
import TrendingBooks from "../components/Home/TrendingBooks";
import DetailsPanel from "../components/Home/DetailsPanel";
import { useTrendingBookFetch } from "../hooks/useTrendingBookFetch";
import { TrendingBook } from "../components/Home/TrendingBookCard";
import RecommendedBooks from "../components/Home/RecommendedBooks";
export interface TrendingBooksArray {
  works: TrendingBook[];
}

const Home: React.FC = () => {
  const { data: trendingBooksData } = useTrendingBookFetch({
    API_URL: "http://openlibrary.org/trending/daily.json?limit=20",
  });

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();

  useEffect(() => {
    if (trendingBooksData && !activeBookCard) {
      setActiveBookCard(trendingBooksData?.works[0].key);
    }
  }, [trendingBooksData, activeBookCard]);

  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <div className="flex flex-col w-full">
          <RecommendedBooks
            activeBookCard={activeBookCard}
            setActiveBookCard={setActiveBookCard}
          />

          <TrendingBooks
            data={trendingBooksData}
            activeBookCard={activeBookCard}
            setActiveBookCard={setActiveBookCard}
          />
        </div>

        <div className="hidden lg:block lg:min-w-[25rem]">
          <DetailsPanel
            activeBook={activeBookCard}
            book={
              trendingBooksData
                ? trendingBooksData?.works.find(
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
