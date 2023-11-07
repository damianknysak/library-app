import React from "react";

const FavoriteBooks: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="my-5">
        <span className="text-2xl font-bold">Najpopularniejsze ostatnio</span>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full">
        {data && (
          <>
            {/* {data.works.map((book) => (
              <TrendingBookCard
                key={book.key}
                book={book}
                activeBookCard={activeBookCard}
                setActiveBookCard={setActiveBookCard}
              />
            ))} */}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteBooks;
