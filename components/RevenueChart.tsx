
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { RevenuePoint } from '../types';

interface RevenueChartProps {
  data: RevenuePoint[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 text-[10px] px-2 py-1 rounded text-white border border-zinc-700 shadow-xl">
        <p className="font-medium">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
          <XAxis 
            dataKey="label" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }} 
            dy={10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === data.length - 1 ? '#fafafa' : '#27272a'}
                className={index === data.length - 1 ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : ''}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
