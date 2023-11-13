import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { shortenString } from "../../utils/StringUtils";

export interface TrendingBook {
  key: string;
  title: string;
  edition_count: number;
  first_publish_year: number;
  has_fulltext: boolean;
  public_scan_b: boolean;
  cover_edition_key: string;
  cover_i: number;
  language: string[];
  authors: { name: string }[] | undefined;
  author_key: string[];
  author_name: string[];
}

interface TrendingBookCardProps {
  book: TrendingBook | undefined;
  activeBookCard: string | undefined;
  setActiveBookCard:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
}

const TrendingBookCard: React.FC<TrendingBookCardProps> = ({
  book,
  activeBookCard,
  setActiveBookCard,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  useEffect(() => {
    if (book) {
      if (!book.cover_edition_key && !book.cover_i && book.title) {
        setIsImageLoaded(true);
      }
    }
  }, [book]);

  return (
    <div
      onClick={() => {
        setActiveBookCard && setActiveBookCard(book?.key);
      }}
      className={`${
        activeBookCard !== book?.key ? "bg-white" : "bg-[--primary]"
      } border-2  border-[--primary] flex min-h-[14rem] p-3 rounded-xl items-center max-h-[16rem] cursor-pointer`}
    >
      {!isImageLoaded && <Skeleton width={160} height={240} />}
      {book && (
        <div
          className={`w-40 h-60 ${
            !isImageLoaded && "hidden"
          } rounded-xl bg-black/80 backdrop-blur-md flex items-center justify-center`}
        >
          {(book?.cover_edition_key || book?.cover_i) && !imageError ? (
            <img
              className={`w-40 h-60 object-contain border-2 ${
                !isImageLoaded && "hidden h-60"
              } ${
                activeBookCard !== book?.key
                  ? "border-[--primary]"
                  : "border-white"
              } rounded-xl`}
              src={`http://covers.openlibrary.org/b/${
                book?.cover_edition_key ? "olid" : "id"
              }/${
                book?.cover_edition_key
                  ? book?.cover_edition_key
                  : book?.cover_i
              }-M.jpg`}
              alt={book?.title}
              onError={() => {
                setIsImageLoaded(true);
                setImageError(true);
              }}
              onLoad={() => {
                setIsImageLoaded(true);
              }}
            />
          ) : (
            <>
              <span className="text-white text-center text-xs">
                {imageError ? "Błąd Open Library API" : "Brak okładki"}
              </span>
            </>
          )}
        </div>
      )}

      <div
        className={`flex-1 transition-all ${
          activeBookCard !== book?.key ? "text-black" : "text-white"
        } ml-3`}
      >
        <span className="font-bold ">
          {book?.title || (
            <Skeleton
              height={30}
              width={200}
              baseColor="white"
              highlightColor="gray"
            />
          )}
        </span>
        <div className="text-sm">
          {!book?.first_publish_year || (!book.author_name && !book.authors) ? (
            <>
              {!book ? (
                <Skeleton
                  height={20}
                  width={100}
                  baseColor="white"
                  highlightColor="gray"
                />
              ) : (
                <span>Brak informacji</span>
              )}
            </>
          ) : (
            <>
              <span>
                {!book.authors
                  ? shortenString(book?.author_name.join(", "), 4)
                  : shortenString(book.authors[0].name, 4)}
              </span>
              <span> &middot; {book?.first_publish_year}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingBookCard;
