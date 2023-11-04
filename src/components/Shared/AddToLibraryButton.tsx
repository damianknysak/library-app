import React, { useState } from "react";
import {
  BiBookmark,
  BiLibrary,
  BiSave,
  BiSolidCloudDownload,
} from "react-icons/bi";

const AddToLibraryButton: React.FC<{ bookUrl: string }> = ({ bookUrl }) => {
  const [isBookAdded, setIsBookAdded] = useState<boolean>(false);
  const handleClick = () => {
    setIsBookAdded(!isBookAdded);
  };
  return (
    <>
      <button
        onClick={handleClick}
        className={`flex flex-col items-center ${
          isBookAdded && "border-[--secondary]"
        } `}
      >
        <BiBookmark
          className={`${isBookAdded ? "text-[--secondary]" : "text-gray-500"}`}
          size={50}
        />
        <span
          className={`text-lg  ${
            isBookAdded ? "text-[--secondary]" : "text-gray-500"
          }`}
        >
          Zapisz
        </span>
      </button>
    </>
  );
};

export default AddToLibraryButton;
