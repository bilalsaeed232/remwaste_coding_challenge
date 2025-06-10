// Mock skip data for development and fallback scenarios

import { SkipApiResponse } from '../types/skip';

/**
 * Mock skip data used in development environment and as fallback
 * when the production API is unavailable
 */
export const MOCK_SKIP_DATA: SkipApiResponse[] = [
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