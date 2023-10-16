import React, { useEffect, useState } from "react";
import TrendingBooks from "../components/Home/TrendingBooks";
import DetailsPanel from "../components/Home/DetailsPanel";
import { useTrendingBookFetch } from "../hooks/useTrendingBookFetch";
import { TrendingBook } from "../components/Home/TrendingBookCard";
import RecommendedBooks from "../components/Home/RecommendedBooks";
import SearchResults from "../components/Home/SearchResults";
import { useLocation } from "react-router-dom";
import { useSearchFetch } from "../hooks/useSearchFetch";
export interface TrendingBooksArray {
  works: TrendingBook[];
}

const Home: React.FC = () => {
  const { data: trendingBooksData } = useTrendingBookFetch({
    API_URL: "http://openlibrary.org/trending/daily.json?limit=10",
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") ? searchParams.get("search") : "";
  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();
  const { data: searchResultsData } = useSearchFetch();

  useEffect(() => {
    const isDetailPanelFromSearch =
      !search &&
      activeBookCard &&
      trendingBooksData &&
      !trendingBooksData?.works.find((book) => book.key === activeBookCard);
    console.log(`isDetailPanelFromSearch ${isDetailPanelFromSearch}`);
    if ((trendingBooksData && !activeBookCard) || isDetailPanelFromSearch) {
      setActiveBookCard(trendingBooksData?.works[0].key);
    }
  }, [trendingBooksData, activeBookCard, location]);

  const mergedData = [
    ...(trendingBooksData?.works || []),
    ...(searchResultsData?.docs || []),
  ];
  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <div className="flex flex-col w-full">
          {search ? (
            <SearchResults
              data={searchResultsData}
              activeBookCard={activeBookCard}
              setActiveBookCard={setActiveBookCard}
            />
          ) : (
            <>
              <RecommendedBooks
                activeBookCard={activeBookCard}
                setActiveBookCard={setActiveBookCard}
              />

              <TrendingBooks
                data={trendingBooksData}
                activeBookCard={activeBookCard}
                setActiveBookCard={setActiveBookCard}
              />
            </>
          )}
        </div>

        <div className="hidden lg:block lg:min-w-[25rem]">
          <DetailsPanel
            activeBook={activeBookCard}
            book={
              trendingBooksData || searchResultsData
                ? search
                  ? searchResultsData && searchResultsData!.query === search
                    ? mergedData.find(
                        (book: TrendingBook) => book.key === activeBookCard
                      )
                    : undefined
                  : mergedData.find(
                      (book: TrendingBook) => book.key === activeBookCard
                    )
                : undefined
            }
            categoryBook={undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
