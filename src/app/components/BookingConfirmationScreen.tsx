import { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Calendar, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookingConfirmationScreenProps {
  onBack: () => void;
  onProceedToPayment: () => void;
}

export function BookingConfirmationScreen({ onBack, onProceedToPayment }: BookingConfirmationScreenProps) {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <h1 className="text-xl text-gray-900">Confirm Booking</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Timer Alert */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-orange-600 mt-0.5" size={20} />
            <div className="flex-1">
              <h3 className="text-sm text-orange-900 mb-1">Slot Reserved</h3>
              <p className="text-xs text-orange-700 mb-2">
                Complete your booking within the time limit
              </p>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-orange-600" />
                <span className="text-xl text-orange-900 tabular-nums">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Card */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden border border-gray-100">
          <div className="h-48 bg-gray-200">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1693517235862-a1b8c3323efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBzcG9ydHMlMjB2ZW51ZSUyMGJhc2tldGJhbGwlMjBjb3VydHxlbnwxfHx8fDE3NjcyODY3MjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Court Elite Basketball"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h2 className="text-xl text-gray-900 mb-1">Court Elite Basketball</h2>
            <div className="flex items-center gap-1 text-gray-600 mb-4">
              <MapPin size={16} />
              <span className="text-sm">123 Downtown Ave, City Center</span>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                Basketball Court
              </span>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-lg text-gray-900 mb-4">Booking Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Date</p>
                <p className="text-gray-900">Wednesday, Jan 8, 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-50 p-3 rounded-xl">
                <Clock className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Time</p>
                <p className="text-gray-900">3:00 PM - 4:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-purple-50 p-3 rounded-xl">
                <DollarSign className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-600">Duration</p>
                <p className="text-gray-900">1 Hour</p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-24 border border-gray-100">
          <h2 className="text-lg text-gray-900 mb-4">Price Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Court rental (1 hour)</span>
              <span>$45.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Service fee</span>
              <span>$5.00</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-2xl text-blue-600">$50.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <button
            onClick={onProceedToPayment}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-2xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-200"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
