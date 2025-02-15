// Helper function to deterministically generate occupied seats
export function isOccupied(seat: string): boolean {
  const hash = seat.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return hash % 3 === 0;
}