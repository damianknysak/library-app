import React, { useEffect, useState } from "react";
import { DetailedBookProps } from "../Home/DetailsPanel";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Skeleton from "react-loading-skeleton";
import LikeButton from "./LikeButton";
import ShareUrlButton from "./ShareUrlButton";
import { Rating } from "react-simple-star-rating";
import SaveInLibraryButton from "./SaveInLibraryButton";
import { BiPlus } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

export type AuthorProps = {
  name: string;
  photos: Number[];
  key: string;
};

const BookCardDetailsModal: React.FC<{ book: DetailedBookProps }> = ({
  book,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [author, setAuthor] = useState<AuthorProps>();

  const getAuthorDetails = async () => {
    if (book.authors && book.authors[0].author.key) {
      try {
        const response = await fetch(
          `https://openlibrary.org${book.authors[0].author.key}.json`
        );
        const responseJson = await response.json();
        return responseJson;
      } catch (e) {
        console.error(e);
      }
    }
    return undefined;
  };

  useEffect(() => {
    //resetting the state
    if (book && author && book.authors[0].author.key != author?.key) {
      setAuthor(undefined);
    }

    if (book && !author) {
      (async () => {
        const authorProps = await getAuthorDetails();
        setAuthor(authorProps);
      })();
    }
  }, [book, author]);

  return (
    <div className="relative overflow-hidden flex flex-col p-10 w-[40rem] h-[40rem]  md:w-[60rem] md:h-[50rem] justify-center bg-white rounded-lg">
      <div
        onClick={() => {
          const currentParams = new URLSearchParams(searchParams.toString());
          currentParams.delete("BookDetailsId");
          setSearchParams(currentParams);
        }}
        className="absolute cursor-pointer top-5 right-5 z-10 rotate-45 bg-black/50 hover:bg-black/75 transition-all rounded-full"
      >
        <BiPlus size={40} color="white" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-56 bg-[--primary] ">
        {book && book.covers && (
          <img
            className={`backdrop-blur-lg blur-xl w-full h-full border-2 ${
              !isImageLoaded && "hidden"
            }  rounded-xl`}
            src={`https://covers.openlibrary.org/b/id/${book?.covers[0]}-M.jpg`}
            alt={book?.title}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        )}
      </div>
      <div className="flex flex-col">
        <div className="z-10 w-full flex justify-center">
          {!isImageLoaded && (!book || book.covers) && (
            <Skeleton className="mt-10" width={200} height={288} />
          )}
          {book && (
            <>
              {book.covers ? (
                <img
                  className={`md:mt-10 h-56 md:h-72 object-contain bg-black border-2 ${
                    !isImageLoaded && "hidden"
                  }  rounded-xl`}
                  src={`https://covers.openlibrary.org/b/id/${book?.covers[0]}-M.jpg`}
                  alt={book?.title}
                  onLoad={() => {
                    setIsImageLoaded(true);
                  }}
                />
              ) : (
                <div className="w-40 h-60 backdrop-blur-md border-2 rounded-xl flex items-center justify-center">
                  <span className="text-black">Brak okładki</span>
                </div>
              )}
            </>
          )}
        </div>
        <section className="flex flex-col items-center mt-2 space-y-1 md:space-y-2">
          <div className="z-10">
            {book ? (
              <div className="text-white flex space-x-2 items-center">
                <Rating
                  readonly
                  className="mb-1"
                  allowFraction
                  size={30}
                  initialValue={book?.ratings.average}
                />

                <span className="text-black text-lg">
                  {book?.ratings.average && book?.ratings.average.toFixed(2)}
                </span>
              </div>
            ) : (
              <Skeleton height={30} width={120} />
            )}
          </div>
          <div className="z-10">
            <span className="text-lg md:text-xl font-bold">
              {book ? book.title : <Skeleton height={28} width={200} />}
            </span>
          </div>
          <div className="z-10">
            <span className="md:text-xl text-gray-500">
              {author ? author.name : <Skeleton height={28} width={150} />}
            </span>
          </div>
          <div className="flex space-x-5">
            {book && author ? (
              <div className="w-24 h-20 flex items-center justify-center">
                <LikeButton
                  book={{ bookDetails: book, authorDetails: author }}
                  bookUrl={book.key}
                />
              </div>
            ) : (
              <Skeleton width={96} height={80} />
            )}
            {book && author ? (
              <div className="w-24 h-20 flex items-center justify-center">
                <SaveInLibraryButton
                  book={{ bookDetails: book, authorDetails: author }}
                  bookUrl={book.key}
                />
              </div>
            ) : (
              <Skeleton width={96} height={80} />
            )}

            {book && author ? (
              <div className="w-24 h-20 flex items-center justify-center">
                <ShareUrlButton />
              </div>
            ) : (
              <Skeleton width={96} height={80} />
            )}
          </div>
        </section>
      </div>
      <div className="w-full border border-gray-500 my-2 md:my-5"></div>
      {book ? (
        <article className="z-10 p-10 pt-0 overflow-auto">
          {book.description ? book.description : "Brak opisu."}
        </article>
      ) : (
        <>
          <Skeleton height={24} />
          <Skeleton height={24} />
          <Skeleton height={24} />
          <Skeleton height={24} />
        </>
      )}
    </div>
  );
};

export default BookCardDetailsModal;
