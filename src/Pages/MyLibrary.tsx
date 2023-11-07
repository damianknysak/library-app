import { useEffect, useState } from "react";
import MyLibraryBooks from "../components/MyLibrary/MyLibraryBooks";
import { useSelector } from "react-redux";
import { useGetBooksFromLibraryQuery } from "../features/librarybooks/libraryBooksSlice";
import { selectCurrentToken } from "../features/auth/authSlice";
import DetailsPanel from "../components/Home/DetailsPanel";

function MyLibrary() {
  const token = useSelector(selectCurrentToken);
  const [page, setPage] = useState<number>(1);
  const { data: trendingBooksData } = useGetBooksFromLibraryQuery({
    token: token,
    page: page,
  });

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();
  const [activeAuthor, setActiveAuthor] = useState<string | undefined>();
  useEffect(() => {
    if (trendingBooksData && !activeBookCard) {
      setActiveBookCard(trendingBooksData?.libraryBooks[0].bookUrl);
    }
  }, [trendingBooksData, activeBookCard]);

  return (
    <div className="w-full">
      <div className="my-5 lg:ml-[15rem]">
        <span className="text-2xl font-bold">Twoje biblioteka</span>
      </div>
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full">
          <MyLibraryBooks
            activeBookCard={activeBookCard}
            setActiveBookCard={setActiveBookCard}
            activeAuthor={activeAuthor}
            setActiveAuthor={setActiveAuthor}
            data={trendingBooksData!}
          />
        </main>

        <aside className="hidden lg:block lg:min-w-[25rem]">
          <DetailsPanel
            activeBook={activeBookCard}
            book={undefined}
            categoryBook={undefined}
            author={activeAuthor!}
          />
        </aside>
      </div>
    </div>
  );
}

export default MyLibrary;
