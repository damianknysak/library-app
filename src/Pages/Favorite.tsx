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

  const [libraryBooksPages, setLibraryBooksPages] = useState<
    { objects: LikedBook[]; page: number }[]
  >([]);
  const likedBooks: LikedBook[] = libraryBooksPages
    .map((el) => el.objects)
    .flat(1);

  useEffect(() => {
    if (likedBooksData) {
      setLibraryBooksPages((prevState) => {
        const updatedPages = prevState.map((pageData) => {
          if (pageData.page === likedBooksData.page) {
            // Jeżeli page jest taki sam, aktualizuj obiekt
            return {
              objects: [...likedBooksData.likedBooks],
              page: likedBooksData.page,
            };
          } else {
            // W przeciwnym razie zachowaj istniejący obiekt bez zmian
            return pageData;
          }
        });

        // Jeżeli nie istnieje żaden obiekt o takim page, dodaj nowy
        if (
          !updatedPages.some(
            (pageData) => pageData.page === likedBooksData.page
          )
        ) {
          updatedPages.push({
            objects: [...likedBooksData.likedBooks],
            page: likedBooksData.page,
          });
        }

        return updatedPages;
      });
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
      <div className="flex ">
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
                alt="no-results"
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
