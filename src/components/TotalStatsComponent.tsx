// TotalStatsComponent.tsx
import React from 'react';

const TotalStatsComponent: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
      {/* Total Users */}
      <div className="bg-gray-200 p-4 w-full md:w-1/3">
        <h2>Total Users</h2>
        {/* Add your data rendering logic here */}
      </div>

      {/* Total Property Listed */}
      <div className="bg-gray-200 p-4 w-full md:w-1/3">
        <h2>Total Property Listed</h2>
        {/* Add your data rendering logic here */}
      </div>

      {/* Total Purchases */}
      <div className="bg-gray-200 p-4 w-full md:w-1/3">
        <h2>Total Purchases</h2>
        {/* Add your data rendering logic here */}
      </div>
    </div>
  );
};

export default TotalStatsComponent;
