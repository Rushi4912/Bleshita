// components/HeroSection.tsx
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/holiday/banner.jpeg')",filter: 'brightness(1.5)' }}>
  <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for better text contrast */}
  <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6 sm:px-12">
    <div className="max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
        Elevate Your Style with Bleshita
      </h1>
      <p className="text-extrasmall sm:text-small font-light">
        Discover timeless fashion pieces with a perfect blend of modern design and sustainable craftsmanship.
      </p>
      <div className="mt-8">
        <button className="px-6 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition duration-300">
          Shop Now
        </button>
      </div>
    </div>
  </div>
</section>

  );
};

export default HeroSection;
