import React from "react";
import UnauthorizedUserInfo from "../components/MyLibrary/UnauthorizedUserInfo";

function MyLibrary() {
  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full">
          {/* Main section */}
          <div className="my-5">
            <span className="text-2xl font-bold">Twoja biblioteka</span>
          </div>
          <UnauthorizedUserInfo />
        </main>

        <aside className="hidden lg:block lg:min-w-[25rem]">
          {/* Place for Details Panel */}
        </aside>
      </div>
    </div>
  );
}

export default MyLibrary;
