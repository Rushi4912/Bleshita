import React from "react";

interface ProductFeatureProps {
  title: string;
  description: string;
  imageUrl: string;
  reverse?: boolean;
}

const ProductFeature: React.FC<ProductFeatureProps> = ({
  title,
  description,
  imageUrl,
  reverse = false,
}) => {
  return (
    <section className="bg-white border-t border-gray-200">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row ${
          reverse ? "lg:flex-row-reverse" : ""
        } items-center gap-12 lg:gap-16`}
      >
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
          {/* Headline split into two lines for better readability */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-lg text-gray-600">{description}</p>
          
          {/* Centered Learn More Button */}
          <div className="flex justify-center ">
            <button className="px-6 py-3 bg-gray-900 text-white rounded-full text-base font-medium hover:bg-gray-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeature;
