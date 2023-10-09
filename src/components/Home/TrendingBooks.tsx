import React, {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch";
import {Book} from "./TrendingBookCard";
import TrendingBookCard from "./TrendingBookCard";

export interface BooksArray {
  works: Book[];
}

const TrendingBooks: React.FC = () => {
  const {data} = useFetch({
    API_URL: "http://openlibrary.org/trending/daily.json?limit=6",
  });

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();

  useEffect(() => {
    if (data && !activeBookCard) {
      setActiveBookCard(data?.works[0].cover_edition_key);
    }
  }, [data, activeBookCard]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 my-5">
      {data &&
        data.works.map((book) => (
          <TrendingBookCard
            key={book.cover_edition_key}
            book={book}
            activeBookCard={activeBookCard}
            setActiveBookCard={setActiveBookCard}
          />
        ))}
    </div>
  );
};

export default TrendingBooks;
