// Floating cart button component

import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

/**
 * Floating cart button that shows item count
 * Positioned fixed in bottom right corner
 */
export const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
  if (itemCount === 0) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-30 flex items-center gap-2"
    >
      <div className="relative">
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </div>
      <span className="hidden sm:block font-medium">
        {itemCount} item{itemCount !== 1 ? 's' : ''}
      </span>
    </button>
  );
};