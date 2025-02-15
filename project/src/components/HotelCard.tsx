import React from 'react';
import { Star, MapPin } from 'lucide-react';

interface HotelCardProps {
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
  onSelect: () => void;
}

export default function HotelCard({
  name,
  location,
  rating,
  price,
  image,
  onSelect,
}: HotelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        
        <div className="flex items-center mb-3">
          <MapPin className="w-4 h-4 text-gray-500 mr-1" />
          <span className="text-sm text-gray-600">{location}</span>
        </div>
        
        <div className="flex items-center mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating} Stars)</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">₹{price.toLocaleString('en-IN')}</span>
            <span className="text-gray-600 text-sm">/night</span>
          </div>
          
          <button
            onClick={onSelect}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}