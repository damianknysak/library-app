import { useEffect, useState } from "react";

interface FetchProps {
  API_URL: string;
}

interface CategoryBookAuthor {
  key: string;
  name: string;
}

export interface CategoryBook {
  key: string;
  title: string;
  edition_count: number;
  first_publish_year: number;
  has_fulltext: boolean;
  public_scan_b: boolean;
  cover_edition_key: string;
  cover_i: number;
  language: string[];
  author_key: string[];
  authors: CategoryBookAuthor[];
}

interface CategoryBooksArray {
  works: CategoryBook[];
  name: string;
}

export const useCategoryBookWorkFetch = ({ API_URL }: FetchProps) => {
  const [pending, setPending] = useState<boolean>(false);
  const [data, setData] = useState<CategoryBooksArray>();

  const fetchAsync = async () => {
    setPending(true);
    const response = await fetch(API_URL);
    const responseJson = await response.json();
    if (responseJson.name === "juvenile fiction")
      responseJson.name = "juvenile_fiction";
    setData(responseJson);
    setPending(false);
  };

  useEffect(() => {
    fetchAsync();
  }, [API_URL]);
  return {
    pending,
    data,
  };
};
