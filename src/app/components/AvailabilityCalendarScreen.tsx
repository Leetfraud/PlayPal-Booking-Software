import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface AvailabilityCalendarScreenProps {
  onBack: () => void;
  onSelectSlot: () => void;
}

type SlotStatus = 'available' | 'booked' | 'pending';

interface TimeSlot {
  time: string;
  status: SlotStatus;
}

export function AvailabilityCalendarScreen({ onBack, onSelectSlot }: AvailabilityCalendarScreenProps) {
  const [selectedDay, setSelectedDay] = useState(2); // Tuesday selected by default
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dates = ['Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12'];

  const timeSlots: TimeSlot[] = [
    { time: '08:00 AM', status: 'available' },
    { time: '09:00 AM', status: 'available' },
    { time: '10:00 AM', status: 'booked' },
    { time: '11:00 AM', status: 'pending' },
    { time: '12:00 PM', status: 'available' },
    { time: '01:00 PM', status: 'available' },
    { time: '02:00 PM', status: 'booked' },
    { time: '03:00 PM', status: 'available' },
    { time: '04:00 PM', status: 'available' },
    { time: '05:00 PM', status: 'pending' },
    { time: '06:00 PM', status: 'available' },
    { time: '07:00 PM', status: 'available' },
    { time: '08:00 PM', status: 'booked' },
    { time: '09:00 PM', status: 'available' },
  ];

  const getStatusColor = (status: SlotStatus) => {
    switch (status) {
      case 'available':
        return 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100';
      case 'booked':
        return 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700 cursor-not-allowed';
    }
  };

  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.status === 'available') {
      setSelectedSlot(slot.time);
    }
  };

  const handleConfirm = () => {
    if (selectedSlot) {
      onSelectSlot();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <h1 className="text-xl text-gray-900">Select Time Slot</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>

          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-600" />
              <span className="text-gray-900">January 2026</span>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`p-3 rounded-xl transition-all ${
                  selectedDay === index
                    ? 'bg-gradient-to-br from-blue-500 to-green-500 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xs mb-1">{day}</div>
                <div className="text-sm">{dates[index].split(' ')[1]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-lg text-gray-900 mb-2">Available Times</h2>
          <p className="text-sm text-gray-600">Selected: {dates[selectedDay]}, 2026</p>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span className="text-gray-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-gray-600">Pending</span>
          </div>
        </div>

        {/* Time Slot Grid */}
        <div className="grid grid-cols-2 gap-3 mb-24">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => handleSlotClick(slot)}
              disabled={slot.status !== 'available'}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedSlot === slot.time
                  ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                  : getStatusColor(slot.status)
              }`}
            >
              <div className="text-sm">{slot.time}</div>
              {slot.status === 'pending' && (
                <div className="text-xs mt-1 opacity-75">On Hold</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      {selectedSlot && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-md mx-auto">
            <div className="mb-3 text-center">
              <p className="text-sm text-gray-600">Selected Time</p>
              <p className="text-lg text-gray-900">{dates[selectedDay]}, {selectedSlot}</p>
            </div>
            <button
              onClick={handleConfirm}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-2xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-200"
            >
              Continue to Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
