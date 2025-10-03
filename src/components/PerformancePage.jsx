import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, AlertTriangle, Package, Clock, 
  XCircle, Truck, Calendar, BarChart3, PieChart, LineChart, 
  Filter, Download, ChevronDown, Target, Award, Zap, Users, ShoppingCart
} from 'lucide-react';
import { BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const PerformancePage = () => {
  const [dateRange, setDateRange] = useState('last30');
  
  // Operational performance metrics
  const operationalMetrics = [
    { name: 'Order Fulfillment Rate', value: 96.8, target: 98, change: -1.2, trend: 'down', icon: ShoppingCart },
    { name: 'On-Time Delivery', value: 94.2, target: 95, change: -0.8, trend: 'down', icon: Truck },
    { name: 'Supplier Performance', value: 91.3, target: 92, change: -0.8, trend: 'down', icon: Users },
    { name: 'Inventory Accuracy', value: 97.5, target: 98, change: 0.5, trend: 'up', icon: Package },
    { name: 'Customer Satisfaction', value: 4.7, target: 4.8, change: 0.1, trend: 'up', icon: Award, format: 'rating' },
    { name: 'Process Efficiency', value: 88.4, target: 90, change: -1.6, trend: 'down', icon: Zap }
  ];

  const teamPerformanceData = [
    { team: 'Forecasting', performance: 92, accuracy: 94, efficiency: 89 },
    { team: 'Procurement', performance: 88, accuracy: 91, efficiency: 85 },
    { team: 'Logistics', performance: 95, accuracy: 96, efficiency: 94 },
    { team: 'Inventory', performance: 90, accuracy: 92, efficiency: 88 },
    { team: 'Customer Service', performance: 87, accuracy: 89, efficiency: 85 }
  ];

  const serviceLevelData = [
    { month: 'Jan', serviceLevel: 95, target: 96 },
    { month: 'Feb', serviceLevel: 94, target: 96 },
    { month: 'Mar', serviceLevel: 96, target: 96 },
    { month: 'Apr', serviceLevel: 93, target: 96 },
    { month: 'May', serviceLevel: 97, target: 96 },
    { month: 'Jun', serviceLevel: 96, target: 96 }
  ];

  const getStatusColor = (trend) => {
    return trend === 'up' ? 'text-green-400' : 'text-red-400';
  };

  const formatValue = (value, format) => {
    if (format === 'currency') {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    if (format === 'rating') {
      return value.toFixed(1);
    }
    if (Number.isInteger(value)) {
      return value;
    }
    return value.toFixed(1);
  };

  const formatTarget = (target, format) => {
    if (format === 'currency') {
      return `₹${(target / 100000).toFixed(1)}L`;
    }
    if (format === 'rating') {
      return target.toFixed(1);
    }
    if (Number.isInteger(target)) {
      return target;
    }
    return target.toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold">Operational Performance</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 appearance-none pr-10 w-full sm:w-auto"
            >
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="last90">Last 90 Days</option>
              <option value="lastYear">Last Year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 flex items-center justify-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Operational KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operationalMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-5 h-5 text-slate-400" />
                  <h3 className="font-bold text-slate-300">{metric.name}</h3>
                </div>
                <div className={`flex items-center space-x-1 ${getStatusColor(metric.trend)}`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  <span className="text-sm font-medium">{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold mb-1">
                    {formatValue(metric.value, metric.format)}
                    {metric.format !== 'rating' && '%'}
                  </p>
                  <p className="text-sm text-slate-400">Target: {formatTarget(metric.target, metric.format)}{metric.format !== 'rating' && '%'}</p>
                </div>
                <Target className="w-10 h-10 text-slate-400" />
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-2 mt-4">
                <div 
                  className={`h-2 rounded-full ${metric.value >= metric.target ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{ width: `${Math.min(100, (metric.value / metric.target) * 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Performance Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Team Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={teamPerformanceData}>
              <PolarGrid stroke="#ffffff20" />
              <PolarAngleAxis dataKey="team" stroke="#94a3b8" />
              <PolarRadiusAxis angle={30} domain={[80, 100]} stroke="#94a3b8" />
              <Radar
                name="Performance"
                dataKey="performance"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Radar
                name="Accuracy"
                dataKey="accuracy"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.3}
              />
              <Radar
                name="Efficiency"
                dataKey="efficiency"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.3}
              />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Level Trend */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Service Level Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={serviceLevelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[90, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="serviceLevel" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ fill: '#3b82f6', r: 6 }} 
                name="Actual Service Level"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#22c55e" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={{ fill: '#22c55e', r: 4 }} 
                name="Target Service Level"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30">
            <div className="flex items-center space-x-3 mb-3">
              <Award className="w-8 h-8 text-green-400" />
              <div>
                <p className="font-medium">Top Performing Area</p>
                <p className="text-sm text-slate-300">Logistics Team: 95% Performance</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              The logistics team has consistently met or exceeded performance targets for the past 3 months.
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-400/30">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-8 h-8 text-blue-400" />
              <div>
                <p className="font-medium">Improvement Opportunity</p>
                <p className="text-sm text-slate-300">Procurement Efficiency: 88%</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              Implementing automated procurement workflows could improve efficiency by 12-15%.
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-400/30">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="w-8 h-8 text-orange-400" />
              <div>
                <p className="font-medium">Requires Attention</p>
                <p className="text-sm text-slate-300">On-Time Delivery: 94.2%</p>
              </div>
            </div>
            <p className="text-sm text-slate-300">
              Recent delays in the Mumbai distribution center are affecting overall delivery performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage;