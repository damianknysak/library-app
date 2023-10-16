import React, { useEffect } from "react";
import {
  SearchFetchResultsProps,
  useSearchFetch,
} from "../../hooks/useSearchFetch";
import TrendingBookCard from "./TrendingBookCard";
import { useLocation } from "react-router-dom";
import bookSearchIndicator from "../../assets/book_search.gif";
import { LOADING_TRENDING_BOOKS_DATASET } from "../../Datasets";
interface SearchResultsProps {
  activeBookCard: string | undefined;
  setActiveBookCard: React.Dispatch<React.SetStateAction<string | undefined>>;
  data: SearchFetchResultsProps | undefined;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  activeBookCard,
  setActiveBookCard,
  data,
}) => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const search = urlParams.get("search") ? urlParams.get("search") : "";
  useEffect(() => {
    if (data) setActiveBookCard(data.docs[0].key);
  }, [data]);
  return (
    <>
      {data && data.query === search ? (
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row p-10 items-center justify-between">
            <span className="text-xl">
              Wyszukiwanie: <span className="font-bold">{search}</span>{" "}
            </span>
            <span>
              Liczba wyników: <span className="font-bold">{data.numFound}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
            {data.docs.map((book) => (
              <TrendingBookCard
                key={book.key}
                book={book}
                activeBookCard={activeBookCard}
                setActiveBookCard={setActiveBookCard}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="w-full flex items-center justify-center">
            <img
              className="object-contain"
              src={bookSearchIndicator}
              alt="loading books"
            />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
            {LOADING_TRENDING_BOOKS_DATASET.map((book) => (
              <TrendingBookCard
                key={book.index}
                book={undefined}
                activeBookCard={undefined}
                setActiveBookCard={undefined}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;
