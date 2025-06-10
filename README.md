# Skip Size Chooser - React TypeScript App with Shopping Cart

A modern, responsive web application for selecting and booking waste management skip sizes with full shopping cart functionality. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Shopping Cart System**: Add multiple skips to cart with quantity management
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **TypeScript**: Full type safety throughout the application
- **Environment-Aware**: Different data sources for development and production
- **Error Handling**: Comprehensive error states with retry functionality
- **Loading States**: Smooth loading experience with spinners
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Complete Booking System**: Multi-skip booking with form validation
- **Real-time Cart Updates**: Live cart totals and item management
- **Success States**: Clear confirmation when bookings are completed

## 🛒 Shopping Cart Features

### **Cart Management**
- **Add to Cart**: Click "Add to Cart" on any available skip
- **Quantity Control**: Increase/decrease quantities directly in cart
- **Remove Items**: Remove individual skips or clear entire cart
- **Visual Feedback**: Cart badges show quantities on skip cards
- **Persistent State**: Cart maintains state during browsing session

### **Cart UI Components**
- **Floating Cart Button**: Mobile-friendly cart access with item count
- **Cart Sidebar**: Slide-out cart with full item management
- **Desktop Cart Button**: Header cart button showing total items and price
- **Cart Summary**: Real-time totals including VAT calculations

### **Booking Flow**
1. **Browse & Add**: Add multiple skips to cart with desired quantities
2. **Review Cart**: View cart sidebar with items, quantities, and totals
3. **Proceed to Booking**: Complete customer details form
4. **Order Summary**: Review all items before final confirmation
5. **Confirmation**: Receive booking confirmation with order details

## 🏗️ Architecture

### Data Fetching & Enrichment

The application uses a layered approach for data management:

1. **API Service (`skipService.ts`)**: 
   - Handles environment detection (dev vs production)
   - Uses mock data in development for faster iteration
   - Fetches from real API in production
   - Implements error handling and retry logic

2. **Data Enrichment**: 
   Each skip from the API is enriched with computed fields:
   - `name`: Formatted as "{size} Yard Skip"
   - `description`: Size-appropriate description for user guidance
   - `image`: Placeholder image URL (using Pexels for consistency)
   - `total_price`: Calculated from price_before_vat + vat

### Component Structure

```
src/
├── components/
│   ├── SkipCard.tsx          # Individual skip display with cart functionality
│   ├── SkipList.tsx          # Responsive grid of skip cards
│   ├── CartSidebar.tsx       # Slide-out shopping cart
│   ├── CartButton.tsx        # Floating cart access button
│   ├── BookingModal.tsx      # Multi-skip booking form
│   ├── LoadingSpinner.tsx    # Loading state component
│   └── ErrorMessage.tsx      # Error state with retry
├── hooks/
│   ├── useSkips.ts           # Custom hook for data fetching
│   ├── useCart.ts            # Custom hook for cart management
│   └── useBooking.ts         # Custom hook for booking functionality
├── services/
│   └── skipService.ts        # API and data enrichment logic
├── types/
│   └── skip.ts               # TypeScript type definitions
└── App.tsx                   # Main application component
```

## 🎨 UI/UX Design Decisions

### Shopping Cart UX
- **Progressive Addition**: Users can add items without losing context
- **Visual Cart State**: Skip cards show cart status with badges and button states
- **Flexible Access**: Multiple ways to access cart (floating button, header button, sidebar)
- **Clear Totals**: Always visible cart totals with VAT breakdown
- **Easy Management**: Simple quantity controls and item removal

### Visual Design
- **Color Scheme**: Blue primary (#3B82F6) with green accents for eco-friendliness
- **Cart Indicators**: Blue rings around selected items, quantity badges
- **Interactive States**: Different button states for "Add to Cart" vs "Add Another"
- **Typography**: Clear hierarchy with readable font sizes
- **Spacing**: Consistent 8px grid system using Tailwind classes

### User Experience
- **Multi-Selection Flow**: Natural progression from browsing to cart to booking
- **Visual Feedback**: Immediate feedback when items are added to cart
- **Error Recovery**: Clear error messages with retry functionality
- **Form Validation**: Real-time validation with helpful error messages
- **Booking Confirmation**: Comprehensive order summary before final submission

### Responsive Behavior
- **Mobile**: Floating cart button, full-screen cart sidebar
- **Tablet**: Compact cart controls, optimized touch targets
- **Desktop**: Header cart button, side-by-side booking layout

## 🛒 Cart Functionality

### Core Features
- **Add Items**: Add skips to cart with automatic quantity management
- **Update Quantities**: Increase/decrease quantities with +/- buttons
- **Remove Items**: Remove individual items or clear entire cart
- **Cart Persistence**: Cart state maintained during session
- **Real-time Totals**: Live calculation of subtotals, VAT, and grand total

### Cart State Management
- **useCart Hook**: Centralized cart state management
- **Local Storage**: Cart persistence across page refreshes (future enhancement)
- **Optimistic Updates**: Immediate UI updates for better UX
- **Error Handling**: Graceful handling of cart operation failures

### Cart UI Components
- **CartSidebar**: Full cart management interface
- **CartButton**: Floating action button with item count
- **Cart Badges**: Visual indicators on skip cards
- **Cart Summary**: Detailed price breakdown

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skip-size-chooser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔧 Development vs Production

### Development Mode
- Uses mock data for faster development
- Simulates network delays (1 second) for realistic testing
- No external API calls required
- Booking simulation with 90% success rate for testing
- Cart operations work with mock data

### Production Mode
- Fetches real data from: `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=LE10&area=Hinckley`
- Implements proper error handling for network failures
- Optimized bundle with tree shaking and minification
- Real booking API integration (endpoint to be configured)
- Production cart persistence and analytics

## 📝 Environment Variables

No environment variables are required for basic functionality. The app automatically detects the environment using `import.meta.env.DEV`.

For production booking functionality, you may need to configure:
- `VITE_BOOKING_API_URL`: Booking endpoint URL
- `VITE_API_KEY`: API authentication key (if required)
- `VITE_CART_PERSISTENCE`: Enable cart persistence (future)

## 🧪 Testing Cart Functionality

To test different cart scenarios:

1. **Add Items**: Click "Add to Cart" on multiple skips
2. **Quantity Management**: Use +/- buttons in cart sidebar
3. **Cart Persistence**: Add items, refresh page (future enhancement)
4. **Booking Flow**: Add items, proceed to booking, complete form
5. **Error Handling**: Test with network disconnection
6. **Responsive Cart**: Test cart on different screen sizes
7. **Empty Cart**: Clear cart and verify empty state

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Minimum supported: ES2020 features
- Cart functionality works across all supported browsers

## 🔍 Code Quality

- **TypeScript**: Strict mode enabled with comprehensive type coverage
- **ESLint**: Configured with React and TypeScript best practices
- **Code Comments**: Clear explanations of business logic and design decisions
- **Error Boundaries**: Graceful error handling throughout the app
- **Form Validation**: Comprehensive client-side validation
- **State Management**: Clean separation of concerns with custom hooks
- **Cart Logic**: Robust cart state management with error handling

## 🚀 Deployment

The application is ready for deployment to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect GitHub repository for automatic deployments (*currently deployed here*)
- **GitHub Pages**: Use the built files from `npm run build`

## 📊 Performance Considerations

- **Lazy Loading**: Images load on-demand
- **Code Splitting**: Vite automatically splits bundles
- **Tree Shaking**: Unused code is eliminated in production
- **Optimized Images**: Uses compressed images from Pexels
- **Cart Optimization**: Efficient cart state updates and calculations
- **Modal Management**: Efficient modal state management
- **Form Optimization**: Debounced validation and optimized re-renders

## 🔒 Security Considerations

- **Input Validation**: All form inputs are validated client-side
- **XSS Prevention**: Proper input sanitization
- **CSRF Protection**: Ready for CSRF token integration
- **Data Privacy**: Customer data handling best practices
- **Cart Security**: Secure cart state management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.