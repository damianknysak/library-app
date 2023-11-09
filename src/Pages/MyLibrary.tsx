import { useEffect, useState } from "react";
import MyLibraryBooks from "../components/MyLibrary/MyLibraryBooks";
import { useSelector } from "react-redux";
import { useGetBooksFromLibraryQuery } from "../features/librarybooks/libraryBooksSlice";
import { selectCurrentToken } from "../features/auth/authSlice";
import DetailsPanel from "../components/Home/DetailsPanel";

const MyLibrary = () => {
  const token = useSelector(selectCurrentToken);
  const [page, setPage] = useState<number>(1);
  const { data: myLibraryBooksData } = useGetBooksFromLibraryQuery({
    token: token,
    page: page,
  });

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
    myLibraryBooksData &&
    myLibraryBooksData.libraryBooks.find(
      (book) => book.bookUrl === activeBookCard
    );

  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full">
          <div className="my-5">
            <span className="text-2xl font-bold">Twoje biblioteka</span>
          </div>
          <MyLibraryBooks
            activeBookCard={activeBookCard}
            setActiveBookCard={setActiveBookCard}
            data={myLibraryBooksData!}
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

export default MyLibrary;
