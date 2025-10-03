import React from 'react';
import {
  AlertTriangle, CheckCircle
} from 'lucide-react';
import StatCard from './StatCard';

const alerts = [
  { id: 1, type: 'critical', message: 'Monsoon delays expected in Mumbai port', time: '2 hours ago', icon: AlertTriangle },
  { id: 2, type: 'warning', message: 'Supplier XYZ delivery delayed by 2 days', time: '4 hours ago', icon: AlertTriangle },
  { id: 3, type: 'info', message: 'Inventory reorder point reached for SKU-12345', time: '6 hours ago', icon: AlertTriangle },
  { id: 4, type: 'success', message: 'Route optimization saved ₹45,000 this week', time: '1 day ago', icon: CheckCircle },
  { id: 5, type: 'warning', message: 'Festival demand spike predicted in 7 days', time: '1 day ago', icon: AlertTriangle }
];

const DisruptionsPage = React.memo(() => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold">Disruption Intelligence</h2>
      <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg hover:shadow-lg">
        Configure Alerts
      </button>
    </div>

    {/* Active Alerts */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Critical Alerts"
        value="3"
        icon={AlertTriangle}
        color="text-red-400"
      />
      <StatCard
        title="Warning Alerts"
        value="12"
        icon={AlertTriangle}
        color="text-yellow-400"
      />
      <StatCard
        title="Resolved (30 days)"
        value="47"
        icon={CheckCircle}
        color="text-blue-400"
      />
    </div>

    {/* All Alerts */}
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold mb-4">Active Disruptions</h3>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`flex items-start space-x-4 p-4 rounded-xl border ${
            alert.type === 'critical' ? 'bg-red-500/10 border-red-400/30' :
            alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-400/30' :
            alert.type === 'success' ? 'bg-green-500/10 border-green-400/30' :
            'bg-blue-500/10 border-blue-400/30'
          }`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              alert.type === 'critical' ? 'bg-red-500/20' :
              alert.type === 'warning' ? 'bg-yellow-500/20' :
              alert.type === 'success' ? 'bg-green-500/20' : 'bg-blue-500/20'
            }`}>
              <alert.icon className={`w-5 h-5 ${
                alert.type === 'critical' ? 'text-red-400' :
                alert.type === 'warning' ? 'text-yellow-400' :
                alert.type === 'success' ? 'text-green-400' : 'text-blue-400'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold">{alert.message}</h4>
                <span className="text-xs text-slate-400">{alert.time}</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                AI Recommendation: {alert.type === 'critical' ? 'Activate backup suppliers and reroute shipments via Chennai port.' : 'Monitor situation and prepare contingency plan.'}
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs">View Details</button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs">Take Action</button>
                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs">Dismiss</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
));

export default DisruptionsPage;