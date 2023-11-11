import React, { useEffect, useState } from "react";
import { useBookDetailedFetch } from "../../hooks/useBookDetailedFetch";
import Skeleton from "react-loading-skeleton";
import { AuthorProps } from "../Shared/BookCardDetailsModal";
import { ExtendedBookProps } from "../../features/likedbooks/likedBooksSlice";
import {
  LibraryBook,
  useUpdateLibraryBookMutation,
} from "../../features/librarybooks/libraryBooksSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { BiSolidFlame } from "react-icons/bi";

const MyLibraryBookCard: React.FC<{
  bookUrl: string;
  activeBookCard: string | undefined;
  setActiveBookCard:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
  bookExtended: LibraryBook;
}> = ({ bookUrl, activeBookCard, setActiveBookCard, bookExtended }) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [updateBook] = useUpdateLibraryBookMutation();
  const token = useSelector(selectCurrentToken);
  const [isRead, setIsRead] = useState<boolean>(bookExtended.isRead ?? false);
  return (
    <div
      onClick={() => {
        setActiveBookCard && setActiveBookCard(bookUrl);
      }}
      className={`${bookExtended && activeBookCard !== bookUrl && "bg-white"} ${
        (!bookUrl || activeBookCard === bookUrl) && "bg-[--primary]"
      } border-2  border-[--primary] flex min-h-[14rem] p-3 rounded-xl items-center max-h-[16rem] cursor-pointer`}
    >
      {!isImageLoaded && <Skeleton width={160} height={240} />}

      <div
        className={`w-40 h-60 ${
          !isImageLoaded && "hidden"
        } rounded-xl bg-black/80 backdrop-blur-md flex items-center justify-center`}
      >
        {bookExtended && (
          <>
            {bookExtended.book.bookDetails.covers ? (
              <img
                className={`w-40 h-60 object-contain border-2 ${
                  !isImageLoaded && "hidden"
                }  rounded-xl`}
                src={`https://covers.openlibrary.org/b/id/${bookExtended.book.bookDetails?.covers[0]}-M.jpg`}
                alt={bookExtended.book.bookDetails.title}
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
          activeBookCard !== bookExtended.book.bookDetails.key
            ? "text-black"
            : "text-white"
        } ml-3`}
      >
        <span className="font-bold ">
          {bookExtended.book.bookDetails.title || (
            <Skeleton
              height={30}
              width={200}
              baseColor="white"
              highlightColor="gray"
            />
          )}
        </span>
        <div className="text-sm">
          {!bookExtended.book.authorDetails.name ? (
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
              <span>{bookExtended.book.authorDetails.name}</span>
            </>
          )}
        </div>
        {bookExtended && (
          <button
            onClick={() => {
              updateBook({
                token: token,
                body: {
                  bookUrl: bookUrl,
                  isRead: !isRead,
                },
              });
              setIsRead(!isRead);
            }}
            className={`flex mt-5 items-center justify-center gap-1 p-2 border ${
              isRead ? "border-green-500" : "border-orange-500"
            }  rounded-xl ${isRead ? "text-green-500" : "text-[--secondary]"}`}
          >
            <span className="font-bold ">
              {!isRead ? "Oznacz jako przeczytane" : "Przeczytane"}
            </span>{" "}
            <BiSolidFlame color="orange" size={30} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MyLibraryBookCard;
