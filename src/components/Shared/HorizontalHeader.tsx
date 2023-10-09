import React from "react";
import {BiSolidBookAlt} from "react-icons/bi";
import SearchBar from "./SearchBar";
import HamburgerButton from "./HamburgerButton";

const HorizontalHeader: React.FC = () => {
  return (
    <header className="w-full p-10 h-28 fixed top-0 left-0 right-0 flex justify-between items-center backdrop-blur-xl bg-white/30">
      <div className="flex items-center justify-center">
        <div className="flex space-x-2 items-center justify-center">
          <BiSolidBookAlt className="text-yellow-800 -rotate-45" size={50} />
          <span className="text-5xl font-semibold">Books.</span>
        </div>
        <div className="pl-10 hidden md:flex">
          <SearchBar />
        </div>
      </div>
      <div className="flex lg:hidden">
        <HamburgerButton />
      </div>
      <div className="space-x-2 hidden lg:flex">
        <span>Zaloguj się</span>
        <span>Rejestracja</span>
      </div>
    </header>
  );
};

export default HorizontalHeader;
