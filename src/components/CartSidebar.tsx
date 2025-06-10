// Shopping cart sidebar component

import React from 'react';
import { X, ShoppingCart, Plus, Minus, Trash2, Calendar } from 'lucide-react';
import { CartItem, CartSummary } from '../types/skip';

interface CartSidebarProps {
  isOpen: boolean;
  cartItems: CartItem[];
  cartSummary: CartSummary;
  onClose: () => void;
  onUpdateQuantity: (skipId: number, quantity: number) => void;
  onRemoveItem: (skipId: number) => void;
  onClearCart: () => void;
  onProceedToBooking: () => void;
}

/**
 * Shopping cart sidebar component
 * Shows selected skips, quantities, and totals
 */
export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  cartItems,
  cartSummary,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToBooking
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="text-gray-300 mx-auto mb-4\" size={48} />
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-1">Add some skips to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.skip.id} className="bg-gray-50 rounded-lg p-4">
                  {/* Skip Info */}
                  <div className="flex items-start gap-3 mb-3">
                    <img 
                      src={item.skip.image} 
                      alt={item.skip.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.skip.name}</h3>
                      <p className="text-sm text-gray-600">{item.skip.delivery_time}</p>
                      <p className="text-sm font-medium text-blue-600">
                        £{item.skip.total_price.toFixed(2)} each
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.skip.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.skip.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.skip.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        £{(item.skip.total_price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="w-full text-red-600 hover:text-red-700 text-sm font-medium py-2 transition-colors"
                >
                  Clear Cart
                </button>
              )}
            </div>
          )}
        </div>

        {/* Cart Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({cartSummary.totalItems} items):</span>
                <span>£{cartSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>VAT:</span>
                <span>£{cartSummary.totalVat.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between text-lg font-bold text-gray-800">
                  <span>Total:</span>
                  <span>£{cartSummary.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Proceed to Booking Button */}
            <button
              onClick={onProceedToBooking}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Calendar size={20} />
              Proceed to Booking
            </button>
          </div>
        )}
      </div>
    </>
  );
};