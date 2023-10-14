import React from "react";

interface RecommendedBooksProps {
  activeBookCard: string | undefined;
  setActiveBookCard: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const RecommendedBooks: React.FC<RecommendedBooksProps> = ({
  activeBookCard,
  setActiveBookCard,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="my-5">
        <span className="text-2xl font-bold">Rekomendacje dla Ciebie</span>
      </div>
      <div className="flex justify-between shadow-md shadow-gray-500 p-10 rounded-b-xl overflow-hidden">
        <div className="flex flex-col max-w-[20rem]">
          <span className="text-lg font-bold my-5">Witaj czytelniku!</span>
          <span className="text-gray-500 font-bold">
            Rekomendacje książek tylko dla Ciebie! Zarejestruj się by mieć do
            nich dostęp.
          </span>
          <button className="my-5 w-36 h-10 bg-[--secondary] rounded-xl">
            <span className="text-white font-bold">Dołącz do nas</span>
          </button>
        </div>
        <img
          alt="books."
          className="object-contain w-56"
          src={require("../../assets/books1.png")}
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
        {/* {data ? (
      <>
        {data.works.map((book) => (
          <TrendingBookCard
            key={book.key}
            book={book}
            activeBookCard={activeBookCard}
            setActiveBookCard={setActiveBookCard}
          />
        ))}
      </>
    ) : (
      <>
        {LOADING_TRENDING_BOOKS_DATASET.map((item, index) => {
          return (
            <TrendingBookCard
              key={item.index}
              book={undefined}
              activeBookCard={undefined}
              setActiveBookCard={undefined}
            />
          );
        })}
      </>
    )} */}
      </div>
    </div>
  );
};

export default RecommendedBooks;
