import React, { useEffect } from "react";
import { useGetLibraryBooksStatsQuery } from "../../features/librarybooks/libraryBooksSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { BiBook, BiSolidFlame, BiUser } from "react-icons/bi";
import { shortenString } from "../../utils/StringUtils";
import { BarChart, PieChart } from "@mui/x-charts";

export type LibraryBooksStats = {
  topSubjects: { el: string; count: number }[];
  topAuthors: { el: string; count: number }[];
  totalAmount: number;
  readAmount: number;
};

const MyLibraryStats = () => {
  const token = useSelector(selectCurrentToken);
  const { data, isLoading } = useGetLibraryBooksStatsQuery({ token: token });
  const authorChartData = data
    ? data.topAuthors.map((el) => {
        return {
          value: el.count,
          label: el.el,
        };
      })
    : undefined;
  const subjectChartData = data
    ? data.topSubjects.map((el) => {
        return { value: el.count, label: el.el };
      })
    : undefined;

  useEffect(() => {
    if (data) {
      console.log(subjectChartData);
    }
  }, [data]);
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
              {data && shortenString(data.topAuthors[0].el, 3)}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        {data && (
          <div className="flex h-full flex-col 2xl:flex-row flex-1 space-x-5">
            <div className="flex flex-1 flex-col items-center justify-center shadow-md rounded-xl">
              <span className="text-2xl">Tematy</span>
              <PieChart
                width={300}
                height={300}
                slotProps={{
                  legend: {
                    hidden: true,
                  },
                }}
                series={[
                  {
                    data: subjectChartData!,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 180,
                    cx: 150,
                    cy: 150,
                  },
                ]}
              />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center shadow-md rounded-xl">
              <span className="text-2xl">Autorzy</span>
              <PieChart
                width={300}
                height={300}
                slotProps={{
                  legend: {
                    hidden: true,
                  },
                }}
                series={[
                  {
                    data: authorChartData!,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: 90,
                    endAngle: 360,
                    cx: 150,
                    cy: 150,
                  },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibraryStats;
