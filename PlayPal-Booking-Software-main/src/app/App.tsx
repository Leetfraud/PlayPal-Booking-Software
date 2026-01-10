import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { RoleSelectionScreen } from './components/RoleSelectionScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { HomeScreen } from './components/HomeScreen';
import { VenueDetailsScreen } from './components/VenueDetailsScreen';
import { AvailabilityCalendarScreen } from './components/AvailabilityCalendarScreen';
import { BookingConfirmationScreen } from './components/BookingConfirmationScreen';
import { PaymentScreen } from './components/PaymentScreen';
import { PlayerDashboard } from './components/PlayerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { apiRequest } from './api';

type Screen = 
  | 'splash' 
  | 'role' 
  | 'login' 
  | 'register' 
  | 'home' 
  | 'venueDetails' 
  | 'availability' 
  | 'confirmation' 
  | 'payment' 
  | 'playerDashboard'
  | 'adminDashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [userRole, setUserRole] = useState<'player' | 'owner' | 'admin' | null>(null);

  interface BookingState {
  venueId: number;
  venueName: string;
  slotId: number | null;
  bookingId: number | null; // This allows us to store the ID from the DB
  startTime: string;
  endTime: string;
  price: number;
}

const [selectedBooking, setSelectedBooking] = useState<BookingState>({
  venueId: 1,
  venueName: "Court Elite Basketball",
  slotId: null,
  bookingId: null, // Initialized as null
  startTime: "",
  endTime: "",
  price: 0
});

  // Auto-navigate from splash to role selection after 3 seconds
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('role');
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);



  const handleSelectRole = (role: 'player' | 'owner' | 'admin') => {
    console.log('Selected role:', role);
    setUserRole(role);
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    // Navigate based on role
    if (userRole === 'admin') {
      setCurrentScreen('adminDashboard');
    } else if (userRole === 'player') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleRegister = () => {
    // Navigate based on role
    if (userRole === 'admin') {
      setCurrentScreen('adminDashboard');
    } else if (userRole === 'player') {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link sent to your email');
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful! Your booking is confirmed.');
    setCurrentScreen('playerDashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('role');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'role':
        return <RoleSelectionScreen onSelectRole={handleSelectRole} />;
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
            onGoToRegister={() => setCurrentScreen('register')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegister={handleRegister}
            onGoToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'home':
        return <HomeScreen />;
      case 'venueDetails':
        return (
          <VenueDetailsScreen
            onBack={() => setCurrentScreen('home')}
            onViewAvailability={() => setCurrentScreen('availability')}
          />
        );
        
        case 'availability':
        return (
          <AvailabilityCalendarScreen
            onBack={() => setCurrentScreen('venueDetails')}
            onSelectSlot={async (slot) => {
              try {
                const response = await apiRequest("/bookings/hold", "POST", {
                  slot_id: slot.slot_id,
                  venue_id: slot.venue_id,
                  user_id: 1 
                });

                setSelectedBooking({
                  venueId: slot.venue_id,
                  venueName: "Court Elite Basketball",
                  slotId: slot.slot_id,
                  bookingId: response.booking_id, // Now stored correctly
                  startTime: new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  endTime: new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  price: slot.price
                });

                setCurrentScreen('confirmation');
              } catch (error: any) {
                alert(error.message || "Oops! That slot was just taken. Please pick another.");
              }
            }} 
          />
        );

     
      case 'confirmation':
        return (
          <BookingConfirmationScreen
            bookingData={selectedBooking} // PASS THE DATA HERE
            onBack={() => setCurrentScreen('availability')}
            onProceedToPayment={() => setCurrentScreen('payment')}
          />
        );
      case 'payment':
        return (
          <PaymentScreen
            onBack={() => setCurrentScreen('confirmation')}
            onConfirmPayment={handlePaymentSuccess}
          />
        );
      case 'playerDashboard':
        return <PlayerDashboard onLogout={handleLogout} />;
      case 'adminDashboard':
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="size-full">
      {renderScreen()}
      
      {/* Dev Navigation - Remove in production */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-3 py-2 flex gap-1 border border-gray-200 overflow-x-auto max-w-full">
        <button
          onClick={() => setCurrentScreen('splash')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'splash' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Splash
        </button>
        <button
          onClick={() => setCurrentScreen('role')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'role' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Role
        </button>
        <button
          onClick={() => setCurrentScreen('login')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'login' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setCurrentScreen('register')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'register' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Register
        </button>
        <button
          onClick={() => setCurrentScreen('home')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'home' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentScreen('venueDetails')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'venueDetails' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Venue
        </button>
        <button
          onClick={() => setCurrentScreen('availability')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'availability' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Calendar
        </button>
        <button
          onClick={() => setCurrentScreen('confirmation')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'confirmation' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Confirm
        </button>
        <button
          onClick={() => setCurrentScreen('payment')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'payment' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Payment
        </button>
        <button
          onClick={() => setCurrentScreen('playerDashboard')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'playerDashboard' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Player
        </button>
        <button
          onClick={() => setCurrentScreen('adminDashboard')}
          className={`px-2 py-1 rounded-full text-xs transition-colors whitespace-nowrap ${
            currentScreen === 'adminDashboard' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Admin
        </button>
      </div>
    </div>
  );
}