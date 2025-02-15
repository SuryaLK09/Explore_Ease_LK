import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, Wallet } from 'lucide-react';
import { PaymentMethods } from './PaymentMethods';
import { PAYMENT_TYPES, PAYMENT_VALIDATION } from './constants';

interface PaymentFormProps {
  amount: number;
  onPaymentComplete: () => void;
}

export function PaymentForm({ amount, onPaymentComplete }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_TYPES.CARD);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      onPaymentComplete();
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }
    return numbers;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-gray-600">Total Amount</p>
        <p className="text-2xl font-bold text-blue-600">₹{amount.toLocaleString('en-IN')}</p>
      </div>

      <PaymentMethods
        selectedMethod={paymentMethod}
        onMethodSelect={setPaymentMethod}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {paymentMethod === PAYMENT_TYPES.CARD && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Card Number
                </div>
              </label>
              <input
                type="text"
                value={formatCardNumber(cardNumber)}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, PAYMENT_VALIDATION.CARD_NUMBER_LENGTH))}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Expiry Date
                  </div>
                </label>
                <input
                  type="text"
                  value={formatExpiry(expiry)}
                  onChange={(e) => setExpiry(e.target.value.replace(/\D/g, '').slice(0, PAYMENT_VALIDATION.EXPIRY_LENGTH))}
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    CVV
                  </div>
                </label>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, PAYMENT_VALIDATION.CVV_LENGTH))}
                  placeholder="123"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </>
        )}

        {paymentMethod === PAYMENT_TYPES.UPI && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <div className="flex items-center">
                <Wallet className="w-4 h-4 mr-2" />
                UPI ID
              </div>
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@upi"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium disabled:bg-blue-400"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}