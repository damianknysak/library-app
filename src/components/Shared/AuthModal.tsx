import React, { useState } from "react";
import { BiLock, BiLockOpen, BiMailSend, BiSolidBookAlt } from "react-icons/bi";

interface AuthModalProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  setAuthType: React.Dispatch<React.SetStateAction<string>>;
}

const AuthModal: React.FC<AuthModalProps> = ({
  setIsActive,
  type,
  setAuthType,
}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        if (event.currentTarget === event.target) setIsActive(false);
      }}
      className={`absolute left-0 right-0 bottom-0 top-0 h-screen w-screen flex items-center justify-center bg-black/50`}
    >
      <div className="flex flex-col p-10 md:flex-row md:w-[60rem] md:h-[40rem] items-center justify-center bg-white rounded-lg">
        <div className="my-10 md:my-0 bg-[--primary] h-[39rem] mx-2 rounded-xl flex-1 flex items-center justify-center">
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
              {type === "register"
                ? "ZAŁÓŻ DARMOWE KONTO"
                : "KORZYSTAJ Z DARMOWEGO KONTA"}
            </span>
            <span className="text-3xl mb-8">
              {type === "register"
                ? "Stwórz swoje konto"
                : "Zaloguj się do nas"}
            </span>
            <form
              id="authForm"
              onSubmit={() => {
                console.log("submit");
              }}
            >
              <div className="flex items-center w-80 h-12 space-x-1 border-2 text-lg border-gray-300 rounded-lg py-2 px-5 my-1.5">
                <input
                  required
                  className="outline-none w-64"
                  type="text"
                  placeholder="Wpisz swój email ..."
                />
                <div>
                  <BiMailSend size={24} />
                </div>
              </div>
              <div className="flex items-center w-80 h-12 space-x-1 border-2 text-lg border-gray-300 rounded-lg py-2 px-5 my-1.5">
                <input
                  required
                  className="outline-none w-64"
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="Wpisz swoje hasło ..."
                />
                <div
                  onClick={() => {
                    setIsPasswordHidden(!isPasswordHidden);
                  }}
                >
                  {isPasswordHidden ? (
                    <BiLock size={24} />
                  ) : (
                    <BiLockOpen size={24} />
                  )}
                </div>
              </div>
              <button
                form="#authForm"
                type="submit"
                className="bg-[--primary] w-80 h-12 rounded-lg mt-8"
              >
                <span className="text-white">
                  {type === "register" ? "Zarejestruj się" : "Zaloguj się"}
                </span>
              </button>
            </form>
            <div className="text-center text-sm mt-3">
              <span className="text-gray-500">
                {type === "register"
                  ? "Masz już konto? "
                  : "Nie masz jeszcze konta? "}
                <button
                  onClick={() => {
                    type === "register"
                      ? setAuthType("login")
                      : setAuthType("register");
                  }}
                  className="text-[--primary]"
                >
                  {type === "register" ? "Zaloguj się" : "Zarejestruj się"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
