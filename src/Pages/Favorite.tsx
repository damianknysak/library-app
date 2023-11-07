import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useGetLikedBooksQuery } from "../features/likedbooks/likedBooksSlice";
import DetailsPanel from "../components/Home/DetailsPanel";
import FavoriteBooks from "../components/Favorite/FavoriteBooks";

const Favorite = () => {
  const token = useSelector(selectCurrentToken);
  const [page, setPage] = useState<number>(1);
  const { data: trendingBooksData } = useGetLikedBooksQuery({
    token: token,
    page: page,
  });

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();
  const [activeAuthor, setActiveAuthor] = useState<string | undefined>();
  useEffect(() => {
    if (trendingBooksData && !activeBookCard) {
      setActiveBookCard(trendingBooksData?.likedBooks[0].bookUrl);
    }
  }, [trendingBooksData, activeBookCard]);

  return (
    <div className="w-full">
      <div className="my-5 lg:ml-[15rem]">
        <span className="text-2xl font-bold">Twoje ulubione</span>
      </div>
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full">
          <FavoriteBooks
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
};

export default Favorite;
