import React, { useState } from "react";
import { BiShare } from "react-icons/bi";

const ShareUrlButton = () => {
  const [isShared, setIsShared] = useState<boolean>(false);

  const copyUrl = () => {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleClick = () => {
    setIsShared(true);
    copyUrl();
  };
  return (
    <>
      <button
        onClick={handleClick}
        className={`flex flex-col items-center ${
          isShared && "border-blue-500"
        } `}
      >
        <BiShare
          className={`h-8 w-8 md:h-14 md:w-14 ${
            isShared ? "text-blue-500" : "text-gray-500"
          }`}
        />
        <span
          className={`text-sm md:text-lg  ${
            isShared ? "text-blue-500" : "text-gray-500"
          }`}
        >
          Kopiuj link
        </span>
      </button>
    </>
  );
};

export default ShareUrlButton;
