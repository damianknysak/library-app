import {useEffect, useState} from "react";
import {DetailedBookProps} from "../components/Home/DetailsPanel";

interface FetchProps {
  WORKS_KEY: string | undefined;
}

export const useBookDetailedFetch = ({WORKS_KEY}: FetchProps) => {
  const [pending, setPending] = useState<boolean>(false);
  const [data, setData] = useState<DetailedBookProps>();

  const fetchAsync = async () => {
    if (!WORKS_KEY) return;
    setPending(true);
    const response = await fetch(`https://openlibrary.org${WORKS_KEY}.json`);
    const responseJson = await response.json();

    const ratingsResponse = await fetch(
      `https://openlibrary.org${WORKS_KEY}/ratings.json`
    );
    const ratingsResponseJson = await ratingsResponse.json();

    responseJson.ratings = ratingsResponseJson.summary;
    setData(responseJson);
    setPending(false);
  };

  useEffect(() => {
    fetchAsync();
  }, [WORKS_KEY]);
  return {
    pending,
    data,
  };
};
