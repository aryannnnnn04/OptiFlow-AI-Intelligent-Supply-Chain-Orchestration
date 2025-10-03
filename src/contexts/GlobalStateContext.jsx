import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useApi } from '../hooks/useApi';

// Initial state
const initialState = {
  // User data
  user: {
    id: 'user-1',
    name: 'Alex Johnson',
    email: 'alex.johnson@company.com',
    role: 'Supply Chain Manager',
    preferences: {
      theme: 'dark',
      notifications: true,
      language: 'en'
    }
  },
  
  // Dashboard data
  dashboard: {
    kpis: {
      forecastAccuracy: 94.7,
      costSavings: 2400000,
      disruptionsPrevented: 47,
      inventoryTurnover: 8.2,
      avgDeliveryTime: 3.2,
      stockoutRate: 2.1
    },
    demandForecast: [
      { date: 'Jan 15', actual: 2400, predicted: 2380, confidence: 95 },
      { date: 'Jan 22', actual: 1398, predicted: 1420, confidence: 93 },
      { date: 'Jan 29', actual: 9800, predicted: 9750, confidence: 96 },
      { date: 'Feb 5', actual: 3908, predicted: 3890, confidence: 94 },
      { date: 'Feb 12', actual: 4800, predicted: 4850, confidence: 92 },
      { date: 'Feb 19', actual: 3800, predicted: 3820, confidence: 95 },
      { date: 'Feb 26', actual: null, predicted: 4300, confidence: 91 }
    ],
    inventoryData: [
      { category: 'Raw Materials', value: 35, status: 'optimal' },
      { category: 'Work in Progress', value: 25, status: 'warning' },
      { category: 'Finished Goods', value: 30, status: 'optimal' },
      { category: 'Packaging', value: 10, status: 'critical' }
    ],
    alerts: [
      { id: 1, type: 'critical', message: 'Monsoon delays expected in Mumbai port', time: '2 hours ago', icon: 'AlertTriangle' },
      { id: 2, type: 'warning', message: 'Supplier XYZ delivery delayed by 2 days', time: '4 hours ago', icon: 'Truck' },
      { id: 3, type: 'info', message: 'Inventory reorder point reached for SKU-12345', time: '6 hours ago', icon: 'Package' },
      { id: 4, type: 'success', message: 'Route optimization saved ₹45,000 this week', time: '1 day ago', icon: 'TrendingUp' },
      { id: 5, type: 'warning', message: 'Festival demand spike predicted in 7 days', time: '1 day ago', icon: 'Calendar' }
    ],
    topProducts: [
      { sku: 'SKU-12345', name: 'Premium Widget A', demand: 2400, stock: 1800, status: 'low', trend: 'up' },
      { sku: 'SKU-67890', name: 'Standard Component B', demand: 1800, stock: 3200, status: 'optimal', trend: 'stable' },
      { sku: 'SKU-45678', name: 'Deluxe Module C', demand: 3200, stock: 2900, status: 'optimal', trend: 'up' },
      { sku: 'SKU-23456', name: 'Basic Part D', demand: 1500, stock: 400, status: 'critical', trend: 'down' }
    ]
  },
  
  // Orders data
  orders: [
    { id: 'ORD-001', customer: 'ABC Corp', date: '2023-06-15', amount: 125000, status: 'delivered', items: 42, eta: '2023-06-18', priority: 'high' },
    { id: 'ORD-002', customer: 'XYZ Ltd', date: '2023-06-16', amount: 87500, status: 'shipped', items: 28, eta: '2023-06-20', priority: 'medium' },
    { id: 'ORD-003', customer: 'Tech Solutions', date: '2023-06-16', amount: 210000, status: 'processing', items: 65, eta: '2023-06-22', priority: 'high' },
    { id: 'ORD-004', customer: 'Global Enterprises', date: '2023-06-17', amount: 95000, status: 'pending', items: 32, eta: '2023-06-24', priority: 'low' },
    { id: 'ORD-005', customer: 'Innovative Systems', date: '2023-06-17', amount: 165000, status: 'delayed', items: 51, eta: '2023-06-25', priority: 'high' },
    { id: 'ORD-006', customer: 'Future Tech', date: '2023-06-18', amount: 78000, status: 'processing', items: 28, eta: '2023-06-26', priority: 'medium' },
    { id: 'ORD-007', customer: 'Digital Dynamics', date: '2023-06-18', amount: 142000, status: 'shipped', items: 38, eta: '2023-06-27', priority: 'high' },
    { id: 'ORD-008', customer: 'Quantum Innovations', date: '2023-06-19', amount: 98000, status: 'pending', items: 29, eta: '2023-06-28', priority: 'medium' }
  ],
  
  // Suppliers data
  suppliers: [
    { 
      id: 'SUP-001', 
      name: 'Global Components Ltd', 
      contact: 'John Smith', 
      email: 'john@globalcomponents.com', 
      phone: '+91 98765 43210', 
      location: 'Mumbai, India', 
      rating: 4.8, 
      status: 'active', 
      products: 42, 
      lastOrder: '2023-06-15',
      performance: 95,
      category: 'Electronics'
    },
    { 
      id: 'SUP-002', 
      name: 'Tech Materials Inc', 
      contact: 'Sarah Johnson', 
      email: 'sarah@techmaterials.com', 
      phone: '+1 555 123 4567', 
      location: 'San Francisco, USA', 
      rating: 4.5, 
      status: 'active', 
      products: 28, 
      lastOrder: '2023-06-18',
      performance: 92,
      category: 'Materials'
    },
    { 
      id: 'SUP-003', 
      name: 'Precision Parts Co', 
      contact: 'Michael Chen', 
      email: 'michael@precisionparts.com', 
      phone: '+86 138 0013 8000', 
      location: 'Shanghai, China', 
      rating: 4.2, 
      status: 'pending', 
      products: 65, 
      lastOrder: '2023-06-10',
      performance: 88,
      category: 'Components'
    },
    { 
      id: 'SUP-004', 
      name: 'Industrial Solutions', 
      contact: 'Emma Wilson', 
      email: 'emma@industrialsolutions.com', 
      phone: '+44 20 7123 4567', 
      location: 'London, UK', 
      rating: 4.9, 
      status: 'active', 
      products: 32, 
      lastOrder: '2023-06-20',
      performance: 94,
      category: 'Machinery'
    },
    { 
      id: 'SUP-005', 
      name: 'Advanced Manufacturing', 
      contact: 'Robert Kim', 
      email: 'robert@advancedmfg.com', 
      phone: '+82 2 1234 5678', 
      location: 'Seoul, South Korea', 
      rating: 3.9, 
      status: 'delayed', 
      products: 51, 
      lastOrder: '2023-05-28',
      performance: 85,
      category: 'Electronics'
    },
    { 
      id: 'SUP-006', 
      name: 'Quality Components', 
      contact: 'Lisa Anderson', 
      email: 'lisa@qualitycomponents.com', 
      phone: '+61 2 9876 5432', 
      location: 'Sydney, Australia', 
      rating: 4.7, 
      status: 'active', 
      products: 24, 
      lastOrder: '2023-06-12',
      performance: 91,
      category: 'Components'
    }
  ],
  
  // Procurement data
  procurement: [
    { id: 'PO-001', supplier: 'Global Components Ltd', date: '2023-06-10', amount: 125000, status: 'delivered', items: 42 },
    { id: 'PO-002', supplier: 'Tech Materials Inc', date: '2023-06-12', amount: 87500, status: 'shipped', items: 28 },
    { id: 'PO-003', supplier: 'Precision Parts Co', date: '2023-06-15', amount: 210000, status: 'processing', items: 65 },
    { id: 'PO-004', supplier: 'Industrial Solutions', date: '2023-06-18', amount: 95000, status: 'pending', items: 32 },
    { id: 'PO-005', supplier: 'Advanced Manufacturing', date: '2023-06-20', amount: 165000, status: 'delayed', items: 51 },
    { id: 'PO-006', supplier: 'Quality Components', date: '2023-06-22', amount: 78000, status: 'processing', items: 24 }
  ],
  
  // UI state
  ui: {
    sidebarOpen: true,
    currentPage: 'dashboard',
    notifications: 5,
    theme: 'dark'
  },
  
  // Loading states
  loading: {
    dashboard: false,
    orders: false,
    suppliers: false,
    procurement: false
  },
  
  // Error states
  errors: {
    dashboard: null,
    orders: null,
    suppliers: null,
    procurement: null
  }
};

// Action types
const ACTIONS = {
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  UPDATE_USER_PREFERENCES: 'UPDATE_USER_PREFERENCES',
  UPDATE_DASHBOARD_DATA: 'UPDATE_DASHBOARD_DATA',
  UPDATE_ORDERS: 'UPDATE_ORDERS',
  UPDATE_SUPPLIERS: 'UPDATE_SUPPLIERS',
  UPDATE_PROCUREMENT: 'UPDATE_PROCUREMENT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  UPDATE_THEME: 'UPDATE_THEME'
};

// Reducer function
const globalReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CURRENT_PAGE:
      return {
        ...state,
        ui: {
          ...state.ui,
          currentPage: action.payload
        }
      };
      
    case ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarOpen: !state.ui.sidebarOpen
        }
      };
      
    case ACTIONS.UPDATE_USER_PREFERENCES:
      return {
        ...state,
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...action.payload
          }
        }
      };
      
    case ACTIONS.UPDATE_DASHBOARD_DATA:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          ...action.payload
        }
      };
      
    case ACTIONS.UPDATE_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
      
    case ACTIONS.UPDATE_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload
      };
      
    case ACTIONS.UPDATE_PROCUREMENT:
      return {
        ...state,
        procurement: action.payload
      };
      
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.section]: action.payload.isLoading
        }
      };
      
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.section]: action.payload.error
        }
      };
      
    case ACTIONS.UPDATE_THEME:
      return {
        ...state,
        ui: {
          ...state.ui,
          theme: action.payload
        },
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            theme: action.payload
          }
        }
      };
      
    default:
      return state;
  }
};

// Create context
const GlobalStateContext = createContext();

// Provider component
export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  const { callApi } = useApi();
  
  // Action creators
  const setCurrentPage = (page) => {
    dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page });
  };
  
  const toggleSidebar = () => {
    dispatch({ type: ACTIONS.TOGGLE_SIDEBAR });
  };
  
  const updateUserPreferences = (preferences) => {
    dispatch({ type: ACTIONS.UPDATE_USER_PREFERENCES, payload: preferences });
  };
  
  const updateDashboardData = (data) => {
    dispatch({ type: ACTIONS.UPDATE_DASHBOARD_DATA, payload: data });
  };
  
  const updateOrders = (orders) => {
    dispatch({ type: ACTIONS.UPDATE_ORDERS, payload: orders });
  };
  
  const updateSuppliers = (suppliers) => {
    dispatch({ type: ACTIONS.UPDATE_SUPPLIERS, payload: suppliers });
  };
  
  const updateProcurement = (procurement) => {
    dispatch({ type: ACTIONS.UPDATE_PROCUREMENT, payload: procurement });
  };
  
  const setLoading = (section, isLoading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: { section, isLoading } });
  };
  
  const setError = (section, error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: { section, error } });
  };
  
  const updateTheme = (theme) => {
    dispatch({ type: ACTIONS.UPDATE_THEME, payload: theme });
  };
  
  // Fetch data with API hook
  const fetchData = useCallback(async (section) => {
    setLoading(section, true);
    setError(section, null);
    
    try {
      const data = await callApi(section);
      
      switch (section) {
        case 'dashboard':
          updateDashboardData(data);
          break;
        case 'orders':
          updateOrders(data);
          break;
        case 'suppliers':
          updateSuppliers(data);
          break;
        case 'procurement':
          updateProcurement(data);
          break;
        default:
          throw new Error(`Unknown section: ${section}`);
      }
      
      setLoading(section, false);
      return data;
    } catch (error) {
      setError(section, error.message);
      setLoading(section, false);
    }
  }, [callApi]);
  
  // Simulate real-time updates
  useEffect(() => {
    // In a real app, this would be a WebSocket connection or polling
    const interval = setInterval(() => {
      // Update dashboard data periodically
      fetchData('dashboard');
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [fetchData]);
  
  const value = {
    state,
    actions: {
      setCurrentPage,
      toggleSidebar,
      updateUserPreferences,
      updateDashboardData,
      updateOrders,
      updateSuppliers,
      updateProcurement,
      setLoading,
      setError,
      updateTheme,
      fetchData
    }
  };
  
  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};

export default GlobalStateContext;