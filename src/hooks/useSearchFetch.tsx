import { useEffect, useState } from "react";
import { TrendingBooksArray } from "../Pages/Home";
import { useLocation } from "react-router-dom";
import { TrendingBook } from "../components/Home/TrendingBookCard";

export interface SearchFetchResultsProps {
  numFound: number;
  docs: TrendingBook[];
  query: string;
}

export const useSearchFetch = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [data, setData] = useState<SearchFetchResultsProps>();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const search = urlParams.get("search") ? urlParams.get("search") : "";

  const fetchAsync = async (page = 1) => {
    setPending(true);
    console.log(
      `https://openlibrary.org/search.json?q=${search}&limit=${10 * page}`
    );
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${search}&limit=${10 * page}`
    );
    const responseJson = await response.json();
    responseJson.query = search;
    setData(responseJson);
    setPending(false);
  };

  useEffect(() => {
    if (search && !pending) fetchAsync();
  }, [search]);
  return {
    pending,
    data,
    fetchAsync,
  };
};
