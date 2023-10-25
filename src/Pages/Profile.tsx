import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import { BASE_API_URL } from "../app/api/apiSlice";
import { BiEdit } from "react-icons/bi";
import ProfileImage from "../components/Profile/ProfileImage";
import ProfileLikedBooks from "../components/Profile/ProfileLikedBooks";

const Profile: React.FC = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full">
          {user ? (
            <>
              <ProfileLikedBooks />
              <ProfileLikedBooks />
              <ProfileLikedBooks />
            </>
          ) : (
            <>
              <span>Nie jesteś zalogowany</span>
            </>
          )}
        </main>
        <aside className="hidden lg:block lg:min-w-[25rem]">
          <ProfileImage />
        </aside>
      </div>
    </div>
  );
};

export default Profile;
