import React, { useCallback, useEffect } from 'react';
import {
  TrendingUp, TrendingDown, Package, AlertTriangle, Truck,
  MapPin, Bell, Settings, Menu, X, Home, BarChart3,
  ShoppingCart, Map, User, Search, ChevronDown, Calendar,
  DollarSign, Clock, CheckCircle, XCircle, Filter, Download,
  HelpCircle, FileText, Users, Award
} from 'lucide-react';
import DashboardPage from './components/DashboardPage';
import ForecastingPage from './components/ForecastingPage';
import InventoryPage from './components/InventoryPage';
import DisruptionsPage from './components/DisruptionsPage';
import LogisticsPage from './components/LogisticsPage';
import AnalyticsPage from './components/AnalyticsPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';
import HelpPage from './components/HelpPage';
import ReportsPage from './components/ReportsPage';
import OrdersPage from './components/OrdersPage';
import SuppliersPage from './components/SuppliersPage';
import ProcurementPage from './components/ProcurementPage';
import PerformancePage from './components/PerformancePage';
import ThemeToggle from './components/ThemeToggle';
import NotificationSystem from './components/NotificationSystem';
import { useGlobalState } from './contexts/GlobalStateContext';

const navigation = [
  { name: 'Dashboard', icon: Home, id: 'dashboard' },
  { name: 'Orders', icon: ShoppingCart, id: 'orders' },
  { name: 'Forecasting', icon: TrendingUp, id: 'forecasting' },
  { name: 'Inventory', icon: Package, id: 'inventory' },
  { name: 'Suppliers', icon: Users, id: 'suppliers' },
  { name: 'Procurement', icon: DollarSign, id: 'procurement' },
  { name: 'Disruptions', icon: AlertTriangle, id: 'disruptions' },
  { name: 'Logistics', icon: Truck, id: 'logistics' },
  { name: 'Analytics', icon: BarChart3, id: 'analytics' },
  { name: 'Performance', icon: Award, id: 'performance' },
  { name: 'Reports', icon: FileText, id: 'reports' },
  { name: 'Settings', icon: Settings, id: 'settings' },
  { name: 'Profile', icon: User, id: 'profile' },
  { name: 'Help', icon: HelpCircle, id: 'help' }
];

const OptiFlowApp = () => {
  const { state, actions } = useGlobalState();
  const { ui, notifications } = state;
  const { currentPage, sidebarOpen } = ui;
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    actions.updateTheme(initialTheme);
    
    // Apply theme to document
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [actions]);
  
  const handlePageChange = useCallback((page) => {
    actions.setCurrentPage(page);
    if (window.innerWidth < 1024) {
      actions.toggleSidebar();
    }
  }, [actions]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'orders':
        return <OrdersPage />;
      case 'forecasting':
        return <ForecastingPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'suppliers':
        return <SuppliersPage />;
      case 'procurement':
        return <ProcurementPage />;
      case 'disruptions':
        return <DisruptionsPage />;
      case 'logistics':
        return <LogisticsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'performance':
        return <PerformancePage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'help':
        return <HelpPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900 dark:from-slate-900 dark:to-blue-900 dark:text-white transition-colors duration-300`}>
      {/* Notification System */}
      <NotificationSystem />
      
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <button onClick={actions.toggleSidebar} className="lg:hidden">
              <Menu className="w-6 h-6 dark:text-white" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-300 hidden sm:block">
                OptiFlow AI
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search products, SKUs, routes..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="relative">
              <Bell className="w-6 h-6 dark:text-white" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  {notifications}
                </span>
              )}
            </button>
            <button className="hidden sm:block">
              <Settings className="w-6 h-6 dark:text-white" />
            </button>
            <button className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-400 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-slate-900/90 backdrop-blur-lg border-r border-slate-200 dark:border-slate-700 transition-transform duration-300 z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-4 space-y-2 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
          
          <div className="flex-shrink-0 pt-2">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10 rounded-xl p-4 border border-green-400/30 dark:border-green-400/20">
              <h4 className="font-semibold mb-2 dark:text-white">Upgrade to Pro</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Get unlimited forecasts and priority support</p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg text-sm font-semibold hover:shadow-lg text-white">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'}`}>
        <div className="p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
          {renderPage()}
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={actions.toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default OptiFlowApp;