export interface SeatClass {
  rows: string[];
  price: number;
}

export interface SeatClasses {
  [key: string]: SeatClass;
}

export interface SeatGridProps {
  seatClasses: SeatClasses;
  selectedSeat: string | null;
  onSeatSelect: (seat: string) => void;
}