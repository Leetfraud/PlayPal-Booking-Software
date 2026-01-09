import { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Clock3, Menu, User } from 'lucide-react';

interface PlayerDashboardProps {
  onLogout: () => void;
}

interface Booking {
  id: number;
  venueName: string;
  sportType: string;
  date: string;
  time: string;
  location: string;
  status: 'confirmed' | 'cancelled' | 'pending' | 'completed';
  price: number;
}

export function PlayerDashboard({ onLogout }: PlayerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings: Booking[] = [
    {
      id: 1,
      venueName: 'Court Elite Basketball',
      sportType: 'Basketball',
      date: 'Jan 8, 2026',
      time: '3:00 PM - 4:00 PM',
      location: 'Downtown',
      status: 'confirmed',
      price: 50,
    },
    {
      id: 2,
      venueName: 'Ace Tennis Club',
      sportType: 'Tennis',
      date: 'Jan 10, 2026',
      time: '5:00 PM - 6:00 PM',
      location: 'Westside',
      status: 'confirmed',
      price: 40,
    },
    {
      id: 3,
      venueName: 'Green Valley Soccer',
      sportType: 'Soccer',
      date: 'Jan 12, 2026',
      time: '2:00 PM - 3:00 PM',
      location: 'Northside',
      status: 'pending',
      price: 65,
    },
  ];

  const pastBookings: Booking[] = [
    {
      id: 4,
      venueName: 'AquaPro Swimming',
      sportType: 'Swimming',
      date: 'Dec 28, 2025',
      time: '10:00 AM - 11:00 AM',
      location: 'Eastside',
      status: 'completed',
      price: 30,
    },
    {
      id: 5,
      venueName: 'Court Elite Basketball',
      sportType: 'Basketball',
      date: 'Dec 20, 2025',
      time: '4:00 PM - 5:00 PM',
      location: 'Downtown',
      status: 'completed',
      price: 50,
    },
    {
      id: 6,
      venueName: 'Ace Tennis Club',
      sportType: 'Tennis',
      date: 'Dec 15, 2025',
      time: '3:00 PM - 4:00 PM',
      location: 'Westside',
      status: 'cancelled',
      price: 40,
    },
  ];

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />;
      case 'pending':
        return <Clock3 size={16} className="text-yellow-600" />;
      case 'completed':
        return <CheckCircle size={16} className="text-blue-600" />;
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    const styles = {
      confirmed: 'bg-green-50 text-green-700 border-green-200',
      cancelled: 'bg-red-50 text-red-700 border-red-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      completed: 'bg-blue-50 text-blue-700 border-blue-200',
    };

    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${styles[status]}`}>
        {getStatusIcon(status)}
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const bookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 pt-12 pb-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <Menu size={24} />
            </button>
            <button onClick={onLogout} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
              <User size={24} />
            </button>
          </div>
          <h1 className="text-3xl mb-2">My Bookings</h1>
          <p className="text-blue-50">Manage your sports venue reservations</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-md mx-auto px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-300/50 p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'upcoming'
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'past'
                ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Past ({pastBookings.length})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-600">No {activeTab} bookings</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">{booking.venueName}</h3>
                  <p className="text-sm text-gray-600">{booking.sportType}</p>
                </div>
                {getStatusBadge(booking.status)}
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">{booking.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">{booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{booking.location}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xl text-blue-600">${booking.price}</span>
                {booking.status === 'confirmed' && activeTab === 'upcoming' && (
                  <button className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    Cancel Booking
                  </button>
                )}
                {booking.status === 'completed' && (
                  <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                    Book Again
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
