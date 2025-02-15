import type { Flight } from '../types/flight';
import type { Hotel } from '../types/hotel';
import { hotelDatabase } from '../data';

const airlines = ['IndiGo', 'Air India', 'Vistara', 'SpiceJet'];

export const generateMockFlightData = (from: string, to: string, date: string): Flight[] => {
  const basePrice = 3000 + Math.floor(Math.random() * 15000);
  const destinationCode = to.match(/\(([^)]+)\)/)?.[1] || '';
  
  return Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, index) => ({
    id: `${Date.now()}-${index}`,
    airline: airlines[Math.floor(Math.random() * airlines.length)],
    from,
    to,
    departureTime: `${String(6 + Math.floor(Math.random() * 14)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    arrivalTime: `${String(14 + Math.floor(Math.random() * 8)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    price: basePrice + (Math.floor(Math.random() * 2000) - 1000),
    destination: {
      iataCode: destinationCode
    },
    departureDate: date
  }));
};

export const generateMockHotelData = (cityCode: string): Hotel[] => {
  // Find the city in the database using the IATA code
  const cityKey = Object.keys(hotelDatabase).find(key => key.includes(`(${cityCode})`));
  
  if (!cityKey) {
    return [];
  }

  return hotelDatabase[cityKey].map(hotel => ({
    ...hotel,
    id: `${Date.now()}-${hotel.id}`
  }));
};