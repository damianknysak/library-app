import React from "react";
import { Link } from "react-router-dom";

interface CategoriesProps {
  activeCategory: string | undefined;
  category: { name: string; subject: string };
}

const CategoryCard: React.FC<CategoriesProps> = ({
  activeCategory,
  category,
}) => {
  return (
    <Link to={`?subject=${category.subject}`}>
      <div
        className={`group hover:scale-110 transition-all h-32 w-20 rounded-3xl cursor-pointer ${
          activeCategory === category.subject
            ? "scale-110 bg-white shadow-lg shadow-black"
            : "bg-gray-100"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <img
            className="h-10 object-contain"
            src={require(`../../assets/${category.subject}-icon.png`)}
          />
          <span className="text-center text-sm">{category.name}</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
