// FeatureCollection.tsx
import React from "react";
import { FeatureCollectionProps } from "../types/types"; // Import the type
import Link from "next/link";

const FeatureCollection: React.FC<FeatureCollectionProps> = ({
  collections,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {collections.map((collection, index) => (
        <div key={index} className="relative group">
          <img
            src={collection.imageUrl}
            alt={collection.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay Content */}
          <div className="absolute inset-0 transition-all duration-300">
            <div className="absolute left-8 top-1/2 -translate-y-1/2 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300">
              <h3 className="text-gray-900 text-sm font-light tracking-widest uppercase mb-2">
                {collection.title}
              </h3>
              <Link 
                href="/new-arrivals"
                className="inline-block text-gray-900 text-xs tracking-widest uppercase border-b border-gray-900 hover:opacity-70 transition-opacity"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCollection;
