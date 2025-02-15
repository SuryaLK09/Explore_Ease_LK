export interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  price: number;
  image: string;
}

export interface SearchData {
  from: string;
  to: string;
  date: string;
  passengers: string;
}