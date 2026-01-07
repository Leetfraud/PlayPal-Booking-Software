import { useState } from 'react';
import { Search, MapPin, Calendar, Clock, DollarSign, ChevronDown, SlidersHorizontal, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Venue {
  id: number;
  name: string;
  sportType: string;
  price: number;
  rating: number;
  location: string;
  image: string;
  available: boolean;
}

const mockVenues: Venue[] = [
  {
    id: 1,
    name: 'Court Elite Basketball',
    sportType: 'Basketball',
    price: 45,
    rating: 4.8,
    location: 'Downtown',
    image: 'https://images.unsplash.com/photo-1693517235862-a1b8c3323efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzcG9ydHMlMjB2ZW51ZSUyMGJhc2tldGJhbGwlMjBjb3VydHxlbnwxfHx8fDE3NjcyODY3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: 2,
    name: 'Ace Tennis Club',
    sportType: 'Tennis',
    price: 35,
    rating: 4.6,
    location: 'Westside',
    image: 'https://images.unsplash.com/photo-1764439063840-a03b75a477f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBjb3VydCUyMGZhY2lsaXR5fGVufDF8fHx8MTc2NzI1ODQ3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: 3,
    name: 'Green Valley Soccer',
    sportType: 'Soccer',
    price: 60,
    rating: 4.9,
    location: 'Northside',
    image: 'https://images.unsplash.com/photo-1699519638135-a6734c58b361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmaWVsZCUyMG91dGRvb3J8ZW58MXx8fHwxNzY3Mjg2NzI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: false,
  },
  {
    id: 4,
    name: 'AquaPro Swimming',
    sportType: 'Swimming',
    price: 25,
    rating: 4.7,
    location: 'Eastside',
    image: 'https://images.unsplash.com/photo-1758426637893-2854f23fe846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjBmYWNpbGl0eXxlbnwxfHx8fDE3NjcyODY3MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
];

export function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSport, setSelectedSport] = useState('All Sports');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 pt-12 pb-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl mb-2">Find Your Venue</h1>
          <p className="text-blue-50">Discover and book amazing sports facilities</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-300/50 p-4">
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sport type or venue..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-700"
            >
              <SlidersHorizontal size={16} />
              <span className="text-sm">Filters</span>
            </button>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-100 rounded-xl text-sm text-gray-700 outline-none border-none appearance-none cursor-pointer"
            >
              <option>All Sports</option>
              <option>Basketball</option>
              <option>Tennis</option>
              <option>Soccer</option>
              <option>Swimming</option>
            </select>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  <MapPin size={14} className="inline mr-1" />
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 outline-none"
                >
                  <option>All Locations</option>
                  <option>Downtown</option>
                  <option>Westside</option>
                  <option>Northside</option>
                  <option>Eastside</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    <Calendar size={14} className="inline mr-1" />
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    <Clock size={14} className="inline mr-1" />
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  <DollarSign size={14} className="inline mr-1" />
                  Price Range
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600">$0-$100</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Venue Cards */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl text-gray-900">Available Venues</h2>
          <span className="text-sm text-gray-600">{mockVenues.length} results</span>
        </div>

        {mockVenues.map((venue) => (
          <div
            key={venue.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100"
          >
            {/* Venue Image */}
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              {!venue.available && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
                    Unavailable
                  </span>
                </div>
              )}
              {venue.available && (
                <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Available
                </div>
              )}
            </div>

            {/* Venue Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg text-gray-900 mb-1">{venue.name}</h3>
                  <p className="text-sm text-gray-600">{venue.sportType}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-900">{venue.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{venue.location}</span>
                </div>
                <div className="text-right">
                  <div className="text-xl text-blue-600">${venue.price}</div>
                  <div className="text-xs text-gray-500">per hour</div>
                </div>
              </div>

              {venue.available && (
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-200">
                  Book Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
