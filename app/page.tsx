// app/page.tsx
import React from 'react';
import HeroSection from './components/HeroSection';
import { Collection } from "../app/types/types"; 
import FeatureCollection from '@/app/components/FeatureCollection';
import ProductFeature from "./components/ProductFeature";
import Footer from '@/app/components/Footer';

const HomePage: React.FC = () => {
  const collections: Collection[] = [
    {
      title: "SHOP ULTRA-LUXE GIFTS",
      imageUrl: "/assets/holiday/collection1.jpeg", 
      buttonText: "Shop Now",
    },
    {
      title: "SHOP GIFT UNDER 7000",
      imageUrl: "/assets/holiday/collection2.jpeg",
      buttonText: "Shop Now",
    },
    {
      title: "SHOP GIFT BUNDLES",
      imageUrl: "/assets/holiday/collection3.jpeg", 
      buttonText: "Shop Now",
    },
    {
      title: "SHOP GIFT FOR HIM",
      imageUrl: "/assets/holiday/collection4.jpeg",
      buttonText: "Shop Now",
    },
    {
      title: "SHOP BEST-SELLING GIFTS",
      imageUrl: "/assets/holiday/collection5.jpeg", 
      buttonText: "Shop Now",
    },
    {
      title: "SHOP CONVETABLE GIFTS",
      imageUrl: "/assets/holiday/collection6.jpeg", 
      buttonText: "Shop Now",
    },
    {
      title: "SHOP LUXE GIFTS",
      imageUrl: "/assets/holiday/collection8.jpeg", 
      buttonText: "Shop Now",
    },
    {
      title: "SHOP COZY GIFTS",
      imageUrl: "/assets/holiday/collection9.jpeg", 
      buttonText: "Shop Now",
    }
  ];
  
  
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      <FeatureCollection
        title="Featured Collections"
        description="Explore our exclusive collections and elevate your wardrobe with timeless designs and quality materials."
        collections={collections}
      />
      <ProductFeature
  title="Where Did You Get That ?"
  description="If they didn’t know about Bleshita, this holiday they will. These standout styles will get more compliments than the wrapping paper you used to gift them."
  imageUrl="/assets/holiday/collection6.jpeg"
  reverse={false} // For normal layout
/>
<ProductFeature
  title="Oooh, That Looks So Luxurious"
  description="As lush as the vocals of your favorite holiday tunes. We’re talking Grade-A cashmere, premium (responsibly sourced!) leather, and more—all waiting to be wrapped and gifted to the ones you love."
  imageUrl="/assets/holiday/collection1.jpeg"
  reverse={true} // For normal layout
/>
<ProductFeature
  title="They Really Get Your Vibe ?"
  description="Let’s be real, you’re buying something for him because you care about him—and how he looks. Quality sweaters, chinos, and more for the guy in your life."
  imageUrl="/assets/holiday/collection3.jpeg"
  reverse={false} // For normal layout
/>
<ProductFeature
  title="I Can't Believe Its Not Cashmere"
  description="Finding quality that exceeds your expectations and not your budget—that’s a Christmas miracle. Get into cozy and super soft sweaters that look more expensive than they are."
  imageUrl="/assets/holiday/collection5.jpeg"
  reverse={true} // For normal layout
/>
 <Footer/>
      
    </>
  );
};

export default HomePage;
