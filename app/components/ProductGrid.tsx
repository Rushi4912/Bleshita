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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 group"
        >
          {/* Wrap the image in a Link component */}
          <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
            <div className="relative overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation when clicking the button
                  e.stopPropagation(); // Prevent event bubbling
                  addToCart({
                    id: product.id, // Use the actual product ID now
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
          </Link>

          {/* Product Info - Also wrapped in Link for better UX */}
          <Link href={`/products/${product.id}`}>
            <div className="p-4 text-center bg-white">
              <h2 className="text-sm font-semibold text-gray-900 truncate">
                {product.name}
              </h2>
              <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
