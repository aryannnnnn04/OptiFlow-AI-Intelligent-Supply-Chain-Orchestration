import React from 'react';
import {
  Filter
} from 'lucide-react';
import StatCard from './StatCard';

const topProducts = [
  { sku: 'SKU-12345', name: 'Premium Widget A', demand: 2400, stock: 1800, status: 'low', trend: 'up', category: 'Electronics' },
  { sku: 'SKU-67890', name: 'Standard Component B', demand: 1800, stock: 3200, status: 'optimal', trend: 'stable', category: 'Electronics' },
  { sku: 'SKU-45678', name: 'Deluxe Module C', demand: 3200, stock: 2900, status: 'optimal', trend: 'up', category: 'Electronics' },
  { sku: 'SKU-23456', name: 'Basic Part D', demand: 1500, stock: 400, status: 'critical', trend: 'down', category: 'Electronics' }
];

const InventoryPage = React.memo(() => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold">Inventory Management</h2>
      <div className="flex items-center space-x-3">
        <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20">
          <Filter className="w-5 h-5" />
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg hover:shadow-lg">
          + Add Item
        </button>
      </div>
    </div>

    {/* Inventory Overview */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="TOTAL ITEMS"
        value="1,247"
        color="text-blue-400"
      />
      <StatCard
        title="IN STOCK"
        value="1,089"
        color="text-green-400"
      />
      <StatCard
        title="LOW STOCK"
        value="127"
        color="text-yellow-400"
      />
      <StatCard
        title="OUT OF STOCK"
        value="31"
        color="text-red-400"
      />
    </div>

    {/* Inventory Table */}
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold mb-4">Current Inventory</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">SKU</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Product Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Category</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">Stock</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-slate-400">Reorder Point</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product) => (
              <tr key={product.sku} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-4 px-4 text-sm">{product.sku}</td>
                <td className="py-4 px-4 text-sm font-medium">{product.name}</td>
                <td className="py-4 px-4 text-sm text-slate-400">{product.category}</td>
                <td className="py-4 px-4 text-sm text-right">{product.stock}</td>
                <td className="py-4 px-4 text-sm text-right">{Math.floor(product.stock * 0.3)}</td>
                <td className="py-4 px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    product.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                    product.status === 'low' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
));

export default InventoryPage;