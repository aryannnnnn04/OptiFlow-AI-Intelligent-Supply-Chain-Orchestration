import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Camera, Save, X } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@optiflow.ai',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    department: 'Supply Chain Management',
    role: 'Administrator',
    joinDate: 'Jan 15, 2023',
    lastLogin: 'Oct 3, 2025 10:30 AM'
  });

  const [editProfile, setEditProfile] = useState({...profile});

  const handleSave = () => {
    setProfile({...editProfile});
    setIsEditing(false);
    // In a real application, this would save to a backend
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditProfile({...profile});
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 min-h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Profile</h2>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg hover:shadow-lg flex items-center space-x-2"
          >
            <Edit3 className="w-5 h-5" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex space-x-3">
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-lg hover:shadow-lg flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save</span>
            </button>
            <button 
              onClick={handleCancel}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg flex items-center space-x-2"
            >
              <X className="w-5 h-5" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="relative">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-white" />
              </div>
              <button className="absolute bottom-4 right-1/2 translate-x-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {isEditing ? (
              <input
                type="text"
                value={editProfile.name}
                onChange={(e) => setEditProfile({...editProfile, name: e.target.value})}
                className="text-2xl font-bold text-center w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:border-cyan-400"
              />
            ) : (
              <h3 className="text-2xl font-bold text-center mb-2">{profile.name}</h3>
            )}
            
            <p className="text-center text-cyan-400 mb-6">{profile.role}</p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-slate-400 mr-3" />
                {isEditing ? (
                  <input
                    type="email"
                    value={editProfile.email}
                    onChange={(e) => setEditProfile({...editProfile, email: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 w-full focus:outline-none focus:border-cyan-400"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-slate-400 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.phone}
                    onChange={(e) => setEditProfile({...editProfile, phone: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 w-full focus:outline-none focus:border-cyan-400"
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
              
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-slate-400 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.location}
                    onChange={(e) => setEditProfile({...editProfile, location: e.target.value})}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 w-full focus:outline-none focus:border-cyan-400"
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Account Information */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400">Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.department}
                    onChange={(e) => setEditProfile({...editProfile, department: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-cyan-400"
                  />
                ) : (
                  <p className="font-medium">{profile.department}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm text-slate-400">Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editProfile.role}
                    onChange={(e) => setEditProfile({...editProfile, role: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-cyan-400"
                  />
                ) : (
                  <p className="font-medium">{profile.role}</p>
                )}
              </div>
              
              <div>
                <label className="text-sm text-slate-400">Join Date</label>
                <p className="font-medium">{profile.joinDate}</p>
              </div>
              
              <div>
                <label className="text-sm text-slate-400">Last Login</label>
                <p className="font-medium">{profile.lastLogin}</p>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Updated inventory levels for SKU-12345', time: '2 hours ago', icon: Package },
                { action: 'Generated monthly forecast report', time: '1 day ago', icon: TrendingUp },
                { action: 'Resolved disruption alert for Mumbai port', time: '2 days ago', icon: CheckCircle },
                { action: 'Optimized route for Delhi shipment', time: '3 days ago', icon: MapPin },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                  <activity.icon className="w-5 h-5 text-cyan-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold mb-4">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-400">Default Dashboard View</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-cyan-400">
                  <option>Compact</option>
                  <option>Expanded</option>
                  <option>Minimal</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-slate-400">Chart Theme</label>
                <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:border-cyan-400">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>Colorful</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;