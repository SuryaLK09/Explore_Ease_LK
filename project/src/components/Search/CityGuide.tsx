import React from 'react';
import { ExternalLink } from 'lucide-react';
import { getCityInfo } from '../../utils/cityUtils';

interface CityGuideProps {
  cityCode: string;
}

export function CityGuide({ cityCode }: CityGuideProps) {
  const cityInfo = getCityInfo(cityCode);
  
  if (!cityInfo) return null;

  return (
    <div className="mt-6 bg-blue-50 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-800 mb-3">
        Traveling to {cityInfo.name}?
      </h3>
      <p className="text-gray-700 mb-4">{cityInfo.description}</p>
      <div className="space-y-2">
        <a
          href={`https://www.makemytrip.com/flights/${cityInfo.code.toLowerCase()}-flights.html`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ExternalLink size={16} className="mr-2" />
          Check more flights to {cityInfo.name}
        </a>
        <a
          href={`https://www.tripadvisor.com/Tourism-g${cityInfo.tripAdvisorId}-${cityInfo.name.replace(/\s+/g, '_')}-Vacations.html`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ExternalLink size={16} className="mr-2" />
          View {cityInfo.name} travel guide
        </a>
      </div>
    </div>
  );
}