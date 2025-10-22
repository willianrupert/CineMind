import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
}

const Loader: React.FC<LoaderProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div role="status" className={sizeClasses[size]}>
      <svg
        className="animate-spin w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="spinner-gradient" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop offset="0%" stopColor="#E01A4F" />
            <stop offset="100%" stopColor="#00A6FB" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z"
          stroke="#ffffff"
          strokeOpacity="0.2"
          strokeWidth="3"
        />
        <path
          d="M12 2C17.5228 2 22 6.47715 22 12"
          stroke="url(#spinner-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
