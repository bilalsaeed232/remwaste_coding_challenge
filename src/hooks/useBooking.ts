// Custom hook for managing booking state and functionality

import { useState } from 'react';
import { BookingRequest, BookingResponse, CustomerDetails, CartItem } from '../types/skip';

/**
 * Custom hook for handling skip booking functionality
 * Now handles multiple cart items instead of single skip
 */
export const useBooking = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
    setBookingSuccess(false);
    setBookingError(null);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingSuccess(false);
    setBookingError(null);
  };

  const submitBooking = async (
    cartItems: CartItem[], 
    customerDetails: CustomerDetails, 
    deliveryDate: string, 
    notes?: string
  ) => {
    if (cartItems.length === 0) return;

    setIsSubmitting(true);
    setBookingError(null);

    try {
      // Simulate API call - in production, this would call a real booking endpoint
      const bookingRequest: BookingRequest = {
        cartItems,
        customerDetails,
        deliveryDate,
        notes
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate success (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        const response: BookingResponse = {
          success: true,
          bookingId: `WW-${Date.now()}`,
          message: 'Your skip booking has been confirmed successfully!'
        };
        
        setBookingSuccess(true);
        console.log('Booking submitted:', bookingRequest);
        console.log('Booking response:', response);
      } else {
        throw new Error('Booking failed. Please try again.');
      }
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isBookingModalOpen,
    isSubmitting,
    bookingSuccess,
    bookingError,
    openBookingModal,
    closeBookingModal,
    submitBooking
  };
};