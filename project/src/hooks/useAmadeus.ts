import { useState } from 'react';
import { generateMockFlightData, generateMockHotelData } from '../services/mockData';
import type { Flight } from '../types/flight';
import type { Hotel } from '../types/hotel';

export function useAmadeus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchFlights = async (from: string, to: string, date: string): Promise<Flight[]> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const flights = generateMockFlightData(from, to, date);
      return flights;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch flight data';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const searchHotels = async (cityCode: string): Promise<Hotel[]> => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const hotels = generateMockHotelData(cityCode);
      if (!hotels.length) {
        throw new Error('No hotels found for this city');
      }
      return hotels;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch hotel data';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    searchFlights,
    searchHotels,
    loading,
    error
  };
}