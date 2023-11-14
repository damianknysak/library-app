import React, { SetStateAction, useEffect, useState } from "react";

const HamburgerButton: React.FC<{
  opened: boolean;
  setOpened: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setOpened, opened }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-[--primary] transition ease transform duration-300`;

  return (
    <button
      className="flex flex-col h-12 w-12 border-2 border-[--primary] rounded justify-center items-center group"
      onClick={() => setOpened(!opened)}
    >
      <div
        className={`${genericHamburgerLine} ${
          opened
            ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          opened ? "opacity-0" : "opacity-50 group-hover:opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          opened
            ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
            : "opacity-50 group-hover:opacity-100"
        }`}
      />
    </button>
  );
};

export default HamburgerButton;
