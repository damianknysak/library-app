import { useEffect, useState } from "react";
import MyLibraryBooks from "../components/MyLibrary/MyLibraryBooks";
import { useSelector } from "react-redux";
import {
  LibraryBook,
  useGetBooksFromLibraryQuery,
} from "../features/librarybooks/libraryBooksSlice";
import { selectCurrentToken } from "../features/auth/authSlice";
import bookSearchIndicator from "../assets/book_search.gif";
import DetailsPanel from "../components/Home/DetailsPanel";
import MyLibraryStats from "../components/MyLibrary/MyLibraryStats";
import { LikedBook } from "../features/likedbooks/likedBooksSlice";

const MyLibrary = () => {
  const token = useSelector(selectCurrentToken);
  const [page, setPage] = useState<number>(1);
  const { data: myLibraryBooksData, isLoading } = useGetBooksFromLibraryQuery({
    token: token,
    page: page,
  });
  const [libraryBooksPages, setLibraryBooksPages] = useState<
    { objects: LibraryBook[]; page: number }[]
  >([]);

  const libraryBooks: LibraryBook[] = libraryBooksPages
    .map((el) => el.objects)
    .flat(1);
  useEffect(() => {
    if (myLibraryBooksData) {
      setLibraryBooksPages((prevState) => {
        const updatedPages = prevState.map((pageData) => {
          if (pageData.page === myLibraryBooksData.page) {
            // Jeżeli page jest taki sam, aktualizuj obiekt
            return {
              objects: [...myLibraryBooksData.libraryBooks],
              page: myLibraryBooksData.page,
            };
          } else {
            // W przeciwnym razie zachowaj istniejący obiekt bez zmian
            return pageData;
          }
        });

        // Jeżeli nie istnieje żaden obiekt o takim page, dodaj nowy
        if (
          !updatedPages.some(
            (pageData) => pageData.page === myLibraryBooksData.page
          )
        ) {
          updatedPages.push({
            objects: [...myLibraryBooksData.libraryBooks],
            page: myLibraryBooksData.page,
          });
        }

        return updatedPages;
      });
    }
  }, [myLibraryBooksData]);

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();
  useEffect(() => {
    if (myLibraryBooksData && !activeBookCard) {
      setActiveBookCard(
        myLibraryBooksData.length > 0
          ? myLibraryBooksData?.libraryBooks[0].bookUrl
          : undefined
      );
    }
  }, [myLibraryBooksData, activeBookCard]);

  let currAuthor =
    activeBookCard &&
    libraryBooks &&
    libraryBooks.find((book) => book.bookUrl === activeBookCard);
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
        <main className="flex flex-col w-full space-y-5">
          <div>
            <span className="text-2xl font-bold">Twoje biblioteka</span>
          </div>
          <MyLibraryStats />

          <MyLibraryBooks
            activeBookCard={activeBookCard}
            setActiveBookCard={setActiveBookCard}
            data={libraryBooks!}
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
          {!isLoading && libraryBooks.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center space-y-5">
              <span className="text-xl font-bold">
                Brak książek w bibliotece
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

export default MyLibrary;
