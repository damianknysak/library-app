import React from "react";

export interface Book {
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
  author_name: string[];
}

interface TrendingBookCardProps {
  book: Book;
  activeBookCard: string | undefined;
  setActiveBookCard: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TrendingBookCard: React.FC<TrendingBookCardProps> = ({
  book,
  activeBookCard,
  setActiveBookCard,
}) => {
  return (
    <div
      onClick={() => {
        setActiveBookCard(book.cover_edition_key);
      }}
      className={`${
        activeBookCard !== book.cover_edition_key ? "bg-white" : "bg-red-900"
      } border-2  border-red-900 flex min-h-[14rem] p-3 rounded-xl items-center`}
    >
      <img
        className={`w-40 object-contain border-2 ${
          activeBookCard !== book.cover_edition_key
            ? "border-red-900"
            : "border-white"
        } rounded-xl`}
        src={`http://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`}
        alt={book.title}
      />

      <div
        className={`flex-1 transition-all ${
          activeBookCard !== book.cover_edition_key
            ? "text-black"
            : "text-white"
        } ml-3`}
      >
        <span className="font-bold ">{book.title}</span>
        <div className="text-sm">
          <span>{book.author_name.join(", ")}</span>
          <span> &middot; {book.first_publish_year}</span>
        </div>
      </div>
    </div>
  );
};

export default TrendingBookCard;
