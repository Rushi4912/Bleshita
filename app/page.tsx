// app/page.tsx
import React from 'react';
import HeroSection from './components/HeroSection';
import { Collection } from "../app/types/types"; 
import FeatureCollection from '@/app/components/FeatureCollection';
import ProductFeature from "./components/ProductFeature";
import Footer from '@/app/components/Footer';
import FeaturedProducts from './components/FeaturedProducts';
import './globals.css';

const HomePage: React.FC = () => {
  const collections: Collection[] = [
    {
      title: "MUST-HAVE PANTS",
      imageUrl: "/assets/holiday/show1.jpeg", 
      buttonText: "Shop Now",
    },
    {
      title: "NEW ARRIVALS",
      imageUrl: "/assets/holiday/show2.jpeg",
      buttonText: "Shop Now",
    }
   
  ];
  
  return (
    <main className="min-h-screen bg-gray-50">
      
      <section className="relative h-screen pt-[104px] hidden md:block">
        <HeroSection />
      </section>

      <section className="pt-[104px] md:pt-0">
        <FeaturedProducts />
      </section>

      <section className="w-full mb-16 md:mb-60 bg-gray-50">
        <FeatureCollection
          collections={collections}
          title=""
          description=""
        />
      </section>

      {/* Product Features */}
      <section className="bg-gray-50 pt-4 md:pt-8">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <ProductFeature
            title="Where Did You Get That?"
            description="If they didn't know about Bleshita, this holiday they will. These standout styles will get more compliments than the wrapping paper you used to gift them."
            imageUrl="/assets/holiday/collection6.jpeg"
            reverse={false}
          />
        </div>
      </section>

      <section className="bg-gray-50 pt-4 md:pt-8">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <ProductFeature
            title="Oooh, That Looks So Luxurious"
            description="As lush as the vocals of your favorite holiday tunes. We're talking Grade-A cashmere, premium (responsibly sourced!) leather, and more—all waiting to be wrapped and gifted to the ones you love."
            imageUrl="/assets/holiday/collection1.jpeg"
            reverse={true}
          />
        </div>
      </section>

      <section className="bg-gray-50 pt-4 md:pt-8">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <ProductFeature
            title="I Can't Believe It's Not Cashmere"
            description="Finding quality that exceeds your expectations and not your budget—that's a Christmas miracle. Get into cozy and super soft sweaters that look more expensive than they are."
            imageUrl="/assets/holiday/collection5.jpeg"
            reverse={true}
          />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
