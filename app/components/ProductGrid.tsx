'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../app/utils/cartContext'; // Adjust the path to your CartContext

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  imageGallery?: string[];
  description?: string;
  category?: string;
  stock?: number;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addToCart } = useCart();

  // Log the full product object to see all available fields
  console.log("Full product object sample:", products[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group">
          {/* Image Container */}
          <div className="relative h-[400px] mb-4 bg-gray-50">
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            
            {/* Quick Add Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                  image: product.imageUrl,
                });
              }}
              className="absolute inset-x-4 bottom-4 mx-auto bg-white text-black text-sm font-medium px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between shadow-md hover:shadow-lg z-10"
            >
              <span className="mx-auto">QUICK ADD</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 ml-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>

          {/* Product Info */}
          <Link href={`/products/${product.id}`}>
            <div className="space-y-2">
              <h3 className="text-sm font-normal text-gray-700 tracking-wide">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
