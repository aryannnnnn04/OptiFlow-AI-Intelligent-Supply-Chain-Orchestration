import React, { useMemo } from 'react';
import {
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ForecastingPage = React.memo(() => {
  // Memoize the demand forecast data to prevent unnecessary re-renders
  const demandForecast = useMemo(() => [
    { date: 'Jan 15', actual: 2400, predicted: 2380, confidence: 95 },
    { date: 'Jan 22', actual: 1398, predicted: 1420, confidence: 93 },
    { date: 'Jan 29', actual: 9800, predicted: 9750, confidence: 96 },
    { date: 'Feb 5', actual: 3908, predicted: 3890, confidence: 94 },
    { date: 'Feb 12', actual: 4800, predicted: 4850, confidence: 92 },
    { date: 'Feb 19', actual: 3800, predicted: 3820, confidence: 95 },
    { date: 'Feb 26', actual: null, predicted: 4300, confidence: 91 }
  ], []);

  // Memoize the category data
  const categoryData = useMemo(() => [
    { name: 'Electronics', value: 2400, accuracy: 95, trend: 'up' },
    { name: 'Textiles', value: 2900, accuracy: 92, trend: 'up' },
    { name: 'FMCG', value: 3400, accuracy: 97, trend: 'stable' }
  ], []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Predictive Forecasting</h2>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:shadow-lg">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Forecast Accuracy */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold mb-4">7-Day Demand Forecast</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={demandForecast}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} name="Actual Demand" dot={{ fill: '#3b82f6', r: 6 }} />
            <Line type="monotone" dataKey="predicted" stroke="#22c55e" strokeWidth={3} strokeDasharray="5 5" name="Predicted Demand" dot={{ fill: '#22c55e', r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Forecast by Category */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryData.map((category, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h4 className="text-lg font-bold mb-2">{category.name}</h4>
            <div className="text-3xl font-bold mb-2">{category.value.toLocaleString()}</div>
            <div className="text-sm text-slate-400 mb-4">Units forecasted (next 7 days)</div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: `${category.accuracy}%` }}></div>
              </div>
              <span className="text-sm">{category.accuracy}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ForecastingPage;