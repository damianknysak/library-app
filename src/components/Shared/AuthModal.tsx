import React, { useState } from "react";
import { BiSolidBookAlt } from "react-icons/bi";
import AuthForm from "./AuthForm";
import { useSearchParams } from "react-router-dom";

const AuthModal: React.FC = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const authorize = searchParams.get("authorize");
  const isActive =
    authorize === "login" || authorize === "register" ? true : false;

  const handleCloseModal = () => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.delete("authorize");
    setSearchParams(currentParams);
  };
  return (
    <>
      {isActive && (
        <div
          onClick={(event) => {
            event.preventDefault();
            if (event.currentTarget === event.target) handleCloseModal();
          }}
          className={`fixed left-0 right-0 bottom-0 top-0 h-screen w-screen flex items-center justify-center bg-black/50 z-50`}
        >
          <div className="flex flex-col p-10 md:flex-row md:w-[60rem] md:h-[40rem] items-center justify-center bg-white rounded-lg">
            <div className="my-10 hidden md:flex md:my-0 bg-[--primary] h-[39rem] mx-2 rounded-xl flex-1  items-center justify-center">
              <img
                alt="books."
                className="w-40 md:w-80"
                src={require("../../assets/books1.png")}
              />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex flex-col h-full">
                <div className="flex space-x-2 items-center mb-20">
                  <BiSolidBookAlt
                    className="text-[--primary] -rotate-45"
                    size={30}
                  />
                  <span className="text-xl font-semibold">Books.</span>
                </div>
                <span className="text-[--primary] text-xs mb-2">
                  {authorize === "register"
                    ? "ZAŁÓŻ DARMOWE KONTO"
                    : "KORZYSTAJ Z DARMOWEGO KONTA"}
                </span>
                <span className="text-3xl mb-8">
                  {authorize === "register"
                    ? "Stwórz swoje konto"
                    : "Zaloguj się do nas"}
                </span>
                {authorize && <AuthForm type={authorize} />}

                <div className="text-center text-sm mt-3">
                  <span className="text-gray-500">
                    {authorize === "register"
                      ? "Masz już konto? "
                      : "Nie masz jeszcze konta? "}
                    <button
                      onClick={() => {
                        const value =
                          authorize === "register" ? "login" : "register";
                        searchParams.set("authorize", value);
                        setSearchParams(searchParams);
                      }}
                      className="text-[--primary]"
                    >
                      {authorize === "register"
                        ? "Zaloguj się"
                        : "Zarejestruj się"}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
