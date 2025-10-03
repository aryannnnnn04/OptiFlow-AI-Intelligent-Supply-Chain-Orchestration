import React from 'react';
import { Search, Filter, Download, Eye, Edit, Trash2, ChevronDown } from 'lucide-react';

const DataTable = ({ 
  title,
  data,
  columns,
  searchable = true,
  filterable = true,
  exportable = true,
  actions = true,
  onSearch,
  onFilter,
  onExport,
  onEdit,
  onDelete,
  onView,
  searchPlaceholder = "Search...",
  filterOptions = [],
  filterValue = "all",
  loading = false,
  error = null
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 min-h-[300px]">
      {/* Table Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch && onSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 w-full sm:w-64"
              />
            </div>
          )}
          
          {filterable && filterOptions.length > 0 && (
            <div className="relative">
              <select 
                value={filterValue}
                onChange={(e) => onFilter && onFilter(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 appearance-none pr-10 w-full sm:w-auto"
              >
                <option value="all">All Status</option>
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          )}
          
          {exportable && (
            <button 
              onClick={onExport}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
          )}
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((column) => (
                <th key={column.key} className="pb-3 text-left">
                  {column.header}
                </th>
              ))}
              {actions && <th className="pb-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id || index} className="border-b border-white/5 hover:bg-white/5">
                {columns.map((column) => (
                  <td key={column.key} className="py-4">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      {onView && (
                        <button 
                          onClick={() => onView(row)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      )}
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(row)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => onDelete(row)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <h3 className="text-xl font-bold mb-2">Loading data...</h3>
        </div>
      )}
      
      {error && (
        <div className="text-center py-12 bg-red-500/20 border border-red-500 rounded-xl">
          <h3 className="text-xl font-bold mb-2">Error loading data</h3>
          <p className="text-red-200 mb-4">{error}</p>
          <button className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600">
            Retry
          </button>
        </div>
      )}
      
      {!loading && !error && data.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No data found</h3>
          <p className="text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-slate-400">
          Showing {data.length} of {data.length} entries
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20">
            Previous
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:shadow-lg">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;