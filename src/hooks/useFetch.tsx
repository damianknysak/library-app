import {useEffect, useState} from "react";
import {BooksArray} from "../components/Home/TrendingBooks";

interface FetchProps {
  API_URL: string;
}

export const useFetch = ({API_URL}: FetchProps) => {
  const [pending, setPending] = useState<boolean>(false);
  const [data, setData] = useState<BooksArray>();

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
