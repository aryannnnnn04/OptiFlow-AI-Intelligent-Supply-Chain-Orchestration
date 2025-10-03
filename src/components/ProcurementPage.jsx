import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Search, Filter, Plus, Eye, Edit, Trash2, 
  Calendar, DollarSign, CheckCircle, Clock, AlertTriangle,
  ChevronDown, Download, TrendingUp, BarChart3, PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useGlobalState } from '../contexts/GlobalStateContext';
import DataTable from './DataTable';

const ProcurementPage = () => {
  const { state, actions } = useGlobalState();
  const { procurement, loading, errors } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    actions.fetchData('procurement');
  }, [actions]);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/20', text: 'Delivered' };
      case 'shipped':
        return { icon: TrendingUp, color: 'text-blue-400', bgColor: 'bg-blue-500/20', text: 'Shipped' };
      case 'processing':
        return { icon: Clock, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', text: 'Processing' };
      case 'pending':
        return { icon: Clock, color: 'text-purple-400', bgColor: 'bg-purple-500/20', text: 'Pending' };
      case 'delayed':
        return { icon: AlertTriangle, color: 'text-red-400', bgColor: 'bg-red-500/20', text: 'Delayed' };
      default:
        return { icon: Clock, color: 'text-gray-400', bgColor: 'bg-gray-500/20', text: 'Unknown' };
    }
  };

  const monthlySpending = [
    { month: 'Jan', spending: 1200000, orders: 24 },
    { month: 'Feb', spending: 980000, orders: 18 },
    { month: 'Mar', spending: 1150000, orders: 22 },
    { month: 'Apr', spending: 1320000, orders: 26 },
    { month: 'May', spending: 1450000, orders: 28 },
    { month: 'Jun', spending: procurement.reduce((sum, p) => sum + p.amount, 0), orders: procurement.length }
  ];

  const categorySpending = [
    { name: 'Raw Materials', value: 45 },
    { name: 'Components', value: 30 },
    { name: 'Packaging', value: 15 },
    { name: 'Services', value: 10 }
  ];

  const supplierPerformance = [
    { supplier: 'Global Components', performance: 95, orders: 12 },
    { supplier: 'Tech Materials', performance: 92, orders: 8 },
    { supplier: 'Precision Parts', performance: 88, orders: 15 },
    { supplier: 'Industrial Solutions', performance: 94, orders: 10 },
    { supplier: 'Advanced Manufacturing', performance: 85, orders: 7 }
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

  const filteredProcurement = procurement.filter(item => {
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading.procurement) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (errors.procurement) {
    return (
      <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Error Loading Procurement Data</h3>
        <p className="text-red-200">{errors.procurement}</p>
        <button 
          onClick={() => actions.fetchData('procurement')}
          className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Calculate summary statistics
  const totalSpend = procurement.reduce((sum, item) => sum + item.amount, 0);
  const activeOrders = procurement.filter(item => item.status === 'processing' || item.status === 'pending').length;
  const deliveredOrders = procurement.filter(item => item.status === 'delivered').length;
  const delayedOrders = procurement.filter(item => item.status === 'delayed').length;

  // Define table columns
  const columns = [
    { key: 'id', header: 'PO ID' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'date', header: 'Date' },
    { key: 'items', header: 'Items' },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (value) => `₹${value.toLocaleString()}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => {
        const statusInfo = getStatusInfo(value);
        const StatusIcon = statusInfo.icon;
        return (
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${statusInfo.bgColor} ${statusInfo.color}`}>
            <StatusIcon className="w-4 h-4" />
            <span>{statusInfo.text}</span>
          </div>
        );
      }
    }
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'delayed', label: 'Delayed' }
  ];

  return (
    <div className="space-y-6 min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold">Procurement Management</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:shadow-lg flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Purchase Order</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Total Spend (MTD)</p>
              <p className="text-2xl font-bold mt-1">₹{(totalSpend / 100000).toFixed(1)}L</p>
            </div>
            <DollarSign className="w-10 h-10 text-blue-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Active Orders</p>
              <p className="text-2xl font-bold mt-1">{activeOrders}</p>
            </div>
            <ShoppingCart className="w-10 h-10 text-green-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Delivered Orders</p>
              <p className="text-2xl font-bold mt-1">{deliveredOrders}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-purple-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Delayed Orders</p>
              <p className="text-2xl font-bold mt-1">{delayedOrders}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Procurement Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Monthly Spending & Order Trends</h3>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#94a3b8" />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="spending" fill="#3b82f6" name="Spending (₹)" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', r: 6 }} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Spending by Category</h3>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySpending}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categorySpending.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Supplier Performance */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold mb-4">Supplier Performance</h3>
        <div className="h-80 min-h-[20rem]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={supplierPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="supplier" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[80, 100]} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              <Legend />
              <Bar dataKey="performance" fill="#8b5cf6" name="Performance Score" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Procurement Table */}
      <DataTable
        title="Purchase Orders"
        data={filteredProcurement}
        columns={columns}
        searchable={true}
        filterable={true}
        exportable={true}
        actions={true}
        onSearch={setSearchTerm}
        onFilter={setStatusFilter}
        onExport={() => console.log('Export procurement')}
        onView={(item) => console.log('View procurement', item)}
        onEdit={(item) => console.log('Edit procurement', item)}
        onDelete={(item) => console.log('Delete procurement', item)}
        searchPlaceholder="Search procurement..."
        filterOptions={filterOptions}
        filterValue={statusFilter}
        loading={loading.procurement}
        error={errors.procurement}
      />
    </div>
  );
};

export default ProcurementPage;