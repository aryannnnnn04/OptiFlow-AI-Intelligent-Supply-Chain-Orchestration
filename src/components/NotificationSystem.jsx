import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useGlobalState } from '../contexts/GlobalStateContext';

const NotificationSystem = () => {
  const { state } = useGlobalState();
  const { notifications } = state.ui;
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [visible, setVisible] = useState(false);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'Order Delivered',
      message: 'Order #ORD-001 has been successfully delivered to the customer.',
      timestamp: '2 minutes ago',
      priority: 'low'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Inventory Low',
      message: 'Stock level for SKU-12345 is below minimum threshold.',
      timestamp: '15 minutes ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'critical',
      title: 'Supply Disruption',
      message: 'Supplier XYZ is experiencing delays. Alternative sourcing recommended.',
      timestamp: '1 hour ago',
      priority: 'high'
    },
    {
      id: 4,
      type: 'info',
      title: 'System Update',
      message: 'New features available in the analytics dashboard.',
      timestamp: '3 hours ago',
      priority: 'low'
    }
  ];

  useEffect(() => {
    if (notifications > 0) {
      setActiveNotifications(mockNotifications.slice(0, notifications));
      setVisible(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [notifications]);

  const removeNotification = (id) => {
    setActiveNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800';
      case 'critical':
        return 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800';
    }
  };

  if (!visible || activeNotifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 w-full max-w-sm">
      {activeNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg border shadow-lg transform transition-all duration-300 ${
            getBackgroundColor(notification.type)
          }`}
        >
          <div className="flex items-start space-x-3">
            {getIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {notification.title}
                </h4>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {notification.message}
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {notification.timestamp}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;