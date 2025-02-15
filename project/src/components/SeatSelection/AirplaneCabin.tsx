import React from 'react';
import { Info } from 'lucide-react';
import { SeatGrid } from './SeatGrid';
import { SEAT_CONFIG } from './constants';

interface AirplaneCabinProps {
  selectedSeat: string | null;
  onSeatSelect: (seat: string) => void;
}

export function AirplaneCabin({ selectedSeat, onSeatSelect }: AirplaneCabinProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></span>
          <span>Business Class (+₹{SEAT_CONFIG.BUSINESS.price})</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></span>
          <span>Economy</span>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gray-100 rounded-full transform scale-x-[2.5] scale-y-[1.2] -z-10"></div>
        <div className="relative z-10 p-8">
          <SeatGrid
            selectedSeat={selectedSeat}
            onSeatSelect={onSeatSelect}
          />
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-600 mt-4">
        <Info className="w-4 h-4 mr-2" />
        <span>Selected seat: {selectedSeat || 'None'}</span>
      </div>
    </div>
  );
}