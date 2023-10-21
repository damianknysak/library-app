import React from "react";

const UnauthorizedUserInfo: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between shadow-md shadow-gray-500 p-10 rounded-b-xl overflow-hidden">
        <div className="flex flex-col max-w-[20rem]">
          <span className="text-lg font-bold my-5">Witaj czytelniku!</span>
          <span className="text-gray-500 font-bold">
            Abyśmy mogli wiedzieć jakie książki są twoimi ulubionymi, musisz się
            najpierw zalogować.
          </span>
          <button className="my-5 w-36 h-10 bg-[--secondary] rounded-xl">
            <span className="text-white font-bold">Dołącz do nas</span>
          </button>
        </div>
        <img
          alt="books."
          className="object-contain w-56"
          src={require("../../assets/books1.png")}
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5 w-full"></div>
    </div>
  );
};

export default UnauthorizedUserInfo;
