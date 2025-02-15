import React from 'react';

interface SeatButtonProps {
  seatId: string;
  occupied: boolean;
  isSelected: boolean;
  className: string;
  onSelect: (seat: string) => void;
}

export function SeatButton({ seatId, occupied, isSelected, className, onSelect }: SeatButtonProps) {
  return (
    <button
      disabled={occupied}
      onClick={() => !occupied && onSelect(seatId)}
      className={className}
      title={`Seat ${seatId}`}
    />
  );
}