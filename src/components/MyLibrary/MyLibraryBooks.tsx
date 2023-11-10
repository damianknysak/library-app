import React, { useEffect } from "react";
import {
  GetLibraryBooksProps,
  LibraryBook,
} from "../../features/librarybooks/libraryBooksSlice";
import MyLibraryBookCard from "./MyLibraryBookCard";

const MyLibraryBooks: React.FC<{
  data: LibraryBook[];
  activeBookCard: string | undefined;
  setActiveBookCard:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
}> = ({ data, activeBookCard, setActiveBookCard }) => {
  return (
    <article>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
        {data &&
          data.length > 0 &&
          data.map((book) => {
            return (
              <React.Fragment key={book._id}>
                <MyLibraryBookCard
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

export default MyLibraryBooks;
