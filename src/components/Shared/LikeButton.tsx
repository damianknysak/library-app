import React, { useState } from "react";
import { BiHeartCircle } from "react-icons/bi";
import { useAddLikeMutation } from "../../features/likedbooks/likedBooksApiSlice";

const LikeButton: React.FC<{ bookId: string }> = ({ bookId }) => {
  const [isBookLiked, setIsBookLiked] = useState<boolean>(false);
  const [addLike] = useAddLikeMutation();
  const handleClick = async () => {
    setIsBookLiked(!isBookLiked);
    try {
      const userData = await addLike({ bookId: bookId }).unwrap();
    } catch (err) {}
  };
  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-2 bg-[--secondary] p-3 px-10 text-white font-bold rounded-xl"
    >
      <BiHeartCircle
        className={`${isBookLiked ? "text-[--primary]" : "text-white"}`}
        size={30}
      />
      <span>Lubię to</span>
    </button>
  );
};

export default LikeButton;
