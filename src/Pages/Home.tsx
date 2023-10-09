import React from "react";
import TrendingBooks from "../components/Home/TrendingBooks";
import DetailsPanel from "../components/Home/DetailsPanel";

const Home: React.FC = () => {
  return (
    <div className="w-full">
      <TrendingBooks />
    </div>
  );
};

export default Home;
