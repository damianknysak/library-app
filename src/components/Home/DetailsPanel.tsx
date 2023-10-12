import React, { useEffect, useState } from "react";
import { useBookDetailedFetch } from "../../hooks/useBookDetailedFetch";
import { TrendingBook } from "./TrendingBookCard";
import Skeleton from "react-loading-skeleton";
import { Rating } from "react-simple-star-rating";
import { shortenString } from "../../utils/StringUtils";

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

const DetailsPanel: React.FC<DetailedPanelProps> = ({ activeBook, book }) => {
  const { data, pending } = useBookDetailedFetch({ WORKS_KEY: activeBook });
  const [detailsBookInfo, setDetailsBookInfo] = useState<
    DetailedBookProps | undefined
  >();
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (pending) {
      setDetailsBookInfo(undefined);
      setIsImageLoaded(false);
    } else {
      setDetailsBookInfo(data);
    }
  }, [pending]);

  return (
    <aside className="lg:fixed right-0 top-15 w-[25rem]">
      <div className="mx-10 hidden lg:flex flex-col items-center space-y-4 p-14 bg-[--primary] h-[50rem]">
        <span className="text-white text-lg font-bold text-center">
          {book?.title || <Skeleton height={30} width={230} />}
        </span>
        {!isImageLoaded && <Skeleton width={160} height={240} />}
        {activeBook && book && detailsBookInfo && (
          <div
            className={`w-40 h-60 rounded-xl bg-black/50 backdrop-blur-md ${
              !isImageLoaded && "hidden"
            }`}
          >
            <img
              className={`w-40 h-60 object-contain border-2 ${
                !isImageLoaded && "hidden"
              }  rounded-xl`}
              src={`https://covers.openlibrary.org/b/id/${detailsBookInfo?.covers[0]}-L.jpg`}
              alt={detailsBookInfo?.title}
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
          <Skeleton height={20} width={180} />
        )}

        {detailsBookInfo ? (
          <div className="text-white flex space-x-2 items-center">
            <Rating
              readonly
              className="mb-1"
              allowFraction
              size={20}
              initialValue={detailsBookInfo?.ratings.average}
            />

            <span>{detailsBookInfo?.ratings.average.toFixed(2)}</span>
          </div>
        ) : (
          <Skeleton height={20} width={120} />
        )}

        {detailsBookInfo ? (
          <span className="text-white">
            {shortenString(detailsBookInfo.description, 20).text}{" "}
          </span>
        ) : (
          <Skeleton height={20} width={200} count={3} />
        )}

        <button className=" bg-[--secondary] p-3 px-10 text-white font-bold rounded-xl">
          <span>Pokaż więcej</span>
        </button>
      </div>
    </aside>
  );
};

export default DetailsPanel;
