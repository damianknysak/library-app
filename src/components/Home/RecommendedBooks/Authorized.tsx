import { SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";

const Authorized: React.FC<{
  pending: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  length: number | undefined;
}> = ({ pending, setShow, length }) => {
  let isRecommendationEmpty = pending ? false : !length ? true : false;
  return (
    <div className="flex justify-between shadow-md shadow-gray-500 p-10 rounded-b-xl overflow-hidden">
      <div className="flex flex-col max-w-[20rem]">
        <span className="text-lg font-bold my-5">Witaj czytelniku!</span>
        <span className="text-gray-500 font-bold">
          {!pending && isRecommendationEmpty
            ? "Polub jakieś książki, abyśmy mogli zaproponować Ci nasze rekomendacje."
            : "Rekomendacje książek tylko dla Ciebie! Rekomendacje zostały stworzone na bazie twoich polubień."}
        </span>
        <button
          onClick={() => {
            if (!isRecommendationEmpty && !pending) {
              setShow(true);
            }
          }}
          className={`my-5 w-36 h-10 ${
            isRecommendationEmpty ? "bg-gray-500" : "bg-[--secondary]"
          } rounded-xl`}
        >
          <span className="text-white font-bold">
            {pending
              ? "Przygotowuje ..."
              : isRecommendationEmpty
              ? "Brak"
              : "Zobacz"}
          </span>
        </button>
      </div>
      <img
        alt="books."
        className="object-contain w-56"
        src={require("../../../assets/books1.png")}
      />
    </div>
  );
};

export default Authorized;
