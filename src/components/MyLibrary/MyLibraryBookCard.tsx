import React, { useEffect, useState } from "react";
import { useBookDetailedFetch } from "../../hooks/useBookDetailedFetch";
import Skeleton from "react-loading-skeleton";
import { AuthorProps } from "../Shared/BookCardDetailsModal";

const MyLibraryBookCard: React.FC<{
  bookUrl: string;
  activeBookCard: string | undefined;
  setActiveBookCard:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
  activeAuthor: string | undefined;
  setActiveAuthor:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
}> = ({
  bookUrl,
  activeBookCard,
  setActiveBookCard,
  activeAuthor,
  setActiveAuthor,
}) => {
  const { data: book } = useBookDetailedFetch({ WORKS_KEY: bookUrl });
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const [author, setAuthor] = useState<AuthorProps>();

  const getAuthorDetails = async () => {
    if (book!.authors && book!.authors[0].author.key) {
      const response = await fetch(
        `https://openlibrary.org${book!.authors[0].author.key}.json`
      );
      const responseJson = await response.json();
      return responseJson;
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
    <div
      onClick={() => {
        setActiveBookCard && setActiveBookCard(book?.key);
        setActiveAuthor && setActiveAuthor(author?.name);
      }}
      className={`${book && activeBookCard !== book?.key && "bg-white"} ${
        (!book || activeBookCard === book?.key) && "bg-[--primary]"
      } border-2  border-[--primary] flex min-h-[14rem] p-3 rounded-xl items-center max-h-[16rem] cursor-pointer`}
    >
      <div>
        {!isImageLoaded && <Skeleton width={160} height={240} />}
        {book && (
          <>
            {book.covers ? (
              <img
                className={`w-40 h-60 object-contain border-2 ${
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
          {!author?.name ? (
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
              <span>{author.name}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLibraryBookCard;
