import React from "react";
import HamburgerButton from "./HamburgerButton";
import AsideHeader from "./AsideHeader";
import HorizontalHeader from "./HorizontalHeader";
const Header: React.FC = () => {
  return (
    <>
      <HorizontalHeader />
      <div className="flex mb-10 lg:mb-0 justify-between lg:justify-normal lg:flex-col flex-1 w-full lg:max-w-xs">
        <AsideHeader />
      </div>
    </>
  );
};

export default Header;
