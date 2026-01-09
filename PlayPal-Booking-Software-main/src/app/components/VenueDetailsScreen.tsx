import { useState } from 'react';
import { ChevronLeft, MapPin, Star, Wifi, Car, Coffee, Accessibility, Droplet, Wind, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { apiRequest } from "../api";


const handleAddVenue = async () => {
  try {
    const result = await apiRequest("/venues", "POST", {
      venue_name: "Court Elite Basketball",
      sport_type: "Basketball",
      location: "123 Downtown Ave, City Center",
      owner_id: 1   // demo owner
    });

    alert(result.message);
  } catch (error) {
    alert("Failed to add venue");
    console.error(error);
  }
};


interface VenueDetailsScreenProps {
  onBack: () => void;
  onViewAvailability: () => void;
}

export function VenueDetailsScreen({ onBack, onViewAvailability }: VenueDetailsScreenProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  const images = [
    'https://images.unsplash.com/photo-1693517235862-a1b8c3323efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzcG9ydHMlMjB2ZW51ZSUyMGJhc2tldGJhbGwlMjBjb3VydHxlbnwxfHx8fDE3NjcyODY3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1687216769793-833dcfe4e3af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjcyODcwODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1758778932827-52b7e4799fbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBmYWNpbGl0eSUyMGxvY2tlciUyMHJvb218ZW58MXx8fHwxNzY3Mjg3MDgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];


  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Car, label: 'Parking' },
    { icon: Coffee, label: 'Cafe' },
    { icon: Accessibility, label: 'Accessible' },
    { icon: Droplet, label: 'Showers' },
    { icon: Wind, label: 'AC' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative">
        <div className="h-80 bg-gray-200 relative overflow-hidden">
          <ImageWithFallback
            src={images[currentImageIndex]}
            alt="Venue"
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {currentImageIndex > 0 && (
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
          )}
          {currentImageIndex < images.length - 1 && (
            <button
              onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg"
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header Info */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">Court Elite Basketball</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span className="text-sm">123 Downtown Ave, City Center</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-2 rounded-xl">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-gray-900">4.8</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-4 border-t border-gray-100">
            <span className="text-3xl text-blue-600">$45</span>
            <span className="text-gray-600">per hour</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-100">
          <h2 className="text-lg text-gray-900 mb-3">About this venue</h2>
          <p className="text-gray-600 leading-relaxed">
            A premium indoor basketball court with professional-grade flooring and equipment. 
            Perfect for training sessions, casual games, or tournaments. The facility features 
            high ceilings, excellent lighting, and climate control for year-round comfort.
          </p>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-100">
          <h2 className="text-lg text-gray-900 mb-4">Amenities</h2>
          <div className="grid grid-cols-3 gap-4">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="flex flex-col items-center gap-2 text-center">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <Icon size={24} className="text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 border border-gray-100">
          <h2 className="text-lg text-gray-900 mb-3">Location</h2>
          <div className="h-40 bg-gray-200 rounded-xl overflow-hidden mb-3">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1499715669330-342f6728a943?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwbG90JTIwYWVyaWFsfGVufDF8fHx8MTc2NzE5MTgzOXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Location map"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-600 text-sm">
            123 Downtown Ave, City Center<br />
            Easily accessible via public transport
          </p>
        </div>

        {/* View Availability Button */}
      <button
  onClick={handleAddVenue}
  className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-2xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 text-lg sticky bottom-4"
>
  Add Venue (Demo)
</button>

      </div>
    </div>
  );
}
