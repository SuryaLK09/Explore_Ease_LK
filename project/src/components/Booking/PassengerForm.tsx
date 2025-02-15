import React from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';

interface PassengerFormProps {
  onSubmit: (data: PassengerDetails) => void;
}

export interface PassengerDetails {
  name: string;
  email: string;
  phone: string;
  age: string;
}

export function PassengerForm({ onSubmit }: PassengerFormProps) {
  const [formData, setFormData] = React.useState<PassengerDetails>({
    name: '',
    email: '',
    phone: '',
    age: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Passenger Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <User className="w-4 h-4 mr-2" />
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Phone className="w-4 h-4 mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Calendar className="w-4 h-4 mr-2" />
            Age
          </label>
          <input
            type="number"
            required
            min="0"
            max="120"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
}