import React from "react";
import { BiSolidBookAlt, BiUserCheck, BiUserPlus } from "react-icons/bi";
import SearchBar from "./SearchBar";
import HamburgerButton from "./HamburgerButton";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { BASE_API_URL } from "../../app/api/apiSlice";

const HorizontalHeader: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <header className="w-full p-10 h-28 fixed top-0 left-0 right-0 flex justify-between items-center backdrop-blur-xl bg-white/30 z-10">
      <div className="flex items-center justify-center">
        <Link to={"/"}>
          <div className="flex space-x-2 items-center justify-center">
            <BiSolidBookAlt className="text-[--primary] -rotate-45" size={50} />
            <span className="text-5xl font-semibold">Books.</span>
          </div>
        </Link>

        <div className="pl-10 hidden md:flex">
          <SearchBar />
        </div>
      </div>
      <div className="flex lg:hidden">
        <HamburgerButton />
      </div>
      <div className="hidden w-[20rem] lg:flex items-center justify-between font-bold space-x-5">
        {user ? (
          <div className="flex items-center space-x-2">
            <img
              className="w-14 h-14 rounded-full"
              src={`${BASE_API_URL}/${user.profileImage}`}
              alt=""
            />
            <span>{user.firstName + " " + user.lastName}</span>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                searchParams.set("authorize", "login");
                setSearchParams(searchParams);
              }}
              className="flex-1 h-14 bg-[--primary] rounded-xl flex space-x-2 items-center justify-center"
            >
              <span className="text-white">Zaloguj się</span>
              <BiUserCheck size={30} color="white" />
            </button>
            <button
              onClick={() => {
                searchParams.set("authorize", "register");
                setSearchParams(searchParams);
              }}
              className="flex-1 h-14 border-2 border-[--primary] rounded-xl flex space-x-2 items-center justify-center"
            >
              <span className="text-[--primary]">Rejestracja</span>
              <BiUserPlus size={30} color="var(--primary)" />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default HorizontalHeader;
