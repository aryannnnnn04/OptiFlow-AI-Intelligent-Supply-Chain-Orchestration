import React, { useState } from 'react';
import { Save, Bell, Palette, Globe, Shield, User, Key, Database, Cloud, Moon, Sun } from 'lucide-react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    language: 'en',
    timezone: 'IST',
    emailAlerts: true,
    smsAlerts: false,
    autoRefresh: true,
    refreshInterval: 5,
    dataRetention: 30,
  });

  const handleSave = () => {
    // In a real application, this would save to a backend or localStorage
    alert('Settings saved successfully!');
  };

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Settings</h2>
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:shadow-lg flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            General
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm text-slate-400">Enable dark theme</div>
              </div>
              <button 
                onClick={() => toggleSetting('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.darkMode ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Language</div>
                <div className="text-sm text-slate-400">Interface language</div>
              </div>
              <select 
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Timezone</div>
                <div className="text-sm text-slate-400">System timezone</div>
              </div>
              <select 
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400"
              >
                <option value="IST">India Standard Time (IST)</option>
                <option value="UTC">Coordinated Universal Time (UTC)</option>
                <option value="EST">Eastern Standard Time (EST)</option>
                <option value="PST">Pacific Standard Time (PST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email Alerts</div>
                <div className="text-sm text-slate-400">Receive alerts via email</div>
              </div>
              <button 
                onClick={() => toggleSetting('emailAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.emailAlerts ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.emailAlerts ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SMS Alerts</div>
                <div className="text-sm text-slate-400">Receive alerts via SMS</div>
              </div>
              <button 
                onClick={() => toggleSetting('smsAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.smsAlerts ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.smsAlerts ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">In-App Notifications</div>
                <div className="text-sm text-slate-400">Show notifications in app</div>
              </div>
              <button 
                onClick={() => toggleSetting('notifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.notifications ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Performance */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Data & Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto Refresh</div>
                <div className="text-sm text-slate-400">Automatically refresh data</div>
              </div>
              <button 
                onClick={() => toggleSetting('autoRefresh')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.autoRefresh ? 'bg-blue-500' : 'bg-slate-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.autoRefresh ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Refresh Interval</div>
                <div className="text-sm text-slate-400">Minutes between refreshes</div>
              </div>
              <select 
                value={settings.refreshInterval}
                onChange={(e) => setSettings({...settings, refreshInterval: parseInt(e.target.value)})}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400"
              >
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Data Retention</div>
                <div className="text-sm text-slate-400">Days to keep historical data</div>
              </div>
              <select 
                value={settings.dataRetention}
                onChange={(e) => setSettings({...settings, dataRetention: parseInt(e.target.value)})}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400"
              >
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
                <option value="365">1 year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-slate-400">Add extra security to your account</div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition" />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Session Timeout</div>
                <div className="text-sm text-slate-400">Auto logout after inactivity</div>
              </div>
              <select className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400">
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>Never</option>
              </select>
            </div>
            
            <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-sm font-semibold transition-all">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;