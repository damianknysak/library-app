import React, {useRef} from "react";
import {BiSearchAlt} from "react-icons/bi";

const SearchBar: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="flex-1">
      <div
        onClick={() => {
          inputRef.current && inputRef.current.focus();
        }}
        className="flex max-w-md items-center space-x-2 bg-gray-300 p-3 px-5 rounded-3xl"
      >
        <BiSearchAlt size={25} />
        <input
          ref={inputRef}
          className="bg-gray-300 outline-none"
          type="text"
          placeholder="Szukaj książek, autorów czy edycji ..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
