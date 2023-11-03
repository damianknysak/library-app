import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import BookCardDetailsModal from "./BookCardDetailsModal";

const BookDetailsModal = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const BookDetailsId = searchParams.get("BookDetailsId");

  const handleCloseModal = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.delete("BookDetailsId");
      setSearchParams(currentParams);
    }
  };

  return (
    <>
      {BookDetailsId && (
        <main
          onClick={(e) => handleCloseModal(e)}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 z-40 flex items-center justify-center"
        >
          <BookCardDetailsModal />
        </main>
      )}
    </>
  );
};

export default BookDetailsModal;
