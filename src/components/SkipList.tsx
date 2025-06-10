// Reusable component for displaying a list of skips

import React from 'react';
import { SkipCard } from './SkipCard';
import { EnrichedSkip } from '../types/skip';

interface SkipListProps {
  skips: EnrichedSkip[];
  isInCart: (skipId: number) => boolean;
  getQuantity: (skipId: number) => number;
  onAddToCart: (skip: EnrichedSkip) => void;
}

/**
 * Renders a responsive grid of skip cards
 * Now includes cart functionality integration
 */
export const SkipList: React.FC<SkipListProps> = ({ 
  skips, 
  isInCart, 
  getQuantity, 
  onAddToCart 
}) => {
  if (skips.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No skips available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skips.map((skip) => (
        <SkipCard 
          key={skip.id} 
          skip={skip}
          isInCart={isInCart(skip.id)}
          cartQuantity={getQuantity(skip.id)}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};