import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Plus, Eye, Edit, Trash2, 
  MapPin, Phone, Mail, Star, CheckCircle, AlertTriangle,
  ChevronDown, Download, TrendingUp, BarChart3, PieChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { useGlobalState } from '../contexts/GlobalStateContext';
import DataTable from './DataTable';

const SuppliersPage = () => {
  const { state, actions } = useGlobalState();
  const { suppliers, loading, errors } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    actions.fetchData('suppliers');
  }, [actions]);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { icon: CheckCircle, color: 'text-green-400', bgColor: 'bg-green-500/20', text: 'Active' };
      case 'pending':
        return { icon: AlertTriangle, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', text: 'Pending' };
      case 'delayed':
        return { icon: AlertTriangle, color: 'text-red-400', bgColor: 'bg-red-500/20', text: 'Delayed' };
      default:
        return { icon: AlertTriangle, color: 'text-gray-400', bgColor: 'bg-gray-500/20', text: 'Unknown' };
    }
  };

  const categoryData = [
    { name: 'Electronics', value: suppliers.filter(s => s.category === 'Electronics').length },
    { name: 'Materials', value: suppliers.filter(s => s.category === 'Materials').length },
    { name: 'Components', value: suppliers.filter(s => s.category === 'Components').length },
    { name: 'Machinery', value: suppliers.filter(s => s.category === 'Machinery').length }
  ];

  const performanceData = suppliers.map(supplier => ({
    name: supplier.name.split(' ')[0],
    performance: supplier.performance
  }));

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444'];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          supplier.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading.suppliers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (errors.suppliers) {
    return (
      <div className="bg-red-500/20 border border-red-500 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Error Loading Suppliers</h3>
        <p className="text-red-200">{errors.suppliers}</p>
        <button 
          onClick={() => actions.fetchData('suppliers')}
          className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Define table columns
  const columns = [
    { key: 'id', header: 'Supplier ID' },
    { key: 'name', header: 'Name' },
    { key: 'contact', header: 'Contact' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    { key: 'location', header: 'Location' },
    { 
      key: 'rating', 
      header: 'Rating',
      render: (value) => (
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => {
        const statusInfo = getStatusInfo(value);
        const StatusIcon = statusInfo.icon;
        return (
          <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${statusInfo.bgColor} ${statusInfo.color}`}>
            <StatusIcon className="w-3 h-3" />
            <span>{statusInfo.text}</span>
          </div>
        );
      }
    }
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'delayed', label: 'Delayed' }
  ];

  return (
    <div className="space-y-6 min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold">Supplier Management</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:shadow-lg flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Total Suppliers</p>
              <p className="text-2xl font-bold mt-1">{suppliers.length}</p>
            </div>
            <Users className="w-10 h-10 text-blue-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Active Suppliers</p>
              <p className="text-2xl font-bold mt-1">{suppliers.filter(s => s.status === 'active').length}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300">Avg. Rating</p>
              <p className="text-2xl font-bold mt-1">
                {(suppliers.reduce((sum, supplier) => sum + supplier.rating, 0) / suppliers.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-10 h-10 text-purple-400 fill-current" />
          </div>
        </div>
      </div>

      {/* Supplier Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Supplier Performance</h3>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[80, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
                <Bar dataKey="performance" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4">Suppliers by Category</h3>
          <div className="h-80 min-h-[20rem]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Suppliers Table */}
      <DataTable
        title="Suppliers"
        data={filteredSuppliers}
        columns={columns}
        searchable={true}
        filterable={true}
        exportable={true}
        actions={true}
        onSearch={setSearchTerm}
        onFilter={setStatusFilter}
        onExport={() => console.log('Export suppliers')}
        onView={(supplier) => console.log('View supplier', supplier)}
        onEdit={(supplier) => console.log('Edit supplier', supplier)}
        onDelete={(supplier) => console.log('Delete supplier', supplier)}
        searchPlaceholder="Search suppliers..."
        filterOptions={filterOptions}
        filterValue={statusFilter}
        loading={loading.suppliers}
        error={errors.suppliers}
      />
    </div>
  );
};

export default SuppliersPage;