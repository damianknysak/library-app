import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import {
  LikedBook,
  useGetLikedBooksQuery,
} from "../features/likedbooks/likedBooksSlice";
import DetailsPanel from "../components/Home/DetailsPanel";
import bookSearchIndicator from "../assets/book_search.gif";
import FavoriteBooks from "../components/Favorite/FavoriteBooks";
import FavoriteBooksStats from "../components/Favorite/FavoriteBooksStats";

const Favorite = () => {
  const token = useSelector(selectCurrentToken);
  const [page, setPage] = useState<number>(1);
  const { data: likedBooksData, isLoading } = useGetLikedBooksQuery({
    token: token,
    page: page,
  });

  const [likedBooks, setLikedBooks] = useState<LikedBook[]>([]);

  useEffect(() => {
    if (likedBooksData) {
      setLikedBooks((prevState) => [
        ...prevState!,
        ...likedBooksData.likedBooks,
      ]);
    }
  }, [likedBooksData]);

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
    likedBooks &&
    likedBooks.find((book) => book.bookUrl === activeBookCard);

  //infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    setPage(page + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col space-y-5 w-full">
          <div>
            <span className="text-2xl font-bold">Twoje ulubione</span>
          </div>
          <FavoriteBooksStats />
          <FavoriteBooks
            activeBookCard={activeBookCard}
            setActiveBookCard={setActiveBookCard}
            data={likedBooks!}
          />
          {isLoading && (
            <div className="w-full flex items-center justify-center">
              <img
                className="object-contain"
                src={bookSearchIndicator}
                alt="loading books"
              />
            </div>
          )}
          {!isLoading && likedBooks.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center space-y-5">
              <span className="text-xl font-bold">
                Brak polubionych książek
              </span>
              <img
                className="w-40 object-contain"
                src={require("../assets/no-results.png")}
              />
            </div>
          )}
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
