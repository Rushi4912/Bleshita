// FeatureCollection.tsx
import React from "react";
import { FeatureCollectionProps } from "../app/types/types"; // Import the type

const FeatureCollection: React.FC<FeatureCollectionProps> = ({
  title,
  description,
  collections,
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <div key={index} className="text-center">
              {/* Image */}
              <div className="relative w-full h-64 sm:h-72">
                <img
                  src={collection.imageUrl}
                  alt={collection.title}
                  className="w-full h-full object-cover object-center rounded-lg shadow-lg"
                />
              </div>

              {/* Clickable Text/Button */}
              <a
                href="#"
                className="mt-4 inline-block text-gray-800 font-medium text-sm underline hover:text-gray-600 transition"
              >
                {collection.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCollection;
