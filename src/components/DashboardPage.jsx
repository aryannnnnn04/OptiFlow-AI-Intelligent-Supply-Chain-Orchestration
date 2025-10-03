import React, { useEffect } from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, AlertTriangle, Package, Clock, XCircle, Truck, Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from './StatCard';
import { useGlobalState } from '../contexts/GlobalStateContext';

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

const DashboardPage = React.memo(() => {
  const { state, actions } = useGlobalState();
  const { dashboard, loading, errors } = state;
  
  useEffect(() => {
    actions.fetchData('dashboard');
  }, [actions]);

  if (loading.dashboard) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (errors.dashboard) {
    return (
      <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Error Loading Dashboard</h3>
        <p className="text-red-200">{errors.dashboard}</p>
        <button 
          onClick={() => actions.fetchData('dashboard')}
          className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-[calc(100vh-8rem)]">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="FORECAST ACCURACY"
          value={`${dashboard.kpis.forecastAccuracy.toFixed(1)}%`}
          description="↑ 2.3% from last month"
          icon={TrendingUp}
          color="text-blue-400"
        />
        <StatCard
          title="COST SAVINGS (QTD)"
          value={`₹${(dashboard.kpis.costSavings / 100000).toFixed(1)}L`}
          description="↑ ₹3.2L from last quarter"
          icon={DollarSign}
          color="text-emerald-400"
        />
        <StatCard
          title="DISRUPTIONS PREVENTED"
          value={dashboard.kpis.disruptionsPrevented}
          description="Last 30 days"
          icon={AlertTriangle}
          color="text-purple-400"
        />
        <StatCard
          title="INVENTORY TURNOVER"
          value={`${dashboard.kpis.inventoryTurnover}x`}
          description="↑ 0.4x improvement"
          icon={Package}
          color="text-cyan-400"
        />
        <StatCard
          title="AVG DELIVERY TIME"
          value={`${dashboard.kpis.avgDeliveryTime} days`}
          description="↓ 0.8 days faster"
          icon={Clock}
          color="text-orange-400"
        />
        <StatCard
          title="STOCKOUT RATE"
          value={`${dashboard.kpis.stockoutRate}%`}
          description="↓ 1.2% improvement"
          icon={XCircle}
          color="text-red-400"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demand Forecast Chart */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Demand Forecast vs Actual</h3>
            <button 
              onClick={() => actions.setCurrentPage('analytics')}
              className="text-cyan-400 text-sm hover:underline"
            >
              View Details
            </button>
          </div>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboard.demandForecast}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Legend />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActual)" name="Actual Demand" />
                <Area type="monotone" dataKey="predicted" stroke="#22c55e" fillOpacity={1} fill="url(#colorPredicted)" name="Predicted" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Distribution */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Inventory Distribution</h3>
            <button 
              onClick={() => actions.setCurrentPage('inventory')}
              className="text-cyan-400 text-sm hover:underline"
            >
              View Details
            </button>
          </div>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboard.inventoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dashboard.inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Alerts & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Recent Alerts</h3>
            <button className="text-cyan-400 text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {dashboard.alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                alert.type === 'critical' ? 'bg-red-500/20' :
                alert.type === 'warning' ? 'bg-yellow-500/20' :
                alert.type === 'success' ? 'bg-green-500/20' : 'bg-blue-500/20'
              }`}>
                <div className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  alert.type === 'critical' ? 'text-red-400' :
                  alert.type === 'warning' ? 'text-yellow-400' :
                  alert.type === 'success' ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {alert.icon === 'AlertTriangle' && <AlertTriangle className="w-5 h-5" />}
                  {alert.icon === 'Truck' && <Truck className="w-5 h-5" />}
                  {alert.icon === 'Package' && <Package className="w-5 h-5" />}
                  {alert.icon === 'TrendingUp' && <TrendingUp className="w-5 h-5" />}
                  {alert.icon === 'Calendar' && <Calendar className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-slate-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Top Products by Demand</h3>
            <button className="text-cyan-400 text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {dashboard.topProducts.map((product) => (
              <div key={product.sku} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{product.name}</span>
                    {product.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : product.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : null}
                  </div>
                  <p className="text-xs text-slate-400">{product.sku}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <span>Demand: {product.demand}</span>
                    <span className={`${
                      product.status === 'critical' ? 'text-red-400' :
                      product.status === 'low' ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default DashboardPage;