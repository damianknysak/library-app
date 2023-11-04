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
      <button onClick={handleClick} className={`flex flex-col items-center`}>
        <BiShare
          className={`${isShared ? "text-blue-500" : "text-gray-500"}`}
          size={50}
        />
        <span
          className={`text-lg ${isShared ? "text-blue-500" : "text-gray-500"}`}
        >
          Kopiuj link
        </span>
      </button>
    </>
  );
};

export default ShareUrlButton;
