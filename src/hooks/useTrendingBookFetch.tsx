import { useEffect, useState } from "react";
import { TrendingBooksArray } from "../Pages/Home";

interface FetchProps {
  API_URL: string;
}

export const useTrendingBookFetch = ({ API_URL }: FetchProps) => {
  const [pending, setPending] = useState<boolean>(false);
  const [data, setData] = useState<TrendingBooksArray>();

  const fetchAsync = async () => {
    setPending(true);
    const response = await fetch(API_URL);
    const responseJson = await response.json();
    setData(responseJson);
    setPending(false);
  };

  useEffect(() => {
    fetchAsync();
  }, []);
  return {
    pending,
    data,
  };
};
