import React, { useEffect, useState } from "react";
import DetailsPanel from "../components/Home/DetailsPanel";
import Categories from "../components/Category/Categories";
import BooksFromCategories from "../components/Category/BooksFromCategories";
import {
  CategoryBook,
  useCategoryBookWorkFetch,
} from "../hooks/useCategoryBookWorkFetch";
import { useLocation } from "react-router-dom";
import BookDetailsModal from "../components/Shared/BookDetailsModal";
import bookSearchIndicator from "../assets/book_search.gif";

const Category: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subject = searchParams.get("subject")
    ? searchParams.get("subject")
    : "arts";

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const {
    data: categoryBooksData,
    pending,
    fetchAsync: refetch,
  } = useCategoryBookWorkFetch({
    API_URL: `https://openlibrary.org/subjects/${subject}.json?limit=${
      10 * page
    }`,
  });
  const [categoryBooks, setCategoryBooks] = useState<CategoryBook[]>([]);
  useEffect(() => {
    if (categoryBooksData) setCategoryBooks(categoryBooksData.works);
  }, [categoryBooksData]);
  useEffect(() => {
    if (categoryBooksData && !activeBookCard) {
      setActiveBookCard(categoryBooksData?.works[0].key);
    }
  }, [categoryBooksData, activeBookCard]);

  useEffect(() => {
    if (categoryBooksData?.name === subject) {
      setActiveBookCard(categoryBooksData?.works[0].key);
    }
  }, [subject, categoryBooksData]);

  //infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      pending
    ) {
      return;
    }
    if (!pending) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pending]);

  return (
    <div className="w-full">
      <BookDetailsModal />
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full space-y-10">
          <Categories setPage={setPage} activeCategory={subject!} />
          {subject && (
            <BooksFromCategories
              data={categoryBooks}
              activeBookCard={activeBookCard}
              setActiveBookCard={setActiveBookCard}
            />
          )}
          {pending && (
            <div className="w-full flex items-center justify-center">
              <img
                className="object-contain"
                src={bookSearchIndicator}
                alt="loading books"
              />
            </div>
          )}
        </main>

        <aside className="hidden lg:block lg:min-w-[25rem]">
          <DetailsPanel
            activeBook={activeBookCard}
            book={undefined}
            author=""
            categoryBook={
              categoryBooksData
                ? categoryBooksData?.works.find(
                    (book: CategoryBook) => book.key === activeBookCard
                  )
                : undefined
            }
          />
        </aside>
      </div>
    </div>
  );
};

export default Category;
