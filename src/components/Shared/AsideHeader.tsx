import React from "react";
import {
  BiCategoryAlt,
  BiHeartCircle,
  BiHelpCircle,
  BiLibrary,
  BiSolidHome,
} from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const AsideHeader: React.FC = () => {
  const location = useLocation();

  return (
    <div className="lg:fixed left-0 top-15 w-[15rem]">
      <aside className="lg:flex hidden flex-col justify-center items-center mt-20 min-w-[15rem]">
        <div className="flex flex-col font-bold text-lg space-y-4">
          <Link to="/">
            <div
              className={`${
                location.pathname === "/" ? "text-black" : "text-gray-400"
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
          <Link to="/category">
            <div
              className={`${
                location.pathname === "/category"
                  ? "text-black"
                  : "text-gray-400"
              } flex items-center space-x-3`}
            >
              <BiCategoryAlt
                className={`${
                  location.pathname === "/category"
                    ? "bg-[--primary]"
                    : "bg-gray-300"
                } rounded p-0.5`}
                size={20}
                color={`${
                  location.pathname === "/category" ? "white" : "gray"
                }`}
              />
              <span>Kategorie</span>
            </div>
          </Link>
          <Link to="/mylibrary">
            <div
              className={`${
                location.pathname === "/mylibrary"
                  ? "text-black"
                  : "text-gray-400"
              } flex items-center space-x-3`}
            >
              <BiLibrary
                className={`${
                  location.pathname === "/mylibrary"
                    ? "bg-[--primary]"
                    : "bg-gray-300"
                } rounded p-0.5`}
                size={20}
                color={`${
                  location.pathname === "/mylibrary" ? "white" : "gray"
                }`}
              />
              <span>Moja biblioteka</span>
            </div>
          </Link>
          <Link to="/favorite">
            <div
              className={`${
                location.pathname === "/favorite"
                  ? "text-black"
                  : "text-gray-400"
              } flex items-center space-x-3`}
            >
              <BiHeartCircle
                className={`${
                  location.pathname === "/favorite"
                    ? "bg-[--primary]"
                    : "bg-gray-300"
                } rounded p-0.5`}
                size={20}
                color={`${
                  location.pathname === "/favorite" ? "white" : "gray"
                }`}
              />
              <span>Ulubione</span>
            </div>
          </Link>
          <hr className="border-1"></hr>
          <Link to="/settings">
            <div
              className={`${
                location.pathname === "/settings"
                  ? "text-black"
                  : "text-gray-400"
              } flex items-center space-x-3`}
            >
              <FiSettings
                className={`${
                  location.pathname === "/settings"
                    ? "bg-[--primary]"
                    : "bg-gray-300"
                } rounded p-0.5`}
                size={20}
                color={`${
                  location.pathname === "/settings" ? "white" : "gray"
                }`}
              />
              <span>Ustawienia</span>
            </div>
          </Link>
          <Link to="/help">
            <div
              className={`${
                location.pathname === "/help" ? "text-black" : "text-gray-400"
              } flex items-center space-x-3`}
            >
              <BiHelpCircle
                className={`${
                  location.pathname === "/help"
                    ? "bg-[--primary]"
                    : "bg-gray-300"
                } rounded p-0.5`}
                size={20}
                color={`${location.pathname === "/help" ? "white" : "gray"}`}
              />
              <span>Pomoc</span>
            </div>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default AsideHeader;
