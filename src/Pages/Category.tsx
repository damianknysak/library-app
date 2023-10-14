import React, { useState } from "react";
import RecommendedBooks from "../components/Home/RecommendedBooks";
import DetailsPanel from "../components/Home/DetailsPanel";

const Category: React.FC = () => {
  const [activeBookCard, setActiveBookCard] = useState<string | undefined>();
  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <div className="flex flex-col w-full"></div>

        <div className="hidden lg:block lg:min-w-[25rem]">
          <DetailsPanel activeBook={activeBookCard} book={undefined} />
        </div>
      </div>
    </div>
  );
};

export default Category;
