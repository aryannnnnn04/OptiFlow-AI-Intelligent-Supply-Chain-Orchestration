import React, { useState } from 'react';
import { 
  FileText, Download, Calendar, Filter, BarChart3, TrendingUp, Package, 
  Truck, AlertTriangle, Printer, Share2, Eye, ChevronDown, Database, PieChart, LineChart
} from 'lucide-react';
import { BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('executive');
  const [dateRange, setDateRange] = useState('last30');
  
  // Executive summary data
  const executiveData = [
    { month: 'Jan', revenue: 1200000, costs: 800000, profit: 400000 },
    { month: 'Feb', revenue: 1350000, costs: 850000, profit: 500000 },
    { month: 'Mar', revenue: 1500000, costs: 900000, profit: 600000 },
    { month: 'Apr', revenue: 1400000, costs: 870000, profit: 530000 },
    { month: 'May', revenue: 1600000, costs: 920000, profit: 680000 },
    { month: 'Jun', revenue: 1750000, costs: 950000, profit: 800000 }
  ];

  // Supplier performance data
  const supplierData = [
    { supplier: 'Global Components Ltd', performance: 95, onTime: 98, quality: 92 },
    { supplier: 'Tech Materials Inc', performance: 92, onTime: 95, quality: 90 },
    { supplier: 'Precision Parts Co', performance: 88, onTime: 90, quality: 86 },
    { supplier: 'Industrial Solutions', performance: 94, onTime: 97, quality: 91 },
    { supplier: 'Advanced Manufacturing', performance: 85, onTime: 88, quality: 82 }
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

  const reportTypes = [
    { id: 'executive', name: 'Executive Summary', icon: BarChart3 },
    { id: 'financial', name: 'Financial Performance', icon: Database },
    { id: 'supplier', name: 'Supplier Analysis', icon: Truck },
    { id: 'operational', name: 'Operational Metrics', icon: PieChart },
    { id: 'trend', name: 'Trend Analysis', icon: LineChart }
  ];

  return (
    <div className="space-y-6 min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold">Comprehensive Reports</h2>
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
          <div className="relative">
            <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 flex items-center justify-center space-x-2 w-full sm:w-auto">
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Types Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 sticky top-20">
            <h3 className="font-bold mb-3">Report Categories</h3>
            <div className="space-y-1">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedReport === report.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                      : 'hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <report.icon className="w-5 h-5" />
                  <span>{report.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold">
                {reportTypes.find(r => r.id === selectedReport)?.name}
              </h3>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg">
                  <Printer className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            {selectedReport === 'executive' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-400/30">
                    <div className="text-sm text-slate-300 mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold">₹98.5L</div>
                    <div className="text-green-400 text-sm">↑ 18.2% from last period</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/30">
                    <div className="text-sm text-slate-300 mb-1">Net Profit</div>
                    <div className="text-2xl font-bold">₹34.6L</div>
                    <div className="text-green-400 text-sm">↑ 22.4% from last period</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-400/30">
                    <div className="text-sm text-slate-300 mb-1">Profit Margin</div>
                    <div className="text-2xl font-bold">35.1%</div>
                    <div className="text-green-400 text-sm">↑ 3.1% from last period</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">Revenue & Profit Trend</h4>
                    <div className="h-80 min-h-[20rem]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={executiveData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                          <XAxis dataKey="month" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="revenue" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            dot={{ fill: '#3b82f6', r: 6 }} 
                            name="Revenue"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="profit" 
                            stroke="#22c55e" 
                            strokeWidth={3} 
                            dot={{ fill: '#22c55e', r: 6 }} 
                            name="Profit"
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3">Cost Breakdown</h4>
                    <div className="h-80 min-h-[20rem]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Materials', value: 45 },
                              { name: 'Labor', value: 25 },
                              { name: 'Transportation', value: 15 },
                              { name: 'Overhead', value: 10 },
                              { name: 'Other', value: 5 }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {COLORS.map((color, index) => (
                              <Cell key={`cell-${index}`} fill={color} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedReport === 'supplier' && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="font-bold mb-4">Supplier Performance Rankings</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="pb-3 text-left">Supplier</th>
                          <th className="pb-3 text-left">Performance</th>
                          <th className="pb-3 text-left">On-Time Delivery</th>
                          <th className="pb-3 text-left">Quality Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplierData.map((supplier, index) => (
                          <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-4 font-medium">{supplier.supplier}</td>
                            <td className="py-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-white/10 rounded-full h-2">
                                  <div 
                                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" 
                                    style={{ width: `${supplier.performance}%` }}
                                  ></div>
                                </div>
                                <span>{supplier.performance}%</span>
                              </div>
                            </td>
                            <td className="py-4">{supplier.onTime}%</td>
                            <td className="py-4">{supplier.quality}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-3">Performance Distribution</h4>
                    <div className="h-80 min-h-[20rem]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={supplierData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                          <XAxis dataKey="supplier" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" domain={[80, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Legend />
                          <Bar dataKey="performance" fill="#3b82f6" name="Overall Performance" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold mb-3">Quality vs Delivery</h4>
                    <div className="h-80 min-h-[20rem]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={supplierData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                          <XAxis dataKey="supplier" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" domain={[80, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="quality" 
                            stroke="#22c55e" 
                            strokeWidth={3} 
                            dot={{ fill: '#22c55e', r: 6 }} 
                            name="Quality Score"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="onTime" 
                            stroke="#f59e0b" 
                            strokeWidth={3} 
                            dot={{ fill: '#f59e0b', r: 6 }} 
                            name="On-Time Delivery"
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {['financial', 'operational', 'trend'].includes(selectedReport) && (
              <div className="text-center py-12">
                <Database className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">
                  {reportTypes.find(r => r.id === selectedReport)?.name}
                </h4>
                <p className="text-slate-400 mb-4">
                  Detailed report for {reportTypes.find(r => r.id === selectedReport)?.name} is being generated.
                </p>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:shadow-lg">
                  Generate Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;