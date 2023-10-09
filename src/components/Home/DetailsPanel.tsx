import React, {useEffect, useState} from "react";
import {useBookDetailedFetch} from "../../hooks/useBookDetailedFetch";
import {TrendingBook} from "./TrendingBookCard";
import Skeleton from "react-loading-skeleton";
import {Rating} from "react-simple-star-rating";

export interface SummaryRatingProps {
  average: number;
  count: number;
  sortable: number;
}

export interface DetailedBookProps {
  title: string;
  key: string;
  description: string;
  subjects: string[];
  covers: string[];
  ratings: SummaryRatingProps;
}

interface DetailedPanelProps {
  activeBook: string | undefined;
  book: TrendingBook | undefined;
}

const DetailsPanel: React.FC<DetailedPanelProps> = ({activeBook, book}) => {
  const {data, pending} = useBookDetailedFetch({WORKS_KEY: activeBook});
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [data]);
  return (
    <div className="hidden xl:flex flex-col items-center space-y-4 pt-10 min-w-[20rem] ml-10 p-2 bg-red-900">
      <span className="text-white text-lg font-bold text-center">
        {book?.title || <Skeleton height={30} width={230} />}
      </span>
      {!isImageLoaded && <Skeleton width={160} height={240} />}
      {activeBook && book && (
        <div
          className={`w-40 h-60 rounded-xl bg-black/50 backdrop-blur-md ${
            !isImageLoaded && "hidden"
          }`}
        >
          <img
            className={`w-40 h-60 object-contain border-2 ${
              !isImageLoaded && "hidden"
            }  rounded-xl`}
            src={`https://covers.openlibrary.org/b/id/${data?.covers[0]}-L.jpg`}
            alt={data?.title}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        </div>
      )}

      {book ? (
        <div className="flex items-center space-x-5 text-white font-bold">
          <span>{book.author_name.join(", ")}</span>
          <span>{book.first_publish_year}</span>
        </div>
      ) : (
        <Skeleton height={20} width={150} />
      )}

      {book ? (
        <div className="text-white flex space-x-2 items-center">
          <Rating
            className="mb-1"
            allowFraction
            size={20}
            initialValue={data?.ratings.average}
            /* Available Props */
          />

          <span>{data?.ratings.average.toFixed(2)}</span>
        </div>
      ) : (
        <Skeleton height={20} width={100} />
      )}
    </div>
  );
};

export default DetailsPanel;
