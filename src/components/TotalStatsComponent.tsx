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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      {/* Total Users */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-400 bg-opacity-30 rounded-xl">
            <FaUsers className="text-white text-3xl" />
          </div>
          <span className="text-4xl font-bold text-white">{statsdata.totalusers}</span>
        </div>
        <h2 className="text-white text-lg font-medium">Total Users</h2>
        <div className="mt-2 w-full bg-blue-400 bg-opacity-30 h-1 rounded-full" />
      </div>

      {/* Total Property Listed */}
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-emerald-400 bg-opacity-30 rounded-xl">
            <FaBuilding className="text-white text-3xl" />
          </div>
          <span className="text-4xl font-bold text-white">{statsdata.totalproperties}</span>
        </div>
        <h2 className="text-white text-lg font-medium">Total Properties</h2>
        <div className="mt-2 w-full bg-emerald-400 bg-opacity-30 h-1 rounded-full" />
      </div>

      {/* Total Purchases */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-purple-400 bg-opacity-30 rounded-xl">
            <FaShoppingCart className="text-white text-3xl" />
          </div>
          <span className="text-4xl font-bold text-white">0</span>
        </div>
        <h2 className="text-white text-lg font-medium">Total Purchases</h2>
        <div className="mt-2 w-full bg-purple-400 bg-opacity-30 h-1 rounded-full" />
      </div>
    </div>
  );
};

export default TotalStatsComponent;
