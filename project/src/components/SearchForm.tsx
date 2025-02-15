import React, { useState, useMemo } from 'react';
import { Calendar, MapPin, Plane, Users } from 'lucide-react';
import { SearchData } from '../types';
import { cities } from '../data';

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const filteredCities = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return cities.filter(city =>
      city.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ from, to, date, passengers });
  };

  const handleCitySelect = (city: string, type: 'from' | 'to') => {
    if (type === 'from') {
      setFrom(city);
      setShowFromSuggestions(false);
    } else {
      setTo(city);
      setShowToSuggestions(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2 relative">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 mr-2" />
            From
          </label>
          <input
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setSearchQuery(e.target.value);
              setShowFromSuggestions(true);
            }}
            onFocus={() => setShowFromSuggestions(true)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter city or airport"
            required
          />
          {showFromSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredCities.map((city) => (
                <div
                  key={city}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCitySelect(city, 'from')}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2 relative">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Plane className="w-4 h-4 mr-2" />
            To
          </label>
          <input
            type="text"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setSearchQuery(e.target.value);
              setShowToSuggestions(true);
            }}
            onFocus={() => setShowToSuggestions(true)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter city or airport"
            required
          />
          {showToSuggestions && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {filteredCities.map((city) => (
                <div
                  key={city}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCitySelect(city, 'to')}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Users className="w-4 h-4 mr-2" />
            Passengers
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Passenger' : 'Passengers'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        Search Flights
      </button>
    </form>
  );
}