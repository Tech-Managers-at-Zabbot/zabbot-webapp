import React from 'react';
import { GraphDataPoint } from './DashboardMetricCard';

interface MiniGraphProps {
  data: GraphDataPoint[];
  color?: string;
  width?: number;
  height?: number;
}

export const MiniGraph: React.FC<MiniGraphProps> = ({ 
  data, 
  color = '#12B76A', 
  width = 120, 
  height = 40 
}) => {
  if (!data || data.length === 0) return null;

  const maxY = Math.max(...data.map(d => d.y));
  const minY = Math.min(...data.map(d => d.y));
  const maxX = Math.max(...data.map(d => d.x));
  const minX = Math.min(...data.map(d => d.x));

  const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * width;
  const scaleY = (y: number) => height - ((y - minY) / (maxY - minY)) * height;

  const pathData = data
    .map((point, index) => {
      const x = scaleX(point.x);
      const y = scaleY(point.y);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};