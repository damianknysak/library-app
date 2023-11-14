import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSearchParams } from "react-router-dom";
import {
  useAddBookToLibraryMutation,
  useCheckBookInLibraryQuery,
  useRemoveBookFromLibraryMutation,
} from "../../features/librarybooks/libraryBooksSlice";
import { BiBookmark } from "react-icons/bi";
import { toast } from "react-toastify";

const SaveInLibraryButton: React.FC<{ bookUrl: string; book: any }> = ({
  bookUrl,
  book,
}) => {
  const [isBookLiked, setIsBookLiked] = useState<boolean>(false);
  const token = useSelector(selectCurrentToken);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isError, isFetching, refetch } = useCheckBookInLibraryQuery({
    body: {
      bookUrl: bookUrl,
    },
    token: token,
  });
  const [addLike] = useAddBookToLibraryMutation();
  const [removeLike] = useRemoveBookFromLibraryMutation();
  const handleClick = () => {
    if (!token) {
      toast.warn("Zaloguj się, by zapisać!");
      return;
    }
    if (isBookLiked) {
      setIsBookLiked(false);
      removeLike({ body: { bookUrl: bookUrl }, token: token });
    } else {
      setIsBookLiked(true);
      addLike({
        body: {
          bookUrl: bookUrl,
          book: book,
        },
        token: token,
      });
    }
  };

  useEffect(() => {
    if (!isError && !isFetching) {
      setIsBookLiked(true);
    } else {
      setIsBookLiked(false);
    }
  }, [isError, isFetching]);

  useEffect(() => {
    refetch();
  }, [bookUrl]);
  return (
    <>
      <button
        onClick={handleClick}
        className={`flex flex-col items-center ${
          isBookLiked && "border-[--secondary]"
        } `}
      >
        <BiBookmark
          className={`h-8 w-8 md:h-14 md:w-14 ${
            isBookLiked ? "text-[--secondary]" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm md:text-lg  ${
            isBookLiked ? "text-[--secondary]" : "text-gray-500"
          }`}
        >
          Zapisz
        </span>
      </button>
    </>
  );
};

export default SaveInLibraryButton;
