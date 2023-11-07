import React from "react";
import { GetLibraryBooksProps } from "../../features/librarybooks/libraryBooksSlice";
import MyLibraryBookCard from "./MyLibraryBookCard";

const MyLibraryBooks: React.FC<{
  data: GetLibraryBooksProps;
  activeBookCard: string | undefined;
  setActiveBookCard:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
  activeAuthor: string | undefined;
  setActiveAuthor:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
}> = ({
  data,
  activeBookCard,
  setActiveBookCard,
  activeAuthor,
  setActiveAuthor,
}) => {
  return (
    <article>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
        {data &&
          data.libraryBooks.map((book) => {
            return (
              <React.Fragment key={book._id}>
                <MyLibraryBookCard
                  activeBookCard={activeBookCard}
                  setActiveBookCard={setActiveBookCard}
                  activeAuthor={activeAuthor}
                  setActiveAuthor={setActiveAuthor}
                  bookUrl={book.bookUrl}
                />
              </React.Fragment>
            );
          })}
      </div>
    </article>
  );
};

export default MyLibraryBooks;
