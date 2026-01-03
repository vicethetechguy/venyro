
import React from 'react';

interface LogoProps {
  className?: string;
  isGenerating?: boolean;
  onClick?: () => void;
  hideText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8", isGenerating = false, onClick, hideText = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`} onClick={onClick}>
      <div className={`relative h-full aspect-square ${isGenerating ? 'animate-pulse' : ''}`}>
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-full w-full"
        >
          {/* Background Ring */}
          <path 
            d="M50 15C35 15 20 30 20 50C20 70 35 85 50 85C65 85 80 70 80 50C80 30 65 15 50 15Z" 
            fill="currentColor" 
            fillOpacity="0.05"
          />
          
          {/* Central Petal */}
          <path 
            d="M50 15C58 15 65 30 65 50C65 70 58 85 50 85C42 85 35 70 35 50C35 30 42 15 50 15Z" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            className="opacity-90 transition-transform origin-center"
          />
          
          {/* Left Angle Petal */}
          <path 
            d="M25 65C20 60 25 45 40 40C55 35 70 45 75 55C80 65 75 80 60 85C45 90 30 70 25 65Z" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            className="opacity-70 transition-transform origin-center"
          />
          
          {/* Right Angle Petal */}
          <path 
            d="M75 65C80 60 75 45 60 40C45 35 30 45 25 55C20 65 25 80 40 85C55 90 70 70 75 65Z" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            className="opacity-70 transition-transform origin-center"
          />
          
          {/* Strategic Center Point */}
          <circle 
            cx="50" 
            cy="50" 
            r="4" 
            fill="currentColor" 
            className={isGenerating ? 'animate-pulse' : ''} 
          />
        </svg>
      </div>
      {!hideText && (
        <span className={`text-2xl font-medium tracking-tight select-none transition-opacity duration-500 ${isGenerating ? 'opacity-50' : 'opacity-100'}`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Venyro
        </span>
      )}
    </div>
  );
};

export default Logo;
