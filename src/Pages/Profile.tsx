import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import ProfileImage from "../components/Profile/ProfileImage";
import MyLibraryStats from "../components/MyLibrary/MyLibraryStats";
import FavoriteBooksStats from "../components/Favorite/FavoriteBooksStats";
import ProfileImageMd from "../components/Profile/ProfileImageMd";

const Profile: React.FC = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="w-full">
      <div className="flex lg:ml-[15rem]">
        <main className="flex flex-col w-full">
          {user ? (
            <div className="space-y-5">
              <ProfileImageMd />
              <div>
                <span className="text-2xl font-bold">
                  Statystyki Twojej biblioteki
                </span>
              </div>
              <MyLibraryStats />
              <div>
                <span className="text-2xl font-bold">
                  Statystyki polubionych książek
                </span>
              </div>
              <FavoriteBooksStats />
            </div>
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
