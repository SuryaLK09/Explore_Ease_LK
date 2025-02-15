import React from 'react';

interface SeatMapProps {
  selectedSeat: string | null;
  onSeatSelect: (seat: string) => void;
}

export function SeatMap({ selectedSeat, onSeatSelect }: SeatMapProps) {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const columns = Array.from({ length: 30 }, (_, i) => i + 1);
  
  const isOccupied = (seat: string) => {
    // Simulate some random occupied seats
    return Math.random() < 0.3;
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max p-4">
        {/* Seat labels */}
        <div className="flex mb-2">
          <div className="w-10" />
          {columns.map(col => (
            <div key={col} className="w-10 text-center text-sm text-gray-600">
              {col}
            </div>
          ))}
        </div>

        {/* Seat grid */}
        {rows.map(row => (
          <div key={row} className="flex mb-2">
            <div className="w-10 flex items-center justify-center text-sm font-medium">
              {row}
            </div>
            {columns.map(col => {
              const seatId = `${row}${col}`;
              const occupied = isOccupied(seatId);
              return (
                <button
                  key={seatId}
                  disabled={occupied}
                  onClick={() => !occupied && onSeatSelect(seatId)}
                  className={`w-8 h-8 mx-1 rounded ${
                    selectedSeat === seatId
                      ? 'bg-blue-600 text-white'
                      : occupied
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-white border border-gray-300 hover:border-blue-500'
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}