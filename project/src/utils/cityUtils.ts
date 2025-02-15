interface CityInfo {
  code: string;
  name: string;
  description: string;
  tripAdvisorId: string;
}

const cityDatabase: Record<string, CityInfo> = {
  'BOM': {
    code: 'BOM',
    name: 'Mumbai',
    description: 'Experience the vibrant culture and bustling life of India\'s financial capital.',
    tripAdvisorId: '304554'
  },
  'DEL': {
    code: 'DEL',
    name: 'Delhi',
    description: 'Explore the perfect blend of history and modernity in India\'s capital city.',
    tripAdvisorId: '304551'
  },
  'BLR': {
    code: 'BLR',
    name: 'Bangalore',
    description: 'Visit India\'s Silicon Valley, known for its pleasant weather and tech innovation.',
    tripAdvisorId: '297628'
  },
  // Add more cities as needed
};

export const getCityInfo = (cityCode: string): CityInfo | null => {
  return cityDatabase[cityCode] || null;
};