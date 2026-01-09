import { Users, Building2, Calendar, DollarSign, TrendingUp, CheckCircle, FileText, Settings } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const stats = [
    { icon: Users, label: 'Total Users', value: '2,547', change: '+12%', color: 'blue' },
    { icon: Building2, label: 'Active Venues', value: '184', change: '+8%', color: 'green' },
    { icon: Calendar, label: 'Total Bookings', value: '5,892', change: '+23%', color: 'purple' },
    { icon: DollarSign, label: 'Revenue', value: '$48.2k', change: '+18%', color: 'orange' },
  ];

  const quickActions = [
    { icon: CheckCircle, label: 'Venue Approvals', count: 12, color: 'blue' },
    { icon: Users, label: 'User Management', count: 47, color: 'green' },
    { icon: FileText, label: 'Reports', count: 5, color: 'purple' },
    { icon: Settings, label: 'System Settings', count: null, color: 'gray' },
  ];

  const recentActivity = [
    { type: 'venue', message: 'New venue "Elite Gym" pending approval', time: '5 min ago' },
    { type: 'user', message: '15 new users registered today', time: '1 hour ago' },
    { type: 'booking', message: '234 bookings completed this week', time: '2 hours ago' },
    { type: 'revenue', message: 'Monthly revenue target achieved', time: '1 day ago' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600',
      gray: 'bg-gray-50 text-gray-600',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 pt-12 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl mb-2">Admin Dashboard</h1>
              <p className="text-purple-50">Welcome back, Administrator</p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <TrendingUp size={14} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-xl text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all text-left group"
                >
                  <div className={`p-3 rounded-xl inline-flex mb-3 ${getColorClasses(action.color)}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {action.label}
                  </h3>
                  {action.count !== null && (
                    <p className="text-sm text-gray-600">
                      {action.count} pending
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className={`p-2 rounded-lg ${
                  activity.type === 'venue' ? 'bg-blue-50' :
                  activity.type === 'user' ? 'bg-green-50' :
                  activity.type === 'booking' ? 'bg-purple-50' :
                  'bg-orange-50'
                }`}>
                  {activity.type === 'venue' && <Building2 size={20} className="text-blue-600" />}
                  {activity.type === 'user' && <Users size={20} className="text-green-600" />}
                  {activity.type === 'booking' && <Calendar size={20} className="text-purple-600" />}
                  {activity.type === 'revenue' && <DollarSign size={20} className="text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{activity.message}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Pending Approvals */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg text-gray-900 mb-4">Pending Venue Approvals</h2>
            <div className="space-y-3">
              {[
                { name: 'Elite Gym & Fitness', location: 'Downtown', date: 'Jan 5' },
                { name: 'Splash Aquatic Center', location: 'Westside', date: 'Jan 4' },
                { name: 'Pro Tennis Academy', location: 'Eastside', date: 'Jan 3' },
              ].map((venue, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="text-gray-900 text-sm">{venue.name}</p>
                    <p className="text-xs text-gray-600">{venue.location} • {venue.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <CheckCircle size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Settings size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
              View All Approvals
            </button>
          </div>

          {/* User Statistics */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg text-gray-900 mb-4">User Statistics</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Players</span>
                  <span className="text-gray-900">1,847 (72%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Venue Owners</span>
                  <span className="text-gray-900">586 (23%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Admins</span>
                  <span className="text-gray-900">114 (5%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
