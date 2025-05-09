import React from 'react';
import { useLoadingStore } from '../../store/loadingStore';
import LoadingLogo from './LoadingLogo';

const LoadingOverlay: React.FC = () => {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full mx-4 transform transition-all">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <LoadingLogo size="lg" className="text-primary" />
          </div>
          
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-light"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          
          <h2 className="text-xl font-semibold text-text mb-2">Loading...</h2>
          <p className="text-sm text-muted text-center">
            Please wait while we prepare your experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay; 