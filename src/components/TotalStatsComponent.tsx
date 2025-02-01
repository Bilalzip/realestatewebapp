import React from 'react';
import { FaUsers, FaBuilding, FaShoppingCart } from 'react-icons/fa';

type StatsType = {
  totalusers: number;
  totalproperties: number;
};

interface TotalStatsComponentProps {
  statsdata: StatsType;
}

const TotalStatsComponent: React.FC<TotalStatsComponentProps> = ({ statsdata }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 shadow-md rounded-lg">
      {/* Total Users */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaUsers className="text-blue-500 text-4xl" />
        <div>
          <h2 className="text-gray-700 text-lg font-semibold">Total Users</h2>
          <p className="text-xl font-bold text-gray-900">{statsdata.totalusers}</p>
        </div>
      </div>

      {/* Total Property Listed */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaBuilding className="text-green-500 text-4xl" />
        <div>
          <h2 className="text-gray-700 text-lg font-semibold">Total Property Listed</h2>
          <p className="text-xl font-bold text-gray-900">{statsdata.totalproperties}</p>
        </div>
      </div>

      {/* Total Purchases */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaShoppingCart className="text-red-500 text-4xl" />
        <div>
          <h2 className="text-gray-700 text-lg font-semibold">Total Purchases</h2>
          <p className="text-xl font-bold text-gray-900">0</p>
        </div>
      </div>
    </div>
  );
};

export default TotalStatsComponent;
