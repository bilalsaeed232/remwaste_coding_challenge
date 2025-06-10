// Type definitions for skip data structures

export interface SkipApiResponse {
  id: number;
  size: string;
  price_before_vat: number;
  vat: number;
  availability: boolean;
  delivery_time: string;
}

export interface EnrichedSkip extends SkipApiResponse {
  name: string;
  description: string;
  image: string;
  total_price: number;
}

export interface ApiResponse {
  skips: SkipApiResponse[];
}

// Cart item with quantity
export interface CartItem {
  skip: EnrichedSkip;
  quantity: number;
  addedAt: Date;
}

// Cart summary
export interface CartSummary {
  totalItems: number;
  subtotal: number;
  totalVat: number;
  grandTotal: number;
}

// Customer details for booking
export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
}

export interface BookingRequest {
  cartItems: CartItem[];
  customerDetails: CustomerDetails;
  deliveryDate: string;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  message: string;
}