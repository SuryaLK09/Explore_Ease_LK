export interface FlightOffer {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  destination: {
    iataCode: string;
  };
  departureDate: string;
}

export interface HotelOffer {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
}