import React from 'react';

export default function StatCard({ icon: Icon, title, value, trend, trendLabel, color = 'indigo' }) {
  const colorMap = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    pink: 'bg-pink-500',
  };
  const bgColor = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
      <div className={`${bgColor} text-white rounded-lg p-3 flex-shrink-0`}>
        {Icon && <Icon size={24} />}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500 truncate">{title}</p>
        <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
        {trend !== undefined && (
          <p className={`text-xs mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% {trendLabel}
          </p>
        )}
      </div>
    </div>
  );
}
