import React, { useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
const SearchBar: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchValue = inputRef.current?.value;
      if (searchValue) {
        navigate(`/?search=${searchValue}`);
      }
      inputRef!.current!.value = "";
    }
  };
  return (
    <div className="flex-1">
      <div
        onClick={() => {
          inputRef.current && inputRef.current.focus();
        }}
        className="flex max-w-md items-center space-x-2 bg-gray-300 p-3 px-5 xl:pr-20 rounded-3xl"
      >
        <BiSearchAlt size={25} />
        <input
          ref={inputRef}
          className="bg-gray-300 outline-none w-64"
          type="text"
          placeholder="Szukaj książek, autorów czy edycji ..."
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SearchBar;
