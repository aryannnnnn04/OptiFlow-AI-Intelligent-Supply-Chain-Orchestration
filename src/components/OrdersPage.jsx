import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, TrendingUp, BarChart3, PieChart, CheckCircle, Truck, 
  Clock, AlertTriangle, Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { useGlobalState } from '../contexts/GlobalStateContext';
import DataTable from './DataTable';

const OrdersPage = () => {
  const { state, actions } = useGlobalState();
  const { orders, loading, errors } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    actions.fetchData('orders');
  }, [actions]);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'delivered':
        return { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/20', text: 'Delivered' };
      case 'shipped':
        return { icon: Truck, color: 'text-blue-400', bgColor: 'bg-blue-500/20', text: 'Shipped' };
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  // Analytics data
  const statusData = [
    { name: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: '#22c55e' },
    { name: 'Shipped', value: orders.filter(o => o.status === 'shipped').length, color: '#3b82f6' },
    { name: 'Processing', value: orders.filter(o => o.status === 'processing').length, color: '#f59e0b' },
    { name: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: '#8b5cf6' },
    { name: 'Delayed', value: orders.filter(o => o.status === 'delayed').length, color: '#ef4444' }
  ];

  const monthlyOrders = [
    { month: 'Jan', orders: 42 },
    { month: 'Feb', orders: 38 },
    { month: 'Mar', orders: 51 },
    { month: 'Apr', orders: 45 },
    { month: 'May', orders: 56 },
    { month: 'Jun', orders: orders.length }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const delayedOrders = orders.filter(order => order.status === 'delayed').length;

  if (loading.orders) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (errors.orders) {
    return (
      <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Error Loading Orders</h3>
        <p className="text-red-200">{errors.orders}</p>
        <button 
          onClick={() => actions.fetchData('orders')}
          className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Define table columns
  const columns = [
    { key: 'id', header: 'Order ID' },
    { key: 'customer', header: 'Customer' },
    { key: 'date', header: 'Date' },
    { key: 'items', header: 'Items' },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (value) => `₹${value.toLocaleString()}`
    },
    { key: 'eta', header: 'ETA' },
    { 
      key: 'priority', 
      header: 'Priority',
      render: (value) => (
        <span className={`font-medium ${getPriorityColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
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
        <h2 className="text-3xl font-bold">Order Management</h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Total Orders</p>
              <p className="text-2xl font-bold mt-1">{totalOrders}</p>
            </div>
            <ShoppingCart className="w-10 h-10 text-blue-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Total Revenue</p>
              <p className="text-2xl font-bold mt-1">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Pending Orders</p>
              <p className="text-2xl font-bold mt-1">{pendingOrders}</p>
            </div>
            <Clock className="w-10 h-10 text-purple-400" />
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

      {/* Order Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Order Status Distribution</h3>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Monthly Order Trends</h3>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <DataTable
        title="Orders"
        data={filteredOrders}
        columns={columns}
        searchable={true}
        filterable={true}
        exportable={true}
        actions={true}
        onSearch={setSearchTerm}
        onFilter={setStatusFilter}
        onExport={() => console.log('Export orders')}
        onView={(order) => console.log('View order', order)}
        onEdit={(order) => console.log('Edit order', order)}
        onDelete={(order) => console.log('Delete order', order)}
        searchPlaceholder="Search orders..."
        filterOptions={filterOptions}
        filterValue={statusFilter}
        loading={loading.orders}
        error={errors.orders}
      />
    </div>
  );
};

export default OrdersPage;