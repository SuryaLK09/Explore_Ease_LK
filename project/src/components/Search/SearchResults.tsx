import React from 'react';
import { Plane, Building2 } from 'lucide-react';
import FlightCard from '../FlightCard';
import HotelCard from '../HotelCard';
import { CityGuide } from './CityGuide';
import type { Flight } from '../../types/flight';
import type { Hotel } from '../../types/hotel';

interface SearchResultsProps {
  flights: Flight[];
  hotels: Hotel[];
  selectedFlight: Flight | null;
  onFlightSelect: (flight: Flight) => void;
  onHotelSelect: (hotel: Hotel) => void;
}

export function SearchResults({
  flights,
  hotels,
  selectedFlight,
  onFlightSelect,
  onHotelSelect
}: SearchResultsProps) {
  const showHotels = hotels.length > 0;
  const showFlights = flights.length > 0;

  if (!showFlights && !showHotels) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-md">
        <p className="text-gray-600">No results found. Please try different search criteria.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 space-y-8 mb-12">
      {showFlights && (
        <section>
          <div className="flex items-center mb-6">
            <Plane className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Available Flights</h2>
          </div>
          <div className="grid gap-6">
            {flights.map((flight) => (
              <FlightCard
                key={flight.id}
                {...flight}
                onSelect={() => onFlightSelect(flight)}
              />
            ))}
          </div>
          {flights[0] && (
            <CityGuide cityCode={flights[0].destination.iataCode} />
          )}
        </section>
      )}

      {showHotels && (
        <section>
          <div className="flex items-center mb-6">
            <Building2 className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Recommended Hotels
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                {...hotel}
                onSelect={() => onHotelSelect(hotel)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}