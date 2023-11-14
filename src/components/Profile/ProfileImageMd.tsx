import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_API_URL } from "../../app/api/apiSlice";
import {
  selectCurrentToken,
  selectCurrentUser,
  setProfileImage,
} from "../../features/auth/authSlice";
import { BiEdit, BiSave } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import {
  useAddProfileImageMutation,
  useGetCurrentUserQuery,
} from "../../features/users/userSlice";

const ProfileImageMd = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const [image, setImage] = useState<string>("");
  const [fileImage, setFileImage] = useState<any>();
  const [addProfileImage] = useAddProfileImageMutation();
  const dispatch = useDispatch();
  const { data, refetch } = useGetCurrentUserQuery({ userId: user!._id });
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    inputRef!.current!.click();
  };
  const handleSaveClick = () => {
    addProfileImage({
      image: fileImage,
      token: token,
    }).then(() => {
      refetch();
    });

    setFileImage(null);
    setImage("");
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(URL.createObjectURL(e!.target!.files![0]));
    setFileImage(e!.target!.files![0]);
  };

  useEffect(() => {
    if (data && user?.profileImage != data.profileImage) {
      dispatch(setProfileImage({ profileImageUrl: data.profileImage }));
    }
  }, [data]);
  return (
    <div className="lg:hidden flex flex-col space-y-5 items-center justify-center">
      <span className="text-white text-lg font-bold text-center">
        Twój profil
      </span>
      {!isImageLoaded && <Skeleton width={240} height={240} />}
      <img
        className={`w-60 h-60 shadow-2xl shadow-black ${
          !isImageLoaded && "hidden"
        }  rounded-full`}
        src={image ? image : `${BASE_API_URL}/${user!.profileImage}`}
        alt={user?.email}
        onLoad={() => {
          setIsImageLoaded(true);
        }}
      />
      {user ? (
        <div className="flex items-center space-x-5 text-black font-bold">
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
        formEncType="multipart/form-data"
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
      {image && (
        <button
          onClick={handleSaveClick}
          className="flex items-center justify-center space-x-2 border-2 border-[--secondary] bg-white p-3 font-bold rounded-xl"
        >
          <span className="text-black">Zapisz zmiany</span>
          <BiSave color="black" size={25} />
        </button>
      )}
    </div>
  );
};

export default ProfileImageMd;
