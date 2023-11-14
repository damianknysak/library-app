import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import {
  BiCategoryAlt,
  BiHeartCircle,
  BiHelpCircle,
  BiLibrary,
  BiLogOut,
  BiSolidHome,
  BiUserCheck,
  BiUserCircle,
  BiUserPlus,
} from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { SetStateAction } from "react";
import HamburgerMenuSearchBar from "./HamburgerMenuSearchBar";

const HamburgerMenuRoutes: React.FC<{
  setHamburgerOpened: React.Dispatch<SetStateAction<boolean | undefined>>;
}> = ({ setHamburgerOpened }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="lg:hidden flex flex-col font-bold text-lg">
      <div className="md:hidden bg-black/75 p-5 border-y border-white">
        <HamburgerMenuSearchBar setIsHamburgerOpened={setHamburgerOpened} />
      </div>
      {!user && (
        <div className="bg-black/75 p-5 border-y border-white flex items-center justify-between">
          <div
            onClick={() => {
              searchParams.set("authorize", "login");
              setSearchParams(searchParams);
              setHamburgerOpened(false);
            }}
            className={`${
              location.pathname === "/" ? "text-white" : "text-gray-400"
            } flex items-center space-x-3 cursor-pointer`}
          >
            <BiUserCheck size={30} color="white" />
            <span className="text-white">Zaloguj się</span>
          </div>
          <div
            onClick={() => {
              searchParams.set("authorize", "register");
              setSearchParams(searchParams);
              setHamburgerOpened(false);
            }}
            className={`${
              location.pathname === "/" ? "text-white" : "text-gray-400"
            } flex items-center space-x-3 cursor-pointer`}
          >
            <BiUserPlus size={30} color="white" />
            <span className="text-white">Zarejestruj się</span>
          </div>
        </div>
      )}

      <Link
        onClick={() => {
          setHamburgerOpened(false);
        }}
        className="bg-black/75 p-5 border-y border-white"
        to="/"
      >
        <div
          className={`${
            location.pathname === "/" ? "text-white" : "text-gray-400"
          } flex items-center space-x-3`}
        >
          <BiSolidHome
            className={`${
              location.pathname === "/" ? "bg-[--primary]" : "bg-gray-300"
            } rounded p-0.5`}
            size={20}
            color={`${location.pathname === "/" ? "white" : "gray"}`}
          />
          <span>Główna</span>
        </div>
      </Link>
      <Link
        onClick={() => {
          setHamburgerOpened(false);
        }}
        className="bg-black/75 p-5 border-y border-white"
        to="/category"
      >
        <div
          className={`${
            location.pathname === "/category" ? "text-white" : "text-gray-400"
          } flex items-center space-x-3`}
        >
          <BiCategoryAlt
            className={`${
              location.pathname === "/category"
                ? "bg-[--primary]"
                : "bg-gray-300"
            } rounded p-0.5`}
            size={20}
            color={`${location.pathname === "/category" ? "white" : "gray"}`}
          />
          <span>Kategorie</span>
        </div>
      </Link>
      <Link
        className="bg-black/75 p-5 border-y border-white"
        onClick={(e) => {
          if (!user) {
            e.preventDefault();
            toast.warn("Najpierw zaloguj się!");
          } else {
            setHamburgerOpened(false);
          }
        }}
        to="/mylibrary"
      >
        <div
          className={`${
            location.pathname === "/mylibrary" ? "text-white" : "text-gray-400"
          } flex items-center space-x-3`}
        >
          <BiLibrary
            className={`${
              location.pathname === "/mylibrary"
                ? "bg-[--primary]"
                : "bg-gray-300"
            } rounded p-0.5`}
            size={20}
            color={`${location.pathname === "/mylibrary" ? "white" : "gray"}`}
          />
          <span>Moja biblioteka</span>
        </div>
      </Link>
      <Link
        className="bg-black/75 p-5 border-y border-white"
        onClick={(e) => {
          if (!user) {
            e.preventDefault();
            toast.warn("Najpierw zaloguj się!");
          } else {
            setHamburgerOpened(false);
          }
        }}
        to="/favorite"
      >
        <div
          className={`${
            location.pathname === "/favorite" ? "text-white" : "text-gray-400"
          } flex items-center space-x-3`}
        >
          <BiHeartCircle
            className={`${
              location.pathname === "/favorite"
                ? "bg-[--primary]"
                : "bg-gray-300"
            } rounded p-0.5`}
            size={20}
            color={`${location.pathname === "/favorite" ? "white" : "gray"}`}
          />
          <span>Ulubione</span>
        </div>
      </Link>
      <hr className="border-1"></hr>
      <Link
        className="bg-black/75 p-5 border-y border-white"
        onClick={(e) => {
          if (!user) {
            e.preventDefault();
            toast.warn("Najpierw zaloguj się!");
          } else {
            setHamburgerOpened(false);
          }
        }}
        to="/profile"
      >
        <div
          className={`${
            location.pathname === "/profile" ? "text-white" : "text-gray-400"
          } flex items-center space-x-3`}
        >
          <BiUserCircle
            className={`${
              location.pathname === "/profile"
                ? "bg-[--primary]"
                : "bg-gray-300"
            } rounded p-0.5`}
            size={20}
            color={`${location.pathname === "/profile" ? "white" : "gray"}`}
          />
          <span>Profil</span>
        </div>
      </Link>
      <Link
        onClick={() => {
          setHamburgerOpened(false);
        }}
        className="bg-black/75 p-5 border-y border-white"
        to="/help"
      >
        <div
          className={`${
            location.pathname === "/help" ? "text-white" : "text-gray-400"
          } flex items-center space-x-3`}
        >
          <BiHelpCircle
            className={`${
              location.pathname === "/help" ? "bg-[--primary]" : "bg-gray-300"
            } rounded p-0.5`}
            size={20}
            color={`${location.pathname === "/help" ? "white" : "gray"}`}
          />
          <span>Pomoc</span>
        </div>
      </Link>
      {user && (
        <Link
          onClick={() => {
            setHamburgerOpened(false);
            dispatch(logOut());
          }}
          className="bg-black/75 p-5 border-y border-white"
          to="/"
        >
          <div className={`text-gray-400 flex items-center space-x-3`}>
            <BiLogOut
              className={`bg-gray-300 rounded p-0.5`}
              size={20}
              color={`gray`}
            />
            <span>Wyloguj</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default HamburgerMenuRoutes;
