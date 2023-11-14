import React, { useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import {
  useAddLikeMutation,
  useCheckLikeQuery,
  useRemoveLikeMutation,
} from "../../features/likedbooks/likedBooksSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const LikeButton: React.FC<{ bookUrl: string; book: any }> = ({
  bookUrl,
  book,
}) => {
  const [isBookLiked, setIsBookLiked] = useState<boolean>(false);
  const token = useSelector(selectCurrentToken);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isError, isFetching, refetch } = useCheckLikeQuery({
    body: {
      bookUrl: bookUrl,
      book: book,
    },
    token: token,
  });
  const [addLike] = useAddLikeMutation();
  const [removeLike] = useRemoveLikeMutation();
  const handleClick = () => {
    if (!token) {
      toast.warn("Zaloguj się, by dać like");
      return;
    }
    if (isBookLiked) {
      setIsBookLiked(false);
      removeLike({
        body: { bookUrl: bookUrl },
        token: token,
      });
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
          isBookLiked && "border-red-600"
        } `}
      >
        <BiHeart
          className={`h-8 w-8 md:h-14 md:w-14 ${
            isBookLiked ? "text-red-600" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm md:text-lg  ${
            isBookLiked ? "text-red-600" : "text-gray-500"
          }`}
        >
          Lubię to
        </span>
      </button>
    </>
  );
};

export default LikeButton;
