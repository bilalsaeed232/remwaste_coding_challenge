// Error message component

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

/**
 * Error message component with retry functionality
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
        <AlertCircle className="text-red-500 mx-auto mb-4\" size={48} />
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Something went wrong
        </h3>
        <p className="text-red-600 mb-4 text-sm">
          {message}
        </p>
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
};