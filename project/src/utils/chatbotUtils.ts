import { cities, flightDatabase, hotelDatabase } from '../data';

interface FlightInfo {
  from: string;
  to: string;
  date?: string;
}

interface HotelInfo {
  city: string;
  checkIn?: string;
}

const extractFlightInfo = (message: string): FlightInfo | null => {
  const cityMatches = cities.filter(city => 
    message.toLowerCase().includes(city.toLowerCase().split(' (')[0])
  );

  if (cityMatches.length >= 2) {
    return {
      from: cityMatches[0],
      to: cityMatches[1]
    };
  }
  return null;
};

const extractHotelInfo = (message: string): HotelInfo | null => {
  const cityMatch = cities.find(city => 
    message.toLowerCase().includes(city.toLowerCase().split(' (')[0])
  );

  if (cityMatch) {
    return {
      city: cityMatch
    };
  }
  return null;
};

const getFlightRecommendations = (from: string, to: string) => {
  const flights = flightDatabase.filter(
    flight => flight.from === from && flight.to === to
  ).slice(0, 3);

  if (flights.length === 0) return null;

  const flightInfo = flights.map(flight => 
    `\n• ${flight.airline} - ₹${flight.price} (${flight.departureTime} - ${flight.arrivalTime})`
  ).join('');

  return `I found these flights from ${from.split(' (')[0]} to ${to.split(' (')[0]}:${flightInfo}`;
};

const getHotelRecommendations = (city: string) => {
  const hotels = hotelDatabase[city]?.slice(0, 3);

  if (!hotels) return null;

  const hotelInfo = hotels.map(hotel => 
    `\n• ${hotel.name} - ${hotel.rating}★ - ₹${hotel.price} per night`
  ).join('');

  return `Here are some recommended hotels in ${city.split(' (')[0]}:${hotelInfo}`;
};

export const processUserMessage = async (message: string): Promise<string> => {
  const lowerMessage = message.toLowerCase();

  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return "Hello! How can I help you with your travel plans today?";
  }

  // Help message
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return "I can help you find flights and hotels. You can ask me questions like:\n• Show me flights from Mumbai to Delhi\n• Find hotels in Bangalore\n• What are the best places to stay in Goa?";
  }

  // Flight search
  if (lowerMessage.includes('flight') || lowerMessage.includes('fly')) {
    const flightInfo = extractFlightInfo(message);
    if (flightInfo) {
      const recommendations = getFlightRecommendations(flightInfo.from, flightInfo.to);
      return recommendations || "I couldn't find any flights for that route. Please try different cities.";
    }
    return "Please specify both departure and destination cities. For example: 'Show me flights from Mumbai to Delhi'";
  }

  // Hotel search
  if (lowerMessage.includes('hotel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation')) {
    const hotelInfo = extractHotelInfo(message);
    if (hotelInfo) {
      const recommendations = getHotelRecommendations(hotelInfo.city);
      return recommendations || "I couldn't find any hotels in that city. Please try another city.";
    }
    return "Please specify the city where you're looking for hotels. For example: 'Find hotels in Mumbai'";
  }

  // Default response
  return "I'm not sure how to help with that. You can ask me about flights and hotels in specific cities.";
};