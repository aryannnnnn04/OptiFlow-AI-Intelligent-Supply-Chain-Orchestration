import React from 'react';
import {
  Truck, MapPin, Clock, DollarSign
} from 'lucide-react';
import StatCard from './StatCard';

const routes = [
  { id: 1, origin: 'Mumbai', destination: 'Delhi', status: 'on-time', efficiency: 92, eta: '18 hours' },
  { id: 2, origin: 'Chennai', destination: 'Bangalore', status: 'delayed', efficiency: 78, eta: '8 hours' },
  { id: 3, origin: 'Kolkata', destination: 'Patna', status: 'on-time', efficiency: 95, eta: '12 hours' },
  { id: 4, origin: 'Pune', destination: 'Ahmedabad', status: 'on-time', efficiency: 88, eta: '10 hours' }
];

const LogisticsPage = React.memo(() => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold">Logistics & Routes</h2>
      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg hover:shadow-lg">
        Optimize Routes
      </button>
    </div>

    {/* Route Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Active Routes"
        value="24"
        icon={Truck}
        color="text-blue-400"
      />
      <StatCard
        title="On-Time Deliveries"
        value="18"
        icon={MapPin}
        color="text-green-400"
      />
      <StatCard
        title="Delayed Shipments"
        value="6"
        icon={Clock}
        color="text-orange-400"
      />
      <StatCard
        title="Savings This Week"
        value="₹1.2L"
        icon={DollarSign}
        color="text-purple-400"
      />
    </div>

    {/* Active Routes */}
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold mb-4">Active Routes</h3>
      <div className="space-y-4">
        {routes.map((route) => (
          <div key={route.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                route.status === 'on-time' ? 'bg-green-500/20' : 'bg-yellow-500/20'
              }`}>
                <Truck className={`w-6 h-6 ${
                  route.status === 'on-time' ? 'text-green-400' : 'text-yellow-400'
                }`} />
              </div>
              <div>
                <div className="font-semibold mb-1">{route.origin} → {route.destination}</div>
                <div className="flex items-center space-x-4 text-sm text-slate-400">
                  <span>ETA: {route.eta}</span>
                  <span>Efficiency: {route.efficiency}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                route.status === 'on-time' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {route.status === 'on-time' ? 'On Time' : 'Delayed'}
              </span>
              <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm">
                Track
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Map Placeholder */}
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold mb-4">Route Map</h3>
      <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
          <p className="text-slate-400">Interactive route map with real-time tracking</p>
        </div>
      </div>
    </div>
  </div>
));

export default LogisticsPage;