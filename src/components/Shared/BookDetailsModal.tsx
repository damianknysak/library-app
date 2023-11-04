import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import BookCardDetailsModal from "./BookCardDetailsModal";
import { useSelector } from "react-redux";
import { selectCurrentBook } from "../../features/books/bookSlice";
import { DetailedBookProps } from "../Home/DetailsPanel";
import { useBookDetailedFetch } from "../../hooks/useBookDetailedFetch";

const BookDetailsModal = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const BookDetailsId = searchParams.get("BookDetailsId");
  const globalStateBook = useSelector(selectCurrentBook);
  const [bookToBeShown, setBookToBeShown] = useState<DetailedBookProps>();
  const { data, pending } = useBookDetailedFetch({ WORKS_KEY: BookDetailsId! });

  const handleCloseModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.delete("BookDetailsId");
      setSearchParams(currentParams);
    }
  };

  useEffect(() => {
    if (BookDetailsId) {
      //modal is active
      if (globalStateBook && globalStateBook!.key === BookDetailsId) {
        setBookToBeShown(globalStateBook);
      } else {
        if (data && !pending) {
          setBookToBeShown(data);
        }
      }
    }
  }, [BookDetailsId, data, pending]);

  return (
    <>
      {BookDetailsId && (
        <main
          onClick={(e) => handleCloseModal(e)}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 z-40 flex items-center justify-center"
        >
          <BookCardDetailsModal book={bookToBeShown!} />
        </main>
      )}
    </>
  );
};

export default BookDetailsModal;
