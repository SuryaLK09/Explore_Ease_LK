import React from 'react';
import { SeatButton } from './SeatButton';
import { isOccupied } from './utils';

interface SeatRowProps {
  row: string;
  columns: number;
  selectedSeat: string | null;
  onSeatSelect: (seat: string) => void;
  getSeatClassName: (row: string, seatNumber: number, isSelected: boolean) => string;
}

export function SeatRow({ row, columns, selectedSeat, onSeatSelect, getSeatClassName }: SeatRowProps) {
  return (
    <div className="flex items-center mb-2">
      <div className="w-10 text-center text-sm font-medium">{row}</div>
      {Array.from({ length: columns }, (_, i) => {
        const seatNumber = i + 1;
        const seatId = `${row}${seatNumber}`;
        const occupied = isOccupied(seatId);
        const isSelected = selectedSeat === seatId;
        
        return (
          <SeatButton
            key={seatId}
            seatId={seatId}
            occupied={occupied}
            isSelected={isSelected}
            className={getSeatClassName(row, seatNumber, isSelected)}
            onSelect={onSeatSelect}
          />
        );
      })}
    </div>
  );
}