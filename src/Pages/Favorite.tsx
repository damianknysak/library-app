import { useSelector } from "react-redux";
import { useGetBooksFromLibraryQuery } from "../features/librarybooks/libraryBooksSlice";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { useGetLikedBooksQuery } from "../features/likedbooks/likedBooksSlice";

const Favorite = () => {
  const token = useSelector(selectCurrentToken);
  const [page, setPage] = useState<number>(1);
  const { data } = useGetLikedBooksQuery({ token: token, page: page });

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full">
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            PAGE
          </button>
          {/* Main section */}
          <div className="my-5">
            <span className="text-2xl font-bold">Ulubione książki</span>
          </div>
        </main>

        <aside className="hidden lg:block lg:min-w-[25rem]">
          {/* Place for Details Panel */}
        </aside>
      </div>
    </div>
  );
};

export default Favorite;
