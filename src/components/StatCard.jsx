import React from 'react';

const StatCard = ({ title, value, description, icon: Icon, color }) => (
  <div className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 ${color || ''}`}>
    <div className="flex items-center justify-between mb-4">
      <div className="text-sm font-semibold">{title}</div>
      {Icon && <Icon className="w-5 h-5" />}
    </div>
    <div className="text-3xl font-bold mb-1">{value}</div>
    {description && <div className="text-sm text-slate-400">{description}</div>}
  </div>
);

export default StatCard;