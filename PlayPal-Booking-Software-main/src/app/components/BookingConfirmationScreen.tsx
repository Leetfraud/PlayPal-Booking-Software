import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar, ChevronLeft } from 'lucide-react';
import { apiRequest } from '../api'; // This line is usually what's missing!


interface BookingConfirmationScreenProps {
  bookingData: {
    venueId: number;
    venueName: string;
    slotId: number | null;   // ✅ Matches App.tsx
    bookingId: number | null; // ✅ Now this component knows about the ID
    startTime: string;
    endTime: string;
    price: number;
  };
  onBack: () => void;
  onProceedToPayment: () => void;
}

export function BookingConfirmationScreen({ 
  onBack, 
  onProceedToPayment,
  bookingData 
}: BookingConfirmationScreenProps) {
  const [timeLeft, setTimeLeft] = useState(600); 
  const [isBooking, setIsBooking] = useState(false);

  // 1. Handle the actual booking/holding
  const handleConfirmBooking = async () => {
    setIsBooking(true);
    try {
      // Calling the NEW /hold endpoint we discussed
      const result = await apiRequest("/bookings/hold", "POST", {
        user_id: 1, // This should eventually come from your Auth/Login state
        venue_id: bookingData.venueId,
        slot_id: bookingData.slotId
      });

      alert(result.message);
      onProceedToPayment(); // Move to the payment screen
    } catch (error) {
      alert("This slot was just taken! Please select another.");
      onBack(); // Go back to selection if it fails
    } finally {
      setIsBooking(false);
    }
  };

  // 2. Timer Logic (Existing)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time expired! The slot has been released.");
          onBack(); // Send user back because the hold is gone
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onBack]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header & Timer Alert (Existing UI) */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
           {/* ... timer display ... */}
           <span className="text-xl text-orange-900 tabular-nums">
             {formatTime(timeLeft)}
           </span>
        </div>

        {/* Dynamic Venue Card */}
        <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-hidden border border-gray-100">
          <div className="p-5">
            <h2 className="text-xl text-gray-900 mb-1">{bookingData.venueName}</h2>
            {/* ... address and icons ... */}
          </div>
        </div>

        {/* Booking Details - Using Props instead of hardcoded text */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-lg text-gray-900 mb-4">Booking Details</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <Clock className="text-green-600" size={20} />
               <p className="text-gray-900">{bookingData.startTime} - {bookingData.endTime}</p>
            </div>
          </div>
        </div>

        {/* Price Summary - Using Props */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-24 border border-gray-100">
           <div className="flex justify-between">
              <span className="text-gray-900">Total Amount</span>
              <span className="text-2xl text-blue-600">${bookingData.price + 5}.00</span>
           </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleConfirmBooking}
            disabled={isBooking || timeLeft === 0}
            className={`w-full py-4 rounded-2xl text-white transition-all duration-200 ${
              isBooking ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-green-500 hover:shadow-lg'
            }`}
          >
            {isBooking ? 'Processing...' : 'Confirm & Pay'}
          </button>
        </div>
      </div>
    </div>
  );
}