import React, { useEffect, useState } from "react";
import { BiHeartCircle } from "react-icons/bi";
import {
  useAddLikeMutation,
  useCheckLikeQuery,
  useRemoveLikeMutation,
} from "../../features/likedbooks/likedBooksSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";

const LikeButton: React.FC<{ bookUrl: string }> = ({ bookUrl }) => {
  const [isBookLiked, setIsBookLiked] = useState<boolean>(false);
  const token = useSelector(selectCurrentToken);
  const { isError, isFetching, refetch } = useCheckLikeQuery({
    body: {
      bookUrl: bookUrl,
    },
    token: token,
  });
  const [addLike] = useAddLikeMutation();
  const [removeLike] = useRemoveLikeMutation();
  const handleClick = () => {
    if (isBookLiked) {
      setIsBookLiked(false);
      removeLike({ body: { bookUrl: bookUrl }, token: token });
    } else {
      setIsBookLiked(true);
      addLike({
        body: {
          bookUrl: bookUrl,
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
    <button
      onClick={handleClick}
      className={`flex border ${
        isBookLiked && "border-red-600"
      } items-center space-x-2 bg-[--secondary] p-3 px-10 text-white font-bold rounded-xl`}
    >
      <BiHeartCircle
        className={`${isBookLiked ? "text-red-600" : "text-white"}`}
        size={30}
      />
      <span>Lubię to</span>
    </button>
  );
};

export default LikeButton;
