import React, { SetStateAction } from "react";
import { BOOKS_CATEGORIES_DATASET } from "../../Datasets";
import CategoryCard from "./CategoryCard";

interface CategoriesProps {
  activeCategory: string | undefined;
  setPage: React.Dispatch<SetStateAction<number>>;
}

const Categories: React.FC<CategoriesProps> = ({ activeCategory, setPage }) => {
  return (
    <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 xl:grid-cols-8 2xl:flex 2xl:justify-between mt-10">
      {BOOKS_CATEGORIES_DATASET.map((category) => (
        <CategoryCard
          key={category.subject}
          activeCategory={activeCategory}
          category={category}
          setPage={setPage}
        />
      ))}
    </div>
  );
};

export default Categories;
