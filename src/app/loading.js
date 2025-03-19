"use client";
import React from 'react';

const Loading = ({ size = 'medium', color = 'blue-800', className = '' }) => {
  // Size classes mapping
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4'
  };

  // Color classes for the spinner
  const colorClass = `border-t-${color}`;
  
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          ${colorClass}
          border-gray-200 
          rounded-full 
          animate-spin
        `}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

// Create a full-screen loading overlay version
export const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-white bg-opacity-80">
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg">
        <Loading size="large" color="blue-800" />
        {message && (
          <p className="text-lg font-medium text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

// Standalone component for page-level loading
export const PageLoading = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg">
        <Loading size="large" color="blue-800" />
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;