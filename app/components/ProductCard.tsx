import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    rating: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group w-full">
      {/* Image Container - Separate rectangle */}
      <div className="relative h-[500px] w-full mb-4 bg-gray-50">
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          width={400} 
          height={500} 
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-102" 
        />
        
        {/* Quick Add Button - Appears on Hover */}
        <div className="absolute bottom-6 left-0 right-0 px-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
          <button className="w-full py-3 bg-white text-black text-sm tracking-wide font-medium shadow-lg hover:bg-black hover:text-white transition-all duration-200">
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Product Info - Separate section */}
      <div className="px-1 space-y-2">
        {/* Name */}
        <h3 className="text-sm font-normal text-gray-700 tracking-wide">
          {product.name}
        </h3>
        
        {/* Price and Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-xs text-gray-500">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
