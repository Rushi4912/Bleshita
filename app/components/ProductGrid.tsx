'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../app/utils/cartContext'; // Adjust the path to your CartContext

interface Product {
  id: string; // Ensure id is unique for each product
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addToCart } = useCart(); // Access the addToCart function from context

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pr-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 group"
        >
          <Link href={`/products/${product.id}`}>
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Quick Add Button */}
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation when clicking Quick Add
                  addToCart({
                    id: product.id, // Ensure consistent id handling
                    name: product.name,
                    price: product.price,
                    quantity: 1, // Always add with quantity 1 for new product
                    image: product.imageUrl,
                  });
                }}
                className="absolute inset-x-4 bottom-4 mx-auto bg-white text-black text-sm font-medium px-4 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between shadow-md hover:shadow-lg"
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

          {/* Product Info */}
          <div className="p-4 text-center bg-white">
            <h2 className="text-sm font-semibold text-gray-900 truncate">
              {product.name}
            </h2>
            <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
