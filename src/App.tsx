// Main application component

import { Trash2, MapPin } from 'lucide-react';
import { SkipList } from './components/SkipList';
import { BookingModal } from './components/BookingModal';
import { CartSidebar } from './components/CartSidebar';
import { CartButton } from './components/CartButton';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useSkips } from './hooks/useSkips';
import { useBooking } from './hooks/useBooking';
import { useCart } from './hooks/useCart';

/**
 * Main App component - Skip Size Chooser with Shopping Cart
 * Handles data fetching, cart management, and booking functionality
 */
function App() {
  const { skips, loading, error, retry } = useSkips();
  const {
    isBookingModalOpen,
    isSubmitting,
    bookingSuccess,
    bookingError,
    openBookingModal,
    closeBookingModal,
    submitBooking
  } = useBooking();
  const {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getQuantity,
    getCartSummary,
    openCart,
    closeCart,
    toggleCart
  } = useCart();

  const cartSummary = getCartSummary();

  const handleProceedToBooking = () => {
    closeCart();
    openBookingModal();
  };

  const handleBookingSubmit = async (cartItems: any[], customerDetails: any, deliveryDate: string, notes?: string) => {
    await submitBooking(cartItems, customerDetails, deliveryDate, notes);
    if (!bookingError) {
      clearCart(); // Clear cart on successful booking
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Trash2 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Choose Your Skip Size
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin size={16} />
                  <span className="text-sm">Serving Hinckley, LE10</span>
                </div>
              </div>
            </div>
            
            {/* Desktop Cart Button */}
            <div className="hidden sm:block">
              {cartSummary.totalItems > 0 && (
                <button
                  onClick={toggleCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <span>Cart ({cartSummary.totalItems})</span>
                  <span className="font-bold">£{cartSummary.grandTotal.toFixed(2)}</span>
                </button>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 max-w-3xl mt-4">
            Select the perfect skip sizes for your project. Add multiple skips to your cart and 
            book them all together. All prices include delivery, collection, and disposal.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={retry} />
        )}

        {/* Skip List */}
        {!loading && !error && (
          <div>
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Available Skip Sizes
              </h2>
              <p className="text-gray-600">
                {skips.length} skip{skips.length !== 1 ? 's' : ''} available for hire
                {cartSummary.totalItems > 0 && (
                  <span className="ml-2 text-blue-600 font-medium">
                    • {cartSummary.totalItems} item{cartSummary.totalItems !== 1 ? 's' : ''} in cart
                  </span>
                )}
              </p>
            </div>

            {/* Skip Cards Grid */}
            <SkipList 
              skips={skips} 
              isInCart={isInCart}
              getQuantity={getQuantity}
              onAddToCart={addToCart}
            />
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        cartItems={cartItems}
        cartSummary={cartSummary}
        onClose={closeCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onProceedToBooking={handleProceedToBooking}
      />

      {/* Floating Cart Button (Mobile) */}
      <CartButton
        itemCount={cartSummary.totalItems}
        onClick={toggleCart}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        cartItems={cartItems}
        cartSummary={cartSummary}
        isSubmitting={isSubmitting}
        bookingSuccess={bookingSuccess}
        bookingError={bookingError}
        onClose={closeBookingModal}
        onSubmit={handleBookingSubmit}
      />

      {/* Footer */}
      <footer className="mt-16 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              Need help choosing? Call us at <span className="font-medium">0800 123 4567</span> or 
              email <span className="font-medium">hello@wewantwaste.co.uk</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;