import React from "react";
import { DetailedBookProps } from "../Home/DetailsPanel";

const BookCardDetailsModal: React.FC<{ book: DetailedBookProps }> = ({
  book,
}) => {
  return (
    <div className="flex flex-col p-10 md:flex-row md:w-[60rem] md:h-[40rem] items-center justify-center bg-white rounded-lg">
      <>
        {book ? (
          <div>
            BookCardDetailsModal
            {book.title}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </>
    </div>
  );
};

export default BookCardDetailsModal;
