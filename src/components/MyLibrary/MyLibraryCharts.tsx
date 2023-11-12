import { PieChart } from "@mui/x-charts";
import React from "react";

export type ChartsDataType = {
  value: number;
  label: string;
}[];

const MyLibraryCharts: React.FC<{
  subjectChartData: ChartsDataType;
  authorChartData: ChartsDataType;
}> = ({ subjectChartData, authorChartData }) => {
  return (
    <div className="flex h-full flex-col 2xl:flex-row flex-1 space-y-5 2xl:space-y-0 2xl:space-x-5">
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
  );
};

export default MyLibraryCharts;
