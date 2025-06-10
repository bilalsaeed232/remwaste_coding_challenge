// Service for fetching and enriching skip data

import { SkipApiResponse, EnrichedSkip, ApiResponse } from '../types/skip';
import { MOCK_SKIP_DATA } from '../data/mockskips';

// Environment-based configuration
const IS_DEVELOPMENT = import.meta.env.DEV;

// API endpoint for production
const API_ENDPOINT = 'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=LE10&area=Hinckley';

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
    
    // Safety check: ensure data.skips exists and is an array
    if (!data || !Array.isArray(data.skips)) {
      console.warn('API response does not contain valid skips array:', data);
      return MOCK_SKIP_DATA; // Fallback to mock data
    }
    
    return data.skips;
  } catch (error) {
    console.error('Error fetching skips:', error);
    // Fallback to mock data instead of throwing error
    console.log('Falling back to mock data');
    return MOCK_SKIP_DATA;
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