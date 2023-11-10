import React, { useEffect, useState } from "react";
import TrendingBooks from "../components/Home/TrendingBooks";
import DetailsPanel from "../components/Home/DetailsPanel";
import { useTrendingBookFetch } from "../hooks/useTrendingBookFetch";
import { TrendingBook } from "../components/Home/TrendingBookCard";
import RecommendedBooks from "../components/Home/RecommendedBooks";
import SearchResults from "../components/Home/SearchResults";
import { useLocation } from "react-router-dom";
import { useSearchFetch } from "../hooks/useSearchFetch";
import bookSearchIndicator from "../assets/book_search.gif";

export interface TrendingBooksArray {
  works: TrendingBook[];
}

const Home: React.FC = () => {
  const [trendingBooksPage, setTrendingBooksPage] = useState(1);
  const [searchBooksPage, setSearchBooksPage] = useState(1);
  const {
    data: trendingBooksData,
    pending: trendingBooksPending,
    fetchAsync: refetchTrendingBooks,
  } = useTrendingBookFetch({
    API_URL: `http://openlibrary.org/trending/daily.json?limit=${
      10 * trendingBooksPage
    }`,
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") ? searchParams.get("search") : "";
  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();
  const {
    data: searchResultsData,
    pending: searchBooksPending,
    fetchAsync: refetchSearchBooks,
  } = useSearchFetch();
  useEffect(() => {
    const isDetailPanelFromSearch =
      !search &&
      activeBookCard &&
      trendingBooksData &&
      !trendingBooksData?.works.find((book) => book.key === activeBookCard);
    if ((trendingBooksData && !activeBookCard) || isDetailPanelFromSearch) {
      setActiveBookCard(trendingBooksData?.works[0].key);
    }
  }, [trendingBooksData, activeBookCard, location]);

  const mergedData = [
    ...(trendingBooksData?.works || []),
    ...(searchResultsData?.docs || []),
  ];

  //infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      trendingBooksPending
    ) {
      return;
    }
    if (!search) {
      refetchTrendingBooks({
        API_URL: `http://openlibrary.org/trending/daily.json?limit=${
          (trendingBooksPage + 1) * 10
        }`,
      });
      setTrendingBooksPage(trendingBooksPage + 1);
    } else {
      if (!searchBooksPending) {
        refetchSearchBooks(searchBooksPage + 1);
        setSearchBooksPage(searchBooksPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trendingBooksPending, searchBooksPending]);

  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full">
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
          {(trendingBooksPending || searchBooksPending) && (
            <div className="w-full flex items-center justify-center">
              <img
                className="object-contain"
                src={bookSearchIndicator}
                alt="loading books"
              />
            </div>
          )}
        </main>

        <aside className="hidden lg:block lg:min-w-[25rem]">
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
            author=""
            categoryBook={undefined}
          />
        </aside>
      </div>
    </div>
  );
};

export default Home;
