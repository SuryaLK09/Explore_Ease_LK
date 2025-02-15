import React from 'react';
import { Clock, Plane } from 'lucide-react';

interface FlightCardProps {
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  onSelect: () => void;
}

export default function FlightCard({
  airline,
  from,
  to,
  departureTime,
  arrivalTime,
  price,
  onSelect,
}: FlightCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{airline}</h3>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span className="text-sm">Direct Flight</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{departureTime}</p>
              <p className="text-sm text-gray-600">{from}</p>
            </div>
            <div className="flex-1 mx-4 relative">
              <div className="border-t-2 border-gray-300 absolute w-full top-1/2 -translate-y-1/2"></div>
              <Plane className="w-5 h-5 text-blue-600 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-90" />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">{arrivalTime}</p>
              <p className="text-sm text-gray-600">{to}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">₹{price.toLocaleString('en-IN')}</div>
          <div className="text-sm text-gray-500">per person</div>
        </div>
        <button
          onClick={onSelect}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Select
        </button>
      </div>
    </div>
  );
}