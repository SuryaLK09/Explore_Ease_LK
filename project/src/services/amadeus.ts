import axios from 'axios';

const AMADEUS_API_URL = 'https://test.api.amadeus.com/v1';

interface AmadeusError {
  code: string;
  title: string;
  detail: string;
  status: number;
}

class AmadeusService {
  private token: string | null = null;
  private tokenExpiry: number = 0;

  private async getToken() {
    const now = Date.now();
    if (this.token && now < this.tokenExpiry) {
      return this.token;
    }

    try {
      const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'A86kuNJ6Lr7GKIHT3b88idL6Oem7Hlwi',
          client_secret: '1GulXy7TLSCntRvx'
        }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.token = response.data.access_token;
      this.tokenExpiry = now + (response.data.expires_in * 1000);
      return this.token;
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) 
        ? error.response?.data?.error_description || 'Authentication failed'
        : 'Authentication failed';
      throw new Error(errorMessage);
    }
  }

  private async makeRequest(endpoint: string, params: Record<string, string>) {
    try {
      const token = await this.getToken();
      const response = await axios.get(`${AMADEUS_API_URL}${endpoint}`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const amadeusError = error.response?.data?.errors?.[0] as AmadeusError | undefined;
        throw new Error(amadeusError?.detail || 'Failed to fetch data from Amadeus API');
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async searchFlights(originCode: string, destinationCode: string, departureDate: string) {
    return this.makeRequest('/shopping/flight-offers', {
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate,
      adults: '1',
      max: '10',
      currencyCode: 'INR'
    });
  }

  async searchHotels(cityCode: string) {
    return this.makeRequest('/reference-data/locations/hotels/by-city', {
      cityCode,
      radius: '50',
      radiusUnit: 'KM'
    });
  }
}

export const amadeusService = new AmadeusService();