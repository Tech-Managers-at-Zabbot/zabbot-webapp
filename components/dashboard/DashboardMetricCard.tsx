import React from 'react';
import { MiniGraph } from './MiniGraph';
// import { SlOptionsVertical } from "react-icons/sl";

export interface GraphDataPoint {
  x: number;
  y: number;
}

export interface MetricData {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  graphData: GraphDataPoint[];
}


interface DashboardMetricCardProps {
  data: MetricData;
}

export const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({ data }) => {
  return (
    <div className="bg-white w-full border border-gray-200 flex flex-col gap-[24px] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
    style={{fontFamily: "Lexend"}}
    >
      <div className="flex justify-start items-start mb-4">
        <h3 className="text-2xl leading-[100%] font-semibold text-[#162B6E]">{data.title}</h3>
        {/* <div className="text-gray-400">
         <SlOptionsVertical size={20}/>
        </div> */}
      </div>
      
      <div className='flex justify-between'>
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-2">{data.value}</div>
        <div className="flex items-center leading-[20px] font-medium text-sm">
          <span className="text-[#00DDA5] flex items-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00DDA5" strokeWidth="2" className="mr-1">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            {data.change}%
          </span>
          <span className="text-gray-500 ml-2">{data.changeLabel}</span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <MiniGraph data={data.graphData} />
      </div>
      </div>
    </div>
  );
};