import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ExtendedBookProps } from "../../features/likedbooks/likedBooksSlice";

const FavoriteBookCard: React.FC<{
  bookUrl: string;
  activeBookCard: string | undefined;
  setActiveBookCard:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
  bookExtended: ExtendedBookProps;
}> = ({ bookUrl, activeBookCard, setActiveBookCard, bookExtended }) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <div
      onClick={() => {
        setActiveBookCard && setActiveBookCard(bookUrl);
      }}
      className={`${
        bookExtended.bookDetails.key &&
        activeBookCard !== bookExtended.bookDetails.key &&
        "bg-white"
      } ${
        (!bookExtended.bookDetails ||
          activeBookCard === bookExtended.bookDetails.key) &&
        "bg-[--primary]"
      } border-2  border-[--primary] flex min-h-[14rem] p-3 rounded-xl items-center max-h-[16rem] cursor-pointer`}
    >
      {!isImageLoaded && <Skeleton width={160} height={240} />}

      <div
        className={`w-40 h-60 ${
          !isImageLoaded && "hidden"
        } rounded-xl bg-black/80 backdrop-blur-md flex items-center justify-center`}
      >
        {bookExtended.bookDetails && (
          <>
            {bookExtended.bookDetails.covers ? (
              <img
                className={`w-40 h-60 object-contain border-2 ${
                  !isImageLoaded && "hidden"
                }  rounded-xl`}
                src={`https://covers.openlibrary.org/b/id/${bookExtended.bookDetails.covers[0]}-M.jpg`}
                alt={bookExtended.bookDetails.title}
                onLoad={() => {
                  setIsImageLoaded(true);
                }}
              />
            ) : (
              <div className="w-40 h-60 border-2 rounded-xl flex items-center justify-center">
                <span className="text-white">Brak okładki</span>
              </div>
            )}
          </>
        )}
      </div>

      <div
        className={`flex-1 transition-all ${
          activeBookCard !== bookExtended.bookDetails.key
            ? "text-black"
            : "text-white"
        } ml-3`}
      >
        <span className="font-bold ">
          {bookExtended.bookDetails.title || (
            <Skeleton
              height={30}
              width={200}
              baseColor="white"
              highlightColor="gray"
            />
          )}
        </span>
        <div className="text-sm">
          {!bookExtended.authorDetails.name ? (
            <>
              <Skeleton
                height={20}
                width={100}
                baseColor="white"
                highlightColor="gray"
              />
            </>
          ) : (
            <>
              <span>{bookExtended.authorDetails.name}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default FavoriteBookCard;
