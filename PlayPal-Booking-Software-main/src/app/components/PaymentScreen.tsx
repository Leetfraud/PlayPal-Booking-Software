import { useState } from 'react';
import { ChevronLeft, CreditCard, Smartphone, Wallet, Building, Check } from 'lucide-react';

interface PaymentScreenProps {
  onBack: () => void;
  onConfirmPayment: () => void;
}

type PaymentMethod = 'card' | 'mobile' | 'wallet' | 'bank';

export function PaymentScreen({ onBack, onConfirmPayment }: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const paymentMethods = [
    { id: 'card' as PaymentMethod, icon: CreditCard, label: 'Credit/Debit Card' },
    { id: 'mobile' as PaymentMethod, icon: Smartphone, label: 'Mobile Payment' },
    { id: 'wallet' as PaymentMethod, icon: Wallet, label: 'Digital Wallet' },
    { id: 'bank' as PaymentMethod, icon: Building, label: 'Bank Transfer' },
  ];

  const handleConfirm = () => {
    onConfirmPayment();
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
            <h1 className="text-xl text-gray-900">Payment</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Booking Summary */}
        <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <h2 className="text-sm opacity-90 mb-2">Booking Summary</h2>
          <h3 className="text-xl mb-4">Court Elite Basketball</h3>
          <div className="flex justify-between items-center text-sm opacity-90 mb-1">
            <span>Wednesday, Jan 8, 2026</span>
            <span>3:00 PM - 4:00 PM</span>
          </div>
          <div className="border-t border-white/20 mt-4 pt-4 flex justify-between items-center">
            <span className="text-lg">Total Amount</span>
            <span className="text-3xl">$50.00</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <h2 className="text-lg text-gray-900 mb-4">Payment Method</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <Icon
                    size={24}
                    className={`mb-2 mx-auto ${
                      selectedMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  />
                  <p
                    className={`text-xs text-center ${
                      selectedMethod === method.id ? 'text-blue-700' : 'text-gray-600'
                    }`}
                  >
                    {method.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Card Details Form */}
        {selectedMethod === 'card' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
            <h2 className="text-lg text-gray-900 mb-4">Card Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Payment Methods Info */}
        {selectedMethod === 'mobile' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
            <h2 className="text-lg text-gray-900 mb-3">Mobile Payment</h2>
            <p className="text-gray-600 text-sm mb-4">
              You will be redirected to your mobile payment app to complete the transaction.
            </p>
            <div className="flex gap-3">
              <div className="flex-1 p-3 border border-gray-200 rounded-xl text-center">
                <p className="text-sm text-gray-900">Apple Pay</p>
              </div>
              <div className="flex-1 p-3 border border-gray-200 rounded-xl text-center">
                <p className="text-sm text-gray-900">Google Pay</p>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'wallet' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
            <h2 className="text-lg text-gray-900 mb-3">Digital Wallet</h2>
            <p className="text-gray-600 text-sm mb-4">
              Connect your digital wallet to complete the payment.
            </p>
            <div className="space-y-2">
              <div className="p-3 border border-gray-200 rounded-xl flex items-center justify-between">
                <span className="text-sm text-gray-900">PayPal</span>
                <button className="text-blue-600 text-sm">Connect</button>
              </div>
              <div className="p-3 border border-gray-200 rounded-xl flex items-center justify-between">
                <span className="text-sm text-gray-900">Venmo</span>
                <button className="text-blue-600 text-sm">Connect</button>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === 'bank' && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-24 border border-gray-100">
            <h2 className="text-lg text-gray-900 mb-3">Bank Transfer</h2>
            <p className="text-gray-600 text-sm mb-4">
              Transfer details will be sent to your email. Your booking will be confirmed once we receive the payment.
            </p>
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-xs text-blue-900 mb-1">Bank Account</p>
              <p className="text-sm text-blue-700">PlayPal Sports Inc.</p>
              <p className="text-xs text-blue-600 mt-2">Account: 1234567890</p>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-2xl hover:shadow-lg hover:shadow-blue-200 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Check size={20} />
            <span>Confirm Payment - $50.00</span>
          </button>
        </div>
      </div>
    </div>
  );
}
