import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Hero } from './components/Layout/Hero';
import { Footer } from './components/Layout/Footer';
import SearchForm from './components/SearchForm';
import { SearchResults } from './components/Search/SearchResults';
import { useAmadeus } from './hooks/useAmadeus';
import LoadingSpinner from './components/LoadingSpinner';
import { ChatBot } from './components/ChatBot/ChatBot';
import { BookingSteps } from './components/BookingSteps';
import { AirplaneCabin } from './components/SeatSelection/AirplaneCabin';
import { PassengerForm } from './components/Booking/PassengerForm';
import { PaymentForm } from './components/Payment/PaymentForm';
import { BookingTicket } from './components/Booking/BookingTicket';
import { ThankYouMessage } from './components/Booking/ThankYouMessage';
import type { Flight } from './types/flight';
import type { Hotel } from './types/hotel';
import type { PassengerDetails } from './types/passenger';

export default function App() {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails | null>(null);
  const [searchResults, setSearchResults] = useState<{
    flights: Flight[];
    hotels: Hotel[];
  }>({ flights: [], hotels: [] });
  const [totalAmount, setTotalAmount] = useState(0);

  const { searchFlights, searchHotels, loading, error } = useAmadeus();

  const handleSearch = async (searchData: any) => {
    setSearchPerformed(true);
    setSelectedFlight(null);
    setCurrentStep(0);

    try {
      const flights = await searchFlights(
        searchData.from,
        searchData.to,
        searchData.date
      );

      setSearchResults({
        flights: flights || [],
        hotels: []
      });
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setCurrentStep(1);
    setTotalAmount(flight.price);
  };

  const handleSeatSelect = (seat: string) => {
    setSelectedSeat(seat);
    const seatPrice = parseInt(seat.slice(1)) <= 5 ? 2000 : 0; // Business class for first 5 rows
    setTotalAmount(prev => prev + seatPrice);
  };

  const handleContinueToHotels = async () => {
    if (selectedFlight) {
      setCurrentStep(2);
      try {
        const hotels = await searchHotels(selectedFlight.destination.iataCode);
        setSearchResults(prev => ({
          ...prev,
          hotels: hotels || []
        }));
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    }
  };

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setTotalAmount(prev => prev + hotel.price);
    setCurrentStep(3);
  };

  const handlePassengerSubmit = (details: PassengerDetails) => {
    setPassengerDetails(details);
    setCurrentStep(4);
  };

  const handlePaymentComplete = () => {
    if (selectedFlight && selectedHotel && selectedSeat && passengerDetails) {
      setCurrentStep(5);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {!searchPerformed && <Hero />}

      <div className="container mx-auto px-4 -mt-16 relative z-10 mb-12">
        {!searchPerformed ? (
          <SearchForm onSearch={handleSearch} />
        ) : (
          <BookingSteps currentStep={currentStep} />
        )}
      </div>

      {loading && (
        <div className="flex justify-center my-8">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className="container mx-auto px-4 my-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 mb-12">
        {searchPerformed && currentStep === 0 && !loading && (
          <SearchResults
            flights={searchResults.flights}
            hotels={[]}
            selectedFlight={selectedFlight}
            onFlightSelect={handleFlightSelect}
            onHotelSelect={() => {}}
          />
        )}

        {currentStep === 1 && selectedFlight && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Select Your Seat</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <AirplaneCabin
                selectedSeat={selectedSeat}
                onSeatSelect={handleSeatSelect}
              />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleContinueToHotels}
                  disabled={!selectedSeat}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
                >
                  Continue to Hotels
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <SearchResults
            flights={[]}
            hotels={searchResults.hotels}
            selectedFlight={null}
            onFlightSelect={() => {}}
            onHotelSelect={handleHotelSelect}
          />
        )}

        {currentStep === 3 && (
          <PassengerForm onSubmit={handlePassengerSubmit} />
        )}

        {currentStep === 4 && (
          <PaymentForm
            amount={totalAmount}
            onPaymentComplete={handlePaymentComplete}
          />
        )}

        {currentStep === 5 && selectedFlight && selectedHotel && passengerDetails && (
          <>
            <BookingTicket
              flightDetails={{
                airline: selectedFlight.airline,
                from: selectedFlight.from,
                to: selectedFlight.to,
                date: selectedFlight.departureDate,
                departureTime: selectedFlight.departureTime,
                arrivalTime: selectedFlight.arrivalTime,
                seatNumber: selectedSeat || '',
              }}
              hotelDetails={{
                name: selectedHotel.name,
                location: selectedHotel.location,
                checkIn: selectedFlight.departureDate,
                nights: 1,
              }}
              passengerDetails={passengerDetails}
            />
            <ThankYouMessage />
          </>
        )}
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}