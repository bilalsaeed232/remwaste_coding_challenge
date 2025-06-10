// Service for fetching and enriching skip data

import { SkipApiResponse, EnrichedSkip, ApiResponse } from '../types/skip';

// Environment-based configuration
const IS_DEVELOPMENT = import.meta.env.DEV;

// API endpoint for production
const API_ENDPOINT = 'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=LE10&area=Hinckley';

// Mock data for development environment
const MOCK_SKIP_DATA: SkipApiResponse[] = [
  {
    id: 1,
    size: '2',
    price_before_vat: 120,
    vat: 24,
    availability: true,
    delivery_time: '2-3 days'
  },
  {
    id: 2,
    size: '4',
    price_before_vat: 180,
    vat: 36,
    availability: true,
    delivery_time: '1-2 days'
  },
  {
    id: 3,
    size: '6',
    price_before_vat: 240,
    vat: 48,
    availability: true,
    delivery_time: '2-3 days'
  },
  {
    id: 4,
    size: '8',
    price_before_vat: 300,
    vat: 60,
    availability: false,
    delivery_time: '3-4 days'
  },
  {
    id: 5,
    size: '12',
    price_before_vat: 420,
    vat: 84,
    availability: true,
    delivery_time: '1-2 days'
  },
  {
    id: 6,
    size: '16',
    price_before_vat: 520,
    vat: 104,
    availability: true,
    delivery_time: '2-3 days'
  },
  {
    id: 7,
    size: '20',
    price_before_vat: 650,
    vat: 130,
    availability: true,
    delivery_time: '3-4 days'
  },
  {
    id: 8,
    size: '40',
    price_before_vat: 1200,
    vat: 240,
    availability: true,
    delivery_time: '5-7 days'
  }
];

/**
 * Fetches skip data from API or returns mock data in development
 */
export const fetchSkips = async (): Promise<SkipApiResponse[]> => {
  if (IS_DEVELOPMENT) {
    // Simulate network delay in development
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_SKIP_DATA;
  }

  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      throw new Error(`Failed to fetch skips: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    return data.skips;
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error;
  }
};

/**
 * Maps skip size to appropriate image filename
 */
const getSkipImage = (size: string): string => {
  const sizeNum = parseInt(size);
  
  // Map sizes to available images
  if (sizeNum === 4) return '/4-yarder-skip.jpg';
  if (sizeNum === 16) return '/16-yarder-skip.jpg';
  if (sizeNum === 20) return '/20-yarder-skip.jpg';
  if (sizeNum === 40) return '/40-yarder-skip.jpg';
  
  // Default image for other sizes
  return '/default-skip.jpg';
};

/**
 * Enriches skip data with additional computed fields
 */
export const enrichSkip = (skip: SkipApiResponse): EnrichedSkip => {
  // Generate descriptive name
  const name = `${skip.size} Yard Skip`;
  
  // Generate description based on size
  const getDescription = (size: string): string => {
    const sizeNum = parseInt(size);
    if (sizeNum <= 2) return 'Perfect for small household clearouts and garden waste';
    if (sizeNum <= 4) return 'Ideal for medium renovations and garage clearouts';
    if (sizeNum <= 6) return 'Great for larger home projects and construction waste';
    if (sizeNum <= 8) return 'Suitable for major renovations and commercial projects';
    if (sizeNum <= 12) return 'Perfect for large home renovations and office clearouts';
    if (sizeNum <= 16) return 'Ideal for major construction projects and large-scale clearouts';
    if (sizeNum <= 20) return 'Great for commercial construction and industrial waste';
    return 'Perfect for large-scale commercial and industrial projects';
  };
  
  // Get appropriate image for this skip size
  const image = getSkipImage(skip.size);
  
  // Calculate total price
  const total_price = skip.price_before_vat + skip.vat;
  
  return {
    ...skip,
    name,
    description: getDescription(skip.size),
    image,
    total_price
  };
};

/**
 * Fetches and enriches all skip data
 */
export const getEnrichedSkips = async (): Promise<EnrichedSkip[]> => {
  const skips = await fetchSkips();
  return skips.map(enrichSkip);
};