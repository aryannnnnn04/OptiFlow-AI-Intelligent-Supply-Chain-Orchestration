import { useState, useEffect, useCallback } from 'react';

// Mock API service
const mockApiService = {
  // Simulate API delay
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Mock dashboard data
  getDashboardData: async () => {
    await mockApiService.delay(800);
    return {
      kpis: {
        forecastAccuracy: 94.7 + (Math.random() - 0.5) * 0.5,
        costSavings: 2400000 + Math.floor(Math.random() * 50000),
        disruptionsPrevented: 47 + Math.floor(Math.random() * 3),
        inventoryTurnover: 8.2 + (Math.random() - 0.5) * 0.2,
        avgDeliveryTime: 3.2 + (Math.random() - 0.5) * 0.1,
        stockoutRate: 2.1 + (Math.random() - 0.5) * 0.1
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
    };
  },
  
  // Mock orders data
  getOrders: async () => {
    await mockApiService.delay(600);
    return [
      { id: 'ORD-001', customer: 'ABC Corp', date: '2023-06-15', amount: 125000, status: 'delivered', items: 42, eta: '2023-06-18', priority: 'high' },
      { id: 'ORD-002', customer: 'XYZ Ltd', date: '2023-06-16', amount: 87500, status: 'shipped', items: 28, eta: '2023-06-20', priority: 'medium' },
      { id: 'ORD-003', customer: 'Tech Solutions', date: '2023-06-16', amount: 210000, status: 'processing', items: 65, eta: '2023-06-22', priority: 'high' },
      { id: 'ORD-004', customer: 'Global Enterprises', date: '2023-06-17', amount: 95000, status: 'pending', items: 32, eta: '2023-06-24', priority: 'low' },
      { id: 'ORD-005', customer: 'Innovative Systems', date: '2023-06-17', amount: 165000, status: 'delayed', items: 51, eta: '2023-06-25', priority: 'high' },
      { id: 'ORD-006', customer: 'Future Tech', date: '2023-06-18', amount: 78000, status: 'processing', items: 28, eta: '2023-06-26', priority: 'medium' },
      { id: 'ORD-007', customer: 'Digital Dynamics', date: '2023-06-18', amount: 142000, status: 'shipped', items: 38, eta: '2023-06-27', priority: 'high' },
      { id: 'ORD-008', customer: 'Quantum Innovations', date: '2023-06-19', amount: 98000, status: 'pending', items: 29, eta: '2023-06-28', priority: 'medium' }
    ];
  },
  
  // Mock suppliers data
  getSuppliers: async () => {
    await mockApiService.delay(700);
    return [
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
    ];
  },
  
  // Mock procurement data
  getProcurement: async () => {
    await mockApiService.delay(650);
    return [
      { id: 'PO-001', supplier: 'Global Components Ltd', date: '2023-06-10', amount: 125000, status: 'delivered', items: 42 },
      { id: 'PO-002', supplier: 'Tech Materials Inc', date: '2023-06-12', amount: 87500, status: 'shipped', items: 28 },
      { id: 'PO-003', supplier: 'Precision Parts Co', date: '2023-06-15', amount: 210000, status: 'processing', items: 65 },
      { id: 'PO-004', supplier: 'Industrial Solutions', date: '2023-06-18', amount: 95000, status: 'pending', items: 32 },
      { id: 'PO-005', supplier: 'Advanced Manufacturing', date: '2023-06-20', amount: 165000, status: 'delayed', items: 51 },
      { id: 'PO-006', supplier: 'Quality Components', date: '2023-06-22', amount: 78000, status: 'processing', items: 24 }
    ];
  }
};

// Custom hook for API calls
export const useApi = () => {
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const callApi = useCallback(async (endpoint, setDataCallback) => {
    setLoading(prev => ({ ...prev, [endpoint]: true }));
    setError(prev => ({ ...prev, [endpoint]: null }));

    try {
      let data;
      
      switch (endpoint) {
        case 'dashboard':
          data = await mockApiService.getDashboardData();
          break;
        case 'orders':
          data = await mockApiService.getOrders();
          break;
        case 'suppliers':
          data = await mockApiService.getSuppliers();
          break;
        case 'procurement':
          data = await mockApiService.getProcurement();
          break;
        default:
          throw new Error(`Unknown endpoint: ${endpoint}`);
      }
      
      if (setDataCallback && typeof setDataCallback === 'function') {
        setDataCallback(data);
      }
      
      setLoading(prev => ({ ...prev, [endpoint]: false }));
      return data;
    } catch (err) {
      setError(prev => ({ ...prev, [endpoint]: err.message }));
      setLoading(prev => ({ ...prev, [endpoint]: false }));
      throw err;
    }
  }, []);

  return {
    loading,
    error,
    callApi
  };
};

export default useApi;