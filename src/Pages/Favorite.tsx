import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useGetLikedBooksQuery } from "../features/likedbooks/likedBooksSlice";
import DetailsPanel from "../components/Home/DetailsPanel";
import FavoriteBooks from "../components/Favorite/FavoriteBooks";

const Favorite = () => {
  const token = useSelector(selectCurrentToken);
  const [page, setPage] = useState<number>(1);
  const { data: likedBooksData } = useGetLikedBooksQuery({
    token: token,
    page: page,
  });

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();
  useEffect(() => {
    if (likedBooksData && !activeBookCard) {
      setActiveBookCard(
        likedBooksData.length > 0
          ? likedBooksData?.likedBooks[0].bookUrl
          : undefined
      );
    }
  }, [likedBooksData, activeBookCard]);

  let currAuthor =
    activeBookCard &&
    likedBooksData &&
    likedBooksData.likedBooks.find((book) => book.bookUrl === activeBookCard);

  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full">
          <div className="my-5">
            <span className="text-2xl font-bold">Twoje ulubione</span>
          </div>
          <FavoriteBooks
            activeBookCard={activeBookCard}
            setActiveBookCard={setActiveBookCard}
            data={likedBooksData!}
          />
        </main>

        <aside className="hidden lg:block lg:min-w-[25rem]">
          <DetailsPanel
            activeBook={activeBookCard}
            book={undefined}
            categoryBook={undefined}
            author={currAuthor ? currAuthor.book.authorDetails.name : ""}
          />
        </aside>
      </div>
    </div>
  );
};

export default Favorite;
