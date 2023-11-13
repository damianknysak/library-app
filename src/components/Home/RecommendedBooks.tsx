import React, { useEffect, useState } from "react";
import TrendingBookCard, { TrendingBook } from "./TrendingBookCard";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import Unauthorized from "./RecommendedBooks/Unauthorized";
import Authorized from "./RecommendedBooks/Authorized";

interface RecommendedBooksProps {
  activeBookCard: string | undefined;
  setActiveBookCard: React.Dispatch<React.SetStateAction<string | undefined>>;
  data: {
    recommendedBooks: TrendingBook[] | undefined;
    length: number;
    userId: string;
  };
  pending: boolean;
  refetch: any;
}

const RecommendedBooks: React.FC<RecommendedBooksProps> = ({
  activeBookCard,
  setActiveBookCard,
  data,
  pending,
  refetch,
}) => {
  const user = useSelector(selectCurrentUser);
  const [show, setShow] = useState(false);
  const [recommendedBooks, setRecommendedBooks] = useState<TrendingBook[]>();
  useEffect(() => {
    if (data) setRecommendedBooks(data.recommendedBooks);
  }, [data]);
  useEffect(() => {
    if (data && user?._id != data.userId) {
      setRecommendedBooks([]);
      setShow(false);
      refetch();
    }
  }, [user]);

  return (
    <div className="flex flex-col w-full">
      <div className="my-5">
        <span className="text-2xl font-bold">Rekomendacje dla Ciebie</span>
      </div>
      {user ? (
        <>
          {show && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
              {recommendedBooks &&
                recommendedBooks &&
                recommendedBooks.map((book) => {
                  return (
                    <TrendingBookCard
                      key={book.key}
                      book={book}
                      activeBookCard={activeBookCard}
                      setActiveBookCard={setActiveBookCard}
                    />
                  );
                })}
            </div>
          )}
          {!show && (
            <Authorized
              length={recommendedBooks ? recommendedBooks.length : undefined}
              setShow={setShow}
              pending={pending}
            />
          )}
        </>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
};

export default RecommendedBooks;
