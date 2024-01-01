// TotalStatsComponent.tsx
import React from 'react';
type StatsType = {
  totalusers: number;
  totalproperties: number;
};

interface TotalStatsComponentProps {
  statsdata: StatsType;
}

const TotalStatsComponent: React.FC<TotalStatsComponentProps> = ({statsdata}) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
      {/* Total Users */}
      <div className="bg-gray-200 p-4 w-full md:w-1/3">
        <h2>Total Users</h2>
        {statsdata.totalusers}
      </div>

      {/* Total Property Listed */}
      <div className="bg-gray-200 p-4 w-full md:w-1/3">
        <h2>Total Property Listed</h2>
        {statsdata.totalproperties}
      </div>

      {/* Total Purchases */}
      <div className="bg-gray-200 p-4 w-full md:w-1/3">
        <h2>Total Purchases</h2>
        0
      </div>
    </div>
  );
};

export default TotalStatsComponent;
