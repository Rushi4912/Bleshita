// components/HeroSection.tsx
import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative h-full w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/assets/holiday/banner2.jpeg')",
          filter: 'brightness(1.0) contrast(1.0)',
          backgroundPosition: 'center top'
        }}
      />
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div className="space-y-4">
          <h1 className="text-md md:text-xl font-light tracking-widest uppercase text-gray-900 mr-10">
            New Summer-Ready Arrivals
          </h1>
          <div className="pt-2">
            <Link 
              href="/new-arrivals" 
              className="text-gray-900 text-[12px] tracking-widest border-b border-black pb-1 hover:opacity-80 transition-opacity mr-15 uppercase"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
