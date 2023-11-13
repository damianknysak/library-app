import React, { SetStateAction, useEffect, useState } from "react";

const HamburgerButton: React.FC<{
  setOpened: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setOpened }) => {
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-[--primary] transition ease transform duration-300`;

  useEffect(() => {
    setOpened(isOpen);
  }, [isOpen]);
  return (
    <button
      className="flex flex-col h-12 w-12 border-2 border-[--primary] rounded justify-center items-center group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>
  );
};

export default HamburgerButton;
