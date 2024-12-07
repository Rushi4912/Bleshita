import React from "react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 group"
        >
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-85 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Quick Add Button */}
            <button className="absolute inset-x-4 bottom-4 mx-auto bg-white text-black text-sm font-medium px-8 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between shadow-md hover:shadow-lg">
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
