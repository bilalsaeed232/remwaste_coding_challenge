// Booking modal component for cart checkout

import React, { useState } from 'react';
import { X, Calendar, User, Mail, Phone, MapPin, FileText, Loader2, CheckCircle, ShoppingCart } from 'lucide-react';
import { CustomerDetails, CartItem, CartSummary } from '../types/skip';

interface BookingModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  cartSummary: CartSummary;
  isSubmitting: boolean;
  bookingSuccess: boolean;
  bookingError: string | null;
  onClose: () => void;
  onSubmit: (cartItems: CartItem[], customerDetails: CustomerDetails, deliveryDate: string, notes?: string) => void;
}

/**
 * Modal component for booking multiple skips from cart
 * Includes form validation and submission handling
 */
export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  cartItems,
  cartSummary,
  isSubmitting,
  bookingSuccess,
  bookingError,
  onClose,
  onSubmit
}) => {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postcode: 'LE10'
  });
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Partial<CustomerDetails & { deliveryDate: string }>>({});

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerDetails & { deliveryDate: string }> = {};

    if (!customerDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!customerDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!customerDetails.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) newErrors.email = 'Email is invalid';
    if (!customerDetails.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!customerDetails.address.trim()) newErrors.address = 'Address is required';
    if (!customerDetails.postcode.trim()) newErrors.postcode = 'Postcode is required';
    if (!deliveryDate) newErrors.deliveryDate = 'Delivery date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && cartItems.length > 0) {
      onSubmit(cartItems, customerDetails, deliveryDate, notes);
    }
  };

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Complete Your Booking</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success State */}
        {bookingSuccess && (
          <div className="p-6 text-center">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Booking Confirmed!</h3>
            <p className="text-green-600 mb-4">
              Your skip booking has been successfully confirmed. You'll receive a confirmation email shortly.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-green-700">
                <strong>{cartSummary.totalItems}</strong> skip{cartSummary.totalItems !== 1 ? 's' : ''} booked for <strong>£{cartSummary.grandTotal.toFixed(2)}</strong>
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        )}

        {/* Form */}
        {!bookingSuccess && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Column - Order Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.skip.id} className="flex items-center gap-3 pb-3 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <img 
                      src={item.skip.image} 
                      alt={item.skip.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.skip.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-600">{item.skip.delivery_time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        £{(item.skip.total_price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Total Summary */}
                <div className="pt-3 border-t border-gray-300 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({cartSummary.totalItems} items):</span>
                    <span>£{cartSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>VAT:</span>
                    <span>£{cartSummary.totalVat.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total:</span>
                    <span>£{cartSummary.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Customer Details Form */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Details</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User size={16} className="inline mr-1" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={customerDetails.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User size={16} className="inline mr-1" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={customerDetails.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail size={16} className="inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Phone size={16} className="inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin size={16} className="inline mr-1" />
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    value={customerDetails.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter full delivery address"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode *
                    </label>
                    <input
                      type="text"
                      value={customerDetails.postcode}
                      onChange={(e) => handleInputChange('postcode', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.postcode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter postcode"
                    />
                    {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Calendar size={16} className="inline mr-1" />
                      Preferred Delivery Date *
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={minDate}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.deliveryDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.deliveryDate && <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FileText size={16} className="inline mr-1" />
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any special instructions or requirements..."
                  />
                </div>

                {/* Error Message */}
                {bookingError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">{bookingError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || cartItems.length === 0}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin\" size={20} />
                        Processing...
                      </>
                    ) : (
                      `Confirm Booking - £${cartSummary.grandTotal.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};