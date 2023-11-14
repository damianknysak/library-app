import React from "react";

function Help() {
  return (
    <div className="w-full">
      <div className="flex ">
        <main className="flex flex-col w-full">
          <div className="flex flex-col lg:flex-row justify-between shadow-md shadow-gray-500 p-10 rounded-b-xl overflow-hidden">
            <div className="flex flex-col max-w-[20rem]">
              <span className="text-lg font-bold my-5">Masz pytania?</span>
              <span className="text-gray-500 font-bold">
                Nazywam się <span className="text-black">Damian Knysak </span>
                (damian.knysak1@gmail.com), jestem autorem tego projektu. Jeśli
                masz pytania, czy też chcesz po prostu porozmawiać, napisz do
                mnie, a z chęcią odpowiem.
              </span>
              <a
                href="mailto:damian.knysak1@gmail.com"
                className="my-5 w-36 h-10 bg-[--secondary] rounded-xl flex items-center justify-center"
              >
                <span className="text-white font-bold">Napisz do mnie</span>
              </a>
            </div>
            <img
              alt="books."
              className="object-contain w-56"
              src={require("../assets/books1.png")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Help;
