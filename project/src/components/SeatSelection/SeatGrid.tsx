import React from 'react';
import { SeatRow } from './SeatRow';
import { SEAT_CONFIG, SEAT_COLORS } from './constants';

interface SeatGridProps {
  selectedSeat: string | null;
  onSeatSelect: (seat: string) => void;
}

export function SeatGrid({ selectedSeat, onSeatSelect }: SeatGridProps) {
  const getSeatClassName = (row: string, seatNumber: number, isSelected: boolean) => {
    const baseClass = 'w-8 h-8 mx-1 rounded transition-all duration-200 ';
    const isBusinessClass = seatNumber <= SEAT_CONFIG.BUSINESS.maxRow;
    const colors = isBusinessClass ? SEAT_COLORS.BUSINESS : SEAT_COLORS.ECONOMY;
    
    if (isSelected) return baseClass + colors.selected;
    return baseClass + colors.base + ' ' + colors.hover;
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max">
        {/* Column numbers */}
        <div className="flex mb-4 pl-10">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i + 1} className="w-10 text-center text-sm text-gray-600">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Left side seats (A, B) */}
        <div className="mb-4">
          {['A', 'B'].map(row => (
            <SeatRow
              key={row}
              row={row}
              columns={20}
              selectedSeat={selectedSeat}
              onSeatSelect={onSeatSelect}
              getSeatClassName={getSeatClassName}
            />
          ))}
        </div>

        {/* Aisle gap */}
        <div className="h-8 mb-4" />

        {/* Right side seats (C, D) */}
        <div>
          {['C', 'D'].map(row => (
            <SeatRow
              key={row}
              row={row}
              columns={20}
              selectedSeat={selectedSeat}
              onSeatSelect={onSeatSelect}
              getSeatClassName={getSeatClassName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}