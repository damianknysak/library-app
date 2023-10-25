import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_API_URL } from "../../app/api/apiSlice";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { BiEdit } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";

const ProfileImage = () => {
  const user = useSelector(selectCurrentUser);
  const [image, setImage] = useState<string>("");
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    inputRef!.current!.click();
  };
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e!.target!.files![0]));
  };
  return (
    <main className="lg:fixed right-0 top-15 w-[25rem]">
      <div className="mx-10 hidden lg:flex flex-col items-center space-y-4 py-14 bg-[--primary] h-[50rem]">
        <span className="text-white text-lg font-bold text-center">
          Twój profil
        </span>
        {!isImageLoaded && <Skeleton width={240} height={240} />}

        <img
          className={`w-60 h-60 shadow-2xl ${
            !isImageLoaded && "hidden"
          }  rounded-full`}
          src={image ? image : `${BASE_API_URL}/${user!.profileImage}`}
          alt={user?.email}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
        />
        {user ? (
          <div className="flex items-center space-x-5 text-white font-bold">
            <span>
              {user.firstName} {user.lastName}
            </span>
          </div>
        ) : (
          <Skeleton height={20} width={180} />
        )}

        <input
          ref={inputRef}
          className="hidden"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onImageChange(e)}
        />
        <button
          onClick={handleButtonClick}
          className="flex items-center justify-center space-x-2 bg-[--secondary] p-3 font-bold rounded-xl"
        >
          <span className="text-white">Zmień zdjęcie profilowe</span>
          <BiEdit color="white" size={25} />
        </button>
      </div>
    </main>
  );
};

export default ProfileImage;
