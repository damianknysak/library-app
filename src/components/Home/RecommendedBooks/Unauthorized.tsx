import { useSearchParams } from "react-router-dom";

const Unauthorized = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="flex justify-between shadow-md shadow-gray-500 p-10 rounded-b-xl overflow-hidden">
      <div className="flex flex-col max-w-[20rem]">
        <span className="text-lg font-bold my-5">Witaj czytelniku!</span>
        <span className="text-gray-500 font-bold">
          Rekomendacje książek tylko dla Ciebie! Zarejestruj się by mieć do nich
          dostęp.
        </span>
        <button
          onClick={() => {
            searchParams.set("authorize", "register");
            setSearchParams(searchParams);
          }}
          className="my-5 w-36 h-10 bg-[--secondary] rounded-xl"
        >
          <span className="text-white font-bold">Dołącz do nas</span>
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

export default Unauthorized;
