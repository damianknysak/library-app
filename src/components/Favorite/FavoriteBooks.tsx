import React from "react";
import {
  GetLikedBooksProps,
  LikedBook,
} from "../../features/likedbooks/likedBooksSlice";
import FavoriteBookCard from "./FavoriteBookCard";

const FavoriteBooks: React.FC<{
  data: LikedBook[];
  activeBookCard: string | undefined;
  setActiveBookCard:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
}> = ({ data, activeBookCard, setActiveBookCard }) => {
  return (
    <article>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
        {data &&
          data.map((book) => {
            return (
              <React.Fragment key={book._id}>
                <FavoriteBookCard
                  activeBookCard={activeBookCard}
                  setActiveBookCard={setActiveBookCard}
                  bookUrl={book.bookUrl}
                  bookExtended={book.book}
                />
              </React.Fragment>
            );
          })}
      </div>
    </article>
  );
};

export default FavoriteBooks;
