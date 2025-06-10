// Individual skip card component

import React from 'react';
import { Package, Clock, CheckCircle, XCircle, Plus, Check } from 'lucide-react';
import { EnrichedSkip } from '../types/skip';

interface SkipCardProps {
  skip: EnrichedSkip;
  isInCart: boolean;
  cartQuantity: number;
  onAddToCart: (skip: EnrichedSkip) => void;
}

/**
 * Renders an individual skip as a card with all relevant information
 * Now includes "Add to Cart" functionality with visual feedback
 */
export const SkipCard: React.FC<SkipCardProps> = ({ 
  skip, 
  isInCart, 
  cartQuantity, 
  onAddToCart 
}) => {
  const isAvailable = skip.availability;

  const handleAddToCart = () => {
    if (isAvailable) {
      onAddToCart(skip);
    }
  };

  return (
    <div className={`
      bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1
      ${!isAvailable ? 'opacity-75' : ''}
      ${isInCart ? 'ring-2 ring-blue-500' : ''}
    `}>
      {/* Skip Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={skip.image} 
          alt={skip.name}
          className="w-full h-full object-cover"
        />
        {/* Availability Badge */}
        <div className={`
          absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1
          ${isAvailable 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
          }
        `}>
          {isAvailable ? (
            <>
              <CheckCircle size={14} />
              Available
            </>
          ) : (
            <>
              <XCircle size={14} />
              Unavailable
            </>
          )}
        </div>

        {/* Cart Quantity Badge */}
        {isInCart && cartQuantity > 0 && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-bold">
            {cartQuantity} in cart
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Skip Name & Size */}
        <div className="flex items-center gap-2 mb-2">
          <Package className="text-blue-600" size={20} />
          <h3 className="text-xl font-bold text-gray-800">{skip.name}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {skip.description}
        </p>

        {/* Delivery Time */}
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-gray-500" size={16} />
          <span className="text-sm text-gray-600">
            Delivery: {skip.delivery_time}
          </span>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Price before VAT:</span>
            <span>£{skip.price_before_vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>VAT:</span>
            <span>£{skip.vat.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total:</span>
              <span>£{skip.total_price.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className={`
            w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
            ${isAvailable 
              ? isInCart
                ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
          disabled={!isAvailable}
        >
          {!isAvailable ? (
            'Currently Unavailable'
          ) : isInCart ? (
            <>
              <Check size={20} />
              Add Another
            </>
          ) : (
            <>
              <Plus size={20} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};