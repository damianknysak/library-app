import React, { useEffect, useState } from "react";
import DetailsPanel from "../components/Home/DetailsPanel";
import Categories from "../components/Category/Categories";
import BooksFromCategories from "../components/Category/BooksFromCategories";
import {
  CategoryBook,
  useCategoryBookWorkFetch,
} from "../hooks/useCategoryBookWorkFetch";
import { useLocation, useSearchParams } from "react-router-dom";

const Category: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subject = searchParams.get("subject")
    ? searchParams.get("subject")
    : "arts";

  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();

  const { data: categoryBooksData } = useCategoryBookWorkFetch({
    API_URL: `https://openlibrary.org/subjects/${subject}.json?limit=10`,
  });

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
  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full space-y-10">
          <Categories activeCategory={subject!} />
          {subject && (
            <BooksFromCategories
              data={categoryBooksData}
              activeBookCard={activeBookCard}
              setActiveBookCard={setActiveBookCard}
              categorySubject={subject}
            />
          )}
        </main>

        <aside className="hidden lg:block lg:min-w-[25rem]">
          <DetailsPanel
            activeBook={activeBookCard}
            book={undefined}
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
