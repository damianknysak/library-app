import React, {useEffect, useState} from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  return (
    <div
      onClick={() => {
        setActiveBookCard && setActiveBookCard(book?.key);
      }}
      className={`${
        activeBookCard !== book?.key ? "bg-white" : "bg-red-900"
      } border-2  border-red-900 flex min-h-[14rem] p-3 rounded-xl items-center`}
    >
      {!isImageLoaded && <Skeleton width={160} height={240} />}
      <div
        className={`w-40 h-60 ${
          !isImageLoaded && "hidden"
        } rounded-xl bg-black/80 backdrop-blur-md`}
      >
        <img
          className={`w-40 h-60 object-contain border-2 ${
            !isImageLoaded && "hidden h-60"
          } ${
            activeBookCard !== book?.key ? "border-red-900" : "border-white"
          } rounded-xl`}
          src={`http://covers.openlibrary.org/b/olid/${book?.cover_edition_key}-M.jpg`}
          alt={book?.title}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
        />
      </div>

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
          {!book?.first_publish_year || !book.author_name ? (
            <Skeleton
              height={20}
              width={100}
              baseColor="white"
              highlightColor="gray"
            />
          ) : (
            <>
              {" "}
              <span>{book?.author_name.join(", ")}</span>
              <span> &middot; {book?.first_publish_year}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingBookCard;
