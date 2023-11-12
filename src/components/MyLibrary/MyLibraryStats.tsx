import { useGetLibraryBooksStatsQuery } from "../../features/librarybooks/libraryBooksSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { BiBook, BiSolidFlame, BiUser } from "react-icons/bi";
import { shortenString } from "../../utils/StringUtils";
import MyLibraryCharts from "./MyLibraryCharts";
import Skeleton from "react-loading-skeleton";

export type LibraryBooksStats = {
  topSubjects: { el: string; count: number }[];
  topAuthors: { el: string; count: number }[];
  totalAmount: number;
  readAmount: number;
};

const MyLibraryStats = () => {
  const token = useSelector(selectCurrentToken);
  const { data, isLoading } = useGetLibraryBooksStatsQuery({ token: token });
  const authorChartData =
    data && data.topAuthors.length > 0
      ? data.topAuthors.map((el) => {
          return {
            value: el.count,
            label: el.el,
          };
        })
      : undefined;
  const subjectChartData =
    data && data.topSubjects.length > 0
      ? data.topSubjects.map((el) => {
          return { value: el.count, label: el.el };
        })
      : undefined;

  return (
    <div className="flex flex-col space-y-5 items-center justify-between shadow-md shadow-gray-500 p-4 rounded-b-xl overflow-hidden xl:p-10 3xl:space-y-0 3xl:flex-row  3xl:space-x-5  ">
      <div className="flex flex-col h-full space-y-4 p-4 shadow-md rounded-xl w-full">
        <p className="text-xl font-bold">Statystyki</p>
        <div className="flex space-x-4">
          <div className="p-4 bg-gray-100 rounded-2xl">
            <BiBook color="blue" size={30} />
          </div>

          <div className="flex flex-col justify-between">
            <span>Liczba książek</span>
            <span className="text-3xl font-bold">
              {data && data.totalAmount}
              {isLoading && <Skeleton height={36} width={50} />}
            </span>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="p-4 bg-gray-100 rounded-2xl">
            <BiSolidFlame color="blue" size={30} />
          </div>

          <div className="flex flex-col justify-between">
            <span>Przeczytane książki</span>
            <span className="text-3xl font-bold">
              {data && data.readAmount}
              {isLoading && <Skeleton height={36} width={50} />}
            </span>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="p-4 bg-gray-100 rounded-2xl">
            <BiUser color="blue" size={30} />
          </div>

          <div className="flex flex-col justify-between">
            <span>Najczęstszy autor</span>
            <span className="text-3xl font-bold">
              {data &&
                data.topAuthors.length > 0 &&
                shortenString(data.topAuthors[0].el, 3)}
              {data && data.topAuthors.length === 0 && "Nieznany"}
              {isLoading && <Skeleton height={36} width={140} />}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        {subjectChartData &&
        authorChartData &&
        subjectChartData.length > 0 &&
        authorChartData!.length > 0 ? (
          <MyLibraryCharts
            subjectChartData={subjectChartData!}
            authorChartData={authorChartData!}
          />
        ) : (
          <div className="flex p-4 shadow-md h-full rounded-b-xl">
            <div className="flex-1 flex items-center justify-center">
              <span className="lg:text-sm xl:text-base">
                Pozwól nam pokazać Ci twoje statystyki i{" "}
                <b>dodaj do biblioteki</b> jakieś książki, będziemy wtedy
                również mogli dać Ci jakieś rekomendacje, aby Twoja biblioteka
                była ciekawsza.
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <img
                className="w-40 object-contain"
                src={require("../../assets/books1.png")}
                alt="BookPic"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibraryStats;
