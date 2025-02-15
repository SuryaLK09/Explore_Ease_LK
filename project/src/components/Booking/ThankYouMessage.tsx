import React from 'react';
import { PartyPopper, Stars } from 'lucide-react';

export function ThankYouMessage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12 px-4">
      <div className="flex justify-center space-x-4 mb-6 animate-bounce">
        <PartyPopper className="w-12 h-12 text-yellow-500" />
        <Stars className="w-12 h-12 text-blue-500" />
        <PartyPopper className="w-12 h-12 text-pink-500" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Thank You for Booking with Us!
      </h2>
      
      <p className="text-lg text-gray-600 mb-8">
        Your travel adventure awaits! We've sent the booking confirmation to your email.
      </p>
      
      <div className="flex justify-center space-x-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full animate-pulse"
            style={{
              backgroundColor: ['#FCD34D', '#60A5FA', '#F87171', '#34D399', '#A78BFA'][i],
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}