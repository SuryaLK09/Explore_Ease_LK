import { Flight, Hotel } from '../types';

// Helper function to generate flight combinations
const generateFlights = (cities: string[]): Flight[] => {
  let id = 1;
  const flights: Flight[] = [];
  const airlines = ['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'Emirates', 'Singapore Airlines', 'Air Asia', 'Go First'];
  
  cities.forEach(fromCity => {
    cities.forEach(toCity => {
      if (fromCity !== toCity) {
        // Generate 2-3 flights for each route
        const numFlights = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < numFlights; i++) {
          const airline = airlines[Math.floor(Math.random() * airlines.length)];
          const basePrice = 3000 + Math.floor(Math.random() * 15000);
          flights.push({
            id: id++,
            airline,
            from: fromCity,
            to: toCity,
            departureTime: `${String(6 + Math.floor(Math.random() * 14)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
            arrivalTime: `${String(14 + Math.floor(Math.random() * 8)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
            price: basePrice,
          });
        }
      }
    });
  });
  return flights;
};

export const cities = [
  // Metro Cities
  'Mumbai (BOM)',
  'Delhi (DEL)',
  'Bangalore (BLR)',
  'Chennai (MAA)',
  'Kolkata (CCU)',
  'Hyderabad (HYD)',
  
  // Major Tourist Destinations
  'Goa (GOI)',
  'Jaipur (JAI)',
  'Kochi (COK)',
  'Thiruvananthapuram (TRV)',
  'Udaipur (UDR)',
  'Varanasi (VNS)',
  'Agra (AGR)',
  'Coimbatore (CJB)',
  
  // Business Hubs
  'Pune (PNQ)',
  'Ahmedabad (AMD)',
  'Lucknow (LKO)',
  'Chandigarh (IXC)',
  'Nagpur (NAG)',
  'Indore (IDR)',
  
  // Popular Tourist States
  'Srinagar (SXR)',
  'Leh (IXL)',
  'Port Blair (IXZ)',
  'Gangtok (GTO)',
  'Shimla (SLV)',
  
  // Emerging Cities
  'Bhubaneswar (BBI)',
  'Ranchi (IXR)',
  'Raipur (RPR)',
  'Guwahati (GAU)',
  'Bhopal (BHO)',
  'Dehradun (DED)',
  
  // Cultural Centers
  'Amritsar (ATQ)',
  'Madurai (IXM)',
  'Tirupati (TIR)',
  'Aurangabad (IXU)',
  'Khajuraho (HJR)'
];

// Rest of the file remains exactly the same
export const flightDatabase = generateFlights(cities);

const hotelImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
  'https://images.unsplash.com/photo-1455587734955-081b22074882',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'
];

// Generate hotels for each city
export const hotelDatabase: { [city: string]: Hotel[] } = {};

cities.forEach(city => {
  const cityName = city.split(' (')[0]; // Extract city name without airport code
  const numHotels = 3 + Math.floor(Math.random() * 3); // 3-5 hotels per city
  const hotels: Hotel[] = [];
  
  const hotelPrefixes = ['The', 'Hotel', 'Grand', 'Royal', 'Imperial', 'Taj', 'ITC', 'Oberoi', 'Leela', 'Marriott'];
  const hotelSuffixes = ['Palace', 'Resort', 'Suites', 'Inn', 'Plaza', 'Regency', 'Continental', 'Towers', 'Grand'];
  
  for (let i = 0; i < numHotels; i++) {
    const prefix = hotelPrefixes[Math.floor(Math.random() * hotelPrefixes.length)];
    const suffix = hotelSuffixes[Math.floor(Math.random() * hotelSuffixes.length)];
    const rating = 3 + Math.floor(Math.random() * 3); // 3-5 stars
    const basePrice = 5000 + Math.floor(Math.random() * 15000);
    
    hotels.push({
      id: Math.floor(Math.random() * 10000),
      name: `${prefix} ${cityName} ${suffix}`,
      location: `${['Central', 'Downtown', 'Business District', 'Airport Road', 'City Center'][Math.floor(Math.random() * 5)]}, ${cityName}`,
      rating,
      price: basePrice,
      image: `${hotelImages[Math.floor(Math.random() * hotelImages.length)]}?auto=format&fit=crop&q=80&w=1000`
    });
  }
  
  hotelDatabase[city] = hotels;
});