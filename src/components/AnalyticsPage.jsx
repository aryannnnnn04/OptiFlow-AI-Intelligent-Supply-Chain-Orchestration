import React, { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { TrendingUp, TrendingDown, Zap, Target } from 'lucide-react';

const AnalyticsPage = React.memo(() => {
  // Advanced analytics data
  const demandPatternData = useMemo(() => [
    { day: 'Mon', demand: 1200, seasonality: 0.8 },
    { day: 'Tue', demand: 1500, seasonality: 0.9 },
    { day: 'Wed', demand: 1800, seasonality: 1.0 },
    { day: 'Thu', demand: 2100, seasonality: 1.1 },
    { day: 'Fri', demand: 2400, seasonality: 1.2 },
    { day: 'Sat', demand: 1900, seasonality: 1.0 },
    { day: 'Sun', demand: 1600, seasonality: 0.9 }
  ], []);

  const correlationData = useMemo(() => [
    { temperature: 20, demand: 1500 },
    { temperature: 25, demand: 1800 },
    { temperature: 30, demand: 2200 },
    { temperature: 35, demand: 2600 },
    { temperature: 40, demand: 3000 },
    { temperature: 45, demand: 2800 }
  ], []);

  const predictiveInsights = useMemo(() => [
    { metric: 'Demand Spike Probability', value: '87%', change: '+12%', trend: 'up' },
    { metric: 'Stockout Risk', value: '12%', change: '-5%', trend: 'down' },
    { metric: 'Optimal Reorder Point', value: '1,250 units', change: '+200', trend: 'up' },
    { metric: 'Lead Time Variability', value: '2.3 days', change: '-0.4', trend: 'down' }
  ], []);

  return (
    <div className="space-y-6 min-h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Advanced Analytics</h2>
        <div className="flex items-center space-x-3">
          <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:shadow-lg">
            Generate Report
          </button>
        </div>
      </div>

      {/* Advanced Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Demand Patterns & Seasonality</h3>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandPatternData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Legend />
                <Bar dataKey="demand" fill="url(#barGradient)" name="Average Demand" radius={[4, 4, 0, 0]} />
                <Bar dataKey="seasonality" fill="url(#seasonalityGradient)" name="Seasonality Index" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="seasonalityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#15803d" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">External Factor Correlation</h3>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis type="number" dataKey="temperature" name="Temperature" stroke="#94a3b8" />
                <YAxis type="number" dataKey="demand" name="Demand" stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Scatter name="Temperature vs Demand" dataKey="demand" fill="#f59e0b" />
                <ZAxis type="number" range={[100]} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Predictive Insights */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold mb-4">Predictive Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {predictiveInsights.map((insight, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-slate-300">{insight.metric}</h4>
                <div className={`flex items-center ${insight.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {insight.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{insight.value}</div>
              <div className={`text-sm ${insight.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {insight.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-xl p-6 border border-blue-400/30">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold">AI Recommendation</h3>
          </div>
          <p className="text-slate-300 mb-4">
            Based on current demand patterns, we recommend increasing inventory levels by 15% for high-demand SKUs 
            to prepare for the upcoming festival season. This could prevent potential stockouts and increase revenue 
            by an estimated ₹2.3L.
          </p>
          <button className="text-cyan-400 text-sm hover:underline">Implement Recommendation →</button>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-xl p-6 border border-green-400/30">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold">Optimization Opportunity</h3>
          </div>
          <p className="text-slate-300 mb-4">
            Our analysis shows that consolidating shipments on the Mumbai-Delhi route could save an additional 
            ₹85,000 per month. AI suggests implementing this change starting next week.
          </p>
          <button className="text-green-400 text-sm hover:underline">View Details →</button>
        </div>
      </div>
    </div>
  );
});

export default AnalyticsPage;