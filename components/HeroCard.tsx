// HeroCard.tsx
import React from 'react';

interface HeroCardProps {
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
}

const HeroCard = ({ children, onNext, onPrev }: HeroCardProps) => {
  return (
    <div className="relative bg-transparent rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 w-[55vw] sm:w-[340px] md:w-[400px] lg:w-[670px] h-[34vh] sm:h-[270px] md:h-[330px] lg:h-[550px] overflow-hidden">
      {children}
      
      {/* Navigation buttons inside card */}
      <button
        onClick={onPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white text-black p-2 rounded-full shadow-lg transition-all hover:scale-110 z-20"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white text-black p-2 rounded-full shadow-lg transition-all hover:scale-110 z-20"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default HeroCard;