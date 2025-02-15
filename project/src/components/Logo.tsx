import React from 'react';
import { Compass } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Compass className="w-8 h-8 text-blue-600 animate-pulse" />
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-blue-600">Explore Ease</span>
        <span className="text-xs text-gray-600 -mt-1">Travel with Confidence</span>
      </div>
    </div>
  );
}