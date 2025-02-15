import React from 'react';
import { CreditCard, Wallet, Building2, QrCode } from 'lucide-react';

interface PaymentMethodsProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
}

const PAYMENT_METHODS = [
  { 
    id: 'card', 
    name: 'Credit/Debit Card', 
    icon: CreditCard,
    description: 'Pay securely with your credit or debit card'
  },
  { 
    id: 'upi', 
    name: 'UPI', 
    icon: QrCode,
    description: 'Pay instantly using UPI'
  },
  { 
    id: 'netbanking', 
    name: 'Net Banking', 
    icon: Building2,
    description: 'Pay through your bank account'
  },
  { 
    id: 'wallet', 
    name: 'Digital Wallet', 
    icon: Wallet,
    description: 'Pay using digital wallets'
  },
];

export function PaymentMethods({ selectedMethod, onMethodSelect }: PaymentMethodsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {PAYMENT_METHODS.map(({ id, name, icon: Icon, description }) => (
        <button
          key={id}
          onClick={() => onMethodSelect(id)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 ${
            selectedMethod === id
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <Icon className={`w-6 h-6 ${
              selectedMethod === id ? 'text-blue-600' : 'text-gray-600'
            }`} />
            <span className={`text-sm font-medium ${
              selectedMethod === id ? 'text-blue-600' : 'text-gray-700'
            }`}>
              {name}
            </span>
            <span className="text-xs text-gray-500 text-center">
              {description}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}