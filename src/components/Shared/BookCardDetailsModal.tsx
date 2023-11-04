import React, { useEffect, useState } from "react";
import { DetailedBookProps } from "../Home/DetailsPanel";
import { BiSolidBookAlt } from "react-icons/bi";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Skeleton from "react-loading-skeleton";
import LikeButton from "./LikeButton";
import AddToLibraryButton from "./AddToLibraryButton";
import ShareUrlButton from "./ShareUrlButton";
import { Rating } from "react-simple-star-rating";

export type AuthorProps = {
  name: string;
  photos: Number[];
  key: string;
};

const BookCardDetailsModal: React.FC<{ book: DetailedBookProps }> = ({
  book,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const [author, setAuthor] = useState<AuthorProps>();

  const getAuthorDetails = async () => {
    if (book.authors && book.authors[0].author.key) {
      const response = await fetch(
        `https://openlibrary.org${book.authors[0].author.key}.json`
      );
      const responseJson = await response.json();
      return responseJson;
    }
    return undefined;
  };

  useLockBodyScroll();

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
    <div className="relative overflow-hidden flex flex-col p-10 md:w-[60rem] md:h-[50rem] justify-center bg-white rounded-lg">
      <div className="absolute top-0 left-0 right-0 h-56 bg-[--primary] ">
        {book && book.covers && (
          <img
            className={` backdrop-blur-lg blur-xl w-full h-full border-2 ${
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
          {!isImageLoaded && (
            <Skeleton className="mt-10" width={200} height={288} />
          )}
          {book && (
            <>
              {book.covers ? (
                <img
                  className={`mt-10 h-72 object-contain bg-black border-2 ${
                    !isImageLoaded && "hidden"
                  }  rounded-xl`}
                  src={`https://covers.openlibrary.org/b/id/${book?.covers[0]}-M.jpg`}
                  alt={book?.title}
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
        <section className="flex flex-col items-center mt-2 space-y-2">
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
            <span className="text-xl font-bold">
              {book ? book.title : <Skeleton height={28} width={200} />}
            </span>
          </div>
          <div className="z-10">
            <span className="text-xl text-gray-500">
              {author ? author.name : <Skeleton height={28} width={150} />}
            </span>
          </div>
          <div className="flex space-x-5">
            {book ? (
              <div className="w-24 h-20 flex items-center justify-center">
                <LikeButton bookUrl={book.key} />
              </div>
            ) : (
              <Skeleton width={96} height={80} />
            )}
            {book ? (
              <div className="w-24 h-20 flex items-center justify-center">
                <AddToLibraryButton bookUrl={book.key} />
              </div>
            ) : (
              <Skeleton width={96} height={80} />
            )}

            {book ? (
              <div className="w-24 h-20 flex items-center justify-center">
                <ShareUrlButton />
              </div>
            ) : (
              <Skeleton width={96} height={80} />
            )}
          </div>
        </section>
      </div>
      {book ? (
        <article className="z-10 p-10 overflow-auto">
          {book.description}
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
