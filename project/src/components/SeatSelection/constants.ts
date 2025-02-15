export const SEAT_CONFIG = {
  BUSINESS: {
    rows: ['A', 'B', 'C', 'D'],
    maxRow: 5,
    price: 2000
  },
  ECONOMY: {
    rows: ['A', 'B', 'C', 'D'],
    startRow: 6,
    maxRow: 20,
    price: 0
  }
} as const;

export const SEAT_COLORS = {
  BUSINESS: {
    base: 'bg-blue-100 border border-blue-300',
    hover: 'hover:bg-blue-200',
    selected: 'bg-blue-600 text-white'
  },
  ECONOMY: {
    base: 'bg-gray-100 border border-gray-300',
    hover: 'hover:bg-gray-200',
    selected: 'bg-blue-600 text-white'
  }
} as const;