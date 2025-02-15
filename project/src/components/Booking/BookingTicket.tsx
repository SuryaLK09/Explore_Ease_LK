import React from 'react';
import { Plane, Building2, User, Calendar, MapPin } from 'lucide-react';
import type { PassengerDetails } from './PassengerForm';

interface BookingTicketProps {
  flightDetails: {
    airline: string;
    from: string;
    to: string;
    date: string;
    departureTime: string;
    arrivalTime: string;
    seatNumber: string;
  };
  hotelDetails: {
    name: string;
    location: string;
    checkIn: string;
    nights: number;
  };
  passengerDetails: PassengerDetails;
}

export function BookingTicket({ flightDetails, hotelDetails, passengerDetails }: BookingTicketProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Flight Ticket */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Plane className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold">Flight Ticket</h2>
        </div>
        
        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Airline</p>
              <p className="font-semibold">{flightDetails.airline}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold">{flightDetails.date}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">From</p>
              <p className="font-semibold">{flightDetails.from}</p>
              <p className="text-sm font-medium">{flightDetails.departureTime}</p>
            </div>
            <Plane className="w-5 h-5 text-gray-400 transform rotate-90" />
            <div className="text-right">
              <p className="text-sm text-gray-600">To</p>
              <p className="font-semibold">{flightDetails.to}</p>
              <p className="text-sm font-medium">{flightDetails.arrivalTime}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Seat</p>
              <p className="font-semibold">{flightDetails.seatNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Passenger</p>
              <p className="font-semibold">{passengerDetails.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Booking */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <Building2 className="w-6 h-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold">Hotel Booking</h2>
        </div>
        
        <div className="border-t pt-4 space-y-4">
          <div>
            <p className="text-sm text-gray-600">Hotel</p>
            <p className="font-semibold">{hotelDetails.name}</p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Check-in</p>
              <p className="font-semibold">{hotelDetails.checkIn}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nights</p>
              <p className="font-semibold">{hotelDetails.nights}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-semibold">{hotelDetails.location}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600">Guest</p>
            <p className="font-semibold">{passengerDetails.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}